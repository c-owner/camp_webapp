var VuexParser = (function() {
    function VuexParser() {
        this.filterSet = {
            filter:{},
            page: {
                page: 0,
                size: 0,
            },
            sort: {},
        }
        VuexParser.prototype.parsingFilter = (filterSet) => {
            if(filterSet.hasOwnProperty('filter')) {
                // filterSet['filter'] = this.filterSet.filter;
                this.filterSet.filter = filterSet.filter;
            }
            if(filterSet.hasOwnProperty('page')) {
                this.filterSet.page = filterSet.page;
            }
            if(filterSet.hasOwnProperty('sort')){
                this.filterSet.sort = filterSet.sort;
            }
            return filterSet;
        }
        VuexParser.prototype.getMakeSaveFilter = (filterSet) => {
            let filterClass = Object.keys(filterSet.filter);
            filterClass.forEach(classname => {
                let filterObj = filterSet.filter[classname]
                if(filterObj.hasOwnProperty('value')) {
                    // url += `${filterObj.key}=${filterObj.value}&`
                    this.filterSet.filter[filterObj.key] = filterObj.value;
                }else if(filterObj.hasOwnProperty('query')) {
                    this.filterSet.filter[filterObj.key] = filterObj.query;
                }else if(filterObj.hasOwnProperty('start') && filterObj.hasOwnProperty('end')) {
                    // url += `${filterObj.key}=${filterObj.start}^${filterObj.end}&`;
                    this.filterSet.filter[filterObj.key] = `${filterObj.start}^${filterObj.end}`;
                }else if(filterObj.hasOwnProperty('terms')) {
                    this.filterSet.filter[filterObj.key] = filterObj.terms;
                }else if(filterObj.hasOwnProperty('lat') && filterObj.hasOwnProperty('lon')) {
                    this.filterSet.filter[filterObj.key] = [filterObj.lat, filterObj.lon];
                }
            });
            if(filterSet.sort.hasOwnProperty('key') && filterSet.sort.hasOwnProperty('order')) {
                this.filterSet.sort = {key: filterSet.sort.key, order: filterSet.sort.order}
            }
            this.filterSet.page.page = filterSet.page.page;
            this.filterSet.page.size = filterSet.page.size;
            return this.filterSet;
        }
        VuexParser.prototype.setterFilterSet = (obj) => {

        }
        VuexParser.prototype.getterFilterSet = () => {
            return this.filterSet;
        }
    }
    return VuexParser;
})();
export default VuexParser;
