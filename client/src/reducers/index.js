import rawdata from './rawdata';
import loggedReducer from './isLogged';

import{combineReducers} from 'redux';

const allReducers =combineReducers({
    rawdata: rawdata,
    isLogged:loggedReducer
})


export default allReducers;