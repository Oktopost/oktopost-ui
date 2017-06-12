namespace('OktoUI.core.positioning', function () {
	'use strict';

	
	/**
	 * @class OktoUI.core.positioning.Box
	 */
	var Box = function (point, size) 
	{
		/** @type {OktoUI.core.positioning.Point} */
		this._point = point;

		/** @type {OktoUI.core.positioning.Point} */
		this._size = size;


		this._intersectHorizontal = function (x, w)
		{
			return !(this.x()+this.w() < x || x+w < this.x());
		};

		this._intersectVertical = function (y, h)
		{
			return !(this.y()+this.h() < y || y+h < this.y());
		};

		
		this.x = function () 
		{
			return this._point.x;	
		};

		this.y = function () 
		{
			return this._point.y;	
		};

		this.w = function () 
		{
			return this._size.x;	
		};
		
		this.h = function () 
		{
			return this._size.y;	
		};
	};	
	
	Box.prototype.intersect = function (box) 
	{
		return this._intersectHorizontal(box.x(), box.w()) && this._intersectVertical(box.y(), box.h());
	};
	
	
	this.Box = Box;
});