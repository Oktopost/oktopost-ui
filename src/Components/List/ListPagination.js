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
	
	
	ListPagination.prototype._countPages = function (total, size)
	{
		var pages = Math.floor(total / size);

		if (total % size > 0)
		{
			pages++;
		}
		
		return pages;
	};
	
	ListPagination.prototype._isNeedToRefresh = function (page, count, total, newTotal)
	{
		var oldPagesAmount = this._countPages(total, count);
		var newPagesAmount = this._countPages(newTotal, count);
		
		if (page === (oldPagesAmount - 1) && oldPagesAmount === newPagesAmount && newTotal > 0)
		{
			return false;
		}
		
		return true;
	};
	
	ListPagination.prototype._getNewPage = function (page, count, total, newTotal)
	{
		var oldPagesAmount = this._countPages(total, count);
		var newPagesAmount = this._countPages(newTotal, count);
		
		if (newPagesAmount === 0)
		{
			return 0;
		}
		
		if ((page === (oldPagesAmount - 1) || (page > (newPagesAmount - 1))) && oldPagesAmount !== newPagesAmount)
		{
			return newPagesAmount - 1;
		}
		
		return page;
	};


	ListPagination.prototype.updatePageOnRemoveItems = function (newTotal)
	{
		var page 		= this.getPage();
		var count 		= this.getCount();
		var total 		= this.getTotal();

		this.setTotal(newTotal);
		this.render();
				
		if (!this._isNeedToRefresh(page, count, total, newTotal))
		{
			return;
		}

		this.setPage(this._getNewPage(page, count, total, newTotal));
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
		if (total !== this._total)
		{
			this._total = total;
		}
	};

	ListPagination.prototype.setParam = function (param, value)
	{
		if (this._params[param] !== value) 
		{
			this._params[param] = value;
		}
	};
	
	ListPagination.prototype.setParams = function (params)
	{
		this._params = params;
	};

	ListPagination.prototype.getParams = function ()
	{
		return this._params;
	};

	ListPagination.prototype.removeParam = function (param)
	{
		delete this._params[param];
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

	ListPagination.prototype.render = function ()
	{
		this._view.render();
	};


	this.ListPagination = ListPagination;
});