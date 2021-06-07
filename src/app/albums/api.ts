export const fetchAlbumsByUserId = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/albums?userId=${userId}`,
      {
        method: 'GET',
      }
    )
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchAlbumById = async (albumId: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/albums/${albumId}`, {
      method: 'GET',
    })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchAlbumList = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/albums`, {
      method: 'GET',
    })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}
