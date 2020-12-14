import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import type { VideoType, SortDirectionType } from 'types'
import type { RootState } from 'store'

import videosSlice, { prepareVideos } from 'reducers/videos'
import { sort } from 'utils'

import EditVideoButton from 'components/EditVideoButton'
import DeleteVideoButton from 'components/DeleteVideoButton'

const { changeSortBy, toggleSortDirection } = videosSlice.actions

function VideosTableRow({
  id,
  videoName,
  authorId,
  authorName,
  categoryName,
  highestQualityFormat,
  releaseDate,
}: VideoType) {
  return (
    <tr className="border-b">
      <td className="p-3 px-5">{videoName}</td>
      <td className="p-3 px-5">{authorName}</td>
      <td className="p-3 px-5">{categoryName}</td>
      <td className="p-3 px-5">{highestQualityFormat}</td>
      <td className="p-3 px-5">{releaseDate}</td>
      <td className="p-3 px-5">
        <div className="flex justify-center space-x-2">
          <EditVideoButton authorId={authorId} videoId={id} />
          <DeleteVideoButton authorId={authorId} videoId={id} />
        </div>
      </td>
    </tr>
  )
}

function HeaderCell({
  sortable = false,
  property,
  ...props
}: {
  sortable?: boolean
  property?: string
  className?: string
  children: React.ReactNode
}) {
  const dispatch = useDispatch()
  const { sortBy, sortDirection } = useSelector((state: RootState) => state.videos)

  const isActive = property === sortBy

  function handleClick() {
    if (sortable) {
      dispatch(isActive ? toggleSortDirection() : changeSortBy(property))
    }
  }

  return (
    <Th
      sortable={sortable}
      isActive={isActive}
      sortDirection={sortDirection}
      onClick={handleClick}
      className="text-left p-3 px-5 select-none"
      {...props}
    />
  )
}

// This is an experiment, I wanted to see how to use emoji as a background-image
// to indicate sorting order.

// prettier-ignore
const Th = styled.th<{ sortable: boolean; isActive: boolean; sortDirection: SortDirectionType }>`
  background-size: 24px 24px;
  background-position: right center;
  background-repeat: no-repeat;

  ${({ sortable, isActive, sortDirection }) => `
    ${sortable && `
      padding-right: 32px;
      cursor: pointer;

      ${isActive && `
        background-image: url('data:image/svg+xml,\
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">\
            <text y="18px">${sortDirection === 'ascending' ? '⬆️' : '⬇️'}</text>\
          </svg>\
        ');
      `}
    `}
  `}
`

type Props = {
  searchQuery: string
}

export default function VideosTable({ searchQuery = '' }: Props) {
  const categories = useSelector((state: RootState) => state.categories)
  const authors = useSelector((state: RootState) => state.authors)
  const { sortBy, sortDirection } = useSelector((state: RootState) => state.videos)

  const videos = prepareVideos(categories.items, authors.items)

  if (videos.length === 0) return null

  return (
    <table className="w-full text-sm bg-white shadow-md rounded mb-4 cursor-default">
      <thead>
        <tr className="border-b bg-gray-200 shadow-md">
          <HeaderCell sortable property="videoName">
            Video name
          </HeaderCell>
          <HeaderCell sortable property="authorName">
            Author
          </HeaderCell>
          <HeaderCell sortable property="categoryName">
            Category name
          </HeaderCell>
          <HeaderCell sortable property="highestQualityFormat">
            Highest quality format
          </HeaderCell>
          <HeaderCell sortable property="releaseDate">
            Release date
          </HeaderCell>
          <HeaderCell className="text-center">Options</HeaderCell>
        </tr>
      </thead>

      <tbody>
        {sort(videos, sortBy, sortDirection)
          .filter(video =>
            searchQuery !== ''
              ? video.videoName.toLowerCase().includes(searchQuery.toLowerCase())
              : true
          )
          .map(video => (
            <VideosTableRow key={video.id} {...video} />
          ))}
      </tbody>
    </table>
  )
}
