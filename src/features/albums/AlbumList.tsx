import Link from 'next/link'
import React from 'react'
import { selectAlbumList } from '../../app/albums/selector'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/users/selector'

const AlbumsList: React.FC = () => {
  const user = useAppSelector(selectUser)
  const albumList = useAppSelector(selectAlbumList)
  return (
    <div>
      <hr />
      <h2>{`${user.username} Albums`}</h2>
      <ul>
        {albumList.map((album) => {
          return (
            <li key={album.id}>
              {album.title}
              <Link
                as={`/users/${user.id}/albums/${album.id}`}
                href="/users/[userId]/albums/[albumId]"
              >
                <button>View</button>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AlbumsList
