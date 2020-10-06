import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/dashboard.css'
import '../styles/loading.css'
import { getAllCourses } from '../redux/actions/coursesActions'
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import Loading from './Loading'

const Dashboard = (props) => {

    useEffect(()=>{
        props.getAllCourses()
    }, [])

    return (
        <div className="dashboard-container">
            {
                props.courses && props.courses.length >= 1 
                    ?
                        <div className="row">
                            {
                                props.courses.map(course =>
                                    <div key={course._id} className="col-3 card-col">
                                        <Link to={`/course/${course._id}`}>
                                            <Card>
                                                <CardImg top width="100%" style={{ padding : '25px'}} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/functions_egi3.svg" />
                                                <CardBody>
                                                <CardTitle>{course.title}</CardTitle>
                                                <CardText>{course.description}</CardText>
                                                <CardText>
                                                    <big className="text-muted">{course.price}rs. only</big>
                                                </CardText>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                : 
                 <Loading/>
            }
        </div>
    )
}

const mapStateToProps = storeState => {
    return {
        courses : storeState.coursesState.courses
    }
}

export default connect(mapStateToProps, { getAllCourses })(Dashboard)