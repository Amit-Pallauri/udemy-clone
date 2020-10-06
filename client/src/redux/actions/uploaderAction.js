import { UPLOADER_SIGN_IN, UPLOADER_SIGN_OUT, UPLOADER_SIGN_UP  } from '../actionTypes/uploaderActionTypes'
import { SERVER_BASE_URL } from '../../config'
import { CREATE_COURSE, ADD_VIDEOS } from '../actionTypes/coursesActionTypes'
import { notification } from 'antd'
import axios from 'axios'

export const uploaderSignup = user => async dispatch => {
    try {
        console.log('i am in the action')
        const headers = {
            'Content-Type' : 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/uploader/signUp`, user, {headers} )
        dispatch({
            type : UPLOADER_SIGN_UP,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Signed Up successfully'
            })     
        }else{ 
            notification.info({
                message :'Error while signing up'
            })
        } 
    } catch (error) {
        if( error.response.data.status == 'fail'){ 
            notification.info({
                message : error.response.data.message
            })
        }else if(error.response.data.status == 'error'){
            notification.warning({
                message : error.response.data.message
            })
        }
    }
}

export const uploaderSignin = user => async dispatch => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/uploader/signIn`, user, {headers : headers})
        dispatch({
            type : UPLOADER_SIGN_IN,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Signed In successfully'
            })   
        }else{ 
            notification.info({
                message :'Error while signing In'
            })
        } 
    } catch (error) {
        if( error.response.data.status == 'fail'){ 
            notification.info({
                message : error.response.data.message
            })
        }else if(error.response.data.status == 'error'){
            notification.warning({
                message : error.response.data.message
            })
        }
    }
}

export const uploaderSignout = () => async (dispatch, getState) => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
            'authorization' : getState().uploaderState.uploader.accessToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/uploader/signOut`, {headers : headers})
        dispatch({
            type : UPLOADER_SIGN_OUT,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Signed out successfully'
            })          
        }else{ 
            notification.info({
                message :'Error while signing out'
            })
        } 
    } catch (error) {
        if( error.response.data.status == 'fail'){ 
            notification.info({
                message : error.response.data.message
            })
        }else if(error.response.data.status == 'error'){
            notification.warning({
                message : error.response.data.message
            })
        }
    }
}

export const createCourse = () => async(dispatch, getState) => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
            'authorization' : getState().uploaderState.uploader.accessToken
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/createCourse`, {headers : headers})
        dispatch({
            type : CREATE_COURSE,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Course created successfully'
            })    
        }else{ 
            notification.info({
                message :'Error while creating course'
            })
        } 
    } catch (error) {
        if( error.response.data.status == 'fail'){ 
            notification.info({
                message : error.response.data.message
            })
        }else if(error.response.data.status == 'error'){
            notification.warning({
                message : error.response.data.message
            })
        }
    }
} 

export const addVideos = (courseId) => async(dispatch, getState) => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
            'authorization' : getState().uploaderState.uploader.accessToken
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/addVideo/${courseId}`, {headers : headers})
        dispatch({
            type : ADD_VIDEOS,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'videos added successfully'
            })    
        }else{ 
            notification.info({
                message :'Error while uploading video'
            })
        } 
    } catch (error) {
        if( error.response.data.status == 'fail'){ 
            notification.info({
                message : error.response.data.message
            })
        }else if(error.response.data.status == 'error'){
            notification.warning({
                message : error.response.data.message
            })
        }
    }
} 