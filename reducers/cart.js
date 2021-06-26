import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QTY,
  DECREMENT_QTY,
} from "../constants/ActionTypes";

export default function cartReducer(
  state = {
    cart: [],
  },
  action
) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            quantity: 1,
          },
        ],
      };

    case INCREMENT_QTY:
        console.log(action);
      if (
        state.cart.findIndex((product) => product.id === action.productId) !==
        -1
      ) {
    
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === action.productId) {
            //console.log('price: '+product.price+'Qty: '+product.qty)
            cartAcc.push({
              ...product,
              quantity: product.quantity + 1,
            }); // Increment qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);
        
        return { ...state, cart };
      }

    case DECREMENT_QTY:
      if (
        state.cart.findIndex((product) => product.id === action.productId) !==
        -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === action.productId && product.quantity > 1) {
            //console.log('price: '+product.price+'Qty: '+product.qty)
            cartAcc.push({
              ...product,
              quantity: product.quantity - 1,
            }); // Decrement qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            qty: action.qty,
            sum: action.product.price * action.qty,
          },
        ],
      };

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((item) => item.id !== action.product_id),
      };

    default:
  }
  return state;
}
