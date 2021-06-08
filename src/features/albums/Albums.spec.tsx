import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from '../../app/store'
import { Album } from '../../interface/albums'
import AlbumDetail from './AlbumDetail'
import AlbumList from './AlbumList'

const album = {
  userId: 1,
  id: 1,
  title: 'quidem molestiae enim',
}

jest.mock('../../app/albums/api', () => ({
  fetchAlbumsByUserId: () =>
    new Promise<{ albumList: Album[] }>((resolve) =>
      setTimeout(() => resolve({ albumList: [album] }), 500)
    ),
  fetchAlbumById: () =>
    new Promise<{ album: Album }>((resolve) =>
      setTimeout(() => resolve({ album }), 500)
    ),
  fetchAlbumList: () =>
    new Promise<{ albumList: Album[] }>((resolve) =>
      setTimeout(() => resolve({ albumList: [album] }), 500)
    ),
}))

describe('<AlbumList />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <AlbumList />
      </Provider>
    )
  })
})

describe('<AlbumDetail />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <AlbumDetail />
      </Provider>
    )
  })
})
