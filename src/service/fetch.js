class OKFetchFunction {
    get(url, param) {
        const bodyParam = Object.assign({}, param)

        return new Promise((reslove, reject) => {
            fetch(`${url}?${Object.keys(bodyParam).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(bodyParam[key])).join('&')}`).then(resp => resp.json())
                .then(resp => {
                    if (resp.code === 200) {
                        reslove(resp)
                    } else reject(resp)
                }).catch(err => { reject(err) })
        })
    }

    post(url, param) {
        const bodyParam = Object.assign({}, param)

        return new Promise((reslove, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: Object.keys(bodyParam).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(bodyParam[key])).join('&'),
                // mode: 'cors'
            }).then(resp => resp.json())
                .then(resp => {
                    if (resp.code === 200) {
                        reslove(resp)
                    } else reject(resp)
                }).catch(err => { reject(err) })
        })
    }
}

const OKFetch = new OKFetchFunction()
export default OKFetch