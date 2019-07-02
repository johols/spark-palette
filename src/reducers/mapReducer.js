// import { newMap, createLayer } from '../components/OLMap/olFacade';

export default function reducer(state={}, action) {
  const mapData = state.map;
  const newState = { ...state };
  newState.map = { ...newState.map};
  const newMapData = newState.map;
  
  switch (action.type){
    case "CENTER_CHANGED": {
      console.log('CENTER_CHANGED...', action.payload);
      return {...state, mapCenter: action.payload}
    }
    // case "INIT_MAP": {
    //   console.log('INIT_MAP action...');
    //   newState.map = newMap(action.payload);

    //   // return {...state, map: action.payload}
    //   return newState;
    // }
    case "INIT": {
      console.log('INIT action...');
      return {...state, map: action.payload}
    }
    default: return state;
  }
}