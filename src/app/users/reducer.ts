import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchUserByIdAction, fetchUserListAction } from './action'
import { initialState } from './state'

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.users,
      }
    })
    .addCase(fetchUserListAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchUserListAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.userList = action.payload
    })
    .addCase(fetchUserListAction.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(fetchUserByIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchUserByIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.user = action.payload
    })
    .addCase(fetchUserByIdAction.rejected, (state) => {
      state.status = 'failed'
    })
})

export default usersReducer
