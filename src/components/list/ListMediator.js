namespace('OUI.components.list', function (window) 
{
	var is 			= window.Plankton.is;
	var obj 		= window.Plankton.obj;
	var classify 	= window.Classy.classify;

	var Event 			= window.Duct.Event;

	var ListPagination 	= window.OUI.components.list.ListPagination;
	var ListSelection 	= window.OUI.components.list.ListSelection;
	var ListItems 		= window.OUI.components.list.ListItems;
	var ListSorting 	= window.OUI.components.list.ListSorting;

	var Wrapper 		= window.OUI.components.Wrapper;


	/**
	 * @class window.OUI.components.list.ListMediator
	 */
	function ListMediator(params)
	{
		classify(this);

		this._params 		= obj.merge({ '_page': 0,'_count': 20 }, params);
		this._pagination 	= null;
		this._selection 	= null;
		this._items 		= null;
		this._search 		= null;
		this._template 		= null;
		this._nullstate 	= null;
		this._sorting 		= null;

		this._onUpdateParam 	= new Event('ListMediator.onUpdateParam');
		this._onBeforeRender 	= new Event('ListMediator.onBeforeRender');
	}


	ListMediator.prototype.getParams = function ()
	{
		return this._params;
	};

	ListMediator.prototype.getParam = function (key)
	{
		return this._params[key];
	};

	ListMediator.prototype.setParam = function (key, value)
	{
		this._params[key] = value;
		this._onUpdateParam.trigger(key, value);
	};
	
	ListMediator.prototype.setSorting = function ()
	{
		var mediator 	= this;
		var params 		= obj.copy(this._params);
		var sorting 	= new ListSorting(params);

		sorting.onSort(function ()
		{
			mediator.setParam('_page', 0);
			mediator.setParam('_order', sorting.getOrder());
		});

		this._onUpdateParam.add(function (key, value)
		{
			sorting.setParam(key, value);
		});

		this._sorting = sorting;
	};

	ListMediator.prototype.setPagination = function (container, total)
	{
		var params 		= obj.copy(this._params);
		var pagination 	= new ListPagination(container, params, total);

		this._onUpdateParam.add(function (key, value) 
		{
			pagination.setParam(key, value);
		});

		this._onBeforeRender.add(function (data)
		{
			pagination.setTotal(data.Total);
		});

		this._pagination = pagination;
	};

	ListMediator.prototype.setSearch = function (searchComponent)
	{
		var mediator = this;
		
		this._search = searchComponent;
		
		this._search.onSearch(function (e) 
		{
			mediator.setParam('_page', 0);
			mediator.setParam('q', searchComponent.getValue());
		});

		this._items.onRender(function ()
		{
			mediator._items.highlightTerm(mediator.getParam('q'));
		});
	};

	ListMediator.prototype.setItems = function (container, template)
	{
		this._items 	= new ListItems(container);
		this._template 	= template;
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

	ListMediator.prototype.onSearch = function (callback)
	{
		this._search.onSearch(callback);
	};

	ListMediator.prototype.render = function (data)
	{
		this._onBeforeRender.trigger(data);
		
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