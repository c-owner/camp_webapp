import {search, getTotal, init, scroll, newScroll, limitCount} from "@/plugins/elasticsearch";

class Elastic {
    constructor(options) {
        this.index = options.index;
        this.type = options.type;

        init(this.index, this.type);

        if(options.hasOwnProperty('defaultBody') && options.defaultBody) {
            this.defaultBody = options.defaultBody;
        }else{
            this.defaultBody = {
                query: { bool: { must: [] } }
            };
        }

        this.searchAfterSort = [];

        this.list = [];
        this.total = 0;
        this.first = true;


        this.interval = null;
    }

    getTotal(body) {
        let totalBody = this._makeTotalBody(body);
        return getTotal(totalBody).then(res => {
            this.total = res.count;
            return res.count;
        });
    }

    _makeTotalBody(body) {
        let totalBody = JSON.parse(JSON.stringify(body));
        if(totalBody.hasOwnProperty('from')) {
            delete totalBody.from
        }
        if(totalBody.hasOwnProperty('sort')) {
            delete totalBody.sort
        }
        if(totalBody.hasOwnProperty('size')) {
            delete totalBody.size
        }
        if(totalBody.hasOwnProperty('search_after')) {
            delete totalBody.search_after
        }

        return totalBody;
    }

    getList(filterSet, isInitPage=false) {
        /*return this.makeBody(filterSet).then(body => {
            return this.getTotal(body).then(totalRes => {
                let total = totalRes;
                return search(body).then(resp => {
                    let list = [];
                    if(resp.hasOwnProperty('hits')) {
                        resp.hits.hits.forEach((data, index) => {
                            data._source._id = data._id;
                            list.push(data._source);
                            if(resp.hits.hits.length === index + 1) {
                                this.searchAfterSort = data.sort;
                            }
                        });
                        this.beforePage = filterSet.page;
                    }
                    return {
                        list: list,
                        total: total,
                    }
                })

            })
        });*/


        /*return new Promise(resolve => {
            if(isInitPage) {
                this.list = [];
                this.total = 0;
                this.searchAfterSort = [];
            }

            let body = this.makeBody(filterSet);
            if(this.first) { //처음 부를때

                this.runSearch(body, body.from + body.size, resolve);
                this.first = false;

            }else if(this.list.length === 0 && isInitPage) { //필터 혹은 sort 바뀔때

                this.runSearch(body, body.from + body.size, resolve);

            }else if(this.list.length === 0 && !isInitPage) { // 원래 목록이 없을때

                this.returnListData(body.from, body.size, resolve)

            }else if(body.from + body.size > this.list.length && !isInitPage && this.total > this.list.length) { //현재가지고 있는 목록이 요구하는 목록보다 적을때

                this.runSearch(body, body.from + body.size, resolve);

            }else{ //현재 가지고 있는 목록 내에서 요구할 때.
                this.returnListData(body.from, body.size, resolve)
            }
        })*/

        /*return new Promise(resolve => {
            if(isInitPage) {
                this.list = [];
                this.total = 0;
                this.searchAfterSort = [];
            }

            let body = this.makeBody(filterSet);
            if(this.first) { //처음 부를때

                this.getTotal(body).then(totalRes => {
                    let total = totalRes;
                    this.getScroll(body, total, null).then(resp => {
                        console.log(resp)


                        console.log(this.list);



                        this.returnListData(body.from, body.size, resolve)
                    })
                })
                this.first = false;

            }else if(this.list.length === 0 && isInitPage) { //필터 혹은 sort 바뀔때

                this.getTotal(body).then(totalRes => {
                    let total = totalRes;
                    this.getScroll(body, total, null).then(resp => {
                        console.log(resp)


                        console.log(this.list);



                        this.returnListData(body.from, body.size, resolve)
                    })
                })

            }else if(this.list.length === 0 && !isInitPage) { // 원래 목록이 없을때

                this.returnListData(body.from, body.size, resolve)

            }else{ //현재 가지고 있는 목록 내에서 요구할 때.
                this.returnListData(body.from, body.size, resolve)
            }
        })*/

        let body = this.makeBody(filterSet);

        return this.getTotal(body).then(totalRes => {
            let total = totalRes;

            return this.newScroll(body, total, null).then(resp => {

                return {
                    total: total,
                    list: [],
                }
            })
        })
    }

    newScroll(body) {
        let getBody = JSON.parse(JSON.stringify(body));
        delete getBody.from;
        delete getBody.size;

        return newScroll(getBody, 100).then(resp => {
            let scrollId = resp._scroll_id;
            getBody._scroll_id = scrollId
            return scroll(getBody).then(resp => {
                console.log(resp);
            })
        })
    }

    getScroll(body, total, id=null) {
        let getBody = JSON.parse(JSON.stringify(body));
        let scrollId = id;
        delete getBody.from;
        delete getBody.size;

        if(id != null) {
            getBody = {_scroll_id: scrollId};
        }

        return scroll(getBody, 10000).then(resp => {

            resp.hits.hits.forEach((data, index) => {
                data._source._id = data._id;
                this.list.push(data._source);
            });
            if(resp.hasOwnProperty('_scroll_id') && resp._scroll_id) {
                scrollId = resp._scroll_id;
            }

            if(this.list.length < resp.hits.total.value) {
                return this.getScroll(body, total, scrollId);
            }else{
                return true;
            }
        })
    }

    returnListData(from, size, resolve) {
        let resultData = {
            list: [],
            total: 0,
        };
        if(this.list.length > 0) {
            resultData.list = this.list.slice(from, from + size);
            resultData.total = this.total;
        }
        resolve(resultData);
    }

    runSearch(body, getTotal, resolve) {
        let getBody = JSON.parse(JSON.stringify(body));
        if(this.searchAfterSort.length === 0) {
            this.getTotal(getBody).then(totalRes => {
                getBody.from = 0;
                getBody.size = limitCount;
                this.total = totalRes;
                search(getBody).then(resp => {
                    let list = [];
                    if(resp.hasOwnProperty('hits')) {
                        resp.hits.hits.forEach((data, index) => {
                            data._source._id = data._id;
                            list.push(data._source);
                            if(resp.hits.hits.length === index + 1) {
                                this.searchAfterSort = data.sort;
                            }
                        });
                        this.list = list;
                        if(getTotal > this.list.length && this.list.length < this.total) {
                            this.runSearch(body, getTotal, resolve)
                        }else{
                            this.returnListData(body.from, body.size, resolve)
                        }
                    }else{
                        let resultData = {
                            list: [],
                            total: 0,
                        };
                        resolve(resultData);
                    }
                })
            })
        }else{
            getBody.size = limitCount;
            getBody.search_after = this.searchAfterSort;
            delete getBody.from;

            search(getBody).then(resp => {
                let list = [];
                if(resp.hasOwnProperty('hits')) {
                    resp.hits.hits.forEach((data, index) => {
                        data._source._id = data._id;
                        list.push(data._source);
                        if(resp.hits.hits.length === index + 1) {
                            this.searchAfterSort = data.sort;
                        }
                    });
                    this.list = this.list.concat(list);

                    if(getTotal > this.list.length && this.list.length < this.total) {
                        this.runSearch(body, getTotal, resolve)
                    }else{
                        this.returnListData(body.from, body.size, resolve)
                    }
                }else{
                    this.returnListData(body.from, body.size, resolve)
                }
            })
        }
    }

    makeBody(filterSet) {
        let body = JSON.parse(JSON.stringify(this.defaultBody));
        body = this.makeQuery(filterSet.filter, body);
        body = this.makeSort(filterSet.sort, body);
        /*return this.makePage(filterSet.page, body).then(body => {
            return body;
        });*/
        body = this.makePage(filterSet.page, body);
        return body;
    }

    _isEmptyObject(param) {
        return param.constructor === Object && Object.keys(param).length === 0;
    }

    makeQuery(filter, body) {

        let filterList = Object.values(filter);
        filterList.forEach(obj => {
            body.query.bool.must = this.makeFilter(body.query.bool.must, obj);
        });

        if(body.query.bool.must.length === 0) {
            body = {
                query: {match_all: {}}
            }
        }

        return body;
    }

    makeFilter(must, obj) {
        let field = obj.key;
        if(obj.option.hasOwnProperty('ela_dataField')) {
            field = obj.option.ela_dataField;
        }

        let filterObj = {};
        if(obj.hasOwnProperty('query')) {
            filterObj = this.makeQueryFilter(obj, field);
        }else if(obj.hasOwnProperty('start') && obj.hasOwnProperty('end')) {
            filterObj = this.makeBetweenFilter(obj, field);
        }else if(obj.hasOwnProperty('terms')) {
            filterObj = this.makeTermsFilter(obj, field);
        }else if(obj.hasOwnProperty('lat') && obj.hasOwnProperty('lon')) {
            filterObj = this.makeDistanceFilter(obj, field);
        }else{
            filterObj = this.makeMatchFilter(obj, field);
        }
        if(!this._isEmptyObject(filterObj)) {
            must.push(filterObj)
        }

        return must;
    }

    makeQueryFilter(obj, field) {
        let filterObj = {
            query_string: {
                query: `(*${obj.query}*) OR (${obj.query})`,
                fields: [field],
            }
        }
        if(Array.isArray(field)) {
            filterObj.query_string.fields = field;
        }
        return filterObj;
    }

    makeBetweenFilter(obj, field) {
        let filterObj = {
            range: {},
        }
        filterObj.range[field] = {};
        if(obj.hasOwnProperty('start') && obj.start != '') {
            filterObj.range[field].gte = obj.start;
        }
        if(obj.hasOwnProperty('end') && obj.end != '') {
            filterObj.range[field].lte = obj.end;
        }
        return filterObj;
    }

    makeTermsFilter(obj, field) {
        let filterObj = { terms: {} };
        filterObj.terms[field] = obj.terms;
        return filterObj;
    }

    makeDistanceFilter(obj, field) {
        let filterObj = {
            "geo_distance": {
                "distance": "10km",
            }
        };
        filterObj.geo_distance[field] = {
            "lat": obj.lat,
            "lon": obj.lon,
        };
        if(obj.option.hasOwnProperty('distance') && obj.option.distance) {
            filterObj.geo_distance.distance = obj.option.distance;
        }

        return filterObj;
    }

    makeMatchFilter(obj, field) {
        let filterObj = { match: {} };
        filterObj.match[field] = obj.value;
        return filterObj;
    }

    makeSort(sort, body) {
        body.sort = [];
        if(sort.hasOwnProperty('option') && Array.isArray(sort.option) && sort.option.length > 0) {
            body.sort = sort.option;

            if(sort.hasOwnProperty('order') && sort.order) {
                let fieldKey = Object.keys(body.sort[0])[0];
                if(fieldKey === '_geo_distance') {
                    body.sort[0][fieldKey].order = sort.order;
                }else{
                    body.sort[0][fieldKey] = sort.order;
                }
            }

        }else if(sort.hasOwnProperty('key') && sort.hasOwnProperty('order')) {
            body.sort[0] = {};
            body.sort[0][sort.key] = sort.order;
        }

        if(body.sort.length === 0) {
            body.sort[0] = {'created_at': 'desc'};
        }
        return body;
    }

    makePage(page, body) {
        body.from = (Number(page.page) - 1) * page.size;
        body.size = page.size;

        /*if(body.size + body.from > limitCount && this.searchAfterSort.length > 0) {
            body.search_after = this.searchAfterSort;
            delete body.from;
        }else if(body.size + body.from > limitCount && page.page !== this.beforePage + 1) {
            body.from  = 0;
        }*/

        return body;
    }


}

export default Elastic;
