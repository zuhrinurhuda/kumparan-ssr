import { AlbumsState } from '../../interface/albums'

export const initialState: AlbumsState = {
  status: 'idle',
  albumList: [],
  album: {},
}
