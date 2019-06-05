namespace('OUI.Views.List', function (window)
{
	var classify 	= window.Classy.classify;
	var is 			= window.Plankton.is;
	var foreach 	= window.Plankton.foreach;
	
	
	/**
	 * @class OUI.Views.List.ListSelectionView
	 */
	function ListSelectionView(selection, itemsContainer, itemsSelector, selectAll)
	{
		classify(this);
		
		this._selection 	= selection;
		
		this._container 	= $(itemsContainer);
		this._itemsSelector = itemsSelector;
		this._selectAll 	= $(selectAll);
		this._selectedClass = 'selected';
		this._lastSelected  = null;
		
		this._bindEvents();
	}
	
	
	ListSelectionView.prototype._bindEvents = function ()
	{
		this._selectAll.on('change', this._toggleSelectAll);
		this._container.on('click', this._itemsSelector, this._onClick);
	};
	
	ListSelectionView.prototype._toggleSelectAll = function (e)
	{
		var checkbox 	= $(e.target);
		var items 		= this._container.find(this._itemsSelector);
		var ids 		= [];
		
		items.each(function ()
		{
			ids.push($(this).attr('id'));
		});
		
		if (checkbox.is(':checked'))
		{
			this._selection.select(ids);
		}
		else
		{
			this._selection.deselect(ids);
		}
	};
	
	ListSelectionView.prototype._updateSelectAll = function ()
	{
		var items 		= this._container.find(this._itemsSelector);
		var selected 	= this._container.find(this._itemsSelector + ':checked') || [];
		
		if (items.length === selected.length)
		{
			this._selectAll.prop('checked', true);
			this._selectAll.prop("indeterminate", false);
		}
		else if (selected.length === 0)
		{
			this._selectAll.prop('checked', false);
			this._selectAll.prop("indeterminate", false);
		}
		else
		{
			this._selectAll.prop('checked', false);
			this._selectAll.prop("indeterminate", true);
		}
	};
	
	ListSelectionView.prototype._shiftSelect = function (checkboxId, isChecked)
	{
		if (!is(this._lastSelected))
			return;
		
		var itemIds = this._container.find(this._itemsSelector).toArray().map(function (item)
		{
			return item.id;
		});
		
		var fromItem = (itemIds.indexOf(checkboxId) < itemIds.indexOf(this._lastSelected)) ? itemIds.indexOf(checkboxId) : itemIds.indexOf(this._lastSelected);
		var toItem = (itemIds.indexOf(checkboxId) < itemIds.indexOf(this._lastSelected)) ? itemIds.indexOf(this._lastSelected) : itemIds.indexOf(checkboxId);
		
		var toSelect = itemIds.slice(fromItem, toItem + 1);
		
		foreach(toSelect, this, function (item)
		{
			this.selectItem(item.id);
		})
		
		if (isChecked)
		{
			this._selection.select(toSelect);
		}
		else
		{
			this._selection.deselect(toSelect);
		}
	};
	
	ListSelectionView.prototype._onClick = function (e)
	{
		var checkbox 	= (e.target.tagName.toLowerCase() === 'input') ? $(e.target) : $(e.target).closest('label').find('input');
		var checkboxId 	= checkbox.attr('id');
		
		if (checkbox.is(':checked'))
		{
			this._selection.select([checkboxId]);
		}
		else
		{
			this._selection.deselect([checkboxId]);
		}
		
		if (e.shiftKey)
		{
			this._shiftSelect(checkboxId, checkbox.is(':checked'))
		}
		
		this._lastSelected = checkboxId;
	};
	
	
	ListSelectionView.prototype.selectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').addClass(this._selectedClass);
		$('#' + itemId).prop('checked', true);
		
		this._updateSelectAll();
	};
	
	ListSelectionView.prototype.deselectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').removeClass(this._selectedClass);
		$('#' + itemId).prop('checked', false);
		
		this._updateSelectAll();
	};
	
	
	this.ListSelectionView = ListSelectionView;
});