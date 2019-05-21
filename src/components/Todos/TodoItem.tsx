import * as React from 'react'
import axios from '../../config/axios'
import { Checkbox, Icon } from 'antd'
import {connect} from 'react-redux'
import classNames from 'classnames'
import './TodoItem.scss'

interface ITodoItemProps {
  id: number
  description: string
  completed: boolean
  editing: boolean
  todos: any,
  updateTodo: (params: any) => any
  editTodo:(params: number) => any
  // update: (id: number, params: any) => void
  // switchToEdit: (id: number) => void
}

interface ITodoItemState {
  editText: string
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props) {
    super(props)
    this.state = {
      editText: this.props.description
    }
  }

  onKeyUp = e => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update(this.props.id, { description: this.state.editText })
    }
  }

  update = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params)
      // const newTodos = this.props.todos.map(t => {
      //   if (id === t.id) {
      //     return response.data.resource
      //   } else {
      //     return t
      //   }
      // })
      this.props.updateTodo(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    // 把编辑和非编辑两种状态提取出来 结构更清晰
    const Editing = (
      <div className="editing">
        <input
          type="text"
          value={this.state.editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
        <div className="iconWrapper">
          <Icon type="enter" onClick={()=>this.update(this.props.id, { description: this.state.editText })}/>
          <Icon
            type="delete"
            theme="filled"
            onClick={e => this.update(this.props.id, { deleted: true })}
          />
        </div>
      </div>
    )
    const Text = (
      <span
        className="text"
        onDoubleClick={() => this.props.editTodo(this.props.id)}
      >
        {this.props.description}
      </span>
    )

    // class 条件渲染
    const todoItemClass = classNames({
      TodoItem: true,
      completed: this.props.completed,
      editing: this.props.editing
    })

    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox
          checked={this.props.completed}
          onChange={e =>
            this.update(this.props.id, { completed: e.target.checked })
          }
        />
        {/* {this.props.description}
        <div className="icons">
          <Icon type="enter" />
          <Icon
            type="delete"
            theme="filled"
            onClick={e => this.props.update(this.props.id, { deleted: true })}
          />
        </div> */}
        {this.props.editing ? Editing : Text}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  todos: state
})

const mapDispatchToProps = {
  editTodo: (payload: number) => ({ type: 'EDIT_TODO', payload }),
  updateTodo: (payload: object) => ({ type: 'UPDATE_TODO', payload })
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)
