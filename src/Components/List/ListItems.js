namespace('OUI.Components.List', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListItemsView 	= window.OUI.Views.List.ListItemsView;
	var foreach 		= window.Plankton.foreach;
	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.Components.List.ListItems
	 */
	function ListItems(container) 
	{
		classify(this);
		
		this._view 		= new ListItemsView(this, container);
		
		this._onRender 	= new Event('ListItems.onRender');
		this._onRemove 	= new Event('ListItems.onRemove');
	};


	ListItems.prototype.getContainer = function ()
	{
		return this._view.getContainer();
	};
	
	ListItems.prototype.onRender = function (callback)
	{
		this._onRender.add(callback);
	};

	ListItems.prototype.onRemove = function (callback)
	{
		this._onRemove.add(callback);
	};

	ListItems.prototype.render = function (items, template) 
	{		
		this._view.render(items, template);
		this._onRender.trigger(this.getContainer());
	};

	ListItems.prototype.highlightTerm = function (term)
	{
		this._view.highlightTerm(term);
	};

	ListItems.prototype.setLoading = function ()
	{
		this._view.setLoading();
	};

	ListItems.prototype.removeItems = function (ids)
	{
		this._view.removeItems(ids);
		this._onRemove.trigger(ids);
	};


	this.ListItems = ListItems;
});