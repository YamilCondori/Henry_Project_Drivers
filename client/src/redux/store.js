import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Si deseas utilizar Redux Thunk para manejar acciones asíncronas
import  reducer  from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension'

// Crea la tienda de Redux
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;