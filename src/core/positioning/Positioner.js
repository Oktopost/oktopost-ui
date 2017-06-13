namespace('OUI.core.positioning', function () {
	'use strict';

	var is = plankton.is;
	var Box = OUI.core.positioning.Box;
	var Point = OUI.core.positioning.Point;
	
	/**
	 * @class OUI.core.positioning.Positioner
	 */
	var Positioner = function (data) 
	{	
		Classy.classify(this);
		
		this.container = data.container;
		this.related = data.related;
		this.target = data.target;
		this.areas = data.areas;
		
		this.absolutePosition = null;
		this.relativePosition = null;
	};
	
	Positioner.prototype._transformTarget = function (area, initialX, initialY) 
	{
		var newX = area.box.x() + initialX;
		var newY = area.box.y() + initialY;
		
		return new Box(new Point(newX, newY), new Point(this.target.w(), this.target.h()));
	};
	
	Positioner.prototype._prepareArea = function (area) 
	{
		if (!area.box.intersect(this.container))
		{
			return false;
		}
		
		if (area.box.intersectsBorder(this.container))
		{
			area.box.subtractIntersect(this.container);
		}
		
		if (area.box.w() < this.target.w() || area.box.h() < this.target.h())
		{
			return false;
		}
		
		return true;
	};
		
	Positioner.prototype.tryPutTargetInArea = function (area) 
	{
		if (!this._prepareArea(area))
		{
			return false;
		}
		
		var target = this._transformTarget(area, area.initial.x, area.initial.y);
		
		if (target.intersectsBorder(area.box))
		{
			target = this._transformTarget(area, 0, 0);
			
			if (target.intersectsBorder(area.box))
			{
				return false;
			}
		}
		
		this.absolutePosition = new Point(target.x(), target.y());
		this.relativePosition = new Point(target.x() - this.related.x(), target.y() - this.related.y());
	};
		
	Positioner.prototype.getPosition = function (isAbsolute) 
	{
		isAbsolute = isAbsolute || false;
		
		if (is.empty(this.areas))
			return false;

		var index;
		
		for (index = 0; index < this.areas.length; ++index)
		{
			this.tryPutTargetInArea(this.areas[index]);	
		}
		
		if (isAbsolute)
		{
			return this.absolutePosition;
		}
		
		return this.relativePosition;
	};
	
	this.Positioner = Positioner;
});