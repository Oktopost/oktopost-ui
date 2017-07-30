namespace('OUI.components', function (window) 
{
	var TipView 	= window.OUI.views.TipView;

	var classify	= window.Classy.classify;
	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Tip
	 */
	function Tip(baseName, positionConfig)
	{
		classify(this);

		this._id 		= idGenerator(baseName);
		this._view 		= new TipView(this, baseName, positionConfig);

		this._view.bindHover();
	};


	Tip.prototype.getId = function ()
	{
		return this._id;
	};

	Tip.prototype.add = function ($element)
	{
		this._view.show($element);
	};

	Tip.prototype.remove = function ()
	{
		this._view.remove();
	};


	this.Tip = Tip;
});