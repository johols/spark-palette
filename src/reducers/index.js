import ships from './shipsReducer';
import map from './mapReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    ships,
    map
});
export default rootReducer;