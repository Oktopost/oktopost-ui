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

		this._pagination 		= null;
		this._selection 		= null;
		this._items 			= null;
		this._search 			= null;
		this._searchParam 		= null;
		this._searchCallback	= null;
		this._searchNullstate	= null;

		this._template 			= null;
		this._nullstate 		= null;
		this._hiddenClass		= 'hidden';
	};


	ListMediator.prototype._resetPaginationAndSearchCallback = function ()
	{
		var value = this._search.getValue();

		this._pagination.setPage(0);
		this._pagination.setParam(this._searchParam, value);

		this._searchCallback(value);
	};

	ListMediator.prototype._getContainer = function ()
	{
		var container = this._items.getContainer();

		if (container.parent()[0].tagName === 'TABLE')
		{
			return container.parent();
		}

		return container;
	};

	ListMediator.prototype._hideContainer = function ()
	{
		this._getContainer().addClass(this._hiddenClass);
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

	ListMediator.prototype.setSearch = function (container, value, placeholder, searchParam)
	{
		this._search = new SearchForm(container, value, placeholder);
		this._searchParam = searchParam;
	};

	ListMediator.prototype.setSearchNullstate = function (container, template)
	{
		this._searchNullstate = new Wrapper(container, template);
		this._searchNullstate.onRender(this._hideContainer);
	};

	ListMediator.prototype.setSearchCallback = function (callback)
	{
		if (is.null(this._search)) throw new Error("Search must be defined");

		this._searchCallback = callback;

		var deferredCallback = new DeferCallback(300, this._resetPaginationAndSearchCallback);

		this._search.onInput(deferredCallback.deferAction);
		this._search.onClear(deferredCallback.deferAction);
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
		this._pagination.setTotal(data.Total);

		if (data.Items.length === 0)
		{
			if (is(this._search) && this._search.hasValue())
			{
				this._searchNullstate.render({ value: this._search.getValue() });
			}
			else
			{
				this._nullstate.render();
			}
		}
		else
		{
			this._getContainer().removeClass(this._hiddenClass);
			this._items.render(data.Items, this._template);	
		}
	};


	this.ListMediator = ListMediator;
});