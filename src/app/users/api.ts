export const fetchUserList = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/users`, {
      method: 'GET',
    })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}
