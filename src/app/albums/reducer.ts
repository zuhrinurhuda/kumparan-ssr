import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchAlbumByIdAction, fetchAlbumsByUserIdAction } from './action'
import { initialState } from './state'

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.albums,
      }
    })
    .addCase(fetchAlbumsByUserIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchAlbumsByUserIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.albumList = action.payload
    })
    .addCase(fetchAlbumsByUserIdAction.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(fetchAlbumByIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchAlbumByIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.album = action.payload
    })
    .addCase(fetchAlbumByIdAction.rejected, (state) => {
      state.status = 'failed'
    })
})

export default usersReducer
