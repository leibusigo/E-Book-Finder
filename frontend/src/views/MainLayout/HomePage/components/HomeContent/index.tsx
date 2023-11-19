import { Empty, Flex, List, Tooltip } from 'antd'

import styles from './index.module.scss'
import useHomeContent from './hook'
import { useCallback, useMemo } from 'react'
import { IQueryDetails } from '../../../../../models/ResModel'
import { changeByte } from '../../../../../utils/byteFormat'

const HomeContent = () => {
  const { resultList, queryLoded, firstScreenLoad, maxPage, onPageChange } =
    useHomeContent()

  const total = useMemo(
    () => (maxPage - 1) * 20 + resultList.length,
    [maxPage, resultList.length]
  )

  const itemTitle = useCallback(
    (item: IQueryDetails, index: number) => {
      return (
        <Flex gap={40}>
          <div className={styles.ellipsis}>
            {(maxPage - 1) * 20 + index + 1}. {item.title}
          </div>
        </Flex>
      )
    },
    [maxPage]
  )

  const itemDesc = useCallback((item: IQueryDetails) => {
    return (
      <Flex gap={20}>
        <div className={`${styles.ellipsis} ${styles.autherInfo}`}>
          作者：{item.author}
        </div>
        <div className={`${styles.ellipsis} ${styles.info}`}>
          格式：{item.extension}
        </div>
        <div className={`${styles.ellipsis} ${styles.info}`}>
          年份：{item.year}
        </div>
        <div className={`${styles.ellipsis} ${styles.info}`}>
          大小：{changeByte(item.filesize)}
        </div>
      </Flex>
    )
  }, [])

  return (
    <>
      {!firstScreenLoad ? (
        <>
          <Tooltip
            color={'blue'}
            title="由于接口获取不到所有数据条数，分页器只会显示加载条数"
          >
            <div className={styles.loaded_counts}>
              共加载 {total} 条搜索结果
            </div>
          </Tooltip>

          <div className={styles.warp}>
            <List
              loading={!queryLoded}
              pagination={{
                total: total + 1,
                align: 'center',
                pageSize: 20,
                showSizeChanger: false,
                onChange: page => {
                  onPageChange(page)
                },
              }}
              dataSource={resultList}
              renderItem={(item, index) => (
                <List.Item className={styles.item}>
                  <List.Item.Meta
                    title={itemTitle(item, index)}
                    description={itemDesc(item)}
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
