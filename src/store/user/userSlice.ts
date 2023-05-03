import type { RootState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types';

const initialState: any = {
    isLogin: false,
    email: '',
    name: ''
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addUser: (state, action: PayloadAction<any>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLogin = action.payload.isLogin;
            state.photoURL = action.payload.photoURL;
            // state. = action.payload;
        },
        logout: (state) => {

            state.isLogin = false;
        }
    }
})

export const { addUser, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer