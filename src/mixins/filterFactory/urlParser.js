var UrlParser = (function() {
    function UrlParser() {
        this.filterSet = {
            filter:{},
            page: {
                page: 1,
                size: 0,
            },
            sort: {},
        }
        UrlParser.prototype.parsingFilter = (url) => {
            function QueryStringToJSON(str) {
                var pairs = str.split('&');
                var result = {
                    filter: {},
                    page: {
                        page: 1,
                        size: 0,
                    },
                    sort: {},
                };
                pairs.forEach(function (pair) {
                    pair = pair.split('=');
                    var name = pair[0]
                    var value = pair[1]
                    if(name === 'page') {
                        result.page.page = decodeURIComponent(value);
                    }else if(name === 'size') {
                        result.page.size = decodeURIComponent(value);
                    }else if(name === 'sort') {
                        result.sort.key = decodeURIComponent(value);
                    }else if(name === 'order') {
                        result.sort.order = decodeURIComponent(value);
                    }else{
                        result.filter[name] = decodeURIComponent(value);
                    }
                });
                return result;
            }
            var splitIndex = url.indexOf('?');
            if(splitIndex < 0) {
                return;
            }
            var urlQueryString = url.substr(splitIndex+1, url.length);
            let obj = QueryStringToJSON(urlQueryString);
            this.setterFilterSet(obj)
            return;
        };
        UrlParser.prototype.getMakeSaveFilter = (filterSet) => {
            let url = '?';
            let filterClass = Object.keys(filterSet.filter);
            filterClass.forEach(classname => {
                let filterObj = filterSet.filter[classname]
                if(filterObj.hasOwnProperty('value')) {
                    url += `${filterObj.key}=${filterObj.value}&`
                }else if(filterObj.hasOwnProperty('query')) {
                    url += `${filterObj.key}=${filterObj.query}&`
                }else if(filterObj.hasOwnProperty('start') && filterObj.hasOwnProperty('end')) {
                    url += `${filterObj.key}=${filterObj.start}^${filterObj.end}&`;
                }else if(filterObj.hasOwnProperty('terms')) {
                    let terms = `${filterObj.terms.join(',')}&`;
                    url += `${filterObj.key}=${terms}`;
                }else if(filterObj.hasOwnProperty('lat') && filterObj.hasOwnProperty('lon')) {
                    url += `${filterObj.key}=${filterObj.lat}^${filterObj.lon}&`;
                }
            });
            if(filterSet.sort.hasOwnProperty('key') && filterSet.sort.hasOwnProperty('order')) {
                url += `sort=${filterSet.sort.key}&order=${filterSet.sort.order}&`;
            }
            url += `page=${filterSet.page.page}&size=${filterSet.page.size}&`;
            var urlQueryRegx = /\&$/;
            if(urlQueryRegx.test(url)) {
                url = url.substr(0, url.length -1);
            }
            return url;
        };
        UrlParser.prototype.setterFilterSet = (obj) => {
            this.filterSet = obj;
        };
        UrlParser.prototype.getterFilterSet = () => {
            return this.filterSet
        };
    }
    return UrlParser;
})();
export default UrlParser;
