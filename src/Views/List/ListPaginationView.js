namespace('OUI.Views.List', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var obj			= window.Plankton.obj;


	/**
	 * @class OUI.Views.List.ListPaginationView
	 */
	function ListPaginationView(listPagination, container) 
	{
		classify(this);

		this._pagination 	= listPagination;
		this._container 	= $(container);

		this._nextSelector	= 'a[data-next]';
		this._prevSelector 	= 'a[data-prev]';

		this._bindEvents();
		this.render();
	}


	ListPaginationView.prototype._getLink = function (params)
	{
		return window.location.pathname + '?' + $.param(params);
	};

	ListPaginationView.prototype._getNextPageLink = function (page, total, count)
	{
		var params = obj.copy(this._pagination.getParams());

		if ((page + 1) * count < total)
		{
			params['_page'] = page + 1;
		}

		return this._getLink(params);
	};

	ListPaginationView.prototype._getPrevPageLink = function (page, total, count)
	{
		var params = obj.copy(this._pagination.getParams());

		if (page > 0)
		{
			params['_page'] = page - 1;
		}

		return this._getLink(params);
	};

	ListPaginationView.prototype._getViewParams = function ()
	{
		var total 	= this._pagination.getTotal();
		var page 	= this._pagination.getPage();
		var count 	= this._pagination.getCount();

		var showingFrom = (page * count) + 1;
		var showingTo 	= (page + 1) * count < total ? (page + 1) * count : total;

		var data = 
		{
			showingFrom: 	showingFrom,
			showingTo: 		showingTo,
			prevPageLink: 	this._getPrevPageLink(page, total, count),
			nextPageLink: 	this._getNextPageLink(page, total, count),
			hasNextPage: 	(page + 1) * count < total,
			hasPrevPage: 	page > 0,
			total: total
		};

		return data;
	};

	ListPaginationView.prototype._bindEvents = function ()
	{
		this._container.on('click', this._nextSelector, this._pagination.next);
		this._container.on('click', this._prevSelector, this._pagination.prev);
	};


	ListPaginationView.prototype.render = function ()
	{		
		this._container.empty().append(hbs('pagination', this._getViewParams()));		
	};

	
	this.ListPaginationView = ListPaginationView;
});