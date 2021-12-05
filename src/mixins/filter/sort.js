var Sort = (function () {
    function Sort() {
        this.sortKeys = [];
        this.key = null;
        this.order = null;
        this.options = null
    };

    Sort.prototype.setSortOptions = function(option=null) {
        if(typeof option === 'object') {
            this.options = option;
        }
        return true;
    };

    Sort.prototype.setterSortKeys = function(keys) {
        if(!Array.isArray(keys)) {
            return;
        }
        keys.forEach(sort => {
            if(sort.hasOwnProperty('value') && sort.hasOwnProperty('label')) {
                this.sortKeys.push(sort);
            }
        })
        if(keys.length > 0 && !this.key) {
            this.key = keys[0].value;
            this.order = 'desc'
        }
        let returnObj = {};
        if(this.key != null && this.order != null) {
            returnObj = {
                key: this.key,
                order: this.order,
                option: null,
            };

            if(this.options.hasOwnProperty(this.key)) {
                returnObj.option = this.options[this.key];
            }
        }
        return returnObj
    };
    Sort.prototype.getterSortKeys = function() {
        return this.sortKeys;
    },
    Sort.prototype.sortValidator = function(key=null, order=null) { //filterSet의 page validator
        if(!key || !order) {
            return false;
        }
        return true;
    };
    Sort.prototype.setterSort = function(key, order) {
        if(this.sortValidator(key, order)) {
            this.key = key;
            this.order = order;
        }
        let returnObj = {};
        if(this.key != null && this.order != null) {
            returnObj = {
                key: this.key,
                order: this.order,
                option: null,
            };

            if(this.options.hasOwnProperty(this.key)) {
                returnObj.option = this.options[this.key];
            }else if(this.options.hasOwnProperty('keyName') || this.options.hasOwnProperty('orderName')) {
                returnObj.option = this.options;
            }
        }
        return returnObj
    };
    Sort.prototype.getterSort = function () {
        return {
            key: this.key,
            order: this.order,
        };
    };
    return Sort;
})();

export default Sort;
