namespace('OUI.core.pos', function (window) 
{
	var is 			= window.Plankton.is;
	var classify 	= window.Classy.classify; 
	var Box 		= window.OUI.core.pos.Box;
	var Point		= window.OUI.core.pos.Point;
	
	
	/**
	 * @class OUI.core.pos.Positioner
	 */
	var Positioner = function (data) 
	{	
		classify(this);
		
		this.container = data.container;
		this.related = data.related;
		this.target = data.target;
		this.areas = data.areas;
		
		this.absolutePosition = null;
		this.relativePosition = null;
	};
	
	
	Positioner.prototype._checkParams = function () 
	{	
		if (is.empty(this.areas))
			return false;
		
		if (!is.object(this.related))
			return false;
		
		if (!is.object(this.target))
			return false;
		
		return (is.object(this.container));
	};
	
	Positioner.prototype._transformTarget = function (box, initialX, initialY) 
	{
		initialX = initialX || 0;
		initialY = initialY || 0;
		
		var newX = box.x() + initialX;
		var newY = box.y() + initialY;
		
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
			var originalX = area.box.x();
			var originalY = area.box.y();
			
			area.box.intersect(this.container);

			this._subtractInitial(area, originalX, originalY);
		}
		
		return !(area.box.w() < this.target.w() || area.box.h() < this.target.h());
	};
	
	Positioner.prototype._subtractInitial = function (area, originalX, originalY) 
	{
		area.initial.x = area.initial.x + originalX - area.box.x();
		
		if (area.initial.x < 0)
		{
			area.initial.x = 0;
		}
		
		area.initial.y = area.initial.y + originalY - area.box.y();
		
		if (area.initial.y < 0)
		{
			area.initial.y = 0;
		}
	};
	
	Positioner.prototype._moveX = function (target, box) 
	{
		return -(target.x() + target.w() - box.x() - box.w());
	};
	
	Positioner.prototype._moveY = function (target, box) 
	{
		return -(target.y() + target.h() - box.y() - box.h());
	};
	
	Positioner.prototype._putInArea = function (box, moveX, moveY, area) 
	{
		var target = this._transformTarget(box, moveX, moveY);
	
		while (target.isCrossBorder(area.box))
		{
			target = this._putInArea(target, this._moveX(target, box), this._moveY(target, box), area);
			
			if (target.x() < 0 || target.y() < 0)
			{
				return false;
			}
		}
		
		return target;
	};
	
	Positioner.prototype._putInInitialPoint = function (area) 
	{
		var target = this._transformTarget(area.box, area.initial.x, area.initial.y);
		
		if (!target.isCrossBorder(area.box))
		{
			return target;
		}
		
		return false;
	};
	
	Positioner.prototype._tryPutTargetInArea = function (area, isInitial) 
	{
		if (!this._prepareArea(area))
		{
			return false;
		}
		
		var target = null;
		
		if (isInitial)
		{
			target = this._putInInitialPoint(area);
		}
		else
		{		
			target = this._putInArea(area.box, area.initial.x, area.initial.y, area);
		}

		
		if (!is.true(target))
		{
			return false;
		}
		
		this.absolutePosition = new Point(target.x(), target.y());
		this.relativePosition = new Point(target.x() - this.related.x(), target.y() - this.related.y());
		
		return true;
	};
	
	Positioner.prototype._load = function (isInitial) 
	{
		var index;
		
		for (index = 0; index < this.areas.length; ++index)
		{
			if (this._tryPutTargetInArea(this.areas[index], isInitial))
			{
				break;
			}
		}
		
		return this.areas[index];
	};
		
	
	Positioner.prototype.getPosition = function (isRelative) 
	{
		isRelative = isRelative || false;
		
		if (!this._checkParams())
		{
			return false;
		}
		
		var targetArea = this._load(true);
		
		if (is.null(this.absolutePosition))
		{
			targetArea = this._load(false);
		}
		
		if (is.null(this.absolutePosition))
		{
			console.log('Error: impossible to put target in a correct position');
			
			return {
				name: this.areas[0].name,
				coordinates: {
					x: this.areas[0].box.x(),
					y:  this.areas[0].box.y()
				}
			};
		}
		
		var x = this.absolutePosition.x;
		var y = this.absolutePosition.y;
		
		if (isRelative)
		{
			x = this.relativePosition.x;
			y = this.relativePosition.y;
		}
		
		return {
			name: targetArea.name,
			coordinates: {
				x: x,
				y: y
			}
		}
	};
	
	
	this.Positioner = Positioner;
});