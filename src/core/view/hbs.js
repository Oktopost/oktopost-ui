namespace('OUI.core.view', function (window) 
{
	this.hbs = function (name, options)
	{
		options = options || {};

		return window.OUI.templates[name].hbs(options);
	};
});