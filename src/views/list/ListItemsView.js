namespace('OUI.views.list', function (window) 
{
	var classify 	= window.Classy.classify;
	var foreach 	= window.Plankton.foreach;


	/**
	 * @class OUI.views.list.ListItemsView
	 */
	function ListItemsView(listItems, container) 
	{
		classify(this);

		this._listItems = listItems;
		this._container = $(container);

		this._loadingClass = 'loading';
	}


	ListItemsView.prototype.getItemsWrapper = function ()
	{
		var container = this._itemsContainer;
		return container.parent()[0].tagName === 'TABLE' ? container.parent() : container;
	};

	ListItemsView.prototype.getContainer = function ()
	{
		return this._container;
	};

	ListItemsView.prototype.render = function (items, template)
	{
		var container = this._container;

		container.empty();
		container.removeClass(this._loadingClass);
		
		foreach(items, function (item) 
		{
			container.append(template.hbs(item));
		});
	};

	ListItemsView.prototype.highlightTerm = function (term)
	{
		if (term.length)
		{
			this._container.highlight(term);
		}
		else
		{
			this._container.unhighlight();
		}
	};

	ListItemsView.prototype.setLoading = function ()
	{
		this.getItemsWrapper().addClass(this._loadingClass);
	};

	
	this.ListItemsView = ListItemsView;
});