import { memo } from 'react'
import './index.less'

function SearchGroup({ ...props }) {
    const { mode, onSearch } = props
    const searchParam = {
        mode: mode.filter(modeItem => modeItem.default)[0]?.value || mode[0]?.value || 'none',
        keyword: ''
    }

    const onSelectChange = e => {
        searchParam.mode = +e.target.value
    }
    const onInputChange = e => {
        searchParam.keyword = e.target.value.trim?.()
    }
    const onTapSearch = () => {
        onSearch?.(searchParam)
    }
    const onInputKeyPress = e => {
        if (e.key === 'Enter') {
            e?.target?.blur()
            onTapSearch()
        }
    }

    return (
        <div className='search-bar'>
            <select onChange={onSelectChange}>{
                mode.map(modeItem =>
                    <option value={modeItem.value} selected={modeItem.default}>{modeItem.title}</option>
                )
            }</select>
            <input type="text" placeholder='请输入关键词' onChange={onInputChange} onKeyPress={onInputKeyPress} />
            <button onClick={onTapSearch}>搜索</button>
        </div>
    )
}

export default memo(SearchGroup)