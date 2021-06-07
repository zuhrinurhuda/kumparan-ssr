export const fetchCommentsByPostId = async (postId: string) => {
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
