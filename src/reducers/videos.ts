import { createSlice } from '@reduxjs/toolkit'

import type { AuthorType, CategoryType, VideoType, SortDirectionType } from 'types'

import { addVideo, editVideo, deleteVideo } from 'thunks'

interface VideosState {
  errorMessage: string | null
  isRequestPending: boolean
  sortBy: 'videoName' | 'authorName' | 'categoryName' | 'highestQualityFormat' | 'releaseDate'
  sortDirection: SortDirectionType
}

const videosInitialState: VideosState = {
  errorMessage: null,
  isRequestPending: false,
  sortBy: 'videoName',
  sortDirection: 'ascending',
}

export function prepareVideos(categories: CategoryType[] = [], authors: AuthorType[] = []) {
  const videos: VideoType[] = []

  authors.forEach(author => {
    author.videos.forEach(video => {
      const categoryNames = video.catIds.reduce<CategoryType['name'][]>(
        (allCategoryNames, currentCategoryId) => {
          const category = categories.find(category => category.id === currentCategoryId)
          if (category) return [...allCategoryNames, category.name]
          return allCategoryNames
        },
        []
      )

      const highestQualityFormat = Object.entries(video.formats)
        .map(([type, format]) => ({
          type,
          res: parseInt(format.res),
          size: format.size,
        }))
        // Sort by `res`, then by `size`
        .sort((a, b) => {
          if (a.res === b.res) return b.size > a.size ? 1 : -1
          else if (a.res > b.res) return -1
          return 1
        })[0]

      videos.push({
        id: video.id,
        videoName: video.name,
        authorId: author.id,
        authorName: author.name,
        categoryName: categoryNames.join(', '),
        highestQualityFormat: `${highestQualityFormat.type} ${highestQualityFormat.res}p`,
        releaseDate: new Date(video.releaseDate).toLocaleDateString(),
      })
    })
  })

  return videos
}

const pendingActionHandler = (state: VideosState) => {
  state.isRequestPending = true
  state.errorMessage = null
}

const fulfilledActionHandler = (state: VideosState) => {
  state.isRequestPending = false
}

const rejectedActionHandler = (state: VideosState, action: any) => {
  state.isRequestPending = false
  state.errorMessage = `Videos ${action.error.name}: ${action.error.message}`

  // TODO: since I'm using "optimistic UI" to make User actions seem instant,
  // here I should revert any changes to the UI if there's an error.
}

const videosSlice = createSlice({
  name: 'videos',
  initialState: videosInitialState,
  reducers: {
    changeSortBy(state, action) {
      state.sortBy = action.payload
    },
    toggleSortDirection(state) {
      state.sortDirection = state.sortDirection === 'ascending' ? 'descending' : 'ascending'
    },
    clearErrors(state) {
      state.errorMessage = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addVideo.pending, pendingActionHandler)
      .addCase(addVideo.fulfilled, fulfilledActionHandler)
      .addCase(addVideo.rejected, rejectedActionHandler)
      .addCase(editVideo.pending, pendingActionHandler)
      .addCase(editVideo.fulfilled, fulfilledActionHandler)
      .addCase(editVideo.rejected, rejectedActionHandler)
      .addCase(deleteVideo.pending, pendingActionHandler)
      .addCase(deleteVideo.fulfilled, fulfilledActionHandler)
      .addCase(deleteVideo.rejected, rejectedActionHandler)
  },
})

export default videosSlice
