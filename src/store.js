import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from  './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// const middleware = applyMiddleware(promise, thunk);
// export default(initialState) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
//   );
//   // return createStore(
//   //   rootReducer,
//   //   initialState,
//   //   middleware
//   // );
// }

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
// const store = createStore(rootReducer, initialState,/* preloadedState, */ composeEnhancers(
//   // applyMiddleware(...middleware),
//   applyMiddleware(promise, thunk),
//   // other store enhancers if any
// ));

// export default store;

export default(initialState) => {
  return createStore(rootReducer, initialState,/* preloadedState, */ composeEnhancers(
    // applyMiddleware(...middleware),
    applyMiddleware(promise, thunk),
    // other store enhancers if any
  ))
}