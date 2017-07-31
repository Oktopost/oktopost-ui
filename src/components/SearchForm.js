namespace('OUI.components', function (window) 
{
	var Event 			= window.Duct.Event;
	var SearchFormView 	= window.OUI.views.SearchFormView;

	var classify 		= window.Classy.classify;
	var idGenerator 	= window.OUI.core.view.idGenerator;


	function SearchForm(container, placeholder)
	{
		classify(this);

		this._id 		= idGenerator('oui-search-form');

		this._view 		= new SearchFormView(this, container, placeholder);

		this._onKeyup 	= new Event('searchForm.onKeyup');
		this._onKeydown = new Event('searchForm.onKeydown');
		this._onChange 	= new Event('searchForm.onChange');
		this._onClear 	= new Event('searchForm.onClear');

		this.onClear(this._view.clearInput);
		this.onKeyup(this._view.transformIcon);
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

	SearchForm.prototype.onKeyup = function (callback)
	{
		this._onKeyup.add(callback);
	};

	SearchForm.prototype.onKeydown = function (callback)
	{
		this._onKeydown.add(callback);
	};

	SearchForm.prototype.onChange = function (callback)
	{
		this._onChange.add(callback);
	};

	SearchForm.prototype.onClear = function (callback)
	{
		this._onClear.add(callback);
	};

	SearchForm.prototype.keyup = function (input)
	{
		this._onKeyup.trigger(input);
	};

	SearchForm.prototype.keydown = function (input)
	{
		this._onKeydown.trigger(input);
	};

	SearchForm.prototype.change = function (input)
	{
		this._onChange.trigger(input);
	};

	SearchForm.prototype.clear = function (button)
	{
		this._onClear.trigger(button);
	};


	this.SearchForm = SearchForm;
});