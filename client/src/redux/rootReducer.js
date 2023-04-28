const initialState ={
    loading:false,
    cartItems:[],
};


export const rootReducer = (state = initialState,action) =>{
       switch(action.type){
        case "AddToCart":
         
           
            const lookForCart = state?.cartItems?.find(crt => crt?._id === action.payload?._id)
if (lookForCart) return state
return {...state,  cartItems : 
    [...state.cartItems,action.payload]
};
               /*
            return{
                ...state,
                cartItems : 
                [...state.cartItems,action.payload]
               
            } ;




            const { _id } = action.payload;
            const dupe = state.cartItems.find(obj => obj._id === _id);
            return dupe ? state : [...state, action.payload ];
            */
            case "Update" : 
            return{
            ...state,
            cartItems : state.cartItems.map((item) => item._id === action.payload._id ? {...item,quantity:action.payload.quantity}:item)
            };                                                                 //item._id === action.payload._id ? {...item,quantity:action.payload.quantity}:item
            case "DeleteFromCart" : 
            return{
            ...state,
            cartItems : state.cartItems.filter((item) => item._id !== action.payload._id ),
            };
             case "DeleteCartItems" : 
             return{
                cartItems : []
             }

           
        default:
            return state;
        
       }
};