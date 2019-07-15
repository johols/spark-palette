
import Map from 'ol/Map';
import View from 'ol/View';
// import { MAP_EXTENT, MAP_RESOLUTIONS } from './mapInitializationConstants';
import layer_Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { get as getProjection, fromLonLat } from 'ol/proj';
import { INIT_MAP, CENTER_CHANGED } from '../actions/mapActions';

const initialState = {
  maps: {},
  images: {},
};

export default function reducer(state = initialState, action = {}) {
  const mapData = state.map;
  const newState = { ...state };
  newState.map = { ...newState.map };
  const newMapData = newState.map;

  switch (action.type) {
    case INIT_MAP:
      newState.map = newMap(action.mapId, action.ref, action.center, action.zoom);
      return newState;
    
    case CENTER_CHANGED:
      if (mapData) {
        newMapData.settings.center = action.center;
        newMapData.settings.zoom = action.zoom;
      }
      return newState;

    // case vectorLayerConstants.ADD_VECTOR_LAYER:
    //   doAddVectorLayer(mapData, newMapData, action.layerId);
    //   return newState;
    
    // case UPDATE_MARKER:
    //   doUpdateMarker();
    //   return newState;

    // case ADD_MARKER:
    //   doAddMarker(mapData, newMapData, action.layerId, action.coordinates, action.shouldRemoveOldMarkersInLayer);
    //   return newState;
      
    default:
      return state;
  }
}  

function newMap(id, ref, center, zoom) {
  const stKilLonLat = [17.391787, 59.881078];
  const stKilWebMercator = fromLonLat(stKilLonLat);
  console.log('stKilWebMercator', stKilWebMercator);
  const pos = center ? [center.x, center.y] : stKilWebMercator;

  const level = zoom ? zoom : 6;
  const layer = new layer_Tile({source: new OSM()});
  
  const map = new Map({
    layers: [],
    view: new View({
      // extent: MAP_EXTENT,
      // projection: projection,
      // center: [564931, 6607899],
      center: pos,
      // center: stKilWebMercator,
      zoom: level,
      // resolutions: MAP_RESOLUTIONS,
    }),
  });
  map.setTarget(ref);
  map.addLayer(layer);
  return {
    id: id,
    map: map,
    settings: {
      layers: [],
    },
    layers: {},
    vectorLayers: {},
    draw: {
      currentInteractions: [],
    },
    savedImages: [],
    ref: ref,
    measurement: {},
    marker: {},
    mapMarker: {},
  };
}
