import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { fetchAlbumByIdAction } from '../../../../app/albums/action'
import { fetchAlbumsByUserId } from '../../../../app/albums/api'
import { useAppSelector } from '../../../../app/hooks'
import { fetchPhotosByAlbumIdAction } from '../../../../app/photos/action'
import { wrapper } from '../../../../app/store'
import { fetchUserByIdAction } from '../../../../app/users/action'
import { fetchUserList } from '../../../../app/users/api'
import { selectUser } from '../../../../app/users/selector'
import AlbumDetail from '../../../../features/albums/AlbumDetail'

const AlbumDetailPage: NextPage = () => {
  const user = useAppSelector(selectUser)
  return (
    <div>
      <Head>
        <title>Album detail page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{`@${user.username} Album`}</h1>
      </header>
      <main>
        <AlbumDetail />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const userList = await fetchUserList()
  const userAlbumList = []

  for (const user of userList) {
    const posts = await fetchAlbumsByUserId(user.id)
    userAlbumList.push(...posts)
  }

  const paths = userAlbumList.map((album) => {
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
      await store.dispatch(fetchUserByIdAction(Number(params.userId)))
      await store.dispatch(fetchAlbumByIdAction(Number(params.albumId)))
      await store.dispatch(fetchPhotosByAlbumIdAction(Number(params.albumId)))
      return {
        props: {},
      }
    }
)

export default AlbumDetailPage
