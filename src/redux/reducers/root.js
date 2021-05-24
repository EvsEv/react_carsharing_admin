import { combineReducers } from 'redux';
import { auth } from './auth';
import { orderList } from './orderList';

export const rootReducer = combineReducers({ auth, orderList });
