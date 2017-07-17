namespace('OUI.core.pos', function (window)
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify; 
	
	
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
		var name = this.areaName;
		
		if (is.string(this.positionName) && this.positionName.length > 0)
		{
			name = name + '-' + this.positionName;
		}
		
		return name;	
	};
	
	
	this.Area = Area;
});