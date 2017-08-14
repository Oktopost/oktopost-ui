namespace('OUI.Components', function (window) 
{
	var Event 		= window.Duct.Event;
	var WrapperView = window.OUI.Views.WrapperView;

	var classify	= window.Classy.classify;


	/**
	 * @class OUI.Components.Wrapper
	 */
	function Wrapper(container, template)
	{
		classify(this);

		this._view 		= new WrapperView(this, container, template);
		this._onRender 	= new Event('Wrapper.onRender');
	};


	Wrapper.prototype.getContainer = function ()
	{
		return this._view.getContainer();
	};

	Wrapper.prototype.onRender = function (callback)
	{
		this._onRender.add(callback);
	};

	Wrapper.prototype.render = function (params)
	{
		this._view.render(params);
		this._onRender.trigger();
	};


	this.Wrapper = Wrapper;
});