let isDev = true; // true : dev, false; prod

let config = {
    dev: {
        apiDomain: "http://electiondevapi.dgmonglab.com",
        searchElaUrl: '',
    },
    prod: {
        apiDomain: "http://electiondevapi.dgmonglab.com", // 실서버 작업되면 변경해주세요.
        searchElaUrl: '',
    },
}


   /*     bucketOption: {
            BucketName: 'election',
            BucketRegion: 'ap-northeast-2',
            BucketIdentityPoolId: 'ap-northeast-2:4388b7fd-c1b6-4e38-a0e8-17f42971043b',
        },*/
function getConfig(key='apiDomain') {
    return isDev ? config.dev[key] : config.prod[key];
}

function setConfig(key, value) {
    if(isDev) {
        config.dev[key] = value;
    }else{
        config.prod[key] = value;
    }
}

let apiDomain = getConfig('apiDomain')
let apiURL = `${getConfig('apiDomain')}/api/`;
let bucketOption = getConfig('bucketOption');
let searchElaUrl = getConfig('searchElaUrl')
function setterApiDomain(domain) {
    setConfig('apiDomain', domain);
    apiDomain = getConfig('apiDomain');
    apiURL = `${getConfig('apiDomain')}/api/`;
}



// export {apiURL,searchElaUrl, apiDomain, bucketOption, setterApiDomain,};
export {apiURL,searchElaUrl, apiDomain, setterApiDomain,};
