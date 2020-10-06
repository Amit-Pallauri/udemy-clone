import { SERVER_BASE_URL } from '../../config'
import { GET_ALL_COURSES, PARTICULAR_COURSE, BUY_COURSE } from '../actionTypes/coursesActionTypes'
import { notification } from 'antd'
import axios from 'axios'

export const getAllCourses = () => async dispatch => {
    try {
        const { data } = await axios.get(`${SERVER_BASE_URL}/getallCourses`)
        dispatch({
            type : GET_ALL_COURSES,
            payload : data 
        })
    } catch (error) {
        console.log(error)
        notification.warning({
            message :'Error while fetching data'
        })
    }
} 

export const getParticularCourse = courseId => async dispatch => {
    try {
        const { data } = await axios.get(`${SERVER_BASE_URL}/getParticularCourse/${courseId}`)
        dispatch({
            type : PARTICULAR_COURSE,
            payload : data
        })
    } catch (error) {
        console.log(error)
        notification.warning({
            message :'Error while fetching data'
        })
    }
}

export const buyCourse = courseId => async (dispatch, getState) => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
            'authorization' : getState().consumerState.consumer.accessToken
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/buyCourse/${courseId}`, { headers : headers })
        if(data.status === 'success' ){
            notification.success({
                message :'purchase succesfull'
            })      
        }else{ 
            notification.info({
                message :'Error while buying course'
            })
        } 
        dispatch({
            type : BUY_COURSE,
            payload : data
        })
    } catch (error) {
        console.log(error)
        notification.warning({
            message :'Error while buying course'
        })
    }
}