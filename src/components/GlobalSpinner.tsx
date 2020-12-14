import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import { RootState } from 'store'

export default function GlobalSpinner() {
  const categories = useSelector((state: RootState) => state.categories)
  const authors = useSelector((state: RootState) => state.authors)

  const showSpinner = authors.isRequestPending || categories.isRequestPending

  if (!showSpinner) return null

  return (
    <div className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 text-3xl">
      Loading
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </div>
  )
}

const animation = keyframes`
  from { opacity: 0; }
    to { opacity: 1; }
`

const Dot = styled.span`
  animation-name: ${animation};
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: both;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`
