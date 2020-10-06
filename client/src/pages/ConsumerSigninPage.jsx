import React, { useState } from 'react'
import { Form, Input} from 'antd';
import { Button } from 'reactstrap'
import { consumerSignin } from '../redux/actions/consumerActions'
import { connect } from 'react-redux';

const ConsumerSigninPage = (props) => {
    const [user, setUser] = useState({
        email : "",
        password : "" 
    })

    const handleChange = (e) =>{
        setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        props.consumerSignin(user)
    }

  return (
    <>
        <h2>Consumer</h2>
        <Form onSubmitCapture={handleSubmit}>
            <Form.Item label="Email" rules={[{ type: 'email' }]}>
                <Input onChange={handleChange} name="email" value={user.email}/>
            </Form.Item>

            <Form.Item label="Password" rules={[{ type: 'password' }]}>
                <Input.Password onChange={handleChange} name="password" value={user.password} />
            </Form.Item>

            <Form.Item>
                <Button type="submit" className="btn btn-success">Submit</Button>
            </Form.Item>
        </Form>
    </>
  );
};

export default connect(null, { consumerSignin })(ConsumerSigninPage)