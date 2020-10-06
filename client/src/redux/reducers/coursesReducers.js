import { GET_ALL_COURSES, PARTICULAR_COURSE } from '../actionTypes/coursesActionTypes'

const initialState = {
    courses : '',
    particularCourse : ''
}

const coursesReducer = (state = initialState, Action) => {
    const { type, payload } = Action
    switch (type) {
        case GET_ALL_COURSES:
            return {...state, courses : payload.data}

        case PARTICULAR_COURSE:
            return {...state, particularCourse : payload.data}

        default:
            return state;
    }
}

export default coursesReducer