var Page = (function () {
    function Page() {
        this.page = 1;
        this.size = 10;
        this.total = 0;
    };
    Page.prototype.pageValidator = function(value=null, key=null) { //filterSet의 page validator
        if(Number.isNaN(value) || key==null || ['page', 'size', 'total'].indexOf(key) < 0 || (['page', 'size'].indexOf(key) > 0 && value < 1)) {
            return false;
        }
        return true;
    };
    Page.prototype.setterPage = function(key, value) {
        if(this.pageValidator(value, key)) {
           this[key] = Number(value);
        }
        return {
            page: this.page,
            size: this.size,
            total: this.total,
        }
        // this.page = page;
    };
    Page.prototype.getterPage = function () {
        return {
            page: this.page,
            size: this.size,
            total: this.total,
        };
    };
    return Page;
})();

export default Page;