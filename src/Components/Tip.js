namespace('OUI.Components', function (window) 
{
	var TipView 	= window.OUI.Views.TipView;

	var classify	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Tip
	 */
	function Tip(baseName, positionConfig)
	{
		classify(this);

		this._id 		= idGenerator(baseName);
		this._view 		= new TipView(this._id, baseName, positionConfig);

		this._view.onMouseEnter(this.add);
		this._view.onMouseOut(this.remove);
		this._view.onClick(this.remove);
	}


	Tip.prototype.getId = function ()
	{
		return this._id;
	};

	Tip.prototype.add = function (event)
	{
		this._view.show(event);
	};

	Tip.prototype.remove = function ()
	{
		this._view.remove();
	};


	this.Tip = Tip;
});