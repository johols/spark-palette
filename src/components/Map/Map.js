import React, { Component } from 'react';
import * as ol from 'ol';
import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mapActions from '../../actions/mapActions';

class Map extends Component {

  constructor(props){
    super(props);
    console.log('Map constructor');
    this.map = undefined;
  }
  componentDidMount(){
    console.log('component MAP did mount', );

    const stKilLonLat = [17.391787, 59.881078];
    const stKilWebMercator = fromLonLat(stKilLonLat);

    this.layer = new TileLayer({source: new OSM()});
    this.map = new ol.Map({
      layers: [],
      view: new ol.View({
        center: stKilWebMercator,
        zoom: this.props.zomm || 14
      })
    });

    this.map.setTarget(document.getElementById('mapContainer'));
    this.map.addLayer(this.layer);

    this.map.on('moveend', e => {
      console.log('move end...');
      const view = e.map.getView();
      const center = view.getCenter();
      const zoom = view.getZoom();
      // dispatch(centerChanged(mapData.id, mapData, { x: center[0], y: center[1] }, zoom));
      this.props.actions.centerChanged(center);
    })

    if(this.props.map)
      this.props.actions.initMap(this.map);
  }

  render() {
    return (
      <div ref="mapContainer" id="mapContainer"></div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    mapCenter: state.mapCenter,
    map: state.map
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(mapActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
