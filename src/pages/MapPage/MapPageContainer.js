import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as mapActions from '../../actions/mapActions';

import {addVectorLayer, addVectorLayerWithStyle, addFeaturesToLayer} from '../../actions/mapActions';
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
  state => ({}),
  dispatch =>
    bindActionCreators(
      {
        addVectorLayer, addFeaturesToLayer, addVectorLayerWithStyle
      },
      dispatch
    ),
  null,
)(MapPageContainer);
