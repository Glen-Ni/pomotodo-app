export default (state: any[], action: any) => {
  if (state === undefined) {
    return []
  }
  switch (action.type) {
    case 'ADD_TODO':
      console.log('reducer:', [...state, action.payload])
      return [...state, action.payload]
    case 'INIT_TODOS':
      return [...action.payload]
    case 'UPDATE_TODO':
      return state.map(t => {
        if (t.id === action.payload.id) {
          return action.payload
        } else {
          return t
        }
      })
    case 'EDIT_TODO':
      return state.map(t => {
        if (t.id === action.payload) {
          return Object.assign({}, t, { editing: true })
        } else {
          return Object.assign({}, t, { editing: false })
        }
      })
    default:
      return state
  }
}
