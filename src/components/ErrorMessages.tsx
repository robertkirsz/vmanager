import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'

type Props = {
  onClick: () => void
  children: React.ReactNode
}

function ErrorMessage({ onClick, children }: Props) {
  return (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-red-700 bg-red-100 border border-red-300 ">
      <div className="text-l max-w-full flex-initial">{children}</div>
      <div className="flex flex-auto flex-row-reverse" onClick={onClick}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function ErrorMessages() {
  const dispatch = useDispatch()

  const categories = useSelector((state: RootState) => state.categories)
  const authors = useSelector((state: RootState) => state.authors)
  const videos = useSelector((state: RootState) => state.videos)

  const hasErrors = categories.errorMessage || authors.errorMessage || videos.errorMessage

  if (!hasErrors) return null

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-50">
      {categories.errorMessage && (
        <ErrorMessage onClick={() => dispatch({ type: 'categories/clearErrors' })}>
          {categories.errorMessage}
        </ErrorMessage>
      )}

      {authors.errorMessage && (
        <ErrorMessage onClick={() => dispatch({ type: 'authors/clearErrors' })}>
          {authors.errorMessage}
        </ErrorMessage>
      )}

      {videos.errorMessage && (
        <ErrorMessage onClick={() => dispatch({ type: 'videos/clearErrors' })}>
          {videos.errorMessage}
        </ErrorMessage>
      )}
    </div>
  )
}
