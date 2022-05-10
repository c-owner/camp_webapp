import filterFactory from '@/mixins/filterFactory/filterFactory';

var Filter = (function () {
    function Filter() {
        this.filter = {};
        this.filterConfigs = {};
    };
    Filter.prototype.setterFilterConfigs = function (data={}) {
        let configKeys = Object.keys(data);
        configKeys.forEach(key => {
            let config = data[key];
            if(config.hasOwnProperty('type') && config.hasOwnProperty('classname')) {
                this.filterConfigs[key] = config;
            }
        })
    };
    Filter.prototype.getterFilterConfigs = function() {
        return this.filterConfigs;
    };
    Filter.prototype.checkHasFilterConfig = function (key) {
        if(this.filterConfigs.hasOwnProperty(key)) {
            return true;
        }
        return false;
    };
    Filter.prototype.filterValidator = function (key=null, type=null, classname=null) {
        if(!key || !type || !classname) {
            return false;
        }
        return true;
    };
    Filter.prototype.isEmptyValue = function(value=null, classname=null) {
        if((value === null || value === '')) {
            return true;
        }else if(Array.isArray(value) && value.length === 2 && (value[0] === '' || value[0] === null) && (value[1] === '' || value[1] === null)){
            return true;
        }else if(Array.isArray(value) && value.length === 0) {
            return true;
        }
        return false;
    };
    Filter.prototype.deleteFilterObj = function(classname) {
        delete this.filter[classname];
    };

    Filter.prototype._getClassname = function (key) {
        let classname = '';
        if(this.filterConfigs[key].classname) {
            classname = this.filterConfigs[key].classname;
        }
        return classname;
    };

    Filter.prototype._getType = function (key) {
        let type = '';
        if(this.filterConfigs[key].type) {
            type = this.filterConfigs[key].type;
        }
        return type;
    };

    Filter.prototype._getOption = function (key) {
        let option = {};
        if(this.filterConfigs[key].option) {
            option = this.filterConfigs[key].option;
        }
        return option;
    };

    Filter.prototype.setterFilter = function(key=null, value=null) {
        if(!this.checkHasFilterConfig(key)) {
            return this.filter;
        }
        //let classname = this.filterConfigs[key].classname;
        let classname = this._getClassname(key);
        //let type = this.filterConfigs[key].type;
        let type = this._getType(key);
        //let option =  this.filterConfigs[key].option;
        let option = this._getOption(key);
        if(!this.filterValidator(key, type, classname)) {
            return this.filter;
        }
        if(this.isEmptyValue(value, classname)) {
            this.deleteFilterObj(classname);
        }else{
            let filterfactory = filterFactory.filterCreate(type);
            filterfactory.setterFilter(key, value, classname, option)
            let obj = filterfactory.getterFilter();
            this.filter[classname] = obj;
        }
        return this.filter;
    };
    Filter.prototype.initFilter = function (parserData) {
        let filterKeys = Object.keys(parserData);
        filterKeys.forEach(filterKey => {
            if(this.checkHasFilterConfig(filterKey)) {
                let key = filterKey;
                let value = parserData[filterKey];
                let type = this.filterConfigs[filterKey].type;
                if(type == 'between' || type == 'terms' || type === 'distance') {
                    let filterfactory = filterFactory.filterCreate(type);
                    value = filterfactory.parserReturnValue(value);
                }
                this.setterFilter(key, value);

            }
        });
        return this.filter;
    }

    Filter.prototype.resetFilter = function () {
        this.filter = {};
        return this.filter;
    }
    return Filter;
})();

export default Filter;
