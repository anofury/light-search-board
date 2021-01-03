import { memo, useState, useEffect } from 'react'
import './index.less'

function DataBlock({ ...props }) {
    let { loading, data, pageSizeSelect } = props
    let flag = false

    const [pageSize, setPageSize] = useState(props.pageSize || 10)
    const [page, setPage] = useState(1)

    const getPageCount = () => Math.ceil(data.length / pageSize)
    const onChangePage = cPage => {
        if (!data.length) return
        const pageCount = getPageCount()
        if (cPage < 1) cPage = 1
        if (cPage > pageCount) cPage = pageCount
        setPage(cPage)
    }
    const onPageSizeChange = e => {
        flag = false
        setPageSize(+e.target.value)
    }

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
                    loading ? <p className='data-tip'>加载中...</p>
                        : !data.length ? <p className='data-tip'>暂无数据</p>
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
                !loading ? <div className='data-pagination'>
                    <p className='pagination-count'>共 <span>{data.length}</span> 条</p>
                    <div className='pagination-action'>
                        <button onClick={onChangePage.bind(this, page - 1)} disabled={page === 1}>‹</button>
                        {
                            Array.apply(null, Array(getPageCount())).map(e => 1).map((item, idx) => {
                                const cPage = idx + 1
                                // TODO 指示器
                                // if (getPageCount() > 8 && idx >= ~~(getPageCount() / 2) - 4 && idx <= getPageCount() - 3) {
                                //     if (!flag) {
                                //         flag = true
                                //         return <button key={cPage}>..</button>
                                //     }
                                // } else {
                                    return <button className={page === cPage ? 'current' : ''}
                                        onClick={onChangePage.bind(this, cPage)} key={cPage}
                                    >{cPage}</button>
                                // }
                            })
                        }
                        <button onClick={onChangePage.bind(this, page + 1)} disabled={page === getPageCount()}>›</button>
                        <select onChange={onPageSizeChange}>{
                            pageSizeSelect.map(pageSizeItem =>
                                <option value={pageSizeItem}>{pageSizeItem}条/页</option>
                            )
                        }
                        </select>
                    </div>
                </div> : null
            }
        </div>
    )
}

export default memo(DataBlock)