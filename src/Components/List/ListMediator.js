namespace('OUI.Components.List', function (window) 
{
	var is 			= window.Plankton.is;
	var obj 		= window.Plankton.obj;
	var foreach 	= window.Plankton.foreach;
	var classify 	= window.Classy.classify;

	var Event 			= window.Duct.Event;

	var ListPagination 	= window.OUI.Components.List.ListPagination;
	var ListSelection 	= window.OUI.Components.List.ListSelection;
	var ListItems 		= window.OUI.Components.List.ListItems;
	var ListSorting 	= window.OUI.Components.List.ListSorting;

	var Wrapper 		= window.OUI.Components.Wrapper;


	/**
	 * @class window.OUI.Components.List.ListMediator
	 */
	function ListMediator(params)
	{
		classify(this);

		this._isNullstate = false;
		
		this._params 		= obj.merge({ '_page': 0,'_count': 20 }, params);
		this._excludeParams = [];
		this._pagination 	= null;
		this._selection 	= null;
		this._items 		= null;
		this._search 		= null;
		this._template 		= null;
		this._nullstate 	= null;
		this._sorting 		= null;
		
		this._nullstateParams = {};

		this._onUpdateParam 	= new Event('ListMediator.onUpdateParam');
		this._onBeforeRender 	= new Event('ListMediator.onBeforeRender');
		this._onAfterRender 	= new Event('ListMediator.onAfterRender');
		
		this._onItemsRemoved 	= new Event('ListMediator.onItemsRemoved');
	}


	ListMediator.prototype.getSelected = function ()
	{
		return this._selection.getSelected();
	};

	ListMediator.prototype.getParams = function ()
	{
		var params 			= obj.copy(this._params);
		var excludeParams 	= this._excludeParams;

		foreach(excludeParams, function (key)
		{
			if (is(params[key]))
			{
				delete params[key];
			}
		});

		return params;
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

	ListMediator.prototype.setExcludeParams = function (keys)
	{
		this._excludeParams = keys;
	};
	
	ListMediator.prototype.setSorting = function ()
	{
		var mediator 	= this;
		var params 		= this.getParams();
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
		var mediator 	= this;
		var params 		= this.getParams();
		var pagination 	= new ListPagination(container, params, total);

		this._onUpdateParam.add(function (key, value) 
		{
			pagination.setParam(key, value);
			pagination.render();
		});

		this._onBeforeRender.add(function (data)
		{
			pagination.setTotal(data.Total);
			pagination.render();
		});

		pagination.onChange(function (page) 
		{
			mediator.setParam('_page', page);
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

	ListMediator.prototype.setItemsTemplate = function (template)
	{
		this._template = template;
	};

	ListMediator.prototype.setItems = function (container, template)
	{
		this._items = new ListItems(container);
		this.setItemsTemplate(template);
	};

	ListMediator.prototype.setNullstate = function (container, template, params)
	{
		this._nullstateParams = params || {};
		
		this._nullstate = new Wrapper(container, template);
	};

	ListMediator.prototype.setSelection = function (container, selector, selectAll)
	{
		var selection = new ListSelection(container, selector, selectAll);

		this._onAfterRender.add(function (data) 
		{
			selection.select(selection.getSelected());
		});

		this._selection = selection;
	};

	ListMediator.prototype.onSelect = function (callback)
	{
		this._selection.onSelect(callback);
	};

	ListMediator.prototype.onDeselect = function (callback)
	{
		this._selection.onDeselect(callback);
	};

	ListMediator.prototype.onRenderNullstate = function (callback)
	{
		this._nullstate.onRender(callback);
	};

	ListMediator.prototype.onRender = function (callback)
	{
		this._items.onRender(callback);
	};
	
	ListMediator.prototype.onClick = function (callback)
	{
		this._items.onClick(callback);	
	};

	ListMediator.prototype.onSort = function (callback)
	{
		this._sorting.onSort(callback);
	};

	ListMediator.prototype.onSearch = function (callback)
	{
		this._search.onSearch(callback);
	};

	ListMediator.prototype.onPaginationChange = function (callback)
	{
		this._pagination.onChange(callback);
	};
	
	ListMediator.prototype.onItemsRemoved = function (callback)
	{
		this._onItemsRemoved.add(callback);
	};

	ListMediator.prototype.setLoadingState = function ()
	{
		this._items.setLoading();
	};

	ListMediator.prototype.removeItems = function (ids)
	{
		this._items.removeItems(ids);

		if (is(this._pagination))
		{
			this._pagination.updatePageOnRemoveItems(this._pagination.getTotal() - ids.length);
			this.setParam('_page', this._pagination.getPage());
		}

		if (is(this._selection))
		{
			this._selection.deselect(ids);
		}
		
		this._onItemsRemoved.trigger(ids);
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
				this._isNullstate = true;
				this._nullstate.render(this._nullstateParams);
			}
		}
		else
		{
			this._isNullstate = false;
			this._items.render(data.Items, this._template);	
		}

		this._onAfterRender.trigger(data);
	};
	
	ListMediator.prototype.isNullstate = function ()
	{
		return this._isNullstate;	
	};
	
	ListMediator.prototype.select = function (itemIds)
	{
		this._selection.select(itemIds);	
	};
	
	ListMediator.prototype.deselect = function (itemIds)
	{
		this._selection.deselect(itemIds);	
	};


	this.ListMediator = ListMediator;
});