import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectPhoto } from '../../app/photos/selector'

const PhotoDetail: React.FC = () => {
  const photo = useAppSelector(selectPhoto)
  return (
    <div>
      <h2>{`#${photo.id} ${photo.title}`}</h2>
      <img src={photo.url} alt={photo.title} />
    </div>
  )
}

export default PhotoDetail
