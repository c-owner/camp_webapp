let isDev = true; // true : dev, false; prod

let config = {
    dev: {
        apiDomain: "http://localhost:8080",
        serverDomain: "https://front-campfire-web.vercel.app",
    },
    prod: {
        apiDomain: "http://localhost:8080",
        serverDomain: "https://front-campfire-web.vercel.app/",
    },
}

function getConfig(key = 'apiDomain') {
    return isDev ? config.dev[key] : config.prod[key];
}

let apiDomain = getConfig('apiDomain')
let apiURL = `${getConfig('apiDomain')}/api/`;


export {apiURL, apiDomain};
