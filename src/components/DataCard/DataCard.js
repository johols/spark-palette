//rafcp
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './DataCard.css';

const DataCard = props => {

  const renderTableData = (stats) => {
    return stats.map((data, index) => {
       const { attr, value } = data; //destructuring
       return (
          <tr key={index}>
             <td>{attr}</td>
             <td>{value}</td>
          </tr>
       )
    })
    // return <p>jooool</p>
  }

  return (
    <Fragment>
      <div className='data-card-wrapper'>
        <h3><span>{props.title}</span></h3>
        <table className='data-card-table'>
            <tbody>
              {renderTableData(props.stats)}
            </tbody>
        </table>
      </div>
    </Fragment>
  )
}

DataCard.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.object
};

DataCard.defaultProps = {
  title: 'Default title',
  stats: [{ id: '1', attr: 'Laddstationer Sverige', value: '1234'},
  { id: '2', attr: 'Laddpunkter Sverige', value: '1234' },
  { id: '3', attr: 'Laddstationer Norge', value: '1234' },
  { id: '4', attr: 'Laddpunkter Norge', value: '1234' },
  { id: '5', attr: 'Tesla ', value: '1234' },
  { id: '6', attr: 'Task 6', value: '1234' },],
}

export default DataCard;

