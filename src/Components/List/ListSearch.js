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

		this.onSearch(this._view.showLoading);
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

	ListSearch.prototype.hideNullstate = function ()
	{
		this._view.hideNullstate();
	}


	this.ListSearch = ListSearch;
});