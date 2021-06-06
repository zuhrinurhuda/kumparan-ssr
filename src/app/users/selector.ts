import { AppState } from '../store'

export const selectUserList = (state: AppState) => state.users.userList
