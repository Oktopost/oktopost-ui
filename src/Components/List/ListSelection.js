namespace('OUI.Components.List', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListSelectionView 	= window.OUI.Views.List.ListSelectionView;

	var foreach 			= window.Plankton.foreach;
	var classify 			= window.Classy.classify;


	/**
	 * @class window.OUI.Components.List.ListSelection
	 */
	function ListSelection(itemsContainer, itemsSelector) 
	{
		classify(this);

		this._view 			= new ListSelectionView(this, itemsContainer, itemsSelector);

		this._onSelect 		= new Event('ListSelection.onSelect');
		this._onDeselect 	= new Event('ListSelection.onDeselect');

		this.onSelect(this._view.selectItem);
		this.onDeselect(this._view.deselectItem);

		this._selected		= [];
	};


	ListSelection.prototype._selectItem = function (itemId)
	{
		var index = this._selected.indexOf(itemId);

		if (index === -1) 
		{
			this._selected.push(itemId);
			this._onSelect.trigger(itemId);
		}

		this._view.selectItem(itemId);
	};

	ListSelection.prototype._deselectItem = function (itemId)
	{
		var index = this._selected.indexOf(itemId);

		if (index > -1) 
		{
			this._selected.splice(index, 1);
			this._onDeselect.trigger(itemId);
		}

		this._view.deselectItem(itemId);
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
		return this._selected;
	};


	this.ListSelection = ListSelection;
});