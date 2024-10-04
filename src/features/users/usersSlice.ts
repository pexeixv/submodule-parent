import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface UsersState {
  users: User[]
  loading: boolean
  error: boolean
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload)
    },
  },
})

export const userActions = usersSlice.actions

export default usersSlice
