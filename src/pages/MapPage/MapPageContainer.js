import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as mapActions from '../../actions/mapActions';

import {addVectorLayer, createVectorLayer, addVectorLayerWithStyle, addSingleFeatureToLayer, addFeaturesToLayer} from '../../actions/mapActions';
import MapPage from './MapPage';

export class MapPageContainer extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return <MapPage {...this.props} />
  }
}

export default connect(
  state => ({chargerstations: state.nobil.chargerstations}),
  dispatch =>
    bindActionCreators(
      {
        addVectorLayer, addSingleFeatureToLayer, addFeaturesToLayer, addVectorLayerWithStyle, createVectorLayer
      },
      dispatch
    ),
  null,
)(MapPageContainer);
