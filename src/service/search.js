import OKFetch from './fetch'
import { SEARCH_API } from '../config'
import getTestData from './__mock__'

export default function getSearchList(url, param) {
    if (!url) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getTestData())
            }, 2000)
        })
    }
    return OKFetch.post(url || SEARCH_API, param)
}