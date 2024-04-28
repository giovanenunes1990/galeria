import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import {CONFIG} from '../define';

export default () => {
    const USER = useSelector( (state)=> state.user.user); 
    const navigation = useNavigation();
    let token = USER.token;

    const validate = async () => {

        if(token != null && token != undefined && token != ''){

            try {
          
                let token = USER.token;
                const path = CONFIG.base_url;
    
                var formdata = new FormData();
                formdata.append("token", token); 
        
                let req = await fetch(path+"?acao=validar", {
                    method: 'POST',
                    headers:{
                        "Content-Type": "multipart/form-data"
                    },
                    body: formdata,
                   
                });
                let json = await req.json();
               // console.warn(json);
                if(json['error'] == '' && json['success'] == 'token valido'){
                    navigation.navigate('Início');
                }else{
                    navigation.navigate('Login');
                }
         
            } catch (error) {
               console.warn(error);
            }

        }else{
            navigation.navigate('Login');
        }
       
     
    }

    useFocusEffect(() => {
        validate();
    });

    return (
        <View>
        </View>
    )
}