import React, { useEffect, useState} from 'react';
import ConsumerCheck from './HOC/consumerCheck'
import UploaderCheck from './HOC/uploaderCheck'
import Navtopbar from './components/Navtopbar'
import Homepage from './pages/Homepage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CourseDetailPage from './pages/CourseDetailPage'
import VideoPlayerPage from './pages/VideoPlayerPage'
import UploadCoursePage from './pages/UploadCoursePage'
import './App.css';
import './styles/loading.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUserData } from './redux/actions/consumerActions'

function App(props) {

  const[token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null)
  
  useEffect(()=>{
    return token === null ? null : props.getUserData()
  }, [])

  return (
      
        <div className="App">
           {
              props.consumer || props.uploader || token === null
                ?
                  <>
                    <Navtopbar stateChange={setToken} />
                    <Switch>
                      <Route path='/' exact component={Homepage} />
                      <Route path='/signUp' exact component={RegisterPage}/>
                      <Route path='/signIn' exact component={LoginPage}/>
                      <Route path='/dashboard' exact component={DashboardPage} />
                      <Route path='/course/:courseId' exact component={CourseDetailPage} />
                      <Route path='/videoPlayer/:videoId' exact component={ConsumerCheck(VideoPlayerPage)} />
                      <Route path='/uploadCourse' exact component={UploaderCheck(UploadCoursePage)} />
                      <Redirect to='/' />
                    </Switch>
                  </>
                : 
              <div className="container">
                <div className="box" />
              </div>
          }
        </div>
      
  );
}

const mapStateToProps = storeState => {
  return {
    consumer : storeState.consumerState.consumer,
    uploader : storeState.uploaderState.uploader
  }
}

export default connect(mapStateToProps, { getUserData })(App);
