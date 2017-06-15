namespace('OUI.core.pos.prepared', function (window) 
{
	var is 				= window.Plankton.is;
	var classify		= window.Classy.classify;
	var Point 			= window.OUI.core.pos.Point;
	var Box 			= window.OUI.core.pos.Box;
	var Positioner		= window.OUI.core.pos.Positioner;
	var TargetSide 		= window.OUI.core.pos.enum.TargetSide;
	var TargetPosition 	= window.OUI.core.pos.enum.TargetPosition;
	
	
	var defaults = {
		container: window,
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0,
		isRelative: false,
		initialSide: null,
		initialPosition: null
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.BasePreparedWithOffsets
	 */
	function BasePreparedWithOffsets(options, defaultsOptions)
	{
		classify(this);
		
		var mergedDefaults = $.extend(true, {}, defaults, defaultsOptions);
		
		this.settings = $.extend(true, {}, mergedDefaults, options);
		
		this.settings.container = this._prepareElement(this.settings.container);
		this.settings.relatedElement = this._prepareElement(this.settings.relatedElement);
		this.settings.targetElement = this._prepareElement(this.settings.targetElement);
	}
	
	
	BasePreparedWithOffsets.prototype._getAvailableSides = function () 
	{
		return [];
	};
	
	BasePreparedWithOffsets.prototype._prepareElement = function (el) 
	{
		if (el instanceof HTMLElement)
		{
			return $(el);
		}
		
		return el;
	};
	
	BasePreparedWithOffsets.prototype._settingsIsValid = function () 
	{		
		return (is.object(this.settings.container) || $.isWindow(this.settings.container)) 
			&& (is.object(this.settings.relatedElement))
			&& (is.object(this.settings.targetElement));
	};
	
	BasePreparedWithOffsets.prototype._isNeedToSubtractContainer = function () 
	{
		if ($.isWindow(this.settings.container))
		{
			return false;
		}
		
		return (this.settings.container.css('position') === 'relative');
	};
	
	BasePreparedWithOffsets.prototype._subtractContainer = function (point) 
	{
		var container = this._getContainerBox();
		
		return new Point(point.x - container.x(), point.y - container.y());
	};
		
	BasePreparedWithOffsets.prototype._applyOffset = function (position, offset) 
	{
		var leftWithOffset = position.left - offset;
		var topWithOffset = position.top - offset;

		return {
			left: leftWithOffset > 0 ? leftWithOffset : 0,
			top: topWithOffset > 0 ? topWithOffset : 0
		};
	};
		
	BasePreparedWithOffsets.prototype.getPositionWithOffset = function (el, offset) 
	{
		var position = {left: 0, top: 0};
		
		if (!$.isWindow(el))
		{
			position = el.offset();	
		}
		
		return this._applyOffset(position, offset);
	};
	
	BasePreparedWithOffsets.prototype._getSizeWithOffset = function (el, offset, top, left) 
	{
		if ($.isWindow(el))
		{
			el = $(el);
		}
		
		xOffsetModifier = 1;
		
		if (left > offset)
		{
			xOffsetModifier = 2;
		}
		
		yOffsetModifier = 1;
		
		if (top > offset)
		{
			yOffsetModifier = 2;
		}
		
		return {
			width: el.width() + offset * xOffsetModifier, 
			height: el.height() + offset * yOffsetModifier
		};
	};
	
	BasePreparedWithOffsets.prototype._getElementBox = function (el, offset) 
	{
		offset = offset || 0;
		
		if (el instanceof HTMLElement)
		{
			el = $(el);
		}
		
		var position = this.getPositionWithOffset(el, offset);

		var size = this._getSizeWithOffset(el, offset, position.top, position.left);
		
		return this._prepareBox(position.left, position.top, size.width, size.height);
	};
	
	BasePreparedWithOffsets.prototype._preparePoint = function (x, y) 
	{
		return new Point(x, y);	
	};
	
	BasePreparedWithOffsets.prototype._prepareBox = function(x, y, w, h)
	{
		var point = this._preparePoint(x, y);
		var size = this._preparePoint(w, h);
		
		return new Box(point, size);
	};
	
	BasePreparedWithOffsets.prototype._getContainerBox = function (withOffsets) 
	{
		if (!withOffsets)
		{
			return this._getElementBox(this.settings.container);
		}
		
		if (this.settings.containerOffset > 0)
		{
			this.settings.containerOffset = this.settings.containerOffset * -1;
		}
		
		return this._getElementBox(this.settings.container, this.settings.containerOffset);
	};
	
	BasePreparedWithOffsets.prototype._getRelatedBox = function () 
	{
		return this._getElementBox(this.settings.relatedElement, this.settings.relatedOffset);
	};
	
	BasePreparedWithOffsets.prototype._getTargetBox = function () 
	{
		return this._getElementBox(this.settings.targetElement);
	};
	
	BasePreparedWithOffsets.prototype._getCenterPoint = function (targetParam, relatedParam) 
	{
		return targetParam + (relatedParam - targetParam) / 2;
	};
	
	BasePreparedWithOffsets.prototype._verticalToHorizontal = function () 
	{
		if (this.settings.initialPosition === TargetPosition.top)
		{
			this.settings.initialPosition = TargetPosition.left;
		}
		
		if (this.settings.initialPosition === TargetPosition.bottom)
		{
			this.settings.initialPosition = TargetPosition.right;
		}
	};
	
	BasePreparedWithOffsets.prototype._horizontalToVertical = function () 
	{
		if (this.settings.initialPosition === TargetPosition.left)
		{
			this.settings.initialPosition = TargetPosition.top;
		}
		
		if (this.settings.initialPosition === TargetPosition.right)
		{
			this.settings.initialPosition = TargetPosition.bottom;
		}
	};
	
	BasePreparedWithOffsets.prototype._normalizeIntitalPosition = function (isVerticalSide) 
	{
		if (isVerticalSide)
		{
			return this._horizontalToVertical();
		}
		
		return this._verticalToHorizontal();
	};
	
	BasePreparedWithOffsets.prototype._getInitialPosition = function (target, related, isVerticalSide) 
	{
		this._normalizeIntitalPosition(isVerticalSide);
		
		switch (this.settings.initialPosition)
		{
			case TargetPosition.left:
				return this._preparePoint(target.w() + this.settings.relatedOffset, 0);
				
			case TargetPosition.right:
				return this._preparePoint(related.w() - this.settings.relatedOffset, 0);
				
			case TargetPosition.top:
				return this._preparePoint(0, target.h() + this.settings.relatedOffset);
				
			case TargetPosition.bottom:
				return this._preparePoint(0, related.h() - this.settings.relatedOffset);
				
			case TargetPosition.center:
				if (isVerticalSide)
				{
					return this._preparePoint(0, this._getCenterPoint(target.h(), related.h()));
				}
				else
				{
					return this._preparePoint(this._getCenterPoint(target.w(), related.w()), 0);
				}
		}
	};
	
	BasePreparedWithOffsets.prototype._getHorizontalSide = function (relatedBox, targetBox, direction) 
	{
		if (direction === 1)
		{
			var y = relatedBox.y() + relatedBox.h() +  this.settings.targetOffset;
		}
		else
		{
			y = relatedBox.y() - targetBox.h() -  this.settings.targetOffset;
		}

		var x = relatedBox.x() - targetBox.w();

		var h = targetBox.h();
		var w = relatedBox.w() + (targetBox.w() * 2);

		return {
			box: this._prepareBox(x, y, w, h),
			initial: this._getInitialPosition(targetBox, relatedBox, false)
		}
	};

	BasePreparedWithOffsets.prototype._getVerticalSide = function (relatedBox, targetBox, direction) 
	{
		if (direction === 1)
		{
			var x = relatedBox.x() + relatedBox.w() +  this.settings.targetOffset;
		}
		else
		{
			x = relatedBox.x() - targetBox.w() -  this.settings.targetOffset;
		}

		var y = relatedBox.y() - targetBox.h();

		var w = targetBox.w();
		var h = relatedBox.h() + (targetBox.h() * 2);

		return {
			box: this._prepareBox(x, y, w, h),
			initial: this._getInitialPosition(targetBox, relatedBox, true)
		}
	};
		
	BasePreparedWithOffsets.prototype._getSide = function (relatedBox, targetBox, side) 
	{
		if (this._getAvailableSides().indexOf(side) === -1)
		{
			return null;
		}
		
		switch (side)
		{
			case TargetSide.top:
				return this._getHorizontalSide(relatedBox, targetBox, -1);
				
			case TargetSide.bottom:
				return this._getHorizontalSide(relatedBox, targetBox, 1);
				
			case TargetSide.right:
				return this._getVerticalSide(relatedBox, targetBox, 1);
				
			case TargetSide.left:
				return this	._getVerticalSide(relatedBox, targetBox, -1);
				
			default:
				return null;
		}
	};

	BasePreparedWithOffsets.prototype._getAreas = function (relatedBox, targetBox) 
	{
		var areas = [];
		
		var defaultArea = this._getSide(relatedBox, targetBox, this.settings.initialSide);
		
		if (!is.null(defaultArea))
		{
			areas.push(defaultArea);
		}
		
		var availableSides = this._getAvailableSides();
		
		var index;
		
		for (index = 0; index < availableSides.length; ++index)
		{
			if (availableSides[index] === this.settings.initialSide)
			{
				continue;
			}
			
			var side = this._getSide(relatedBox, targetBox, availableSides[index]);
			
			if (!is.null(side))
			{
				areas.push(side);
			}
		}
		
		
		return areas;
	};	
	
	BasePreparedWithOffsets.prototype._getData = function () 
	{
		if (!this._settingsIsValid() || is.empty(this._getAvailableSides()))
		{
			return {};
		}
		
		var containerBox = this._getContainerBox(true);
		var relatedBox = this._getRelatedBox();
		var targetBox = this._getTargetBox();
		
				
		return {
			container: containerBox,
			related: relatedBox,
			target: targetBox,
			areas : this._getAreas(relatedBox, targetBox)
		}
	};
	
	BasePreparedWithOffsets.prototype.getPosition = function () 
	{
		var data = this._getData();
		
		if (is.object.empty(data))
		{
			return false;
		}
		
		var positioner = new Positioner(data);

		var position = positioner.getPosition(this.settings.isRelative);
		
		if (is.object(position) && this._isNeedToSubtractContainer())
		{
			position = this._subtractContainer(position);
		}
		
		return position;
	};
	

	this.BasePreparedWithOffsets = BasePreparedWithOffsets;
});