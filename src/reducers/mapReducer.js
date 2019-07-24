
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
import { INIT_MAP, 
  CENTER_CHANGED, 
  ADD_VECTOR_LAYER, 
  ADD_VECTOR_LAYER_WITH_STYLE, 
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
      // if(mapData){
      //   const selectInteraction = new interaction_Select({
      //     layers: [mapData.vectorLayers['Featurelayer'].layer],
      //     // style: [selectEuropa]
      //   });

      //   mapData.map.getInteractions().extend([selectInteraction]);

      //   console.log('reducer - pixel at mapdata:', mapData);
      //   console.log('reducer - pixel at:', action.pixel);
        
      //   mapData.map.forEachFeatureAtPixel(action.pixel, function(feature, layer){
      //     console.log('jool');
      //   });
      // }
      return newState;

    case ADD_VECTOR_LAYER_WITH_STYLE:
      
      const chargerSource = new source_Vector();

      const cache = {};

      function markerStyle(feature, scale){
        //nästa steg: kolla url , key... if-satsen spärrar ändring av style?
        const url = feature.get('url');
        const key = scale + url;
        if(!cache[key]){
          cache[key] = new style_Style({
            image: new style_Icon({
              src: icon_position,
              color: '#FFF',
              anchor: [0.5, 0.5],
              scale: scale
            })
          });
        }
        return cache[key];
      }

      function chargerStyle(feature){
        return [markerStyle(feature, 1.1)];
      }
      function selectedStyle(feature){
        return [markerStyle(feature, 0.3)];
      }
      const chargerLayer = new layer_Vector({
        source: chargerSource,
        style: chargerStyle
      });

      // map, layer, view etc finns redan i store
      mapData.map.addLayer(chargerLayer);

      const select = new Select({
        layers: [chargerLayer],
        style: selectedStyle
      });
      mapData.map.addInteraction(select);

      const selectedFeatures = select.getFeatures();
      selectedFeatures.on('add', e => {
        console.log('selectedFeatures on add...', e); //eller kan man ändra stilen här?
      });

      selectedFeatures.on('remove', e => {
        console.log('selectedFeatures on remove...');
      });

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

    case ADD_FEATURES_TO_VECTOR_LAYER:
      console.log('point', action.features);
      console.log('reducer: ADD_FEATURES_TO_VECTOR_LAYER', mapData.vectorLayers[action.vectorLayerId]);
      
      // här behöver vi motsvarande chargerSource att lägga våra features i ...
      const layerSource = mapData.vectorLayers[action.vectorLayerId].layer.getSource();
      const singelFeature = new Feature(action.features);
      const coord = fromLonLat(action.features.position);
      const geom = new geom_Point(coord);
      singelFeature.setGeometry(geom);
      layerSource.addFeature(singelFeature);
      return newState;
      
    case ADD_VECTOR_LAYER:
      // doAddVectorLayer(mapData, newMapData, action.layerId);
      if (mapData && !mapData.vectorLayers[action.layerId]) {

        const cache = {};

        function photoStyle(feature, scale){
          const url = feature.get('url');
          const key = scale + url;
          if(!cache[key]){
            cache[key] = new style_Style({
              image: new style_Icon({
                src: icon_position,
                color: '#FFF',
                anchor: [0.5, 0.5],
                scale: scale
              })
            })
          }
          return cache[key];
        }

        function flickrStyle(feature){
          return [photoStyle(feature, 0.5)];
        }
        function selectedStyle(feature){
          return [photoStyle(feature, 0.3)];
        }

        const features = new Collection();
        const vectorLayer = new layer_Vector({
          id: 'europa',
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

        //lägg till addInteraction här?
        const select = new Select({
          layers: [vectorLayer],
          style: selectedStyle,
          // style: feature => {
          //   // return getLayerStyles(feature);
          // },
        });
        mapData.map.addInteraction(select);

        const selectedFeatures = select.getFeatures();
        selectedFeatures.on('add', e => {
          console.log('selectedFeatures on add...', e); //eller kan man ändra stilen här?
        });

        selectedFeatures.on('remove', e => {
          console.log('selectedFeatures on remove...');
        });

        // TODO: punkten har nu stilen... låt istället lagret ha stilen. Då kan man ändra stilen
        // och därmed ändra storl/färg när man klickar på ikonen...
        //testa lägg till features
        const item = {'title': 'jool', 'link': 'cool'};
        const feature = new Feature(item);
        feature.set('url', 'www.cooljool.se');
        const stKilLonLat = [17.391787, 59.881078];
        const coordinate = fromLonLat(stKilLonLat);
        const geometry = new geom_Point(coordinate); 
        const featureStyle = new style_Style({
          image: new style_Icon({
            src: icon_position,
            color: '#FFF',
            anchor: [0.5, 0.5],
            scale: 0.9
          })
        });

        feature.setStyle(featureStyle);
        feature.setGeometry(geometry);
        vectorLayer.getSource().addFeature(feature);

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
