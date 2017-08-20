namespace('OUI.Components.List', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListPaginationView 	= window.OUI.Views.List.ListPaginationView;

	var classify 			= window.Classy.classify;
	var obj 				= window.Plankton.obj;


	/**
	 * @class window.OUI.Components.List.ListPagination
	 */
	function ListPagination(container, params, total) 
	{
		classify(this);

		this._params 	= params;
		this._total		= total;
		
		this._view 		= new ListPaginationView(this, container);

		this._onNext 	= new Event('ListPagination.onNext');
		this._onPrev 	= new Event('ListPagination.onPrev');
		this._onChange 	= new Event('ListPagination.onChange');

		this.onChange(this._view.render);
	}


	ListPagination.prototype.updatePageOnRemoveItems = function (newTotal)
	{
		var page 		= this.getPage();
		var count 		= this.getCount();
		var total 		= this.getTotal();
		var toRemove 	= total - newTotal;
		var pageDelta 	= Math.ceil(toRemove / count);

		if (newTotal >= total)
			return;

		if ((page + 1) * count > newTotal) 
			return;

		if (page === 0)
			return;

		this.setPage(page - pageDelta);
		this._onChange.trigger(this.getPage());
	};

	ListPagination.prototype.onNext = function (callback)
	{
		this._onNext.add(callback);
	};

	ListPagination.prototype.onPrev = function (callback)
	{
		this._onPrev.add(callback);
	};

	ListPagination.prototype.onChange = function (callback)
	{
		this._onChange.add(callback);
	};

	ListPagination.prototype.next = function ()
	{
		var total 	= this.getTotal();
		var page 	= this.getPage();
		var count 	= this.getCount();

		if ((page + 1) * count < total)
		{
			this.setPage(page + 1);

			this._onChange.trigger(this.getPage());
			this._onNext.trigger(this.getPage());
		}
	};

	ListPagination.prototype.prev = function ()
	{
		var page = this.getPage();

		if (page > 0)
		{
			this.setPage(page - 1);

			this._onChange.trigger(this.getPage());
			this._onPrev.trigger(this.getPage());
		}
	};

	ListPagination.prototype.setPage = function (page)
	{
		this.setParam('_page', page);
	};

	ListPagination.prototype.setCount = function (count)
	{
		this.setParam('_count', count);
	};

	ListPagination.prototype.setTotal = function (total)
	{
		if (total != this._total)
		{
			this._total = total;
			this._view.render();
		}
	};

	ListPagination.prototype.setParam = function (param, value)
	{
		if (this._params[param] != value) 
		{
			this._params[param] = value;
			this._view.render();
		}
	};

	ListPagination.prototype.getParams = function ()
	{
		return this._params;
	};

	ListPagination.prototype.getPage = function ()
	{
		return this._params['_page'];
	};

	ListPagination.prototype.getCount = function ()
	{
		return this._params['_count'];
	};

	ListPagination.prototype.getTotal = function ()
	{
		return this._total;
	};


	this.ListPagination = ListPagination;
});