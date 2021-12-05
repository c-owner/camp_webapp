var Terms = (function () {
    function Terms() {
        this.filter = {
            key: null,
            terms: [],
            classname: null,
            option: null,
        };
        Terms.prototype.setterFilter = function (key=null, value=null, classname=null, option=null) {
            if(Array.isArray(value) && value.length < 1) {
                return;
            }
            this.filter.key = key;
            this.filter.terms = value;
            this.filter.classname = classname;

            this.filter.option = option;
        };
        Terms.prototype.parserReturnValue = function (value) {
            let valueArr = value.split(',');
            for (let i = 0; i <= valueArr.length - 1; i++) {
                if(!isNaN(valueArr[i]) && valueArr[i] != '') {
                    valueArr[i] = Number(valueArr[i])
                }
            }
            return valueArr;
        }
    }

    return Terms;
})();

export default Terms;
