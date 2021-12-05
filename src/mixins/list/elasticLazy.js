import {search, getTotal, init, limitCount} from "@/plugins/elasticsearch";

class ElasticLazy {
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

        this.beforePage = 1;
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

    getList(filterSet) {
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
        let body = this.makeBody(filterSet);

        return this.getTotal(body).then(totalRes => {
            let total = totalRes;
            return search(body).then(resp => {
                let list = new Array();
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

        if(body.size + body.from > limitCount && this.searchAfterSort.length > 0) {
            body.search_after = this.searchAfterSort;
            delete body.from;
        }else if(body.size + body.from > limitCount && page.page !== this.beforePage + 1) {
            body.from  = 0;
        }

        return body;
        /*return new Promise(resolve => {
            body.from = (Number(page.page) - 1) * page.size;
            body.size = page.size;


            if(body.size + body.from  > limitCount) {
                if(this.searchAfterSort.length === 0) {
                    let getBody = JSON.parse(JSON.stringify(body));
                    getBody.from = limitCount - 1;
                    getBody.size = 1;

                    search(getBody).then(resp => {

                        if(resp.hasOwnProperty('hits') && resp.hits.hits.length > 0) {

                            let list = resp.hits.hits;
                            let data = resp.hits.hits[list.length - 1];

                            getBody.search_after = data.sort;
                            delete getBody.from;
                            getBody.size = body.size + body.from - limitCount;

                            search(getBody).then(resp2 => {

                                if(resp2.hasOwnProperty('hits') && resp2.hits.hits.length > 0) {
                                    let list2 = resp2.hits.hits;
                                    let data2 = resp2.hits.hits[list2.length - 1];

                                    this.searchAfterSort = data2.sort;

                                    body.search_after = this.searchAfterSort;
                                    delete body.from;
                                    resolve(body);
                                }else{

                                    body.from = 0;
                                    body.size = page.size;

                                    resolve(body);

                                }
                            })
                        }else{

                            body.from = 0;
                            body.size = page.size;
                            resolve(body);

                        }
                    })

                }else{
                    body.search_after = this.searchAfterSort;
                    delete body.from;

                    resolve(body)
                }
            }else{
                resolve(body);
            }
        })*/
    }


}

export default ElasticLazy;
