namespace('OUI.components', function (window) 
{
	var Event 			= window.Duct.Event;
	var SearchFormView 	= window.OUI.views.SearchFormView;

	var classify 		= window.Classy.classify;
	var idGenerator 	= window.OUI.core.view.idGenerator;


	function SearchForm(container, value, placeholder)
	{
		classify(this);

		this._id 		= idGenerator('oui-search-form');

		this._view 		= new SearchFormView(this, container, value, placeholder);

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

	SearchForm.prototype.onInput = function (callback)
	{
		this._onInput.add(callback);
	};

	SearchForm.prototype.onClear = function (callback)
	{
		this._onClear.add(callback);
	};

	SearchForm.prototype.input = function (input)
	{
		this._onInput.trigger(input);
	};
	
	SearchForm.prototype.clear = function (button)
	{
		this._onClear.trigger(button);
	};


	this.SearchForm = SearchForm;
});