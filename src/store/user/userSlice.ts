import type { RootState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types';

const initialState: any = {
    name: '',
    email: ''
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
        }
    }
})

export const { addUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer