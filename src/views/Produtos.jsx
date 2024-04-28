import React, {useState, useEffect} from 'react';
import {
    View, Text, ScrollView, Image,
    FlatList, 
    TouchableHighlight
} from 'react-native';
import  {css}  from '../style';
import { converter_para_real } from '../helpers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalAdd from '../components/ModalAdd';
import { ADD_ITEM } from '../redux/reducers/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {CONFIG} from '../define';



export default () => {
    var CART = useSelector( (state)=> state.cart.cart); 
    CART = [...CART];
    const USER = useSelector( (state)=> state.user.user);
    const path = CONFIG.base_url;
    const [list, setList] = useState([]);
   
    const getData = async () => {
        try {
          
            let token = USER.token;
            let id_cliente = USER.id;

            var formdata = new FormData();
            formdata.append("cliente", id_cliente); 
            formdata.append("token", token); 
        
           
            let req = await fetch(path+"?acao=produtos", {
                method: 'POST',
               body: formdata,
            
            });
            let json = await req.json(); 

            if(json['error'] == ''){

                var dados = json['data'];
                
                dados = dados.map((this_item) =>{
                    this_item['qtde'] = 0;
                    this_item['add'] = false;
                    return this_item;
                });

                var tmp_join = [...CART, ...dados];

                const tmp_limpo = tmp_join.reduce((acc, obj) => {
                    const found = acc.find(item => item.IdCodigoProduto === obj.IdCodigoProduto && item.Descricao === obj.Descricao);
                    if (!found) {
                        acc.push(obj);
                    }
                    return acc;
                }, []);


                setList(tmp_limpo);


            }else{
                console.warn('erro vindo do getData');
                console.warn(json['error']);
            }
          
           
     
        } catch (error) {
           alert(error);
        }
     
    }    

    const [visibleModal, setVisibleModal] = useState(false);
    const [itemAtual, setItemAtual] = useState({});
     const [qtdeTotal, setQtdeTotal] = useState(0);
    
    const dispatch = useDispatch();
    const navigation = useNavigation();

  
    const callModal = (index) => {
        let tmp_item = {};
        tmp_item = list[index];

        setItemAtual(tmp_item);
        setVisibleModal(true);
    }

    const changeModal = (acao) => {
        setVisibleModal(acao);
    }

    const add_carrinho = (item) => {
        setVisibleModal(false);

        let tmp_list = [...list];
        let acao = 'inserir';
        tmp_list = tmp_list.map((this_item) =>{
            
            if(this_item.IdCodigoProduto === item.IdCodigoProduto){
                this_item['qtde'] = item['qtde'];
                this_item['add'] = item['add']; 
            }

            return this_item;
        });

        setList(tmp_list);
       
        dispatch(ADD_ITEM(item));
    }
 
  
    useEffect(() => {
      
        setQtdeTotal(CART.length);
    }, [CART]);

    useFocusEffect(() => {
    
        getData();
        setQtdeTotal(CART.length);
    });
    

    return (
        <View style={[css.container, css.mainBackground, css.p1]}>
             <View style={[css.dFlex, css.justifyContentBetween]}>
                 
                        <Image 
                            style={css.logoHeader}
                            source={require('../assets/images/logo_in.png')}
                            resizeMode="contain"
                        />
                        <Text style={[css.mainTitle, css.mt1]}>Produtos</Text>
                  
               
                <TouchableHighlight underlayColor="transparent" style={[css.mt1]} onPress={()=> navigation.navigate('Carrinho')}>
                    <View style={[css.dFlex]} >
                        <FontAwesome5  name="shopping-cart" size={23} style={{color: 'gray'}}/>
                        {qtdeTotal > 0 &&
                        <View style={[css.dFlex, css.justifyContentCenter, css.alignItemsCenter,css.ball]}>
                            <Text style={css.textWhite}>{qtdeTotal}</Text>
                        </View>
                        }
                    </View>

                </TouchableHighlight>
               
             </View>
            {   list.length > 0 &&
                    <FlatList 
                        style={[{flex: 1, width: '100%'}, css.pb1]}
                        data={list}
                        renderItem={({ item, index }) => (
                            <View style={[css.card, css.mb2]} key={index}>
                                <View style={[css.dFlex, css.justifyContentBetween]}>
                                    
                                    <Text numberOfLines={2}  style={[css.comumText, css.textMd, { flexWrap: 'wrap', maxWidth: '80%' }]}>{item.Descricao} </Text>
                                    <View style={[css.dFlex]}>
                                        
                                        <Text style={css.primaryText}>{item.Unidade}</Text>
                                    </View>
                                </View>
                                <View style={[css.dFlex, css.justifyContentBetween, css.alignItemsCenter,css.mt2]}>
                                    
                                
                                    <Text style={[css.comumText]}>
                                        R$ {converter_para_real(item.Preco)}
                                    </Text>
                                    {item.add &&
                                            <Text style={[css.comumText, css.ml1]}>
                                                {item.qtde+"x    R$ "+(converter_para_real((item.qtde * item.Preco).toFixed(2)))}
                                            </Text>
                                    }
                                    
                                    <TouchableHighlight underlayColor="#3471eb" style={[(item.add ? css.btnSuccess : css.btnPrimary), {marginLeft: 'auto'}]} onPress={() => (!item.add ? callModal(index) : false) }>
                                            <Text style={css.textBtnPrimary}>{item.add ? 'Adicionado!' : 'Adicionar' }</Text>
                                    </TouchableHighlight>
                                    
                                    
                                </View>
                                
                            </View>
                        )}
                        keyExtractor={(item,index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
            }
            {   list.length == 0 &&
                <View style={[css.alignItemsCenter, css.justifyContentCenter, {flex: 1}]}>
                    <Text style={[css.comumText, css.textLg]}>Carregando...</Text>
                </View>
            }

            <ModalAdd visible={visibleModal} 
                    itemAtual={itemAtual} 
                    negative={changeModal}
                    positive={add_carrinho}
            />

            

        </View>
    )
}

