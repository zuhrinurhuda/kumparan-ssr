import { CommentReqBody } from '../../interface/comments'

export const fetchCommentsByPostId = async (postId: number) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/comments?postId=${postId}`,
      {
        method: 'GET',
      }
    )
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const createComment = async (reqBody: CommentReqBody) => {
  try {
    const rawResponse = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
      {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
    const response = await rawResponse.json()
    return response
  } catch (error) {
    console.log('error', error)
  }
}

export const deleteComment = async (commentId: number) => {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: 'DELETE',
    })
    return commentId
  } catch (error) {
    console.log('error', error)
  }
}
