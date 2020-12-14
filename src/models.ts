import type { AuthorType, AuthorVideoType } from 'types'

export function Video(name: string, catIds: number[]): AuthorVideoType {
  const now = new Date()

  return {
    id: Date.now(),
    name,
    catIds,
    formats: {
      one: { res: '1080p', size: 1000 },
    },
    releaseDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
  }
}

export const addVideoToAuthor = (author: AuthorType, video: AuthorVideoType) => {
  return { ...author, videos: [...author.videos, video] }
}

export const editVideoInAuthor = (author: AuthorType, editedVideo: AuthorVideoType) => {
  return {
    ...author,
    videos: author.videos.map(currentVideo =>
      currentVideo.id === editedVideo.id ? editedVideo : currentVideo
    ),
  }
}

export const removeVideoFromAuthor = (author: AuthorType, videoId: number) => {
  return { ...author, videos: author.videos.filter(({ id }) => id !== videoId) }
}
