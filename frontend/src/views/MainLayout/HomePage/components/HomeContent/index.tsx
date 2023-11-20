import { Empty, Flex, List, Tooltip } from 'antd'

import styles from './index.module.scss'
import useHomeContent from './hook'
import { useCallback } from 'react'
import { IQueryDetails } from '../../../../../models/ResModel'
import { changeByte } from '../../../../../utils/byteFormat'
import DetailModel from './DetailModel'

const HomeContent = () => {
  const {
    resultList,
    queryLoaded,
    firstScreenLoad,
    total,
    curPage,
    maxPage,
    warpRef,
    modelOpen,
    bookDetail,
    getDetailLoaded,
    onPageChange,
    onItemClick,
    onOpenChangeHandler,
  } = useHomeContent()

  const itemTitle = useCallback(
    ({ title }: IQueryDetails, index: number) => {
      return (
        <Flex gap={40}>
          <div className={styles.ellipsis}>
            {(curPage - 1) * 20 + index + 1}. {title}
          </div>
        </Flex>
      )
    },
    [curPage]
  )

  const itemDesc = useCallback(
    ({ author, extension, year, filesize }: IQueryDetails) => {
      return (
        <Flex gap={20}>
          <div className={`${styles.ellipsis} ${styles.autherInfo}`}>
            作者：{author}
          </div>
          <div className={`${styles.ellipsis} ${styles.info}`}>
            格式：{extension}
          </div>
          <div className={`${styles.ellipsis} ${styles.info}`}>
            年份：{year}
          </div>
          <div className={`${styles.ellipsis} ${styles.info}`}>
            大小：{changeByte(filesize)}
          </div>
        </Flex>
      )
    },
    []
  )

  return (
    <>
      <DetailModel
        getDetailLoaded={getDetailLoaded}
        bookDetail={bookDetail}
        open={modelOpen}
        onOpenChange={onOpenChangeHandler}
      />
      {!firstScreenLoad ? (
        <>
          <Tooltip
            color={'blue'}
            title="由于接口获取不到所有数据条数，分页器只会显示加载条数"
          >
            <div className={styles.loaded_counts}>
              已加载 {total} 条搜索结果
            </div>
          </Tooltip>

          <div ref={warpRef} className={styles.warp}>
            <List
              loading={!queryLoaded}
              pagination={{
                total:
                  resultList.length === 19 && curPage === maxPage
                    ? total
                    : total + 1,
                align: 'center',
                current: curPage,
                pageSize: 20,
                showSizeChanger: false,
                onChange: page => {
                  onPageChange(page)
                  warpRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                },
              }}
              dataSource={resultList}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => {
                    onItemClick(item)
                  }}
                  className={styles.item}
                >
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
