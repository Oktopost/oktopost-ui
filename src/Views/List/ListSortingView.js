namespace('OUI.Views.List', function (window) 
{
	var classify = window.Classy.classify;


	/**
	 * @class OUI.Views.List.ListSortingView
	 */
	function ListSortingView(sorting, params, selector)
	{
		classify(this);

		this._sorting = sorting;

		this._sortColumns = $('a.sortable');
		this._sortColumns.on('click', this.updateLink);
	}


	ListSortingView.prototype._setOrder = function (elem)
	{
		var order 		= elem.data();
		var orderWay 	= order.orderWay === 1 ? 0 : 1;

		this._sorting.setParam('_page', 0);
		this._sorting.setParam('_order', order.orderBy + ',' + orderWay);

		if (orderWay === 1)
		{
			elem.addClass('asc');
		}
		else 
		{
			elem.removeClass('asc');
		}

		elem.data('order-way', orderWay);
	};

	ListSortingView.prototype._updateLink = function (elem)
	{
		var path 		= window.location.pathname;
		var queryString = $.param(this._sorting.getParams());

		elem.attr('href', path + (queryString.length ? '?' + queryString : ''));
	};

	
	ListSortingView.prototype.setActive = function (e)
	{
		this._sortColumns.removeClass('active');
		$(e.target).addClass('active');
	};

	ListSortingView.prototype.updateLink = function (e)
	{
		e.preventDefault();

		var elem = $(e.target);
		
		this._setOrder(elem);
		this._updateLink(elem);
		this._sorting.sort(e);
	};

	
	this.ListSortingView = ListSortingView;
});