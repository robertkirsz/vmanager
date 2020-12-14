import { createAsyncThunk } from '@reduxjs/toolkit'

import type { AuthorVideoType, VideoFormPayload } from 'types'

import { Video, addVideoToAuthor, editVideoInAuthor, removeVideoFromAuthor } from 'models'
import api from 'api'
import { RootState } from 'store'

export const fetchAuthors = createAsyncThunk<any, undefined, { state: RootState }>(
  'fetchAuthors',
  api.fetchAuthors,
  {
    condition: (_, { getState }) => {
      if (getState().authors.items.length > 0) return false
    },
  }
)

export const fetchCategories = createAsyncThunk<any, undefined, { state: RootState }>(
  'fetchCategories',
  api.fetchCategories,
  {
    condition: (_, { getState }) => {
      if (getState().categories.items.length > 0) return false
    },
  }
)

export const addVideo = createAsyncThunk<any, VideoFormPayload, { state: RootState }>(
  'addVideo',
  ({ authorId, videoName, categoryIds }, { getState, dispatch }) => {
    const authors = getState().authors.items
    const authorToEdit = authors.find(({ id }) => id === authorId)!
    const newVideo = Video(videoName, categoryIds)
    const authorWithAddedVideo = addVideoToAuthor(authorToEdit, newVideo)

    dispatch({ type: 'authors/editAuthor', payload: authorWithAddedVideo })

    return api.editAuthor(authorWithAddedVideo)
  }
)

export const editVideo = createAsyncThunk<
  any,
  {
    authorId: number
    videoId: number
    videoName: string
    categoryIds: number[]
    previousAuthorId: number
  },
  { state: RootState }
>(
  'editVideo',
  ({ authorId, videoId, videoName, categoryIds, previousAuthorId }, { getState, dispatch }) => {
    const authors = getState().authors.items

    if (authorId !== previousAuthorId) {
      const newVideo = Video(videoName, categoryIds)

      const previousAuthor = authors.find(({ id }) => id === previousAuthorId)!
      const previousAuthorWithRemovedVideo = removeVideoFromAuthor(previousAuthor, videoId)

      const newAuthor = authors.find(({ id }) => id === authorId)!
      const newAuthorWithAddedVideo = addVideoToAuthor(newAuthor, newVideo)

      dispatch({ type: 'authors/editAuthor', payload: previousAuthorWithRemovedVideo })
      dispatch({ type: 'authors/editAuthor', payload: newAuthorWithAddedVideo })

      return Promise.all([
        api.editAuthor(previousAuthorWithRemovedVideo),
        api.editAuthor(newAuthorWithAddedVideo),
      ])
    }

    const authorToEdit = authors.find(({ id }) => id === authorId)!
    const oldVideo = authorToEdit.videos.find(({ id }) => id === videoId)!

    const editedVideo: AuthorVideoType = {
      ...oldVideo,
      name: videoName,
      catIds: categoryIds,
    }

    const editedAuthor = editVideoInAuthor(authorToEdit, editedVideo)

    dispatch({ type: 'authors/editAuthor', payload: editedAuthor })

    return api.editAuthor(editedAuthor)
  }
)

export const deleteVideo = createAsyncThunk<
  any,
  { authorId: number; videoId: number },
  { state: RootState }
>('deleteVideo', ({ authorId, videoId }, { getState, dispatch }) => {
  const authors = getState().authors.items
  const authorToEdit = authors.find(author => author.id === authorId)

  if (typeof authorToEdit === 'undefined') throw new Error('Cannot find author')

  const authorWithoutVideo = removeVideoFromAuthor(authorToEdit, videoId)

  dispatch({ type: 'authors/editAuthor', payload: authorWithoutVideo })

  return api.editAuthor(authorWithoutVideo)
})
