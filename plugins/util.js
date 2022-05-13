
var util = util || {};

(function() {
    var global = this;
    var objectPrototype = Object.prototype;
    var toString = objectPrototype.toString;
    var enumerables = [/*'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',*/ 'valueOf', 'toLocaleString', 'toString', 'constructor'];
    var emptyFn = function() {};
    var identityFn = function(o) {
        return o;
    };
    var iterableRe = /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/;
    var MSDateRe = /^\\?\/Date\(([-+])?(\d+)(?:[+-]\d{4})?\)\\?\/$/;

    util.global = global;

    util.now = Date.now || (Date.now = function() {
        return +new Date();
    });

    // util.ticks = global.performance && global.performance.now ? function() {
    //     return performance.now();
    // } : util.now;

    emptyFn.$nullFn = identityFn.$nullFn = emptyFn.$emptyFn = identityFn.$identityFn = true;

    emptyFn.$noClearOnDestroy = identityFn.$noClearOnDestroy = true;

    for(var i in {toString: 1}) {
        enumerables = null;
    }

    util.enumerables = enumerables;

    util.apply = function(object, config, defaults) {
        if(object) {
            if(defaults) {
                util.apply(object, defaults);
            }

            if(config && typeof config === 'object') {
                for(var i in config) {
                    object[i] = config[i];
                }

                if(enumerables) {
                    for(var j = enumerables.length; j--;) {
                        var k = enumerables[j];
                        if(config.hasOwnProperty(k)) {
                            object[k] = config[k];
                        }
                    }
                }
            }
        }

        return object;
    };

    util.apply(util, {
        emptyFn: emptyFn,
        identityFn: identityFn,
        validIdRe: /^[a-z_][a-z0-9\-_]*$/i,
        makeIdSelector: function(id) {
            if(!util.validIdRe.test(id)) {
                return id;
            }
            return '#' + id;
        },
        returnTrue: function() {
            return true;
        },
        emptyArray: Object.freeze ? Object.freeze([]) : [],
        applyIf: function(object, config) {
            if(object && config && typeof config === 'object') {
                for(var property in config) {
                    if(object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }

            return object;
        },
        destroy: function() {
            for(var ln = arguments.length, i = 0; i < ln; i++) {
                var arg = arguments[i];
                if(arg) {
                    if(util.isArray(arg)) {
                        this.destroy.apply(this, arg);
                    }
                    else if(util.isFunction(arg.destroy) && !arg.destroyed) {
                        arg.destroy();
                    }
                }
            }
            return null;
        },
        destroyMembers: function(object) {
            for(var name, i = 1, a = arguments, len = a.length; i < len; i++) {
                var ref = object[name = a[i]];

                if(ref != null) {
                    object[name] = util.destroy(ref);
                }
            }
        },
        valueFrom: function(value, defaultValue, allowBlank) {
            return util.isEmpty(value, allowBlank) ? defaultValue : value;
        },
        isEmpty: function(value, allowEmptyString) {
            return value == null || (!allowEmptyString ? value === '' : false) || (util.isArray(value) && value.length === 0) || (util.isObject(value) && util.Object.isEmpty(value));
        },
        isArray: 'isArray' in Array ? Array.isArray : function(value) {
            return toString.call(value) === '[object Array]';
        },
        isDate: function(obj) {
            return toString.call(obj) === '[object Date]';
        },
        isMSDate: function(value) {
            if(!util.isString(value)) {
                return false;
            }
            return MSDateRe.test(value);
        },
        isObject: toString.call(null) === '[object Object]' ? function(value) {
            return value != null && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } : function(value) {
            return toString.call(value) === '[object Object]';
        },
        isSimpleObject: function(value) {
            return value instanceof Object && value.constructor === Object;
        },
        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },
        isFunction: typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function' ? function(value) {
            return !!value && toString.call(value) === '[object Function]';
        } : function(value) {
            return !!value && typeof value === 'function';
        },
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        isString: function(value) {
            return typeof value === 'string';
        },
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },
        isElement: function(value) {
            return value ? value.nodeType === 1 : false;
        },
        isTextNode: function(value) {
            return value ? value.nodeName === '#text' : false;
        },
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },
        isIterable: function(value) {
            if(!value || typeof value.length !== 'number' || typeof value === 'string' || util.isFunction(value)) {
                return false;
            }

            if(!value.propertyIsEnumerable) {
                return !!value.item;
            }

            if(value.hasOwnProperty('length') && !value.propertyIsEnumerable('length')) {
                return true;
            }

            return iterableRe.test(toString.call(value));
        },
        clone: function(item, cloneDom) {
            if(item == null) {
                return item;
            }

            if(cloneDom !== false && item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            var type = toString.call(item);
            var clone;

            if(type === '[object Date]') {
                return new Date(item.getTime());
            }

            if(type === '[object Array]') {
                var i = item.length;

                clone = [];

                while(i--) {
                    clone[i] = util.clone(item[i], cloneDom);
                }
            }
            else if(type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for(var key in item) {
                    clone[key] = util.clone(item[key], cloneDom);
                }

                if(enumerables) {
                    for(var j = enumerables.length; j--;) {
                        var k = enumerables[j];
                        if(item.hasOwnProperty(k)) {
                            clone[k] = item[k];
                        }
                    }
                }
            }

            return clone || item;
        },
        functionFactory: function() {
            var args = Array.prototype.slice.call(arguments);

            return Function.prototype.constructor.apply(Function.prototype, args);
        },
        getElementById: function(id) {
            return document.getElementById(id);
        },
        coerce: function(from, to) {
            var fromType = util.typeOf(from);
            var toType = util.typeOf(to);
            var isString = typeof from === 'string';

            if(fromType !== toType) {
                switch(toType) {
                    case 'string':
                        return String(from);
                    case 'number':
                        return Number(from);
                    case 'boolean':
                        return isString && (!from || from === 'false' || from === '0') ? false : Boolean(from);
                    case 'null':
                        return isString && (!from || from === 'null') ? null : false;
                    case 'undefined':
                        return isString && (!from || from === 'undefined') ? undefined : false;
                    case 'date':
                        return isString && isNaN(from) ? util.Date.parse(from, util.Date.defaultFormat) : Date(Number(from));
                }
            }
            return from;
        },
        copyTo: function(dest, source, names, usePrototypeKeys) {
            if(typeof names === 'string') {
                names = names.split(util.propertyNameSplitRe);
            }

            for(var i = 0, n = names ? names.length : 0; i < n; i++) {
                var name = names[i];

                if(usePrototypeKeys || source.hasOwnProperty(name)) {
                    dest[name] = source[name];
                }
            }

            return dest;
        },
        copy: function(dest, source, names, usePrototypeKeys) {
            if(typeof names === 'string') {
                names = names.split(util.propertyNameSplitRe);
            }

            for(var i = 0, n = names ? names.length : 0; i < n; i++) {
                var name = names[i];

                if(source.hasOwnProperty(name) || (usePrototypeKeys && name in source)) {
                    dest[name] = source[name];
                }
            }

            return dest;
        },
        propertyNameSplitRe: /[,;\s]+/,
        copyToIf: function(destination, source, names) {
            if(typeof names === 'string') {
                names = names.split(util.propertyNameSplitRe);
            }

            for(var i = 0, n = names ? names.length : 0; i < n; i++) {
                var name = names[i];

                if(destination[name] === undefined) {
                    destination[name] = source[name];
                }
            }

            return destination;
        },
        copyIf: function(destination, source, names) {
            if(typeof names === 'string') {
                names = names.split(util.propertyNameSplitRe);
            }

            for(var i = 0, n = names ? names.length : 0; i < n; i++) {
                var name = names[i];

                if(!(name in destination) && name in source) {
                    destination[name] = source[name];
                }
            }

            return destination;
        },
        iterate: function(object, fn, scope) {
            if(util.isEmpty(object)) {
                return;
            }

            if(scope === undefined) {
                scope = object;
            }

            if(util.isIterable(object)) {
                util.Array.each.call(util.Array, object, fn, scope);
            }
            else {
                util.Object.each.call(util.Object, object, fn, scope);
            }
        },
        urlEncode: function() {
            var args = util.Array.from(arguments);
            var prefix = '';

            if(util.isString(args[1])) {
                prefix = args[1] + '&';
                args[1] = false;
            }

            return prefix + util.Object.toQueryString.apply(util.Object, args);
        },
        urlDecode: function() {
            return util.Object.fromQueryString.apply(util.Object, arguments);
        },
        getScrollbarSize: function(force) {
            var scrollbarSize = util._scrollbarSize;

            if(force || !scrollbarSize) {
                var db = document.body;
                var div = document.createElement('div');
                var h;
                var w;

                div.style.width = div.style.height = '100px';
                div.style.overflow = 'scroll';
                div.style.position = 'absolute';

                db.appendChild(div);

                util._scrollbarSize = scrollbarSize = {
                    width: w = div.offsetWidth - div.clientWidth,
                    height: h = div.offsetHeight - div.clientHeignt
                };

                scrollbarSize.reservedWidth = w ? 'calc(100% - ' + w + 'px)' : '';
                scrollbarSize.reservedHeight = h ? 'calc(100% - ' + h + 'px)' : '';

                db.removeChild(div);
            }

            return scrollbarSize;
        },
        typeOf: function() {
            var nonWhitespaceRe = /\S/;
            var toString = Object.prototype.toString;
            var typeofTypes = {
                number: 1,
                string: 1,
                boolean: 1,
                undefined: 1
            };
            var toStringTypes = {
                '[object Array]': 'array',
                '[object Date]': 'date',
                '[object Boolean]': 'boolean',
                '[object Number]': 'number',
                '[object RegExp]': 'regexp'
            };

            return function(value) {
                if(value === null) {
                    return 'null';
                }

                var type = typeof value;
                var typeToString;

                if(typeofTypes[type]) {
                    return type;
                }

                var ret = toStringTypes[typeToString = toString.call(value)];
                if(ret) {
                    return ret;
                }

                if(type === 'function') {
                    return 'function';
                }

                if(type === 'object') {
                    if(value.nodeType !== undefined) {
                        if(value.nodeType === 3) {
                            return nonWhitespaceRe.test(value.nodeValue) ? 'textnode' : 'whitespace';
                        }
                        return 'element';
                    }

                    return 'object';
                }

                return typeToString;
            };
        }(),
        weightSortFn: function(lhs, rhs) {
            return (lhs.weight || 0) - (rhs.weight || 0);
        },
        concat: function(a, b) {
            var noB = b == null;
            var E = util.emptyArray;

            return a == null ? (noB ? a : E.concat(b)) : (noB ? E.concat(a) : E.concat(a, b));
        },
        sha256: function(string) {
            var chrsz = 8;
            var hexcase = 0;

            function safeAdd(x, y) {
                var lsw = (x & 0xffff) + (y & 0xffff);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xffff);
            }

            function s(x, n) {
                return (x >>> n) | (x << (32 - n));
            }
            function r(x, n) {
                return x >>> n;
            }
            function ch(x, y, z) {
                return (x & y) ^ ((~x) & z);
            }
            function maj(x, y, z) {
                return (x & y) ^ (x & z) ^ (y & z);
            }
            function sigma0256(x) {
                return s(x, 2) ^ s(x, 13) ^ s(x, 22);
            }
            function sigma1256(x) {
                return s(x, 6) ^ s(x, 11) ^ s(x, 25);
            }
            function gamma0256(x) {
                return s(x, 7) ^ s(x, 18) ^ r(x, 3);
            }
            function gamma1256(x) {
                return s(x, 17) ^ s(x, 19) ^ r(x, 10);
            }

            function coreSha256(m, l) {
                var k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

                var hash = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

                var w = new Array(64);

                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;

                for(var i = 0, ln = m.length; i < ln; i += 16) {
                    var a = hash[0];
                    var b = hash[1];
                    var c = hash[2];
                    var d = hash[3];
                    var e = hash[4];
                    var f = hash[5];
                    var g = hash[6];
                    var h = hash[7];

                    for(var j = 0; j < 64; j++) {
                        if(j < 16) {
                            w[j] = m[j + i];
                        }
                        else {
                            w[j] = safeAdd(safeAdd(safeAdd(gamma1256(w[j - 2]), w[j - 7]), gamma0256(w[j - 15])), w[j - 16]);
                        }

                        var t1 = safeAdd(safeAdd(safeAdd(safeAdd(h, sigma1256(e)), ch(e, f, g)), k[j]), w[j]);
                        var t2 = safeAdd(sigma0256(a), maj(a, b, c));

                        h = g;
                        g = f;
                        f = e;
                        e = safeAdd(d, t1);
                        d = c;
                        c = b;
                        b = a;
                        a = safeAdd(t1, t2);
                    }

                    hash[0] = safeAdd(a, hash[0]);
                    hash[1] = safeAdd(b, hash[1]);
                    hash[2] = safeAdd(c, hash[2]);
                    hash[3] = safeAdd(d, hash[3]);
                    hash[4] = safeAdd(e, hash[4]);
                    hash[5] = safeAdd(f, hash[5]);
                    hash[6] = safeAdd(g, hash[6]);
                    hash[7] = safeAdd(h, hash[7]);
                }
                return hash;
            }

            function str2binb(str) {
                var bin = [];
                var mask = (1 << chrsz) - 1;
                for(var i = 0, ln = str.length; i < ln * chrsz; i += chrsz) {
                    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
                }
                return bin;
            }

            function binb2hex(binarray) {
                var hexTab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
                var str = '';
                for(var i = 0, ln = binarray.length; i < ln * 4; i++) {
                    str += hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xf) + hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xf);
                }
                return str;
            }

            string = util.Base64._utf8_encode(string);
            return binb2hex(coreSha256(str2binb(string), string.length * chrsz));
        }
    });

    util.returnTrue.$nullFn = true;

    var TemplateClass = function() {};
    var queryRe = /^\?/;
    var keyRe = /(\[):?([^\]]*)\]/g;
    var nameRe = /^([^\[]+)/;
    var plusRe = /\+/g;
    var utilObject = util.Object = {
        chain: Object.create || function(object) {
            TemplateClass.prototype = object;
            var result = new TemplateClass();
            TemplateClass.prototype = null;
            return result;
        },
        clear: function(object) {
            for(var key in object) {
                delete object[key];
            }

            return object;
        },
        freeze: Object.freeze ? function(obj, deep) {
            if(obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
                Object.freeze(obj);

                if(deep) {
                    for(var name in obj) {
                        utilObject.freeze(obj[name], deep);
                    }
                }
            }
            return obj;
        } : util.identityFn,
        toQueryObjects: function(name, value, recursive) {
            var self = utilObject.toQueryObjects;
            var objects = [];
            var i;
            var ln;

            if(util.isArray(value)) {
                for(i = 0, ln = value.length; i < ln; i++) {
                    if(recursive) {
                        objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                    }
                    else {
                        objects.push({
                            name: name,
                            value: value[i]
                        });
                    }
                }
            }
            else if(util.isObject(value)) {
                for(i in value) {
                    if(value.hasOwnProperty(i)) {
                        if(recursive) {
                            objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                        }
                        else {
                            objects.push({
                                name: name,
                                value: value[i]
                            });
                        }
                    }
                }
            }
            else {
                objects.push({
                    name: name,
                    value: value
                });
            }

            return objects;
        },
        toQueryString: function(object, recursive) {
            var paramObjects = [];
            var params = [];

            for(var i in object) {
                if(object.hasOwnProperty(i)) {
                    paramObjects = paramObjects.concat(utilObject.toQueryObjects(i, object[i], recursive));
                }
            }

            for(var j = 0, ln = paramObjects.length; j < ln; j++) {
                var paramObject = paramObjects[j];
                var value = paramObject.value;

                if(util.isEmpty(value)) {
                    value = '';
                }
                else if(util.isDate(value)) {
                    value = util.Date.toString(value);
                }

                params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
            }

            return params.join('&');
        },
        fromQueryString: function(queryString, recursive) {
            var parts = queryString.replace(queryRe, '').split('&');
            var object = {};
            var j;
            var subLn;
            var key;

            for(var i = 0, ln = parts.length; i < ln; i++) {
                var part = parts[i];

                if(part.length > 0) {
                    var components = part.split('=');
                    var name = components[0];
                    name = name.replace(plusRe, '%20');
                    name = decodeURIComponent(name);

                    var value = components[1];
                    if(value !== undefined) {
                        value = value.replace(plusRe, '%20');
                        value = decodeURIComponent(value);
                    }
                    else {
                        value = '';
                    }

                    if(!recursive) {
                        if(object.hasOwnProperty(name)) {
                            if(!util.isArray(object[name])) {
                                object[name] = [object[name]];
                            }

                            object[name].push(value);
                        }
                        else {
                            object[name] = value;
                        }
                    }
                    else {
                        var matchedKeys = name.match(keyRe);
                        var matchedName = name.match(nameRe);

                        name = matchedName[0];
                        var keys = [];

                        if(matchedKeys === null) {
                            object[name] = value;
                            continue;
                        }

                        for(j = 0, subLn = matchedKeys.length; j < subLn; j++) {
                            key = matchedKeys[j];
                            key = key.length === 2 ? '' : key.substring(1, key.length - 1);
                            keys.push(key);
                        }

                        keys.unshift(name);

                        var temp = object;

                        for(j = 0, subLn = keys.length; j < subLn; j++) {
                            key = keys[j];

                            if(j === subLn - 1) {
                                if(util.isArray(temp) && key === '') {
                                    temp.push(value);
                                }
                                else {
                                    temp[key] = value;
                                }
                            }
                            else {
                                if(temp[key] === undefined || typeof temp[key] === 'string') {
                                    var nextKey = keys[j + 1];

                                    temp[key] = util.isNumeric(nextKey) || nextKey === '' ? [] : {};
                                }

                                temp = temp[key];
                            }
                        }
                    }
                }
            }

            return object;
        },
        each: function(object, fn, scope) {
            var enumerables = util.enumerables;
            var property;

            if(object) {
                scope = scope || object;

                for(property in object) {
                    if(object.hasOwnProperty(property)) {
                        if(fn.call(scope, property, object[property], object) === false) {
                            return;
                        }
                    }
                }

                if(enumerables) {
                    for(var i = enumerables.length; i--;) {
                        if(object.hasOwnProperty(property = enumerables[i])) {
                            if(fn.call(scope, property, object[property], object) === false) {
                                return;
                            }
                        }
                    }
                }
            }
        },
        eachValue: function(object, fn, scope) {
            var enumerables = util.enumerables;
            var property;

            scope = scope || object;

            for(property in object) {
                if(object.hasOwnProperty(property)) {
                    if(fn.call(scope, object[property]) === false) {
                        return;
                    }
                }
            }

            if(enumerables) {
                for(var i = enumerables.length; i--;) {
                    if(object.hasOwnProperty(property = enumerables[i])) {
                        if(fn.call(scope, object[property]) === false) {
                            return;
                        }
                    }
                }
            }
        },
        merge: function(destination) {
            var args = arguments;
            var mergeFn = utilObject.merge;
            var cloneFn = util.clone;

            for(var i = 1, ln = args.length; i < ln; i++) {
                var object = args[i];

                for(var key in object) {
                    var value = object[key];
                    if(value && value.constructor === Object) {
                        var sourceKey = destination[key];
                        if(sourceKey && sourceKey.constructor === Object) {
                            mergeFn(sourceKey, value);
                        }
                        else {
                            destination[key] = cloneFn(value);
                        }
                    }
                    else {
                        destination[key] = value;
                    }
                }
            }

            return destination;
        },
        mergeIf: function(destination) {
            var cloneFn = util.clone;

            for(var i = 1, ln = arguments.length; i < ln; i++) {
                var object = arguments[i];

                for(var key in object) {
                    if(!(key in destination)) {
                        var value = object[key];

                        if(value && value.constructor === Object) {
                            destination[key] = cloneFn(value);
                        }
                        else {
                            destination[key] = value;
                        }
                    }
                }
            }

            return destination;
        },
        getAllKeys: function(object) {
            var keys = [];

            for(var property in object) {
                keys.push(property);
            }

            return keys;
        },
        getKey: function(object, value) {
            for(var property in object) {
                if(object.hasOwnProperty(property) && object[property] === value) {
                    return property;
                }
            }

            return null;
        },
        getValues: function(object) {
            var values = [];

            for(var property in object) {
                if(object.hasOwnProperty(property)) {
                    values.push(object[property]);
                }
            }

            return values;
        },
        getKeys: typeof Object.keys == 'function' ? function(object) {
            if(!object) {
                return [];
            }
            return Object.keys(object);
        } : function(object) {
            var keys = [];

            for(var property in object) {
                if(object.hasOwnProperty(property)) {
                    keys.push(property);
                }
            }

            return keys;
        },
        getSize: function(object) {
            var size = 0;

            for(var property in object) {
                if(object.hasOwnProperty(property)) {
                    size++;
                }
            }

            return size;
        },
        isEmpty: function(object) {
            for(var key in object) {
                if(object.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        },
        equals: function() {
            var check = function(o1, o2) {
                for(var key in o1) {
                    if(o1.hasOwnProperty(key)) {
                        if(o1[key] !== o2[key]) {
                            return false;
                        }
                    }
                }
                return true;
            };

            return function(object1, object2) {
                if(object1 === object2) {
                    return true;
                }
                if(object1 && object2) {
                    return check(object1, object2) && check(object2, object1);
                }
                if(!object1 && !object2) {
                    return object1 === object2;
                }
                return false;
            };
        }(),
        fork: function(obj) {
            var ret;

            if(obj && obj.constructor === Object) {
                ret = utilObject.chain(obj);

                for(var key in obj) {
                    var value = obj[key];

                    if(value) {
                        if(value.constructor === Object) {
                            ret[key] = utilObject.fork(value);
                        }
                        else if(value instanceof Array) {
                            ret[key] = util.Array.clone(value);
                        }
                    }
                }
            }
            else {
                ret = obj;
            }

            return ret;
        },
        defineProperty: 'defineProperty' in Object ? Object.defineProperty : function(object, name, descriptor) {
            if(!Object.prototype.__defineGetter__) {
                return;
            }
            if(descriptor.get) {
                object.__defineGetter__(name, descriptor.get);
            }

            if(descriptor.set) {
                object.__defineSetter__(name, descriptor.set);
            }
        },
        classify: function(object) {
            var prototype = object;
            var objectProperties = [];
            var propertyClassesMap = {};
            var objectClass = function() {
                for(var i = 0, ln = objectProperties.length; i < ln; i++) {
                    var property = objectProperties[i];
                    this[property] = new propertyClassesMap[property]();
                }
            };

            for(var key in object) {
                if(object.hasOwnProperty(key)) {
                    var value = object[key];

                    if(value && value.constructor === Object) {
                        objectProperties.push(key);
                        propertyClassesMap[key] = utilObject.classify(value);
                    }
                }
            }

            objectClass.prototype = prototype;

            return objectClass;
        }
    };

    util.merge = util.Object.merge;
    util.mergeIf = util.Object.mergeIf;
}());

if(!util.form) {
    util.form = {};
}
if(!util.form.field) {
    util.form.field = {};
}

util.form.field.VTypes = util.form.VTypes = function() {
    var alpha = /^[a-zA-Z_]+$/;
    var alphanum = /^[a-zA-Z0-9_]+$/;
    var email = /^(")?(?:[^\."\s])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,20}$/;
    var url = /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?)/i;
    var ip = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    return {
        email: function(value) {
            return email.test(value);
        },
        url: function(value) {
            return url.test(value);
        },
        alpha: function(value) {
            return alpha.test(value);
        },
        alphanum: function(value) {
            return alphanum.test(value);
        },
        ip: function(value) {
            return ip.test(value);
        }
    };
}();

util.Array = function() {
    var arrayPrototype = Array.prototype;
    var slice = arrayPrototype.slice;
    var supportsSplice = function() {
        var array = [];
        var j = 20;

        if(!array.splice) {
            return false;
        }

        while(j--) {
            array.push('A');
        }

        array.splice(15, 0, 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F');

        var lengthBefore = array.length;
        array.splice(13, 0, 'XXX');

        if(lengthBefore + 1 !== array.length) {
            return false;
        }

        return true;
    }();
    var supportsIndexOf = 'indexOf' in arrayPrototype;
    var supportsSliceOnNodeList = true;

    function stableSort(array, userComparator) {
        var len = array.length;
        var indices = new Array(len);
        var i;

        for(i = 0; i < len; i++) {
            indices[i] = i;
        }

        indices.sort(function(index1, index2) {
            return userComparator(array[index1], array[index2]) || index1 - index2;
        });

        for(i = 0; i < len; i++) {
            indices[i] = array[indices[i]];
        }

        for(i = 0; i < len; i++) {
            array[i] = indices[i];
        }

        return array;
    }

    try {
        if(typeof document !== 'undefined') {
            slice.call(document.getElementsByTagName('body'));
        }
    }
    catch(e) {
        supportsSliceOnNodeList = false;
    }

    var fixArrayIndex = function(array, index) {
        return index < 0 ? Math.max(0, array.length + index) : Math.min(array.length, index);
    };

    var replaceSim = function(array, index, removeCount, insert) {
        var add = insert ? insert.length : 0;
        var length = array.length;
        var pos = fixArrayIndex(array, index);

        if(pos === length && add) {
            array.push.apply(array, insert);
        }
        else {
            var remove = Math.min(removeCount, length - pos);
            var tailOldPos = pos + remove;
            var tailNewPos = tailOldPos + add - remove;
            var tailCount = length - tailOldPos;
            var lengthAfterRemove = length - remove;
            var i;

            if(tailNewPos < tailOldPos) {
                for(i = 0; i < tailCount; ++i) {
                    array[tailNewPos + i] = array[tailOldPos + i];
                }
            }
            else if(tailNewPos > tailOldPos) {
                for(i = tailCount; i--;) {
                    array[tailNewPos + i] = array[tailOldPos + i];
                }
            }

            if(add && pos === lengthAfterRemove) {
                array.length = lengthAfterRemove;
                array.push.apply(array, insert);
            }
            else {
                array.length = lengthAfterRemove + add;
                for(i = 0; i < add; ++i) {
                    array[pos + i] = insert[i];
                }
            }
        }

        return array;
    };

    var replaceNative = function(array, index, removeCount, insert) {
        if(insert && insert.length) {
            if(index === 0 && !removeCount) {
                array.unshift.apply(array, insert);
            }
            else if(index < array.length) {
                array.splice.apply(array, [index, removeCount].concat(insert));
            }
            else {
                array.push.apply(array, insert);
            }
        }
        else {
            array.splice(index, removeCount);
        }
        return array;
    };

    var eraseSim = function(array, index, removeCount) {
        return replaceSim(array, index, removeCount);
    };

    var eraseNative = function(array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    };

    var spliceSim = function(array, index, removeCount) {
        var len = arguments.length;
        var pos = fixArrayIndex(array, index);

        if(len < 3) {
            removeCount = array.length - pos;
        }

        var removed = array.slice(index, fixArrayIndex(array, pos + removeCount));

        if(len < 4) {
            replaceSim(array, pos, removeCount);
        }
        else {
            replaceSim(array, pos, removeCount, slice.call(arguments, 3));
        }

        return removed;
    };

    var spliceNative = function(array) {
        return array.splice.apply(array, slice.call(arguments, 1));
    };

    var erase = supportsSplice ? eraseNative : eraseSim;
    var replace = supportsSplice ? replaceNative : replaceSim;
    var splice = supportsSplice ? spliceNative : spliceSim;

    var utilArray = {
        binarySearch: function(array, item, begin, end, compareFn) {
            var length = array.length;

            if(begin instanceof Function) {
                compareFn = begin;
                begin = 0;
                end = length;
            }
            else if(end instanceof Function) {
                compareFn = end;
                end = length;
            }
            else {
                if(begin === undefined) {
                    begin = 0;
                }
                if(end === undefined) {
                    end = length;
                }
                compareFn = compareFn || utilArray.lexicalCompare;
            }

            --end;

            while(begin <= end) {
                var middle = begin + end >> 1;
                var comparison = compareFn(item, array[middle]);
                if(comparison >= 0) {
                    begin = middle + 1;
                }
                else if(comparison < 0) {
                    end = middle - 1;
                }
            }

            return begin;
        },
        defaultCompare: function(lhs, rhs) {
            return lhs < rhs ? -1 : (lhs > rhs ? 1 : 0);
        },
        lexicalCompare: function(lhs, rhs) {
            lhs = String(lhs);
            rhs = String(rhs);

            return lhs < rhs ? -1 : (lhs > rhs ? 1 : 0);
        },
        each: function(array, fn, scope, reverse) {
            array = utilArray.from(array);

            var i;
            var ln = array.length;

            if(reverse !== true) {
                for(i = 0; i < ln; i++) {
                    if(fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }
            else {
                for(i = ln - 1; i > -1; i--) {
                    if(fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }

            return true;
        },
        findInsertionIndex: function(item, items, comparatorFn, index) {
            var len = items.length;

            comparatorFn = comparatorFn || utilArray.lexicalCompare;

            if(index < len) {
                var beforeCheck = index > 0 ? comparatorFn(items[index - 1], item) : 0;
                var afterCheck = index < len - 1 ? comparatorFn(items, items[index]) : 0;
                if(beforeCheck < 1 && afterCheck < 1) {
                    return index;
                }
            }

            return utilArray.binarySearch(items, item, comparatorFn);
        },
        forEach: 'forEach' in arrayPrototype ? function(array, fn, scope) {
            array.forEach(fn, scope);
        } : function(array, fn, scope) {
            for(var i = 0, ln = array.length; i < ln; i++) {
                fn.call(scope, array[i], i, array);
            }
        },
        indexOf: supportsIndexOf ? function(array, item, from) {
            return array ? arrayPrototype.indexOf.call(array, item, from) : -1;
        } : function(array, item, from) {
            var length = array ? array.length : 0;

            for(var i = from < 0 ? Math.max(0, length + from) : from || 0; i < length; i++) {
                if(array[i] === item) {
                    return i;
                }
            }

            return -1;
        },
        contains: supportsIndexOf ? function(array, item) {
            return arrayPrototype.indexOf.call(array, item) !== -1;
        } : function(array, item) {
            for(var i = 0, ln = array.length; i < ln; i++) {
                if(array[i] === item) {
                    return true;
                }
            }

            return false;
        },
        toArray: function(iterable, start, end) {
            if(!iterable || !iterable.length) {
                return [];
            }

            if(typeof iterable === 'string') {
                iterable = iterable.split('');
            }

            if(supportsSliceOnNodeList) {
                return slice.call(iterable, start || 0, end || iterable.length);
            }

            var array = [];

            start = start || 0;
            end = end ? (end < 0 ? iterable.length + end : end) : iterable.length;

            for(var i = start; i < end; i++) {
                array.push(iterable[i]);
            }

            return array;
        },
        pluck: function(array, propertyName) {
            var ret = [];

            for(var i = 0, ln = array.length; i < ln; i++) {
                var item = array[i];

                ret.push(item[propertyName]);
            }

            return ret;
        },
        map: 'map' in arrayPrototype ? function(array, fn, scope) {
            return array.map(fn, scope);
        } : function(array, fn, scope) {
            var len = array.length;
            var results = new Array(len);

            for(var i = 0; i < len; i++) {
                results[i] = fn.call(scope, array[i], i, array);
            }

            return results;
        },
        every: 'every' in arrayPrototype ? function(array, fn, scope) {
            return array.every(fn, scope);
        } : function(array, fn, scope) {
            for(var i = 0, ln = array.length; i < ln; ++i) {
                if(!fn.call(scope, array[i], i, array)) {
                    return false;
                }
            }

            return true;
        },
        some: 'some' in arrayPrototype ? function(array, fn, scope) {
            return array.some(fn, scope);
        } : function(array, fn, scope) {
            for(var i = 0, ln = array.length; i < ln; ++i) {
                if(fn.call(scope, array[i], i, array)) {
                    return true;
                }
            }

            return false;
        },
        equals: function(array1, array2) {
            var len1 = array1.length;
            var len2 = array2.length;

            if(len1 !== len2) {
                return false;
            }

            for(var i = 0; i < len1; ++i) {
                if(array1[i] !== array2[i]) {
                    return false;
                }
            }

            return true;
        },
        clean: function(array) {
            var results = [];

            for(var i = 0, ln = array.length; i < ln; i++) {
                var item = array[i];

                if(!util.isEmpty(item)) {
                    results.push(item);
                }
            }

            return results;
        },
        unique: function(array) {
            var clone = [];

            for(var i = 0, ln = array.length; i < ln; i++) {
                var item = array[i];

                if(utilArray.indexOf(clone, item) === -1) {
                    clone.push(item);
                }
            }

            return clone;
        },
        filter: 'filter' in arrayPrototype ? function(array, fn, scope) {
            return array.filter(fn, scope);
        } : function(array, fn, scope) {
            var results = [];

            for(var i = 0, ln = array.length; i < ln; i++) {
                if(fn.call(scope, array[i], i, array)) {
                    results.push(array[i]);
                }
            }

            return results;
        },
        findBy: function(array, fn, scope) {
            for(var i = 0, len = array.length; i < len; i++) {
                if(fn.call(scope || array, array[i], i)) {
                    return array[i];
                }
            }
            return null;
        },
        from: function(value, newReference) {
            if(value === undefined || value === null) {
                return [];
            }

            if(util.isArray(value)) {
                return newReference ? slice.call(value) : value;
            }

            var type = typeof value;
            if(value && value.length !== undefined && type !== 'string' && (type !== 'function' || !value.apply)) {
                return utilArray.toArray(value);
            }

            return [value];
        },
        remove: function(array, item) {
            var index = utilArray.indexOf(array, item);

            if(index !== -1) {
                erase(array, index, 1);
            }

            return array;
        },
        removeAt: function(array, index, count) {
            var len = array.length;
            if(index >= 0 && index < len) {
                count = count || 1;
                count = Math.min(count, len - index);
                erase(array, index, count);
            }
            return array;
        },
        include: function(array, item) {
            if(!utilArray.contains(array, item)) {
                array.push(item);
            }
        },
        clone: function(array) {
            return slice.call(array);
        },
        merge: function() {
            var args = slice.call(arguments);
            var array = [];

            for(var i = 0, ln = args.length; i < ln; i++) {
                array = array.concat(args[i]);
            }

            return utilArray.unique(array);
        },
        intersect: function() {
            var intersection = [];
            var arrays = slice.call(arguments);
            var minArray;
            var minArrayIndex;
            var i;

            if(!arrays.length) {
                return intersection;
            }

            var arraysLength = arrays.length;
            for(i = minArrayIndex = 0; i < arraysLength; i++) {
                var minArrayCandidate = arrays[i];
                if(!minArray || minArrayCandidate.length < minArray.length) {
                    minArray = minArrayCandidate;
                    minArrayIndex = i;
                }
            }

            minArray = utilArray.unique(minArray);
            erase(arrays, minArrayIndex, 1);

            var minArrayLength = minArray.length;
            arraysLength = arrays.length;
            for(i = 0; i < minArrayLength; i++) {
                var element = minArray[i];
                var elementCount = 0;

                for(var j = 0; j < arraysLength; j++) {
                    var array = arrays[j];
                    for(var k = 0, arrayLength = array.length; k < arrayLength; k++) {
                        var elementCandidate = array[k];
                        if(element === elementCandidate) {
                            elementCount++;
                            break;
                        }
                    }
                }

                if(elementCount === arraysLength) {
                    intersection.push(element);
                }
            }

            return intersection;
        },
        difference: function(arrayA, arrayB) {
            var clone = slice.call(arrayA);
            var ln = clone.length;

            for(var i = 0, lnB = arrayB.length; i < lnB; i++) {
                for(var j = 0; j < ln; j++) {
                    if(clone[j] === arrayB[i]) {
                        erase(clone,j, 1);
                        j--;
                        ln--;
                    }
                }
            }

            return clone;
        },
        reduce: Array.prototype.reduce ? function(array, reduceFn, initialValue) {
            if(arguments.length === 3) {
                return Array.prototype.reduce.call(array, reduceFn, initialValue);
            }
            return Array.prototype.reduce.call(array, reduceFn);
        } : function(array, reduceFn, initialValue) {
            array = Object(array);

            var index = 0;
            var length = array.length >>> 0;
            var reduced = initialalue;

            if(arguments.length < 3) {
                while(true) {
                    if(index in array) {
                        reduced = array[index++];
                        break;
                    }
                    if(++index >= length) {
                        throw new TypeError('Reduce of empty array with no initial value');
                    }
                }
            }

            for(; index < length; ++index) {
                if(index in array) {
                    reduced = reduceFn(reduced, array[index], index, array);
                }
            }

            return reduced;
        },
        slice: [1, 2].slice(1, undefined).length ? function(array, begin, end) {
            return slice.call(array, begin, end);
        } : function(array, begin, end) {
            if(typeof begin === 'undefined') {
                return slice.call(array);
            }
            if(typeof end === 'undefined') {
                return slice.call(array, begin);
            }
            return slice.call(array, begin, end);
        },
        sort: function(array, sortFn) {
            return stableSort(array, sortFn || utilArray.lexicalCompare);
        },
        flatten: function(array) {
            var worker = [];

            function rFlatten(a) {
                for(var i = 0, ln = a.length; i < ln; i++) {
                    var v = a[i];

                    if(util.isArray(v)) {
                        rFlatten(v);
                    }
                    else {
                        worker.push(v);
                    }
                }

                return worker;
            }

            return rFlatten(array);
        },
        min: function(array, comparisonFn) {
            var min = array[0];

            for(var i = 0, ln = array.length; i < ln; i++) {
                var item = array[i];

                if(comparisonFn) {
                    if(comparisonFn(min, item) === 1) {
                        min = item;
                    }
                }
                else {
                    if(item < min) {
                        min = item;
                    }
                }
            }

            return min;
        },
        max: function(array, comparisonFn) {
            var max = array[0];

            for(var i = 0, ln = array.length; i < ln; i++) {
                var item = array[i];

                if(comparisonFn) {
                    if(comparisonFn(max, item) === -1) {
                        max = item;
                    }
                }
                else {
                    if(item > max) {
                        max = item;
                    }
                }
            }

            return max;
        },
        mean: function(array) {
            return array.length > 0 ? utilArray.sum(array) / array.length : undefined;
        },
        sum: function(array) {
            var sum = 0;
            for(var i = 0, ln = array.length; i < ln; i++) {
                var item = array[i];

                sum += item;
            }

            return sum;
        },
        toMap: function(strings, getKey, scope) {
            if(!strings) {
                return null;
            }

            var map = {};
            var i = strings.length;

            if(typeof strings === 'string') {
                map[strings] = 1;
            }
            else if(!getKey) {
                while(i--) {
                    map[strings[i]] = i + 1;
                }
            }
            else if(typeof getKey === 'string') {
                while(i--) {
                    map[strings[i][getKey]] = i + 1;
                }
            }
            else {
                while(i--) {
                    map[getKey.call(scope, strings[i])] = i + 1;
                }
            }

            return map;
        },
        toValueMap: function(array, getKey, scope, arrayify) {
            var map = {};
            var i = array.length;
            var entry;
            var fn;
            var value;

            if(!getKey) {
                while(i--) {
                    value = array[i];
                    map[value] = value;
                }
            }
            else {
                if(!(fn = typeof getKey !== 'string')) {
                    arrayify = scope;
                }

                var alwaysArray = arrayify === 1;
                var autoArray = arrayify === 2;

                while(i--) {
                    value = array[i];
                    var key = fn ? getKey.call(scope, value) : value[getKey];

                    if(alwaysArray) {
                        if(key in map) {
                            map[key].push(value);
                        }
                        else {
                            map[key] = [value];
                        }
                    }
                    else if(autoArray && key in map) {
                        if(entry = map[key] instanceof Array) {
                            entry.push(value);
                        }
                        else {
                            map[key] = [entry, value];
                        }
                    }
                    else {
                        map[key] = value;
                    }
                }
            }

            return map;
        },
        erase: erase,
        insert: function(array, index, items) {
            return replace(array, index, 0, items);
        },
        move: function(array, fromIdx, toIdx) {
            if(toIdx === fromIdx) {
                return;
            }

            var item = array[fromIdx];

            for(var incr = toIdx > fromIdx ? 1 : -1, i = fromIdx; i != toIdx; i += incr) {
                array[i] = array[i + incr];
            }
            array[toIdx] = item;
        },
        replace: replace,
        splice: splice,
        push: function(target) {
            var args = arguments;

            if(target === undefined) {
                target = [];
            }
            else if(!util.isArray(target)) {
                target = [target];
            }

            for(var len = args.length, i = 1; i < len; i++) {
                var newItem = args[i];
                Array.prototype.push[util.isIterable(newItem) ? 'apply' : 'call'](target, newItem);
            }

            return target;
        },
        numericSortFn: function(a, b) {
            return a - b;
        }
    };

    util.each = utilArray.each;
    utilArray.union = utilArray.merge;
    util.min = utilArray.min;
    util.max = utilArray.max;
    util.sum = utilArray.sum;
    util.mean = utilArray.mean;
    util.flatten = utilArray.flatten;
    util.clean = utilArray.clean;
    util.unique = utilArray.unique;
    util.pluck = utilArray.pluck;
    util.toArray = function() {
        return utilArray.toArray.apply(utilArray, arguments);
    };

    return utilArray;
}();


util.Cookies = {
    set: function(name, value) {
        var argv = arguments;
        var argc = argv.length;
        var expires = argc > 2 ? argv[2] : null;
        var path = argc > 3 ? argv[3] : '/';
        var domain = argc > 4 ? argv[4] : null;
        var secure = argc > 5 ? argv[5] : false;

        document.cookie = name + '=' + escape(value) + (expires === null ? '' : '; expires=' + expires.toUTCString()) + (path === null ? '' : '; path=' + path) + (domain === null ? '' : '; domain=' + domain) + (secure === true ? '; secure' : '');
    },
    get: function(name) {
        var parts = document.cookie.split('; ');

        for(var len = parts.length, i = 0; i < len; ++i) {
            var item = parts[i].split('=');
            if(item[0] === name) {
                var ret = item[1];
                return ret ? unescape(ret) : '';
            }
        }
        return null;
    },
    clear: function(name, path) {
        if(this.get(name)) {
            path = path || '/';
            document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=' + path;
        }
    }
};

util.String = function() {
    var trimRegex = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g;
    var escapeRe = /('|\\)/g;
    var escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g;
    var basicTrimRe = /^\s+|\s+$/g;
    var whitespaceRe = /\s+/;
    var varReplace = /(^[^a-z]*|[^\w])/gi;
    var charToEntity;
    var entityToChar;
    var charToEntityRegex;
    var entityToCharRegex;
    var htmlEncodeReplaceFn = function(match, capture) {
        return charToEntity[capture];
    };
    var htmlDecodeReplaceFn = function(match, capture) {
        return capture in entityToChar ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
    };
    var boundsCheck = function(s, other) {
        if(s === null || s === undefined || other === null || other === undefined) {
            return false;
        }

        return other.length <= s.length;
    };
    var fromCharCode = String.fromCharCode;
    var utilString;

    return utilString = {
        fromCodePoint: String.fromCodePoint || function() {
            var result = '';
            var codeUnits = [];
            var index = -1;
            var length = arguments.length;

            while(++index < length) {
                var codePoint = Number(arguments[index]);
                if(codePoint <= 0xffff) {
                    codeUnits.push(codePoint);
                }
                else {
                    codePoint -= 0x10000;
                    codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
                }
                if(index + 1 === length) {
                    result += fromCharCode(codeUnits);
                    codeUnits.length = 0;
                }
            }
            return result;
        },
        insert: function(s, value, index) {
            if(!s) {
                return value;
            }

            if(!value) {
                return s;
            }

            var len = s.length;

            if(!index && index !== 0) {
                index = len;
            }

            if(index < 0) {
                index *= -1;
                if(index >= len) {
                    index = 0;
                }
                else {
                    index = len - index;
                }
            }

            if(index === 0) {
                s = value + s;
            }
            else if(index >= s.length) {
                s += value;
            }
            else {
                s = s.substr(0, index) + value + s.substr(index);
            }
            return s;
        },
        startsWith: function(s, start, ignoreCase) {
            var result = boundsCheck(s, start);

            if(result) {
                if(ignoreCase) {
                    s = s.toLowerCase();
                    start = start.toLowerCase();
                }
                result = s.lastIndexOf(start, 0) === 0;
            }
            return result;
        },
        endsWith: function(s, end, ignoreCase) {
            var result = boundsCheck(s, end);

            if(result) {
                if(ignoreCase) {
                    s = s.toLowerCase();
                    end = end.toLowerCase();
                }
                result = s.indexOf(end, s.length - end.length) !== -1;
            }
            return result;
        },
        createVarName: function(s) {
            return s.replace(varReplace, '');
        },
        htmlEncode: function(value) {
            return !value ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
        },
        htmlDecode: function(value) {
            return !value ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
        },
        hasHtmlCharacters: function(s) {
            return charToEntityRegex.test(s);
        },
        addCharacterEntities: function(newEntities) {
            var charKeys = [];
            var entityKeys = [];
            for(var key in newEntities) {
                var echar = newEntities[key];
                entityToChar[key] = echar;
                charToEntity[echar] = key;
                charKeys.push(echar);
                entityKeys.push(key);
            }
            charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
            entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};)', 'g');
        },
        resetCharacterEntities: function() {
            charToEntity = {};
            entityToChar = {};
            this.addCharacterEntities({
                '&amp;': '&',
                '&gt;': '>',
                '&lt;': '<',
                '&quot;': '"',
                '&#39;': '\''
            });
        },
        urlAppend: function(url, string) {
            if(!util.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },
        trim: function(string) {
            if(string) {
                string = string.replace(trimRegex, '');
            }
            return string || '';
        },
        capitalize: function(string) {
            if(string) {
                string = string.charAt(0).toUpperCase() + string.substr(1);
            }
            return string || '';
        },
        uncapitalize: function(string) {
            if(string) {
                string = string.charAt(0).toLowerCase() + string.substr(1);
            }
            return string || '';
        },
        ellipsis: function(value, length, word) {
            if(value && value.length > length) {
                if(word) {
                    var vs = value.substr(0, length - 2);
                    var index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                    if(index !== -1 && index >= length - 15) {
                        return vs.substr(0, index) + '...';
                    }
                }
                return value.substr(0, length - 3) + '...';
            }
            return value;
        },
        escapeRegex: function(string) {
            return string.replace(escapeRegexRe, '\\$1');
        },
        createRegex: function(value, startsWith, endsWith, ignoreCase) {
            var ret = value;

            if(value != null && !value.exec) {
                ret = utilString.escapeRegex(String(value));

                if(startsWith !== false) {
                    ret = '^' + ret;
                }
                if(endsWith !== false) {
                    ret += '$';
                }

                ret = new RegExp(ret, ignoreCase !== false ? 'i' : '');
            }

            return ret;
        },
        escape: function(string) {
            return string.replace(escapeRe, '\\$1');
        },
        toggle: function(string, value, other) {
            return string === value ? other : value;
        },
        leftPad: function(string, size, character) {
            var result = String(string);
            character = character || ' ';
            while(result.length < size) {
                result = character + result;
            }
            return result;
        },
        repeat: function(pattern, count, sep) {
            if(count < 1) {
                count = 0;
            }
            for(var buf = [], i = count; i--;) {
                buf.push(pattern);
            }
            return buf.join(sep || '');
        },
        splitWords: function(words) {
            if(words && typeof words == 'string') {
                return words.replace(basicTrimRe, '').split(whitespaceRe);
            }
            return words || [];
        }
    };
}();

util.String.resetCharacterEntities();

util.htmlEncode = util.String.htmlEncode;
util.htmlDecode = util.String.htmlDecode;
util.urlAppend = util.String.urlAppend;

util.Format = function() {
    return {
        thousandSeparator: ',',
        decimalSeparator: '.',
        currencyPrecision: 2,
        currencySign: '$',
        currencySpacer: '',
        percentSign: '%',
        currencyAtEnd: false,
        stripTagsRe: /<\/?[^>]+>/gi,
        stripScriptsRe: /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        nl2brRe: /\r?\n/g,
        hashRe: /#+$/,
        formatPattern: /[\d,\.#]+/,
        formatCleanRe: /[^\d\.#]/g,
        I18NFormatCleanRe: null,
        formatFns: {},
        nbsp: function(value, strict) {
            strict = strict !== false;

            if(strict ? value === '' || value == null : !value) {
                value = '\xA0';
            }

            return value;
        },
        undef: function(value) {
            return value !== undefined ? value : '';
        },
        defaultValue: function(value, defaultValue) {
            return value !== undefined && value !== '' ? value : defaultValue;
        },
        substr: 'ab'.substr(-1) != 'b' ? function(value, start, length) {
            var str = String(value);
            return start < 0 ? str.substr(Math.max(str.length + start, 0), length) : str.substr(start, length);
        } : function(value, start, length) {
            return String(value).substr(start, length);
        },
        lowercase: function(value) {
            return String(value).toLowerCase();
        },
        uppercase: function(value) {
            return String(value).toUpperCase();
        },
        usMoney: function(value) {
            return this.currency(value, '$', 2);
        },
        currency: function(value, currencySign, decimals, end, currencySpacer) {
            var negativeSign = '';
            var format = ',0';
            value = value - 0;
            if(value < 0) {
                value = -value;
                negativeSign = '-';
            }
            decimals = util.isDefined(decimals) ? decimals : this.currencyPrecision;
            format += decimals > 0 ? '.' : '';
            for(var i = 0; i < decimals; i++) {
                format += '0';
            }
            value = this.number(value, format);

            if(currencySpacer == null) {
                currencySpacer = this.currencySpacer;
            }

            if((end || this.currencyAtEnd) === true) {
                return util.String.format('{0}{1}{2}{3}', negativeSign, value, currencySpacer, currencySign || this.currencySign);
            }
            return util.String.format('{0}{1}{2}{3}', negativeSign, currencySign || this.currencySign, currencySpacer, value);
        },
        date: function(value, format) {
            if(!value) {
                return '';
            }
            if(!util.isDate(value)) {
                value = new Date(Date.parse(value));
            }
            return util.Date.dateFormat(value, format || util.Date.defaultFormat);
        },
        dateRenderer: function(format) {
            return function(v) {
                return this.date(v, format);
            };
        },
        hex: function(value, digits) {
            var s = parseInt(value || 0, 10).toString(16);
            if(digits) {
                if(digits < 0) {
                    digits = -digits;
                    if(s.length > digits) {
                        s = s.substr(s.length - digits);
                    }
                }
                while(s.length < digits) {
                    s = '0' + s;
                }
            }
            return s;
        },
        or: function(value, orValue) {
            return value || orValue;
        },
        pick: function(value, firstValue, secondValue) {
            if(util.isNumber(value)) {
                var ret = arguments[value + 1];
                if(ret) {
                    return ret;
                }
            }
            return value ? secondValue : firstValue;
        },
        lessThanElse: function(value, threshold, below, above, equal) {
            var v = util.Number.from(value, 0);
            var t = util.Number.from(threshold, 0);
            var missing = !util.isDefined(equal);

            return v < t ? below : (v > t ? above : (missing ? above : equal));
        },
        sign: function(value, negative, positive, zero) {
            if(zero === undefined) {
                zero = positive;
            }
            return this.lessThanElse(value, 0, negative, positive, zero);
        },
        stripTags: function(value) {
            return !value ? value : String(value).replace(this.stripTagsRe, '');
        },
        stripScripts: function(value) {
            return !value ? value : String(value).replace(this.stripScriptsRe, '');
        },
        fileSize: function() {
            var byteLimit = 1024;
            var kbLimit = 1048576;
            var mbLimit = 1073741824;

            return function(size) {
                var out;
                if(size < byteLimit) {
                    if(size === 1) {
                        out = '1 byte';
                    }
                    else {
                        out = size + ' bytes';
                    }
                }
                else if(size < kbLimit) {
                    out = Math.round(size * 10 / byteLimit) / 10 + ' KB';
                }
                else if(size < mbLimit) {
                    out = Math.round(size * 10 / kbLimit) / 10 + ' MB';
                }
                else {
                    out = Math.round(size * 10 / mbLimit) / 10 + ' GB';
                }
                return out;
            };
        }(),
        math: function() {
            var fns = {};

            return function(v, a) {
                if(!fns[a]) {
                    fns[a] = util.functionFactory('v', 'return v ' + a + ';');
                }
                return fns[a](v);
            };
        }(),
        round: function(value, precision) {
            var result = Number(value);
            if(typeof precision === 'number') {
                precision = Math.pow(10, precision);
                result = Math.round(value * precision) / precision;
            }
            else if(precision === undefined) {
                result = Math.round(result);
            }
            return result;
        },
        number: function(v, formatString) {
            if(!formatString) {
                return v;
            }
            if(isNaN(v)) {
                return '';
            }

            var formatFn = this.formatFns[formatString];

            if(!formatFn) {
                var originalFormatString = formatString;
                var comma = this.thousandSeparator;
                var decimalSeparator = this.decimalSeparator;
                var precision = 0;
                var trimPart = '';
                var hasComma;
                var splitFormat;
                var trimTrailingZeroes;

                if(formatString.substr(formatString.length - 2) === '/i') {
                    if(!this.I18NFormatCleanRe || this.lastDecimalSeparator !== decimalSeparator) {
                        this.I18NFormatCleanRe = new RegExp('[^\\d\\' + decimalSeparator + '#]', 'g');
                        this.lastDecimalSeparator = decimalSeparator;
                    }
                    formatString = formatString.substr(0, formatString.length - 2);
                    hasComma = formatString.indexOf(comma) !== -1;
                    splitFormat = formatString.replace(this.I18NFormatCleanRe, '').split(decimalSeparator);
                }
                else {
                    hasComma = formatString.indexOf(',') !== -1;
                    splitFormat = formatString.replace(this.formatCleanRe, '').split('.');
                }
                var extraChars = formatString.replace(this.formatPattern, '');

                if(splitFormat.length === 2) {
                    precision = splitFormat[1].length;

                    trimTrailingZeroes = splitFormat[1].match(this.hashRe);
                    if(trimTrailingZeroes) {
                        var len = trimTrailingZeroes[0].length;
                        trimPart = ', trailingZeroes = new RegExp(util.String.escapeRegex(utilFormat.decimalSeparator) + \'*0{0,' + len + '}$\')';
                    }
                }

                var code = ['var utilFormat = util.Format, utilNumber = util.Number' + (hasComma ? ', thousands = []' : '') + (extraChars ? ', formatString = \'' + formatString + '\', formatPattern = /[\\d,\\.#]+/' : '') + '; return function(v) { if(typeof v !== \'number\' && isNaN(v = utilNumber.from(v, NaN))) { return \'\'; } var neg = v < 0', ', absVal = Math.abs(v)', ', fnum = util.Number.toFixed(absVal, ' + precision + ')', trimPart, ';'];

                if(hasComma) {
                    if(precision) {
                        code[code.length] = 'var parts = fnum.split(\'.\');';
                        code[code.length] = 'fnum = parts[0];';
                    }
                    code[code.length] = 'if(absVal >= 1000) {';
                    code[code.length] = 'var thousandSeparator = utilFormat.thousandSeparator; thousands.length = 0; for(var j = fnum.length, n = fnum.length % 3 || 3, i = 0; i < j; i += n) { if(i !== 0) { n = 3; } thousands[thousands.length] = fnum.substr(i, n); } fnum = thousands.join(thousandSeparator); }';
                    if(precision) {
                        code[code.length] = 'fnum += utilFormat.decimalSeparator + parts[1];';
                    }
                }
                else if(precision) {
                    code[code.length] = 'if(utilFormat.decimalSeparator !== \'.\') { var parts = fnum.split(\'.\'); fnum = parts[0] + utilFormat.decimalSeparator + parts[1]; }';
                }

                code[code.length] = 'if(neg && fnum !== \'' + (precision ? '0.' + util.String.repeat('0', precision) : '0') + '\') { fnum = \'-\' + fnum; }';

                if(trimTrailingZeroes) {
                    code[code.length] = 'fnum = fnum.replace(trailingZeroes, \'\');';
                }

                code[code.length] = 'return ';

                if(extraChars) {
                    code[code.length] = 'formatString.replace(formatPattern, fnum);';
                }
                else {
                    code[code.length] = 'fnum;';
                }
                code[code.length] = '};';

                formatFn = this.formatFns[originalFormatString] = util.functionFactory('util', code.join(''))(util);
            }
            return formatFn(v);
        },
        numberRenderer: function(format) {
            return function(v) {
                return this.number(v, format);
            };
        },
        percent: function(value, formatString) {
            return this.number(value * 100, formatString || '0') + this.percentSign;
        },
        repeat: function(value, text, sep) {
            return util.String.repeat(text, value, sep);
        },
        plural: function(value, singular, plural) {
            return value + ' ' + (value === 1 ? singular : (plural ? plural : singular + 's'));
        },
        nl2br: function(v) {
            return util.isEmpty(v) ? '' : v.replace(this.nl2brRe, '<br>');
        },
        capitalize: util.String.capitalize,
        uncapitalize: util.String.uncapitalize,
        ellipsis: util.String.ellipsis,
        escape: util.String.escape,
        escapeRegex: util.String.escapeRegex,
        htmlDecode: util.String.htmlDecode,
        htmlEncode: util.String.htmlEncode,
        leftPad: util.String.leftPad,
        toggle: util.String.toggle,
        trim: util.String.trim,
        parseBox: function(box) {
            box = box || 0;

            if(typeof box === 'number') {
                return {
                    top: box,
                    right: box,
                    bottom: box,
                    left: box
                };
            }

            var parts = box.split(' ');
            var ln = parts.length;

            if(ln === 1) {
                parts[1] = parts[2] = parts[3] = parts[0];
            }
            else if(ln === 2) {
                parts[2] = parts[0];
                parts[3] = parts[1];
            }
            else if(ln === 3) {
                parts[3] = parts[1];
            }

            return {
                top: parseInt(parts[0], 10) || 0,
                right: parseInt(parts[1], 10) || 0,
                bottom: parseInt(parts[2], 10) || 0,
                left: parseInt(parts[3], 10) || 0
            };
        },
        uri: function(value) {
            return encodeURI(value);
        },
        uriCmp: function(value) {
            return encodeURIComponent(value);
        },
        wordBreakRe: /[\W\s]+/,
        word: function(value, index, sep) {
            var re = sep ? (typeof sep === 'string' ? new RegExp(sep) : sep) : this.wordBreakRe;
            var parts = (value || '').split(re);

            return parts[index || 0] || '';
        }
    };
}();

(function() {
    var formatRe = /\{\d+\}/;
    var generateFormatFn = function(format) {
        if(formatRe.test(format)) {
            util.each(arguments, function(item, index, allItems) {
                format = format.replace(new RegExp('\\{' + index + '\\}', 'g'), allItems[index + 1]);
            });
        }
        return function() {
            return format;
        };
    };
    var formatFns = {};

    util.String.format = util.Format.format = function(format) {
        // var formatFn = formatFns[format] || (formatFns[format] = generateFormatFn.apply(this, arguments));
        var formatFn = formatFns[format] = generateFormatFn.apply(this, arguments);
        return formatFn.apply(this, arguments);
    };

    util.String.formatEncode = function() {
        return util.String.htmlEncode(util.String.format.apply(this, arguments));
    };
}());

util.Function = function() {
    var global = util.global;

    var utilFunction = {
        flexSetter: function(setter) {
            var k;

            return function(name, value) {
                if(name !== null) {
                    if(typeof name !== 'string') {
                        for(k in name) {
                            if(name.hasOwnProperty(k)) {
                                setter.call(this, k, name[k]);
                            }
                        }

                        if(util.enumerables) {
                            for(var i = util.enumerables.length; i--;) {
                                k = util.enumerables[i];
                                if(name.hasOwnProperty(k)) {
                                    setter.call(this, k, name[k]);
                                }
                            }
                        }
                    }
                    else {
                        setter.call(this, name, value);
                    }
                }

                return this;
            };
        },
        bind: function(fn, scope, args, appendArgs) {
            if(arguments.length <= 2) {
                return fn.bind(scope);
            }

            var method = fn;

            return function() {
                var callArgs = args || arguments;

                if(appendArgs === true) {
                    callArgs = slice.call(arguments, 0);
                    callArgs = callArgs.concat(args);
                }
                else if(typeof appendArgs === 'number') {
                    callArgs = slice.call(arguments, 0);
                    util.Array.insert(callArgs, appendArgs, args);
                }

                return method.apply(scope || global, callArgs);
            };
        },
        pass: function(fn, args, scope) {
            if(!util.isArray(args)) {
                if(util.isIterables(args)) {
                    args = util.Array.clone(args);
                }
                else {
                    args = args !== undefined ? [args] : [];
                }
            }

            return function() {
                var fnArgs = args.slice();
                fnArgs.push.apply(fnArgs, arguments);
                return fn.apply(scope || this, fnArgs);
            };
        },
        alias: function(object, methodName) {
            return function() {
                return object[methodName].apply(object, arguments);
            };
        },
        clone: function(method) {
            var newMethod = function() {
                return method.apply(this, arguments);
            };

            for(var prop in method) {
                if(method.hasOwnProperty(prop)) {
                    newMethod[prop] = method[prop];
                }
            }

            return newMethod;
        },
        createInterceptor: function(origFn, newFn, scope, returnValue) {
            if(!util.isFunction(newFn)) {
                return origFn;
            }
            returnValue = util.isDefined(returnValue) ? returnValue : null;

            return function() {
                var me = this;
                var args = arguments;

                return newFn.apply(scope || me || global, args) !== false ? origFn.apply(me || global, args) : returnValue;
            };
        },
        createSequence: function(originalFn, newFn, scope) {
            if(!newFn) {
                return originalFn;
            }
            return function() {
                var result = originalFn.apply(this, arguments);
                newFn.apply(scope || this, arguments);
                return result;
            };
        },
        interceptBefore: function(object, methodName, fn, scope) {
            var method = object[methodName] || util.emptyFn;

            return (object[methodName] = function() {
                var ret = fn.apply(scope || this, arguments);
                method.apply(this, arguments);

                return ret;
            });
        },
        interceptAfter: function(object, methodName, fn, scope) {
            var method = object[methodName] || util.emptyFn;

            return (object[methodName] = function() {
                method.apply(this, arguments);
                return fn.apply(scope || this, arguments);
            });
        },
        interceptAfterOnce: function(object, methodName, fn, scope) {
            var origMethod = object[methodName];

            var newMethod = function() {
                if(origMethod) {
                    origMethod.apply(this, arguments);
                }

                var ret = fn.apply(scope || this, arguments);

                object[methodName] = origMethod;
                object = methodName = fn = scope = origMethod = newMethod = null;

                return ret;
            };

            object[methodName] = newMethod;

            return newMethod;
        },
        memoize: function(fn, scope, hashFn) {
            var memo = {};
            var isFunc = hashFn && util.isFunction(hashFn);

            return function(value) {
                var key = isFunc ? hashFn.apply(scope, arguments) : value;

                if(!(key in memo)) {
                    memo[key] = fn.apply(scope, arguments);
                }

                return memo[key];
            };
        },
        _stripCommentRe: /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g,
        toCode: function(fn) {
            var s = fn ? fn.toString() : '';

            s = s.replace(utilFunction._stripCommentRe, '');

            return s;
        }
    };

    util.pass = utilFunction.pass;
    util.bind = utilFunction.bind;

    return utilFunction;
}();

util.USE_NATIVE_JSON = false;

util.JSON = new function() {
    var me = this;

    var hasNative = window.JSON && JSON.toString() === '[object JSON]';
    var useHasOwn = !!{}.hasOwnProperty;
    var pad = function(n) {
        return n < 10 ? '0' + n : n;
    };
    var doDecode = function(json) {
        return eval('(' + json + ')');
    };
    var doEncode = function(o, newline) {
        if(o === null || o === undefined || typeof o === 'function') {
            return 'null';
        }
        if(util.isDate(o)) {
            return me.encodeDate(o);
        }
        if(util.isString(o)) {
            if(util.isMSDate(o)) {
                return me.encodeMSDate(o);
            }
            return me.encodeString(o);
        }
        if(typeof o === 'number') {
            return isFinite(o) ? String(o) : 'null';
        }
        if(util.isBoolean(o)) {
            return String(o);
        }
        if(o.toJSON) {
            return o.toJSON();
        }
        if(util.isArray(o)) {
            return encodeArray(o, newline);
        }
        if(util.isObject(o)) {
            return encodeObject(o, newline);
        }
        return 'undefined';
    };
    var m = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\',
        '\x0b': '\\u000b'
    };
    var charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g;
    var encodeString = function(s) {
        return '"' + s.replace(charToReplace, function(a) {
            var c = m[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"';
    };
    var encodeMSDate = function(o) {
        return '"' + o + '"';
    };

    var encodeArrayPretty = function(o, newline) {
        var cnewline = newline + '   ';
        var sep = ',' + cnewline;
        var a = ['[', cnewline];

        for(var len = o.length, i = 0; i < len; i++) {
            a.push(me.encodeValue(o[i], cnewline), sep);
        }

        a[a.length - 1] = newline + ']';

        return a.join('');
    };

    var encodeObjectPretty = function(o, newline) {
        var cnewline = newline + '   ';
        var sep = ',' + cnewline;
        var a = ['{', cnewline];

        for(var i in o) {
            var val = o[i];
            if(!useHasOwn || o.hasOwnProperty(i)) {
                if(typeof val === 'function' || val === undefined || val.isInstance) {
                    continue;
                }
                a.push(me.encodeValue(i) + ': ' + me.encodeValue(val, cnewline), sep);
            }
        }

        a[a.length - 1] = newline + '}';

        return a.join('');
    };

    var encodeArray = function(o, newline) {
        if(newline) {
            return encodeArrayPretty(o, newline);
        }

        var a = ['[', ''];
        for(var len = o.length, i = 0; i < len; i++) {
            a.push(me.encodeValue(o[i]), ',');
        }
        a[a.length - 1] = ']';
        return a.join('');
    };

    var encodeObject = function(o, newline) {
        if(newline) {
            return encodeObjectPretty(o, newline);
        }

        var a = ['{', ''];
        for(var i in o) {
            var val = o[i];
            if(!useHasOwn || o.hasOwnProperty(i)) {
                if(typeof val === 'function' || val === undefined) {
                    continue;
                }
                a.push(me.encodeValue(i), ':', me.encodeValue(val), ',');
            }
        }
        a[a.length - 1] = '}';
        return a.join('');
    };

    me.encodeString = encodeString;

    me.encodeValue = doEncode;

    me.encodeDate = function(o) {
        return '"' + o.getFullYear() + '-' + pad(o.getMonth() + 1) + '-' + pad(o.getDate()) + 'T' + pad(o.getHours()) + ':' + pad(o.getMinutes()) + ':' + pad(o.getSeconds()) + '"';
    };

    me.encode = function(o) {
        if(hasNative && util.USE_NATIVE_JSON) {
            return JSON.stringify(o);
        }
        return me.encodeValue(o);
    };

    me.decode = function(json, safe) {
        try {
            if(hasNative && util.USE_NATIVE_JSON) {
                return JSON.parse(json);
            }
            return doDecode(json);
        }
        catch(e) {
            if(safe) {
                return null;
            }
        }
    }

    me.encodeMSDate = encodeMSDate;

    util.encode = me.encode;
    util.decode = me.decode;
}();


util.Number = new function() {
    var utilNumber = this;
    var isToFixedBroken = 0.9.toFixed() !== '1';
    var math = Math;
    var ClipDefault = {
        count: false,
        inclusive: false,
        wrap: true
    };

    // Number.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -(math.pow(2, 53) - 1);
    // Number.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || math.pow(2, 53) - 1;

    util.apply(utilNumber, {
        floatRe: /^[-+]?(?:\d+|\d*\.\d*)(?:[Ee][+-]?\d+)?$/,
        intRe: /^[-+]?\d+(?:[Ee]\+?\d+)?$/,
        parseFloat: function(value) {
            if(value === undefined) {
                value = null;
            }

            if(value !== null && typeof value !== 'number') {
                value = String(value);
                value = utilNumber.floatRe.test(value) ? +value : null;
                if(isNaN(value)) {
                    value = null;
                }
            }

            return value;
        },
        numFormat: function(value) {
            var vArr;
            if(value != undefined) {
                var decPlc = '';
                if(!Number.isInteger(value) && value.toString().indexOf('.') != -1) {
                    if(typeof value === 'string'){
                        vArr = value.split('.');
                    }else{
                        vArr = value.toString().split('.');
                    }
                    value = vArr[0];
                    decPlc = vArr[1];

                }

                var val = value.toString().replace(/,/g, '');
                val = (val == '' ? 0 : parseInt(val));
                val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                if(decPlc != '') {
                    if(val == undefined) {
                        return 0+'.'+decPlc;
                    }
                    else {
                        return val+'.'+decPlc;
                    }
                }

                return (val == undefined ? 0 : val);
            }
            else {
                return 0;
            }
        },
        parseInt: function(value) {
            if(value === undefined) {
                value = null;
            }

            if(typeof value === 'number') {
                value = Math.floor(value);
            }
            else if(value !== null) {
                value = String(value);
                value = utilNumber.intRe.test(value) ? +value : null;
            }

            return value;
        },
        binarySearch: function(array, value, begin, end) {
            if(begin === undefined) {
                begin = 0;
            }
            if(end === undefined) {
                end = array.length;
            }

            --end;

            while(begin <= end) {
                var middle = begin + end >>> 1;
                var midVal = array[middle];

                if(value === midVal) {
                    return middle;
                }
                if(midVal < value) {
                    begin = middle + 1;
                }
                else {
                    end = middle - 1;
                }
            }

            return begin;
        },
        bisectTuples: function(array, value, index, begin, end) {
            if(begin === undefined) {
                begin = 0;
            }
            if(end === undefined) {
                end = array.length;
            }

            --end;

            while(begin <= end) {
                var middle = begin + end >>> 1;
                var midVal = array[middle][index];

                if(value === midVal) {
                    return middle;
                }
                if(midVal < value) {
                    begin = middle + 1;
                }
                else {
                    end = middle - 1;
                }
            }

            return begin;
        },
        clipIndices: function(length, indices, options) {
            options = options || ClipDefault;

            var defaultValue = 0;
            var wrap = options.wrap;
            var begin;
            var end;

            for(var i = 0; i < 2; ++i) {
                begin = end;
                end = indices[i];
                if(end == null) {
                    end = defaultValue;
                }
                else if(i && options.count) {
                    end += begin;
                    end = end > length ? length : end;
                }
                else {
                    if(wrap) {
                        end = end < 0 ? length + end : end;
                    }
                    if(i && options.inclusive) {
                        ++end;
                    }
                    end = end < 0 ? 0 : (end > length ? length : end);
                }
                defaultValue = length;
            }

            indices[0] = begin;
            indices[1] = end < begin ? begin : end;
            return indices;
        },
        constrain: function(number, min, max) {
            var x = parseFloat(number);

            if(min === null) {
                min = number;
            }

            if(max === null) {
                max = number;
            }

            return x < min ? min : (x > max ? max : x);
        },
        snap: function(value, increment, minValue, maxValue) {
            if(value === undefined || value < minValue) {
                return minValue || 0;
            }

            if(increment) {
                var m = value % increment;
                if(m !== 0) {
                    value -= m;
                    if(m * 2 >= increment) {
                        value += increment;
                    }
                    else if(m * 2 < -increment) {
                        value -= increment;
                    }
                }
            }
            return utilNumber.constrain(value, minValue, maxValue);
        },
        snapInRange: function(value, increment, minValue, maxValue) {
            var tween;

            minValue = minValue || 0;

            if(value === undefined || value < minValue) {
                return minValue;
            }

            if(increment && (tween = (value - minValue) % increment)) {
                value -= tween;
                tween *= 2;
                if(tween >= increment) {
                    value += increment;
                }
            }

            if(maxValue !== undefined && value > (maxValue = utilNumber.snapInRange(maxValue, increment, minValue))) {
                value = maxValue;
            }

            return value;
        },
        roundToNearest: function(value, interval) {
            interval = interval || 1;
            return interval * math.round(value / interval);
        },
        roundToPrecision: function(value, precision) {
            var factor = math.pow(10, precision || 1);

            return math.round(value * factor) / factor;
        },
        truncateToPrecision: function(value, precision) {
            var factor = math.pow(10, precision || 1);

            return parseInt(value * factor, 10) / factor;
        },
        sign: math.sign || function(x) {
            x = +x;

            if(x === 0 || isNaN(x)) {
                return x;
            }

            return x > 0 ? 1 : -1;
        },
        log10: math.log10 || function(x) {
            return math.log(x) * math.LOG10E;
        },
        isEqual: function(n1, n2, epsilon) {
            return math.abs(n1 - n2) < epsilon;
        },
        isFinite: Number.isFinite || function(value) {
            return typeof value === 'number' && isFinite(value);
        },
        isInteger: Number.isInteger || function(value) {
            // return ~~(value + 0) === value;
            return utilNumber.isFinite(value) && Math.floor(value) === value;
        },
        toFixed: isToFixedBroken ? function(value, precision) {
            precision = precision || 0;
            var pow = math.pow(10, precision);
            return (math.round(value * pow) / pow).toFixed(precision);
        } : function(value, precision) {
            return value.toFixed(precision);
        },
        from: function(value, defaultValue) {
            if(isFinite(value)) {
                value = parseFloat(value);
            }

            return !isNaN(value) ? value : defaultValue;
        },
        randomInt: function(from, to) {
            return math.floor(math.random() * (to - from + 1) + from);
        },
        correctFloat: function(n) {
            return parseFloat(n.toPrecision(14));
        }
    });

    util.num = function() {
        return utilNumber.from.apply(this, arguments);
    };
}();


export default util;
