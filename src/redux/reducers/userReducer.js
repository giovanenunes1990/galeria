import { 
    createSlice 
} from '@reduxjs/toolkit';

export const slice = createSlice({ // fatia ou um session do php 
    name:' user', // nome do session
    initialState : { // conteudo inicial da session
        user: {}
    },
    reducers:{ // as ações que podem ser aplicadas  a esse slice
        SET_USER: (state, action) => { 
            state.user = action.payload;
        },
        DESTROY_USER: (state, action) => { 
            state.user = {
                id: '',
                nome: '',
                token: ''
            };
        },
    }
});

export const { SET_USER , DESTROY_USER} = slice.actions;
export default slice.reducer;