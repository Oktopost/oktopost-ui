namespace('OUI.components.list', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListSortingView = window.OUI.views.list.ListSortingView;

	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.components.list.ListSorting
	 */
	function ListSorting(params) 
	{
		classify(this);
		
		this._params 	= params;

		this._view 			= new ListSortingView(this);
		this._onSort 		= new Event('ListSorting.onSort');
		
		this.onSort(this._view.setActive);
	}


	ListSorting.prototype.getOrder = function ()
	{
		return this._params['_order'];
	};
	
	ListSorting.prototype.setParam = function (key, value)
	{
		this._params[key] = value;
	};

	ListSorting.prototype.getParams = function ()
	{
		return this._params;
	};

	ListSorting.prototype.onSort = function (callback) 
	{
		this._onSort.add(callback);
	};

	ListSorting.prototype.sort = function (e) 
	{
		this._onSort.trigger(e);
	};


	this.ListSorting = ListSorting;
});