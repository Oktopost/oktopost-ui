namespace('OUI.Views.List', function (window) 
{
	var classify 	= window.Classy.classify;
	var foreach 	= window.Plankton.foreach;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;


	/**
	 * @class OUI.Views.List.ListItemsView
	 */
	function ListItemsView(listItems, container) 
	{
		classify(this);

		this._listItems = listItems;
		this._container = $(container);

		this._loadingClass 	= 'loading';
	}


	ListItemsView.prototype.getItemsWrapper = function ()
	{
		var container = this._container;
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
		this.getItemsWrapper().removeClass(this._loadingClass);
		
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

	ListItemsView.prototype.removeItems = function (ids)
	{
		foreach(ids, function (id) 
		{
			fadeRemove($('[data-id="' + id + '"]'));
		});
	};

	ListItemsView.prototype.setLoading = function ()
	{
		this.getItemsWrapper().addClass(this._loadingClass);
	};

	
	this.ListItemsView = ListItemsView;
});