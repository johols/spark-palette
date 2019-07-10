import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as statisticsActions from '../../actions/statisticsActions';
import DataCard from './DataCard';

export class DataCardContainer extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  componentDidMount() {
    this.props.actions.fetchStatistics('stats_GetSumChargerstations', 'SWE');
    this.props.actions.fetchStatistics();
    this.props.actions.fetchStatistics('stats_GetSumChargerstations', 'NOR');
  }

  render() {
    return <DataCard stats={this.props.statistics.statistics.stats} title={'Statistik'}/>
  }
}

const mapStateToProps = (state) => ({
  statistics: state.statistics
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(statisticsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataCardContainer)
