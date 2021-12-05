var Between = (function() {
    function Between() {
        this.filter = {
            key: null,
            start: null,
            end: null,
            classname: null,
        }
        Between.prototype.setterFilter = function(key=null, value=null, classname=null, option=null) { //여기서 value는 무조건 배열로 들어와야하는 전제조건.
            if(Array.isArray(value) && value.length < 2) {
                return;
            }
            this.filter.key = key;
            this.filter.start = value[0];
            this.filter.end = value[1];
            this.filter.classname = classname;
            this.filter.option = option;
        };
        Between.prototype.parserReturnValue = function(value) {
            let valueArr = value.split('^');

            /*valueArr.forEach((val, index) => {
                if(!isNaN(val) && val != '') {
                    valueArr[index] = Number(valueArr[index])
                }
            })*/

            for (let i = 0; i <= valueArr.length - 1; i++) {
                if(!isNaN(valueArr[i]) && valueArr[i] != '') {
                    valueArr[i] = Number(valueArr[i])
                }
            }
            return valueArr;
        }
    }
    return Between;
})();

export default Between;
