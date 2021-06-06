import { AppState } from '../store'

export const selectPostList = (state: AppState) => state.posts.postList
