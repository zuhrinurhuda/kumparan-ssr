export interface Album {
  userId: number
  id: number
  title: string
}

export interface AlbumsState {
  status: 'idle' | 'loading' | 'failed'
  albumList: Album[]
  album: Album | Record<string, never>
}
