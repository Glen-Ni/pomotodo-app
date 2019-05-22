import * as React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'

import Polygon from './Polygon'
import TodoHistory from './TodoHistory/TodoHistory'
import './Statistics.scss'

interface IStatisticsProps {
  todos: any[]
  tomatoes: any[]
}

class Statistics extends React.Component<IStatisticsProps> {
  get finishedTodos() {
    return this.props.todos.filter(t => t.completed && !t.deleted)
  }
  get finishedTomatoes() {
    return this.props.tomatoes.filter(
      t => t.description && t.ended_at && !t.aborted
    )
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, todo => {
      return format(todo.updated_at, 'YYYY-MM-D')
    })
  }

  get dailyTomatos() {
    return _.groupBy(this.finishedTomatoes, tomato => {
      return format(tomato.ended_at, 'YYYY-MM-D')
    })
  }

  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>
            <span className="class">
              <p className="title">统计</p>
              <p className="subtitle">5月累计</p>
            </span>
            {/* <div>我是</div> */}
          </li>
          {/* <li>目标</li> */}
          <li>
            <span className="class">
              <p className="title">番茄历史</p>
              <p className="subtitle">累计完成番茄</p>
              <p className="count">{this.finishedTomatoes.length}</p>
            </span>
            <Polygon
              data={this.dailyTomatos}
              totalFinishedCount={this.finishedTomatoes.length}
            />
          </li>
          <li>
            <span className="class">
              <p className="title">任务历史</p>
              <p className="subtitle">累计完成任务</p>
              <p className="count">{this.finishedTodos.length}</p>
            </span>
            <Polygon
              data={this.dailyTodos}
              totalFinishedCount={this.finishedTodos.length}
            />
          </li>
        </ul>
        <TodoHistory />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  tomatoes: state.tomatoes
})

export default connect(mapStateToProps)(Statistics)
