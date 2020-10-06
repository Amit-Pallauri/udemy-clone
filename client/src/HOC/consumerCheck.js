import React from "react";
import { Redirect } from "react-router-dom";
import { notification } from 'antd'
import { useSelector } from "react-redux";

const UploaderCheck = (ProtectedComponent) => {
  const user = JSON.parse(localStorage.getItem('token'))
  const userType = JSON.parse(localStorage.getItem('user'))

//   const consumer = useSelector(storeState => storeState.consumerState.consumer)

  return (args) => {
    return (user && userType == 'consumer')
    // return ( consumer )
    ?  
        <ProtectedComponent {...args}/>
    : 
        <>
            {
                notification.warn({
                message : 'sign In as a consumer first'
                })
            }
                <Redirect to="/signIn" /> 
        </>
  };
};

export default UploaderCheck;