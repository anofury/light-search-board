import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchGroup from '@comp/SearchGroup'
import DataBlock from '@comp/DataBlock'
import ApplyButton from '@comp/ApplyButton'
import ApplyForm from '@comp/ApplyForm'
import { SEARCH_MODE } from '../config'
import getSearchList from '../service/search'
import submitApply from '../service/apply'
import './index.less'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            applying: false,
            data: []
        }
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
            console.log(resp)
            let data = resp.data
            if (!Array.isArray(data)) {
                data.length = Object.keys(data).length
                data = [].slice.call(data)
            }
            this.setState({
                loading: false,
                data: [...data/*, ...data*/]
            })
        }).catch(err => {
            this.setState({
                loading: false,
            })
            console.log(err)
        })
    }

    onTapApply = applyParam => {
        if (this.state.applying) return
        this.setState({
            applying: true,
        })
        submitApply('', {
            param1: applyParam.url,
            param2: applyParam.email
        }).then(resp => {
            console.log(resp)
            if (resp.msg) {
                ApplyForm.setTips(resp.msg)
            }
            this.setState({
                applying: false,
            })
        }).catch(err => {
            this.setState({
                applying: false,
            })
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
                <SearchGroup onSearch={this.onTapSearch} mode={SEARCH_MODE} />
                <DataBlock loading={loading} data={data} pageSizeSelect={[10, 20, 40, 60, 100]} pageSize={10} />
                <ApplyButton onApply={this.onTapApply} />
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('content'))