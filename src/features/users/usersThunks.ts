import { userActions, type User } from "./usersSlice"
import type { AppDispatch, RootState } from "@/app/store"
import { fetchUsers, createUser } from "@/api/users"

export const fetchUsersData = () => async (dispatch: AppDispatch) => {
  try {
    const userData = await fetchUsers()
    dispatch(userActions.setUsers(userData))
  } catch (error) {
    console.log(error)
    console.error("Fetching user data failed!")
  }
}

interface AddUserPayload {
  first_name: string
  last_name: string
  email: string
}

export const postNewUser =
  (user: AddUserPayload) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const newUserData: User = {
      id: (getState().users.users.length + 1).toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: "https://avatars.githubusercontent.com/u/6311119",
    }
    console.log("Sending updated users data to database!")

    try {
      await createUser(newUserData)
      dispatch(userActions.addUser(newUserData))
      console.log("Sent user data successfully!")
    } catch (error) {
      console.error("Sending user data failed!")
    }
  }
