import { configureStore, combineReducers } from '@reduxjs/toolkit'

import categoriesSlice from 'reducers/categories'
import authorsSlice from 'reducers/authors'
import videosSlice from 'reducers/videos'

const rootReducer = combineReducers({
  categories: categoriesSlice.reducer,
  authors: authorsSlice.reducer,
  videos: videosSlice.reducer,
})

export default configureStore({ reducer: rootReducer })
export type RootState = ReturnType<typeof rootReducer>
