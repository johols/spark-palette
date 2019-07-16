import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { createMap, centerChanged } from '../../actions/mapActions';
import * as mapActions from '../../actions/mapActions';
import 'ol/ol.css';

// OBS! när komponenten används (i.e MapPage) -> kolla att man använder RÄTT import (dvs default utan måsvingar som är connected)
// TODO: behövs ref i detta fall?
export class MapContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.actions.createMap(this.props.id, 'mapid'); 
  }

  render() {
    return (
      <div ref="mapid" id={ this.props.id }>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  statistics: state.statistics
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(mapActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
