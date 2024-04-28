import React, {useState, useEffect} from 'react';
import {
    View, Text, ToastAndroid,
    FlatList, TextInput, Image,
    TouchableHighlight, ScrollView
} from 'react-native';
import  {css}  from '../style';
import { converter_para_real } from '../helpers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CONFIG} from '../define';

import { ESVAZIAR_CAR, REMOVE_ITEM } from '../redux/reducers/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import Confirm from '../components/Confirm';
import ConfirmAlt from '../components/ConfirmAlt';
import { useNavigation, useFocusEffect } from '@react-navigation/native';



export default () => {

    const CART = useSelector( (state)=> state.cart.cart); 
    const USER = useSelector( (state)=> state.user.user);
    const navigation = useNavigation(); 
    const path = CONFIG.base_url;

    const dispatch = useDispatch();
    const [list, setList] = useState(CART);
    const [valortotal, setValorTotal] = useState(0);
  
    
    const calc_valortotal = () => {
        let total = 0;
        let qtde_total = 0;
        list.forEach(item => {
            total = total + (parseFloat(item.qtde) * parseFloat(item.Preco));
            qtde_total = qtde_total + parseFloat(item.qtde);
        });
     
        setValorTotal(total);
        setQtdeTotal(qtde_total);
    }

    const esvaziar_carrinho = () => {

        dispatch( ESVAZIAR_CAR());
        setVisibleModal(false);
        
    }
    
    
    const remover_item = (index) => {
       
        setVisibleModalItem(false);
        dispatch( REMOVE_ITEM(index));
    }  
    
    const [qtdetotal, setQtdeTotal] = useState(0);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalItem, setVisibleModalItem] = useState(false);
    const [indexAtual, setIndexAtual] = useState('');
    const [textArea, setTextArea] = useState('');

    const changeModal = (acao) => {
        setVisibleModal(acao);
    }

    const changeModalItem = (acao) => {
        setVisibleModalItem(acao);
    }
    
    const callModalItem = (index) => {
        setVisibleModalItem(true);
        setIndexAtual(index);
    }

    useEffect(() => {
        setList(CART);
        calc_valortotal();
    }, [CART, list])

    useFocusEffect(() => {
        calc_valortotal();
    }); 
 
    const salvar = async () => {
        try {
          
            let token = USER.token;
            let id_cliente = USER.id;

            var formdata = new FormData();
            formdata.append("cliente", id_cliente);
            formdata.append("json_itens", JSON.stringify(list));  
            formdata.append("obs", textArea);
            formdata.append("token", token);
        
           
            let req = await fetch(path+"?acao=salvar", {
                method: 'POST',
               body: formdata,
            });
            let json = await req.json(); 
            
            
            if(json[0]['error'] == '' && json[0]['success'] == 'success'){

                ToastAndroid.show("Pedido Efetuado com Sucesso!", ToastAndroid.LONG);
                esvaziar_carrinho();
                navigation.navigate('Últimas Compras');
            

            }else{
                console.warn(json['error']);
            } 
          
           
     
        } catch (error) {
           alert(error);
        }
    }

    return (
        <View style={[css.container, css.mainBackground, css.p1, {flex: 1}]}  showsVerticalScrollIndicator={false}>

           
            <View style={[css.dFlex, css.justifyContentBetween, css.alignItemsCenter]}>
                <Image 
                    style={css.logoHeader}
                    source={require('../assets/images/logo_in.png')}
                    resizeMode="contain"
                />
                <Text style={css.mainTitle}>Carrinho</Text>
            </View>
            <View style={[css.card, css.mb2, css.justifyContentBetween, {flex: 1 }]} >

                { list.length > 0 &&
                   
                        <View style={[{flex: 1}]}>

                            <View style={[{flex: 1}]}>
                                <FlatList 
                                    indicatorStyle="#1168bf"
                                    style={[{width: '100%', maxHeight: 350}]}
                                    data={list}
                                    renderItem={({ item, index }) => {

                                    

                                        return (
                                        <View style={css.borderBottom}>
                                            <View style={[css.dFlex, css.justifyContentBetween]}>
                                                
                                                <Text numberOfLines={2} style={[css.comumText, css.textMd, { flexWrap: 'wrap', maxWidth: '100%' }]}>{item.Descricao}</Text>
                                                
                                            </View>
                                            <View style={[css.dFlex, css.justifyContentBetween, css.mt1]}>
                                                <View style={[css.dFlex]}>
                                                    
                                                    <TouchableHighlight  underlayColor="#ba8a8c" style={[css.mr2]} onPress={() => callModalItem(index)}>
                                                        <FontAwesome5  name="trash" size={20} style={css.dangerText} />
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={[css.dFlex]}>
                                                
                                                    <Text style={[css.comumText, css.textLg,css.mr2]}>{converter_para_real(item.Preco)}</Text>
                                                    <Text style={[css.primaryText, css.textLg, css.mr1]}> {item.qtde}x </Text>
                                                    <Text style={[css.comumText, css.textLg, css.mr1]}> = </Text>
                                                    <Text style={[css.comumText, css.textLg]}>{converter_para_real((parseFloat(item.Preco) * parseFloat(item.qtde)).toFixed(2))}</Text>

                                                </View>
                                                
                                            </View>
                                        </View>
                                    )}}
                                    
                                    keyExtractor={(item,index) => index.toString()}
                                    showsVerticalScrollIndicator={true}
                                />
                            </View>
                            <View>
                            
                                <View style={[css.dFlex, css.justifyContentBetween, css.mt1]}>
                                    <View style={[css.dFlex]}>
                                        
                                        <Text style={[css.comumText, css.textLg,css.mr2]}>Total:</Text>
                                    </View>
                                    <View style={[css.dFlex]}>
                                    
                                        <Text style={[css.primaryText, css.textLg, css.mr2]}> {qtdetotal}x </Text>
                                        <Text style={[css.successText, css.textLg,css.ml2]}> {converter_para_real(valortotal)}</Text>

                                    </View>
                                </View>
                                
                                <Text style={[css.comumText, css.textLg,css.mb2, css.mt2]}>Observações:</Text>
                                <View style={[css.dFlex]}>
                                    
                                    <TextInput
                                        style={css.textarea}
                                        multiline={true}
                                        onChangeText={(txt) => setTextArea(txt)}
                                        value={textArea}
                                        numberOfLines={5} // Especifique o número de linhas visíveis desejadas
                                        placeholder="Caso necessite de outros itens digite aqui..."
                                        placeholderTextColor="gray"
                                    />

                                </View>
                            </View>

                            
                            <View style={[css.mt3, css.mb2, css.px1]}>
                                
                                <View style={[css.dFlex, css.justifyContentBetween, css.mt2]}>
                                        
                                    
                                        <TouchableHighlight  underlayColor="#ba8a8c" style={[css.mr2, css.btnSecondary]} onPress={() => changeModal(true)} >
                                            <Text style={css.textBtnSecondary}>Esvaziar</Text>
                                        </TouchableHighlight>
                                        

                                        <TouchableHighlight  underlayColor="#ba8a8c" style={[css.btnPrimary, {marginLeft: 'auto'}]} onPress={salvar}>
                                                <Text style={css.textBtnPrimary}>Confirmar</Text>
                                        </TouchableHighlight>

                                </View>
                            </View>
                        </View>
                   
                }

                {
                     list.length == 0 &&
                     <View style={[css.justifyContentCenter, css.alignItemsCenter, {flex: 1}]}>
                        <Text style={[css.comumText, css.textLg]}>O Carrinho está vazio!</Text>
                     </View>
                }
                
                
            </View>



           <Confirm visible={visibleModal} 
                    msg="Tem certeza que deseja Esvaziar o  carrinho ?" 
                    negative={changeModal}
                    positive={esvaziar_carrinho}
            />

            <ConfirmAlt visible={visibleModalItem} 
                    msg="Tem certeza que deseja Remover esse Item?" 
                    negative={changeModalItem}
                    positive={remover_item}
                    index={indexAtual}
            />
            

        </View>
    )
}

