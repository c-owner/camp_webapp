let Api = class {
    constructor(options) {
        this.url = options.url;
        this.defaultParams = options.defaultParams;
    }

    getList(filterSet) {
        let params = this.makeParams(filterSet);

        try {
            return this.url(params).then(res => res.Data.Result).then(res => {
                let list = [];
                if(res.hasOwnProperty('List')) {
                    list = res.List;
                }
                let total = 0;
                if(res.hasOwnProperty('Page')) {
                    total = res.Page.total;
                }
                return {
                    list: list,
                    total: total
                }

            })
        }catch (e) {
            console.log(e);
        }
    }
    makeParams(filterSet) {
        let returnParams = JSON.parse(JSON.stringify(this.defaultParams));
        let filterList = Object.values(filterSet.filter);
        filterList.forEach(obj => {
            /*if(obj.hasOwnProperty('query')) {
                returnParams[obj.key] = obj.query;
            }else if(obj.hasOwnProperty('value')) {
                returnParams[obj.key] = obj.value;
            }else if(obj.hasOwnProperty('start') && obj.hasOwnProperty('end')) {
                returnParams[obj.key+'sd'] = obj.start;
                returnParams[obj.key+'ed'] = obj.end;
            }*/
            returnParams = this.setFilterParamValue(returnParams, obj);
        });
        if(filterSet.sort.hasOwnProperty('key') && filterSet.sort.hasOwnProperty('order')) {
            if(filterSet.sort.option.hasOwnProperty('keyName')) {
                returnParams[filterSet.sort.option.keyName] = filterSet.sort.key
            }else{
                returnParams.orderByType = filterSet.sort.key;
            }

            if(filterSet.sort.option.hasOwnProperty('orderName')) {
                returnParams[filterSet.sort.option.orderName] = filterSet.sort.order
            }else{
                returnParams.orderBySort = filterSet.sort.order;
            }


        }
        if(filterSet.page.hasOwnProperty('page')) {
            returnParams.page = filterSet.page.page;
        }
        if(filterSet.page.hasOwnProperty('size')) {
            returnParams.sp = filterSet.page.size;
        }
        return returnParams;
    };

    setFilterParamValue(params, obj) {
        if(obj.hasOwnProperty('query')) {
            params[obj.key] = obj.query;
        }else if(obj.hasOwnProperty('value')) {
            if(!obj.option || !obj.option[obj.value]) {
                params[obj.key] = obj.value;
            }else{
                params = Object.assign({}, params, obj.option[obj.value]);
            }


        }else if(obj.hasOwnProperty('start') && obj.hasOwnProperty('end')) {
            if(!obj.option.start && obj.start != "") {
                params[obj.key+'sd'] = obj.start;
            }else if(obj.start != ''){
                params[obj.option.start] = obj.start;
            }
            if(!obj.option.end && obj.end != "") {
                params[obj.key+'ed'] = obj.end;
            }else if(obj.end != ''){
                params[obj.option.end] = obj.end;
            }
        }else if(obj.hasOwnProperty('terms')) {
            let keyName = "";
            if(!obj.option.keyName && obj.option.keyName != undefined) {
                keyName = obj.option.keyName;
            }else{
                keyName = obj.key;
            }
            params[keyName] = [];
            for (let i = 0; i<obj.terms.length; i++) {
                if(!obj.option || !obj.option[obj.terms[i]]) {
                    params[keyName].push(obj.terms[i])
                }else{
                    if(params[keyName].length === 0) {
                        params[keyName] = obj.option[obj.terms[i]].slice();
                    }else{
                        params[keyName] = params[keyName].concat(obj.option[obj.terms[i]]);
                    }

                }
            }
        }
        return params;
    };
}

export default Api;
