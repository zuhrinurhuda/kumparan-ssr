import React from 'react'
import {
  createCommentAction,
  deleteCommentAction,
  updateCommentAction,
} from '../../app/comments/action'
import { selectCommentList } from '../../app/comments/selector'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPost } from '../../app/posts/selector'

type FormInput = {
  name: { value: string }
  email: { value: string }
  comment: { value: string }
}

const PostList: React.FC = () => {
  const dispatch = useAppDispatch()

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
      <h2>{`#${post.id} ${post.title}`}</h2>
      <p>{post.body}</p>
      <hr />
      <h3>Comments</h3>
      {commentList.map((comment) => {
        return (
          <div key={comment.id}>
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
            <hr />
          </div>
        )
      })}
      <h3>Add comment</h3>
      <form
        name="add-comment"
        onSubmit={handleAddComment}
        style={{ marginBottom: 64 }}
      >
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" />
        <label htmlFor="comment">Add comment:</label>
        <textarea id="comment" name="comment" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default PostList
