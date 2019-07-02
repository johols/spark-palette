import React, { Component } from 'react';
// import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as shipsActions from '../../actions/shipsActions';

class AboutPage extends Component {
  
  componentDidMount() {
    console.log('Component DID MOUNT!');
    this.props.actions.fetchShips();
 }

  render() {
    return (
      <div className="about-page">
        About
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ships: state.ships
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(shipsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);