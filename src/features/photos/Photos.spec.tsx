import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from '../../app/store'
import { Photo } from '../../interface/photos'
import PhotoDetail from './PhotoDetail'

const photo = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952',
}

jest.mock('../../app/posts/api', () => ({
  fetchPhotosByAlbumId: () =>
    new Promise<{ photoList: Photo[] }>((resolve) =>
      setTimeout(() => resolve({ photoList: [photo] }), 500)
    ),
  fetchPhotoById: () =>
    new Promise<{ photo: Photo }>((resolve) =>
      setTimeout(() => resolve({ photo }), 500)
    ),
}))

describe('<PhotoDetail />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <PhotoDetail />
      </Provider>
    )
  })
})
