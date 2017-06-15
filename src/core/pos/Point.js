namespace('OUI.core.pos', function (window)
{
	var classify = window.Classy.classify; 
	
	
	/**
	 * @class OUI.core.pos.Point
	 */
	function Point(x, y) 
	{	
		classify(this);
		
		this.x = x;
		this.y = y;
	}
	
	
	this.Point = Point;
});