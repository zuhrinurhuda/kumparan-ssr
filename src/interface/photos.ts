export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface PhotosState {
  status: 'idle' | 'loading' | 'failed'
  photoList: Photo[]
  photo: Photo | Record<string, never>
}
