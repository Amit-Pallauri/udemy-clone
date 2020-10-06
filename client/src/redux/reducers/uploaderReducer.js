import { UPLOADER_SIGN_IN, UPLOADER_SIGN_OUT, UPLOADER_SIGN_UP, GET_UPLOADER } from '../actionTypes/uploaderActionTypes'
import { ADD_VIDEOS, CREATE_COURSE } from '../actionTypes/coursesActionTypes'

const initialstate = {
    uploader : '',
    uploadedCourses : ''
}

const uploaderReducer = (state=initialstate, action) => {
    const { type, payload } = action 
    switch (type) {
        case UPLOADER_SIGN_UP:
            const uploaderSignUpJS = JSON.stringify(payload.data.accessToken)
            localStorage.setItem('user', JSON.stringify('uploader'))
            localStorage.setItem('token', uploaderSignUpJS)
            return {...state, uploader : payload.data}

        case UPLOADER_SIGN_IN:
            const uploaderSignInJS = JSON.stringify(payload.data.accessToken)
            localStorage.setItem('user',JSON.stringify('uploader'))
            localStorage.setItem('token', uploaderSignInJS)
            return {...state, uploader : payload.data }
        
        case UPLOADER_SIGN_OUT:
            localStorage.clear()
            return {...state, uploader : ''}
        
        case GET_UPLOADER:
            return {...state, uploader : payload.data}

        case CREATE_COURSE:
            return {...state, uploadedCourses : payload.data}

        case ADD_VIDEOS:
            return {...state, uploadedCourses : payload.data}
        
        default:
            return state
    }
}

export default uploaderReducer
