import React from "react";
import { Redirect } from "react-router-dom";
import { notification } from 'antd'
import { useSelector } from "react-redux";

const UploaderCheck = (ProtectedComponent) => {
  const user = JSON.parse(localStorage.getItem('token'))
  const userType = JSON.parse(localStorage.getItem('user'))

//   const uploader = useSelector(storeState => storeState.uploaderState.uploader)

  return (args) => {
    return (user && userType == 'uploader')
    // return ( uploader )
    ?  
        <ProtectedComponent {...args}/>
    : 
        <>
            {
                notification.warn({
                message : 'sign In as a uploader first'
                })
            }
                <Redirect to="/signIn" /> 
        </>
  };
};

export default UploaderCheck;