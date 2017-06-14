namespace('OUI.core.positioning', function () 
{
	'use strict';
	
	
	var is 		= plankton.is;
	var Box 	= OUI.core.positioning.Box;
	var Point	= OUI.core.positioning.Point;
	
	
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
		initialX = initialX || 0;
		initialY = initialY || 0;
		
		var newX = area.box.x() + initialX;
		var newY = area.box.y() + initialY;
		
		return new Box(new Point(newX, newY), new Point(this.target.w(), this.target.h()));
	};
	
	Positioner.prototype._prepareArea = function (area) 
	{
		if (!area.box.isIntersect(this.container))
		{
			return false;
		}
		
		if (area.box.isCrossBorder(this.container))
		{
			area.box.intersect(this.container);
		}
		
		return !(area.box.w() < this.target.w() || area.box.h() < this.target.h());
	};
	
	Positioner.prototype._subtractContainer = function (point) 
	{
		return new Point(point.x - this.container.x(), point.y - this.container.y());
	};
	
	
	Positioner.prototype.tryPutTargetInArea = function (area) 
	{
		if (!this._prepareArea(area))
		{
			return false;
		}
		
		var target = this._transformTarget(area, area.initial.x, area.initial.y);
		
		if (target.isCrossBorder(area.box))
		{
			target = this._transformTarget(area);
			
			if (target.isCrossBorder(area.box))
			{
				return false;
			}
		}
		
		this.absolutePosition = new Point(target.x(), target.y());
		this.relativePosition = new Point(target.x() - this.related.x(), target.y() - this.related.y());
		
		return true;
	};
		
	Positioner.prototype.getPosition = function (isAbsolute) 
	{
		isAbsolute = isAbsolute || false;
		
		if (is.empty(this.areas))
			return false;

		var index;
		
		for (index = 0; index < this.areas.length; ++index)
		{
			if (this.tryPutTargetInArea(this.areas[index]))
			{
				break;
			}
		}
		
		if (is.null(this.absolutePosition))
		{
			return null;
		}
		
		if (isAbsolute)
		{
			return this._subtractContainer(this.absolutePosition);
		}
		
		return this._subtractContainer(this.relativePosition);
	};
	
	
	this.Positioner = Positioner;
});