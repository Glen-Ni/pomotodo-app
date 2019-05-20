import * as React from 'react'
import { Checkbox, Icon } from 'antd'
import classNames from 'classnames'
import './TodoItem.scss'

interface ITodoItemProps {
  id: number
  description: string
  completed: boolean
  editing: boolean
  update: (id: number, params: any) => void
  switchToEdit: (id: number) => void
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
      this.props.update(this.props.id, { description: this.state.editText })
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
          <Icon type="enter" />
          <Icon
            type="delete"
            theme="filled"
            onClick={e => this.props.update(this.props.id, { deleted: true })}
          />
        </div>
      </div>
    )
    const Text = (
      <span
        className="text"
        onDoubleClick={() => this.props.switchToEdit(this.props.id)}
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
            this.props.update(this.props.id, { completed: e.target.checked })
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

export default TodoItem
