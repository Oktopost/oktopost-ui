namespace('OUI.components.list', function (window) 
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify;

	var ListPagination 	= window.OUI.components.list.ListPagination;
	var ListSelection 	= window.OUI.components.list.ListSelection;
	var ListItems 		= window.OUI.components.list.ListItems;
	var ListSorting 	= window.OUI.components.list.ListSorting;

	var Wrapper 		= window.OUI.components.Wrapper;


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

		this._sorting 		= new ListSorting();
	}


	ListMediator.prototype.highlightSearchTerm = function ()
	{
		var term 		= this._search.getValue();
		var container 	= this._items.getContainer();

		if (term.length)
		{
			container.highlight(term);
		}
		else
		{
			container.unhighlight();
		}
	};

	ListMediator.prototype.resetPaginationLinks = function ()
	{
		this._pagination.setPage(0);
		this._pagination.setParam(this._search.getParam(), this._search.getValue());
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

	ListMediator.prototype.setSearch = function (searchComponent)
	{
		this._search = searchComponent;
		this._search.onSearch(this.resetPaginationLinks);

		this._items.onRender(this.highlightSearchTerm);
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

	ListMediator.prototype.onSort = function (callback)
	{
		this._sorting.onSort(callback);
	};

	ListMediator.prototype.render = function (data)
	{
		this._pagination.setTotal(data.Total);
		
		if (data.Items.length === 0)
		{
			if (is(this._search) && this._search.hasValue())
			{
				this._search.showNullstate();
			}
			else
			{
				this._nullstate.render();
			}
		}
		else
		{
			this._items.render(data.Items, this._template);	
		}
	};


	this.ListMediator = ListMediator;
});