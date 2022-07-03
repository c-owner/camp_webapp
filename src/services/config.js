let isDev = true; // true : dev, false; prod

let config = {
    dev: {
        api: 'http://develop-corner.com'
    },
    prod: {
        api: 'http://develop-corner.com'
    },
}

function getConfig(key = 'api') {
    return isDev ? config.dev[key] : config.prod[key];
}

let apiUrl = getConfig('api') + '/api/';


export {apiUrl, getConfig};
