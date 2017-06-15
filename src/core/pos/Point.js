namespace('OUI.core.pos', function () {
	'use strict';

	/**
	 * @class OUI.core.pos.Point
	 */
	var Point = function (x, y) 
	{	
		Classy.classify(this);
		
		this.x = x;
		this.y = y;
	};
	
	
	this.Point = Point;
});