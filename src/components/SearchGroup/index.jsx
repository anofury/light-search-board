import { memo } from 'react'
import './index.less'
let omode = -1
let keyword = ''

function SearchGroup({ ...props }) {
    const { mode, loading, onSearch } = props

    const onSelectChange = e => {
        omode = +e.target.value
    }
    const onInputChange = e => {
        keyword = e.target.value.trim?.()
    }
    const onTapSearch = () => {
        onSearch?.({ mode: omode === -1 ? (mode.filter(modeItem => modeItem.default)[0]?.value || mode[0]?.value) : omode, keyword })
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
            <button onClick={onTapSearch} disabled={loading}>{loading ? '搜索中..' : '搜索'}</button>
        </div>
    )
}

export default memo(SearchGroup)