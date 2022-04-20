var Query = (function() {
    function Query() {
        this.filter = {
            key: null,
            query: null,
            classname: null
        }
        Query.prototype.setterFilter = function(key=null, value=null, classname=null, option=null) {
            this.filter.key = key;
            this.filter.query = String(value);
            this.filter.classname = classname;
            this.filter.option = option;
        }
    }
    return Query;
})();

export default Query;
