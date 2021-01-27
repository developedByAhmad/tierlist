import React, { Component } from 'react';
import { Input, Space, Button, Card ,Form} from 'antd';
import axiosInstance from '../axios-Instance';
import { Link } from "react-router-dom";
import setAuthToken from "./setAuth";


import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      role: "",
      username: "",
      password: "",
      username_error_text:null,
      password_error_text:null,
      firstname_error_text:null,
      lastname_error_text:null,
      role_error_text:null,
      disabled:true,


    };
    this.onChange = this.handleChange.bind(this);
    // this.onSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) { this.setState({ [event.target.name]: event.target.value }); }
  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role,
    };
  
    axiosInstance
      .post('auth/signup', user)
      .then((res) => {
        const token = res.data.token;
        setAuthToken(token);
        localStorage.setItem('jwtToken', token);
        alert('Your Offer Added SuccessFully');
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          role: ""
        });
        this.props.history.redirect('/')
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount(){
		console.log("Login PANEL",this.props)
	  }
  render() {
    const onFinish = values => {
      console.log('Success:', values);
    };
  const  isDisabled=()=> 
    {
      let usernameIsValid = false;
      let passwordIsValid = false;
      let firstnameIsValid =false;


      if (this.state.firstName === "" || !this.state.firstName) {
        this.setState({
            firstname_error_text: null
        });
    } else {
        if (this.state.firstName.length >= 2) {
            firstnameIsValid = true;
            this.setState({
                firstname_error_text: null
            });
        } else {
            this.setState({
                firstname_error_text: <p className="error-msg">Your firstname must be at least 2 characters</p>
            });
        }
    }

      if (this.state.username === "" || !this.state.username) {
        this.setState({
            username_error_text: null
        });
    } else {
        if (this.state.username.length >= 3) {
            usernameIsValid = true;
            this.setState({
                username_error_text: null
            });
        } else {
            this.setState({
                username_error_text: <p className="error-msg">Your username must be at least 3 characters</p>
            });
        }
    }

      if (this.state.password === "" || !this.state.password) {
          this.setState({
              password_error_text: null
          });
      } else {
          if (this.state.password.length >= 8) {
              passwordIsValid = true;
              this.setState({
                  password_error_text: null
              });
          } else {
              this.setState({
                  password_error_text: <p className="error-msg">Your password must be at least 8 characters</p>
              });
          }
      }

      if (usernameIsValid && passwordIsValid) {
          this.setState({
              disabled: false
          });
      }
  }

    const tailLayout = {
      wrapperCol: { offset: 14, span: 16 },
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
    return (
      <div className="container" style={{ backgroundColor: "#ad1932", minHeight: '100vh', minWidth: '100vw', overflowX: "hidden" }}>
        <div className="container center signup-inner-container" >
          <div>
          </div>
          <Card  bordered={false}  className=" login-design" style={{backgroundColor:"white",borderRadius:"15px",width:"500px"}}>
  <div className="row ">
      <h1 className="heading">Sign Up</h1>
  </div>
  <Form
  {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
  <div className="row center">
  <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your First Name!' }]}
      >
   <Input placeholder="First Name"
                value={this.state.firstName}
                name="firstName"
                onBlur={isDisabled}
                onChange={(event) => this.onChange(event)}
                style={{ width: "300px" }} />
      </Form.Item>

  </div>

  <div className="row center">
  <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your Last Name!' }]}
      >
       <Input placeholder="Last Name"
                value={this.state.lastName}
                name="lastName"
                onChange={(event) => this.onChange(event)}
                style={{ width: "300px" }} />
        </Form.Item>

  </div>
  <div className="row center">
  <Form.Item
        label="User Name"
        name="userName"

        rules={[{ required: true, message: 'Please input your User Name!' }]}
      >
       <Input
                placeholder="Username"
                onChange={(event) => this.onChange(event)}
                name="username"
                onBlur={isDisabled}
                value={this.state.username}
                style={{ width: "300px" }} />
        </Form.Item>

  </div>

  <div className="row center">
  <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
     <Input.Password
                style={{ width: "300px" }}
                name="password"
                onChange={(event) => this.onChange(event)}
                placeholder="Password"
                onBlur={isDisabled}
                value={this.state.password}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
        </Form.Item>


  </div>
  <div className="row center">
  <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
  <Input placeholder="Role"
                name="role"
                value={this.state.role}
                onChange={(event) => this.onChange(event)}
                style={{ width: "300px" }} />

  </Form.Item>
  </div>
  <Form.Item>

  <div className="row center button-margin" >
  <Button className="Login-button" disabled={this.state.disabled} htmlType="submit" onClick={(e)=>this.handleSubmit(e)}>Sign Up</Button>
  </div>
  </Form.Item>

  </Form>

 <div className="row">
<p className="Already">Already have an Acconut?  <Link to="/">Log In</Link></p>
 </div>
 <h1>{this.state.firstname_error_text}</h1>
 <h1>{this.state.username_error_text}</h1>
  <h1>{this.state.password_error_text}</h1>
</Card>
          
        </div>
      </div>

    );
  }
}

export default Signup;




