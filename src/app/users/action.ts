import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserList } from './api'

export const fetchUserListAction = createAsyncThunk(
  `users/fetchAll`,
  async () => {
    const response = await fetchUserList()
    return response
  }
)
