import React from 'react'
import { Input, Icon, Button } from 'antd'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import './Login.scss'

interface ILoginState {
  account: string
  password: string
}

class Login extends React.Component<any, ILoginState> {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }
  // onChangeAccount = e => {
  //   this.setState({ account: e.target.value })
  // }
  // onChangePassword = e => {
  //   this.setState({ password: e.target.value })
  // }
  // 两个onChange封装为一个
  onChange(key: keyof ILoginState, value: string) {
    const newState = {}
    newState[key] = value
    this.setState(newState)
    console.log(localStorage)
  }

  submit = async () => {
    const { account, password } = this.state
    console.log(this.state)
    try {
      await axios.post('sign_in/user', {
        account,
        password
      })
      this.props.history.push('/')
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
  render() {
    const { account, password } = this.state
    console.log(this.state)
    return (
      <div id="Login">
        <h1>番茄土豆登录</h1>
        <Input
          placeholder="请输入用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={account}
          onChange={(e)=>this.onChange('account', e.target.value)}
        />
        <Input.Password
          onChange={(e)=>this.onChange('password', e.target.value)}
          value={password}
          placeholder="请输入密码"
        />
        <Button type="primary" className="loginButton" onClick={this.submit}>
          登录
        </Button>
        <p>
          没有账号，立即 <Link to="/signup">注册</Link>
        </p>
      </div>
    )
  }
}

export default Login
