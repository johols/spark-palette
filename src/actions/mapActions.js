export function centerChanged(coords) {
    return function(dispatch){
      dispatch({type: 'CENTER_CHANGED', payload: coords});
    }
  }
  
  export function createMap(mapid) {
    return function(dispatch, getState){
      let state = getState();
      if(state.map){ // TODO: check i f we have map already...
        console.log('call initMap...');
        dispatch(initMap(mapid));
  
        state = getState();
  
        const mapData = state.map;
        mapData.map.on('moveend', e => {
          console.log('move end...');
          const view = e.map.getView();
          const center = view.getCenter();
          // const zoom = view.getZoom();
          dispatch(centerChanged(center));
        });
  
        mapData.map.setTarget(document.getElementById(mapid));
      }
      dispatch({type: 'CREATE', payload: mapid});
    }
  }
  
  export function initMap(mapid) {
    return function(dispatch){
      dispatch({type: 'INIT_MAP', payload: mapid});
    }
  }