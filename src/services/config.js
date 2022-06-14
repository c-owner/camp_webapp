let isDev = true; // true : dev, false; prod

let config = {
    dev: {
        apiDomain: "http://ec2-52-79-82-151.ap-northeast-2.compute.amazonaws.com",
        serverDomain: "https://front-campfire-web.vercel.app",
    },
    prod: {
        apiDomain: "http://ec2-52-79-82-151.ap-northeast-2.compute.amazonaws.com",
        serverDomain: "https://front-campfire-web.vercel.app/",
    },
}

function getConfig(key = 'apiDomain') {
    return isDev ? config.dev[key] : config.prod[key];
}

let apiDomain = getConfig('apiDomain')
let apiURL = `${getConfig('apiDomain')}/api/`;


export {apiURL, apiDomain};
