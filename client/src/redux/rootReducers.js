import { combineReducers } from 'redux'
import consumerReducer from './reducers/consumerReducer'
import uploaderReducer from './reducers/uploaderReducer'
import coursesReducer from './reducers/coursesReducers'

const rootReducers = combineReducers({
    consumerState : consumerReducer,
    uploaderState : uploaderReducer,
    coursesState : coursesReducer
})

export default rootReducers