namespace('OUI.components.list', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListSortingView = window.OUI.views.list.ListSortingView;

	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.components.list.ListSorting
	 */
	function ListSorting(selector, params) 
	{
		classify(this);
		
		this._view 			= new ListSortingView(this, selector);
		this._onSetOrder 	= new Event('ListSorting.onSetOrder');
	};

	
	ListSorting.prototype.onSetOrder = function (callback)
	{
		
	};

	ListSorting.prototype.setOrder = function (orderBy, orderWay) 
	{

	};


	this.ListSorting = ListSorting;
});