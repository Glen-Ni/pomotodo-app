import React from 'react'
import { Input, Tooltip, Icon, Button } from 'antd'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import './SignUp.scss'

interface ISignUpState {
	account: string,
	password: string,
	passwordConfirmation: string
}

class SignUp extends React.Component<any,ISignUpState> {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    }
  }
  // onChangeAccount = (e) => {
	// 	this.setState({ account: e.target.value });
	// }
  // onChangePassword = (e) => {
	// 	this.setState({ password: e.target.value });
	// }
  // onChangePasswordConfirmation = (e) => {
	// 	this.setState({ passwordConfirmation: e.target.value });
  // }
  onChange(key: keyof ISignUpState, value: string) {
    const newState = {}
    newState[key]= value
    this.setState(newState)
  }
  submit = async () => {
    const { account, password, passwordConfirmation } = this.state
    console.log(this.state)
    try {
      await axios.post( 'sign_up/user', {
          account,
          password,
          password_confirmation: passwordConfirmation
      })
      this.props.history.push('/') 
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
  render() {
    const {account, password, passwordConfirmation}= this.state
    return (
      <div id="SignUp">
        <h1>番茄土豆注册</h1>
        <Input
          placeholder="请输入用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={account}
          onChange={(e)=>this.onChange('account', e.target.value)}
          suffix={
            <Tooltip title="允许6-15位字符">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        /> 
        <Input.Password onChange={(e)=>this.onChange('password', e.target.value)} value={password} placeholder="请输入密码" />
        <Input.Password onChange={(e)=>this.onChange('passwordConfirmation', e.target.value)} value={passwordConfirmation} placeholder="请再次输入密码" />
        <Button type="primary" className="signUpButton" onClick={this.submit}>注册</Button>
        <p>已有账号，立即 <Link to='/login'>登录</Link></p>
      </div>
    )
  }
}

export default SignUp
