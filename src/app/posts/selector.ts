import { AppState } from '../store'

export const selectPostList = (state: AppState) => state.posts.postList
export const selectPost = (state: AppState) => state.posts.post
