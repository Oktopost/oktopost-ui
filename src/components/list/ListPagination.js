namespace('OUI.components.list', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListPaginationView 	= window.OUI.views.list.ListPaginationView;

	var classify 			= window.Classy.classify;
	var obj 				= window.Plankton.obj;


	/**
	 * @class window.OUI.components.list.ListPagination
	 */
	function ListPagination(container, params, total) 
	{
		classify(this);

		this._params 	= obj.merge({ '_page': 0,'_count': 20 }, params);
		this._total		= total;
		
		this._view 		= new ListPaginationView(this, container);

		this._onNext 	= new Event('ListPagination.onNext');
		this._onPrev 	= new Event('ListPagination.onPrev');
		this._onChange 	= new Event('ListPagination.onChange');

		this.onChange(this._view.render);
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
			this._onChange.trigger();
			this._onNext.trigger();
		}
	};

	ListPagination.prototype.prev = function ()
	{
		var page = this.getPage();

		if (page > 0)
		{
			this.setPage(page - 1);
			this._onChange.trigger();
			this._onPrev.trigger();
		}
	};

	ListPagination.prototype.setPage = function (page)
	{
		this.setParam('_page', page);
	};

	ListPagination.prototype.getPage = function ()
	{
		return this._params['_page'];
	};

	ListPagination.prototype.setCount = function (count)
	{
		if (count === this.getCount()) return;
		
		this.setParam('_count', count);
		this._view.render();
	};

	ListPagination.prototype.getCount = function ()
	{
		return this._params['_count'];
	};

	ListPagination.prototype.setTotal = function (total)
	{
		if (total === this._total) return;

		this._total = total;
		this._view.render();
	};

	ListPagination.prototype.getTotal = function ()
	{
		return this._total;
	};

	ListPagination.prototype.setParam = function (param, value)
	{
		this._params[param] = value;
		this._view.render();
	};

	ListPagination.prototype.getParams = function ()
	{
		return this._params;
	};


	this.ListPagination = ListPagination;
});