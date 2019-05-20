import React from 'react'
import { Input,  Icon } from 'antd'

interface ITodoInputProps {
  addTodo: (param: any) => void
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
  onKeyUp = (e) => {
		if(e.keyCode === 13 && this.state.description !== ''){
			this.addTodo()
			this.setState({description: ''})
		}
	}

	addTodo = ()=>{
		this.props.addTodo({description: this.state.description})
  }
  
  render() {
    return (
      <Input
        placeholder="添加todo"
        value={this.state.description}
        onChange={e => this.setState({ description: e.target.value })}
        onKeyUp={this.onKeyUp}
        suffix={this.state.description ? <Icon type="enter" onClick={this.addTodo}/>: <span/>}
      />
    )
  }
}

export default TodoInput
