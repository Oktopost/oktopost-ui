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
		if (is.defined(this._value) && !is.null(this._value))
		{
			return this._value;
		}
		
		return '';
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
		if (!$(this._el).hasClass("select2-hidden-accessible"))
		{
			this._el.val('');
		}
		else
		{
			this._el.select2('val', '');
		}
	};
	
	
	this.ListFilterView = ListFilterView;
});