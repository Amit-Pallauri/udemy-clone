import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getParticularCourse } from '../redux/actions/coursesActions'
import { List } from 'antd';
import { Link } from 'react-router-dom'
import CheckoutForm from "./CheckoutForm";
import Loading from './Loading'
import '../styles/stripe.css'
import '../styles/courseDetails.css'
import '../styles/loading.css'

const CourseDetailPage = (props) => {
    
    const[loader, setLoader] = useState(false)

    const dispatch = useDispatch()
    const course = useSelector(storeState => storeState.coursesState.particularCourse)

    useEffect(()=>{
        dispatch(getParticularCourse(props.match.params.courseId))
    }, [])

    useEffect(()=>{
        setLoader(!loader)
    }, [course])

    if(course){
        var listData = [];
        for (let i = 0; i < course.videos.length; i++) {
            listData.push({
                href: course.videos[i]._id,
                title: course.videos[i].title,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description : `chapter ${i}`,
                content: course.videos[i].description
            });
        }
    } 


    return (
        <div className="course-details-container">
            {
                course && !loader
                    ?
                        <div className="course-details-info-container">
                            <section className="course-details-section">
                                <div className="course-info-container">
                                    <div className="course-info">
                                        <h2>{course.title}</h2>
                                        <p>{course.description}</p>
                                    </div>
                                    <div className="hr3"></div>
                                    <div className="uploader-info">
                                         <span>Uploaded By : </span><h3>{course.uploader.name}</h3>
                                    </div>
                                </div>
                                <div className="course-videos">
                                    {
                                        course.videos.length === 0
                                        ?
                                            <p>no videos uploaded</p>
                                        : 
                                            <List 
                                                className="videos-list"
                                                itemLayout="vertical"
                                                size="large"
                                                pagination={{
                                                    pageSize: 4,
                                                    hideOnSinglePage : true
                                                }}
                                                dataSource={listData}
                                                renderItem={ item => (
                                                    <Link to={`/videoPlayer/${item.href}`}>
                                                        <List.Item
                                                            className="video-list-items"
                                                            key={item.title}
                                                            extra={
                                                                <img
                                                                    width={272}
                                                                    alt="logo"
                                                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                                                />
                                                            }
                                                        >
                                                            <List.Item.Meta
                                                                title={item.title}
                                                                description={item.description}
                                                            />
                                                            {item.content}
                                                        </List.Item>
                                                    </Link>
                                                )}
                                            />
                                    }
                                </div>
                            </section>
                            <aside className="payment-container">
                                <CheckoutForm/>
                            </aside>
                        </div>
                     :  
                         <Loading/>
             }
        </div>
    )
}

export default CourseDetailPage