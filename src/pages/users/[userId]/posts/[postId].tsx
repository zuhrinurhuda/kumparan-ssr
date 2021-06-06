import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { fetchCommentsByPostIdAction } from '../../../../app/comments/action'
import { selectCommentList } from '../../../../app/comments/selector'
import { fetchPostByIdAction } from '../../../../app/posts/action'
import { fetchPostsByUserId } from '../../../../app/posts/api'
import { selectPost } from '../../../../app/posts/selector'
import { wrapper } from '../../../../app/store'
import { fetchUserByIdAction } from '../../../../app/users/action'
import { fetchUserList } from '../../../../app/users/api'
import { selectUser } from '../../../../app/users/selector'

const PostsPage: NextPage = () => {
  const user = useSelector(selectUser)
  const post = useSelector(selectPost)
  const comments = useSelector(selectCommentList)

  return (
    <div>
      <Head>
        <title>Post detail page</title>
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
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.body}</p>
              <p>{`${comment.name} - ${comment.email}`}</p>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const userList = await fetchUserList()
  const userPosts = []

  for (const user of userList) {
    const posts = await fetchPostsByUserId(user.id)
    userPosts.push(...posts)
  }

  const paths = userPosts.map((post) => {
    return {
      params: {
        userId: post.userId.toString(),
        postId: post.id.toString(),
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
      await store.dispatch(fetchPostByIdAction(params.postId as string))
      await store.dispatch(fetchCommentsByPostIdAction(params.postId as string))
      return {
        props: {},
      }
    }
)

export default PostsPage
