import Link from 'next/link'
import React from 'react'
import { selectAlbum } from '../../app/albums/selector'
import { useAppSelector } from '../../app/hooks'
import { selectPhotoList } from '../../app/photos/selector'
import { selectUser } from '../../app/users/selector'

const AlbumDetail: React.FC = () => {
  const user = useAppSelector(selectUser)
  const album = useAppSelector(selectAlbum)
  const photoList = useAppSelector(selectPhotoList)
  return (
    <div>
      <hr />
      <h2>{`#${album.id} ${album.title}`}</h2>
      {photoList.map((photo) => {
        return (
          <Link
            key={photo.id}
            as={`/users/${user.id}/albums/${album.id}/photos/${photo.id}`}
            href="/users/[userId]/albums/[albumId]/photos/[photoId]"
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ cursor: 'pointer' }}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default AlbumDetail
