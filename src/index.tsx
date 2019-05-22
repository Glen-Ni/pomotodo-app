import * as React from 'react'
import * as ReactDOM from 'react-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
