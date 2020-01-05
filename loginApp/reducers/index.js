import {combineReducers} from 'redux';
import accesoReducers from './accesoReducers';
 
const Reducers = combineReducers({
    acceso: accesoReducers
});
export default Reducers;