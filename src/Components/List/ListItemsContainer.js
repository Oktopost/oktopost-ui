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
		
		foreach (original[this._key], function (record)
		{
			var result = record;
			
			foreach (this._transformers, function (transformer)
			{
				result = transformer(original, result, count++)
			},
			this);
			
			data[this._key].push(result);
		},
		this);
	}
	
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
		
		foreach (original[this._key], function (record)
		{
			var result = record;
			
			foreach (this._recordTransformers, function (transformer)
			{
				result = transformer(data, obj.copy(result), count++)
			},
			this);
			
			data[this._key].push(result);
		},
		this);
		
		this._data = data;
	}
	
	
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