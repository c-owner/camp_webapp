
import UrlParser from "./urlParser";
import VuexParser from "./vuexParser";

function parserAdapter() {
    this.parsingFilter = function (data) { //url, vuex 받아서 filterSet 오브젝트에 담음

    };
    this.getMakeSaveFilter = function (obj) {//필터를 url 혹은 vuex저장용으로 만들어서 리턴
        return '';
    };
    this.setterFilterSet = function (obj) {
        this.filterSet = obj; //pasing한 필터 저장
    };
    this.getterFilterSet = function () {
        this.filterSet; //저장한 필터 불러옴
    }
}


var parserFactory = (function() {
    var parserTypes = {
        'url': UrlParser,
        'vuex': VuexParser
    };
    return {
        parserCreate: function (type) {
            var Type = parserTypes[type];
            let adapter = new parserAdapter();
            for (let key in adapter) {
                if(!Type.prototype[key]) {
                    Type.prototype[key] = adapter[key]
                }
            }
            return (Type ? new Type({}) : null);
        }
    }
})();

export default parserFactory;