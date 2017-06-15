(function ()
{
	var module = {};
	
	(function (module)
	{
		'use strict';


/**
 * @class Namespace
 * @param {*=} root
 */
function Namespace(root)
{
	this._root = root || {};
}


/**
 * @return {*}
 * @private
 */
Namespace.prototype._getContainer = function ()
{
	if (typeof window !== 'undefined')
	{
		return window;
	}
	
	return {};
};

/**
 * @param {{}} namespace
 * @param {Array<string>} path
 * @return {{}}
 * @private
 */
Namespace.prototype._create = function (namespace, path)
{
	for (var i = 0; i < path.length; i++)
	{
		var name = path[i];
		namespace[name] = {};
		namespace = namespace[name];
	}
	
	return namespace;
};

/**
 * @param {string} namespace
 * @param {function(Object, Array<string>)} onUndefined
 * @return {{}}
 */
Namespace.prototype._walk = function (namespace, onUndefined)
{
	var name;
	var path	= namespace.split('.');
	var current = this._root;
	
	for (var i = 0; i < path.length; i++)
	{
		name = path[i];

		if (typeof current[name] === 'undefined')
		{
			return onUndefined(current, path.splice(i));
		}

		current = current[name];
	}
	
	return current;
};


/**
 * @return {{}}
 */
Namespace.prototype.root = function ()
{
	return this._root;
};

/**
 * @param {string} namespace
 * @return {{}}
 */
Namespace.prototype.get = function (namespace)
{
	if (typeof namespace === 'undefined' || namespace === '')
	{
		return this._root;
	}
	
	return this._walk(namespace, this._create.bind(this));
};

/**
 * @param {string} namespace
 * @param {function()=} scope
 */
Namespace.prototype.namespace = function (namespace, scope)
{
	var namespaceObject = this.get(namespace);
	
	if (scope)
	{ 
		scope.call(namespaceObject, this._root);
	}
	
	return namespaceObject;
};

/**
 * @param {string} namespace
 * @return {boolean}
 */
Namespace.prototype.isSet = function (namespace)
{
	if (typeof namespace === 'undefined' || namespace === '')
	{
		return true;
	}
	
	return (this._walk(namespace, function() { return false; }) !== false);
};

/**
 * @return {function(string, function()=)} Returns the namespace method binded to this object. 
 */
Namespace.prototype.getCreator = function()
{
	return this.namespace.bind(this);
};


module.exports = Namespace;
	})(module);
	
	var ns = new module.exports(window);
	window.namespace = (ns.getCreator());
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJOYW1lc3BhY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuICogQGNsYXNzIE5hbWVzcGFjZVxuICogQHBhcmFtIHsqPX0gcm9vdFxuICovXG5mdW5jdGlvbiBOYW1lc3BhY2Uocm9vdClcbntcblx0dGhpcy5fcm9vdCA9IHJvb3QgfHwge307XG59XG5cblxuLyoqXG4gKiBAcmV0dXJuIHsqfVxuICogQHByaXZhdGVcbiAqL1xuTmFtZXNwYWNlLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gKClcbntcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHR7XG5cdFx0cmV0dXJuIHdpbmRvdztcblx0fVxuXHRcblx0cmV0dXJuIHt9O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3t9fSBuYW1lc3BhY2VcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gcGF0aFxuICogQHJldHVybiB7e319XG4gKiBAcHJpdmF0ZVxuICovXG5OYW1lc3BhY2UucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBwYXRoKVxue1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspXG5cdHtcblx0XHR2YXIgbmFtZSA9IHBhdGhbaV07XG5cdFx0bmFtZXNwYWNlW25hbWVdID0ge307XG5cdFx0bmFtZXNwYWNlID0gbmFtZXNwYWNlW25hbWVdO1xuXHR9XG5cdFxuXHRyZXR1cm4gbmFtZXNwYWNlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCwgQXJyYXk8c3RyaW5nPil9IG9uVW5kZWZpbmVkXG4gKiBAcmV0dXJuIHt7fX1cbiAqL1xuTmFtZXNwYWNlLnByb3RvdHlwZS5fd2FsayA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG9uVW5kZWZpbmVkKVxue1xuXHR2YXIgbmFtZTtcblx0dmFyIHBhdGhcdD0gbmFtZXNwYWNlLnNwbGl0KCcuJyk7XG5cdHZhciBjdXJyZW50ID0gdGhpcy5fcm9vdDtcblx0XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKylcblx0e1xuXHRcdG5hbWUgPSBwYXRoW2ldO1xuXG5cdFx0aWYgKHR5cGVvZiBjdXJyZW50W25hbWVdID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRyZXR1cm4gb25VbmRlZmluZWQoY3VycmVudCwgcGF0aC5zcGxpY2UoaSkpO1xuXHRcdH1cblxuXHRcdGN1cnJlbnQgPSBjdXJyZW50W25hbWVdO1xuXHR9XG5cdFxuXHRyZXR1cm4gY3VycmVudDtcbn07XG5cblxuLyoqXG4gKiBAcmV0dXJuIHt7fX1cbiAqL1xuTmFtZXNwYWNlLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKClcbntcblx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge3t9fVxuICovXG5OYW1lc3BhY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UpXG57XG5cdGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAndW5kZWZpbmVkJyB8fCBuYW1lc3BhY2UgPT09ICcnKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdH1cblx0XG5cdHJldHVybiB0aGlzLl93YWxrKG5hbWVzcGFjZSwgdGhpcy5fY3JlYXRlLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCk9fSBzY29wZVxuICovXG5OYW1lc3BhY2UucHJvdG90eXBlLm5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIHNjb3BlKVxue1xuXHR2YXIgbmFtZXNwYWNlT2JqZWN0ID0gdGhpcy5nZXQobmFtZXNwYWNlKTtcblx0XG5cdGlmIChzY29wZSlcblx0eyBcblx0XHRzY29wZS5jYWxsKG5hbWVzcGFjZU9iamVjdCwgdGhpcy5fcm9vdCk7XG5cdH1cblx0XG5cdHJldHVybiBuYW1lc3BhY2VPYmplY3Q7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbk5hbWVzcGFjZS5wcm90b3R5cGUuaXNTZXQgPSBmdW5jdGlvbiAobmFtZXNwYWNlKVxue1xuXHRpZiAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmFtZXNwYWNlID09PSAnJylcblx0e1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdFxuXHRyZXR1cm4gKHRoaXMuX3dhbGsobmFtZXNwYWNlLCBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KSAhPT0gZmFsc2UpO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcsIGZ1bmN0aW9uKCk9KX0gUmV0dXJucyB0aGUgbmFtZXNwYWNlIG1ldGhvZCBiaW5kZWQgdG8gdGhpcyBvYmplY3QuIFxuICovXG5OYW1lc3BhY2UucHJvdG90eXBlLmdldENyZWF0b3IgPSBmdW5jdGlvbigpXG57XG5cdHJldHVybiB0aGlzLm5hbWVzcGFjZS5iaW5kKHRoaXMpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVzcGFjZTsiXSwiZmlsZSI6Ik5hbWVzcGFjZS5qcyJ9

namespace('Classy', function() 
{
	/**
	 * @class Classy.Enum
	 * @alias Enum
	 * 
	 * @property {function(): Array<string>} getAllKeys
	 * @property {function(): Array<string>} getAllValues
	 * @property {function(string): boolean} hasKey
	 * @property {function(string): boolean} hasValue
	 * @property {function(): number} count
	 * @property {function(function(string, string))} forEach
	 */
	
	
	/**
	 * @template T
	 * 
	 * @param {T} target
	 * @return {T}
	 */
	this.Enum = function (target)
	{
		var keys		= [];
		var values		= [];
		var map			= {};
		var mapValues	= {};
		var count		= 0;
		
		
		for (var key in target) {
			if (target.hasOwnProperty(key) && !(target[key] instanceof Object)) {
				keys.push(key);
				map[key] = true;
				
				values.push(target[key]);
				mapValues[target[key]] = true;
				
				count++;
			}
		}
		
		
		//noinspection JSUndefinedPropertyAssignment
		target.getAllKeys = function () { return keys.concat(); };
		
		//noinspection JSUndefinedPropertyAssignment
		target.getAllValues = function () { return values.concat(); };
		
		//noinspection JSUndefinedPropertyAssignment
		target.hasKey = function(key) { return typeof map[key] !== 'undefined'; };
		
		//noinspection JSUndefinedPropertyAssignment
		target.hasValue = function(val) { return typeof mapValues[val] !== 'undefined'; };
		
		//noinspection JSUndefinedPropertyAssignment
		target.count = function() { return count; };
		
		//noinspection JSUndefinedPropertyAssignment
		target.forEach = function(callback)
		{
			for (var i = 0; i < count; i++)
			{
				if (callback(keys[i], values[i]) === false)
				{
					break;
				}
			}
		};
		
		
		return target;
	};
});
namespace('Classy', function()
{
	/**
	 * @name Classy.classify
	 * 
	 * @param {*} object
	 * @param {function()=} init
	 */
	this.classify = function classify(object, init) {
		for (var key in object) {
			if (typeof object[key] === 'function') {
				object[key] = object[key].bind(object);
			}
		}
		
		if (typeof init !== 'undefined') {
			init.call(object);
		}
		
		return object;
	};
});
namespace('OUI.core.view', function (window) 
{
	this.fadeRemove = function ($container, extraClass, delay)
	{
		extraClass = extraClass || 'removing';
		delay = delay || 200;

		$container.addClass(extraClass);

		setTimeout(function () {
			$container.remove();
		}, delay);
	};
});
namespace('OUI.core.view', function (window) 
{
	this.hbs = function (name, options)
	{
		options = options || {};

		return window.Handlebars['templates'][name].hbs(options);
	};
});
namespace('OUI.core.view', function (window) 
{
	this.idGenerator = function (baseName)
	{
		return baseName + '-' + Math.random().toString(36).substr(2);
	};
});
namespace('Plankton', function() {
	'use strict';
	
	
	var ARRAY_INDEX_REGEX = /^0$|^[1-9]\d*$/;
	var ARRAY_INDEX_MAX_VALUE = 4294967294;


	/**
	 * @class Plankton.is
	 * @alias is
	 * 
	 * @param subject
	 * @return {boolean}
	 */
	var is = function(subject) {
		return is.true(subject);
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.array = function(subject) {
		return Object.prototype.toString.call(subject) === '[object Array]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.array.empty = function(subject) {
		return is.array(subject) && subject.length === 0;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.array.notEmpty = function(subject) {
		return is.array(subject) && subject.length > 0;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.object = function(subject) {
		return Object.prototype.toString.call(subject) === '[object Object]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.object.empty = function(subject) {
		return is.object(subject) && Object.keys(subject).length === 0;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.object.notEmpty = function(subject) {
		return is.object(subject) && Object.keys(subject).length > 0;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.string = function(subject) {
		return Object.prototype.toString.call(subject) === '[object String]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.string.empty = function(subject) {
		return is.string(subject) && subject.length === 0;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.string.notEmpty = function(subject) {
		return is.string(subject) && subject.length > 0;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.numeric = function(subject) {
		return is.number(subject) && !is.infinite(subject) && !isNaN(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.numeric.int = function(subject) {
		return is.numeric(subject) && (subject % 1 === 0);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.numeric.float = function(subject) {
		return is.numeric(subject) && (subject % 1 !== 0);
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.numeric.odd = function(subject) {
		return is.numeric.int(subject) && (subject % 2 !== 0);
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.numeric.even = function(subject) {
		return is.numeric.int(subject) && (subject % 2 === 0);
	};
	
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.collection = function(subject) {
		return is.object(subject) || is.array(subject) || is.string(subject);
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.collection.empty = function(subject) {
		if (is.array(subject)) {
			return is.array.empty(subject);
		} else if (is.object(subject)) {
			return is.object.empty(subject);
		} else if (is.string(subject)) {
			return is.string.empty(subject)
		}
		
		return false;
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.collection.notEmpty = function(subject) {
		if (is.array(subject)) {
			return !is.array.empty(subject);
		} else if (is.object(subject)) {
			return !is.object.empty(subject);
		} else if (is.string(subject)) {
			return !is.string.empty(subject)
		}
		
		return false;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.number = function(subject) {
		return Object.prototype.toString.call(subject) === '[object Number]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.bool = function(subject) {
		return Object.prototype.toString.call(subject) === '[object Boolean]';
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.defined = function(subject) {
		return typeof subject !== 'undefined';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.undefined = function(subject) {
		return typeof subject === 'undefined';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.function = function(subject) {
		return Object.prototype.toString.call(subject) === '[object Function]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.NaN = function(subject) {
		return isNaN(subject) && Object.prototype.toString.call(subject) === '[object Number]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.infinite = function(subject) {
		return Number.POSITIVE_INFINITY === subject || Number.NEGATIVE_INFINITY === subject;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.null = function(subject) {
		return subject === null;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.jsObject = function(subject) {
		return subject instanceof Object;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.jsPrimitive = function(subject) {
		return !is.jsObject(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.empty = function(subject) {
		if (is.collection(subject)) {
			return is.collection.empty(subject);
		}
		
		throw 'Subject is not Array, Object or String';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.json = function(subject) {
		if (!is.string(subject)) {
			return false;
		}
		
		try {
			JSON.parse(subject);
			return true;
		} catch (e) {
			return false;
		}
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.false = function(subject) {
		return subject === false || 
			subject === 0 || 
			subject === null || 
			is.undefined(subject) || 
			is.collection.empty(subject) || 
			is.NaN(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.true = function(subject) {
		return !is.false(subject);
	};
	
	/**
	 * @param {*} subject
	 * @retrns {boolean}
	 */
	is.index = function(subject) {
		return ARRAY_INDEX_REGEX.test(subject) && subject <= ARRAY_INDEX_MAX_VALUE;
	};
	
	
	this.is = is;
});
namespace('OUI.core.pos', function (window) 
{
	var classify = window.Classy.classify;
	
	
	/**
	 * @class OUI.core.pos.Box
	 */
	var Box = function (point, size) 
	{
		classify(this);
		
		/** @type {OUI.core.pos.Point} */
		this._point = point;

		/** @type {OUI.core.pos.Point} */
		this._size = size;
	};	
	
	
	Box.prototype._debug = function () 
	{
		console.log(this.x(), this.y(), this.w(), this.h());	
	};
	
	Box.prototype._isIntersectHorizontal = function (x, w)
	{
		return !(this.x()+this.w() <= x || x+w <= this.x());
	};

	Box.prototype._isIntersectVertical = function (y, h)
	{
		return !(this.y()+this.h() <= y || y+h <= this.y());
	};
	
	Box.prototype._crossHorizontalBorder = function (x, w)
	{
		return ((this.x() < x) && (this.x() + this.w() > x))
			|| (((this.x() + this.w()) > (x + w)) && (this.x() > x));
	};

	Box.prototype._crossVerticalBorder = function (y, h)
	{
		return ((this.y() < y) && (this.y() + this.h() > y))
			|| ((this.y() + this.h() > y + h) && (this.y() > y));
	};
	
	Box.prototype._intersectHorizontal = function (x, w) 
	{
		if (x > this.x())
		{
			var widthSubtract = x - this.x();
			this._point.x = x;
			this._size.x -= widthSubtract > 0 ? widthSubtract : -widthSubtract; 
		}
		
		if ((x + w) < (this.x() + this.w()))
		{
			this._size.x = x + w - this.x();
		}
	};
	
	Box.prototype._intersectVertical = function (y, h) 
	{
		if (y > this.y())
		{
			var heightSubtract = y - this.y();
			this._point.y = y;
			this._size.y -= heightSubtract > 0 ? heightSubtract : -heightSubtract; 
		}
		
		if ((y + h) < (this.y() + this.h()))
		{
			this._size.y = y + h - this.y();
		}
	};
		
	
	Box.prototype.x = function ()
	{
		return this._point.x;	
	};

	Box.prototype.y = function ()
	{
		return this._point.y;	
	};

	Box.prototype.w = function ()
	{
		return this._size.x;	
	};
		
	Box.prototype.h = function ()
	{
		return this._size.y;	
	};
	
	Box.prototype.isIntersect = function (box) 
	{
		return this._isIntersectHorizontal(box.x(), box.w()) && this._isIntersectVertical(box.y(), box.h());
	};
	
	Box.prototype.isCrossBorder = function (box) 
	{
		return this._crossHorizontalBorder(box.x(), box.w()) || this._crossVerticalBorder(box.y(), box.h());
	};
	
	Box.prototype.intersect = function (box) 
	{
		this._intersectHorizontal(box.x(), box.w());
		this._intersectVertical(box.y(), box.h());
	};
	
	
	this.Box = Box;
});
namespace('OUI.core.pos', function (window)
{
	var classify = window.Classy.classify; 
	
	
	/**
	 * @class OUI.core.pos.Point
	 */
	function Point(x, y) 
	{	
		classify(this);
		
		this.x = x;
		this.y = y;
	}
	
	
	this.Point = Point;
});
namespace('OUI.core.pos.enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.core.pos.enum.TargetPosition
	 * @enum {string}
	 */
	var TargetPosition = {
			center: 'center',
			left: 	'left',
			right: 	'right',
			top: 	'top',
			bottom: 'bottom'
	};
	
	
	this.TargetPosition = Enum(TargetPosition);
});
namespace('OUI.core.pos.enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.core.pos.enum.TargetSide
	 * @enum {string}
	 */
	var TargetSide = {
		left: 	'left',
		right: 	'right',
		bottom: 'bottom',
		top: 	'top'
	};
	
	
	this.TargetSide = Enum(TargetSide);
});
namespace('OUI.views', function (window) 
{
	var hbs = window.OUI.core.view.hbs;
	var classify = window.Classy.classify;
	var fadeRemove = window.OUI.core.view.fadeRemove;


	/**
	 * @class OUI.views.DialogView
	 */
	function DialogView(dialog, okButtonText, cancelButtonText) 
	{
		classify(this);

		this._dialog 			= dialog;
		this._okButtonText 		= okButtonText || 'OK';
		this._cancelButtonText 	= cancelButtonText || 'Cancel';
		this._okButton 			= 'a.ok-button';
		this._cancelButton 		= 'a.cancel-button';
	}


	DialogView.prototype.getContainer = function ()
	{
		return $('#' + this._dialog.getId());
	};

	DialogView.prototype.bindEvents = function ()
	{
		var dialog = this._dialog;
		var $container = this.getContainer();

		$container.find(this._okButton).on('click', function (e) {
			e.preventDefault();
			dialog.confirm();
		});

		$container.find(this._cancelButton).on('click', function (e) {
			e.preventDefault();
			dialog.cancel();
		});
	};

	DialogView.prototype.show = function (message)
	{
		$('body').append(hbs('dialog', {
			id: this._dialog.getId(),
			message: message,
			okButtonText: this._okButtonText,
			cancelButtonText: this._cancelButtonText
		}));
	};

	DialogView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};

	
	this.DialogView = DialogView;
});
namespace('OUI.views', function (window) 
{
	var hbs = window.OUI.core.view.hbs;
	var classify = window.Classy.classify;

	/**
	 * @class OUI.views.ModalView
	 */
	function ModalView(modal, contents, className) 
	{
		classify(this);

		className = className || '';

		this._modal 		= modal;
		this._underlay 		= 'div.oui-modal-underlay';
		this._closeButton 	= 'a[data-oui-modal-close]';
		
		this._escapeEvent 	= 'keyup.' + modal.getId();

		this._className		= className;
		this._contents		= contents;
	};
	

	ModalView.prototype._close = function ()
	{
		$(document).off(this._escapeEvent);
		this._modal.close();
	};


	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._modal.getId());
	};

	ModalView.prototype.onOpen = function ()
	{
		var modalView = this;
		var selectors = this._closeButton + ',' + this._underlay;

		$(document).on(this._escapeEvent, function (e) 
		{
			if (e.keyCode === 27) 
				modalView._close();
		});

		this.getContainer().on('click', selectors, function (e) 
		{
			e.preventDefault();
			modalView._close();
		});
	};

	ModalView.prototype.show = function () 
	{
		var position = {
			top: 20,
			left: 20
		};

		$('body').append(hbs('modal', {
			id: this._modal.getId(),
			contents: this._contents,
			extraClass: this._className,
			position: position
		}));
	};

	ModalView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};

	
	this.ModalView = ModalView;
});
namespace('OUI.views', function (window) 
{
	var hbs 		= window.OUI.core.view.hbs;
	var fadeRemove 	= window.OUI.core.view.fadeRemove;
	var classify 	= window.Classy.classify;
	

	/**
	 * @class OUI.views.ToastView
	 */
	function ToastView(toast, delay)
	{
		classify(this);

		delay = delay || 5000;

		this._toast 	= toast;
		this._delay 	= delay;

		this._dismiss 	= 'a[data-oui-dismiss]';
	};

	ToastView.prototype.bindDismiss = function ()
	{
		var toast = this._toast;

		this.getContainer().on('click', this._dismiss, function (e) {
			e.preventDefault();
			toast.dismiss();
		});
	};

	ToastView.prototype.show = function (message)
	{
		this._onAdd.add(callback);
	};

	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._toast.getId());
	};

	ToastView.prototype.show = function (message)
	{
		var view = this;

		$('body').append(hbs('toast', {
			message: message,
			id: this._toast.getId()
		}));

		setTimeout(function () {
			fadeRemove(view.getContainer());
		}, this._delay);
	};

	ToastView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};


	this.ToastView = ToastView;
});
namespace('Plankton', function(root) {
	'use strict';
	
	
	var is = root.Plankton.is;
	
	
	/**
	 * @class Plankton.array
	 * @alias array
	 * 
	 * @param {*} subject
	 * @return {Array}
	 */
	var array = function(subject) {
		if (is.undefined(subject)) {
			return [];
		}
		
		return (is.array(subject) ? subject : [subject]);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	array.forEach = function(subject, callback, scope) {
		array.forEach.key(subject, function(key) {
			return callback.call(scope, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	array.forEach.value = array.forEach;
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)} callback
	 * @param {*=} scope
	 */
	array.forEach.key = function(subject, callback, scope) {
		for (var key in subject) {
			if (!is.index(key)) {
				continue;
			}
			
			if (callback.call(scope, parseInt(key)) === false) {
				break;
			}
		}
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Number *)} callback
	 * @param {*=} scope
	 */
	array.forEach.pair = function(subject, callback, scope) {
		array.forEach.key(subject, function(key) {
			return callback.call(scope, key, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Array)} callback
	 * @param {*=} scope
	 */
	array.forEach.item = function(subject, callback, scope) {
		array.forEach.pair(subject, function(key, value) {
			var obj = {};
			obj[key] = value;
			return callback.call(scope, obj);
		});
	};
	
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.last = function (subject) {
		if (subject.length === 0) {
			return undefined;
		}
		
		return subject[subject.length - 1];
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.last.key = function (subject) {
		if (subject.length === 0) {
			return undefined;
		}
		
		return subject.length - 1;
	};
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.last.value = array.last;
	
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.first = function (subject) {
		var first = undefined;
		
		array.forEach.value(subject, function(value) {
			first = value;
			return false;
		});
		
		return first;
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.first.key = function (subject) {
		var first = undefined;
		
		array.forEach.key(subject, function(value) {
			first = value;
			return false;
		});
		
		return first;
	};
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.first.value = array.first;
	
	
	/**
	 * @param {Array} subject
	 * @returns {Number}
	 */
	array.count = function (subject) {
		var count = 0;
		array.forEach(subject, function() { count++; });
		return count;
	};
	
	/**
	 * @param {Array} subject
	 * @returns {Number}
	 */
	array.isNormalized = function (subject) {
		return subject.length === 0 || array.last.key(subject) === (array.count(subject) - 1);
	};
	
	/**
	 * @param {Array} subject
	 * @returns {Number}
	 */
	array.normalize = function (subject) {
		var arr = [];
		
		array.forEach(subject, function(value) {
			arr.push(value);
		});
		
		return arr;
	};
	
	
	this.array = array;
});
namespace('Plankton', function (root)
{
	'use strict';
	
	
	var is = root.Plankton.is;
	
	
	/**
	 * @class Plankton.func
	 * @alias func
	 * 
	 * @param {*} subject
	 * @return {function}
	 */
	var func = function (subject)
	{
		return (is.function(subject) ? 
			subject :
			function () { return subject });
	};
	
	/**
	 * @param {Function} callback
	 * @returns {Function}
	 */
	func.async = function (callback)
	{
		return function ()
		{
			return Promise
				.resolve(arguments)
				.then(
					function (args)
					{
						return func(callback).apply(null, args);
					});
		};
	};
	
	/**
	 * @param {Function} callback
	 * @return {Promise}
	 */
	func.async.do = function (callback)
	{
		return (func.async(callback))();
	};
	
	/**
	 * @param {Function} callback
	 * @param {function(*)|undefined} errorHandler
	 * @return {Function}
	 */
	func.safe = function (callback, errorHandler)
	{
		return function ()
		{
			try 
			{
				callback.apply(null, arguments);
			}
			catch (error) 
			{
				if (is.function(errorHandler))
				{
					errorHandler(error);
				}
			}
		};
	};
	
	/**
	 * @param {Function} callback
	 * @return {Function}
	 */
	func.silent = function (callback)
	{
		return func.safe(callback);
	};
	
	/**
	 * @param {Function} callback
	 * @return {Function}
	 */
	func.cached = function (callback)
	{
		var isCalled = false;
		var result;
		
		return function ()
		{
			if (isCalled)
			{
				return result;
			}
			
			isCalled = true;
			result = callback.apply(null, arguments);
			
			return result;
		};
	};
	
	/**
	 * @param {Function} callback
	 * @param {Number} ms
	 * @return {Function}
	 */
	func.postponed = function (callback, ms)
	{
		return function () 
		{
			var args = arguments;
			
			return new Promise(
				function (resolve)
				{
					setTimeout(
						function ()
						{
							resolve(callback.apply(null, args));
						},
						ms);
				}
			);
		};
	};
	
	
	this.func = func;
});
namespace('Plankton', function (root)
{
	'use strict';
	
	
	var is = root.Plankton.is;
	
	
	/**
	 * @class Plankton.obj
	 * @alias obj
	 */
	var obj = {};
	
	
	/**
	 * @param {Object} subject
	 * @return {Object}
	 */
	obj.copy = function (subject)
	{
		var res = {};
		obj.forEach.pair(subject, function (key, val) { res[key] = val; });
		return res;
	};
	
	/**
	 * @param {Object} subject
	 * @return {Object}
	 */
	obj.mix = function (subject)
	{
		for (var i = 1; i < arguments.length; i++)
		{
			obj.forEach.pair(arguments[i], function (key, val) { subject[key] = val; });
		}
		
		return subject;
	};
	
	/**
	 * @return {Object}
	 */
	obj.merge = function ()
	{
		var res = {};
		
		for (var i = 0; i < arguments.length; i++)
		{
			obj.forEach.pair(arguments[i], function (key, val) { res[key] = val; });
		}
		
		return res;
	};
	
	/**
	 * @param {string|number} key
	 * @param {*} value
	 * @returns {Object}
	 */
	obj.combine = function (key, value)
	{
		var res = {};
		res[key] = value;
		return res;
	};
	
	/**
	 * @param subject
	 * @returns {*|undefined}
	 */
	obj.any = function (subject)
	{
		var key = obj.any.key(subject);
		return (is.defined(key) ? subject[key] : undefined);
	};
	
	/**
	 * @param {Object} subject
	 * @return {*|undefined}
	 */
	obj.any.value = obj.any;
	
	/**
	 * @param {Object} subject
	 * @return {*|undefined}
	 */
	obj.any.key = function (subject)
	{
		var keys = obj.keys(subject);
		return keys.length > 0 ? keys[0] : undefined;
	};
	
	/**
	 * @param {Object} subject
	 * @return {*|undefined}
	 */
	obj.any.item = function (subject)
	{
		var key = obj.any.key(subject);
		var res = undefined;
		
		if (is.defined(key))
		{
			res = obj.combine(key, subject[key]);
		}
		
		return res;
	};
	
	
	/**
	 * @param {Object} subject
	 * @param {function (*)} callback
	 * @param {*=} scope
	 */
	obj.forEach = function (subject, callback, scope)
	{
		obj.forEach.key(subject, function (key) 
		{
			return callback.call(scope, subject[key]);
		});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function (*)} callback
	 */
	obj.forEach.value = obj.forEach;
	
	/**
	 * @param {Object} subject
	 * @param {function (*)} callback
	 * @param {*=} scope
	 */
	obj.forEach.key = function (subject, callback, scope)
	{
		for (var key in subject)
		{
			if (!subject.hasOwnProperty(key))
			{
				continue;
			}
			
			if (callback.call(scope, key) === false)
			{
				break;
			}
		}
	};
	
	/**
	 * @param {Object} subject
	 * @param {function (*)} callback
	 * @param {*=} scope
	 */
	obj.forEach.pair = function (subject, callback, scope)
	{
		obj.forEach.key(subject, function (key)
		{
			return callback.call(scope, key, subject[key]);
		});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function (*)} callback
	 * @param {*=} scope
	 */
	obj.forEach.item = function (subject, callback, scope)
	{
		obj.forEach.pair(subject, function (key, value)
		{
			return callback.call(scope, obj.combine(key, value));
		});
	};
	
	
	/**
	 * @param {Object} subject
	 * @param {function (*): bool|null|number} callback
	 * @param {*=} scope
	 * @returns {Object}
	 */
	obj.filter = function (subject, callback, scope)
	{
		return obj.filter.pair(subject, function (key, value)
		{
			return callback.call(scope, value);
		})
	};
	
	/**
	 * @param {Object} subject
	 * @param {function (*): bool|null|number} callback
	 * @param {*=} scope
	 * @returns {Object}
	 */
	obj.filter.value = obj.filter;
	
	/**
	 * @param {Object} subject
	 * @param {function (*): bool|null|number} callback
	 * @param {*=} scope
	 * @returns {Object}
	 */
	obj.filter.key = function (subject, callback, scope) {
		return obj.filter.pair(
			subject, 
			function (key)
			{
				return callback.call(scope, key);
			});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function (*): bool|null|number} callback
	 * @param {*=} scope
	 * @returns {Object}
	 */
	obj.filter.pair = function (subject, callback, scope)
	{
		var filtered = {};
		
		obj.forEach.pair(
			subject, 
			function (key, value)
			{
				var res = callback.call(scope, key, value);
				
				if (is.null(res))
				{
					return false;
				}
				else if (res === true)
				{
					filtered[key] = value;
				}
			});
		
		return filtered;
	};
	
	/**
	 * @param {Object} subject
	 * @param {function (*): bool|null|number} callback
	 * @param {*=} scope
	 * @returns {Object}
	 */
	obj.filter.item = function (subject, callback, scope)
	{
		return obj.filter.pair(
			subject, 
			function (key, value)
			{
				return callback.call(scope, obj.combine(key, value));
			});
	};
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	obj.values = function (subject)
	{
		return obj
			.keys(subject)
			.reduce(
				function (result, key)
				{
					result.push(subject[key]);
					return result;
				}, 
				[]);
	};
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	obj.keys = function (subject)
	{
		return Object.keys(subject);
	};
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	obj.count = function (subject)
	{
		return obj.keys(subject).length;
	};
	
	
	this.obj = obj;
});
namespace('OUI.core.pos', function (window) 
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify; 
	var Box 		= window.OUI.core.pos.Box;
	var Point		= window.OUI.core.pos.Point;
	
	
	/**
	 * @class OUI.core.pos.Positioner
	 */
	var Positioner = function (data) 
	{	
		classify(this);
		
		this.container = data.container;
		this.related = data.related;
		this.target = data.target;
		this.areas = data.areas;
		
		this.absolutePosition = null;
		this.relativePosition = null;
	};
	
	
	Positioner.prototype._checkParams = function () 
	{	
		if (is.empty(this.areas))
			return false;
		
		if (!is.object(this.related))
			return false;
		
		if (!is.object(this.target))
			return false;
		
		return (is.object(this.container));
	};
	
	Positioner.prototype._transformTarget = function (box, initialX, initialY) 
	{
		initialX = initialX || 0;
		initialY = initialY || 0;
		
		var newX = box.x() + initialX;
		var newY = box.y() + initialY;
		
		return new Box(new Point(newX, newY), new Point(this.target.w(), this.target.h()));
	};
	
	Positioner.prototype._prepareArea = function (area) 
	{
		if (!area.box.isIntersect(this.container))
		{
			return false;
		}
		
		if (area.box.isCrossBorder(this.container))
		{
			var originalX = area.box.x();
			var originalY = area.box.y();
			
			area.box.intersect(this.container);

			this._subtractInitial(area, originalX, originalY);
		}
		
		return !(area.box.w() < this.target.w() || area.box.h() < this.target.h());
	};
	
	Positioner.prototype._subtractInitial = function (area, originalX, originalY) 
	{
		area.initial.x = area.initial.x + originalX - area.box.x();
		
		if (area.initial.x < 0)
		{
			area.initial.x = 0;
		}
		
		area.initial.y = area.initial.y + originalY - area.box.y();
		
		if (area.initial.y < 0)
		{
			area.initial.y = 0;
		}
	};
	
	Positioner.prototype._moveX = function (target, box) 
	{
		return -(target.x() + target.w() - box.x() - box.w());
	};
	
	Positioner.prototype._moveY = function (target, box) 
	{
		return -(target.y() + target.h() - box.y() - box.h());
	};
	
	Positioner.prototype._putInArea = function (box, moveX, moveY, area) 
	{
		var target = this._transformTarget(box, moveX, moveY);
	
		while (target.isCrossBorder(area.box))
		{
			target = this._putInArea(target, this._moveX(target, box), this._moveY(target, box), area);
			
			if (target.x() < 0 || target.y() < 0)
			{
				return false;
			}
		}
		
		return target;
	};
	
	Positioner.prototype._tryPutTargetInArea = function (area) 
	{
		if (!this._prepareArea(area))
		{
			return false;
		}
		
		var target = this._putInArea(area.box, area.initial.x, area.initial.y, area);
		
		if (!is.true(target))
		{
			return false;
		}
		
		this.absolutePosition = new Point(target.x(), target.y());
		this.relativePosition = new Point(target.x() - this.related.x(), target.y() - this.related.y());
		
		return true;
	};
		
	
	Positioner.prototype.getPosition = function (isAbsolute) 
	{
		isAbsolute = isAbsolute || false;
		
		if (!this._checkParams())
		{
			return false;
		}

		var index;
		
		for (index = 0; index < this.areas.length; ++index)
		{
			if (this._tryPutTargetInArea(this.areas[index]))
			{
				break;
			}
		}
		
		if (is.null(this.absolutePosition))
		{
			console.log('Error: impossible to put target in a correct position');			
			return new Point(this.areas[0].box.x(), this.areas[0].box.y());
		}
		
		if (isAbsolute)
		{
			return this.absolutePosition;
		}
		
		return this.relativePosition;
	};
	
	
	this.Positioner = Positioner;
});
namespace('Plankton', function (root) 
{
	var is		= root.Plankton.is;
	var obj		= root.Plankton.obj;
	var array	= root.Plankton.array;
	
	
	function getForEachForSubject(subject)
	{
		if (is.array(subject))
		{
			return array.forEach;
		}
		else if (is.jsObject(subject))
		{
			return obj.forEach;
		}
		else
		{
			throw Error('Subject must be Array or Object');
		}
	}
	
	
	/**
	 * @class Plankton.foreach
	 * @alias foreach
	 * 
	 * @param {Array|Object} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	var foreach = function (subject, callback, scope)
	{
		var method = getForEachForSubject(subject);
		method.value(subject, callback, scope);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	foreach.value = foreach;
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)} callback
	 * @param {*=} scope
	 */
	foreach.key = function (subject, callback, scope)
	{
		var method = getForEachForSubject(subject);
		method.key(subject, callback, scope);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Number *)} callback
	 * @param {*=} scope
	 */
	foreach.pair = function(subject, callback, scope)
	{
		var method = getForEachForSubject(subject);
		method.pair(subject, callback, scope);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Array)} callback
	 * @param {*=} scope
	 */
	foreach.item = function(subject, callback, scope)
	{
		var method = getForEachForSubject(subject);
		method.item(subject, callback, scope);
	};
	
	
	this.foreach = foreach;
});
namespace('Duct.Debug', function (root)
{
	var foreach = root.Plankton.foreach;
	
	
	var DEFAULT_FILTER = /.*/;
	
	
	/**
	 * @param {Event} event
	 * @param {Array} params
	 */
	var DEFAULT_LOGGER = function (event, params)
	{ 
		console.groupCollapsed('Event %c' + event.name(), 'color: green');
		
		foreach(params, function (value)
		{
			console.log(value);
		});
		
		console.groupEnd();
	};
	
	
	/**
	 * @param {RegExp=} filter
	 * @constructor
	 */
	var EventDebug = function (filter)
	{
		/**
		 * @type {RegExp}
		 * @private
		 */
		this._filter = filter || DEFAULT_FILTER;
	
		/**
		 * @type {boolean}
		 * @private
		 */
		this._log = false;
	
		/**
		 * @private
		 */
		this._logger = DEFAULT_LOGGER;
	};
	
	
	EventDebug.prototype.log = function ()
	{
		this._log = true;
	};
	
	/**
	 * @param {RegExp} filter
	 */
	EventDebug.prototype.filter = function (filter)
	{
		this._filter = filter;
	};
	
	/**
	 * @param {string} data
	 */
	EventDebug.prototype.filterStartsWith = function (data)
	{
		this._filter = new RegExp('^' + data + '.*$');
	};
	
	EventDebug.prototype.reset = function ()
	{
		this._filter = DEFAULT_FILTER;
		this._log = false;
	};
	
	/**
	 * @param {function} logger
	 */
	EventDebug.prototype.setLogger = function(logger)
	{
		this._logger = logger;
	};
	
	/**
	 * @param {Event} event
	 * @param {Array} args
	 */
	EventDebug.prototype.onTrigger = function(event, args) 
	{
		if (!this._log || !this._filter.test(event.name()))
		{
			return;
		}
		
		this._logger(event, args)
	};
	
	
	this.EventDebug = EventDebug;
});
namespace('OUI.core.pos.prepared', function (window) 
{
	var is 				= window.Plankton.is;
	var classify		= window.Classy.classify;
	var Point 			= window.OUI.core.pos.Point;
	var Box 			= window.OUI.core.pos.Box;
	var Positioner		= window.OUI.core.pos.Positioner;
	var TargetSide 		= window.OUI.core.pos.enum.TargetSide;
	var TargetPosition 	= window.OUI.core.pos.enum.TargetPosition;
	
	
	var defaults = {
		container: window,
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0,
		isAbsolute: false,
		initialSide: null,
		initialPosition: null
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.BasePreparedWithOffsets
	 */
	function BasePreparedWithOffsets(options, defaultsOptions)
	{
		classify(this);
		
		var mergedDefaults = $.extend(true, {}, defaults, defaultsOptions);
		
		this.settings = $.extend(true, {}, mergedDefaults, options);
		
		this.settings.container = this._prepareElement(this.settings.container);
		this.settings.relatedElement = this._prepareElement(this.settings.relatedElement);
		this.settings.targetElement = this._prepareElement(this.settings.targetElement);
	}
	
	
	BasePreparedWithOffsets.prototype._getAvailableSides = function () 
	{
		return [];
	};
	
	BasePreparedWithOffsets.prototype._prepareElement = function (el) 
	{
		if (el instanceof HTMLElement)
		{
			return $(el);
		}
		
		return el;
	};
	
	BasePreparedWithOffsets.prototype._settingsIsValid = function () 
	{		
		return (is.object(this.settings.container) || $.isWindow(this.settings.container)) 
			&& (is.object(this.settings.relatedElement))
			&& (is.object(this.settings.targetElement));
	};
	
	BasePreparedWithOffsets.prototype._isNeedToSubtractContainer = function () 
	{
		if ($.isWindow(this.settings.container))
		{
			return false;
		}
		
		return (this.settings.container.css('position') === 'relative');
	};
	
	BasePreparedWithOffsets.prototype._subtractContainer = function (point) 
	{
		var container = this._getContainerBox();
		
		return new Point(point.x - container.x(), point.y - container.y());
	};
		
	BasePreparedWithOffsets.prototype._applyOffset = function (position, offset) 
	{
		var leftWithOffset = position.left - offset;
		var topWithOffset = position.top - offset;

		return {
			left: leftWithOffset > 0 ? leftWithOffset : 0,
			top: topWithOffset > 0 ? topWithOffset : 0
		};
	};
		
	BasePreparedWithOffsets.prototype.getPositionWithOffset = function (el, offset) 
	{
		var position = {left: 0, top: 0};
		
		if (!$.isWindow(el))
		{
			position = el.offset();	
		}
		
		return this._applyOffset(position, offset);
	};
	
	BasePreparedWithOffsets.prototype._getSizeWithOffset = function (el, offset) 
	{
		if ($.isWindow(el))
		{
			el = $(el);
		}
		
		return {
			width: el.width() + offset * 2, 
			height: el.height() + offset * 2
		};
	};
	
	BasePreparedWithOffsets.prototype._getElementBox = function (el, offset) 
	{
		offset = offset || 0;
		
		if (el instanceof HTMLElement)
		{
			el = $(el);
		}
		
		var position = this.getPositionWithOffset(el, offset);

		var size = this._getSizeWithOffset(el, offset);
		
		return this._prepareBox(position.left, position.top, size.width, size.height);
	};
	
	BasePreparedWithOffsets.prototype._preparePoint = function (x, y) 
	{
		return new Point(x, y);	
	};
	
	BasePreparedWithOffsets.prototype._prepareBox = function(x, y, w, h)
	{
		var point = this._preparePoint(x, y);
		var size = this._preparePoint(w, h);
		
		return new Box(point, size);
	};
	
	BasePreparedWithOffsets.prototype._getContainerBox = function (withOffsets) 
	{
		if (!withOffsets)
		{
			return this._getElementBox(this.settings.container);
		}
		
		if (this.settings.containerOffset > 0)
		{
			this.settings.containerOffset = this.settings.containerOffset * -1;
		}
		
		return this._getElementBox(this.settings.container, this.settings.containerOffset);
	};
	
	BasePreparedWithOffsets.prototype._getRelatedBox = function () 
	{
		return this._getElementBox(this.settings.relatedElement, this.settings.relatedOffset);
	};
	
	BasePreparedWithOffsets.prototype._getTargetBox = function () 
	{
		return this._getElementBox(this.settings.targetElement);
	};
	
	BasePreparedWithOffsets.prototype._getCenterPoint = function (targetParam, relatedParam) 
	{
		return targetParam + (relatedParam - targetParam) / 2;
	};
	
	BasePreparedWithOffsets.prototype._verticalToHorizontal = function () 
	{
		if (this.settings.initialPosition === TargetPosition.top)
		{
			this.settings.initialPosition = TargetPosition.left;
		}
		
		if (this.settings.initialPosition === TargetPosition.bottom)
		{
			this.settings.initialPosition = TargetPosition.right;
		}
	};
	
	BasePreparedWithOffsets.prototype._horizontalToVertical = function () 
	{
		if (this.settings.initialPosition === TargetPosition.left)
		{
			this.settings.initialPosition = TargetPosition.top;
		}
		
		if (this.settings.initialPosition === TargetPosition.right)
		{
			this.settings.initialPosition = TargetPosition.bottom;
		}
	};
	
	BasePreparedWithOffsets.prototype._normalizeIntitalPosition = function (isVerticalSide) 
	{
		if (isVerticalSide)
		{
			return this._horizontalToVertical();
		}
		
		return this._verticalToHorizontal();
	};
	
	BasePreparedWithOffsets.prototype._getInitialPosition = function (target, related, isVerticalSide) 
	{
		this._normalizeIntitalPosition(isVerticalSide);
		
		switch (this.settings.initialPosition)
		{
			case TargetPosition.left:
				return this._preparePoint(target.w() + this.settings.relatedOffset, 0);
				
			case TargetPosition.right:
				return this._preparePoint(related.w() - this.settings.relatedOffset, 0);
				
			case TargetPosition.top:
				return this._preparePoint(0, target.h() + this.settings.relatedOffset);
				
			case TargetPosition.bottom:
				return this._preparePoint(0, related.h() - this.settings.relatedOffset);
				
			case TargetPosition.center:
				if (isVerticalSide)
				{
					return this._preparePoint(0, this._getCenterPoint(target.h(), related.h()));
				}
				else
				{
					return this._preparePoint(this._getCenterPoint(target.w(), related.w()), 0);
				}
		}
	};
	
	BasePreparedWithOffsets.prototype._getHorizontalSide = function (relatedBox, targetBox, direction) 
	{
		if (direction === 1)
		{
			var y = relatedBox.y() + relatedBox.h() +  this.settings.targetOffset;
		}
		else
		{
			y = relatedBox.y() - targetBox.h() -  this.settings.targetOffset;
		}

		var x = relatedBox.x() - targetBox.w();

		var h = targetBox.h();
		var w = relatedBox.w() + (targetBox.w() * 2);

		return {
			box: this._prepareBox(x, y, w, h),
			initial: this._getInitialPosition(targetBox, relatedBox, false)
		}
	};

	BasePreparedWithOffsets.prototype._getVerticalSide = function (relatedBox, targetBox, direction) 
	{
		if (direction === 1)
		{
			var x = relatedBox.x() + relatedBox.w() +  this.settings.targetOffset;
		}
		else
		{
			x = relatedBox.x() - targetBox.w() -  this.settings.targetOffset;
		}

		var y = relatedBox.y() - targetBox.h();

		var w = targetBox.w();
		var h = relatedBox.h() + (targetBox.h() * 2);

		return {
			box: this._prepareBox(x, y, w, h),
			initial: this._getInitialPosition(targetBox, relatedBox, true)
		}
	};
		
	BasePreparedWithOffsets.prototype._getSide = function (relatedBox, targetBox, side) 
	{
		if (this._getAvailableSides().indexOf(side) === -1)
		{
			return null;
		}
		
		switch (side)
		{
			case TargetSide.top:
				return this._getHorizontalSide(relatedBox, targetBox, -1);
				
			case TargetSide.bottom:
				return this._getHorizontalSide(relatedBox, targetBox, 1);
				
			case TargetSide.right:
				return this._getVerticalSide(relatedBox, targetBox, 1);
				
			case TargetSide.left:
				return this	._getVerticalSide(relatedBox, targetBox, -1);
				
			default:
				return null;
		}
	};

	BasePreparedWithOffsets.prototype._getAreas = function (relatedBox, targetBox) 
	{
		var areas = [];
		
		var defaultArea = this._getSide(relatedBox, targetBox, this.settings.initialSide);
		
		if (!is.null(defaultArea))
		{
			areas.push(defaultArea);
		}
		
		var availableSides = this._getAvailableSides();
		
		var index;
		
		for (index = 0; index < availableSides.length; ++index)
		{
			if (availableSides[index] === this.settings.initialSide)
			{
				continue;
			}
			
			var side = this._getSide(relatedBox, targetBox, availableSides[index]);
			
			if (!is.null(side))
			{
				areas.push(side);
			}
		}
		
		
		return areas;
	};	
	
	BasePreparedWithOffsets.prototype._getData = function () 
	{
		if (!this._settingsIsValid() || is.empty(this._getAvailableSides()))
		{
			return {};
		}
		
		var containerBox = this._getContainerBox(true);
		var relatedBox = this._getRelatedBox();
		var targetBox = this._getTargetBox();
		
				
		return {
			container: containerBox,
			related: relatedBox,
			target: targetBox,
			areas : this._getAreas(relatedBox, targetBox)
		}
	};
	
	
	BasePreparedWithOffsets.prototype.getPosition = function () 
	{
		var data = this._getData();
		
		if (is.object.empty(data))
		{
			return false;
		}
		
		var positioner = new Positioner(data);

		var position = positioner.getPosition(this.settings.isAbsolute);
		
		if (is.object(position) && this._isNeedToSubtractContainer())
		{
			position = this._subtractContainer(position);
		}
		
		return position;
	};
	

	this.BasePreparedWithOffsets = BasePreparedWithOffsets;
});
namespace('Duct', function (root)
{
	var EventDebug = root.Duct.Debug.EventDebug;
	
	var func	= root.Plankton.func;
	var foreach	= root.Plankton.foreach;
	
	
	/**
	 * @template T
	 * 
	 * @constructor
	 * @class Duct.Event
	 * 
	 * @property {Array<T>} _callbacks
	 * @property {string} _name
	 * @property {function(err)} _errorHandler
	 * 
	 * @param {string} name
	 * @param {EventDebug=} debug
	 */
	function Event(name, debug)
	{
		this._callbacks	= [];
		this._name		= name || '';
		this._debug		= debug || Event.DEFAULT_DEBUG;
		
		
		this._errorHandler = function(err)
		{
			console.error('Error when executing event ' + this._name, err);
		};
	}
	
	
	/**
	 * @param {Function} callback
	 * @param {Array} callbackArgs
	 * @private
	 */
	Event.prototype._triggerCallback = function (callback, callbackArgs)
	{
		var wrappedCallback = func.safe(callback, this._errorHandler);
		wrappedCallback = func.async(wrappedCallback); 
		wrappedCallback.apply(null, callbackArgs);
	};
	
	
	/**
	 * @returns {string}
	 */
	Event.prototype.name = function ()
	{
		return this._name;
	};
	
	/**
	 * @param {function(err)} handler
	 */
	Event.prototype.setErrorHandler = function (handler)
	{
		this._errorHandler = handler;
	};
	
	Event.prototype.clear = function()
	{
		this._callbacks = [];
	};
	
	/**
	 * @template T
	 * @param {T} callback
	 * @return {Event}
	 */
	Event.prototype.add = function (callback)
	{
		this._callbacks.push(callback);
		return this;
	};
	
	/**
	 * @template T
	 * @param {T} callback
	 * @return {Event}
	 */
	Event.prototype.remove = function (callback)
	{
		var index = this._callbacks.indexOf(callback);
		
		if (index >= 0)
		{
			this._callbacks.splice(index, 1);
		}
		
		return this;
	};
	
	/**
	 * @returns {Number}
	 */
	Event.prototype.count = function count()
	{
		return this._callbacks.length;
	};
	
	/**
	 * @template T
	 * @type T
	 */
	Event.prototype.trigger = function()
	{
		var callbackArgs = [].slice.apply(arguments);
		var self = this;
		
		this._debug.onTrigger(this, callbackArgs);
		
		func.async.do(
			function() 
			{
				foreach(self._callbacks, function(callback)
				{
					self._triggerCallback(callback, callbackArgs);
				});
			});
	};
	
	
	Event.DEFAULT_DEBUG = new EventDebug();
	
	
	this.Event = Event;
});
namespace('OUI.core.pos.prepared', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= window.OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.core.pos.prepared.BasePreparedWithOffsets;

	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.top
	};
	

	/**
	 * @class OUI.core.pos.prepared.RoundPosition
	 */
	function RoundPosition(options)
	{
		classify(this);

		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
			TargetSide.top
		];
	}
	
	
	RoundPosition.get = function (options) 
	{
		var roundPosition = new RoundPosition(options);
		return roundPosition.getPosition();
	};
	

	RoundPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	RoundPosition.prototype.constructor = RoundPosition;
	
	
	RoundPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
	
	
	this.RoundPosition = RoundPosition;
});
namespace('OUI.core.pos.prepared.cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= window.OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.bottom,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.BottomPosition
	 */
	function BottomPosition(options)
	{
		classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.bottom
		];
	}
	
	
	BottomPosition.get = function (options) 
	{
		var bottomPosition = new BottomPosition(options);
		return bottomPosition.getPosition();
	};
	

	BottomPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	BottomPosition.prototype.constructor = BottomPosition;
	
	
	BottomPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.BottomPosition = BottomPosition;
});
namespace('OUI.components', function (window) 
{
	var Event       = window.Duct.Event;
	var DialogView 	= window.OUI.views.DialogView;

	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Dialog
	 */
	function Dialog(okButtonText, cancelButtonText) 
	{
		Classy.classify(this);

		this._id 			= idGenerator('oui-dialog');
		
		this._dialogView 	= new DialogView(this, okButtonText, cancelButtonText);

		this._onCancel 		= new Event('dialog.onCancel');
		this._onConfirm 	= new Event('dialog.onConfirm');
		this._onOpen 		= new Event('dialog.onOpen');

		this.onOpen(this._dialogView.bindEvents);
		this.onCancel(this._dialogView.remove);
		this.onConfirm(this._dialogView.remove);
	}

	Dialog.prototype.getId = function ()
	{
		return this._id;
	};

	Dialog.prototype.onOpen = function (callback)
	{
		this._onOpen.add(callback);
	};

	Dialog.prototype.onCancel = function (callback)
	{
		this._onCancel.add(callback);
	};

	Dialog.prototype.onConfirm = function (callback)
	{
		this._onConfirm.add(callback);
	};

	Dialog.prototype.open = function (message) 
	{
		this._dialogView.show(message);
		this._onOpen.trigger(this._dialogView.getContainer());
	};

	Dialog.prototype.confirm = function () 
	{
		this._onConfirm.trigger(this._id);
	};

	Dialog.prototype.cancel = function () 
	{
		this._onCancel.trigger(this._id);
	};


	this.Dialog = Dialog;
});
namespace('OUI.components', function (window) 
{
	'use strict';


	var Event       = window.Duct.Event;
	var ModalView   = window.OUI.views.ModalView;
	
	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Modal
	 */
	function Modal(contents, className) 
	{
		Classy.classify(this);

		this._id            = idGenerator('oui-modal');
		
		this._modalView     = new ModalView(this, contents, className);

		this._onBeforeOpen 	= new Event('modal.beforeOpen');
		this._onAfterOpen 	= new Event('modal.afterOpen');
		this._onBeforeClose = new Event('modal.beforeClose');
		this._onAfterClose 	= new Event('modal.afterClose');

		this.onAfterOpen(this._modalView.onOpen);
	};

	Modal.prototype.getId = function ()
	{
		return this._id;
	};

	Modal.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};

	Modal.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};

	Modal.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	Modal.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};

	Modal.prototype.open = function() 
	{
		this._onBeforeOpen.trigger(this._id);
		this._modalView.show();
		this._onAfterOpen.trigger(this._modalView.getContainer());
	};

	Modal.prototype.close = function() 
	{
		this._onBeforeClose.trigger(this._modalView.getContainer());
		this._modalView.remove();
		this._onAfterClose.trigger(this._id);
	};


	this.Modal = Modal;
});
namespace('OUI.components', function (window) 
{
	'use strict';


	var Event = window.Duct.Event;	
	var ToastView = window.OUI.views.ToastView;

	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Toast
	 */
	function Toast(delay)
	{
		Classy.classify(this);

		this._id 		= idGenerator('oui-toast');

		this._toastView = new ToastView(this, delay);
				
		this._onAdd 	= new Event('toast.onAdd');
		this._onDismiss = new Event('toast.onDismiss');

		this.onAdd(this._toastView.bindDismiss);
	};


	Toast.prototype.getId = function ()
	{
		return this._id;
	};

	Toast.prototype.onAdd = function (callback)
	{
		this._onAdd.add(callback);
	};

	Toast.prototype.onDismiss = function (callback)
	{
		this._onDismiss.add(callback);
	};


	Toast.prototype.add = function (message)
	{
		this._toastView.show(message);
		this._onAdd.trigger(this._id);
	};

	Toast.prototype.dismiss = function ()
	{
		this._toastView.remove();
		this._onDismiss.trigger(this._id);
	};


	this.Toast = Toast;
});
namespace('OUI.views', function (window) 
{
	var hbs 							= window.OUI.core.view.hbs;
	var classify						= window.Classy.classify;
	var FadeRemove 						= window.OUI.core.view.FadeRemove;
	var BottomPosition	 				= window.OUI.core.pos.prepared.cornered.BottomPosition;
	var TargetPosition					= window.OUI.core.pos.enum.TargetPosition;


	function MenuView(menu, $toggleElement, contents, extraClass)
	{
		classify(this);

		extraClass = extraClass || '';

		this._menu 			= menu;
		this._toggleElement = $toggleElement;
		this._contents 		= contents;
		this._extraClass 	= extraClass;
		this._underlay 		= 'div.oui-menu-underlay';
	};

	MenuView.prototype.initEvent = function ()
	{
		var menu = this._menu;

		this._toggleElement.on('click', function (e) {
			e.preventDefault();
			menu.open();
		});
	};

	MenuView.prototype.bindRemove = function ()
	{
		var menu = this._menu;

		this.getContainer().on('click', this._underlay, function () {
			menu.close();
		});
	};

	MenuView.prototype.getContainer = function ()
	{
		return $('#' + this._menu.getId());
	};

	MenuView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};

	MenuView.prototype.show = function ()
	{
		$('body').append(hbs('menu', {
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		}));
		
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		var $related 	= this._toggleElement;
		
		var options = {
			container: $container,
			containerOffset: 0,
			relatedElement: $related,
			relatedOffset: 5,
			targetElement: $target,
			targetOffset: 0,
			isAbsolute: true,
			initialPosition: TargetPosition.center
		};
		
		var position = BottomPosition.get(options);

		$target.offset({
			top: position.y,
			left: position.x
		});
	};


	this.MenuView = MenuView;
});
namespace('OUI.views', function (window) 
{
	var classify		= window.Classy.classify;
	var RoundPosition 	= window.OUI.core.pos.prepared.RoundPosition;
    var TargetPosition 	= window.OUI.core.pos.enum.TargetPosition;
    var TargetSide 		= window.OUI.core.pos.enum.TargetSide;


	/**
	 * @class OUI.views.TipView
	 */
	function TipView(tip, baseName)
	{
		classify(this);

		this._tip 				= tip;

		this._tipBaseName 		= baseName;
		this._tipSelector 		= '*[data-' + baseName + ']';
		this._tipContentAttr 	= 'title';
	};


	TipView.prototype._getContent = function ($element)
	{
		var content = $element.data(this._tipBaseName);

		content = content.replace(/\[/g, '<');
		content = content.replace(/\]/g, '>');

		return content;
	};

	TipView.prototype._getCoordinates = function ($related, $target)
	{	
		var options = {
			container: $('body'),
			relatedElement:  $related,
		    targetElement: $target,
		    relatedOffset: 5,
			isAbsolute: true,
		    initialPosition: TargetPosition.center,
		    initialSide: TargetSide.bottom
		};

		return RoundPosition.get(options);
	};


	TipView.prototype.bindHover = function ()
	{
		var view = this;

		$(document).on(
		{
		    'mouseenter.tip': function () 
		    {
		        view._tip.add($(this));
		    },
		    'mouseleave.tip': function () 
		    {
		        view._tip.remove();
		    }
		}, this._tipSelector);

		$(document).on('click.tip', this._tipSelector, function () 
		{
			view._tip.remove();
		});
	};

	TipView.prototype.getContainer = function ()
	{
		return $('#' + this._tip.getId());
	};

	TipView.prototype.show = function ($element)
	{
		var $tip = $('<div>')
			.attr('id', this._tip.getId())
			.addClass(this._tipBaseName)
			.html(this._getContent($element));

		var coords = this._getCoordinates($element, $tip);

		$tip.css({
			top: coords.y, 
			left: coords.x
		});

		$('body').append($tip);
	};

	TipView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};


	this.TipView = TipView;
});
namespace('OUI.components', function (window) 
{
	var Event 		= window.Duct.Event;	
	var MenuView 	= window.OUI.views.MenuView;

	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Menu
	 */
	function Menu($toggleElement, contents, extraClass)
	{
		Classy.classify(this);

		this._id 			= idGenerator('oui-menu');
		
		this._menuView 		= new MenuView(this, $toggleElement, contents, extraClass);
		
		this._onBeforeOpen 	= new Event('menu.onBeforeOpen');
		this._onAfterOpen 	= new Event('menu.onAfterOpen');
		this._onBeforeClose = new Event('menu.onBeforeClose');
		this._onAfterClose 	= new Event('menu.onAfterClose');

		this._menuView.initEvent();

		this.onAfterOpen(this._menuView.bindRemove);
	};

	
	Menu.prototype.getId = function ()
	{
		return this._id;
	};

	Menu.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};

	Menu.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};

	Menu.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	Menu.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};

	Menu.prototype.open = function ()
	{
		this._onBeforeOpen.trigger(this._id);
		this._menuView.show();
		this._onAfterOpen.trigger(this._menuView.getContainer());
	};

	Menu.prototype.close = function ()
	{
		this._onBeforeClose.trigger(this._menuView.getContainer());
		this._menuView.remove();
		this._onAfterClose.trigger(this._id);
	};


	this.Menu = Menu;
});
namespace('OUI.components', function (window) 
{
	var classify	= window.Classy.classify;
	var TipView 	= window.OUI.views.TipView;
	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Tip
	 */
	function Tip(baseName)
	{
		classify(this);

		this._id 		= idGenerator(baseName);
		this._tipView 	= new TipView(this, baseName);

		this._tipView.bindHover();
	};


	Tip.prototype.getId = function ()
	{
		return this._id;
	};

	Tip.prototype.add = function ($element)
	{
		this._tipView.show($element);
	};

	Tip.prototype.remove = function ()
	{
		this._tipView.remove();
	};


	this.Tip = Tip;
});
namespace('OUI', function (window)
{
	var Dialog = window.OUI.components.Dialog;
	var Modal = window.OUI.components.Modal;
	var Menu = window.OUI.components.Menu;
	var Toast = window.OUI.components.Toast;
	var Tip = window.OUI.components.Tip;

	
	var RoundPosition = window.OUI.core.pos.prepared.RoundPosition;
	var TargetPosition = window.OUI.core.pos.enum.TargetPosition;
	var TargetSide = window.OUI.core.pos.enum.TargetSide;
	
	this.index = function ()
	{
		var myTip = new Tip('oui-tip');

		$('a.toast').on('click', function (e) {
			e.preventDefault();
			var message = new Toast(3000);

			message.add('Lorem ipsum dolor sit amet, eos at iusto salutatus pri. Ei vim stet');
			message.onAdd(function (id) {
				console.log('added ' + id);
			});
			message.onDismiss(function (id) {
				console.log('dismissed ' + id);
			});
		});

		var myMenu = new Menu($('a.menu'), $('div.my-menu').html(), 'my-menu');
            
		myMenu.onAfterOpen(function (container) {
			var subMenu = new Menu(
				container.find('a.menu'), 
				$('div.my-menu').html(), 
				'my-sub-menu');
		});

		$('a.dialog').on('click', function (e) {
			e.preventDefault();
			
			var dialog = new Dialog('YES', 'NO');
			
			dialog.onConfirm(function () {
				console.log('YES');
			});

			dialog.open('Are you sure?');
		});

		$('a.modal').on('click', function (e) {
			e.preventDefault();

			var bigContents = $('div.big-modal').html();
			var bigModal = new Modal(bigContents, 'big');

			bigModal.onAfterOpen(function (container) {
				container.find('div.body a').on('click', function (e) {
					e.preventDefault();

					var smallContents = $('div.small-modal').html();
					var smallModal = new Modal(smallContents, 'small');
					smallModal.onAfterOpen(function (smallModalContainer) {
						new Menu(
							smallModalContainer.find('a.popup-toggle'), 
							$('div.my-menu').html(), 
							'my-menu');
					});
					smallModal.open();
				});
			});

			bigModal.open();
		});

		// var $target = $('<div />', {
		// 	text: 'positioned div',
		// 	style: 'width:150px; height: 80px; background-color: #1DA1F3; position: absolute'
		// });
		//
		// var $container = $('#positioner-container');
		//
		// var options = {
		// 	container: $container,
		// 	containerOffset: 10,
		// 	relatedElement: document.getElementById('related'),
		// 	relatedOffset: 5,
		// 	targetElement: $target,
		// 	targetOffset: 0,
		// 	isAbsolute: true,
		// 	initialPosition: TargetPosition.bottom,
		// 	initialSide: TargetSide.left
		// };
		//
		// var pos = RoundPosition.get(options);
		//
		// $target.css({top: pos.y, left: pos.x});
		//
		// $container.append($target);
	}
});        