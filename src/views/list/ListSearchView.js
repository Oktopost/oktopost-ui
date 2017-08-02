namespace('OUI.views.list', function (window) 
{
	var classify = window.Classy.classify;


	/**
	 * @class OUI.views.list.ListSearchView
	 */
	function ListSearchView(search, container)
	{
		classify(this);
		
		this._itemsContainer 		= $(container);
		this._itemsWrapper			= this.getItemsWrapper();
		this._nullstateContainer 	= null;
	}


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
	};

	ListSearchView.prototype.showNullstate = function ()
	{
		this._itemsWrapper.addClass('hidden');
		this._nullstateContainer.removeClass('hidden');
	};

	
	this.ListSearchView = ListSearchView;
});