import { fetchChargerStationsInBbox } from './nobilActions'
export const INIT_MAP = 'INIT_MAP';
export const CENTER_CHANGED = 'CENTER_CHANGED';
export const ADD_VECTOR_LAYER = 'ADD_VECTOR_LAYER';
export const ADD_VECTOR_LAYER_WITH_STYLE = 'ADD_VECTOR_LAYER_WITH_STYLE';
export const ADD_FEATURES_TO_VECTOR_LAYER = 'ADD_FEATURES_TO_VECTOR_LAYER';
export const DETECT_FEATURES_AT_PIXEL = 'DETECT_FEATURES_AT_PIXEL';
export const START_CENTER = {};


function initMap(mapId, ref, center, zoom) {
  return {
    type: INIT_MAP,
    mapId,
    ref,
    center,
    zoom,
  };
}
export function addVectorLayer(mapId, layerId){
  return {
    type: ADD_VECTOR_LAYER,
    mapId,
    layerId,
  }
}
export function addVectorLayerWithStyle(mapId, layerId){
  return {
    type: ADD_VECTOR_LAYER_WITH_STYLE,
    mapId,
    layerId,
  }
}

export function addFeaturesToLayer(mapId, vectorLayerId, features){
  return {
    type: ADD_FEATURES_TO_VECTOR_LAYER,
    mapId,
    vectorLayerId,
    features
  }
}

export function createMap(mapId, ref, mapSettings) {
  return (dispatch, getState) => {
    let state = getState();
    if (state.map.map === undefined) {
      dispatch(initMap(mapId, ref));
    } else {
      const center = state.map.map.settings.center;
      const zoom = state.map.map.settings.zoom;
      console.log('new CENTER: ', center);
      dispatch(initMap(mapId, ref, center, zoom));
    }
    //   dispatch(loadMapSettings(mapId, mapSettings));
    state = getState();
    const mapData = state.map.map;
    mapData.map.on('moveend', e => {
      const view = e.map.getView();
      const center = view.getCenter();
      const zoom = view.getZoom();
      dispatch(centerChanged(mapData.id, mapData, { x: center[0], y: center[1] }, zoom));
      dispatch(fetchChargerStationsInBbox(mapData));
    });
    mapData.map.on('click', e => {
      dispatch(detectFeaturesAtPixel(mapData.id, e.pixel));
    });
    
    // if (state.map.map === undefined) {
    //   dispatch(initMap(mapId, ref));
    // //   dispatch(loadMapSettings(mapId, mapSettings));
    //   state = getState();
    //   const mapData = state.map.map;
    //   mapData.map.on('moveend', e => {
    //     const view = e.map.getView();
    //     const center = view.getCenter();
    //     const zoom = view.getZoom();
    //     dispatch(centerChanged(mapData.id, mapData, { x: center[0], y: center[1] }, zoom));
    //   });
    // } else {
    //   const mapData = state.map.map;
    //   mapData.map.setTarget(ref);
    // }
  };
}



export function centerChanged(mapId, mapData, center, zoom) {
  return {
    type: CENTER_CHANGED,
    mapId,
    mapData,
    center,
    zoom,
  };
}

export function detectFeaturesAtPixel(mapId, pixel){
  return {
    type: DETECT_FEATURES_AT_PIXEL,
    mapId,
    pixel,
  }
}


// export function centerChanged(coords) {
//     return function(dispatch){
//       dispatch({type: 'CENTER_CHANGED', payload: coords});
//     }
//   }
  
//   export function createMap(mapid) {
//     return function(dispatch, getState){
//       let state = getState();
//       if(state.map){ // TODO: check i f we have map already...
//         console.log('call initMap...');
//         dispatch(initMap(mapid));
  
//         state = getState();
  
//         const mapData = state.map;
//         mapData.map.on('moveend', e => {
//           console.log('move end...');
//           const view = e.map.getView();
//           const center = view.getCenter();
//           // const zoom = view.getZoom();
//           dispatch(centerChanged(center));
//         });
  
//         mapData.map.setTarget(document.getElementById(mapid));
//       }
//       dispatch({type: 'CREATE', payload: mapid});
//     }
//   }
  
//   export function initMap(mapid) {
//     return function(dispatch){
//       dispatch({type: 'INIT_MAP', payload: mapid});
//     }
//   }