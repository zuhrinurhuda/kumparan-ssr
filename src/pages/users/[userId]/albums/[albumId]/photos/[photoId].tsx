import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { fetchAlbumByIdAction } from '../../../../../../app/albums/action'
import { fetchAlbumList } from '../../../../../../app/albums/api'
import { selectAlbum } from '../../../../../../app/albums/selector'
import { useAppSelector } from '../../../../../../app/hooks'
import { fetchPhotoByIdAction } from '../../../../../../app/photos/action'
import { fetchPhotosByAlbumId } from '../../../../../../app/photos/api'
import { wrapper } from '../../../../../../app/store'
import { fetchUserByIdAction } from '../../../../../../app/users/action'
import PhotoDetail from '../../../../../../features/photos/PhotoDetail'

const PhotoDetailPage: NextPage = () => {
  const album = useAppSelector(selectAlbum)
  return (
    <div>
      <Head>
        <title>Photo detail page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{`@${album.title} album`}</h1>
      </header>
      <main>
        <PhotoDetail />
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
