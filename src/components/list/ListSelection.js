namespace('OUI.components.list', function (window) 
{
	var Event 				= window.Duct.Event;
	var ListSelectionView 	= window.OUI.views.list.ListSelectionView;

	var array 				= window.Plankton.array;
	var classify 			= window.Classy.classify;


	/**
	 * @class OUI.components.list.ListSelection
	 */
	function ListSelection(itemsSelector) 
	{
		classify(this);

		this._view 			= new ListSelectionView(this, itemsSelector);

		this._onSelect 		= new Event('ListSelection.onSelect');
		this._onDeselect 	= new Event('ListSelection.onDeselect');

		this._selected		= [];
	};


	ListSelection.prototype._selectItem = function (itemId)
	{
		var index = this._selected.indexOf(itemId);

		if (index > -1) 
		{
			console.log('Item ' + itemId + ' already selected');
			return;
		}

		this._selected.push(itemId);
		this._onSelect.trigger(itemId);
	};

	ListSelection.prototype._deselectItem = function (itemId)
	{
		var index = this._selected.indexOf(itemId);

		if (index === -1) 
		{
			console.log('Item ' + itemId + ' not found');
			return;
		}

		this._selected.splice(index, 1);
		this._onDeselect.trigger(itemId);
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
		array.forEach(itemIds, this._selectItem);
	};

	ListSelection.prototype.deselect = function (itemIds)
	{
		array.forEach(itemIds, this._deselectItem);
	};

	ListSelection.prototype.getSelected = function ()
	{
		return this._selected;
	};


	this.ListSelection = ListSelection;
});