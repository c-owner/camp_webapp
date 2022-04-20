var Distance = (function () {
    function Distance() {
        this.filter = {
            key: null,
            lat: null,
            lon: null,
            classname: null,
            option: null,
        };
        Distance.prototype._checkValue = function(value) {
            console.log(value)
            if(!Array.isArray(value) || value.length < 2) {
                return false;
            }
            if(isNaN(value[0]) || isNaN(value[1])) {
                return false;
            }
            return true;
        };
        Distance.prototype.setterFilter = function (key=null, value=null, classname=null, option=null) {
            if(this._checkValue(value) == false) {
                return;
            }
            this.filter.key = key;
            this.filter.lat = value[0];
            this.filter.lon = value[1];
            this.filter.classname = classname;
            this.filter.option = option;
        };
        Distance.prototype.parserReturnValue = function(value) {
            let valueArr = value.split('^');

            for (let i = 0; i <= valueArr.length - 1; i++) {
                if(!isNaN(valueArr[i]) && valueArr[i] != '') {
                    valueArr[i] = Number(valueArr[i])
                }
            }
            return valueArr;
        }
    }

    return Distance;
})();

export default Distance;
