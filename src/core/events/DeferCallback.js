namespace('OUI.core.events', function (window)
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