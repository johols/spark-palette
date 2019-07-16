
import Map from 'ol/Map';
import View from 'ol/View';
// import { MAP_EXTENT, MAP_RESOLUTIONS } from './mapInitializationConstants';
import layer_Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Collection from 'ol/Collection';
import layer_Vector from 'ol/layer/Vector';
import source_Vector from 'ol/source/Vector';
import geom_Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import style_Style from 'ol/style/Style';
import style_Icon from 'ol/style/Icon';
import { get as getProjection, fromLonLat } from 'ol/proj';
import icon_position from '../images/dot.png';
import { INIT_MAP, 
  CENTER_CHANGED, 
  ADD_VECTOR_LAYER, 
  ADD_FEATURES_TO_VECTOR_LAYER, 
  DETECT_FEATURES_AT_PIXEL } from '../actions/mapActions';

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

    case DETECT_FEATURES_AT_PIXEL:
      if(mapData){
        console.log('reducer - pixel at:', action.pixel);
      }
      return newState;

    case ADD_VECTOR_LAYER:
      // doAddVectorLayer(mapData, newMapData, action.layerId);
      if (mapData && !mapData.vectorLayers[action.layerId]) {
        const features = new Collection();
        const vectorLayer = new layer_Vector({
          source: new source_Vector({
            features,
          }),
          style: feature => {
            // return getLayerStyles(feature);
          },
        });
        const layerData = {
          layer: vectorLayer,
          features,
          style: {
            strokeColor: '#ff3399',
            fillColor: 'rgba(255,255,255,0.4)',
            strokeWidth: 3,
            pointRadius: 4,
          },
        };
        newMapData.vectorLayers[action.layerId] = layerData;
        mapData.map.addLayer(vectorLayer);
      }
      return newState;

    case ADD_FEATURES_TO_VECTOR_LAYER:
      console.log('point', action.features);
      console.log('reducer: ADD_FEATURES_TO_VECTOR_LAYER', mapData.vectorLayers[action.vectorLayerId].features);
      const feature = new Feature({
        geometry: new geom_Point(action.features)
      });

      const featureStyle = new style_Style({
        image: new style_Icon({
          src: icon_position,
          color: '#EB1212',
          anchor: [0.5, 0.5],
          scale: 0.5
        })
      });

      feature.setStyle(featureStyle);

      // put feature in store ??

      const layer = mapData.vectorLayers[action.vectorLayerId].layer;
      if(layer){
        layer.getSource().addFeature(feature);
      }

      return newState;
    
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
