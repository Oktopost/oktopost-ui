namespace('OUI.Views.List', function (window) 
{
	var classify = window.Classy.classify;


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

		this._bindEvents();
	};


	ListSelectionView.prototype._bindEvents = function ()
	{
		this._container.on('change', this._itemsSelector, this._onChange);
		this._selectAll.on('change', this._toggleSelectAll);
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

	ListSelectionView.prototype._onChange = function (e)
	{
		var checkbox 	= $(e.target);
		var checkboxId 	= $(e.target).attr('id');

		if (checkbox.is(':checked'))
		{
			this._selection.select([checkboxId]);
		}
		else
		{
			this._selection.deselect([checkboxId]);
		}
	};


	ListSelectionView.prototype.selectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').addClass(this._selectedClass);
		$('#' + itemId).prop('checked', true);
	};

	ListSelectionView.prototype.deselectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').removeClass(this._selectedClass);
		$('#' + itemId).prop('checked', false);
	};

	
	this.ListSelectionView = ListSelectionView;
});