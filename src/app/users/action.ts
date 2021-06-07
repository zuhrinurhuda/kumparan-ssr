import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserById, fetchUserList } from './api'

export const fetchUserListAction = createAsyncThunk(
  `users/fetchAll`,
  async () => {
    const response = await fetchUserList()
    return response
  }
)

export const fetchUserByIdAction = createAsyncThunk(
  `users/fetchById`,
  async (userId: number) => {
    const response = await fetchUserById(userId)
    return response
  }
)
