var Match = (function() {
    function Match() {
        this.filter = {
            key: null,
            value: null,
            classname: null
        };
        Match.prototype.setterFilter = function(key=null, value=null, classname=null, option=null) {
            this.filter.key = key;
            this.filter.value = value;
            this.filter.classname = classname;
            this.filter.option = option;
        };
    }
    return Match;
})();
export default Match;
