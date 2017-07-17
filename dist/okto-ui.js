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
