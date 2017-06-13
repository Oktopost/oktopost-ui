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
	
	Box.prototype._debug = function () 
	{
		console.log(this.x(), this.y(), this.w(), this.h());	
	};
	
	Box.prototype._intersectHorizontal = function (x, w)
	{
		return !(this.x()+this.w() <= x || x+w <= this.x());
	};

	Box.prototype._intersectVertical = function (y, h)
	{
		return !(this.y()+this.h() <= y || y+h <= this.y());
	};
	
	Box.prototype._intersectHorizontalBorder = function (x, w)
	{
		return ((this.x() < x) && (this.x() + this.w() > x))
			|| (((this.x() + this.w()) > (x + w)) && (this.x() > x));
		// return !(this.x()+this.w() < x || x+w < this.x());
	};

	Box.prototype._intersectVerticalBorder = function (y, h)
	{
		return ((this.y() < y) && (this.y() + this.h() > y))
			|| ((this.y() + this.h() > y + h) && (this.y() > y));
		// return !(this.y()+this.h() < y || y+h < this.y());
	};
	
	Box.prototype._subtractHorizontal = function (x, w) 
	{
		if (x > this.x())
		{
			this._point.x = x;
		}
		
		if ((x + w) < (this.x() + this.w()))
		{
			this._size.x = x + w - this.x();
		}
	};
	
	Box.prototype._subtractVertical = function (y, h) 
	{
		if (y > this.y())
		{
			this._point.y = y;
		}
		
		if ((y + h) < (this.y() + this.h()))
		{
			this._size.y = y + h - this.y();
		}
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
		return this._intersectHorizontal(box.x(), box.w()) && this._intersectVertical(box.y(), box.h());
	};
	
	Box.prototype.intersectsBorder = function (box) 
	{
		return this._intersectHorizontalBorder(box.x(), box.w()) || this._intersectVerticalBorder(box.y(), box.h());
	};
	
	Box.prototype.subtractIntersect = function (box) 
	{
		this._subtractHorizontal(box.x(), box.w());
		this._subtractVertical(box.y(), box.h());
	};
	
	
	this.Box = Box;
});