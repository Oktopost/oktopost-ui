namespace('OUI.Views.List', function (window) 
{
	var is		 = window.Plankton.is;
	var classify = window.Classy.classify;


	/**
	 * @class OUI.Views.List.ListSortingView
	 */
	function ListSortingView(sorting, params, selector)
	{
		classify(this);

		this._sorting = sorting;

		this._sortColumns = $('.sortable');
		this._sortColumns.on('click', this.updateLink);
		
		this._setInitialSorting();
	}

	
	ListSortingView.prototype._setInitialSorting = function ()
	{
		var order = this._sorting.getParams()._order;
		
		if (!is.defined(order))
			return;
		
		var orderData = order.split(',');
		
		var elem = $(".sortable[data-order-by='" + orderData[0] +"']");
		
		if (elem.length > 0)
		{
			var orderWay = orderData[1] === "0" ? 1 : 0;
			elem.data('order-way', orderWay);
			
			this._setOrder(elem);
			this._updateLink(elem);
			
			elem.addClass('active');
		}
	};

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
		$(e.currentTarget).addClass('active');
	};

	ListSortingView.prototype.updateLink = function (e)
	{
		var elem = $(e.currentTarget);
		
		this._setOrder(elem);
		this._updateLink(elem);
		this._sorting.sort(e);
	};

	
	this.ListSortingView = ListSortingView;
});