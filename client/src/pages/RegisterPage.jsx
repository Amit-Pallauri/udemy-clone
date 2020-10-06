import React from 'react'
import '../styles/signup.css'
import ConsumerSignupPage from './ConsumerSignupPage'
import UploaderSignupPage from './UploaderSignupPage'

const SignUpStatus = () => {
    return (
        <div className="signUp-container">
            <div className="consumer-container1">
                <div className="consumer-info1">
                   <ConsumerSignupPage/>
                </div>
            </div>
            <div className='hr1'></div>
            <div className="uploader-container1">
                <div className="uploader-info1">
                    <UploaderSignupPage/>
                </div>
            </div>
        </div>
    )
}

export default SignUpStatus