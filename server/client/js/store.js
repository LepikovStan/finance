const { createStore, combineReducers } = require('redux');
const reducers = require('./reducers');
// const store = createStore(combineReducers(reducers));
const store = createStore(reducers);

module.exports = store
