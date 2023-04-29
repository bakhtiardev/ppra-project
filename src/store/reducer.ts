
import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';

export default combineReducers({
  todo: todoReducer,
  // comments: commentsReducer,
  // users: usersReducer
});
