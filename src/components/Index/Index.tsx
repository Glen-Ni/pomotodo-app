import React from 'react'
import { Button } from 'antd'
import axios from '../../config/axios'

interface IRouter {
  history: any
}

interface IIndexState {
  user: any
}

class Index extends React.Component<IRouter, IIndexState> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: ''
    }
  }

  login = () => {
    this.props.history.push('/login')
  }
  signUp = () => {
    this.props.history.push('/signup')
  }
  logout = () => {
    alert('注销成功！')
    localStorage.setItem('x-token', '')
    console.log(localStorage)
    this.props.history.push('/login')
  }
  async componentWillMount() {
    console.log('willmount', localStorage)
    await this.getMe()
  }
  getMe = async () => {
    const response = await axios.get('me')
    this.setState({ user: response.data })
  }
  render() {
    return (
      <div>
        <p>欢迎，{this.state.user.account}</p>
        {/* <Button onClick={this.login}>登录</Button>
        <Button onClick={this.signUp}>注册</Button> */}
        <Button onClick={this.logout}>注销 </Button>
      </div>
    )
  }
}

export default Index
