import { AppState } from '../store'

export const selectAlbumList = (state: AppState) => state.albums.albumList
