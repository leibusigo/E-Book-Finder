import { Empty, List } from 'antd'

import styles from './index.module.scss'
import useHomeContent from './hook'

const HomeContent = () => {
  const { hits, resultList, queryLoded, firstScreenLoad, onPageChange } =
    useHomeContent()

  return (
    <>
      {!firstScreenLoad ? (
        <>
          <div style={{ fontSize: '12px' }}>共 {hits} 条搜索结果</div>
          <div className={styles.warp}>
            <List
              loading={!queryLoded}
              pagination={{
                pageSize: 20,
                total: hits,
                showSizeChanger: false,
                onChange: page => {
                  onPageChange(page)
                },
              }}
              dataSource={resultList}
              renderItem={item => (
                <List.Item className={styles.item}>
                  <List.Item.Meta
                    title={<div>{item.title}</div>}
                    description={
                      <div>
                        "Ant Design, a design language for background
                        applications, is refined by Ant UED Team"
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </>
      ) : (
        <Empty
          description={
            '点击搜索后，本网页将向查询接口发送查询信息，接口返回结果需要一定时间，请耐心等待，不要重复查询'
          }
        />
      )}
    </>
  )
}

export default HomeContent
