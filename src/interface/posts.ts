export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostsState {
  status: 'idle' | 'loading' | 'failed'
  postList: Post[]
  post: Post | Record<string, never>
}
