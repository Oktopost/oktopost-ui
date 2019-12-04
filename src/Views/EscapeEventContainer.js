namespace('OUI.Views', function (window)
{
	var classify = window.Classy.classify;
	
	
	var EscapeEventContainer = function()
	{
		classify(this);
		
		if (!is(window.OUI.Views.EscapeContainer))
			window.OUI.Views.EscapeContainer = [];
	};
	
	
	EscapeEventContainer.prototype.add = function (id)
	{
		window.OUI.Views.EscapeContainer.push(id);
	};
	
	EscapeEventContainer.prototype.isLastId = function (id)
	{
		return id === window.OUI.Views.EscapeContainer[window.OUI.Views.EscapeContainer.length - 1];
	};
	
	EscapeEventContainer.prototype.remove = function (currentId)
	{
		window.OUI.Views.EscapeContainer = window.OUI.Views.EscapeContainer.filter(function (id)
		{
			return id !== currentId
		});
	};
	
	EscapeEventContainer.prototype.isEmpty = function()
	{
		return window.OUI.Views.EscapeContainer.length === 0;
	};
	
	
	this.EscapeEventContainer = EscapeEventContainer;
});