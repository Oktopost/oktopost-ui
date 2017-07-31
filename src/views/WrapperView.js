namespace('OUI.views', function (window) 
{
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.views.WrapperView
	 */
	function WrapperView(wrapper, container, template) 
	{
		classify(this);

		this._wrapper 	= wrapper;
		this._container = $(container);
		this._template 	= template;
	};


	WrapperView.prototype.render = function (params)
	{
		params = params || {};
		return this._container.empty().append(this._template.hbs(params));
	};


	this.WrapperView = WrapperView;
});