import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector, useStore } from 'react-redux'
import { fetchAlbumsByUserIdAction } from '../../app/albums/action'
import { selectAlbumList } from '../../app/albums/selector'
import { fetchPostsByUserIdAction } from '../../app/posts/action'
import { selectPostList } from '../../app/posts/selector'
import { wrapper } from '../../app/store'
import { fetchUserByIdAction } from '../../app/users/action'
import { fetchUserList } from '../../app/users/api'
import { selectUser } from '../../app/users/selector'

const IndexPage: NextPage = (props) => {
  console.log('State on render', useStore().getState(), props)
  const user = useSelector(selectUser)
  const postList = useSelector(selectPostList)
  const albumList = useSelector(selectAlbumList)

  return (
    <div>
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      <main>
        <p>{`@${user.username}`}</p>
        <ul>
          <li>{`name: ${user.name}`}</li>
          <li>{`email: ${user.email}`}</li>
          <li>{`phone: ${user.phone}`}</li>
          <li>{`website: ${user.website}`}</li>
        </ul>
        {postList.map((post) => {
          return (
            <Link
              key={post.id}
              as={`/users/${user.id}/posts/${post.id}`}
              href="/users/[userId]/posts/[postId]"
            >
              <p>{post.title}</p>
            </Link>
          )
        })}
        <hr />
        {albumList.map((album) => {
          return (
            <Link
              key={album.id}
              as={`/users/${user.id}/albums/${album.id}`}
              href="/users/[userId]/albums/[albumId]"
            >
              <p>{album.title}</p>
            </Link>
          )
        })}
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
      console.log('params', params)
      await store.dispatch(fetchUserByIdAction(params.userId as string))
      await store.dispatch(fetchPostsByUserIdAction(params.userId as string))
      await store.dispatch(fetchAlbumsByUserIdAction(params.userId as string))
      console.log('State on server', store.getState())
      return {
        props: {},
      }
    }
)

export default IndexPage
