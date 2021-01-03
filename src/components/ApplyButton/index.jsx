import { memo } from 'react'
import ApplyForm from '../ApplyForm'
import './index.less'

function ApplyButton({ ...props }) {
    const onTapPopApply = () => {
        ApplyForm.show(data => {
            data && props.onApply?.(data)
        })
    }

    return (
        <div className='apply-button' onClick={onTapPopApply}></div>
    )
}

export default memo(ApplyButton)