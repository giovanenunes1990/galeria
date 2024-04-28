import React, {useState} from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, ToastAndroid  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import  {css}  from '../style';
import { SET_USER } from '../redux/reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {CONFIG} from '../define';


export default () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const USER = useSelector( (state)=> state.user.user); 
   

    const login =  async () => {

        const path = CONFIG.base_url;

        var formdata = new FormData();
        formdata.append("email", email); 
        formdata.append("pass", pass); 

        let req = await fetch(path+"?acao=login", {
            method: 'POST',
            body: formdata,
            
        });
        let json = await req.json();
      

        if(json[0]['error'] == ''){
            json = json[0];

            let tmp_user = {
                id: json.id_cliente,
                nome: json.nome_fantasia,
                token: json.token
            };
            dispatch( SET_USER(tmp_user));
            navigation.navigate('Início');

        }else{
            ToastAndroid.show(json[0]['error'], ToastAndroid.SHORT);
        }
        
    }


    return (
        <LinearGradient colors={['rgb(194,194,194)','rgb(237,237,237)', 'rgb(237,237,237)']} style={{flex: 1}}>
           
                <View style={[css.container, css.justifyContentCenter, css.alignItemsCenter]}>
                        
                        <Image 
                            style={css.imgLogoLogin}
                            source={require('../assets/images/Galeria.png')}
                            resizeMode="contain"
                        />
                        <View style={[css.w100, css.px2]}>
                            <TextInput
                                style={[css.formControl, css.mb2]}
                                onChangeText={(txt) => setEmail(txt)}
                                value={email}
                                placeholder="Insira seu e-mail"
                                placeholderTextColor="gray"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[css.formControl, css.mt2]}
                                onChangeText={(txt)=> setPass(txt)}
                                value={pass}
                                placeholder="Insira sua senha"
                                
                                placeholderTextColor="gray"
                                secureTextEntry={true} // Configura para exibir os caracteres como "password"
                            />
                            
                        </View>
                        <TouchableOpacity style={[css.btnPrimary, css.mt3]} onPress={login}>
                            <Text style={[css.textBtnPrimary,css.px2,{textAlign: 'center'}]}>Entrar</Text>
                        </TouchableOpacity>
                
                </View>
           
            
        </LinearGradient>
    )
}