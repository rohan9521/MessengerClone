import {legacy_createStore as createStore , applyMiddleware} from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import combineReducer from './reducers/CombineReducer'
import thunk from 'redux-thunk'

const GlobalStore = createStore(combineReducer,composeWithDevTools(applyMiddleware(thunk)))
export default GlobalStore