export interface Album {
  userId: number | string
  id: number | string
  title: string
}

export interface AlbumsState {
  status: 'idle' | 'loading' | 'failed'
  albumList: Album[]
}
