
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
// import interaction_Select from 'ol/interaction/Select';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { INIT_MAP, 
  CENTER_CHANGED, 
  ADD_VECTOR_LAYER, 
  ADD_VECTOR_LAYER_WITH_STYLE, 
  ADD_SINGLE_FEATURE_TO_VECTOR_LAYER,
  ADD_FEATURES_TO_VECTOR_LAYER, 
  DETECT_FEATURES_AT_PIXEL, TEST_ACTION } from '../actions/mapActions';
import { convertNOBILtoOL } from '../utils/convertNOBILtoOL';
import { chargerStyle, selectedStyle } from '../olHelpers/layerStyles';

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
      console.log('DETECT_FEATURES_AT_PIXEL - pix', action.pixel);
      console.log('DETECT_FEATURES_AT_PIXEL', action.features);
      if(mapData){
        newMapData.featuresDetected = {
          'atPixel': action.pixel,
          'features': action.features }
      }
      return newState;

    case TEST_ACTION:
      console.log('in reducer for TEST_ACTION', action);
      return newState;

    case ADD_VECTOR_LAYER_WITH_STYLE:
      console.log('ADD_VECTOR_LAYER_WITH_STYLE!');
      const chargerSource = new source_Vector();

      // const cache = {};

      // function markerStyle(feature, scale){
      //   //nästa steg: kolla url , key... if-satsen spärrar ändring av style?
      //   const url = feature.get('url');
      //   const key = scale + url;
      //   if(!cache[key]){
      //     cache[key] = new style_Style({
      //       image: new style_Icon({
      //         src: icon_position,
      //         color: '#FFF',
      //         anchor: [0.5, 0.5],
      //         scale: scale
      //       })
      //     });
      //   }
      //   return cache[key];
      // }

      // function chargerStyle(feature){
      //   return [markerStyle(feature, 1.1)];
      // }
      // function selectedStyle(feature){
      //   return [markerStyle(feature, 0.3)];
      // }
      const chargerLayer = new layer_Vector({
        source: chargerSource,
        style: chargerStyle
      });

      // map, layer, view etc finns redan i store
      mapData.map.addLayer(chargerLayer);

      const select = new Select({
        condition: click,
        layers: [chargerLayer],
        style: selectedStyle
      });
      mapData.map.addInteraction(select);

      // const selectedFeatures = select.getFeatures();
      // selectedFeatures.on('add', e => {
      //   console.log('selectedFeatures on add...', e); //eller kan man ändra stilen här?
      // });

      // selectedFeatures.on('remove', e => {
      //   console.log('selectedFeatures on remove...');
      // });

      const layerData = {
        layer: chargerLayer,
      };
      newMapData.vectorLayers[action.layerId] = layerData;

      // lägg till features...
      const item = {'id':'1', 'name': 'jool'};
      const featureOne = new Feature(item);
      const lonLatOne = [17.391787, 59.881078];
      const coordinate = fromLonLat(lonLatOne);
      const geometry = new geom_Point(coordinate); 
      featureOne.setGeometry(geometry);
      featureOne.set('url', 'www.cooljool.se');
      chargerSource.addFeature(featureOne);

      
      const item2 = {'title': 'jool2', 'link': 'cool2'};
      const feature2 = new Feature(item2);
      feature2.set('url', 'www.cooljool2.se');
      const uppsalaLonLat = [17.635803, 59.829117];
      const coordinate2 = fromLonLat(uppsalaLonLat);
      const geometry2 = new geom_Point(coordinate2); 

      feature2.setGeometry(geometry2);
      chargerSource.addFeature(feature2);
      return newState;

    case ADD_SINGLE_FEATURE_TO_VECTOR_LAYER:
      console.log('point', action.feature);
      console.log('reducer: ADD_SINGLE_FEATURE_TO_VECTOR_LAYER', mapData.vectorLayers[action.vectorLayerId]);
      
      // här behöver vi motsvarande chargerSource att lägga våra features i ...
      const layerSource = mapData.vectorLayers[action.vectorLayerId].layer.getSource();
      const singelFeature = new Feature(action.feature);
      const coord = fromLonLat(action.feature.position);
      const geom = new geom_Point(coord);
      singelFeature.setGeometry(geom);
      layerSource.addFeature(singelFeature);
      return newState;

    case ADD_FEATURES_TO_VECTOR_LAYER:
      console.log('action', action);
      console.log('reducer: ADD_FEATURES_TO_VECTOR_LAYER', mapData.vectorLayers[action.vectorLayerId]);
      const vectorLayerSource = mapData.vectorLayers[action.vectorLayerId].layer.getSource();
      vectorLayerSource.clear();
      // här behöver vi motsvarande chargerSource att lägga våra features i ...
      action.features.forEach((element, index) => {
        // const vectorLayerSource = mapData.vectorLayers[action.vectorLayerId].layer.getSource();
        const featureToAdd = new Feature(element);
        
        const position = convertNOBILtoOL('position', element.csmd.Position);
        console.log('position: ', position); //TODO:skapa helperfunc getPosition
        const coord = fromLonLat(position);
        const geom = new geom_Point(coord);
        featureToAdd.setGeometry(geom);
        //TODO: set url för att få stylen att ändras...
        featureToAdd.set('url', 'www.cooljool.se' + element.csmd.id);
        vectorLayerSource.addFeature(featureToAdd);
      })
      return newState;
      
    case ADD_VECTOR_LAYER:
      
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
