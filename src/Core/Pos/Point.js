namespace('OUI.Core.Pos', function (window)
{
	var classify = window.Classy.classify; 
	
	
	/**
	 * @class OUI.Core.Pos.Point
	 */
	function Point(x, y) 
	{	
		classify(this);
		
		this.x = x;
		this.y = y;
	}
	
	
	this.Point = Point;
});