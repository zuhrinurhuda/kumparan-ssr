import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectPostList } from '../../app/posts/selector'
import { selectUser } from '../../app/users/selector'

const PostList: React.FC = () => {
  const user = useAppSelector(selectUser)
  const postList = useAppSelector(selectPostList)
  return (
    <div>
      <hr />
      <h2>{`${user.username} Posts`}</h2>
      <ol>
        {postList.map((post) => {
          return (
            <li key={post.id}>
              {post.title}
              <Link
                as={`/users/${user.id}/posts/${post.id}`}
                href="/users/[userId]/posts/[postId]"
              >
                <button>View</button>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default PostList
