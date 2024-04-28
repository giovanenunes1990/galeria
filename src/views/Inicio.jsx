import React from 'react';
import {
    View, Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Produtos from './Produtos';
import Ultimas from './Ultimas';
import Logout from './Logout';
import Carrinho from './Carrinho';
import { useSelector } from 'react-redux';

const mainTab = createBottomTabNavigator();

export default () => {

    const CART = useSelector( (state)=> state.cart.cart); 

    return (
        <mainTab.Navigator
        initialRouteName={CART.length > 0 ? 'Carrinho' : 'Produtos'}
        elevation={4}
		screenOptions={({ route }) => ({
                   
                     headerShown: false,
                    
                     labelStyle: { fontSize: 16, fontWeight: 'bold' },
                     tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                       
            
                        if (route.name === 'Produtos') {
                          iconName =  'newspaper';
                            return <FontAwesome5  name={iconName} size={size} style={{color: color}} />;
                       
                        } else if (route.name === 'Últimas Compras') {
                          iconName = 'clipboard-list';

                          return <FontAwesome5  name={iconName} size={size} style={{color: color}} />;
                        
                        } else if (route.name === 'Carrinho') {
                            iconName = 'shopping-cart';
  
                            return <FontAwesome5  name={iconName} size={size} style={{color: color}} />;
  

                        }else if (route.name === 'Logout') {
                            iconName =  'exit-to-app';

                            return <MaterialIcons  name={iconName} size={25}  style={{color: color}} />
                        }

                      
                       
                      },
                      tabBarActiveTintColor: '#1168bf',
                      tabBarInactiveTintColor: 'gray',
                     tabBarActiveTintColor: '#1168bf',
                     tabBarInactiveTintColor: 'gray',
                 })}
	    >
            <mainTab.Screen name="Últimas Compras" component={Ultimas} />
            <mainTab.Screen name="Produtos" component={Produtos} />
            <mainTab.Screen name="Carrinho" component={Carrinho} />
            <mainTab.Screen name="Logout" component={Logout} />
            
         </mainTab.Navigator>
    )
}