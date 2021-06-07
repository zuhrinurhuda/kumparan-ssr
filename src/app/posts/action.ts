import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostById, fetchPostsByUserId } from './api'

export const fetchPostsByUserIdAction = createAsyncThunk(
  `posts/fetchByUserId`,
  async (userId: string) => {
    const response = await fetchPostsByUserId(userId)
    return response
  }
)

export const fetchPostByIdAction = createAsyncThunk(
  `posts/fetchById`,
  async (postId: string) => {
    const response = await fetchPostById(postId)
    return response
  }
)
