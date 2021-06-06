import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector, useStore } from 'react-redux'
import { wrapper } from '../app/store'
import { fetchUserListAction } from '../app/users/action'
import { selectUserList } from '../app/users/selector'
import styles from '../styles/Home.module.css'

const IndexPage: NextPage = (props) => {
  console.log('State on render', useStore().getState(), props)
  const userList = useSelector(selectUserList)
  console.log('userList', userList)
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
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
