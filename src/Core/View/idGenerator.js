namespace('OUI.Core.View', function (window) 
{
	this.idGenerator = function (baseName)
	{
		return baseName + '-' + Math.random().toString(36).substr(2);
	};
});