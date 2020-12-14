import { useState } from 'react'
import { useSelector } from 'react-redux'

import type { VideoFormPayload } from 'types'

import { RootState } from 'store'

type Props = {
  videoName?: string
  authorId?: number
  categoryIds?: number[]
  onSubmit: (data: VideoFormPayload) => void
  onCancel: () => void
}

export default function VideoForm(props: Props) {
  const categories = useSelector((state: RootState) => state.categories)
  const authors = useSelector((state: RootState) => state.authors)

  const [videoName, setVideoName] = useState(props.videoName || '')
  const [authorId, setAuthorId] = useState(props.authorId || '')
  const [categoryIds, setCategoryIds] = useState(props.categoryIds || [])

  const isFormValid = videoName !== '' && authorId !== '' && categoryIds.length > 0

  function handleCategoryClick(id: number) {
    setCategoryIds(state =>
      state.includes(id) ? state.filter(categoryId => categoryId !== id) : [...state, id]
    )
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isFormValid) {
      props.onSubmit({ videoName, authorId: Number(authorId), categoryIds })
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name-input">Video name</label>
        <input
          id="name-input"
          className="input"
          placeholder="Video name"
          value={videoName}
          onChange={event => setVideoName(event.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-2 mt-5">
        <label htmlFor="author-input">Video author</label>

        <select
          id="author-input"
          className="input"
          placeholder="Video author"
          value={authorId}
          onChange={event => setAuthorId(event.target.value)}
        >
          <option value="" disabled>
            Select author
          </option>

          {authors.items.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2 mt-5">
        <label>Video category</label>

        <div className="flex flex-wrap -mx-2">
          {categories.items.map(({ id, name }) => (
            <button
              type="button"
              key={id}
              onClick={() => handleCategoryClick(id)}
              className={`btn btn-default text-sm m-2 ${
                categoryIds.includes(id) ? 'btn-primary' : ''
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 mt-8 justify-center">
        <button className="btn btn-primary" disabled={!isFormValid}>
          Submit
        </button>

        <button type="button" className="btn" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
