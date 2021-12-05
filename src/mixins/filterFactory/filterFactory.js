import Match from "./match";
import Between from "./between";
import Query from "./query";
import Terms from "./terms";
import Distance from "./distance";

function filterAdapter() {
	this.setterFilter = function(data) {

	}
	this.getterFilter = function() {
		return this.filter;
	}
}

var filterFactory = (function() {
	var filterTypes = {
		'match' : Match,
		'between': Between,
		'query': Query,
        'terms': Terms,
        'distance': Distance,
	};
	return {
		filterCreate: function(type) {
			var Type = filterTypes[type];
			let adapter = new filterAdapter();
			for (let key in adapter) {
			  if(!Type.prototype[key]) {
				Type.prototype[key] = adapter[key]
			  }
			}
			return (Type ? new Type({}) : null);
		}
	}
})();

export default filterFactory;
