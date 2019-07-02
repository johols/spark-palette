import axios from 'axios';

export function fetchShips() {
  return function(dispatch){
    dispatch({type: 'FETCH_SHIPS'});


  axios.get('https://swapi.co/api/starships')
    .then((response) => {
      dispatch({type: 'FETCH_SHIPS_FULFILLED', payload:response.data})
    })
    .catch((err) => {
      dispatch({type: 'FETCH_SHIPS_REJECTED', payload: err})
    })
  }
}