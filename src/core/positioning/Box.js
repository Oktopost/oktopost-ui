namespace('OUI.core.positioning', function () {
	'use strict';

	
	/**
	 * @class OUI.core.positioning.Box
	 */
	var Box = function (point, size) 
	{
		Classy.classify(this);
		
		/** @type {OUI.core.positioning.Point} */
		this._point = point;

		/** @type {OUI.core.positioning.Point} */
		this._size = size;
	};	
	
	Box.prototype._intersectHorizontal = function (x, w)
		{
			return !(this.x()+this.w() < x || x+w < this.x());
		};

	Box.prototype._intersectVertical = function (y, h)
		{
			return !(this.y()+this.h() < y || y+h < this.y());
		};
		
	Box.prototype.x = function ()
		{
			return this._point.x;	
		};

	Box.prototype.y = function ()
		{
			return this._point.y;	
		};

	Box.prototype.w = function ()
		{
			return this._size.x;	
		};
		
	Box.prototype.h = function ()
		{
			return this._size.y;	
		};
	
	Box.prototype.intersect = function (box) 
	{
		return this._intersectHorizontal(box.x(), box.w()) || this._intersectVertical(box.y(), box.h());
	};
	
	
	this.Box = Box;
});