import type { NextPage } from 'next'
import Head from 'next/head'
import { wrapper } from '../app/store'
import { fetchUserListAction } from '../app/users/action'
import UsersList from '../features/users/UserList'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>User list</h1>
      </header>
      <main>
        <UsersList />
      </main>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchUserListAction())
  return {
    props: {},
  }
})

export default IndexPage
