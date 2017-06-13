namespace('OUI.core.positioning', function () {
	'use strict';

	/**
	 * @class OUI.core.positioning.Point
	 */
	var Point = function (x, y) 
	{	
		Classy.classify(this);
		
		this.x = x;
		this.y = y;
	};
	
	
	this.Point = Point;
});