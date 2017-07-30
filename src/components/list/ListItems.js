namespace('OUI.components.list', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListItemsView 	= window.OUI.views.list.ListItemsView;

	var classify 		= window.Classy.classify;


	/**
	 * @class OUI.components.list.ListItems
	 */
	function ListItems($container) 
	{
		classify(this);
		
		this._view 		= new ListItemsView(this, $container);
		this._onRender 	= new Event('ListItems.onRender');
	};

	
	ListItems.prototype.onRender = function (callback)
	{
		this._onRender.add(callback);
	};

	ListItems.prototype.renderHbs = function (template, items) 
	{
		this._view.renderHbs(template, items);
		this._onRender.trigger(this._view.getContainer());
	};


	this.ListItems = ListItems;
});