import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchGroup from '@comp/SearchGroup'
import DataBlock from '@comp/DataBlock'
import ApplyButton from '@comp/ApplyButton'
import ApplyForm from '@comp/ApplyForm'
import { SEARCH_MODE, PAGE_SIZE_MAP, DEFAULT_PAGE_SIZE } from '../config'
import getSearchList from '../service/search'
import submitApply from '../service/apply'
import './index.less'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: []
        }
        this.applying = false
        window.pageShow?.()
    }

    onTapSearch = searchParam => {
        if (this.state.loading) return
        this.setState({
            loading: true,
        })
        getSearchList('', {
            param1: searchParam.mode,
            param2: searchParam.keyword
        }).then(resp => {
            let data = resp.data
            if (!Array.isArray(data)) {
                data.length = Object.keys(data).length
                data = [].slice.call(data)
            }
            this.setState({
                loading: false,
                data: data
            })
        }).catch(err => {
            this.setState({
                loading: false,
            })
            console.log(err)
        })
    }

    onTapApply = applyParam => {
        if (this.applying) return

        ApplyForm.setTips('提交中..')
        ApplyForm.setApplying(this.applying = true)

        submitApply('', {
            param1: applyParam.url,
            param2: applyParam.email
        }).then(resp => {
            if (!resp.code) {
                ApplyForm.setTips('提交成功')
            }
            ApplyForm.setApplying(this.applying = false)
        }).catch(err => {
            ApplyForm.setApplying(this.applying = false)
            console.log(err)
        })
    }

    componentDidMount() {
        this.onTapSearch({ mode: 1, keyword: '' })
    }

    render() {
        const { loading, data } = this.state
        return (
            <div className='bingo-search'>
                <div className='search-logo'>
                    <a href="https://unbug.github.io/codelf/">
                        <img src="./static/logo.png" alt="logo" />
                    </a>
                </div>
                <SearchGroup loading={loading} onSearch={this.onTapSearch} mode={SEARCH_MODE} />
                <DataBlock loading={loading} data={data} pageSizeSelect={PAGE_SIZE_MAP} pageSize={DEFAULT_PAGE_SIZE} />
                <ApplyButton onApply={this.onTapApply} />
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('content'))