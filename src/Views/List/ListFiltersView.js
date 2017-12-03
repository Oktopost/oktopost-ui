namespace('OUI.Views.List', function (window)
{
	var classify	= window.Classy.classify;
	var Event		= window.Duct.Event;
	
	
	/**
	 * @class window.OUI.Views.List.ListFiltersView
	 */
	function ListFiltersView()
	{
		classify(this);
		
		this._applyButton = null;
		this._resetButton = null;
		
		this._itemsContainer 		= null;
		this._itemsWrapper			= null;
		this._nullstateContainer 	= null;
		
		this._onFilterApply = new Event('ListFiltersView.onFilterApply');
		this._onFilterReset = new Event('ListFiltersView.onFilterReset');
	}
	
	
	ListFiltersView.prototype.addApply = function (el, event)
	{
		event = event || 'click';
		el 	= is.object(el) ? el : $(el);
		
		this._applyButton = el;
		this._applyButton.on(event, this._onFilterApply.trigger);
	};
	
	ListFiltersView.prototype.addReset = function (el, event)
	{
		event = event || 'click';
		el 	= is.object(el) ? el : $(el);
		
		this._resetButton = el;
		this._resetButton.on(event, this._onFilterReset.trigger);
	};
	
	ListFiltersView.prototype.setItemsContainer = function (container)
	{
		this._itemsContainer 	= $(container);
		this._itemsWrapper 		= this.getItemsWrapper();
	};

	ListFiltersView.prototype.getItemsWrapper = function ()
	{
		var container = this._itemsContainer;
		return container.parent()[0].tagName === 'TABLE' ? container.parent() : container;
	};

	ListFiltersView.prototype.setNullstate = function (container)
	{
		this._nullstateContainer = $(container);
	};

	ListFiltersView.prototype.hideNullstate = function ()
	{
		this._itemsWrapper.removeClass('hidden');
		this._nullstateContainer.empty().addClass('hidden');
	};

	ListFiltersView.prototype.showNullstate = function ()
	{
		this._itemsWrapper.addClass('hidden');
		this._nullstateContainer.removeClass('hidden');
	};
	
	ListFiltersView.prototype.onApply = function (callback)
	{
		this._onFilterApply.add(callback);	
	};
	
	ListFiltersView.prototype.onReset = function (callback)
	{
		this._onFilterReset.add(callback);	
	};
	
	
	this.ListFiltersView = ListFiltersView;
});