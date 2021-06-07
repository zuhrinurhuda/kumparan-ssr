import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { createCommentAction, fetchCommentsByPostIdAction } from './action'
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
})

export default usersReducer
