import type { User } from "@/features/users/usersSlice"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${apiUrl}/users`)
  if (!response.ok) throw new Error("Could not fetch user data!")
  return response.json()
}

export const createUser = async (userData: User): Promise<void> => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error("Sending users data failed.")
  }
}
