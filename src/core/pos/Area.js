namespace('OUI.core.pos', function (window)
{
	var classify = window.Classy.classify; 
	
	
	/**
	 * @class OUI.core.pos.Area
	 */
	function Area(box, initial, name) 
	{	
		classify(this);
		
		/** @type {OUI.core.pos.Box} */
		this.box = box;
		
		this.initial = initial;
		this.name = name;
	}
	
	
	this.Area = Area;
});