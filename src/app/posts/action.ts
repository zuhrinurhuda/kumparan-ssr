import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostsByUserId } from './api'

export const fetchPostsByUserIdAction = createAsyncThunk(
  `posts/fetchByUserId`,
  async (userId: string) => {
    const response = await fetchPostsByUserId(userId)
    return response
  }
)
