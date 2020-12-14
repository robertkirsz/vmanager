import { createSlice } from '@reduxjs/toolkit'

import type { AuthorType } from 'types'

import { fetchAuthors } from 'thunks'
interface AuthorsState {
  items: AuthorType[]
  errorMessage: string | null
  isRequestPending: boolean
}

const authorsInitialState: AuthorsState = {
  items: [],
  errorMessage: null,
  isRequestPending: false,
}

const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsInitialState,
  reducers: {
    editAuthor(state, action) {
      const authorIndex = state.items.findIndex(({ id }) => id === action.payload.id)
      state.items[authorIndex] = action.payload
    },
    clearErrors(state) {
      state.errorMessage = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuthors.pending, state => {
        state.isRequestPending = true
        state.errorMessage = null
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.items = action.payload
        state.isRequestPending = false
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isRequestPending = false
        state.errorMessage = `Authors ${action.error.name}: ${action.error.message}`
      })
  },
})

export default authorsSlice
