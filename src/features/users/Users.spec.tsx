import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from '../../app/store'
import { User } from '../../interface/users'
import UserList from './UserList'

const user = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
}

jest.mock('../../app/users/api', () => ({
  fetchUserList: () =>
    new Promise<{ userList: User[] }>((resolve) =>
      setTimeout(() => resolve({ userList: [user] }), 500)
    ),
  fetchUserById: () =>
    new Promise<{ user: User }>((resolve) =>
      setTimeout(() => resolve({ user }), 500)
    ),
}))

describe('<UserList />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    )
  })
})
