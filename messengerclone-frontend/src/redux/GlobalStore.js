import {legacy_createStore as createStore} from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import UserReducer from './reducers/UserReducer'
import combineReducer from './reducers/CombineReducer'

const GlobalStore = createStore(combineReducer,composeWithDevTools())
export default GlobalStore