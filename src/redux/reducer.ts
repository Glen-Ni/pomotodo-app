import {combineReducers} from "redux";

const todos = (state: any[], action: any) => {
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

const tomatoes = (state:any[] = [], action) => {
	switch(action.type){
		case 'ADD_TOMATO':
			return [action.payload,...state];
		case 'UPDATE_TOMATO':
			return state.map(t=>{
				if(t.id === action.payload.id){
					return action.payload
				}else{
					return t
				}
			})
    case 'INIT_TOMATOES':
      console.log('reducer',action.payload)
			return [...action.payload]
		default:
			return state
	}
}

export default combineReducers({todos,tomatoes})