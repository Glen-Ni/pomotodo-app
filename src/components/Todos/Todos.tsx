import React from 'react'
import axios from '../../config/axios'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import './Todos.scss'

interface ITodoStates {
  todos: any[]
}

class Todos extends React.Component<any, ITodoStates> {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  get unDeletedTodos(){
  	return this.state.todos.filter(t => !t.deleted)
  }

  get unCompletedTodos(){
  	return this.unDeletedTodos.filter(t => !t.completed)
  }

  get completedTodos(){
  	return this.unDeletedTodos.filter(t => t.completed)
  }
  async addTodo(param: any) {
    try {
      const response = await axios.post('todos', param)
      console.log(response.data)
    } catch (e) {
      throw new Error(e)
    }
  }
  getTodos = async () => {
    try {
      const response = await axios.get('todos')
      const todos = response.data.resources.map(t =>
        Object.assign({}, t, { editing: false })
      ) // Object.assign把后面的obj合并到第一个参数; 这里用来添加editing tag
      console.log(todos)
      this.setState({ todos })
    } catch (e) {
      throw new Error(e)
    }
  }
  updateTodo = async (id: number, params: any) => {
    console.log('update')
    try {
      const response = await axios.put(`todos/${id}`, params)
      const newTodos = this.state.todos.map(t => {
        if (id === t.id) {
          return response.data.resource
        } else {
          return t
        }
      })
      this.setState({ todos: newTodos })
    } catch (e) {
      throw new Error(e)
    }
  }
  switchToEdit = (id: number) => {
    const { todos } = this.state
    const newTodos = todos.map(t => {
      if (id === t.id) {
        return Object.assign({}, t, { editing: true })
      } else {
        return Object.assign({}, t, { editing: false })
      }
    })
    this.setState({ todos: newTodos })
  }

  componentDidMount() {
    this.getTodos()
  }
  render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={param => this.addTodo(param)} />
        <div className="todoList">
          {/* {this.state.todos.map(t => (
            <TodoItem
              key={t.id}
              {...t}
              update={this.updateTodo}
              switchToEdit={this.switchToEdit}
            />
          ))} */}
          {this.unCompletedTodos.map(t => (
            <TodoItem
              key={t.id}
              {...t}
              update={this.updateTodo}
              switchToEdit={this.switchToEdit}
            />
          ))}
          {this.completedTodos.map(t => (
            <TodoItem
              key={t.id}
              {...t}
              update={this.updateTodo}
              switchToEdit={this.switchToEdit}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Todos
