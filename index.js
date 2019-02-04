'use strict';


const tokenUri = "https://bitbucket.org/site/oauth2/authorize?client_id=cU69vfSTaLgFz4SXAd&response_type=token";
const getPRfromPrivateRepositoryUri = "https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests";
const currentUrl = window.location.href;


function getToken() {
    fetch(tokenUri)
        .then(response => {
            window.location.assign(response.url)
        })
}

function saveTokeninLocalStorage(token) {
    localStorage.setItem('token', token);
}


if (currentUrl.includes("access_token")) {
    let urlParams = new URLSearchParams(window.location.hash.substring(1));
    let accessToken = urlParams.get('access_token');
    saveTokeninLocalStorage(accessToken);
    getPullRequest();
} else {
    getToken();
}


function getPullRequest() {

    const tokenFromLS = localStorage.getItem('token');
    const headerAuthorization = "Bearer " + tokenFromLS;

    fetch(getPRfromPrivateRepositoryUri, {
        "headers": {
            Authorization: headerAuthorization
        }
    })
        .then(response => {
            console.log('response', response)
            console.log('pr in private repository', response.url)
        })
}




