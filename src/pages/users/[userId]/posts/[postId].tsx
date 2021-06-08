import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { fetchCommentsByPostIdAction } from '../../../../app/comments/action'
import { useAppSelector } from '../../../../app/hooks'
import { fetchPostByIdAction } from '../../../../app/posts/action'
import { fetchPostsByUserId } from '../../../../app/posts/api'
import { wrapper } from '../../../../app/store'
import { fetchUserByIdAction } from '../../../../app/users/action'
import { fetchUserList } from '../../../../app/users/api'
import { selectUser } from '../../../../app/users/selector'
import PostDetail from '../../../../features/posts/PostDetail'

const PostDetailPage: NextPage = () => {
  const user = useAppSelector(selectUser)
  return (
    <div>
      <Head>
        <title>Post detail page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{`@${user.username} Post`}</h1>
      </header>
      <main>
        <PostDetail />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const userList = await fetchUserList()
  const userPostList = []

  for (const user of userList) {
    const posts = await fetchPostsByUserId(user.id)
    userPostList.push(...posts)
  }

  const paths = userPostList.map((post) => {
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
      await store.dispatch(fetchUserByIdAction(Number(params.userId)))
      await store.dispatch(fetchPostByIdAction(Number(params.postId)))
      await store.dispatch(fetchCommentsByPostIdAction(Number(params.postId)))
      return {
        props: {},
      }
    }
)

export default PostDetailPage
