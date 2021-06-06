import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector, useStore } from 'react-redux'
import { wrapper } from '../app/store'
import { fetchUserListAction } from '../app/users/action'
import { selectUserList } from '../app/users/selector'

const IndexPage: NextPage = (props) => {
  console.log('State on render', useStore().getState(), props)
  const userList = useSelector(selectUserList)

  return (
    <div>
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      <main>
        {userList.map((user) => {
          return (
            <Link key={user.id} as={`/users/${user.id}`} href="/users/[userId]">
              <div>
                <h2>{`@${user.username}`}</h2>
                <ul>
                  <li>{`name: ${user.name}`}</li>
                  <li>{`email: ${user.email}`}</li>
                  <li>{`phone: ${user.phone}`}</li>
                  <li>{`website: ${user.website}`}</li>
                </ul>
              </div>
            </Link>
          )
        })}
      </main>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchUserListAction())
  console.log('State on server', store.getState())
  return {
    props: {},
  }
})

export default IndexPage
