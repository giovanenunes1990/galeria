import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Inicio';
import Login from './Login';
import Preload from './Preload';
const mainStack = createStackNavigator();

export default () => {


    return (
        <NavigationContainer>
            <mainStack.Navigator
                initialRouteName="Preload"
                        screenOptions={{ headerShown: false }}
            >
            <mainStack.Screen name="Login" component={Login} />
            <mainStack.Screen name="Preload" component={Preload} />
            <mainStack.Screen name="Início" component={Inicio} />
          
           
            </mainStack.Navigator>
        </NavigationContainer>
    )
}