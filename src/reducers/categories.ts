import { createSlice } from '@reduxjs/toolkit'

import type { CategoryType } from 'types'

import { fetchCategories } from 'thunks'

interface CategoriesState {
  items: CategoryType[]
  errorMessage: string | null
  isRequestPending: boolean
}

const categoriesInitialState: CategoriesState = {
  items: [],
  errorMessage: null,
  isRequestPending: false,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesInitialState,
  reducers: {
    clearErrors(state) {
      state.errorMessage = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.isRequestPending = true
        state.errorMessage = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload
        state.isRequestPending = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isRequestPending = false
        state.errorMessage = `Categories ${action.error.name}: ${action.error.message}`
      })
  },
})

export default categoriesSlice
