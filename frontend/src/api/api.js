const APIURLS = {
    TV: '/api/tvs/',
}

export async function getTvs() {

    return fetch(APIURLS.TV)
        .then( response => {
            if(!response.ok) {
                if ( response.status >= 400 && response.status < 500 ) {
                    return response.json()
                        .then(data => {
                            let err = {errorMessage: data.message};
                            throw err;
                        })
                } else {
                    let err = {errorMessage: 'please try again later, server is not responding'};
                    throw err;
                }
            }
            return response.json();
        })

}

export async function createTv(tv) {

    return fetch(APIURLS.TV, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(tv)
        })
            .then( response => {
                if(!response.ok) {
                    if ( response.status >= 400 && response.status < 500 ) {
                        return response.json()
                            .then(data => {
                                let err = {errorMessage: data.message};
                                throw err;
                            })
                    } else {
                        let err = {errorMessage: 'please try again later, server is not responding'};
                        throw err;
                    }
                }
                return response.json();
            })

}

export async function getTv(id) {

    return fetch(`${APIURLS.TV}${id}`)
        .then( response => {
            if(!response.ok) {
                if ( response.status >= 400 && response.status < 500 ) {
                    return response.json()
                        .then(data => {
                            let err = {errorMessage: data.message};
                            throw err;
                        })
                } else {
                    let err = {errorMessage: 'please try again later, server is not responding'};
                    throw err;
                }
            }
            return response.json();
        })
}

export async function removeTv(id) {

    const deleteURL = `${APIURLS.TV}${id}`;

    return fetch(deleteURL, {
        method: 'DELETE'
    })
        .then( response => {
            if(!response.ok) {
                if ( response.status >= 400 && response.status < 500 ) {
                    return response.json()
                            .then(data => {
                                let err = {errorMessage: data.message};
                                throw err;
                            })
                } else {
                    let err = {errorMessage: 'please try again later, server is not responding'};
                    throw err;
                }
            }
            return;
        })
}
