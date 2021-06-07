import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhotoById, fetchPhotosByAlbumId } from './api'

export const fetchPhotosByAlbumIdAction = createAsyncThunk(
  `photos/fetchByAlbumId`,
  async (albumId: number) => {
    const response = await fetchPhotosByAlbumId(albumId)
    return response
  }
)

export const fetchPhotoByIdAction = createAsyncThunk(
  `photos/fetchById`,
  async (photoId: number) => {
    const response = await fetchPhotoById(photoId)
    return response
  }
)
