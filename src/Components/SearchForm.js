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