import { FETCH_STATS_LADDSTATION_SWE, FETCH_STATS_LADDSTATION_SWE_FULFILLED, FETCH_STATS_LADDSTATION_SWE_REJECTED } 
  from '../actions/StatisticsConstants';
    
  const initialState = {  
    statistics: {
      fetchingStatsStation: false,
      testString: 'jool',
      fetchedStatsStation: false,
      stationsAmountSwe: '',
      stats: []
    },
  };

  export default function reducer(state = initialState, action = {}) {
    const newState = { ...state };
    
    switch (action.type){
      case FETCH_STATS_LADDSTATION_SWE: 
        newState['statistics'].fetchingStatsStation = true;
        newState['statistics'].fetchedStatsStation = false;
        console.log('newState', newState)
        return newState;

      case FETCH_STATS_LADDSTATION_SWE_FULFILLED:
        console.log('FETCH_STATS_LADDSTATION_SWE_FULFILLED', action.payload);
        newState['statistics'].fetchingStatsStation = false;
        newState['statistics'].fetchedStatsStation = (action.payload.error === 'No data found' ? false : true);
    
        if(!action.payload.error){
          // newState['statistics'].stationsAmountSwe = [...state.statistics.stationsAmountSwe, action.payload.chargerstations[0].count];
          newState['statistics'].stationsAmountSwe =  action.payload.chargerstations[0].count;
          newState['statistics'].stats = [...state.statistics.stats, {'attr': 'Laddstationer ' + action.payload.countrycode, 'value': action.payload.chargerstations[0].count}];
        }
        return newState;
    
      case FETCH_STATS_LADDSTATION_SWE_REJECTED: {
        newState['statistics'].fetchingStatsStation = false;
        newState['statistics'].fetchedStatsStation = false;
        newState['statistics'].error = action.payload
        return newState;
      }
    
      default:
        return state;
    }
  }