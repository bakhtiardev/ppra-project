import type { RootState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todos, Todo } from './types';



const initialState: Todos = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.concat(action.payload)
    }
  }
})

export const { addTodo } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTodos = (state: RootState) => state.todo.todos

export default todoSlice.reducer