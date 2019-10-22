
import fetchJsonp from 'fetch-jsonp';
import {getBottomLeft, getTopRight} from 'ol/extent.js';
import { toLonLat } from 'ol/proj';
import { uppsalaData } from '../data/uppsalaData';

export const FETCH_CHARGER_STATIONS_IN_BBOX = 'FETCH_CHARGER_STATIONS_IN_BBOX';
export const FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED = 'FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED';
export const FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED = 'FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED';
export const FETCH_STATION_STATUS = 'FETCH_STATION_STATUS';
export const FETCH_STATION_STATUS_FULFILLED = 'FETCH_STATION_STATUS_FULFILLED';
export const FETCH_STATION_STATUS_REJECTED = 'FETCH_STATION_STATUS_REJECTED';

export const LOAD_STATIC_DATA = 'LOAD_STATIC_DATA';

export function fetchStationStatus(stationId){
  const API_KEY = process.env.REACT_APP_NOBIL_API_KEY;
  return function(dispatch){
    dispatch({ type: FETCH_STATION_STATUS });
    const url  = 'https://nobil.no/api/server/search.php?apikey=' + 
    API_KEY + '&apiversion=3&action=search&type=id&id='
    + stationId;
    fetchJsonp(url).then(function(response){
      return response.json();
    }).then(function(json){
      console.log('parsed json', json);
      dispatch({type: FETCH_STATION_STATUS_FULFILLED, payload: json});
    }).catch(function(ex){
      console.log('parsing failed', ex);
      dispatch({type: FETCH_STATION_STATUS_REJECTED, payload: ex});
    
    })
  }
}

export function fetchChargerStationsInBbox(mapData){
    const API_KEY = process.env.REACT_APP_NOBIL_API_KEY;
    const extent = mapData.map.getView().calculateExtent(mapData.map.getSize());
    const bottomLeft = toLonLat(getBottomLeft(extent));
    const topRight = toLonLat(getTopRight(extent));
    console.log('mapdata -> bbox:bottomLeft', bottomLeft);
    console.log('mapdata -> bbox:topRight', topRight);
    return function(dispatch){
      dispatch({type: FETCH_CHARGER_STATIONS_IN_BBOX});
  
      const url = 'https://nobil.no/api/server/search.php?apikey=' + 
        API_KEY + '&apiversion=3&action=search&type=rectangle&northeast=(' + 
        topRight[1] + ', ' + topRight[0] + ')&southwest=(' + 
        bottomLeft[1] + ', ' + bottomLeft[0] + ')';
      fetchJsonp(url, {timeout: 10000})
      .then(function(response){
        return response.json();
      }).then(function(json){
          // console.log('FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED', json);
        dispatch({type: FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED, payload: json.chargerstations});
      }).catch(function(ex){
        console.log('parsing failed', ex);
        dispatch({type: FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED, payload: ex});
        // dispatch({type: LOAD_STATIC_DATA, payload: uppsalaData});
        dispatch({type: FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED, payload: uppsalaData.chargerstations});
      })
    } 
  }