import { CONSUMER_SIGN_IN, CONSUMER_SIGN_OUT, CONSUMER_SIGN_UP, GET_CONSUMER, GET_USER_ERROR } from '../actionTypes/consumerActionTypes'
import { BUY_COURSE } from '../actionTypes/coursesActionTypes'

const initialstate = {
    consumer : '',
}

const consumerReducer = (state=initialstate, action) => {
    const { type, payload } = action 
    switch (type) {
        case CONSUMER_SIGN_UP:
            const consumerSignUpJS = JSON.stringify(payload.data.accessToken)
            localStorage.setItem('user' , JSON.stringify('consumer'))
            localStorage.setItem('token' , consumerSignUpJS)
            return {...state, consumer : payload.data}

        case CONSUMER_SIGN_IN:
            const consumerSignInJS = JSON.stringify(payload.data.accessToken)
            localStorage.setItem('user' , JSON.stringify('consumer'))
            localStorage.setItem('token' , consumerSignInJS)
            return {...state, consumer : payload.data }
        
        case CONSUMER_SIGN_OUT:
            localStorage.clear()
            return {...state, consumer : ''}
        
        case GET_CONSUMER:
            return {...state, consumer: payload.data }

        case BUY_COURSE:
            return {...state, consumer : payload.data}
            
        case GET_USER_ERROR : 
            localStorage.clear()
            return {...state, consumer : ''}

        default:
            return state
    }
}

export default consumerReducer