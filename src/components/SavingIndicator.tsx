import { useSelector } from 'react-redux'
import { RootState } from 'store'

export default function SavingIndicator() {
  const videos = useSelector((state: RootState) => state.videos)

  if (videos.isRequestPending) return <span>Saving...</span>

  return null
}
