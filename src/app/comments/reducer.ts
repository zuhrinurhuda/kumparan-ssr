import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import {
  createCommentAction,
  deleteCommentAction,
  fetchCommentsByPostIdAction,
} from './action'
import { initialState } from './state'

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.comments,
      }
    })
    .addCase(fetchCommentsByPostIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchCommentsByPostIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.commentList = action.payload
    })
    .addCase(fetchCommentsByPostIdAction.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(createCommentAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(createCommentAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.commentList.push(action.payload)
    })
    .addCase(createCommentAction.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(deleteCommentAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.status = 'idle'
      const filteredComment = state.commentList.filter(
        (comment) => comment.id !== action.payload
      )
      state.commentList = filteredComment
    })
    .addCase(deleteCommentAction.rejected, (state) => {
      state.status = 'failed'
    })
})

export default usersReducer
