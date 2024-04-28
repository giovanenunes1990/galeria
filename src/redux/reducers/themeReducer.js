import { 
    createSlice 
} from '@reduxjs/toolkit';

import { useColorScheme } from 'react-native';
const scheme = useColorScheme();

export const slice = createSlice({ // fatia ou um session do php 
    name:' theme', // nome do session
    initialState : { // conteudo inicial da session
        theme: scheme == 'dark' ? 'dark' : 'light' ,
    },
    reducers:{ // as ações que podem ser aplicadas  a esse slice
        setTheme: (state, action) => { 
            state.theme = action.payload;
        },
        
    }
});

export const { setTheme } = slice.actions;
export default slice.reducer;