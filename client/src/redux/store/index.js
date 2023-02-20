import ThunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import reducer from '../reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(ThunkMiddleware))
)

export default store


