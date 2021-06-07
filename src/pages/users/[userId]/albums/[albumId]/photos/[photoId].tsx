import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { fetchAlbumByIdAction } from '../../../../../../app/albums/action'
import { fetchAlbumList } from '../../../../../../app/albums/api'
import { selectAlbum } from '../../../../../../app/albums/selector'
import { fetchPhotoByIdAction } from '../../../../../../app/photos/action'
import { fetchPhotosByAlbumId } from '../../../../../../app/photos/api'
import { selectPhoto } from '../../../../../../app/photos/selector'
import { wrapper } from '../../../../../../app/store'
import { fetchUserByIdAction } from '../../../../../../app/users/action'
import { selectUser } from '../../../../../../app/users/selector'

const PhotoDetailPage: NextPage = () => {
  const user = useSelector(selectUser)
  const album = useSelector(selectAlbum)
  const photo = useSelector(selectPhoto)

  return (
    <div>
      <Head>
        <title>Photo detail page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      <main>
        <h2>{`@${user.username}`}</h2>
        <ul>
          <li>{`name: ${user.name}`}</li>
          <li>{`email: ${user.email}`}</li>
          <li>{`phone: ${user.phone}`}</li>
          <li>{`website: ${user.website}`}</li>
        </ul>
        <h2>{album.title}</h2>
        <h3>{photo.title}</h3>
        <img src={photo.url} alt={photo.title} />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const albumList = await fetchAlbumList()
  const userPhotoList = []

  for (const album of albumList) {
    const photos = await fetchPhotosByAlbumId(album.id)
    const photosWithUserId = photos.map((photo) => ({
      ...photo,
      userId: album.userId,
    }))
    userPhotoList.push(...photosWithUserId)
  }

  const paths = userPhotoList.map((photo) => {
    return {
      params: {
        userId: photo.userId.toString(),
        albumId: photo.albumId.toString(),
        photoId: photo.id.toString(),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(fetchUserByIdAction(Number(params.userId)))
      await store.dispatch(fetchAlbumByIdAction(Number(params.albumId)))
      await store.dispatch(fetchPhotoByIdAction(Number(params.photoId)))
      return {
        props: {},
      }
    }
)

export default PhotoDetailPage
