import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhotoById, fetchPhotosByAlbumId } from './api'

export const fetchPhotosByAlbumIdAction = createAsyncThunk(
  `photos/fetchByAlbumId`,
  async (albumId: string) => {
    const response = await fetchPhotosByAlbumId(albumId)
    return response
  }
)

export const fetchPhotoByIdAction = createAsyncThunk(
  `photos/fetchById`,
  async (photoId: string) => {
    const response = await fetchPhotoById(photoId)
    return response
  }
)
