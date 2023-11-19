import { SearchProps } from 'antd/es/input'

const useHeaderBar = () => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)

  return {
    onSearch,
  }
}

export default useHeaderBar
