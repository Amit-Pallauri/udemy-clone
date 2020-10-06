import React from 'react'
import '../styles/uploadCourse.css'
import { Descriptions } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

const UploadCoursePage = () => {

    const uploader = useSelector( storeState => storeState.uploaderState.uploader )

    return (
        <div className="upload-course-container">
            <div className="upload-course-intro">
                <Descriptions>
                    <Descriptions.Item label="Uploader">{uploader.name}</Descriptions.Item>
                    <Descriptions.Item label="email">{uploader.email}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{uploader.revenue}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="course-container">
                <div className='courses-list'>
                    course lists
                </div>
                <div className="course-videos">
                    course videos
                </div>            
            </div>
        </div>
    )
}

export default UploadCoursePage
