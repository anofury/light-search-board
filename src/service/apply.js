import OKFetch from './fetch'
import { APPLY_API } from '../config'

export default function submitApply(url, param) {
    if (!url) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ code: 0, msg: 'success' })
            }, 2000)
        })
    }
    return OKFetch.post(url || APPLY_API, param)
}