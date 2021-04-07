const getTestData = () => {
    const singleData = index => {
        return {
            articleUrl: 'https://www.baidu.com/',
            articleName: '测试标题' + index,
            articleAuthor: 'anofury',
            articleTime: '2099-12-31'
        }
    }

    const randomLen = Math.floor(Math.random() * 100)

    return {
        code: 0,
        data: Array.apply(null, Array(randomLen)).map((val, idx) => singleData(idx))
    }
}

export default getTestData