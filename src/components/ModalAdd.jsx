import React, {useState} from 'react';
import {
    View, Text, Modal, ToastAndroid,
    TouchableHighlight
} from 'react-native';
import  {css}  from '../style';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { converter_para_real } from '../helpers';


export default (props) => {

    /*
    const qtdeAtualInicial = () => {
      
       return props.itemAtual.qtde != 0 &&  props.itemAtual.qtde != undefined ? (props.itemAtual.qtde) : 0
    }; */
    const [qtdeAtual, setQtdeAtual] = useState(0);

    //useLayoutEffect(() => {
     //   setQtdeAtual(qtdeAtualInicial);
     // }, []);
    
    const setQtde = (operation) => {
       
        if(operation == '+'){
            setQtdeAtual(qtdeAtual + 1);
        }else{
            let nv_qtde =  (qtdeAtual - 1) > 0 ? (qtdeAtual - 1) : 0;
            setQtdeAtual(nv_qtde);
        }


    }

    const adicionar = () => {

        let tmp_item = props.itemAtual != null ? props.itemAtual : {};
        
        tmp_item['qtde'] = qtdeAtual;
        tmp_item['add'] = true;

        if(qtdeAtual > 0){
            props.positive(tmp_item);
            setQtdeAtual(0);
        }else{
            ToastAndroid.show('Selecione uma quantidade para adicionar!', ToastAndroid.SHORT);
        }
       
    }

    const voltar_interno = () => {

        props.negative(false);
        setQtdeAtual(0);
    }

    
 
 

    return (
        <Modal visible={props.visible} animationType='slide' transparent >
               
            <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.6)']} style={{flex: 1}}>
                <View style={[css.dFlex, css.alignItemsCenter, css.justifyContentCenter,css.container, css.px1]}>
                    <View style={[css.card, {width: '100%'}]}>
                        <Text style={[css.boldText, css.mb2, css.ml1, css.textXl, css.primaryText]}>{props.itemAtual != null ? props.itemAtual.Descricao : ''}</Text>
                        <View style={[css.justifyContentBetween, css.mb2,css.px1]}>

                            <View style={[css.dFlex, css.justifyContentBetween,  css.mt3, css.mb3]}>
                                <View style={[css.dFlex]}>

                                    <Text style={[css.comumText, css.textXl]}>R$ {props.itemAtual != null ? converter_para_real(parseFloat(props.itemAtual.Preco).toFixed(2)) : '0,00'}</Text>

                                </View>
                                <View style={[css.dFlex, css.mr1]}>

                                    <TouchableHighlight  underlayColor="#ba8a8c" style={[css.mr2]} onPress={() => setQtde('-')}>
                                        <FontAwesome5  name="minus" size={20} style={css.dangerText} />
                                    </TouchableHighlight>
                                    
                                    <Text style={[css.comumText, css.textLg]}>{qtdeAtual}</Text>

                                    <TouchableHighlight underlayColor="#93c998" style={[css.ml2]} onPress={() => setQtde('+')}>
                                        <FontAwesome5  name="plus" size={20} style={css.successText} />
                                    </TouchableHighlight>
                                </View> 

                            </View>
                            
                            <View style={[css.dFlex, css.justifyContentBetween, css.mt3]}>
                                <TouchableHighlight  underlayColor="#ba8a8c" style={[css.btnSecondary]} onPress={() => voltar_interno()} >
                                    <Text style={css.textBtnSecondary}>Voltar</Text>
                                </TouchableHighlight>
                                <TouchableHighlight  underlayColor="#ba8a8c" style={[css.btnPrimary, css.px2]} onPress={() => adicionar()} >
                                    <Text style={css.textBtnPrimary}>Adicionar</Text>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </View>
                
                </View>
            

            </LinearGradient>
        </Modal>
    )
}