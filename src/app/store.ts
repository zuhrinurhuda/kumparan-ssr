import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action } from 'redux'
import counterReducer from '../features/counter/counterSlice'
import albumsReducer from './albums/reducer'
import postsReducer from './posts/reducer'
import usersReducer from './users/reducer'

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      users: usersReducer,
      posts: postsReducer,
      albums: albumsReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
