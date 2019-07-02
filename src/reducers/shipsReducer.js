export default function reducer(state={ fetching: false }, action) {

    switch (action.type){
      case "FETCH_SHIPS": {
        return {...state, fetching: true}
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload}
        }
      }
      case 'FETCH_SHIPS_FULFILLED': {
        return {
          ...state,
          fetching: false,
          fetched: true,
          ships: action.payload
        }
      }
      case 'FETCH_SHIPS_REJECTED': {
        return {...state, fetching: false, error: action.payload }
      }
    }
    return state;
  }