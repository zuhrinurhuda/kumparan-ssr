import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAlbumsByUserId } from './api'

export const fetchAlbumsByUserIdAction = createAsyncThunk(
  `albums/fetchByUserId`,
  async (userId: string) => {
    const response = await fetchAlbumsByUserId(userId)
    return response
  }
)
