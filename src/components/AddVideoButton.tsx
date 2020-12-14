import { useState } from 'react'
import { useDispatch } from 'react-redux'

import type { VideoFormPayload } from 'types'

import { addVideo } from 'thunks'

import Modal from 'components/Modal'
import VideoForm from 'components/VideoForm'

export default function AddVideoButton() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function showModal() {
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
  }

  const dispatch = useDispatch()

  function handleSubmit(newVideo: VideoFormPayload) {
    dispatch(addVideo(newVideo))
    hideModal()
  }

  return (
    <>
      <button className="btn btn-success" onClick={showModal}>
        Add video
      </button>

      {isModalVisible && (
        <Modal onClose={hideModal}>
          <h3 className="text-3xl mb-6">Add video</h3>
          <VideoForm onSubmit={handleSubmit} onCancel={hideModal} />
        </Modal>
      )}
    </>
  )
}
