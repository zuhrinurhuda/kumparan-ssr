import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchPostsByUserIdAction } from './action'
import { initialState } from './state'

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.posts,
      }
    })
    .addCase(fetchPostsByUserIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchPostsByUserIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.postList = action.payload
    })
    .addCase(fetchPostsByUserIdAction.rejected, (state) => {
      state.status = 'failed'
    })
})

export default usersReducer
