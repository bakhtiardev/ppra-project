
import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import userReducer from './user/userSlice';
export default combineReducers({
  todo: todoReducer,
  user: userReducer
  // comments: commentsReducer,
  // users: usersReducer
});
