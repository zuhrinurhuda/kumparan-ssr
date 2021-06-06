import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhotosByAlbumId } from './api'

export const fetchPhotosByAlbumIdAction = createAsyncThunk(
  `photos/fetchByAlbumId`,
  async (albumId: string) => {
    const response = await fetchPhotosByAlbumId(albumId)
    return response
  }
)
