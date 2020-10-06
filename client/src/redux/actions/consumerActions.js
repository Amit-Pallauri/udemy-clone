import { CONSUMER_SIGN_IN, CONSUMER_SIGN_UP, CONSUMER_SIGN_OUT, GET_CONSUMER, GET_USER_ERROR } from '../actionTypes/consumerActionTypes'
import { SERVER_BASE_URL } from '../../config'
import { notification } from 'antd'
import axios from 'axios'
import { GET_UPLOADER } from '../actionTypes/uploaderActionTypes'

export const consumerSignup = user => async dispatch => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/consumer/signUp`, user, {headers : headers})
        console.log(data)
        dispatch({
            type : CONSUMER_SIGN_UP,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Signed Up successfully'
            })
            // return <Redirect push to='/dashboard'/> 
        }else if( data.status == 'fail'){ 
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

export const consumerSignin = user => async dispatch => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/consumer/signIn`, user, {headers : headers})
        dispatch({
            type : CONSUMER_SIGN_IN,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Signed In successfully'
            })      
            // return <Redirect to='/dashboard' /> 
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

export const consumerSignout = () => async (dispatch, getState) => {
    try {
        const headers = {
            'Content-Type' : 'application/json',
            'authorization' : getState().consumerState.consumer.accessToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/consumer/signOut`, { headers })
        dispatch({
            type : CONSUMER_SIGN_OUT,
            payload : data
        })
        if(data.status === 'success' ){
            notification.success({
                message :'Signed out successfully'
            })      
            // return <Redirect to='/' />      
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

export const getUserData = () => async dispatch =>{
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'authorization' : token
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/getUserData`, {headers})
        console.log(data)
        if(data.status === 'fail' || data.success === 'error'){
            return localStorage.clear()
        }else if(data.user === 'consumer'){
            dispatch({
                type : GET_CONSUMER,
                payload : data
            })        
        }else if(data.user === 'uploader'){
            dispatch({
                type : GET_UPLOADER,
                payload : data
            })
        }
    } catch (error) {
        dispatch({
            type : GET_USER_ERROR
        })
    }
}

