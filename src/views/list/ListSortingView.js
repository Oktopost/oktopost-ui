namespace('OUI.views.list', function (window) 
{
	var classify 		= window.Classy.classify;
	var URLSearchParams = window.URLSearchParams;


	/**
	 * @class OUI.views.list.ListSortingView
	 */
	function ListSortingView(sorting, selector)
	{
		classify(this);

		this._sorting = sorting;

		this._sortColumns = $('a.sortable');
		this._sortColumns.on('click', this.updateLink);
	}


	ListSortingView.prototype.getSearchParams = function ()
	{
		var searchParams = window.location.search.slice(1);

		if (searchParams.length === 0)
		{
			searchParams = '_page=&_order=';
		}

		return new URLSearchParams(searchParams);
	};


	ListSortingView.prototype.setActive = function (elem)
	{
		this._sortColumns.removeClass('active');
		elem.addClass('active');
	};

	ListSortingView.prototype.updateLink = function (event)
	{
		event.preventDefault();

		var target 	= $(event.target);
		var path 	= window.location.pathname;
		var order 	= target.data();
		var params 	= this.getSearchParams();
		
		params.set('_page', 0);
		params.set('_order', order.orderBy + ',' + (order.orderWay === 1 ? 0 : 1));

		target.attr('href', path + '?' + params.toString());

		this._sorting.sort(target);
	};

	
	this.ListSortingView = ListSortingView;
});