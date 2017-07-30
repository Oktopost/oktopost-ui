namespace('OUI.views.list', function (window) 
{
	var classify 	= window.Classy.classify;
	var array 		= window.Plankton.array;


	/**
	 * @class OUI.views.list.ListItemsView
	 */
	function ListItemsView(listItems, $container) 
	{
		classify(this);

		this._listItems = listItems;
		this._container = $container;
	};


	ListItemsView.prototype.getContainer = function ()
	{
		return this._container;
	};

	ListItemsView.prototype.renderHbs = function (template, items)
	{
		this._container.empty();
		
		array.forEach(items, function (item) 
		{
			this._container.append(template.hbs(item));
		});
	};

	
	this.ListItemsView = ListItemsView;
});