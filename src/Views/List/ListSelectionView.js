namespace('OUI.Views.List', function (window) 
{
	var classify 	= window.Classy.classify;
	var array 		= window.Plankton.array;


	/**
	 * @class OUI.Views.List.ListSelectionView
	 */
	function ListSelectionView(selection, itemsContainer, itemsSelector) 
	{
		classify(this);

		this._selection 	= selection;
		
		this._container 	= $(itemsContainer);
		this._itemsSelector = itemsSelector;
		this._selectedClass = 'selected';

		this._bindEvents();
	};


	ListSelectionView.prototype._bindEvents = function ()
	{
		this._container.on('change', this._itemsSelector, this._onChange);
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
	};

	ListSelectionView.prototype.deselectItem = function (itemId)
	{
		$('[data-id="' + itemId + '"]').removeClass(this._selectedClass);
	};

	
	this.ListSelectionView = ListSelectionView;
});