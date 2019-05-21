import * as React from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// 'react-router-dom'里面有BrowserRouter和Router，两者不同，虽然引用过来改名为 Router。按需使用。// 要用history所以不用BrowserRouter，上面的改为：
import { Router, Route } from 'react-router-dom'
import history from './config/history'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Router>
    )
  }
}

export default App
