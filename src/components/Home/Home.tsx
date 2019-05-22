import React from 'react'
import { Dropdown, Icon, Menu } from 'antd'
import history from 'src/config/history'
import axios from '../../config/axios'

import Todos from '../Todos/Todos'
import Tomatoes from '../Tomatoes/Tomatoes'
import Statistics from '../Statistics/Statistics'

import './Home.scss'

interface IRouter {
  history: any
}

interface IIndexState {
  user: any
}

const logout = () => {
  alert('注销成功！')
  localStorage.setItem('x-token', '')
  console.log(localStorage)
  history.push('/login')
}

const dropdown = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <Icon type="logout" />
      注销
    </Menu.Item>
  </Menu>
)

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
      <div className="Index" id="Home">
        <header>
          <span className="logo">番茄土豆</span>
          <Dropdown overlay={dropdown}>
            <span className="user-setting">
              {this.state.user && this.state.user.account}
              <Icon type="down" />
            </span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes />
          <Todos />
        </main>
        <Statistics />
      </div>
    )
  }
}

export default Index
