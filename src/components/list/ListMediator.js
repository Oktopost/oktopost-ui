namespace('OUI.components.list', function (window) 
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify;

	var ListPagination 	= window.OUI.components.list.ListPagination;
	var ListSelection 	= window.OUI.components.list.ListSelection;
	var ListItems 		= window.OUI.components.list.ListItems;
	var SearchForm 		= window.OUI.components.SearchForm;
	var Wrapper 		= window.OUI.components.Wrapper;

	var DeferCallback 	= window.OUI.core.events.DeferCallback;


	/**
	 * @class window.OUI.components.list.ListMediator
	 */
	function ListMediator()
	{
		classify(this);

		this._pagination 	= null;
		this._selection 	= null;
		this._items 		= null;
		this._search 		= null;

		this._template 		= null;
		this._nullstate 	= null;
	};


	ListMediator.prototype.getSelection = function ()
	{
		return this._selection;
	};

	ListMediator.prototype.getPagination = function ()
	{
		return this._pagination;
	};

	ListMediator.prototype.getSearch = function ()
	{
		return this._search;
	};

	ListMediator.prototype.setPagination = function (container, params, total)
	{
		this._pagination = new ListPagination(container, params, total);
	};

	ListMediator.prototype.setSearch = function (container, value, placeholder)
	{
		this._search = new SearchForm(container, value, placeholder);
	};

	ListMediator.prototype.setSearchCallback = function (callback)
	{
		if (is.null(this._search)) throw new Error("Search must be defined");

		var deferredCallback = new DeferCallback(300, callback);

		this._search.onInput(deferredCallback.deferAction);
	};

	ListMediator.prototype.setItems = function (container, template)
	{
		this._items = new ListItems(container);
		this._template = template;
	};

	ListMediator.prototype.setNullstate = function (container, template)
	{
		this._nullstate = new Wrapper(container, template);
	};

	ListMediator.prototype.onRenderNullstate = function (callback)
	{
		this._nullstate.onRender(callback);
	};

	ListMediator.prototype.onRender = function (callback)
	{
		this._items.onRender(callback);
	};

	ListMediator.prototype.render = function (data)
	{
		if (data.length === 0 && (is.false(this._search) || !this._search.hasValue()))
		{
			this._nullstate.render(data);
		}
		else
		{
			this._items.render(data, this._template);	
		}
	};


	this.ListMediator = ListMediator;
});