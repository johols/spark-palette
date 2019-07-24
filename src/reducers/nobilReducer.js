import { FETCH_CHARGER_STATIONS_IN_BBOX,
  FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED,
  FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED } from '../actions/nobilActions';
  
const initialState = {
  fetchingChargingStations: false,
  fetchedChargingStations: false,
  chargerstations: [],
};

export default function reducer(state = initialState, action = {}) {
  const newState = { ...state };
  
  switch (action.type){
    case FETCH_CHARGER_STATIONS_IN_BBOX: 
      newState.fetchingChargingStations = true;
      newState.fetchedChargingStations = false;
      return newState;

    case FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED:
      console.log('FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED', action.payload);
      newState.fetchingChargingStations = false;
      newState.fetchedChargingStations = (action.payload.error === 'No data found' ? false : true);
  
      if(!action.payload.error){
        // newState['statistics'].stationsAmountSwe = [...state.statistics.stationsAmountSwe, action.payload.chargerstations[0].count];
        newState.chargerstations =  action.payload;
      }
      return newState;
  
    case FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED: {
      console.log('FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED', action.payload);
      newState.fetchingChargingStations = false;
      newState.fetchedChargingStations = false;
      newState.error = action.payload
      return newState;
    }
  
    default:
      return state;
  }
}