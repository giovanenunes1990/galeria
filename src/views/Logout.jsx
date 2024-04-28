import React, {useState, useEffect} from 'react';
import {
    View, Text
} from 'react-native';
import  {css}  from '../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Confirm from '../components/Confirm';
import { useSelector, useDispatch } from 'react-redux';
import { DESTROY_USER } from '../redux/reducers/userReducer';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
    const [visibleModal, setVisibleModal] = useState(true);
    const dispatch = useDispatch();

    const voltar = () => {
        setVisibleModal(false);
        navigation.goBack();
    }

    const encerrar = () => {
        setVisibleModal(false);
        dispatch(DESTROY_USER());
        navigation.navigate('Preload');
    }

    const  callModal= () => {
        setVisibleModal(true);
    }

    useFocusEffect(() => {
        callModal();
    });
    
    return (
        <View style={[css.container, css.dFlex, css.justifyContentCenter, css.alignItemsCenter, css.mainBackground]}>
            <MaterialCommunityIcons  name="exit-run" size={220} style={{color: '#b80202'}}/>

            <Confirm visible={visibleModal} 
                    msg="Tem certeza que deseja sair?" 
                    negative={voltar}
                    positive={encerrar}
            />
        </View>
    )
}