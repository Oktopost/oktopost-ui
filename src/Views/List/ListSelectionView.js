namespace('OUI.Views.List', function (window) 
{
	var classify 	= window.Classy.classify;
	var array 		= window.Plankton.array;


	/**
	 * @class OUI.Views.List.ListSelectionView
	 */
	function ListSelectionView(selection, itemsSelector) 
	{
		classify(this);

		this._selection 	= selection;
		this._items 		= $(itemsSelector);

		this._bindEvents();
	};


	ListSelectionView.prototype._bindEvents = function ()
	{
		this._items.on('change', this._onChange);
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

	
	this.ListSelectionView = ListSelectionView;
});