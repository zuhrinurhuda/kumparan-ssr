export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface CommentsState {
  status: 'idle' | 'loading' | 'failed'
  commentList: Comment[]
}

export interface CommentPost {
  postId: number | string
  name: string
  email: string
  body: string
}

export interface CommentPatch {
  commentId: number
  body: string
}
