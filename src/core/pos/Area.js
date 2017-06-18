namespace('OUI.core.pos', function (window)
{
	var classify = window.Classy.classify; 
	
	
	/**
	 * @class OUI.core.pos.Area
	 */
	function Area(box, initial, areaName, positionName) 
	{	
		classify(this);
		
		/** @type {OUI.core.pos.Box} */
		this.box = box;
		
		this.initial = initial;
		this.areaName = areaName;
		this.positionName = positionName;
	}
	
	
	Area.prototype.getName = function () 
	{
		return this.areaName + '-' + this.positionName;	
	};
	
	
	this.Area = Area;
});