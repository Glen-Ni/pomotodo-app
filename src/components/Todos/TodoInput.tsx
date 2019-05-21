import React from 'react'
import { connect } from 'react-redux'
import { Input, Icon } from 'antd'
import axios from '../../config/axios'

interface ITodoInputProps {
  addTodo: (param: any) => any
}

interface ITodoInputStates {
  description: string
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputStates> {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }
  onKeyUp = e => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo()
    }
  }

  addTodo = async () => {
    try {
      const response = await axios.post('todos', this.state)
      this.props.addTodo(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
    this.setState({ description: '' })
  }

  render() {
    return (
      <Input
        placeholder="添加todo"
        value={this.state.description}
        onChange={e => this.setState({ description: e.target.value })}
        onKeyUp={this.onKeyUp}
        suffix={
          this.state.description ? (
            <Icon type="enter" onClick={this.addTodo} />
          ) : (
            <span />
          )
        }
      />
    )
  }
}

// const mapStateToProps = (state,ownProps) => ({
//   ...state,
//   ...ownProps
// })

const mapDispatchToProps = dispatch => ({
  addTodo: payload => dispatch({ type: 'ADD_TODO', payload })
})

export default connect(
  undefined,
  mapDispatchToProps
)(TodoInput)
