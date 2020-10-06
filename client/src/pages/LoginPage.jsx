import React from 'react'
import '../styles/signin.css'
import ConsumerSigninPage from './ConsumerSigninPage'
import UploaderSigninPage from './UploaderSigninPage'

const SignInStatus = () => {
    return (
        <div className="signIn-container">
            <div className="consumer-container2">
                <div className="consumer-info2">
                   <ConsumerSigninPage/>
                </div>
            </div>
            <div className='hr2'></div>
            <div className="uploader-container2">
                <div className="uploader-info2">
                    <UploaderSigninPage/>
                </div>
            </div>
        </div>
    )
}

export default SignInStatus
