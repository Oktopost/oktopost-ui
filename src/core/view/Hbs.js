namespace('OUI.core.view', function (window) {
	'use strict';


	/**
	 * @class OUI.core.view.Hbs
	 */
	function Hbs()
	{
		Classy.classify(this);
	};


	Hbs.prototype.get = function (name, options)
	{
		options = options || {};

		return window.Handlebars['templates'][name].hbs(options);
	};
	

	this.Hbs = Hbs;
});