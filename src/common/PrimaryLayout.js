import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrimaryHeader from './PrimaryHeader';
import PrimaryFooter from './PrimaryFooter';
import HomePage from '../pages/HomePage';
import MapPageContainer from '../pages/MapPage';
import AboutPage from '../pages/AboutPage';
// import ContactPage from '../pages/ContactPage';

class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primary-layout">
        <PrimaryHeader />
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/map" component={MapPageContainer} />
            <Route path="/about" component={AboutPage} />
            {/* <Route path="/contact" component={ContactPage} /> */}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    );
  }
}

export default PrimaryLayout;
