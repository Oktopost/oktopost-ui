namespace('OUI.Components.List', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListSelectionView 	= window.OUI.Views.List.ListSelectionView;

	var is 					= window.Plankton.is;
	var obj 				= window.Plankton.obj;
	var foreach 			= window.Plankton.foreach;
	var classify 			= window.Classy.classify;


	/**
	 * @class window.OUI.Components.List.ListSelection
	 */
	function ListSelection(itemsContainer, itemsSelector, selectAll) 
	{
		classify(this);

		this._view 			= new ListSelectionView(this, itemsContainer, itemsSelector, selectAll);

		this._onSelect 		= new Event('ListSelection.onSelect');
		this._onDeselect 	= new Event('ListSelection.onDeselect');

		this.onSelect(this._view.selectItem);
		this.onDeselect(this._view.deselectItem);

		this._selected		= {};
	};


	ListSelection.prototype._selectItem = function (itemId)
	{
		if (is.undefined(this._selected[itemId])) 
		{
			this._selected[itemId] = true;
			this._onSelect.trigger(itemId);
		}
	};

	ListSelection.prototype._deselectItem = function (itemId)
	{
		if (is(this._selected[itemId])) 
		{
			delete this._selected[itemId];
			this._onDeselect.trigger(itemId);
		}
	};


	ListSelection.prototype.onSelect = function (callback)
	{
		this._onSelect.add(callback);
	};

	ListSelection.prototype.onDeselect = function (callback)
	{
		this._onDeselect.add(callback);
	};

	ListSelection.prototype.select = function (itemIds)
	{
		foreach(itemIds, this._selectItem);
	};

	ListSelection.prototype.deselect = function (itemIds)
	{
		foreach(itemIds, this._deselectItem);
	};

	ListSelection.prototype.getSelected = function ()
	{
		return obj.keys(this._selected);
	};


	this.ListSelection = ListSelection;
});