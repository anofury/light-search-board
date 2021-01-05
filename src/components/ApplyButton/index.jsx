import { memo, useState } from 'react'
import ApplyForm from '../ApplyForm'
import './index.less'
const startPoint = {
    clientX: -1,
    clientY: -1
}

function ApplyButton({ ...props }) {
    const [translateX, setTranslateX] = useState(0)
    const [translateY, setTranslateY] = useState(0)
    const onTapPopApply = () => {
        ApplyForm.show(data => {
            data && props.onApply?.(data)
        })
    }
    const onTouchStart = e => {
        let point = e.touches[0]

        startPoint.clientX = point.clientX
        startPoint.clientY = point.clientY
    }
    const onTouchMove = e => {
        if (!startPoint.clientX === -1) return
        let point = e.touches[0]
        setTranslateX(translateX + point.clientX - startPoint.clientX)
        setTranslateY(translateY + point.clientY - startPoint.clientY)
        startPoint.clientX = point.clientX
        startPoint.clientY = point.clientY
    }
    const onTouchEnd = e => {
        startPoint.clientX = -1
        startPoint.clientY = -1
    }

    return (
        <div className='apply-button' onClick={onTapPopApply} style={{ transform: `translate(${translateX}px, ${translateY}px)` }}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}
        ></div>
    )
}

export default memo(ApplyButton)