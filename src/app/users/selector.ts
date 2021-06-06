import { AppState } from '../store'

export const selectUserList = (state: AppState) => state.users.userList
export const selectUser = (state: AppState) => state.users.user
