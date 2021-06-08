import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from '../../app/store'
import { Post } from '../../interface/posts'
import PostDetail from './PostDetail'
import PostList from './PostList'

const post = {
  userId: 1,
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
}

jest.mock('../../app/posts/api', () => ({
  fetchPostsByUserId: () =>
    new Promise<{ postList: Post[] }>((resolve) =>
      setTimeout(() => resolve({ postList: [post] }), 500)
    ),
  fetchPostById: () =>
    new Promise<{ post: Post }>((resolve) =>
      setTimeout(() => resolve({ post }), 500)
    ),
}))

describe('<PostList />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    )
  })
})

describe('<PostDetail />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <PostDetail />
      </Provider>
    )
  })
})
