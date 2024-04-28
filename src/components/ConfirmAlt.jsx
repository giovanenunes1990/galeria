import React from 'react';
import {
    View, Text, Modal,
    TouchableHighlight
} from 'react-native';
import  {css}  from '../style';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => {

    return (
        <Modal visible={props.visible} animationType='slide' transparent >
               
            <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0.8)']} style={{flex: 1}}>
                <View style={[css.dFlex, css.alignItemsEnd, css.container, css.px1, css.mb1]}>
                    <View>
                        <Text style={[css.comumWhiteText, css.textCenter, css.mb2, css.ml1]}>{props.msg}</Text>
                        <View style={[css.dFlex, css.justifyContentBetween, css.mb2, css.ml1,css.px1]}>
                        
                            <TouchableHighlight  underlayColor="#ba8a8c" style={[css.btnSecondary]} onPress={() => props.negative(false)} >
                                <Text style={css.textBtnSecondary}>NÃO</Text>
                            </TouchableHighlight>
                            <TouchableHighlight  underlayColor="#ba8a8c" style={[css.btnDanger, css.px2]} onPress={() =>  props.positive(props.index)} >
                                <Text style={css.textBtnDanger}>SIM!</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                
                </View>
            

            </LinearGradient>
        </Modal>
    )
}