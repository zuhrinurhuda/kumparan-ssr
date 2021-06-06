import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { fetchAlbumByIdAction } from '../../../../app/albums/action'
import { fetchAlbumsByUserId } from '../../../../app/albums/api'
import { selectAlbum } from '../../../../app/albums/selector'
import { fetchPhotosByAlbumIdAction } from '../../../../app/photos/action'
import { selectPhotoList } from '../../../../app/photos/selector'
import { wrapper } from '../../../../app/store'
import { fetchUserByIdAction } from '../../../../app/users/action'
import { fetchUserList } from '../../../../app/users/api'
import { selectUser } from '../../../../app/users/selector'

const AlbumsPage: NextPage = () => {
  const user = useSelector(selectUser)
  const album = useSelector(selectAlbum)
  const photos = useSelector(selectPhotoList)

  return (
    <div>
      <Head>
        <title>Album detail page</title>
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
        {photos.map((photo) => {
          return (
            <Link
              key={photo.id}
              as={`/users/${user.id}/albums/${album.id}/photos/${photo.id}`}
              href="/users/[userId]/albums/[albumId]/photos/photoId"
            >
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </Link>
          )
        })}
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const userList = await fetchUserList()
  const userAlbums = []

  for (const user of userList) {
    const posts = await fetchAlbumsByUserId(user.id)
    userAlbums.push(...posts)
  }

  const paths = userAlbums.map((album) => {
    return {
      params: {
        userId: album.userId.toString(),
        albumId: album.id.toString(),
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
      await store.dispatch(fetchUserByIdAction(params.userId as string))
      await store.dispatch(fetchAlbumByIdAction(params.albumId as string))
      await store.dispatch(fetchPhotosByAlbumIdAction(params.albumId as string))
      console.log('State on server', store.getState())
      return {
        props: {},
      }
    }
)

export default AlbumsPage
