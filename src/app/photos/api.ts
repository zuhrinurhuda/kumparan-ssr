export const fetchPhotosByAlbumId = async (albumId: number) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/photos?albumId=${albumId}`,
      {
        method: 'GET',
      }
    )
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchPhotoById = async (photoId: number) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/photos/${photoId}`, {
      method: 'GET',
    })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}
