import React, { useState } from 'react'
import { Form, Input} from 'antd';
import { Button } from 'reactstrap'
import { consumerSignup } from '../redux/actions/consumerActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const ConsumerSignupPage = (props) => {
    const [user, setUser] = useState({
        name : "",
        email : "",
        password : "" 
    })

    const handleChange = (e) =>{
        setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        props.consumerSignup(user)
    }

  return (
    <>
        <h2>Consumer</h2>
        <Form onSubmitCapture={handleSubmit}>
            <Form.Item label="Username" rules={[{ type: 'name' }]}>
                <Input onChange={handleChange} name="name" value={user.name}/>
            </Form.Item>

            <Form.Item label="Email" rules={[{ type: 'email' }]}>
                <Input onChange={handleChange} name="email" value={user.email}/>
            </Form.Item>

            <Form.Item label="Password" rules={[{ type: 'password' }]}>
                <Input.Password onChange={handleChange} name="password" value={user.password} />
            </Form.Item>

            <Form.Item>
                <Button type="submit" className="btn btn-success">Submit</Button>
            </Form.Item>
            <p>already have an account? click <Link to='/signIn'>here</Link></p>
        </Form>
    </>
  );
};

export default connect(null, { consumerSignup })(ConsumerSignupPage)