import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteVideo } from 'thunks'

import Modal from 'components/Modal'

type Props = {
  authorId: number
  videoId: number
}

export default function DeleteVideoButton({ authorId, videoId }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function showModal() {
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
  }

  const dispatch = useDispatch()

  function handleConfirm() {
    dispatch(deleteVideo({ authorId, videoId }))
    hideModal()
  }

  return (
    <>
      <button className="btn btn-danger" onClick={showModal}>
        Delete
      </button>

      {isModalVisible && (
        <Modal onClose={hideModal}>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl mb-4 text-center">You sure?</h3>

            <button className="btn btn-danger m-2" onClick={handleConfirm}>
              Yes, delete
            </button>

            <button className="btn btn-default m-2" onClick={hideModal}>
              No, go back
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
