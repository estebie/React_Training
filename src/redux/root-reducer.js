import { combineReducers } from "redux";
import userReducer from './user/user.reducer';
import { cartReducer } from "./cart/cart.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cart']
}


const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);