import { AppState } from '../store'

export const selectCommentList = (state: AppState) => state.comments.commentList
