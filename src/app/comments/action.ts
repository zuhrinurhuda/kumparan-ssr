import { createAsyncThunk } from '@reduxjs/toolkit'
import { CommentReqBody } from '../../interface/comments'
import { createComment, deleteComment, fetchCommentsByPostId } from './api'

export const fetchCommentsByPostIdAction = createAsyncThunk(
  `comments/fetchByPostId`,
  async (postId: number) => {
    const response = await fetchCommentsByPostId(postId)
    return response
  }
)

export const createCommentAction = createAsyncThunk(
  `comments/create`,
  async (reqBody: CommentReqBody) => {
    const response = await createComment(reqBody)
    return response
  }
)

export const deleteCommentAction = createAsyncThunk(
  `comments/delete`,
  async (commentId: number) => {
    const response = await deleteComment(commentId)
    return response
  }
)
