import fetchJsonp from 'fetch-jsonp';
import { 
  FETCH_STATS_LADDSTATION_SWE, 
  FETCH_STATS_LADDSTATION_SWE_FULFILLED, 
  FETCH_STATS_LADDSTATION_SWE_REJECTED
} from './StatisticsConstants';

export function fetchStatistics(type='stats_GetSumChargerstations', countrycode='SWE') {
  const API_KEY = process.env.REACT_APP_NOBIL_API_KEY;
  return function(dispatch){
    dispatch({type: FETCH_STATS_LADDSTATION_SWE});

    const url = 'https://nobil.no/api/server/search.php?apikey=' + API_KEY + '&apiversion=3&action=search&type=' + type + '&countrycode=' + countrycode;

    fetchJsonp(url)
    .then(function(response){
      return response.json();
    }).then(function(json){
      dispatch({type:FETCH_STATS_LADDSTATION_SWE_FULFILLED, payload: {...json, 'countrycode': countrycode}});
    }).catch(function(ex){
      console.log('parsing failed', ex);
      dispatch({type: FETCH_STATS_LADDSTATION_SWE_REJECTED, payload: ex});
    })
  }
}