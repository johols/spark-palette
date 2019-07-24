import ships from './shipsReducer';
import map from './mapReducer';
import statistics from './statisticsReducer';
import nobil from './nobilReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    ships,
    map,
    statistics,
    nobil
});
export default rootReducer;