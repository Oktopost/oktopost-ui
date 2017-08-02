namespace('OUI.components.list', function (window) 
{
	var Event 			= window.Duct.Event;
	var ListSortingView = window.OUI.views.list.ListSortingView;

	var classify 		= window.Classy.classify;


	/**
	 * @class window.OUI.components.list.ListSorting
	 */
	function ListSorting() 
	{
		classify(this);
		
		this._view 		= new ListSortingView(this);
		this._onSort 	= new Event('ListSorting.onSort');

		this.onSort(this._view.setActive);
	}
	

	ListSorting.prototype.onSort = function (callback) 
	{
		this._onSort.add(callback);
	};

	ListSorting.prototype.sort = function (elem) 
	{
		this._onSort.trigger(elem);
	};


	this.ListSorting = ListSorting;
});