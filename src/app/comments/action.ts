import { createAsyncThunk } from '@reduxjs/toolkit'
import { CommentPatch, CommentPost } from '../../interface/comments'
import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
  updateComment,
} from './api'

export const fetchCommentsByPostIdAction = createAsyncThunk(
  `comments/fetchByPostId`,
  async (postId: number) => {
    const response = await fetchCommentsByPostId(postId)
    return response
  }
)

export const createCommentAction = createAsyncThunk(
  `comments/create`,
  async (reqBody: CommentPost) => {
    const response = await createComment(reqBody)
    return response
  }
)

export const updateCommentAction = createAsyncThunk(
  `comments/update`,
  async (reqBody: CommentPatch) => {
    const response = await updateComment(reqBody)
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
