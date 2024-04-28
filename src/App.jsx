import React from 'react';
import {
    SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor  } from './redux/store';

import { PersistGate } from 'redux-persist/es/integration/react';
import MainStack from './views/mainStack';


export default () => {


    return (
        
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaView style={{flex: 1}}>
                    <MainStack />
                </SafeAreaView>
            </PersistGate>
        </Provider>
    )
}