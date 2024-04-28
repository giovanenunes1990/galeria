import React, {useState} from 'react';
import {
    View, Text, ScrollView,
    FlatList, Image
} from 'react-native';
import  {css}  from '../style';
import { converter_para_real } from '../helpers';
import {  useFocusEffect  } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {CONFIG} from '../define';
import moment from 'moment';



export default () => {

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
        
           
            let req = await fetch(path+"?acao=ultimas", {
                method: 'POST',
               body: formdata,
              
            });
            let json = await req.json(); 

            if(json['error'] == ''){

                var dados = json['data'];
                setList(dados);


            }else{
                console.warn(json['error']);
            }
          
           
     
        } catch (error) {
           alert(error);
        }
     
    }

    useFocusEffect(() => {
        getData();
    });

  
    return (
        <View style={[css.container, css.mainBackground, css.p1]}>
            <View style={[css.dFlex, css.justifyContentBetween, css.alignItemsCenter]}>
                <Image 
                    style={css.logoHeader}
                    source={require('../assets/images/logo_in.png')}
                    resizeMode="contain"
                />
                <Text style={css.mainTitle}>Últimas Compras</Text>
            </View>
            {   list.length > 0 &&
                <FlatList 
                    style={[{flex: 1, width: '100%'}, css.pb1]}
                    data={list}
                    renderItem={({ item, index }) => (
                        <View style={[css.card, css.mb2]} key={index}>
                            <View style={[css.dFlex, css.justifyContentBetween]}>
                                <View style={[css.dFlex]}>
                                    <Text style={[css.comumText, css.mr1]}>N° Do Pedido:</Text>
                                    <Text style={css.primaryText}>{item.IdNotaFiscal}</Text>
                                </View>
                                <Text style={css.comumText}>{moment(item.DataEmissao, "YYYY-MM-DD").format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={[css.dFlex, css.justifyContentBetween, css.mt1]}>
                                <Text style={css.comumText}>Qtde de Produtos: {item.qtdeItens}</Text>
                                <View style={[css.dFlex]}>
                                    <Text style={[css.comumText, css.mr1]}>Total:</Text>
                                    <Text style={css.successText}>R$ {converter_para_real(item.ValorTotal)}</Text>
                                </View>
                                
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



            

        </View>
    )
}

