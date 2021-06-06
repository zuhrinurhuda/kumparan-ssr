import { AppState } from '../store'

export const selectPhotoList = (state: AppState) => state.photos.photoList
