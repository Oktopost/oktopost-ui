namespace('OUI.Views.List', function (window)
{
	var is			= window.Plankton.is;
	var classify	= window.Classy.classify;
	
	
	/**
	 * @class window.OUI.Views.List.ListFilterView
	 */
	function ListFilterView(element, name, value)
	{
		classify(this);
		
		this._el 	= is.object(element) ? element : $(element);
		this._name 	= name;
		this._value = value;
		
		this._el.val(value);
		
		var self = this;
		
		this._el.on('change', function ()
		{
			self._value = $(this).val();
		});
	}
	
	
	ListFilterView.prototype.value = function ()
	{
		return this._value;
	};
	
	ListFilterView.prototype.name = function ()
	{
		return this._name;	
	};
	
	ListFilterView.prototype.isActive = function ()
	{
		return is.string.notEmpty(this._value);	
	};
	
	ListFilterView.prototype.reset = function ()
	{
		this._el.val('');	
	};
	
	
	this.ListFilterView = ListFilterView;
});