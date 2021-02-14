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

		if (is(selector))
		{
			this._sortColumns = $(selector).find('.sortable');
		}
		else
		{
			this._sortColumns = $('.sortable');
		}

		this._sortColumns.on('click', this.updateLink);

		this._initSortingOptions();
		this._setInitialSorting();
	}


	ListSortingView.prototype._initSortingOptions = function ()
	{
		this._sortColumns.each(function ()
		{
			var header = $(this);
			header.data('order-init', header.data('order-way'));

			if (header.data('order-way') === 1)
			{
				header.addClass('asc');
				header.removeClass('desc');
			}
			else
			{
				header.addClass('desc');
				header.removeClass('asc');
			}
		});
	};
	
	ListSortingView.prototype._setInitialSorting = function ()
	{
		var order = this._sorting.getParams()._order;
		
		if (!is.defined(order))
			return;
		
		if (typeof order === 'string')
		{
			order = order.split(',');
		}
		
		var elem = $(".sortable[data-order-by='" + order[0] +"']");
		
		if (elem.length > 0)
		{
			var orderWay = order[1] === "0" ? 0 : 1;
			elem.data('order-way', orderWay);
			
			this._updateOrder(elem);
			this._updateLink(elem);
			
			elem.addClass('active');
		}
	};

	ListSortingView.prototype._toggleOrder = function (elem)
	{
		var orderBy 	= elem.data('order-by');
		var orderWay 	= elem.data('order-way') === 1 ? 0 : 1;

		elem.data('order-way', orderWay);

		this._updateOrder(elem);
	};

	ListSortingView.prototype._updateOrder = function (elem)
	{
		var orderBy 	= elem.data('order-by');
		var orderWay 	= elem.data('order-way');

		this._sorting.setParam('_page', 0);
		this._sorting.setParam('_order', orderBy + ',' + orderWay);

		if (orderWay === 1)
		{
			elem.addClass('asc');
			elem.removeClass('desc');
		}
		else
		{
			elem.addClass('desc');
			elem.removeClass('asc');
		}

		this._sortColumns.each(function ()
		{
			var header = $(this);

			if (header.data('order-by') === orderBy)
				return;

			header.data('order-way', header.data('order-init'));
		});
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

		if (elem.hasClass('active'))
		{
			this._toggleOrder(elem);
		}
		else
		{
			this._updateOrder(elem);
		}

		this._updateLink(elem);
		this._sorting.sort(e);
	};

	
	this.ListSortingView = ListSortingView;
});