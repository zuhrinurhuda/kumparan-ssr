import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCommentsByPostId } from './api'

export const fetchCommentsByPostIdAction = createAsyncThunk(
  `comments/fetchByPostId`,
  async (postId: string) => {
    const response = await fetchCommentsByPostId(postId)
    return response
  }
)
