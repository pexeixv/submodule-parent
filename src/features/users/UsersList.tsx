import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { type FormEvent, useEffect, useState } from "react"
import { fetchUsersData, postNewUser } from "../users/usersThunks"
import type { RootState, AppDispatch } from "../../app/store"
import { type User } from "./usersSlice"
import BaseLayout from "@/components/BaseLayout"

function UsersList() {
  const dispatch: AppDispatch = useAppDispatch()
  const users = useAppSelector((state: RootState) => state.users.users)
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const usersDOM = users.map((u: User) => (
    <div key={u.id} className="flex flex-col p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between">
        <img
          src={u.avatar}
          alt={`${u.first_name} ${u.last_name}`}
          className="object-cover rounded-full size-16"
        />
        <small>{u.id}</small>
      </div>
      <p>
        {u.first_name} {u.last_name}
      </p>
      <p className="underline">{u.email}</p>
    </div>
  ))

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.first_name || !formData.last_name) return
    dispatch(postNewUser(formData))
    setFormData(initialFormData)
  }
  useEffect(() => {
    dispatch(fetchUsersData())
  }, [dispatch])

  return (
    <BaseLayout>
      <section>
        <div className="container grid gap-4 px-5 py-10 mx-auto lg:grid-cols-10">
          <div className="grid gap-4 lg:col-span-6 md:grid-cols-2 xl:grid-cols-3">
            {usersDOM}
          </div>
          <div className="p-4 lg:col-span-4">
            <form className="flex flex-col items-center w-full max-w-xl gap-2 p-8 mx-auto bg-teal-200 rounded-lg">
              <h1 className="mb-4 text-2xl font-semibold">Add User</h1>
              <input
                className="w-full p-2 rounded"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                required={true}
              />
              <input
                className="w-full p-2 rounded"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                required={true}
              />
              <input
                className="w-full p-2 rounded"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required={true}
              />
              <button
                className="px-8 py-2 mt-4 text-white bg-black rounded-lg"
                onClick={handleAddUser}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default UsersList
