import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { VideoFormPayload } from 'types'

import { editVideo } from 'thunks'

import Modal from 'components/Modal'
import VideoForm from 'components/VideoForm'
import { RootState } from 'store'

type Props = {
  authorId: number
  videoId: number
}

export default function EditVideoButton({ authorId, videoId }: Props) {
  const dispatch = useDispatch()
  const authors = useSelector((state: RootState) => state.authors)

  const videoAuthor = authors.items.find(({ id }) => id === authorId)!
  const videoToEdit = videoAuthor.videos.find(({ id }) => id === videoId)!

  const [isModalVisible, setIsModalVisible] = useState(false)

  function showModal() {
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
  }

  function handleSubmit(data: VideoFormPayload) {
    dispatch(
      editVideo({
        videoId,
        authorId: data.authorId,
        videoName: data.videoName,
        categoryIds: data.categoryIds,
        previousAuthorId: authorId,
      })
    )

    hideModal()
  }

  return (
    <>
      <button className="btn btn-info" onClick={showModal}>
        Edit
      </button>

      {isModalVisible && (
        <Modal onClose={hideModal}>
          <h3 className="text-3xl mb-6">Edit video</h3>
          <VideoForm
            videoName={videoToEdit.name}
            authorId={authorId}
            categoryIds={videoToEdit.catIds}
            onSubmit={handleSubmit}
            onCancel={hideModal}
          />
        </Modal>
      )}
    </>
  )
}
