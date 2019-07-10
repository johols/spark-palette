import ships from './shipsReducer';
import map from './mapReducer';
import statistics from './statisticsReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    ships,
    map,
    statistics
});
export default rootReducer;