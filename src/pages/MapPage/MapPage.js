import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  MapContainer from '../../components/Map/MapContainer';
import { fromLonLat } from 'ol/proj';

const MAP_ID = 'mapid'; //TODO: feed to MapContainer
const FEATURE_LAYER = 'Featurelayer';
// const featuresToAdd = [{'lon': '17.391787', 'lat': '59.881078'}];
const stKilLonLat = [17.391787, 59.881078];
const featuresToAdd = fromLonLat(stKilLonLat);

class MapPage extends Component {

  componentDidMount(){
    this.props.addVectorLayer(MAP_ID, FEATURE_LAYER);
    this.props.addFeaturesToLayer(MAP_ID, FEATURE_LAYER, featuresToAdd);
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
