import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import {
  createCommentAction,
  deleteCommentAction,
  fetchCommentsByPostIdAction,
  updateCommentAction,
} from '../../../../app/comments/action'
import { selectCommentList } from '../../../../app/comments/selector'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { fetchPostByIdAction } from '../../../../app/posts/action'
import { fetchPostsByUserId } from '../../../../app/posts/api'
import { selectPost } from '../../../../app/posts/selector'
import { wrapper } from '../../../../app/store'
import { fetchUserByIdAction } from '../../../../app/users/action'
import { fetchUserList } from '../../../../app/users/api'
import { selectUser } from '../../../../app/users/selector'

type FormInput = {
  name: { value: string }
  email: { value: string }
  comment: { value: string }
}

const PostDetailPage: NextPage = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const post = useAppSelector(selectPost)
  const commentList = useAppSelector(selectCommentList)

  const [selectedComment, setSelectedComment] = React.useState(0)

  const handleAddComment = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const { name, email, comment } = e.target as typeof e.target & FormInput

    await dispatch(
      createCommentAction({
        postId: post.id,
        name: name.value,
        email: email.value,
        body: comment.value,
      })
    )

    name.value = ''
    email.value = ''
    comment.value = ''
  }

  const handleEditComment = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const { comment } = e.target as typeof e.target & FormInput

    await dispatch(
      updateCommentAction({
        commentId: selectedComment,
        body: comment.value,
      })
    )

    setSelectedComment(0)
  }

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteCommentAction(commentId))
  }

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
        {commentList.map((comment) => {
          return (
            <div key={comment.id}>
              <hr />
              {selectedComment === comment.id ? (
                <form name="edit-comment" onSubmit={handleEditComment}>
                  <label htmlFor="comment">Edit comment:</label>
                  <textarea
                    id="comment"
                    name="comment"
                    defaultValue={comment.body}
                  />
                  <button type="submit">Submit</button>
                  <button onClick={() => setSelectedComment(0)}>Cancel</button>
                </form>
              ) : (
                <p>{comment.body}</p>
              )}
              <p>{`${comment.name} - ${comment.email}`}</p>
              {selectedComment !== comment.id && (
                <>
                  <button onClick={() => setSelectedComment(comment.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          )
        })}
        <hr />
        <form name="add-comment" onSubmit={handleAddComment}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" />
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" />
          <label htmlFor="comment">Add comment:</label>
          <textarea id="comment" name="comment" />
          <button type="submit">Add</button>
        </form>
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
