import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import productReducer from './products';
// import cartReducer from './cart';
// import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import loginReducer from './login';
import categoryListReducer from "./category";
import shopListReducer from "./shop";
import menuListReducer from "./menu";
// import compareReducer from './compare';


const rootReducer = combineReducers({
    data: productReducer,
    // cartList: cartReducer,
    // filters: filtersReducer,
    wishlist: wishlistReducer,
    // compare: compareReducer,
    login: loginReducer,
    categories: categoryListReducer,
    shops: shopListReducer,
    menus: menuListReducer,
    Intl
});

export default rootReducer;
