import { AppState } from '../store'

export const selectPhotoList = (state: AppState) => state.photos.photoList
export const selectPhoto = (state: AppState) => state.photos.photo
