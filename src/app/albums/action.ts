import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAlbumById, fetchAlbumsByUserId } from './api'

export const fetchAlbumsByUserIdAction = createAsyncThunk(
  `albums/fetchByUserId`,
  async (userId: string) => {
    const response = await fetchAlbumsByUserId(userId)
    return response
  }
)

export const fetchAlbumByIdAction = createAsyncThunk(
  `albums/fetchById`,
  async (albumId: string) => {
    const response = await fetchAlbumById(albumId)
    return response
  }
)
