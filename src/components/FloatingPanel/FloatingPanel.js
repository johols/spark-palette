// snippet: rafcp
import './FloatingPanel.css';
import React from 'react';
import PropTypes from 'prop-types';

const FloatingPanel = props => {
  return (
    <div id="panel-wrapper">
      <div id="floating-panel">
        <div className="title">
          <h3>Titel på stn</h3>
          <p>Adress 123 56 Stad</p>
        </div>
        <div className="info">
          <p>CHAdeMO: ledig</p>
          <p>CCS: ledig</p>
          <p>Typ 2: ledig</p>
        </div>
        <p>Metadata Metadata Metadata Metadata</p>
      </div>
    </div>
  )
}

FloatingPanel.propTypes = {

}

// export default FloatingPanel -> exportera ist. funktionen FloatingPanel...
export default FloatingPanel;


