export type CategoryType = {
  id: number
  name: string
}

export type ResolutionType = '720p' | '1080p'

export type AuthorVideoType = {
  id: number
  catIds: number[]
  name: string
  formats: {
    [key: string]: { res: ResolutionType; size: number }
  }
  releaseDate: string
}

export type AuthorType = {
  id: number
  name: string
  videos: AuthorVideoType[]
}

export type VideoType = {
  id: number
  videoName: string
  authorId: number
  authorName: string
  categoryName: string
  highestQualityFormat: string
  releaseDate: string
}

export type SortDirectionType = 'ascending' | 'descending'

export type VideoFormPayload = {
  videoName: string
  authorId: number
  categoryIds: number[]
}
