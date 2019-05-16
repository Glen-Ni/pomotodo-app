import React from 'react'
import { Button } from 'antd'

interface IRouter {
  history: any;
}

class Index extends React.Component<IRouter> {
  constructor(props: any) {
    super(props)
  }

  login = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <Button onClick={this.login}>登录</Button>
      </div>
    )
  }
}

export default Index