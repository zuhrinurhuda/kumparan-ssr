import { AppState } from '../store'

export const selectAlbumList = (state: AppState) => state.albums.albumList
export const selectAlbum = (state: AppState) => state.albums.album
