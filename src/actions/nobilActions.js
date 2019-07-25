
import fetchJsonp from 'fetch-jsonp';
import View from 'ol/View';
import {getBottomLeft, getTopRight} from 'ol/extent.js';
import { toLonLat } from 'ol/proj';

export const FETCH_CHARGER_STATIONS_IN_BBOX = 'FETCH_CHARGER_STATIONS_IN_BBOX';
export const FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED = 'FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED';
export const FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED = 'FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED';

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
      fetchJsonp(url, {timeout: 20000})
      .then(function(response){
        return response.json();
      }).then(function(json){
          // console.log('FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED', json);
        dispatch({type: FETCH_CHARGER_STATIONS_IN_BBOX_FULFILLED, payload: json.chargerstations});
      }).catch(function(ex){
        console.log('parsing failed', ex);
        dispatch({type: FETCH_CHARGER_STATIONS_IN_BBOX_REJECTED, payload: ex});
      })
    } 
  }