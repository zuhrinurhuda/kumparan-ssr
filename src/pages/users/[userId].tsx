import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { fetchAlbumsByUserIdAction } from '../../app/albums/action'
import { useAppSelector } from '../../app/hooks'
import { fetchPostsByUserIdAction } from '../../app/posts/action'
import { wrapper } from '../../app/store'
import { fetchUserByIdAction } from '../../app/users/action'
import { fetchUserList } from '../../app/users/api'
import { selectUser } from '../../app/users/selector'
import AlbumsList from '../../features/albums/AlbumList'
import Posts from '../../features/posts/PostList'

const UserDetailPage: NextPage = () => {
  const user = useAppSelector(selectUser)

  return (
    <div>
      <Head>
        <title>User detail page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{`@${user.username} Profile`}</h1>
      </header>
      <main>
        <ul>
          <li>{`name: ${user.name}`}</li>
          <li>{`email: ${user.email}`}</li>
          <li>{`phone: ${user.phone}`}</li>
          <li>{`website: ${user.website}`}</li>
        </ul>
        <Posts />
        <AlbumsList />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const userList = await fetchUserList()

  const paths = userList.map((user) => ({
    params: {
      userId: user.id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(fetchUserByIdAction(Number(params.userId)))
      await store.dispatch(fetchPostsByUserIdAction(Number(params.userId)))
      await store.dispatch(fetchAlbumsByUserIdAction(Number(params.userId)))
      return {
        props: {},
      }
    }
)

export default UserDetailPage
