namespace('OUI.Components', function (window) 
{
	var TourTipView 	= window.OUI.Views.TourTipView;
	var Event 			= window.Duct.Event;
	var classify		= window.Classy.classify;
	var idGenerator 	= window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.TourTip
	 */
	function TourTip(contents, attachTo, positionConfig, extraClass)
	{
		classify(this);

		this._id 		= idGenerator('tour-tip');

		this._view 		= new TourTipView(this._id, contents, attachTo, positionConfig, extraClass);

		this._onShow 	= new Event('TourTip.onShow');
		this._onRemove 	= new Event('TourTip.onRemove');

		this._view.onUnderlayClick(this.remove);
	}


	TourTip.prototype.show = function ()
	{
		this._view.show();
		this._onShow.trigger(this._id);
	};

	TourTip.prototype.remove = function ()
	{
		this._view.remove();
		this._onRemove.trigger(this._id);
	};

	TourTip.prototype.onShow = function (callback)
	{
		this._onShow.add(callback);
	};

	TourTip.prototype.onRemove = function (callback)
	{
		this._onRemove.add(callback);
	};



	this.TourTip = TourTip;
});