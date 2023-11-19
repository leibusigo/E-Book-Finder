import { useState } from 'react'
import { Button, Modal } from 'antd'

interface IProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DetailModel = ({ open, onOpenChange }: IProps) => {
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
    }, 3000)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default DetailModel
