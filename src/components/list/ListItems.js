namespace('OUI.components.list', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListItemsView 	= window.OUI.views.list.ListItemsView;

	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.components.list.ListItems
	 */
	function ListItems(container) 
	{
		classify(this);
		
		this._view 		= new ListItemsView(this, container);
		this._onRender 	= new Event('ListItems.onRender');
	};


	ListItems.prototype.getContainer = function ()
	{
		return this._view.getContainer();
	};
	
	ListItems.prototype.onRender = function (callback)
	{
		this._onRender.add(callback);
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


	this.ListItems = ListItems;
});