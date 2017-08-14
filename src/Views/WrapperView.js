namespace('OUI.Views', function (window) 
{
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Views.WrapperView
	 */
	function WrapperView(wrapper, container, template) 
	{
		classify(this);

		this._wrapper 	= wrapper;
		this._container = $(container);
		this._template 	= template;
	};


	WrapperView.prototype.getContainer = function ()
	{
		return this._container;
	};

	WrapperView.prototype.render = function (params)
	{
		params = params || {};
		return this._container.empty().append(this._template.hbs(params));
	};


	this.WrapperView = WrapperView;
});