import { IDetailModelProps } from '.'

const useDetailModel = ({ onOpenChange }: IDetailModelProps) => {
  const handleOk = () => {
    setTimeout(() => {
      onOpenChange(false)
    }, 3000)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return { handleOk, handleCancel }
}

export default useDetailModel
