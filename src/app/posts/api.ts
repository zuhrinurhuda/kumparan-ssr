export const fetchPostsByUserId = async (userId: number) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/posts?userId=${userId}`,
      {
        method: 'GET',
      }
    )
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchPostById = async (postId: number) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/posts/${postId}`, {
      method: 'GET',
    })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}
