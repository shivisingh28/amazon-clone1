export const initialState = {
    user:null,
    basket: [],
};
//Selector
export const getBasketTotal =(basket) =>
    basket?.reduce((amount,item)=>item.price+amount,0);

//reduce maps through the basket ie it iterates through each item in the basket and adds up everything

const reducer = (state, action) => {
    //console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            // Logic for adding item to basket
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }
        case 'REMOVE_FROM_BASKET':
            //return {
              //  ...state,
              //  basket: state.basket.filter(item => item.id !== action.payload)
              const index = state.basket.findIndex(
                  (basketItem) => basketItem.id === action.id
              );
              let newBasket = [...state.basket];
              if(index >= 0){
                  newBasket.splice(index,1);

              }else{
                  console.warn(
                      `Can't remove product (id: ${action.id}) as it's not in basket !`
                  )
              }
              return{
                  ...state,
                  basket: newBasket
              }
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }

        default:
            return state;
    }
};

export default reducer;