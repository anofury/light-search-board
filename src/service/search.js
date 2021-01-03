import OKFetch from './fetch'
import { SEARCH_API } from '../config'

export default function getSearchList(url, param) {
    return OKFetch.post(url || SEARCH_API, param)
}