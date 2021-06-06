export interface Post {
  userId: number | string
  id: number | string
  title: string
  body: string
}

export interface PostsState {
  status: 'idle' | 'loading' | 'failed'
  postList: Post[]
}
