export const SEARCH_API = 'https://sec.anquanxiaozhan.com/search/'
export const APPLY_API = 'https://sec.anquanxiaozhan.com/apply/'

// 搜索模式
export const SEARCH_MODE = [
    {
        title: '按标题',
        value: 1,
        default: true
    },
    {
        title: '按作者',
        value: 2
    },
]

// 页码指示器
export const PAGE_SIZE_MAP = [10, 20, 40, 60, 100]
export const DEFAULT_PAGE_SIZE = 10