import { AnyAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { fetchPhotoByIdAction, fetchPhotosByAlbumIdAction } from './action'
import { initialState } from './state'

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.photos,
      }
    })
    .addCase(fetchPhotosByAlbumIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchPhotosByAlbumIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.photoList = action.payload
    })
    .addCase(fetchPhotosByAlbumIdAction.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(fetchPhotoByIdAction.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchPhotoByIdAction.fulfilled, (state, action) => {
      state.status = 'idle'
      state.photo = action.payload
    })
    .addCase(fetchPhotoByIdAction.rejected, (state) => {
      state.status = 'failed'
    })
})

export default usersReducer
