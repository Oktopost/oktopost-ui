namespace('OUI.components', function (window) 
{
	var TipView 	= window.OUI.views.TipView;

	var classify	= window.Classy.classify;
	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Tip
	 */
	function Tip(baseName)
	{
		classify(this);

		this._id 		= idGenerator(baseName);
		this._tipView 	= new TipView(this, baseName);

		this._tipView.bindHover();
	};


	Tip.prototype.getId = function ()
	{
		return this._id;
	};

	Tip.prototype.add = function ($element)
	{
		this._tipView.show($element);
	};

	Tip.prototype.remove = function ()
	{
		this._tipView.remove();
	};


	this.Tip = Tip;
});