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
	};


	ListItemsView.prototype.getContainer = function ()
	{
		return this._container;
	};

	ListItemsView.prototype.render = function (template, items)
	{
		this._container.empty();
		
		foreach(items, function (item) 
		{
			this._container.append(template.hbs(item));
		});
	};

	
	this.ListItemsView = ListItemsView;
});