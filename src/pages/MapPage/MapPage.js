import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  MapContainer from '../../components/Map/MapContainer';
import { fromLonLat } from 'ol/proj';

const MAP_ID = 'mapid'; //TODO: feed to MapContainer
const FEATURE_LAYER = 'Featurelayer';
const FEATURE_LAYER_WITH_STYLE = 'FeaturelayerWithStyle';
// const featuresToAdd = [{'lon': '17.391787', 'lat': '59.881078'}];
const alsikeLonLat = [17.766953, 59.764435];
// const featuresToAdd = fromLonLat(stKilLonLat);
const featuresToAdd = {'position': alsikeLonLat, 'title': 'Alsike', 'url': 'www.cooljool3.se'};

class MapPage extends Component {

  componentDidMount(){
    // this.props.addVectorLayer(MAP_ID, FEATURE_LAYER);
    this.props.addVectorLayerWithStyle(MAP_ID, FEATURE_LAYER_WITH_STYLE);
    this.props.addSingleFeatureToLayer(MAP_ID, FEATURE_LAYER_WITH_STYLE, featuresToAdd);
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps) {
      // console.log('props of MapPage:', nextProps);
      //Här blir det krasch pga att addFeaturesToLayer inte hanterar arrayer av features... TOFIX!
      this.props.addFeaturesToLayer(MAP_ID, FEATURE_LAYER_WITH_STYLE, nextProps.chargerstations);
    }
  }

  render() {
    return (
      <div className="map-page">
        <MapContainer id={MAP_ID}/> 
      </div>
    );
  }
}

MapPage.propTypes = {
  addVectorLayer: PropTypes.func.isRequired,
};

export default MapPage;
