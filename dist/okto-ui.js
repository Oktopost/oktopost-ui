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
		
		
		for (var key in target)
		{
			if (target.hasOwnProperty(key) && !(target[key] instanceof Object))
			{
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
	 * @class Classy.Singleton
	 * @alias Singleton
	 * 
	 * @template T
	 * 
	 * @param {T} target
	 * @return {{instance: function(): T}}
	 */
	this.Singleton = function Singleton(target)
	{
		var container = function()
		{
			throw 'Can not create instance of singleton';
		};
		
		container.prototype = target.prototype;
		
		container.__instance__ = null;
		container.instance = function()
		{
			if (container.__instance__ === null)
			{
				//noinspection JSValidateTypes
				container.__instance__ = new target();
			}
			
			return container.__instance__;
		};
		
		return container;
	};
});
namespace('Classy', function(root)
{
	function getProto(target)
	{
		if (typeof Object.getPrototypeOf === 'function')
			return Object.getPrototypeOf(target);
		
		if (typeof target.constructor !== 'undefined' && target.constructor.prototype !== 'undefined')
			return target.constructor.prototype;
		
		if (typeof target.__proto__ !== 'undefined')
			return target.__proto__;
		
		return {};
	}
	
	
	/**
	 * @name Classy.classify
	 * 
	 * @param {*} object
	 * @param {function()=} init
	 */
	this.classify = function classify(object, init)
	{
		var proto = getProto(object);
		
		for (var key in proto)
		{
			if (typeof proto[key] === 'function')
			{
				object[key] = proto[key].bind(object);
			}
		}
		
		if (typeof init !== 'undefined')
		{
			init.call(object);
		}
		
		return object;
	};
});
namespace('OUI.Core.View', function (window) 
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
namespace('OUI.Core.View', function (window) 
{
	this.hbs = function (name, options)
	{
		options = options || {};

		return window.OUI.templates[name].hbs(options);
	};
});
namespace('OUI.Core.View', function (window) 
{
	this.idGenerator = function (baseName)
	{
		return baseName + '-' + Math.random().toString(36).substr(2);
	};
});
namespace('Plankton', function() 
{
	var ARRAY_INDEX_REGEX = /^0$|^[1-9]\d*$/;
	var ARRAY_INDEX_MAX_VALUE = 4294967294;
	
	
	/**
	 * @class Plankton.is
	 * @alias is
	 * 
	 * @param subject
	 * @return {boolean}
	 */
	var is = function (subject)
	{
		return is.true(subject);
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.array = function (subject)
	{
		return Object.prototype.toString.call(subject) === '[object Array]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.array.empty = function (subject)
	{
		return is.array(subject) && subject.length === 0;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.array.notEmpty = function (subject)
	{
		return is.array(subject) && subject.length > 0;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.object = function(subject)
	{
		return Object.prototype.toString.call(subject) === '[object Object]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.object.empty = function (subject)
	{
		return is.object(subject) && Object.keys(subject).length === 0;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.object.notEmpty = function (subject)
	{
		return is.object(subject) && Object.keys(subject).length > 0;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.objectLiteral = function(subject)
	{
		if (!is.object(subject))
		{
			return false;
		}
		
		return is.undefined(subject.constructor) || subject.constructor === Object;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.string = function(subject)
	{
		return Object.prototype.toString.call(subject) === '[object String]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.string.empty = function(subject)
	{
		return is.string(subject) && subject.length === 0;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.string.notEmpty = function(subject)
	{
		return is.string(subject) && subject.length > 0;
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.numeric = function(subject)
	{
		return is.number(subject) && !is.infinite(subject) && !isNaN(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.numeric.int = function(subject)
	{
		return is.numeric(subject) && (subject % 1 === 0);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.numeric.float = function(subject)
	{
		return is.numeric(subject) && (subject % 1 !== 0);
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.numeric.odd = function(subject)
	{
		return is.numeric.int(subject) && (subject % 2 !== 0);
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.numeric.even = function(subject)
	{
		return is.numeric.int(subject) && (subject % 2 === 0);
	};
	
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.collection = function(subject)
	{
		return (is.objectLiteral(subject) || is.array(subject) || is.string(subject));
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.empty = function(subject)
	{
		if (is.array(subject))
		{
			return is.array.empty(subject);
		}
		else if (is.objectLiteral(subject))
		{
			return is.object.empty(subject);
		}
		else if (is.string(subject))
		{
			return is.string.empty(subject)
		}
		
		return false;
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.notEmpty = function(subject)
	{
		if (is.array(subject))
		{
			return !is.array.empty(subject);
		}
		else if (is.object(subject))
		{
			return !is.object.empty(subject);
		}
		else if (is.string(subject))
		{
			return !is.string.empty(subject)
		}
		
		return false;
	};
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.collection.empty = is.empty;
	
	/**
	 * @param {*} subject
	 * @return {boolean}
	 */
	is.collection.notEmpty = is.notEmpty;
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.number = function (subject)
	{
		return Object.prototype.toString.call(subject) === '[object Number]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.bool = function (subject)
	{
		return Object.prototype.toString.call(subject) === '[object Boolean]';
	};
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.defined = function (subject)
	{
		return typeof subject !== 'undefined';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.undefined = function (subject)
	{
		return typeof subject === 'undefined';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.function = function (subject)
	{
		return Object.prototype.toString.call(subject) === '[object Function]';
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.NaN = function (subject)
	{
		return Object.prototype.toString.call(subject) === '[object Number]' && isNaN(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.infinite = function (subject)
	{
		return Number.POSITIVE_INFINITY === subject || Number.NEGATIVE_INFINITY === subject;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.null = function (subject)
	{
		return subject === null;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.jsObject = function (subject)
	{
		return subject instanceof Object || (!is.null(subject) && typeof subject === 'object');
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.jsPrimitive = function (subject)
	{
		return !is.jsObject(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.json = function(subject)
	{
		if (!is.string(subject))
		{
			return false;
		}
		
		try
		{
			JSON.parse(subject);
			return true;
		}
		catch (e)
		{
			return false;
		}
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.regex = function(subject)
	{
		if (Object.prototype.toString.call(subject) === '[object RegExp]')
			return true;
		
		if (!is.string(subject))
			return false;
		
		try
		{
			new RegExp(subject);
		}
		catch (e)
		{
			return false;
		}
		
		return true;
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.false = function(subject)
	{
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
	is.true = function(subject)
	{
		return !is.false(subject);
	};
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	is.index = function(subject)
	{
		return ARRAY_INDEX_REGEX.test(subject) && subject <= ARRAY_INDEX_MAX_VALUE;
	};
	
	
	this.is = is;
});
namespace('Duct', function (root)
{
	var classify = root.Classy.classify;
	
	
	/**
	 * @template T
	 * 
	 * @constructor
	 * @class Duct.Listener
	 * 
	 * @param {Event<T>} event
	 * 
	 * @property {Event<T>} _event
	 */
	function Listener(event)
	{
		this._event = event;
		
		classify(this);
	}
	
	
	/**
	 * @template T
	 * @param {T|*} target
	 * @param {T=} callback
	 * @return {Listener<T>}
	 */
	Listener.prototype.add = function (target, callback)
	{
		this._event.add(target, callback);
		return this;
	};
	
	/**
	 * @template T
	 * @param {T|*} target
	 * @param {T=} callback
	 * @return {Listener<T>}
	 */
	Listener.prototype.remove = function (target, callback)
	{
		this._event.remove(target, callback);
		return this;
	};
	
	
	this.Listener = Listener;
});
namespace('OUI.Core.Events', function (window)
{
	var classify = window.Classy.classify;


	function DeferCallback(threshold, callback)
	{
		classify(this);

		this._threshold 		= threshold;
		this._callback 			= callback;
		this._callbackTimeout 	= null;
	}


	/**
	 * Execute the callback function in defer time
	 * @param {*} data
	 */
	DeferCallback.prototype.deferAction = function (data) 
	{
		clearTimeout(this._callbackTimeout);
		this._callbackTimeout = setTimeout(this._callback.bind(null, data), this._threshold);
	};

	/**
	 * Cancel previous and execute the call immediately
	 * @param {*} data
	 */
	DeferCallback.prototype.executeAction = function (data) 
	{
		clearTimeout(this._callbackTimeout);
		this._callback(data);
	};

	/**
	 * Prevents the callback to execute if it is now deferred
	 */
	DeferCallback.prototype.cancel = function () 
	{
		clearTimeout(this._callbackTimeout);
	};

	/**
	 * @param {int} threshold
	 */
	DeferCallback.prototype.setThreshold = function (threshold) 
	{
		this._threshold = threshold;
	};

	/**
	 * @param {Function} callback
	 */
	DeferCallback.prototype.setCallback = function (callback) 
	{
		this._callback = callback;
	};


	this.DeferCallback = DeferCallback;
});
namespace('OUI.Core.Pos', function (window)
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify; 
	
	
	/**
	 * @class OUI.Core.Pos.Area
	 */
	function Area(box, initial, areaName, positionName) 
	{	
		classify(this);
		
		/** @type {OUI.Core.Pos.Box} */
		this.box = box;
		
		this.initial = initial;
		this.areaName = areaName;
		this.positionName = positionName;
	}
	
	
	Area.prototype.getName = function () 
	{
		var name = this.areaName;
		
		if (is.string(this.positionName) && this.positionName.length > 0)
		{
			name = name + '-' + this.positionName;
		}
		
		return name;	
	};
	
	
	this.Area = Area;
});
namespace('OUI.Core.Pos', function (window) 
{
	var classify = window.Classy.classify;
	
	
	/**
	 * @class OUI.Core.Pos.Box
	 */
	var Box = function (point, size) 
	{
		classify(this);
		
		/** @type {OUI.Core.Pos.Point} */
		this._point = point;

		/** @type {OUI.Core.Pos.Point} */
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
		return ((this.x() < x) && (this.x() + this.w() >= x)) || 
			(((this.x() + this.w()) > (x + w)) && (this.x() >= x));
	};

	Box.prototype._crossVerticalBorder = function (y, h)
	{
		return ((this.y() < y) && (this.y() + this.h() >= y)) || 
			((this.y() + this.h() > y + h) && (this.y() >= y));
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
namespace('OUI.Core.Pos.Enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.Core.Pos.Enum.TargetPosition
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
namespace('OUI.Core.Pos.Enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.Core.Pos.Enum.TargetSide
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
namespace('OUI.Core.Pos', function (window)
{
	var classify = window.Classy.classify; 
	
	
	/**
	 * @class OUI.Core.Pos.Point
	 */
	function Point(x, y) 
	{	
		classify(this);
		
		this.x = x;
		this.y = y;
	}
	
	
	this.Point = Point;
});
namespace('OUI.Views', function (window) 
{
	var classify = window.Classy.classify;

	/**
	 * @class FileUploadView
	 * @param {string} input
	 * @param {string} button
	 * @param {string} dropzone
	 */
	function FileUploadView(input, button, dropzone)
	{
		classify(this);

		this._input 			= $(input);
		this._dropzone 			= $(dropzone);
		this._button 			= $(button);
		this._dropzoneTimeout 	= null;

		this._button.on('click', this._onButtonClick);
		$(document).on('dragover', this._onDragover);
	}


	FileUploadView.prototype._onButtonClick = function (e)
	{
		this._input.trigger('click');
	};

	FileUploadView.prototype._onDragover = function (e)
	{
		var target 	= $(e.target);
		
		if (this._dropzoneTimeout) 
	    {
	        clearTimeout(this._dropzoneTimeout);
	    } 
	    else 
	    {
	        this._dropzone.addClass('in');
	    }

	    this._dropzone.toggleClass('hover', target.closest(this._dropzone).length);
	    this._dropzoneTimeout = setTimeout(this._resetHover, 100);
	};

	FileUploadView.prototype._resetHover = function ()
	{
		this._dropzoneTimeout = null;
		this._dropzone.removeClass('in hover');
	};


	this.FileUploadView = FileUploadView;
});
namespace('OUI.Views.List', function (window) 
{
	var classify = window.Classy.classify;


	/**
	 * @class OUI.Views.List.ListSearchView
	 */
	function ListSearchView()
	{
		classify(this);
		
		this._itemsContainer 		= null;
		this._itemsWrapper			= null;
		this._nullstateContainer 	= null;
	}


	ListSearchView.prototype.setItemsContainer = function (container)
	{
		this._itemsContainer 	= $(container);
		this._itemsWrapper 		= this.getItemsWrapper();
	};

	ListSearchView.prototype.getItemsWrapper = function ()
	{
		var container = this._itemsContainer;
		return container.parent()[0].tagName === 'TABLE' ? container.parent() : container;
	};

	ListSearchView.prototype.setNullstate = function (container)
	{
		this._nullstateContainer = $(container);
	};

	ListSearchView.prototype.hideNullstate = function ()
	{
		this._itemsWrapper.removeClass('hidden');
		this._nullstateContainer.empty().addClass('hidden');
	};

	ListSearchView.prototype.showNullstate = function ()
	{
		this._itemsWrapper.addClass('hidden');
		this._nullstateContainer.removeClass('hidden');
	};

	
	this.ListSearchView = ListSearchView;
});
namespace('OUI.Views.List', function (window) 
{
	var is		 = window.Plankton.is;
	var classify = window.Classy.classify;


	/**
	 * @class OUI.Views.List.ListSortingView
	 */
	function ListSortingView(sorting, params, selector)
	{
		classify(this);

		this._sorting = sorting;

		this._sortColumns = $('.sortable');
		this._sortColumns.on('click', this.updateLink);
		
		this._setInitialSorting();
	}

	
	ListSortingView.prototype._setInitialSorting = function ()
	{
		var order = this._sorting.getParams()._order;
		
		if (!is.defined(order))
			return;
		
		var orderData = order.split(',');
		
		var elem = $(".sortable[data-order-by='" + orderData[0] +"']");
		
		if (elem.length > 0)
		{
			var orderWay = orderData[1] === "0" ? 1 : 0;
			elem.data('order-way', orderWay);
			
			this._setOrder(elem);
			this._updateLink(elem);
			
			elem.addClass('active');
		}
	};

	ListSortingView.prototype._setOrder = function (elem)
	{
		var order 		= elem.data();
		var orderWay 	= order.orderWay === 1 ? 0 : 1;

		this._sorting.setParam('_page', 0);
		this._sorting.setParam('_order', order.orderBy + ',' + orderWay);

		if (orderWay === 1)
		{
			elem.addClass('asc');
		}
		else 
		{
			elem.removeClass('asc');
		}

		elem.data('order-way', orderWay);
	};

	ListSortingView.prototype._updateLink = function (elem)
	{
		var path 		= window.location.pathname;
		var queryString = $.param(this._sorting.getParams());

		elem.attr('href', path + (queryString.length ? '?' + queryString : ''));
	};

	
	ListSortingView.prototype.setActive = function (e)
	{
		this._sortColumns.removeClass('active');
		$(e.target).addClass('active');
	};

	ListSortingView.prototype.updateLink = function (e)
	{
		var elem = $(e.target);
		
		this._setOrder(elem);
		this._updateLink(elem);
		this._sorting.sort(e);
	};

	
	this.ListSortingView = ListSortingView;
});
namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var is			= window.Plankton.is;


	function SearchFormView(form, container, value, param, placeholder)
	{
		classify(this);

		this._form 			= form;
		this._container 	= $(container);

		this._input 		= 'input[type="text"]';
		this._clearButton 	= '.toggle-button';
		
		this._cancelIcon 	= 'icon-cancel-squared';
		this._searchIcon	= 'icon-search';
		
		this._inputEl		= null;

		this.render(value, param, placeholder);
		this.bindEvents();
	}
	
	
	SearchFormView.prototype._onClearButtonClick = function ()
	{
		var button 	= this._container.find(this._clearButton);
		
		if (!button.hasClass(this._cancelIcon))
			return;
		
		this._form.clear();
	};
	
	SearchFormView.prototype._getInputEl = function()
	{
		if (!is(this._inputEl))
			this._inputEl = this._container.find(this._input);
		
		return this._inputEl;
	};
	
	SearchFormView.prototype._toggleIconSearch = function(button)
	{
		button.removeClass(this._cancelIcon).addClass(this._searchIcon);
	};
	
	SearchFormView.prototype._toggleIconCancel = function(button)
	{
		button.removeClass(this._searchIcon).addClass(this._cancelIcon);
	};
	
	SearchFormView.prototype._transformIconByEvent = function(e, button)
	{
		if (!is.object(e) || !is(e.target) || !is(e.target.value))
		{
			this._toggleIconSearch(button)
		}
		else
		{
			this._toggleIconCancel(button);
		}
	};
	
	SearchFormView.prototype._transformIconByValue = function(button)
	{
		if (!is(this._getInputEl().val()))
		{
			this._toggleIconSearch(button);
		}
		else
		{
			this._toggleIconCancel(button);
		}
	};


	SearchFormView.prototype.getValue = function ()
	{
		return this._container.find(this._input).val();
	};

	SearchFormView.prototype.clearInput = function ()
	{
		var button = this._container.find(this._clearButton);

		this._getInputEl().val('');
		button.removeClass(this._cancelIcon).addClass(this._searchIcon);
	};

	SearchFormView.prototype.transformIcon = function (e)
	{
		var button 	= this._container.find(this._clearButton);
		
		if (is.object(e))
		{
			this._transformIconByEvent(e, button);
		}
		else
		{
			this._transformIconByValue(button);
		}
	};

	SearchFormView.prototype.bindEvents = function ()
	{
		this._container.on('input', this._input, this._form.input);
		this._container.on('click', this._clearButton, this._onClearButtonClick);
	};

	SearchFormView.prototype.render = function (value, param, placeholder)
	{
		this._container.append(hbs('search-form', {
			value: value,
			param: param,
			placeholder: placeholder			
		}));

		this.transformIcon();
	};


	this.SearchFormView = SearchFormView;
});
namespace('OUI.Views', function (window) 
{
	var is 			= window.Plankton.is;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Views.TabsView
	 */
	function TabsView(tabs, buttonsSelector) 
	{
		classify(this);

		this._tabs 			= tabs;

		this._activeClass 	= 'active';
		this._hiddenClass 	= 'hidden';
		this._dataAttr 		= 'oui-tab';

		this._buttons 		= is.object(buttonsSelector) ? buttonsSelector : $(buttonsSelector);

		this._buttons.on('click', this._onClick);
	}


	TabsView.prototype._onClick = function (e)
	{
		this._tabs.select($(e.currentTarget).data(this._dataAttr));
	};

	TabsView.prototype._forEachTab = function (tabId, index)
	{
		var tabButton 		= this._buttons.eq(index);
		var tabContainer 	= $('#' + tabButton.data(this._dataAttr));

		if (tabButton.data(this._dataAttr) === tabId)
		{
			tabButton.addClass(this._activeClass);
			tabContainer.removeClass(this._hiddenClass);
		}
		else
		{
			tabContainer.addClass(this._hiddenClass);	
		}
	};


	TabsView.prototype.select = function (tabId)
	{
		this._buttons.removeClass(this._activeClass);
		this._buttons.each(this._forEachTab.bind(this, tabId));
	};


	this.TabsView = TabsView;
});
namespace('OUI.Views.Toast', function (window)
{
	var is		 = window.Plankton.is;
	var classify = window.Classy.classify;
	
	
	var ToastController = function (toast)
	{
		classify(this);
		this._toast = toast;
	};
	
	
	ToastController.prototype.getCta = function ()
	{
		return this._toast.find('a');
	};
	
	ToastController.prototype.setText = function (text)
	{
		if (!is.string(text))
			text = text.toString();
		
		this._toast.find('p').text(text);
	};
	
	ToastController.prototype.setCtaText = function (text)
	{
		if (!is(text))
		{
			text = '';
		}
		else if (!is.string(text))
		{
			text = text.toString();
		}
		
		if (!is(text))
		{
			this.getCta().hide();
		}
		else
		{
			this.getCta().show();
		}
		
		this.getCta().text(text);
	};
	
	
	this.ToastController = ToastController;
});
namespace('OUI.Views', function (window) 
{
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Views.WrapperView
	 */
	function WrapperView(container, template) 
	{
		classify(this);

		this._container = $(container);
		this._template 	= template;
	};


	WrapperView.prototype.getContainer = function ()
	{
		return this._container;
	};

	WrapperView.prototype.render = function (params)
	{
		params = params || {};
		return this._container.empty().append(this._template.hbs(params));
	};


	this.WrapperView = WrapperView;
});
namespace('Plankton', function (root)
{
	var is = root.Plankton.is;
	
	
	/**
	 * @class Plankton.array
	 * @alias array
	 * 
	 * @param {*} subject
	 * @return {Array}
	 */
	var array = function(subject)
	{
		if (is.undefined(subject))
			return [];
		
		return (is.array(subject) ? subject : [subject]);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)|*=} b
	 */
	array.foreach = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		array.foreach.key(subject, scope, function(key)
		{
			return callback.call(this, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	array.foreach.value = array.foreach;
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)|*} callback
	 * @param {function(Number)|*=} b
	 */
	array.foreach.key = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		for (var key in subject)
		{
			if (!is.index(key))
				continue;
			
			if (callback.call(scope, parseInt(key)) === false)
			{
				break;
			}
		}
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)|*} callback
	 * @param {function(Number)|*=} b
	 */
	array.foreach.pair = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		array.foreach.key(subject, scope, function(key)
		{
			return callback.call(this, key, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Array)} callback
	 * @param {function(Number)|*=} b
	 */
	array.foreach.item = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		array.foreach.pair(subject, scope, function(key, value)
		{
			var obj = {};
			obj[key] = value;
			return callback.call(scope, obj);
		});
	};
	
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.last = function (subject)
	{
		if (subject.length === 0)
			return undefined;
		
		return subject[subject.length - 1];
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.last.key = function (subject)
	{
		if (subject.length === 0)
			return undefined;
		
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
	array.first = function (subject)
	{
		var first = undefined;
		
		array.foreach.value(subject, function(value)
		{
			first = value;
			return false;
		});
		
		return first;
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.first.key = function (subject)
	{
		var first = undefined;
		
		array.foreach.key(subject, function(value)
		{
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
	array.count = function (subject)
	{
		var count = 0;
		array.foreach(subject, function() { count++; });
		return count;
	};
	
	/**
	 * @param {Array} subject
	 * @returns {boolean}
	 */
	array.isNormalized = function (subject)
	{
		return subject.length === 0 || array.last.key(subject) === (array.count(subject) - 1);
	};
	
	/**
	 * @param {Array} subject
	 * @returns {Array}
	 */
	array.normalize = function (subject)
	{
		var arr = [];
		
		array.foreach(subject, function(value)
		{
			arr.push(value);
		});
		
		return arr;
	};
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.unique = function (subject)
	{
		return subject.filter(function(value, index, array)
		{
			return array.indexOf(value) === index;
		});
	};
	
	
	this.array = array;
});
namespace('Plankton', function (root)
{
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
				return result;
			
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
	
	/**
	 * @param {*} value
	 * @param {function} callback
	 */
	func.returns = function (value, callback)
	{
		return function ()
		{
			callback.apply(null, arguments);
			return value;
		}
	};
	
	/**
	 * @param {function} callback
	 */
	func.returns.true = function (callback)
	{
		return func.returns(true, callback);
	};
	
	/**
	 * @param {function} callback
	 */
	func.returns.false = function (callback)
	{
		return func.returns(false, callback);
	};
	
	
	this.func = func;
});
namespace('Plankton', function (root)
{
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
		obj.foreach.pair(subject, function (key, val) { res[key] = val; });
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
			obj.foreach.pair(arguments[i], function (key, val) { subject[key] = val; });
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
			obj.foreach.pair(arguments[i], function (key, val) { res[key] = val; });
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
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.key(subject, scope, function (key) 
		{
			return callback.call(scope, subject[key]);
		});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.value = obj.foreach;
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.key = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
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
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.pair = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.key(subject, scope, function (key)
		{
			return callback.call(this, key, subject[key]);
		});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.item = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.pair(subject, scope, function (key, value)
		{
			return callback.call(this, obj.combine(key, value));
		});
	};
	
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		return obj.filter.pair(subject, scope, function (key, value)
		{
			return callback.call(this, value);
		})
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.value = obj.filter;
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.key = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		return obj.filter.pair(
			subject, 
			scope,
			function (key)
			{
				return callback.call(this, key);
			});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.pair = function (subject, callback, b)
	{
		var filtered = {};
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.pair(
			subject, 
			scope,
			function (key, value)
			{
				var res = callback.call(this, key, value);
				
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
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.item = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		return obj.filter.pair(
			subject, 
			scope,
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
namespace('OUI.Core.Pos', function (window) 
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify; 
	var Box 		= window.OUI.Core.Pos.Box;
	var Point		= window.OUI.Core.Pos.Point;
	
	
	/**
	 * @class OUI.Core.Pos.Positioner
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
		if (is.false(this.areas) || is.empty(this.areas))
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
		
		area.initial.y = area.initial.y + originalY - area.box.y();
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
			target = this._transformTarget(target, this._moveX(target, box), this._moveY(target, box));

			if (target.x() <= 0 || target.y() <= 0)
			{
				return false;
			}
		}
		
		return target;
	};
	
	Positioner.prototype._putInInitialPoint = function (area) 
	{
		var target = this._transformTarget(area.box, area.initial.x, area.initial.y);
		
		if (!target.isCrossBorder(area.box))
		{
			return target;
		}
		
		return false;
	};
	
	Positioner.prototype._tryPutTargetInArea = function (area, isInitial) 
	{
		if (!this._prepareArea(area))
		{
			return false;
		}
		
		var target = null;
		
		if (isInitial)
		{
			target = this._putInInitialPoint(area);
		}
		else
		{		
			target = this._putInArea(area.box, area.initial.x, area.initial.y, area);
		}

		
		if (!is.true(target))
		{
			return false;
		}
		
		this.absolutePosition = new Point(target.x(), target.y());
		this.relativePosition = new Point(target.x() - this.related.x(), target.y() - this.related.y());
		
		return true;
	};
	
	Positioner.prototype._load = function (isInitial) 
	{
		var index;
		
		for (index = 0; index < this.areas.length; ++index)
		{
			if (this._tryPutTargetInArea(this.areas[index], isInitial))
			{
				break;
			}
		}
		
		return this.areas[index];
	};
		
	
	Positioner.prototype.getPosition = function (isRelative) 
	{
		isRelative = isRelative || false;
		
		if (!this._checkParams())
		{
			return false;
		}
		
		var targetArea = this._load(true);
		
		if (is.null(this.absolutePosition))
		{
			targetArea = this._load(false);
			if (is.object(targetArea))
			{
				targetArea.positionName = '';
			}
		}
		
		if (is.null(this.absolutePosition))
		{
			console.log('Error: impossible to put target in a correct position');
			
			this.areas[0].positionName = 'nonpositioned';
			
			return {
				name: null,
				coordinates: {
					x: this.areas[0].box.x(),
					y:  this.areas[0].box.y()
				}
			};
		}
		
		var x = this.absolutePosition.x;
		var y = this.absolutePosition.y;
		
		if (isRelative)
		{
			x = this.relativePosition.x;
			y = this.relativePosition.y;
		}
		
		return {
			name: targetArea.getName(),
			coordinates: {
				x: x,
				y: y
			}
		}
	};
	
	
	this.Positioner = Positioner;
});
namespace('OUI.Views.List', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var obj			= window.Plankton.obj;


	/**
	 * @class OUI.Views.List.ListPaginationView
	 */
	function ListPaginationView(listPagination, container) 
	{
		classify(this);

		this._pagination 	= listPagination;
		this._container 	= $(container);

		this._nextSelector	= '[data-next]';
		this._prevSelector 	= '[data-prev]';

		this._bindEvents();
		this.render();
	}


	ListPaginationView.prototype._getLink = function (params)
	{
		return window.location.pathname + '?' + $.param(params);
	};

	ListPaginationView.prototype._getNextPageLink = function (page, total, count)
	{
		var params = obj.copy(this._pagination.getParams());

		if ((page + 1) * count < total)
		{
			params['_page'] = page + 1;
		}

		return this._getLink(params);
	};

	ListPaginationView.prototype._getPrevPageLink = function (page, total, count)
	{
		var params = obj.copy(this._pagination.getParams());

		if (page > 0)
		{
			params['_page'] = page - 1;
		}

		return this._getLink(params);
	};

	ListPaginationView.prototype._getViewParams = function ()
	{
		var total 	= this._pagination.getTotal();
		var page 	= this._pagination.getPage();
		var count 	= this._pagination.getCount();

		var showingFrom = (page * count) + 1;
		var showingTo 	= (page + 1) * count < total ? (page + 1) * count : total;

		var data = 
		{
			showingFrom: 	showingFrom.toLocaleString(),
			showingTo: 		showingTo.toLocaleString(),
			prevPageLink: 	this._getPrevPageLink(page, total, count),
			nextPageLink: 	this._getNextPageLink(page, total, count),
			hasNextPage: 	(page + 1) * count < total,
			hasPrevPage: 	page > 0,
			total: total.toLocaleString()
		};

		return data;
	};

	ListPaginationView.prototype._bindEvents = function ()
	{
		this._container.on('click', this._nextSelector, this._pagination.next);
		this._container.on('click', this._prevSelector, this._pagination.prev);
	};


	ListPaginationView.prototype.render = function ()
	{		
		this._container.empty().append(hbs('pagination', this._getViewParams()));
	};

	
	this.ListPaginationView = ListPaginationView;
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
			return array.foreach;
		}
		else if (is.jsObject(subject))
		{
			return obj.foreach;
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
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	var foreach = function (subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.value(subject, callback, b);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.value = foreach;
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.key = function (subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.key(subject, callback, b);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.pair = function(subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.pair(subject, callback, b);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.item = function(subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.item(subject, callback, b);
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
namespace('Duct.LT', function (root)
{
	var classify	= root.Classy.classify;
	
	var is			= root.Plankton.is;
	var func		= root.Plankton.func;
	var foreach		= root.Plankton.foreach;
	
	
	/**
	 * @class {Duct.LT.LifeBind}
	 * @alias {LifeBind}
	 * 
	 * @constructor
	 */
	function LifeBind()
	{
		this._original	= [];
		this._boundData	= [];
		this._isAlive	= true;
		
		classify(this);
	}
	
	
	LifeBind.prototype._invokeUnbind = function (onDestroy, original, bound)
	{
		delete bound.__DUCT_ORIGINAL_CALLBACK__;
		onDestroy(original, bound);
	};	
	
	LifeBind.prototype._invokeUnbinds = function (original, boundData)
	{
		foreach(boundData, this, function (item) 
		{
			this._invokeUnbind(item[0], original, item[1]);
		});
	};
	
	LifeBind.prototype._createCallback = function (callback)
	{
		var self = this;
		var selfUnbound = false;
		
		return function ()
		{
			if (!self._isAlive)
				return;
			else if (selfUnbound)
				return;
			
			var result = callback.apply(this, arguments);
			
			if (result === false)
			{
				selfUnbound = true;
				self.unbind(callback);
			}
			else if (result === null)
			{
				self.kill();
			}
		};
	};
	
	LifeBind.prototype._add = function (onDestroy, callback, bound)
	{
		var index = this._original.indexOf(callback);
		
		if (index === -1)
		{
			this._original.push(callback);
			this._boundData.push([ [ onDestroy, bound ] ]);
		}
		else
		{
			this._boundData[index].push([ onDestroy, bound ]);
		}
	};
	
	
	/**
	 * @param {function} callback
	 * @param {function(Function, Function)=} onDestroy
	 */
	LifeBind.prototype.bindToLife = function (callback, onDestroy)
	{
		onDestroy = onDestroy || function() {};
		
		var self = this;
		var boundCallback = this._createCallback(callback);
		
		boundCallback.__DUCT_ORIGINAL_CALLBACK__ = callback;
		
		if (!this._isAlive)
		{
			func.async.do(function ()
			{
				self._invokeUnbind(onDestroy, callback, boundCallback);
			});
		}
		else
		{
			this._add(onDestroy, callback, boundCallback);
		}
		
		return boundCallback;
	};

	/**
	 * @param {function} callback
	 */
	LifeBind.prototype.unbind = function (callback)
	{
		if (is.function(callback.__DUCT_ORIGINAL_CALLBACK__))
		{
			this.unbind(callback.__DUCT_ORIGINAL_CALLBACK__);
			return;
		}
		
		var boundData;
		var index = this._original.indexOf(callback);
		
		if (index === -1) return;
		
		boundData = (this._boundData.splice(index, 1))[0];
		
		this._original.splice(index, 1);
		this._invokeUnbinds(callback, boundData)
	};
	
	LifeBind.prototype.clear = function ()
	{
		var original	= this._original;
		var boundData 	= this._boundData;
		var count		= boundData.length;
		
		this._original	= [];
		this._boundData	= [];
		
		for (var i = 0; i < count; i++)
		{
			this._invokeUnbinds(original[i], boundData[i]);
		}
	};
	
	LifeBind.prototype.kill = function ()
	{
		if (!this._isAlive) return;
		
		this._isAlive = false;
		this.clear();
	};

	/**
	 * @return {boolean}
	 */
	LifeBind.prototype.isAlive = function ()
	{
		return this._isAlive;
	};

	/**
	 * @return {boolean}
	 */
	LifeBind.prototype.isDead = function ()
	{
		return !this._isAlive;
	};
	
	
	this.LifeBind = LifeBind;
});
namespace('Duct', function (root)
{
	var func		= root.Plankton.func;
	var foreach		= root.Plankton.foreach;
	
	
	/**
	 * @name {Duct.Trigger}
	 * @alias {Trigger}
	 */
	var Trigger = {
		
		asyncHandle: function (callbacks, args, next)
		{
			foreach(callbacks, function(callback)
			{
				func.async.do(function() 
				{
					next([callback], args);
				});
			});
		},
		
		asyncTrigger: function (callbacks, args, next)
		{
			func.async.do(function() 
			{
				next(callbacks, args);
			});
		}
	};
	
	
	this.Trigger = Trigger;
});
namespace('OUI.Components', function (window)
{
	var foreach		= window.Plankton.foreach;
	var classify 	= window.Classy.classify;
	
	
	/**
	 * @see https://en.gravatar.com/site/implement/images/
	 * @param {jQuery} elements
	 */
	function Gravatar(elements, size, defaultImage)
	{
		classify(this);
		
		this._elements 	= elements;
		this._base 		= 'https://www.gravatar.com/avatar/';
		this._size 		= size || 160;
		this._default 	= defaultImage || 'identicon';
		
		this._init();
	}
	
	
	Gravatar.prototype._init = function ()
	{
		foreach(this._elements.toArray(), this._set);
	};
	
	Gravatar.prototype._set = function (elem)
	{
		$(elem).attr('src', this._get($(elem)));
	};
	
	Gravatar.prototype._get = function (elem)
	{
		return this._base + md5(elem.data('gravatar').toLowerCase()) + '?s=' + this._size + '&d=' + this._default;
	};
	
	
	this.Gravatar = Gravatar;
});
namespace('OUI.Components.List', function (window) 
{
	var is			= window.Plankton.is;
	var obj			= window.Plankton.obj;
	var foreach		= window.Plankton.foreach;
	var classify	= window.Classy.classify;
	
	
	function ListItemsContainer()
	{
		this._recordTransformers	= [];
		this._payloadTransformers	= [];
		
		this._hasTransformers	= null;
		this._original			= null;
		this._data				= null;
		this._key				= 'Items';
		
		classify(this);
	}
	
	
	ListItemsContainer.prototype._transform = function ()
	{
		var original	= this._original;
		var data		= obj.copy(original);
		var count		= 0;
		
		data[this._key] = [];
		
		foreach (original[this._key], this, function (record)
		{
			var result = record;
			
			foreach (this._transformers, this, function (transformer)
			{
				result = transformer(original, result, count++)
			});
			
			data[this._key].push(result);
		});
	};
	
	ListItemsContainer.prototype._transform = function ()
	{
		var original	= this._original;
		var data		= obj.copy(original);
		var count		= 0;
		
		foreach (this._payloadTransformers, function (transformer)
		{
			data = transformer(original, obj.copy(data));
		});
		
		data[this._key] = [];
		
		foreach (original[this._key], this, function (record)
		{
			var result = record;
			
			foreach (this._recordTransformers, this, function (transformer)
			{
				result = transformer(data, obj.copy(result), count++)
			});
			
			data[this._key].push(result);
		});
		
		this._data = data;
	};
	
	
	ListItemsContainer.prototype.setKey = function (key)
	{
		this._key = key;
		return this;
	};
	
	ListItemsContainer.prototype.addItemsTransformer = function (transformer)
	{
		this._hasTransformers = true;
		this._recordTransformers.push(transformer);
		return this;
	};
	
	ListItemsContainer.prototype.addPayloadTransformer = function (transformer)
	{
		this._hasTransformers = true;
		this._payloadTransformers.push(transformer);
		return this;
	};
	
	ListItemsContainer.prototype.getOriginalData = function ()
	{
		return this._original;
	};
	
	ListItemsContainer.prototype.getData = function ()
	{
		return this._data;
	};
	
	ListItemsContainer.prototype.setData = function (data, key)
	{
		this.key = key || this._key;
		this._original = data;
		
		if (this._hasTransformers)
		{
			this._transform();
		}
		else 
		{
			this._data = data;
		}
			
		return this;
	};
	
	ListItemsContainer.prototype.getItems = function ()
	{
		return (is(this._data) ? this._data[this._key] : []);
	};
	
	ListItemsContainer.prototype.getCount = function ()
	{
		return (is(this._data) ? this._data[this._key].length : 0);
	};
	
	ListItemsContainer.prototype.hasItems = function ()
	{
		return (is(this._data) ? this._data[this._key].length > 0 : false);
	};
	
	
	this.ListItemsContainer = ListItemsContainer;
});
namespace('OUI.Core.Pos.Prepared', function (window) 
{
	var is 				= window.Plankton.is;
	var classify		= window.Classy.classify;
	var Point 			= window.OUI.Core.Pos.Point;
	var Box 			= window.OUI.Core.Pos.Box;
	var Area			= window.OUI.Core.Pos.Area;
	var Positioner		= window.OUI.Core.Pos.Positioner;
	var TargetSide 		= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 	= window.OUI.Core.Pos.Enum.TargetPosition;
	
	
	var defaults = {
		container: window,
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0,
		isRelative: false,
		initialSide: null,
		initialPosition: null
	};
	
	
	/**
	 * @class OUI.Core.Pos.Prepared.BasePreparedWithOffsets
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
	
	
	BasePreparedWithOffsets.prototype._isSVG = function (el)
	{
		return (el instanceof SVGElement);
	};
	
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
			&& (is.object(this.settings.relatedElement) || (this._isSVG(this.settings.relatedElement)))
			&& (is.object(this.settings.targetElement));
	};
	
	BasePreparedWithOffsets.prototype._isNeedToSubtractContainer = function () 
	{
		if ($.isWindow(this.settings.container) || this.settings.container.is(document))
		{
			return false;
		}
		
		return (this.settings.container.css('position') === 'relative');
	};
	
	BasePreparedWithOffsets.prototype._subtractContainer = function (position) 
	{
		var container = this._getContainerBox(false);

		position.coordinates.x = position.coordinates.x - container.x();
		position.coordinates.y = position.coordinates.y - container.y();
		
		return position;
	};
		
	BasePreparedWithOffsets.prototype._applyOffset = function (position, offset, canOffsetInside) 
	{
		var leftWithOffset = position.left - offset;
		var topWithOffset = position.top - offset;
		
		return {
			left: leftWithOffset >= 0 ? leftWithOffset : canOffsetInside ? leftWithOffset * -1 : 0,
			top: topWithOffset >= 0 ? topWithOffset :  canOffsetInside ? topWithOffset * -1 : 0
		};
	};
		
	BasePreparedWithOffsets.prototype.getPositionWithOffset = function (el, offset, canOffsetInside) 
	{
		var position = {left: 0, top: 0};
		
		if (!$.isWindow(el) && !this._isSVG(el) && !el.is(document))
		{
			position = el.offset();	
		}
		
		if ($.isWindow(el))
		{
			position = { left: $(el).scrollLeft(), top: $(el).scrollTop() }
		}
		
		if (this._isSVG(el))
		{
			position = $(el).offset();
		}

		return this._applyOffset(position, offset, canOffsetInside);
	};
	
	BasePreparedWithOffsets.prototype._getSizeWithOffset = function (el, offset, top, left) 
	{
		if ($.isWindow(el))
		{
			el = $(el);
		}
		
		var xOffsetModifier = 1;
		
		if (left >= offset && left >= offset * -1)
		{
			xOffsetModifier = 2;
		}

		var yOffsetModifier = 1;
		
		if (top >= offset && top >= offset * -1)
		{
			yOffsetModifier = 2;
		}

		if (!this._isSVG(el))
		{
			var width = el.outerWidth();
			var height = el.outerHeight();
		}
		else 
		{
			var rect = el.getBoundingClientRect();
			
			var width = rect.right - rect.left;
			var height = rect.bottom - rect.top;
		}
		
		if ($.isWindow(el))
		{
			var width = width + el.scrollLeft();
			var height = height + el.scrollTop();
		}
		
		return {
			width: width + offset * xOffsetModifier, 
			height: height + offset * yOffsetModifier
		};
	};
	
	BasePreparedWithOffsets.prototype._getElementBox = function (el, offset, canOffsetInside) 
	{
		offset = offset || 0;
		canOffsetInside = canOffsetInside || false;
		
		if (el instanceof HTMLElement)
		{
			el = $(el);
		}
		
		var position = this.getPositionWithOffset(el, offset, canOffsetInside);

		var size = this._getSizeWithOffset(el, offset, position.top, position.left);
		
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
			return this._getElementBox(this.settings.container, 0, true);
		}
		
		if (this.settings.containerOffset > 0)
		{
			this.settings.containerOffset = this.settings.containerOffset * -1;
		}
		
		return this._getElementBox(this.settings.container, this.settings.containerOffset, true);
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
	
	BasePreparedWithOffsets.prototype._getHorizontalSide = function (relatedBox, targetBox, side) 
	{
		if (side === TargetSide.bottom)
		{
			var y = relatedBox.y() + relatedBox.h() + this.settings.targetOffset;
		}
		else
		{
			y = relatedBox.y() - targetBox.h() - this.settings.targetOffset;
		}

		var x = relatedBox.x() - targetBox.w();

		var h = targetBox.h();
		var w = relatedBox.w() + (targetBox.w() * 2);

		var box = this._prepareBox(x, y, w, h);
		var initial = this._getInitialPosition(targetBox, relatedBox, false);
		var areaName = side;
		var positionName = this.settings.initialPosition;
		
		return new Area(box, initial, areaName, positionName);
	};

	BasePreparedWithOffsets.prototype._getVerticalSide = function (relatedBox, targetBox, side) 
	{
		if (side === TargetSide.right)
		{
			var x = relatedBox.x() + relatedBox.w() + this.settings.targetOffset;
		}
		else
		{
			x = relatedBox.x() - targetBox.w() - this.settings.targetOffset;
		}

		var y = relatedBox.y() - targetBox.h();

		var w = targetBox.w();
		var h = relatedBox.h() + (targetBox.h() * 2);

		var box = this._prepareBox(x, y, w, h);
		var initial = this._getInitialPosition(targetBox, relatedBox, true);
		var areaName = side;
		var positionName = this.settings.initialPosition;
		
		return new Area(box, initial, areaName, positionName);
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
				return this._getHorizontalSide(relatedBox, targetBox, TargetSide.top);
				
			case TargetSide.bottom:
				return this._getHorizontalSide(relatedBox, targetBox, TargetSide.bottom);
				
			case TargetSide.right:
				return this._getVerticalSide(relatedBox, targetBox, TargetSide.right);
				
			case TargetSide.left:
				return this	._getVerticalSide(relatedBox, targetBox, TargetSide.left);
				
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
	
	BasePreparedWithOffsets.prototype._setupData = function (position) 
	{		
		if (!is.object(position))
			return false;
		
		if (this._isNeedToSubtractContainer())
		{
			position = this._subtractContainer(position);
		}
		
		position.coordinates.left = position.coordinates.x;
		position.coordinates.top = position.coordinates.y;
		
		return position;
			
	};
	
	BasePreparedWithOffsets.prototype.getPosition = function () 
	{
		var data = this._getData();
		
		if (is.object.empty(data))
		{
			return false;
		}
		
		var positioner = new Positioner(data);

		var position = positioner.getPosition(this.settings.isRelative);
		
		position = this._setupData(position);

		return position;
	};
	

	this.BasePreparedWithOffsets = BasePreparedWithOffsets;
});
namespace('OUI.Views.List', function (window)
{
	var classify 	= window.Classy.classify;
	var is 			= window.Plankton.is;
	var foreach 	= window.Plankton.foreach;
	
	
	/**
	 * @class OUI.Views.List.ListSelectionView
	 */
	function ListSelectionView(selection, itemsContainer, itemsSelector, selectAll)
	{
		classify(this);
		
		this._selection 	= selection;
		
		this._container 	= $(itemsContainer);
		this._itemsSelector = itemsSelector;
		this._selectAll 	= $(selectAll);
		this._selectedClass = 'selected';
		this._lastSelected  = null;
		
		this._bindEvents();
	}
	
	
	ListSelectionView.prototype._bindEvents = function ()
	{
		this._selectAll.on('change', this._toggleSelectAll);
		this._container.on('click', this._itemsSelector, this._onClick);
	};
	
	ListSelectionView.prototype._toggleSelectAll = function (e)
	{
		var checkbox 	= $(e.target);
		var items 		= this._container.find(this._itemsSelector);
		var ids 		= [];
		
		items.each(function ()
		{
			ids.push($(this).attr('id'));
		});
		
		if (checkbox.is(':checked'))
		{
			this._selection.select(ids);
		}
		else
		{
			this._selection.deselect(ids);
		}
	};
	
	ListSelectionView.prototype._updateSelectAll = function ()
	{
		var items 		= this._container.find(this._itemsSelector);
		var selected 	= this._container.find(this._itemsSelector + ':checked') || [];
		
		if (items.length === selected.length)
		{
			this._selectAll.prop('checked', true);
			this._selectAll.prop("indeterminate", false);
		}
		else if (selected.length === 0)
		{
			this._selectAll.prop('checked', false);
			this._selectAll.prop("indeterminate", false);
		}
		else
		{
			this._selectAll.prop('checked', false);
			this._selectAll.prop("indeterminate", true);
		}
	};
	
	ListSelectionView.prototype._shiftSelect = function (checkboxId, isChecked)
	{
		if (!is(this._lastSelected))
			return;
		
		var itemIds = this._container.find(this._itemsSelector).toArray().map(function (item)
		{
			return item.id;
		});
		
		var fromItem = (itemIds.indexOf(checkboxId) < itemIds.indexOf(this._lastSelected)) ? itemIds.indexOf(checkboxId) : itemIds.indexOf(this._lastSelected);
		var toItem = (itemIds.indexOf(checkboxId) < itemIds.indexOf(this._lastSelected)) ? itemIds.indexOf(this._lastSelected) : itemIds.indexOf(checkboxId);
		
		var toSelect = itemIds.slice(fromItem, toItem + 1);
		
		foreach(toSelect, this, function (item)
		{
			this.selectItem(item.id);
		})
		
		if (isChecked)
		{
			this._selection.select(toSelect);
		}
		else
		{
			this._selection.deselect(toSelect);
		}
	};
	
	ListSelectionView.prototype._onClick = function (e)
	{
		var checkbox 	= (e.target.tagName.toLowerCase() === 'input') ? $(e.target) : $(e.target).closest('label').find('input');
		var checkboxId 	= checkbox.attr('id');
		
		if (checkbox.is(':checked'))
		{
			this._selection.select([checkboxId]);
		}
		else
		{
			this._selection.deselect([checkboxId]);
		}
		
		if (e.shiftKey)
		{
			this._shiftSelect(checkboxId, checkbox.is(':checked'))
		}
		
		this._lastSelected = checkboxId;
	};
	
	
	ListSelectionView.prototype.selectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').addClass(this._selectedClass);
		$('#' + itemId).prop('checked', true);
		
		this._updateSelectAll();
	};
	
	ListSelectionView.prototype.deselectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').removeClass(this._selectedClass);
		$('#' + itemId).prop('checked', false);
		
		this._updateSelectAll();
	};
	
	
	this.ListSelectionView = ListSelectionView;
});
namespace('OUI.Views.Tip', function (window)
{
	var classify			= window.Classy.classify;
	var foreach				= window.Plankton.foreach;
	
	
	/**
	 * @class OUI.Views.Tip.DefaultSanitizer
	 */
	function DefaultSanitizer()
	{
		classify(this);
		
		this._transformationMap = {
			'[b]':  '<b>', '[/b]': '</b>',
			'[i]':  '<i>', '[/i]': '</i>',
			'[s]':  '<s>', '[/s]': '</s>',
			'[br]': '<br>'
		};
		
		this._compiledMap = [];
		this._compileMap();
	}
	
	
	DefaultSanitizer.prototype._codeToRegex = function (code)
	{
		return new RegExp(code.replace(/\[/g, '\\['), 'g');
	};
	
	DefaultSanitizer.prototype._compileMap = function ()
	{
		foreach.pair(this._transformationMap, this, function (code, tag)
		{
			this._compiledMap.push({regex: this._codeToRegex(code), tag: tag})
		})
	};
	
	
	DefaultSanitizer.prototype.sanitize = function (string)
	{
		string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		
		foreach(this._compiledMap, function (map)
		{
			string = string.replace(map.regex, map.tag);
		});
		
		return string;
	};
	
	
	this.DefaultSanitizer = DefaultSanitizer;
});
namespace('Duct.LT', function (root)
{
	var is			= root.Plankton.is;
	var foreach		= root.Plankton.foreach;
	var LifeBind	= root.Duct.LT.LifeBind;

	
	var Binder = {
		
		ATTACHMENT_KEY: '__LT__',
		
		/**
		 * @param {object} target
		 * @param {LifeBind} lt
		 * @param {RegExp=} filter
		 */
		attach: function (target, lt, filter)
		{
			filter = filter || /^_handle.+/;
			
			foreach.pair(target, function (name, value)
			{
				if (filter.test(name))
				{
					value[Binder.ATTACHMENT_KEY] = lt;
				}
			});
		},
		
		/** 
		 * @param {*} callback
		 * @return {boolean}
		 */
		isBinded: function (callback)
		{
			if (!is.function(callback) || !is(callback[Binder.ATTACHMENT_KEY]))
				return false;
			
			return (callback[Binder.ATTACHMENT_KEY] instanceof LifeBind);
		},
		
		/**
		 * @param {*} callback
		 * @return {LifeBind|null}
		 */
		get: function (callback)
		{
			return (Binder.isBinded(callback) ? 
				callback[Binder.ATTACHMENT_KEY] : 
				null);
		},
		
		/**
		 * @param {function} callback
		 * @return {function}
		 */
		getBinded: function (callback)
		{
			var lt = Binder.get(callback);
			return (is(lt) ? lt.bindToLife(callback) : callback);
		}
	};
	
	
	this.Binder = Binder;
});
namespace('Duct.LT', function (root)
{
	var array	= root.Plankton.array;
	var foreach	= root.Plankton.foreach;
	
	var Singleton	= root.Classy.Singleton;
	var classify	= root.Classy.classify;
	
	var LifeBind	= root.Duct.LT.LifeBind;
	
	
	/**
	 * @class {Duct.LT.LifeBindFactory}
	 * @alias {LifeBindFactory}
	 * 
	 * @property {function(): LifeBindFactory} instance
	 * 
	 * @constructor
	 */
	function LifeBindFactory()
	{
		this._builders = [];
		
		classify(this);
	}
	
	
	LifeBindFactory.prototype.addBuilder = function (builder)
	{
		this._builders = this._builders.concat(array(builder));
	};
	
	/**
	 * @param {*} element
	 * @return {LifeBind}
	 */
	LifeBindFactory.prototype.get = function (element)
	{
		if (element instanceof LifeBind)
			return element;
		
		var result = undefined;
		
		foreach (this._builders, function (builder) 
		{
			result = builder(element);
			
			if (result instanceof LifeBind)
				return false;
		});
		
		if (!(result instanceof LifeBind))
		{
			throw new Error('Could not convert object to LifeBind type');
		}
		
		return result;
	};
	
	
	this.LifeBindFactory = Singleton(LifeBindFactory);
});
namespace('OUI.Core.Pos.Prepared', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;

	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	

	/**
	 * @class OUI.Core.Pos.Prepared.ConfigurablePosition
	 */
	function ConfigurablePosition(options, sides)
	{
		sides = sides || [];
		
		classify(this);

		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.top,
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
		];
		
		if (sides.length > 0)
		{
			this._availableSides = sides;
		}
	}
	
	
	ConfigurablePosition.get = function (options, sides) 
	{
		var configurablePosition = new ConfigurablePosition(options, sides);
		return configurablePosition.getPosition();
	};
	

	ConfigurablePosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	ConfigurablePosition.prototype.constructor = ConfigurablePosition;
	
	
	ConfigurablePosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
	
	
	this.ConfigurablePosition = ConfigurablePosition;
});
namespace('OUI.Core.Pos.Prepared', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;

	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	

	/**
	 * @class OUI.Core.Pos.Prepared.RoundPosition
	 */
	function RoundPosition(options)
	{
		classify(this);

		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.top,
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
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
namespace('Duct', function (root)
{
	var Trigger			= root.Duct.Trigger;
	var Listener		= root.Duct.Listener;
	var EventDebug		= root.Duct.Debug.EventDebug;
	var Binder			= root.Duct.LT.Binder;
	var LifeBindFactory	= root.Duct.LT.LifeBindFactory;
	
	var is			= root.Plankton.is;
	var func		= root.Plankton.func;
	var foreach		= root.Plankton.foreach;
	
	var classify	= root.Classy.classify;
	
	
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
	 * @param {string=} name
	 * @param {EventDebug=} debug
	 */
	function Event(name, debug)
	{
		classify(this);
		
		this._callbacks	= [];
		this._name		= name || '';
		this._debug		= debug || Event.DEFAULT_DEBUG;
		this._trigger	= this._defaultTrigger;
		this._listener	= new Listener(this);
		
		this._errorHandler = function(err)
		{
			console.error('Error when executing event ' + this._name, err);
		};
	}
	
	
	/**
	 * 
	 * @param {array} callbacks
	 * @param {array} callbackArgs
	 * @private
	 */
	Event.prototype._defaultTrigger = function (callbacks, callbackArgs)
	{
		foreach(callbacks, this, function(callback)
		{
			this._triggerCallback(callback, callbackArgs);
		});
	};
	
	/**
	 * @param {Function} callback
	 * @param {Array} callbackArgs
	 * @private
	 */
	Event.prototype._triggerCallback = function (callback, callbackArgs)
	{
		if (this._callbacks === null) return;
		
		var wrappedCallback = func.safe(callback, this._errorHandler); 
		wrappedCallback.apply(null, callbackArgs);
	};
	
	/**
	 * @param {callback} original
	 * @param {callback} bound
	 * @private
	 */
	Event.prototype._onUnbindLT = function (original, bound)
	{
		this.remove(bound);
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
	
	Event.prototype.clear = function ()
	{
		if (this._callbacks !== null)
			this._callbacks = [];
	};
	
	/**
	 * @template T
	 * @param {T|*} item
	 * @param {T=undefined} callback
	 * @return {Event}
	 */
	Event.prototype.add = function (item, callback)
	{
		if (this._callbacks === null) return this;
		
		if (is.function(callback))
		{
			var lt = LifeBindFactory.instance().get(item);
			var bound = lt.bindToLife(callback, this._onUnbindLT);
			this._callbacks.push(bound);
		}
		else 
		{
			this._callbacks.push(Binder.getBinded(item));
		}
		
		return this;
	};
	
	/**
	 * @template T
	 * @param {T|*} item
	 * @param {T=undefined} callback
	 * @return {Event}
	 */
	Event.prototype.remove = function (item, callback)
	{
		if (this._callbacks === null) return this;
		
		if (is.function(callback))
		{
			LifeBindFactory.instance().get(item).unbind(callback);
			return this;
		}
		
		var index = this._callbacks.indexOf(item);
		
		if (index >= 0)
		{
			this._callbacks.splice(index, 1);
		}
		
		return this;
	};
	
	/**
	 * @returns {Number}
	 */
	Event.prototype.count = function ()
	{
		return this._callbacks.length;
	};
	
	/**
	 * @template T
	 * @type T
	 */
	Event.prototype.trigger = function()
	{
		if (this._callbacks === null) return this;
		
		var callbackArgs = [].slice.apply(arguments);
		
		this._debug.onTrigger(this, callbackArgs);
		this._trigger(this._callbacks.concat(), callbackArgs);
	};
	
	/**
	 * @param {Function} triggerCallback
	 */
	Event.prototype.addTrigger = function (triggerCallback)
	{
		var next = this._trigger;
		this._trigger = function (callbacks, args) { triggerCallback(callbacks, args, next); };
	};
	
	/**
	 * @param {boolean=false} triggerOnly If true, only the trigger called asynchonisuly, but all of the handlers,
	 * called one after another.
	 */
	Event.prototype.async = function (triggerOnly)
	{
		if (triggerOnly === true)
			this.addTrigger(Trigger.asyncTrigger);
		else
			this.addTrigger(Trigger.asyncHandle);
	};
	
	/**
	 * @return {boolean}
	 */
	Event.prototype.isDestroyed = function ()
	{
		return this._callbacks === null;
	};
	
	Event.prototype.destroy = function ()
	{
		this._callbacks = null;
	};
	
	/**
	 * @template T
	 * @param {T|*=} item
	 * @param {T=undefined} callback
	 * @return {Listener}
	 */
	Event.prototype.listener = function(item, callback)
	{
		if (is(item))
			this._listener.add(item, callback);
		
		return this._listener;
	};
	
	
	/**
	 * @param eventName
	 * @return {function(*, *=undefined): Listener}
	 */
	Event.createListener = function (eventName)
	{
		return function (item, callback)
		{
			return this[eventName].listener(item, callback);
		};
	};
	
	
	Event.DEFAULT_DEBUG = new EventDebug();
	
	
	this.Event = Event;
});
namespace('OUI.Views', function (window)
{
	var hbs 			= window.OUI.Core.View.hbs;
	var classify		= window.Classy.classify;
	var obj 			= window.Plankton.obj;
	var is				= window.Plankton.is;
	
	var ConfigurablePosition	= window.OUI.Core.Pos.Prepared.ConfigurablePosition;
	var TargetPosition			= window.OUI.Core.Pos.Enum.TargetPosition;
	var TargetSide				= window.OUI.Core.Pos.Enum.TargetSide;
	
	
	function HoverMenuView(menu, $toggleElement, contents, canPersist, extraClass, positionConfig)
	{
		classify(this);
		
		extraClass = extraClass || '';
		
		
		this._menu 				= menu;
		this._toggleElement 	= $toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= '.oui-hover-menu-underlay';
		this._dataAttr			= 'oui-hover-menu';
		this._positionConfig	= is.false(positionConfig) ? null : positionConfig || {};
		this._canPersist		= canPersist || false;
		
		if (this.isOpen())
		{
			return;
		}
		
		this._bindOpen();
		this._bindRemove();
		
		if (this._canPersist)
		{
			this._bindPersistInit();
		}
	}
	
	
	HoverMenuView.prototype._bindOpen = function ()
	{
		this._toggleElement.on('mouseenter.' + this._menu.getId(), this._menu.open);
	};
	
	HoverMenuView.prototype._bindRemove = function ()
	{
		this._toggleElement.on('mouseleave.' + this._menu.getId() , this._menu.close);
	};
	
	HoverMenuView.prototype._bindPersistInit = function ()
	{
		var self = this;
		
		this._toggleElement.on('click.' + this._menu.getId(), function ()
		{
			if(self.isOpen() && self._menu.isPersist())
			{
				self.getContainer().toggle();
				
				if (!self.getContainer().is(':visible'))
				{
					self.disablePersist();
				}
				else
				{
					self.enablePersist();
				}
			}
			else
			{
				self._menu.togglePersist();
			}
		});
	};
	
	HoverMenuView.prototype._unbindHover = function ()
	{
		this._toggleElement.off('mouseenter.' + this._menu.getId());
		this._toggleElement.off('mouseleave.' + this._menu.getId());
	};
	
	HoverMenuView.prototype._unbindPersistEvents = function ()
	{
		this._toggleElement.off('click.' + this._menu.getId());
		this._unbindPersistClose();
	};
	
	HoverMenuView.prototype._bindPersistClose = function ()
	{
		var self = this;
		
		$(document).on('click.' + self._menu.getId(), function (event)
		{
			if (!$(event.target).closest(self._toggleElement).length &&
			!$(event.target).closest('#' + self._menu.getId()).length)
			{
				self._menu.close();
			}
		});
	};
	
	HoverMenuView.prototype._unbindPersistClose = function ()
	{
		$(document).off('click.' + this._menu.getId());
	};
	
	
	HoverMenuView.prototype.enablePersist = function ()
	{
		this._unbindHover();
		this._bindPersistClose();
	};
	
	HoverMenuView.prototype.disablePersist = function ()
	{
		this._bindOpen();
		this._bindRemove();
		
		this._unbindPersistClose();
	};
	
	HoverMenuView.prototype.getContainer = function ()
	{
		return $('#' + this._menu.getId());
	};
	
	HoverMenuView.prototype.remove = function ()
	{
		this.getContainer().remove();
		this._unbindHover();
		this._unbindPersistEvents();
		
		this._toggleElement.removeData(this._dataAttr);
	};
	
	HoverMenuView.prototype.show = function (container)
	{
		var menu = hbs('hover-menu',
		{
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		});
		
		var $container = is(container) ? container : $('body');
		
		$container.append(menu);
		
		var $target 	= this.getContainer();
		var $related 	= this._toggleElement;
		
		if (is.object(this._positionConfig))
		{
			var baseConfig = {
				container: $container,
				containerOffset: 10,
				relatedElement: $related,
				targetElement: $target,
				initialPosition: TargetPosition.center,
				initialSide: TargetSide.right,
				sides: [TargetSide.right, TargetSide.left]
			};
			
			var config = obj.merge(baseConfig, this._positionConfig);
			
			var pos = ConfigurablePosition.get(config, config.sides);
			
			$target.offset(
			{
				top: pos.coordinates.top,
				left: pos.coordinates.left
			});
			
			$target.addClass(pos.name);
		}
		
		this._toggleElement.data(this._dataAttr, this._menu.getId());
	};
	
	HoverMenuView.prototype.isOpen = function ()
	{
		return this._toggleElement.data(this._dataAttr) !== undefined;
	};
	
	
	this.HoverMenuView = HoverMenuView;
});
namespace('OUI.Components', function (window) 
{
	var Event 			= window.Duct.Event;
	var classify 		= window.Classy.classify;

	var FileUploadView 	= window.OUI.Views.FileUploadView;


	/**
	 * @class FileUpload
	 * @uses $.fn.fileupload
	 * 
	 * @param {string} input
	 * @param {string} button
	 * @param {string} dropzone
	 * @param {object} headers
	 * @param {string} url
	 */
	function FileUpload(input, button, dropzone, url, headers)
	{
		classify(this);
		
		headers = headers || {};

		this._view 		= new FileUploadView(input, button, dropzone);

		this._onAdd 	= new Event('FileUpload.onAdd');
		this._onDone 	= new Event('FileUpload.onDone');
		this._onSuccess = new Event('FileUpload.onSuccess');
		this._onError	= new Event('FileUpload.onError');

		$(input).fileupload(
		{
			url: 				url,
			dataType: 			'json',
			dropZone: 			$(dropzone),
			headers:			headers,
			replaceFileInput: 	false,
			add: 				this._onAdd.trigger,
			done: 				this._onDone.trigger,
			success: 			this._onSuccess.trigger,
			error:				this._onError.trigger
		});

		this.onAdd(function (e, data) {
			data.submit();
		});
	}


	FileUpload.prototype.onAdd = function (callback)
	{
		this._onAdd.add(callback);
	};

	FileUpload.prototype.onDone = function (callback)
	{
		this._onDone.add(callback);
	};

	FileUpload.prototype.onSuccess = function (callback)
	{
		this._onSuccess.add(callback);
	};
		
	FileUpload.prototype.onError = function (callback)
	{
		this._onError.add(callback);	
	};


	this.FileUpload = FileUpload;
});
namespace('OUI.Components', function (window)
{
	var Event 			= window.Duct.Event;
	var HoverMenuView 	= window.OUI.Views.HoverMenuView;
	
	var classify 		= window.Classy.classify;
	var idGenerator 	= window.OUI.Core.View.idGenerator;
	
	
	/**
	 * @class OUI.Components.HoverMenu
	 */
	function HoverMenu($toggleElement, contents, canPersist, extraClass, positionConfig)
	{
		classify(this);
		
		this._id 				= idGenerator('oui-hover-menu');
		
		this._view 				= new HoverMenuView(this, $toggleElement, contents, canPersist, extraClass, positionConfig);
		
		this._onBeforeOpen 		= new Event('hoverMenu.onBeforeOpen');
		this._onAfterOpen 		= new Event('hoverMenu.onAfterOpen');
		this._onBeforeClose 	= new Event('hoverMenu.onBeforeClose');
		this._onAfterClose 		= new Event('hoverMenu.onAfterClose');
		
		this._onBeforePersist	= new Event('hoverMenu.onBeforePersist');
		this._onAfterPersist	= new Event('hoverMenu.onAfterPersist');
		
		this._isPersist	= false;
		
		this._container = null;
	}
	
	
	HoverMenu.prototype.getId = function ()
	{
		return this._id;
	};
	
	HoverMenu.prototype.getContainer = function ()
	{
		return this._view.getContainer();
	};
	
	HoverMenu.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};
	
	HoverMenu.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};
	
	HoverMenu.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};
	
	HoverMenu.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};
	
	HoverMenu.prototype.onBeforePersist = function (callback)
	{
		this._onBeforePersist.add(callback);
	};
	
	HoverMenu.prototype.onAfterPersist = function (callback)
	{
		this._onAfterPersist.add(callback);
	};
	
	HoverMenu.prototype.setContainer = function(container)
	{
		this._container = container;
	}
	
	HoverMenu.prototype.open = function ()
	{
		if (this._view.isOpen())
		{
			return;
		}
		
		this._onBeforeOpen.trigger(this.getId());
		this._view.show(this._container);
		this._onAfterOpen.trigger(this._view.getContainer());
	};
	
	HoverMenu.prototype.close = function ()
	{
		if (this._isPersist)
		{
			this._isPersist = false;
			this._view.disablePersist();
		}
		
		this._onBeforeClose.trigger(this._view.getContainer());
		this._view.remove();
		this._onAfterClose.trigger(this.getId());
	};
	
	HoverMenu.prototype.togglePersist = function ()
	{
		if (this.isOpen() && this.isPersist())
		{
			this.close();
			return;
		}
		
		this._onBeforePersist.trigger(this._view.getContainer());
		this._isPersist = true;
		this._view.enablePersist();
		this._onAfterPersist.trigger(this._view.getContainer());
	};
	
	HoverMenu.prototype.isOpen = function ()
	{
		return this._view.isOpen();
	};
	
	HoverMenu.prototype.isPersist = function ()
	{
		return this._isPersist;
	};
	
	
	this.HoverMenu = HoverMenu;
});
namespace('OUI.Components.List', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListPaginationView 	= window.OUI.Views.List.ListPaginationView;

	var classify 			= window.Classy.classify;
	var obj 				= window.Plankton.obj;


	/**
	 * @class window.OUI.Components.List.ListPagination
	 */
	function ListPagination(container, params, total) 
	{
		classify(this);

		this._params 	= params;
		this._total		= total;
		
		this._view 		= new ListPaginationView(this, container);

		this._onNext 	= new Event('ListPagination.onNext');
		this._onPrev 	= new Event('ListPagination.onPrev');
		this._onChange 	= new Event('ListPagination.onChange');

		this.onChange(this._view.render);
	}
	
	
	ListPagination.prototype._countPages = function (total, size)
	{
		var pages = Math.floor(total / size);

		if (total % size > 0)
		{
			pages++;
		}
		
		return pages;
	};
	
	ListPagination.prototype._isNeedToRefresh = function (page, count, total, newTotal)
	{
		var oldPagesAmount = this._countPages(total, count);
		var newPagesAmount = this._countPages(newTotal, count);
		
		if (page === (oldPagesAmount - 1) && oldPagesAmount === newPagesAmount && newTotal > 0)
		{
			return false;
		}
		
		return true;
	};
	
	ListPagination.prototype._getNewPage = function (page, count, total, newTotal)
	{
		var oldPagesAmount = this._countPages(total, count);
		var newPagesAmount = this._countPages(newTotal, count);
		
		if (newPagesAmount === 0)
		{
			return 0;
		}
		
		if ((page === (oldPagesAmount - 1) || (page > (newPagesAmount - 1))) && oldPagesAmount !== newPagesAmount)
		{
			return newPagesAmount - 1;
		}
		
		return page;
	};


	ListPagination.prototype.updatePageOnRemoveItems = function (newTotal)
	{
		var page 		= this.getPage();
		var count 		= this.getCount();
		var total 		= this.getTotal();

		this.setTotal(newTotal);
		this.render();
				
		if (!this._isNeedToRefresh(page, count, total, newTotal))
		{
			return;
		}

		this.setPage(this._getNewPage(page, count, total, newTotal));
	};

	ListPagination.prototype.onNext = function (callback)
	{
		this._onNext.add(callback);
	};

	ListPagination.prototype.onPrev = function (callback)
	{
		this._onPrev.add(callback);
	};

	ListPagination.prototype.onChange = function (callback)
	{
		this._onChange.add(callback);
	};

	ListPagination.prototype.next = function ()
	{
		var total 	= this.getTotal();
		var page 	= this.getPage();
		var count 	= this.getCount();

		if ((page + 1) * count < total)
		{
			this.setPage(page + 1);

			this._onChange.trigger(this.getPage());
			this._onNext.trigger(this.getPage());
		}
	};

	ListPagination.prototype.prev = function ()
	{
		var page = this.getPage();

		if (page > 0)
		{
			this.setPage(page - 1);

			this._onChange.trigger(this.getPage());
			this._onPrev.trigger(this.getPage());
		}
	};

	ListPagination.prototype.setPage = function (page)
	{
		this.setParam('_page', page);
	};

	ListPagination.prototype.setCount = function (count)
	{
		this.setParam('_count', count);
	};

	ListPagination.prototype.setTotal = function (total)
	{
		if (total !== this._total)
		{
			this._total = total;
		}
	};

	ListPagination.prototype.setParam = function (param, value)
	{
		if (this._params[param] !== value) 
		{
			this._params[param] = value;
		}
	};

	ListPagination.prototype.getParams = function ()
	{
		return this._params;
	};

	ListPagination.prototype.getPage = function ()
	{
		return this._params['_page'];
	};

	ListPagination.prototype.getCount = function ()
	{
		return this._params['_count'];
	};

	ListPagination.prototype.getTotal = function ()
	{
		return this._total;
	};

	ListPagination.prototype.render = function ()
	{
		this._view.render();
	};


	this.ListPagination = ListPagination;
});
namespace('OUI.Components.List', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListSelectionView 	= window.OUI.Views.List.ListSelectionView;

	var is 					= window.Plankton.is;
	var obj 				= window.Plankton.obj;
	var foreach 			= window.Plankton.foreach;
	var classify 			= window.Classy.classify;


	/**
	 * @class window.OUI.Components.List.ListSelection
	 */
	function ListSelection(itemsContainer, itemsSelector, selectAll) 
	{
		classify(this);

		this._view 			= new ListSelectionView(this, itemsContainer, itemsSelector, selectAll);

		this._onSelect 		= new Event('ListSelection.onSelect');
		this._onDeselect 	= new Event('ListSelection.onDeselect');

		this.onSelect(this._view.selectItem);
		this.onDeselect(this._view.deselectItem);

		this._selected		= {};
	};


	ListSelection.prototype._selectItem = function (itemId)
	{
		if (is.undefined(this._selected[itemId])) 
		{
			this._selected[itemId] = true;			
		}

		this._onSelect.trigger(itemId);
	};

	ListSelection.prototype._deselectItem = function (itemId)
	{
		if (is(this._selected[itemId])) 
		{
			delete this._selected[itemId];			
		}

		this._onDeselect.trigger(itemId);
	};


	ListSelection.prototype.onSelect = function (callback)
	{
		this._onSelect.add(callback);
	};

	ListSelection.prototype.onDeselect = function (callback)
	{
		this._onDeselect.add(callback);
	};

	ListSelection.prototype.select = function (itemIds)
	{
		foreach(itemIds, this._selectItem);
	};

	ListSelection.prototype.deselect = function (itemIds)
	{
		foreach(itemIds, this._deselectItem);
	};

	ListSelection.prototype.getSelected = function ()
	{
		return obj.keys(this._selected);
	};


	this.ListSelection = ListSelection;
});
namespace('OUI.Components.List', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListSortingView = window.OUI.Views.List.ListSortingView;

	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.Components.List.ListSorting
	 */
	function ListSorting(params) 
	{
		classify(this);
		
		this._params 	= params;

		this._view 			= new ListSortingView(this);
		this._onSort 		= new Event('ListSorting.onSort');
		
		this.onSort(this._view.setActive);
	}


	ListSorting.prototype.getOrder = function ()
	{
		return this._params['_order'];
	};
	
	ListSorting.prototype.setParam = function (key, value)
	{
		this._params[key] = value;
	};

	ListSorting.prototype.getParams = function ()
	{
		return this._params;
	};

	ListSorting.prototype.onSort = function (callback) 
	{
		this._onSort.add(callback);
	};

	ListSorting.prototype.sort = function (e) 
	{
		this._onSort.trigger(e);
	};


	this.ListSorting = ListSorting;
});
namespace('OUI.Components', function (window) 
{
	var Event 			= window.Duct.Event;
	var SearchFormView 	= window.OUI.Views.SearchFormView;

	var classify 		= window.Classy.classify;
	var idGenerator 	= window.OUI.Core.View.idGenerator;


	function SearchForm(container, value, param, placeholder)
	{
		classify(this);

		this._id 		= idGenerator('oui-search-form');

		this._view 		= new SearchFormView(this, container, value, param, placeholder);
		this._param		= param;

		this._onInput 	= new Event('searchForm.onInput');
		this._onClear 	= new Event('searchForm.onClear');

		this.onClear(this._view.clearInput);
		this.onInput(this._view.transformIcon);
	}

	SearchForm.prototype.getId = function ()
	{
		return this._id;
	};

	SearchForm.prototype.getValue = function ()
	{
		return this._view.getValue();
	};

	SearchForm.prototype.hasValue = function ()
	{
		return this.getValue().length > 0;
	};

	SearchForm.prototype.getParam = function ()
	{
		return this._param;
	};

	SearchForm.prototype.onInput = function (callback)
	{
		this._onInput.add(callback);
	};

	SearchForm.prototype.onClear = function (callback)
	{
		this._onClear.add(callback);
	};

	SearchForm.prototype.input = function (event)
	{
		this._onInput.trigger(event);
	};
	
	SearchForm.prototype.clear = function (event)
	{
		this._onClear.trigger(event);
	};


	this.SearchForm = SearchForm;
});
namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var TabsView 	= window.OUI.Views.TabsView;

	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Components.Tabs
	 */
	function Tabs(buttonsSelector) 
	{
		classify(this);
		
		this._view 		= new TabsView(this, buttonsSelector);
		this._onSelect 	= new Event('tabs.onSelect');
	}


	Tabs.prototype.onSelect = function (callback)
	{
		this._onSelect.add(callback);
	};

	Tabs.prototype.select = function (tabId) 
	{
		this._view.select(tabId);
		this._onSelect.trigger(tabId);
	};


	this.Tabs = Tabs;
});
namespace('OUI.Components', function (window) 
{
	var Event 		= window.Duct.Event;
	var WrapperView = window.OUI.Views.WrapperView;

	var classify	= window.Classy.classify;


	/**
	 * @class OUI.Components.Wrapper
	 */
	function Wrapper(container, template)
	{
		classify(this);

		this._view 		= new WrapperView(container, template);
		this._onRender 	= new Event('Wrapper.onRender');
	}


	Wrapper.prototype.getContainer = function ()
	{
		return this._view.getContainer();
	};

	Wrapper.prototype.onRender = function (callback)
	{
		this._onRender.add(callback);
	};

	Wrapper.prototype.render = function (params)
	{
		this._view.render(params);
		this._onRender.trigger(this.getContainer());
	};


	this.Wrapper = Wrapper;
});
namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.DialogView
	 */
	function DialogView(id, okButtonText, cancelButtonText) 
	{
		classify(this);

		this._id 				= id;
		this._okButtonText 		= okButtonText || 'OK';
		this._cancelButtonText 	= cancelButtonText || 'Cancel';
		this._okButton 			= '.ok-button';
		this._cancelButton 		= '.cancel-button';

		this._confirmEvent 		= 'keyup.' + id;

		this._onConfirmClick 	= new Event('DialogView.onConfirmClick');
		this._onCancelClick 	= new Event('DialogView.onCancelClick');

		this.onConfirmClick(this.remove);
		this.onCancelClick(this.remove);
	}


	DialogView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	DialogView.prototype.bindEvents = function ()
	{
		var container 		= this.getContainer();
		var onConfirmEvent 	= this._onConfirmClick;
		var onCancelEvent 	= this._onCancelClick;

		container.find(this._okButton).on('click', onConfirmEvent.trigger);
		container.find(this._cancelButton).on('click', onCancelEvent.trigger);

		$(document).on(this._confirmEvent, function (e) 
		{
			if (e.keyCode === 13)
			{
				onConfirmEvent.trigger();
			}
		});
	};

	DialogView.prototype.show = function (message)
	{
		$('body').append(hbs('dialog', {
			id: this._id,
			message: message,
			okButtonText: this._okButtonText,
			cancelButtonText: this._cancelButtonText
		}));

		this.bindEvents();
		this.getContainer().focus();		
	};

	DialogView.prototype.remove = function ()
	{
		$(document).off(this._confirmEvent);
		fadeRemove(this.getContainer());
	};

	DialogView.prototype.onConfirmClick = function (callback)
	{
		this._onConfirmClick.add(callback);
	};

	DialogView.prototype.onCancelClick = function (callback)
	{
		this._onCancelClick.add(callback);
	};

	
	this.DialogView = DialogView;
});
namespace('OUI.Views.List', function (window) 
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify;
	var foreach 	= window.Plankton.foreach;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.List.ListItemsView
	 */
	function ListItemsView(container) 
	{
		classify(this);

		this._container 	= $(container);
		this._loadingClass 	= 'loading';
		this._onClick 		= new Event('ListItemsView.onClick');
	}


	ListItemsView.prototype._handleItemClick = function (e)
	{
		var target 	= $(e.currentTarget);
		var elem 	= $(e.target);

		if (elem.is(':checkbox') || 
			is.defined(elem.data('o-link')) || 
			is.defined(elem.data('o-action')) ||
			elem.parents('[data-o-action]').length) 
		{
			return;
		}
		
		this._onClick.trigger(target.data('id'));
	};
	
	
	ListItemsView.prototype.getItemsWrapper = function ()
	{
		var container = this._container;
		return container.parent()[0].tagName === 'TABLE' ? container.parent() : container;
	};

	ListItemsView.prototype.getContainer = function ()
	{
		return this._container;
	};

	ListItemsView.prototype.render = function (items, template)
	{
		var container = this._container;

		container.empty();
		this.getItemsWrapper().removeClass(this._loadingClass);
		
		foreach(items, function (item) 
		{
			container.append(template.hbs(item));
		});
		
		this._container.find('[data-id]').on('click', this._handleItemClick);
	};

	ListItemsView.prototype.highlightTerm = function (term)
	{
		if (term.length)
		{
			this._container.highlight(term);
		}
		else
		{
			this._container.unhighlight();
		}
	};

	ListItemsView.prototype.removeItems = function (ids)
	{
		foreach(ids, function (id) 
		{
			fadeRemove($('[data-id="' + id + '"]'));
		});
	};

	ListItemsView.prototype.setLoading = function ()
	{
		this.getItemsWrapper().addClass(this._loadingClass);
	};
	
	ListItemsView.prototype.setContainer = function (container)
	{
		this._container = $(container);
	};

	ListItemsView.prototype.onClick = function (callback)
	{
		this._onClick.add(callback);
	};

	
	this.ListItemsView = ListItemsView;
});
namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify	= window.Classy.classify;
	var obj 		= window.Plankton.obj;
	var is			= window.Plankton.is;
	var Event 		= window.Duct.Event;
	
	var ConfigurablePosition	= window.OUI.Core.Pos.Prepared.ConfigurablePosition;
	var TargetPosition			= window.OUI.Core.Pos.Enum.TargetPosition;
	var TargetSide				= window.OUI.Core.Pos.Enum.TargetSide;


	function MenuView(id, toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		extraClass = extraClass || '';

		this._id 				= id;
		this._toggleElement 	= toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= '.oui-menu-underlay';
		this._positionConfig	= positionConfig || {};
		this._positionClass 	= null;

		this._onOpenClick 	= new Event('MenuView.onOpenClick');
		this._onCloseClick 	= new Event('MenuView.onCloseClick');

		this._toggleElement.on('click.' + id, this._onOpenClick.trigger);
	}

	
	MenuView.prototype._unbindOpen = function () 
	{
		this._toggleElement.off('click.' + this._id);	
	};
	
	MenuView.prototype._putInPosition = function ()
	{
		var $container 	= this.getContainer();
		var $target 	= $container.find('.wrapper');
		var $related 	= this._toggleElement;
		
		var baseConfig = {
			container: $container,
			containerOffset: 10,
			relatedElement: $related,
			targetElement: $target,
			initialPosition: TargetPosition.center,
			sides: [TargetSide.bottom]
		};
		
		var config = obj.merge(baseConfig, this._positionConfig);

		var pos = ConfigurablePosition.get(config, config.sides);

		$target.offset(
		{
			top: pos.coordinates.top,
			left: pos.coordinates.left
		});
		
		if (!is.null(this._positionClass))
		{
			$target.removeClass(this._positionClass);
		}

		this._positionClass = pos.name;
		$target.addClass(pos.name);
	};


	MenuView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	MenuView.prototype.remove = function (unbindEvent)
	{
		this.getContainer().remove();

		if (unbindEvent)
		{
			this._unbindOpen();
		}
	};

	MenuView.prototype.show = function ()
	{
		$('body').append(hbs('menu', 
		{
			id: this._id,
			contents: this._contents,
			extraClass: this._extraClass
		}));
	
		this._putInPosition();

		this.getContainer().on('click.' + this._id, this._underlay, this._onCloseClick.trigger);
		this.getContainer().focus();
	};
	
	MenuView.prototype.refreshPosition = function ()
	{
		this._putInPosition();
	};

	MenuView.prototype.onOpenClick = function (callback)
	{
		this._onOpenClick.add(callback);
	};

	MenuView.prototype.onCloseClick = function (callback)
	{
		this._onCloseClick.add(callback);
	};


	this.MenuView = MenuView;
});
namespace('OUI.Views', function (window)
{
	var is  		= window.Plankton.is;
	var foreach		= window.Plankton.foreach;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.ModalView
	 */
	function ModalView(id, contents, className)
	{
		classify(this);

		className = className || '';

		this._id 			= id;
		this._underlay 		= '.oui-modal-underlay';
		this._closeButton 	= '[data-oui-modal-close]';
		
		if (!is(window.OUI.Views.ModalViewIds))
			window.OUI.Views.ModalViewIds = [];
		
		this._escapeEvent 	= 'keyup.' + id;

		this._className		= className;
		this._contents		= contents;

		this._onCloseClick 		= new Event('ModalView.onCloseClick');
		this._onUnderlayClick 	= new Event('ModalView.onUnderlayClick');
		this._onEscape 			= new Event('ModalView.onEscape');
	};
	
	
	ModalView.prototype._triggerOnEscape = function()
	{
		if (window.OUI.Views.ModalViewIds.length === 0)
		{
			this._onEscape.trigger();
			return;
		}
		
		var lastId = window.OUI.Views.ModalViewIds[window.OUI.Views.ModalViewIds.length - 1];
		
		if (lastId !== this._id)
			return;
		
		this._onEscape.trigger();
	};
	
	ModalView.prototype._switchBodyScroll = function ()
	{
		var modals = $('.oui-modal-underlay').length;
		
		if (modals === 0)
		{
			$('body').removeClass('no-scroll');
		}
		else
		{
			$('body').addClass('no-scroll');
		}
	};
	
	ModalView.prototype._getHTML = function()
	{
		var options = {
			id: this._id,
			contents: '',
			extraClass: this._className
		};
		
		if (is.string(this._contents))
		{
			options.contents = this._contents;
			return hbs('modal', options);
		}
		
		var parentWrapper = document.createElement('div');
		parentWrapper.innerHTML = hbs('modal', options);
		
		if (is.array(this._contents))
		{
			foreach(this._contents, function (child)
			{
				parentWrapper.querySelector('.wrapper').appendChild(child);
			})
		}
		else
		{
			parentWrapper.querySelector('.wrapper').appendChild(this._contents);
		}
		
		return parentWrapper.children[0];
	};
	

	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	ModalView.prototype.bindEvents = function ()
	{
		var triggerOnEscape = this._triggerOnEscape;

		$(document).on(this._escapeEvent, function (e)
		{
			if (e.keyCode === 27)
			{
				triggerOnEscape();
			}
		});

		this.getContainer().on('click', this._closeButton, this._onCloseClick.trigger);
		this.getContainer().on('click', this._underlay, this._onUnderlayClick.trigger);
	};

	ModalView.prototype.show = function ()
	{
		$('body').append(this._getHTML());
		
		window.OUI.Views.ModalViewIds.push(this._id);

		this.bindEvents();
		this._switchBodyScroll();
	};
	
	ModalView.prototype.focus = function()
	{
		this.getContainer().focus();
	};

	ModalView.prototype.remove = function ()
	{
		var currentId = this._id;
		
		window.OUI.Views.ModalViewIds = window.OUI.Views.ModalViewIds.filter(function (id)
		{
			return id !== currentId
		});

		$(document).off(this._escapeEvent);
		this.getContainer().remove();
		this._switchBodyScroll();
	};

	ModalView.prototype.hideContainer = function ()
	{
		this.getContainer().addClass('hiding');
	};

	ModalView.prototype.onCloseClick = function (callback)
	{
		this._onCloseClick.add(callback);
	};

	ModalView.prototype.onUnderlayClick = function (callback)
	{
		this._onUnderlayClick.add(callback);
	};

	ModalView.prototype.onEscape = function (callback)
	{
		this._onEscape.add(callback);
	};


	
	this.ModalView = ModalView;
});
namespace('OUI.Views.Tip', function (window) 
{
	var Event 			= window.Duct.Event;

	var RoundPosition 	= window.OUI.Core.Pos.Prepared.RoundPosition;
    var TargetPosition 	= window.OUI.Core.Pos.Enum.TargetPosition;
    var TargetSide 		= window.OUI.Core.Pos.Enum.TargetSide;
	
	var DefaultSanitizer	= window.OUI.Views.Tip.DefaultSanitizer;

    var classify		= window.Classy.classify;
	var is				= window.Plankton.is;
	var obj 			= window.Plankton.obj;


	/**
	 * @class OUI.Views.TipView
	 */
	function TipView(id, baseName, positionConfig)
	{
		classify(this);

		this._id 				= id;

		this._baseName 			= baseName;
		this._selector 			= '*[data-' + baseName + ']';
		this._contentAttr 		= 'title';
		this._invisibleClass 	= 'invisible';
		
		this._sanitizer			= null;

		this._positionConfig	= positionConfig || {};

		this._onMouseEnter 	= new Event('TipView.onMouseEnter');
		this._onMouseOut 	= new Event('TipView.onMouseOut');
		this._onClick 		= new Event('TipView.onClick');

		this._bindEvents();
	};

	
	TipView.prototype._getSanitizer = function()
	{
		if (!is(this._sanitizer))
		{
			this._sanitizer = new DefaultSanitizer();
		}
		
		return this._sanitizer;
	};

	TipView.prototype._getContent = function ($element)
	{
		return  this._getSanitizer().sanitize($element.data(this._baseName).toString());
	};

	TipView.prototype._getPosition = function ($related, $target)
	{
		var baseConfig = 
		{	
			relatedElement:  	$related,
		    targetElement: 		$target,
		    relatedOffset: 		13,
		    initialPosition: 	TargetPosition.center,
		    initialSide: 		TargetSide.bottom
		};

		var options = obj.merge(baseConfig, this._positionConfig);

		return RoundPosition.get(options);
	};

	TipView.prototype._bindEvents = function ()
	{
		$(document).on(
		{
		    'mouseenter.tip': this._onMouseEnter.trigger,
		    'mouseleave.tip': this._onMouseOut.trigger
		}, this._selector);

		$(document).on('click.tip', this._selector, this._onClick.trigger);
	};

	
	TipView.prototype.show = function (event)
	{
		var position;
		var $element = $(event.currentTarget);
		var $tip = $('<div>')
			.attr('id', this._id)
			.addClass(this._baseName)
			.addClass(this._invisibleClass)
			.html(this._getContent($element));
		
		$('body').append($tip);

		position = this._getPosition($element, $tip);

		$tip
			.addClass(position.name)
			.removeClass(this._invisibleClass)
			.css({ 
				left: position.coordinates.left, 
				top: position.coordinates.top 
			});
	};
	
	TipView.prototype.setSanitizer = function(sanitizer)
	{
		this._sanitizer = sanitizer;
	};

	TipView.prototype.remove = function ()
	{
		$('#' + this._id).remove();
	};

	TipView.prototype.onMouseEnter = function (callback)
	{
		this._onMouseEnter.add(callback);
	};

	TipView.prototype.onMouseOut = function (callback)
	{
		this._onMouseOut.add(callback);
	};

	TipView.prototype.onClick = function (callback)
	{
		this._onClick.add(callback);
	};


	this.TipView = TipView;
});
namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;
	
	var Controller	= window.OUI.Views.Toast.ToastController;


	/**
	 * @class OUI.Views.ToastView
	 */
	function ToastView(toastId, delay)
	{
		classify(this);

		delay = delay || 5000;

		this._id 			= toastId;
		this._delay 		= delay;
		this._dismissButton = '[data-oui-dismiss]';
		this._ctaLink 		= '.cta-link';
		
		this._ctrl			= null;
		this._timer			= null;

		this._onDismiss 	= new Event('ToastView.onDismiss');
		this._onCtaClick 	= new Event('ToastView.onCtaClick');

		this._onDismiss.add(this.remove);
	}


	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};
	
	ToastView.prototype.resetDelay = function()
	{
		if (this._delay <= 0)
			return;
		
		if (is(this._timer))
			clearTimeout(this._timer);
		
		this._timer = setTimeout(this.remove, this._delay);
	};

	ToastView.prototype.show = function (message, cta)
	{
		var toRender = $(hbs('toast',
		{
			message: message,
			cta: cta || '',
			id: this._id
		}));
		
		$('body').append(toRender);
		
		this.resetDelay();

		this.getContainer().on('click', this._dismissButton, this._onDismiss.trigger);
		this.getContainer().on('click', this._ctaLink, this._onCtaClick.trigger);
		
		this._ctrl = new Controller(toRender);
		
		return this._ctrl;
	};
	
	ToastView.prototype.hasToast = function()
	{
		return this.getContainer().length !== 0;
	};
	
	ToastView.prototype.getCtrl = function()
	{
		return this._ctrl;
	};

	ToastView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};

	ToastView.prototype.onDismiss = function (callback)
	{
		this._onDismiss.add(callback);
	};

	ToastView.prototype.onCtaClick = function (callback)
	{
		this._onCtaClick.add(callback);
	};


	this.ToastView = ToastView;
});
namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify	= window.Classy.classify;
	var obj 		= window.Plankton.obj;
	var is			= window.Plankton.is;
	var Event 		= window.Duct.Event;
	
	var ConfigurablePosition	= window.OUI.Core.Pos.Prepared.ConfigurablePosition;
	var TargetPosition			= window.OUI.Core.Pos.Enum.TargetPosition;
	var TargetSide				= window.OUI.Core.Pos.Enum.TargetSide;


	function TourTipView(id, contents, attachTo, positionConfig, extraClass)
	{
		classify(this);

		this._id 				= id;
		this._attachTo 			= $(attachTo);
		this._contents 			= contents;
		this._extraClass 		= extraClass || '';

		this._underlay 			= '.oui-tour-tip-underlay';
		this._positionConfig	= positionConfig || {};

		this._onUnderlayClick 	= new Event('TourTipView.onUnderlayClick');
	}

	
	TourTipView.prototype._positionTip = function ()
	{
		var $container 	= this.getContainer();
		var $target 	= $container.find('.wrapper');
		
		var baseConfig = {
			container: 			$container,
			containerOffset: 	20,
			relatedElement: 	this._attachTo,
			targetElement: 		$target,
			initialPosition: 	TargetPosition.center,
			sides: 				[ TargetSide.top, TargetSide.right, TargetSide.bottom, TargetSide.left ]
		};
		
		var config 	= obj.merge(baseConfig, this._positionConfig);
		var pos 	= ConfigurablePosition.get(config, config.sides);

		$target.offset(
		{
			top: 	pos.coordinates.top,
			left: 	pos.coordinates.left
		});
		
		if (!is.null(this._positionClass))
		{
			$target.removeClass(this._positionClass);
		}

		this._positionClass = pos.name;
		$target.addClass(pos.name);
	};


	TourTipView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	TourTipView.prototype.remove = function ()
	{
		this.getContainer().remove();		
	};

	TourTipView.prototype.show = function ()
	{
		$('body').append(hbs('tour-tip', 
		{
			id: 		this._id,
			contents: 	this._contents,
			extraClass: this._extraClass
		}));
	
		this._positionTip();
		
		this.getContainer().on('click.' + this._id, this._underlay, this._onUnderlayClick.trigger);
		this.getContainer().focus();
	};	

	TourTipView.prototype.onUnderlayClick = function (callback)
	{
		this._onUnderlayClick.add(callback);
	};


	this.TourTipView = TourTipView;
});
namespace('OUI.Views', function (window) 
{
	var obj 		= window.Plankton.obj;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;

	var defaults = 
	{
		autoRepeat: false,
		autoPlay: false
	};


	function VideoView(videoSelector)
	{
		classify(this);

		this._videos 		= $(videoSelector);
		
		this._hiddenClass 	= 'hidden';
		this._loader 		= '.video-spinner';
		this._preview 		= '.video-preview';
		this._error 		= '.video-error';

		this._onError 		= new Event('VideoView.onError');

		this._videos.each(this._initVideo);

		this.onError(this._displayError);
	}


	VideoView.prototype._displayError = function (videoWrapper)
	{
		videoWrapper.find(this._loader).addClass(this._hiddenClass);
		videoWrapper.find(this._error).removeClass(this._hiddenClass);
	};

	VideoView.prototype._onCanPlay = function (videoWrapper, settings)
	{
		if (settings.autoPlay && settings.sources.length)
		{
			this._play(videoWrapper);
		}
	};

	VideoView.prototype._onLoadedMeta = function (videoWrapper)
	{
		videoWrapper.find(this._loader).addClass(this._hiddenClass);
		videoWrapper.find(this._preview).removeClass(this._hiddenClass).css('height', this._getHeight(videoWrapper));
	};

	VideoView.prototype._getHeight = function (videoWrapper)
	{
		var videoHeight = videoWrapper.find('video').get(0).videoHeight;
		var videoWidth 	= videoWrapper.find('video').get(0).videoWidth;
		var aspectRatio = videoWidth / videoHeight;
		
		return videoWrapper.width() / aspectRatio;
	};

	VideoView.prototype._initVideo = function (index, videoWrapper)
	{
		videoWrapper = $(videoWrapper);

		var settings 	= obj.merge(defaults, videoWrapper.data());
		var videoView 	= this;
		
		videoWrapper.append(hbs('video', settings));
		
		videoWrapper.find('video').on('canplay', function ()
		{
			videoView._onCanPlay(videoWrapper, settings);
		});

		videoWrapper.find('video').on('loadedmetadata', function ()
		{
			videoView._onLoadedMeta(videoWrapper);
		});

		videoWrapper.find('video').on('error', function ()
		{
			videoView._onError.trigger(videoWrapper);
		});

		if (settings.sources.length)
		{
			videoWrapper.find(this._preview).on('click', function ()
			{
				videoView._play(videoWrapper);
			});
		}
	};

	VideoView.prototype._play = function (videoWrapper)
	{
		videoWrapper.find(this._preview).addClass(this._hiddenClass);
		
		videoWrapper.find('video').removeClass(this._hiddenClass);
		videoWrapper.find('video').get(0).play();
	};


	VideoView.prototype.onError = function (callback)
	{
		this._onError.add(callback);
	};


	this.VideoView = VideoView;
});
namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var DialogView 	= window.OUI.Views.DialogView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;
	var is			= window.Plankton.is;

	
	/**
	 * @class OUI.Components.Dialog
	 */
	function Dialog(okButtonText, cancelButtonText) 
	{
		classify(this);

		this._id 				= idGenerator('oui-dialog');
		this._okButtonText		= okButtonText;
		this._cancelButtonText	= cancelButtonText;
		
		this._onCancel 		= new Event('dialog.onCancel');
		this._onConfirm 	= new Event('dialog.onConfirm');
		this._onOpen 		= new Event('dialog.onOpen');
		
		this._view = null;
	}
	
	
	Dialog.prototype._getView = function ()
	{
		if (!is(this._view))
		{
			this._view 	= new DialogView(this._id, this._okButtonText, this._cancelButtonText);
			this._view.onCancelClick(this.triggerCancelEvent);
			this._view.onConfirmClick(this.triggerConfirmEvent);
		}
		
		return this._view;
	};
	
	
	Dialog.prototype.getId = function ()
	{
		return this._id;
	};
	
	Dialog.prototype.triggerCancelEvent = function()
	{
		this._onCancel.trigger();
	};
	
	Dialog.prototype.triggerConfirmEvent = function()
	{
		this._onConfirm.trigger();
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
		this._getView().show(message);
		this._onOpen.trigger(this._id);
	};
	
	Dialog.prototype.close = function()
	{
		this._getView().remove();
	};

	Dialog.prototype.confirm = function () 
	{
		this._onConfirm.trigger(this._id);
	};

	Dialog.prototype.cancel = function () 
	{
		this._onCancel.trigger(this._id);
	};
	
	Dialog.prototype.setView = function (view)
	{
		this._view = view;
	};


	this.Dialog = Dialog;
});
namespace('OUI.Components.List', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListItemsView 	= window.OUI.Views.List.ListItemsView;
	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.Components.List.ListItems
	 */
	function ListItems(container) 
	{
		classify(this);
		
		this._view 		= new ListItemsView(container);
		
		this._onRender 	= new Event('ListItems.onRender');
		this._onRemove 	= new Event('ListItems.onRemove');
		this._onClick	= new Event('ListItems.onClick');

		this._view.onClick(this._onClick.trigger);
	}


	ListItems.prototype.getContainer = function ()
	{
		return this._view.getContainer();
	};
	
	ListItems.prototype.setContainer = function (container)
	{
		this._view.setContainer(container);	
	};
	
	ListItems.prototype.onRender = function (callback)
	{
		this._onRender.add(callback);
	};

	ListItems.prototype.onRemove = function (callback)
	{
		this._onRemove.add(callback);
	};
	
	ListItems.prototype.onClick = function (callback)
	{
		this._onClick.add(callback);
	};

	ListItems.prototype.render = function (items, template) 
	{		
		this._view.render(items, template);
		this._onRender.trigger(this.getContainer());
	};

	ListItems.prototype.highlightTerm = function (term)
	{
		this._view.highlightTerm(term);
	};

	ListItems.prototype.setLoading = function ()
	{
		this._view.setLoading();
	};

	ListItems.prototype.removeItems = function (ids)
	{
		this._view.removeItems(ids);
		this._onRemove.trigger(ids);
	};
	
	ListItems.prototype.handleClick = function (itemId)
	{
		this._onClick.trigger(itemId);	
	};


	this.ListItems = ListItems;
});
namespace('OUI.Components.List', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListSearchView 	= window.OUI.Views.List.ListSearchView;

	var is 				= window.Plankton.is;
	var classify 		= window.Classy.classify;

	var DeferCallback 	= window.OUI.Core.Events.DeferCallback;
	var SearchForm 		= window.OUI.Components.SearchForm;
	var Wrapper 		= window.OUI.Components.Wrapper;


	/**
	 * @class window.OUI.Components.List.ListSearch
	 */
	function ListSearch(container, value, param, placeholder) 
	{
		classify(this);

		param = param || 'q';
		placeholder = placeholder || 'Search';

		this._view 			= new ListSearchView();
		this._searchForm 	= new SearchForm(container, value, param, placeholder);
		this._nullstate 	= null;

		this._onSearch 		= new Event('ListSearch.onSearch');
	}


	ListSearch.prototype.getParam = function ()
	{
		return this._searchForm.getParam();
	};

	ListSearch.prototype.getValue = function ()
	{
		return this._searchForm.getValue();
	};

	ListSearch.prototype.hasValue = function ()
	{
		return this.getValue().length > 0;
	};

	ListSearch.prototype.getNullstate = function ()
	{
		return this._nullstate;
	};

	ListSearch.prototype.setItemsContainer = function (container)
	{
		this._view.setItemsContainer(container);
	};

	ListSearch.prototype.setNullstate = function (container, template)
	{
		this._nullstate = new Wrapper(container, template);
		this._nullstate.onRender(this._view.showNullstate);

		this._view.setNullstate(container);

		this.onSearch(this._view.hideNullstate);
	};

	ListSearch.prototype.onSearch = function (callback)
	{
		var deferredCallback = new DeferCallback(300, callback);

		this._searchForm.onInput(deferredCallback.deferAction);
		this._searchForm.onClear(deferredCallback.deferAction);
	};

	ListSearch.prototype.showNullstate = function ()
	{
		this._nullstate.render({ value: this.getValue() });
	};


	this.ListSearch = ListSearch;
});
namespace('OUI.Components', function (window) 
{
	var Event 		= window.Duct.Event;
	var MenuView 	= window.OUI.Views.MenuView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Menu
	 */
	function Menu(toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		this._unbindEvent 	= true;

		this._id 			= idGenerator('oui-menu');

		this._view 			= new MenuView(this._id, toggleElement, contents, extraClass, positionConfig);
		this._onBeforeOpen 	= new Event('menu.onBeforeOpen');
		this._onAfterOpen 	= new Event('menu.onAfterOpen');
		this._onBeforeClose = new Event('menu.onBeforeClose');
		this._onAfterClose 	= new Event('menu.onAfterClose');

		this._view.onOpenClick(this.open);
		this._view.onCloseClick(this.close);
	}

	
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
		this._view.show();
		this._onAfterOpen.trigger(this._view.getContainer());
	};

	Menu.prototype.close = function ()
	{
		this._onBeforeClose.trigger(this._view.getContainer());
		this._view.remove(this._unbindEvent);
		this._onAfterClose.trigger(this._id);
	};
	
	Menu.prototype.disableUnbinding = function ()
	{
		this._unbindEvent = false;
	};
	
	Menu.prototype.enableUnbinding = function ()
	{
		this._unbindEvent = true;
	};
	
	Menu.prototype.refreshPosition = function ()
	{
		this._view.refreshPosition();	
	};


	this.Menu = Menu;
});
namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var ModalView   = window.OUI.Views.ModalView;
	
	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Modal
	 */
	function Modal(contents, className) 
	{
		classify(this);

		this._id 	= idGenerator('oui-modal');
		this._view  = new ModalView(this._id, contents, className);

		this._onBeforeOpen 			= new Event('modal.beforeOpen');
		this._onAfterOpen 			= new Event('modal.afterOpen');
		this._onAfterOpenComplete	= new Event('modal.afterOpenComplete');
		this._onBeforeClose 		= new Event('modal.beforeClose');
		this._onAfterClose 			= new Event('modal.afterClose');
		this._onUnderlayClick 		= new Event('modal.onUnderlayClick');
		this._onEscapeClick			= new Event('modal.onEscapeClick');

		this._view.onCloseClick(this.close);
		this._view.onEscape(this._onEscapeClicked);
		this._view.onUnderlayClick(this._onUnderlayClick.trigger);

		this.onUnderlayClick(this.close);
		
		this._preventClose = false;
		this._animationDelay = 500;
	}

	
	Modal.prototype._onEscapeClicked = function () 
	{
		var params = { abort: false };
		
		this._onEscapeClick.trigger(params);
		
		if (params.abort === false)
		{
			this.close();
		}
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
	
	Modal.prototype.onAfterOpenComplete = function(callback)
	{
		this._onAfterOpenComplete.add(callback);
	};

	Modal.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	Modal.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};

	Modal.prototype.onUnderlayClick = function (callback)
	{
		this._onUnderlayClick.add(callback);
	};
	
	Modal.prototype.onEscapeClick = function (item, callback)
	{
		return this._onEscapeClick.listener(item, callback);
	};

	Modal.prototype.clearUnderlayClick = function ()
	{
		this._onUnderlayClick.clear();
	};

	Modal.prototype.underlayClick = function (e)
	{
		this._onUnderlayClick.trigger(e);
	};

	Modal.prototype.open = function() 
	{
		this._onBeforeOpen.trigger(this._id);
		this._view.show();
		this._onAfterOpen.trigger(this._view.getContainer());
		
		setTimeout(function ()
		{
			this._view.focus();
			this._onAfterOpenComplete.trigger(this._view.getContainer());
		}.bind(this), 
		this._animationDelay);
	};

	Modal.prototype.close = function() 
	{
		this._preventClose = false;
		this._onBeforeClose.trigger(this._view.getContainer());
		
		if (this._preventClose)
		{
			return;
		}

		if (this._animationDelay > 0)
		{
			this._view.hideContainer();
		}

		setTimeout(function ()
		{
			this._view.remove();
			this._onAfterClose.trigger(this._id);
		}.bind(this), 
		this._animationDelay);
	};

	Modal.prototype.preventClose = function ()
	{
		this._preventClose = true;
	};

	Modal.prototype.setAnimationDelay = function (delay)
	{
		this._animationDelay = delay;
	};


	this.Modal = Modal;
});
namespace('OUI.Components', function (window) 
{
	var TipView 	= window.OUI.Views.Tip.TipView;

	var classify	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Tip
	 */
	function Tip(baseName, positionConfig)
	{
		classify(this);

		this._id 		= idGenerator(baseName);
		this._view 		= new TipView(this._id, baseName, positionConfig);

		this._view.onMouseEnter(this.add);
		this._view.onMouseOut(this.remove);
		this._view.onClick(this.remove);
	}


	Tip.prototype.getId = function ()
	{
		return this._id;
	};
	
	Tip.prototype.setSanitizer = function(sanitizerInstance)
	{
		this._view.setSanitizer(sanitizerInstance);
	};

	Tip.prototype.add = function (event)
	{
		this._view.show(event);
	};

	Tip.prototype.remove = function ()
	{
		this._view.remove();
	};


	this.Tip = Tip;
});
namespace('OUI.Components', function (window) 
{
	var Event 		= window.Duct.Event;
	var ToastView 	= window.OUI.Views.ToastView;

	var classify	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Toast
	 */
	function Toast(delay)
	{
		classify(this);

		this._id 			= idGenerator('oui-toast');

		this._view 			= new ToastView(this._id, delay);
				
		this._onAdd 		= new Event('toast.onAdd');
		this._onDismiss 	= new Event('toast.onDismiss');
		this._onCtaClick 	= new Event('toast.onCtaClick');

		this._view.onDismiss(this._onDismiss.trigger);
		this._view.onCtaClick(this._onCtaClick.trigger);
	}
	
	
	Toast.prototype._update = function(message, cta)
	{
		this._view.getCtrl().setText(message);
		this._view.getCtrl().setCtaText(cta);
		this._view.resetDelay();
		
		return this._view.getCtrl();
	};
	
	Toast.prototype._create = function(message, cta)
	{
		this._view.show(message, cta);
		this._onAdd.trigger(this._id);
		
		return this._view.getCtrl();
	};


	Toast.prototype.getId = function ()
	{
		return this._id;
	};

	Toast.prototype.onAdd = function (callback)
	{
		return this._onAdd.listener(callback);
	};

	Toast.prototype.onDismiss = function (callback)
	{
		return this._onDismiss.listener(callback);
	};

	Toast.prototype.onCtaClick = function (callback)
	{
		return this._onCtaClick.listener(callback);
	};
	
	Toast.prototype.add = function (message, cta)
	{
		if (this.has())
			return this._update(message, cta);
		
		return this._create(message, cta);
	};
	
	Toast.prototype.has = function()
	{
		return this._view.hasToast();
	};

	Toast.prototype.dismiss = function ()
	{
		this._view.remove();
		this._onDismiss.trigger(this._id);
	};


	this.Toast = Toast;
});
namespace('OUI.Components', function (window) 
{
	var TourTipView 	= window.OUI.Views.TourTipView;
	var Event 			= window.Duct.Event;
	var classify		= window.Classy.classify;
	var idGenerator 	= window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.TourTip
	 */
	function TourTip(contents, attachTo, positionConfig, extraClass)
	{
		classify(this);

		this._id 		= idGenerator('tour-tip');

		this._view 		= new TourTipView(this._id, contents, attachTo, positionConfig, extraClass);

		this._onShow 	= new Event('TourTip.onShow');
		this._onRemove 	= new Event('TourTip.onRemove');

		this._view.onUnderlayClick(this.remove);
	}


	TourTip.prototype.show = function ()
	{
		this._view.show();
		this._onShow.trigger(this._id);
	};

	TourTip.prototype.remove = function ()
	{
		this._view.remove();
		this._onRemove.trigger(this._id);
	};

	TourTip.prototype.onShow = function (callback)
	{
		this._onShow.add(callback);
	};

	TourTip.prototype.onRemove = function (callback)
	{
		this._onRemove.add(callback);
	};



	this.TourTip = TourTip;
});
namespace('OUI.Components', function (window) 
{
	var classify 	= window.Classy.classify;
	var VideoView 	= window.OUI.Views.VideoView;
	var Event 		= window.Duct.Event;


	function Video(videoSelector)
	{
		classify(this);

		this._view 		= new VideoView(videoSelector);
		this._onError 	= new Event('View.onError');

		this._view.onError(this._onError.trigger);
	}


	Video.prototype.onError = function (callback)
	{
		this._onError.add(callback);
	};


	this.Video = Video;
});
namespace('OUI.Components.List', function (window) 
{
	var is 			= window.Plankton.is;
	var obj 		= window.Plankton.obj;
	var foreach 	= window.Plankton.foreach;
	var classify 	= window.Classy.classify;

	var Event 			= window.Duct.Event;

	var ListItems 			= window.OUI.Components.List.ListItems;
	var ListSorting 		= window.OUI.Components.List.ListSorting;
	var ListSelection	 	= window.OUI.Components.List.ListSelection;
	var ListPagination 		= window.OUI.Components.List.ListPagination;
	var ListItemsContainer	= window.OUI.Components.List.ListItemsContainer;

	var Wrapper 		= window.OUI.Components.Wrapper;


	/**
	 * @class window.OUI.Components.List.ListMediator
	 */
	function ListMediator(params)
	{
		classify(this);

		this._isNullstate = false;
		
		this._params 		= obj.merge({ '_page': 0,'_count': 20 }, params);
		this._excludeParams = [];
		this._pagination 	= null;
		this._selection 	= null;
		this._items 		= null;
		this._search 		= null;
		this._template 		= null;
		this._nullstate 	= null;
		this._sorting 		= null;
		this._filter		= null;
		this._container		= new ListItemsContainer();
		
		this._nullstateParams = {};

		this._onUpdateParam 	= new Event('ListMediator.onUpdateParam');
		this._onBeforeRender 	= new Event('ListMediator.onBeforeRender');
		this._onAfterRender 	= new Event('ListMediator.onAfterRender');
		
		this._onItemsRemoved 	= new Event('ListMediator.onItemsRemoved');
	}
	
	
	ListMediator.prototype.setDataKey = function (key)
	{
		this._container.setKey(key);
		return this;
	};
	
	ListMediator.prototype.getSelected = function ()
	{
		return this._selection.getSelected();
	};

	ListMediator.prototype.getParams = function ()
	{
		var params 			= obj.copy(this._params);
		var excludeParams 	= this._excludeParams;

		foreach(excludeParams, function (key)
		{
			if (is(params[key]))
			{
				delete params[key];
			}
		});

		return params;
	};

	ListMediator.prototype.getParam = function (key)
	{
		return this._params[key];
	};

	ListMediator.prototype.setParam = function (key, value)
	{
		this._params[key] = value;
		this._onUpdateParam.trigger(key, value);
	};
	
	ListMediator.prototype.removeParam = function (key)
	{
		delete this._params[key];
	};

	ListMediator.prototype.setExcludeParams = function (keys)
	{
		this._excludeParams = keys;
	};
	
	ListMediator.prototype.setSorting = function ()
	{
		var mediator 	= this;
		var params 		= this.getParams();
		var sorting 	= new ListSorting(params);

		sorting.onSort(function ()
		{
			mediator.setParam('_page', 0);
			mediator.setParam('_order', sorting.getOrder());
		});

		this._onUpdateParam.add(function (key, value)
		{
			sorting.setParam(key, value);
		});

		this._sorting = sorting;
	};

	ListMediator.prototype.setPagination = function (container, total)
	{
		var mediator 	= this;
		var params 		= this.getParams();
		var pagination 	= new ListPagination(container, params, total);

		this._onUpdateParam.add(function (key, value) 
		{
			pagination.setParam(key, value);
			pagination.render();
		});

		this._onBeforeRender.add(function (data)
		{
			pagination.setTotal(data.Total);
			pagination.render();
		});

		pagination.onChange(function (page) 
		{
			mediator.setParam('_page', page);
		});

		this._pagination = pagination;
	};

	ListMediator.prototype.setSearch = function (searchComponent)
	{
		var mediator = this;
		
		this._search = searchComponent;
		
		this._search.onSearch(function (e) 
		{
			mediator.setParam('_page', 0);
			mediator.setParam('q', searchComponent.getValue());
		});

		this._items.onRender(function ()
		{
			mediator._items.highlightTerm(mediator.getParam('q'));
		});
	};
	
	ListMediator.prototype.setFilter = function (filterComponent)
	{
		var mediator = this;
		
		this._filter = filterComponent;
		
		this._filter.onFilter(function (isActive, filters)
		{
			mediator.setParam('_page', 0);
			
			foreach.pair(filters, function (name, value)
			{
				if (is.string.notEmpty(value))
				{
					mediator.setParam(name, value);
				}
				else
				{
					mediator.removeParam(name);
				}
			});
		});
	};

	ListMediator.prototype.setItemsTemplate = function (template)
	{
		this._template = template;
	};
	
	/**
	 * @return {ListItemsContainer}
	 */
	ListMediator.prototype.getContainer = function ()
	{
		return this._container;
	};
	
	ListMediator.prototype.addPayloadTransformer = function (transformer)
	{
		this._container.addPayloadTransformer(transformer);
		return this;
	};
	
	ListMediator.prototype.addItemsTransformer = function (transformer)
	{
		this._container.addItemsTransformer(transformer);
		return this;
	};
	
	ListMediator.prototype.setItemsContainer = function (container)
	{
		this._items.setContainer(container);
	};

	ListMediator.prototype.setItems = function (container, template)
	{
		this._items = new ListItems(container);
		this.setItemsTemplate(template);
	};

	ListMediator.prototype.setNullstate = function (container, template, params)
	{
		this._nullstateParams = params || {};
		
		this._nullstate = new Wrapper(container, template);
	};

	ListMediator.prototype.setSelection = function (container, selector, selectAll)
	{
		var selection = new ListSelection(container, selector, selectAll);

		this._onAfterRender.add(function (data) 
		{
			selection.select(selection.getSelected());
		});

		this._selection = selection;
	};

	ListMediator.prototype.onSelect = function (callback)
	{
		this._selection.onSelect(callback);
	};

	ListMediator.prototype.onDeselect = function (callback)
	{
		this._selection.onDeselect(callback);
	};

	ListMediator.prototype.onRenderNullstate = function (callback)
	{
		this._nullstate.onRender(callback);
	};

	ListMediator.prototype.onRender = function (callback)
	{
		this._items.onRender(callback);
	};
	
	ListMediator.prototype.onClick = function (callback)
	{
		this._items.onClick(callback);	
	};

	ListMediator.prototype.onSort = function (callback)
	{
		this._sorting.onSort(callback);
	};

	ListMediator.prototype.onSearch = function (callback)
	{
		this._search.onSearch(callback);
	};
	
	ListMediator.prototype.onFilter = function (callback)
	{
		this._filter.onFilter(callback);
	};

	ListMediator.prototype.onPaginationChange = function (callback)
	{
		this._pagination.onChange(callback);
	};
	
	ListMediator.prototype.onItemsRemoved = function (callback)
	{
		this._onItemsRemoved.add(callback);
	};

	ListMediator.prototype.setLoadingState = function ()
	{
		this._items.setLoading();
	};

	ListMediator.prototype.removeItems = function (ids)
	{
		this._items.removeItems(ids);

		if (is(this._pagination))
		{
			this._pagination.updatePageOnRemoveItems(this._pagination.getTotal() - ids.length);
			this.setParam('_page', this._pagination.getPage());
		}

		if (is(this._selection))
		{
			this._selection.deselect(ids);
		}
		
		this._onItemsRemoved.trigger(ids);
	};
	
	ListMediator.prototype.getData = function ()
	{
		return this._container.getData();
	};
	
	ListMediator.prototype.getItems = function ()
	{
		return this._container.getItems();
	};
	
	ListMediator.prototype.getItemsCount = function ()
	{
		return this._container.getCount();
	};

	ListMediator.prototype.render = function (data)
	{
		this._container.setData(data);
		
		this._onBeforeRender.trigger(this.getData());
		
		if (!this._container.hasItems())
		{
			if (is(this._search) && this._search.hasValue())
			{
				this._search.showNullstate();
			}
			else if (is(this._filter) && this._filter.isActive())
			{
				this._filter.showNullstate();
			}
			else
			{
				this._isNullstate = true;
				this._nullstate.render(this._nullstateParams);
			}
		}
		else
		{
			this._isNullstate = false;
			this._items.render(this.getItems(), this._template);	
		}

		this._onAfterRender.trigger(this.getData());
	};
	
	ListMediator.prototype.isNullstate = function ()
	{
		return this._isNullstate;	
	};
	
	ListMediator.prototype.select = function (itemIds)
	{
		this._selection.select(itemIds);	
	};
	
	ListMediator.prototype.deselect = function (itemIds)
	{
		this._selection.deselect(itemIds);	
	};


	this.ListMediator = ListMediator;
});