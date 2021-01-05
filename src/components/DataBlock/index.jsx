import { memo, useState, useEffect } from 'react'
import './index.less'

const PAGE_BLOCK = 10
const PAGE_INDENT = 5

function DataBlock({ ...props }) {
    let { loading, data, pageSizeSelect } = props

    const [pageSize, setPageSize] = useState(props.pageSize || 10)
    const [page, setPage] = useState(1)

    const getTotalPage = () => Math.ceil(data.length / pageSize)
    const getPageShowList = () => {
        const totalPage = getTotalPage()
        let pageConfig = []

        if (totalPage <= PAGE_BLOCK) {
            pageConfig = Array.from({ length: totalPage }).map((_, idx) => idx + 1)
        } else if (page + PAGE_INDENT >= totalPage) {
            pageConfig = [1, '...'].concat(Array.from({ length: PAGE_BLOCK - 2 }).map((_, idx) => idx + totalPage - PAGE_BLOCK + 3))
        } else if (page - PAGE_INDENT <= 1) {
            pageConfig = Array.from({ length: PAGE_BLOCK - 2 }).map((_, idx) => idx + 1).concat(['...', totalPage])
        } else {
            pageConfig = [...[1, '...'], ...Array.from({ length: PAGE_BLOCK - 4 }).map((_, i) => i + page - 2), ...['...', totalPage]]
        }

        return pageConfig
    }
    const onChangePage = cPage => {
        if (!data.length) return
        const totalPage = getTotalPage()
        if (cPage < 1) cPage = 1
        if (cPage > totalPage) cPage = totalPage
        setPage(cPage)
    }
    const onPageSizeChange = e => {
        setPageSize(+e.target.value)
    }

    useEffect(() => {
        if (loading) {
            setPage(1)
        }
    }, [loading])

    useEffect(() => {
        onChangePage(page)
    }, [pageSize])

    return (
        <div className='data-block'>
            <div className='data-header'>
                <span>标题</span>
                <span>作者</span>
                <span>日期</span>
            </div>
            <div className='data-body'>
                {
                    loading ? <div class="data-tip loading-spinner">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div> : !data.length ? <p className='data-tip'>暂无数据</p>
                            : data.slice(pageSize * (page - 1), pageSize * page).map(item =>
                                <div className='data-line' key={item.articleName}>
                                    <span><a href={item.articleUrl} target='_blank'>{item.articleName}</a></span>
                                    <span>{item.articleAuthor}</span>
                                    <span>{item.articleTime}</span>
                                </div>
                            )
                }
            </div>
            {
                <div className='data-pagination'>
                    <p className='pagination-count'>共 <span>{!loading ? data.length : 0}</span> 条</p>
                    <div className='pagination-action'>
                        <button onClick={onChangePage.bind(this, page - 1)} disabled={page === 1}>‹</button>
                        {
                            !loading ? getPageShowList().map(showItem =>
                                isNaN(+showItem) ? <button disabled>{showItem}</button>
                                    : <button className={page === showItem ? 'current' : ''}
                                        onClick={onChangePage.bind(this, showItem)}
                                    >{showItem}</button>
                            ) : null
                        }
                        <button onClick={onChangePage.bind(this, page + 1)} disabled={page === getTotalPage()}>›</button>
                        <select onChange={onPageSizeChange}>{
                            pageSizeSelect.map(pageSizeItem =>
                                <option value={pageSizeItem} selected={pageSizeItem === pageSize}>{pageSizeItem}条/页</option>
                            )
                        }
                        </select>
                    </div>
                </div>
            }
        </div>
    )
}

export default memo(DataBlock)