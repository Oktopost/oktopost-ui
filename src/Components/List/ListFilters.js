namespace('OUI.Components.List', function (window)
{
	var classify			= window.Classy.classify;
	var foreach				= window.Plankton.foreach;
	
	var Event				= window.Duct.Event;
	
	var ListFiltersView		= window.OUI.Views.List.ListFiltersView;
	var ListFilterView		= window.OUI.Views.List.ListFilterView;
	var Wrapper 			= window.OUI.Components.Wrapper;
	
	
	/**
	 * @class window.OUI.Components.List.ListFilters
	 */
	function ListFilters()
	{
		classify(this);
		
		this._view = new ListFiltersView();
		
		this._view.onApply(this.apply);
		this._view.onReset(this.reset);
		
		this._filters = {};
		
		this._nullstate = null;
		
		this._onFilter 	= new Event('ListFilters.onFilter');
		this._onApply 	= new Event('ListFilters.onApply');
		this._onReset 	= new Event('ListFilters.onReset');
	}
	
	
	ListFilters.prototype.addFilter = function (el, name, value)
	{
		this._filters[name] = new ListFilterView(el, name, value);
	};
	
	ListFilters.prototype.removeFilter = function (name)
	{
		delete this._filters[name];
	};
	
	ListFilters.prototype.addApplyButton = function (el, event)
	{
		this._view.addApply(el, event);	
	};	
	
	ListFilters.prototype.addResetButton = function (el, event)
	{
		this._view.addReset(el, event);	
	};
	
	ListFilters.prototype.apply = function ()
	{
		var filters = {};
		
		foreach.pair(this._filters, function (key, filter)
		{
			filters[filter.name()] = filter.value();
		});
		
		this._onFilter.trigger(this.isActive(), filters);
		this._onApply.trigger(this.isActive(), filters);
	};
	
	ListFilters.prototype.reset = function ()
	{
		var filters = {};
		
		foreach.pair(this._filters, function (key, filter)
		{
			filter.reset();
			filters[filter.name()] = filter.value();
		});
		
		this._onFilter.trigger(this.isActive(), filters);
		this._onReset.trigger(this.isActive(), filters);
	};
	
	ListFilters.prototype.onFilter = function (callback)
	{
		this._onFilter.add(callback);
	};	
	
	ListFilters.prototype.onApply = function (callback)
	{
		this._onApply.add(callback);
	};	
	
	ListFilters.prototype.onReset = function (callback)
	{
		this._onReset.add(callback);
	};
	
	ListFilters.prototype.setItemsContainer = function (container)
	{
		this._view.setItemsContainer(container);
	};

	ListFilters.prototype.setNullstate = function (container, template)
	{
		this._nullstate = new Wrapper(container, template);
		this._nullstate.onRender(this._view.showNullstate);

		this._view.setNullstate(container);

		this.onFilter(this._view.hideNullstate);
	};
	
	ListFilters.prototype.showNullstate = function ()
	{
		this._nullstate.render();
	};
	
	ListFilters.prototype.isActive = function ()
	{
		var isActive = false;
		
		foreach.pair(this._filters, function (key, filter)
		{
			if (filter.isActive())
			{
				isActive = true;
				return false;
			}
		});
		
		return isActive;
	};
	
	
	this.ListFilters = ListFilters;
});