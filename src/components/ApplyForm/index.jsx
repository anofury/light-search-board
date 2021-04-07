import React, { Component } from 'react'
import './index.less'

class ApplyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mount: false,
            applying: false,
            errorString: '',
            tips: ''
        }
        this.urlInput = React.createRef()
        this.emailInput = React.createRef()
    }

    show = cb => {
        this.setState({ mount: true })
        this.cb = cb
    }

    setTips = tips => {
        this.setState({ tips })
    }

    setApplying = applying => {
        this.setState({ applying })
    }

    _close = e => {
        this.setState({ mount: false, errorString: '', tips: '' })
    }

    _onTapSubmit = () => {
        this.setState({ errorString: '', tips: '' })
        const errorInput = []
        const [urlInput, emailInput] = [this.urlInput.current, this.emailInput.current]
        if (!urlInput?.value.trim()) {
            errorInput.push('url')
        }
        if (!emailInput?.value.trim()) {
            errorInput.push('email')
        }
        if (errorInput.length) {
            this.setState({ errorString: errorInput.join(','), tips: '提交内容不能为空' })
        } else {
            this?.cb?.({
                url: urlInput.value,
                email: emailInput.value
            })
        }
    }


    render() {
        const { mount, applying, errorString, tips } = this.state
        return (
            mount &&
            <div className='form-container'>
                <div className='form-wrapper'>
                    <div className='input-group'>
                        <label htmlFor='url'>提交 url</label>
                        <input type='text' id='url' autoComplete='off' ref={this.urlInput}
                            className={errorString.indexOf('url') !== -1 ? 'error' : ''}
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='email'>联系邮箱</label>
                        <input type='email' id='email' autoComplete='off' ref={this.emailInput}
                            className={errorString.indexOf('email') !== -1 ? 'error' : ''}
                        />
                    </div>
                    <div className='action-group'>
                        <span>{tips}</span>
                        <button className='form-cancel' onClick={this._close} disabled={applying}>关闭</button>
                        <button className='form-submit' onClick={this._onTapSubmit} disabled={applying}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
}

const div = document.createElement('div')
div.setAttribute('id', 'applyForm')
document.querySelector('#dialog').appendChild(div)
export default ReactDOM.render(<ApplyForm />, div)