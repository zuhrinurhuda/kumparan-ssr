import { PostsState } from '../../interface/posts'

export const initialState: PostsState = {
  status: 'idle',
  postList: [],
  post: {},
}
