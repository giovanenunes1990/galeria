import { 
    createSlice 
} from '@reduxjs/toolkit';

export const slice = createSlice({ // fatia ou um session do php 
    name:' cart', // nome do session
    initialState : { // conteudo inicial da session
        cart: [],
    },
    reducers:{ // as ações que podem ser aplicadas  a esse slice
       
        ADD_ITEM : (state, action) => { 
            let tmp_cart =  state.cart.slice();

            //primeiro verifique se existe no carrinho
            const itemExiste = tmp_cart.some(this_item => this_item.IdCodigoProduto === action.payload.IdCodigoProduto);

            if(itemExiste){
               
                tmp_cart = tmp_cart.map((this_item) =>{
                
                    if(this_item.IdCodigoProduto === action.payload.IdCodigoProduto){
                        this_item = action.payload;
                        
                    }
                    return this_item;
                });
                
               
                state = { ...state, cart: tmp_cart };
            }else{
                state.cart.push(action.payload);
               
            }
            
        },
       
        REMOVE_ITEM: (state, action) => { 
            let tmp_cart =  state.cart;
            const indexToRemove = action.payload;

            if (indexToRemove > -1 && indexToRemove < tmp_cart.length) {
                tmp_cart.splice(indexToRemove, 1);
            }

            state.cart = tmp_cart;
        }, 
        ESVAZIAR_CAR: (state, action) => {
            state.cart = [];
        }
        
    }
});

export const { ADD_ITEM, REMOVE_ITEM, ESVAZIAR_CAR } = slice.actions;
export default slice.reducer;