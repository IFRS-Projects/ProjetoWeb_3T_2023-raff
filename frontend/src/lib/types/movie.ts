export type createMovieType = {
  title: string
  description: string
  file?: File
}

export type movieType = {
  id: string
  title: string
  description: string
  love_amount: number
  image_url: string
}

export type updateMovieType = Partial<movieType>
