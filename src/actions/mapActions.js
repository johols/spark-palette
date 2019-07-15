export const INIT_MAP = 'INIT_MAP';
export const CENTER_CHANGED = 'CENTER_CHANGED';

function initMap(mapId, ref) {
  return {
    type: INIT_MAP,
    mapId,
    ref,
  };
}

export function createMap(mapId, ref, mapSettings) {
  return (dispatch, getState) => {
    let state = getState();
    if (state.map.map === undefined) {
      dispatch(initMap(mapId, ref));
    //   dispatch(loadMapSettings(mapId, mapSettings));
      state = getState();
      const mapData = state.map.map;
      mapData.map.on('moveend', e => {
        const view = e.map.getView();
        const center = view.getCenter();
        const zoom = view.getZoom();
        dispatch(centerChanged(mapData.id, mapData, { x: center[0], y: center[1] }, zoom));
      });
    } else {
      const mapData = state.map.map;
      mapData.map.setTarget(ref);
      // const mapData = state.map.maps[mapId];
      // console.log('map exists..', mapData);
      // const storedView = mapData.map.getView();
      // const storedCenter = storedView.getCenter();
      // dispatch(centerChanged(mapData.id, mapData, mapData.settings.center, 5));
    }
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