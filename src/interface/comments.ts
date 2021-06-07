export interface Comment {
  postId: number | string
  id: number | string
  name: string
  email: string
  body: string
}

export interface CommentsState {
  status: 'idle' | 'loading' | 'failed'
  commentList: Comment[]
}
