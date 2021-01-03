import OKFetch from './fetch'
import { APPLY_API } from '../config'

export default function submitApply(url, param) {
    return OKFetch.post(url || APPLY_API, param)
}