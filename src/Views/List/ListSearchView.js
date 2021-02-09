namespace('OUI.Views.List', function (window) 
{
	var classify = window.Classy.classify;


	/**
	 * @class OUI.Views.List.ListSearchView
	 */
	function ListSearchView()
	{
		classify(this);
		
		this._itemsContainer 		= null;
		this._itemsWrapper			= null;
		this._nullstateContainer 	= null;
	}


	ListSearchView.prototype.setItemsContainer = function (container)
	{
		this._itemsContainer 	= $(container);
		this._itemsWrapper 		= this.getItemsWrapper();
	};

	ListSearchView.prototype.getItemsWrapper = function ()
	{
		var container = this._itemsContainer;
		return container.parent()[0].tagName === 'TABLE' ? container.parent() : container;
	};

	ListSearchView.prototype.setNullstate = function (container)
	{
		this._nullstateContainer = $(container);
	};

	ListSearchView.prototype.hideNullstate = function ()
	{
		this._itemsWrapper.removeClass('hidden');
		this._nullstateContainer.empty().addClass('hidden');
		this.hideLoading();
	};

	ListSearchView.prototype.showNullstate = function ()
	{
		this._itemsWrapper.addClass('hidden');
		this._nullstateContainer.removeClass('hidden');
		this.hideLoading();
	};
	
	ListSearchView.prototype.showLoading = function ()
	{
		this._nullstateContainer.addClass('loading');
	}
	
	ListSearchView.prototype.hideLoading = function ()
	{
		this._nullstateContainer.removeClass('loading');
	}
	
	this.ListSearchView = ListSearchView;
});