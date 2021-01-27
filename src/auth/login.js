import React, { Component } from 'react';
import { Input, Space, Button, Card, Form, FormItem } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

// import { Link } from "react-router-dom";
import axiosInstance from '../axios-Instance';
// import Routes from'../routes';


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loggedIn: false,
      loginMessage: ""
    };
    this.onChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }
  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.userName,
      password: this.state.password,
    };

    axiosInstance
      .post('auth/login', user)
      .then((res) => {
        const token = res.data.token;
        let msg = res.data.message;
        console.log(msg);
        // setAuthToken(token);
        localStorage.setItem('loginToken', token);
        alert('Logged in SuccessFully');
        this.setState({
          username: "",
          password: "",
          loggedIn: false,
          loginMessage: ""


        })
        this.onChange = this.handleChange.bind(this);
        this.onSubmit = this.handleSubmit.bind(this);
      })
  }

  componentDidMount() {
    console.log(this.props);
  }
  handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }
  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.userName,
      password: this.state.password,
    };

    axiosInstance
      .post('auth/login', user)
      .then((res) => {
        const token = res.data.token;
        let msg = res.data.message;
        console.log(msg);
        // setAuthToken(token);
        localStorage.setItem('loginToken', token);
        let message = res.data.message;
        console.log(message);
        alert('Logged in SuccessFully');
        this.setState({
          username: "",
          password: "",
          loggedIn: true,
          loginMessage: msg
        })
        this.props.history.push('/User');
      })
      .catch((err) => {
        this.setState({
          loginMessage: err.response.data.message
        })
        console.log(err.response.data.message);
      });
  }
  render() {
    const onFinish = values => {
      console.log('Success:', values);
    };
    const tailLayout = {
      wrapperCol: { offset: 14, span: 16 },
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div className="container login-container" >
        <div className="container  login" >



          <Card bordered={false} style={{ width: 500 }} className="login-design" >
            <div className="row ">
              <h1 className="heading">Login</h1>
            </div>
            <div className="row center">
              <Form

                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="User Name"
                  name="userName"
                  rules={[{ required: true, message: 'Please Enter your User Name!' }]}>

                  <Input
                    placeholder="Username"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    style={{ width: "300px" }} />




                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please Enter your Password !' }]}>

                  <Input.Password
                    style={{ width: "300px" }}
                    placeholder="Enter password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />


                </Form.Item>
                <Form.Item>
                  <div><p className="error-msg">{this.state.loginMessage}</p></div>
                  <div className="row center button-margin">
                    <Button to="/AdminPanel" className="Login-button" onClick={(event) => this.handleSubmit(event)} type="primary" htmlType="submit">Log in</Button>
                  </div>

                </Form.Item>
              </Form>
              <div className="row">
                <p>Create an Accout <Link to="/SignUp">Sign Up</Link></p>
              </div>
            </div>


          </Card>
        </div>
      </div>


    );
  }
}

export default login;