namespace('OUI.Core.Pos.Prepared', function (window) 
{
	var is 				= window.Plankton.is;
	var classify		= window.Classy.classify;
	var Point 			= window.OUI.Core.Pos.Point;
	var Box 			= window.OUI.Core.Pos.Box;
	var Area			= window.OUI.Core.Pos.Area;
	var Positioner		= window.OUI.Core.Pos.Positioner;
	var TargetSide 		= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 	= window.OUI.Core.Pos.Enum.TargetPosition;
	
	
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
	 * @class OUI.Core.Pos.Prepared.BasePreparedWithOffsets
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
	
	
	BasePreparedWithOffsets.prototype._isSVG = function (el)
	{
		return (el instanceof SVGElement);
	};
	
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
			&& (is.object(this.settings.relatedElement) || (this._isSVG(this.settings.relatedElement)))
			&& (is.object(this.settings.targetElement));
	};
	
	BasePreparedWithOffsets.prototype._isNeedToSubtractContainer = function () 
	{
		if ($.isWindow(this.settings.container) || this.settings.container.is(document))
		{
			return false;
		}
		
		return (this.settings.container.css('position') === 'relative');
	};
	
	BasePreparedWithOffsets.prototype._subtractContainer = function (position) 
	{
		var container = this._getContainerBox(false);

		position.coordinates.x = position.coordinates.x - container.x();
		position.coordinates.y = position.coordinates.y - container.y();
		
		return position;
	};
		
	BasePreparedWithOffsets.prototype._applyOffset = function (position, offset, canOffsetInside) 
	{
		var leftWithOffset = position.left - offset;
		var topWithOffset = position.top - offset;
		
		return {
			left: leftWithOffset >= 0 ? leftWithOffset : canOffsetInside ? leftWithOffset * -1 : 0,
			top: topWithOffset >= 0 ? topWithOffset :  canOffsetInside ? topWithOffset * -1 : 0
		};
	};
		
	BasePreparedWithOffsets.prototype.getPositionWithOffset = function (el, offset, canOffsetInside) 
	{
		var position = {left: 0, top: 0};
		
		if (!$.isWindow(el) && !this._isSVG(el) && !el.is(document))
		{
			position = el.offset();	
		}
		
		if ($.isWindow(el))
		{
			position = { left: $(el).scrollLeft(), top: $(el).scrollTop() }
		}
		
		if (this._isSVG(el))
		{
			position = $(el).offset();
		}

		return this._applyOffset(position, offset, canOffsetInside);
	};
	
	BasePreparedWithOffsets.prototype._getSizeWithOffset = function (el, offset, top, left) 
	{
		if ($.isWindow(el))
		{
			el = $(el);
		}
		
		var xOffsetModifier = 1;
		
		if (left >= offset && left >= offset * -1)
		{
			xOffsetModifier = 2;
		}

		var yOffsetModifier = 1;
		
		if (top >= offset && top >= offset * -1)
		{
			yOffsetModifier = 2;
		}

		if (!this._isSVG(el))
		{
			var width = el.outerWidth();
			var height = el.outerHeight();
		}
		else 
		{
			var rect = el.getBoundingClientRect();
			
			var width = rect.right - rect.left;
			var height = rect.bottom - rect.top;
		}
		
		if ($.isWindow(el))
		{
			var width = width + el.scrollLeft();
			var height = height + el.scrollTop();
		}
		
		return {
			width: width + offset * xOffsetModifier, 
			height: height + offset * yOffsetModifier
		};
	};
	
	BasePreparedWithOffsets.prototype._getElementBox = function (el, offset, canOffsetInside) 
	{
		offset = offset || 0;
		canOffsetInside = canOffsetInside || false;
		
		if (el instanceof HTMLElement)
		{
			el = $(el);
		}
		
		var position = this.getPositionWithOffset(el, offset, canOffsetInside);

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
			return this._getElementBox(this.settings.container, 0, true);
		}
		
		if (this.settings.containerOffset > 0)
		{
			this.settings.containerOffset = this.settings.containerOffset * -1;
		}
		
		return this._getElementBox(this.settings.container, this.settings.containerOffset, true);
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
	
	BasePreparedWithOffsets.prototype._getHorizontalSide = function (relatedBox, targetBox, side) 
	{
		if (side === TargetSide.bottom)
		{
			var y = relatedBox.y() + relatedBox.h() + this.settings.targetOffset;
		}
		else
		{
			y = relatedBox.y() - targetBox.h() - this.settings.targetOffset;
		}

		var x = relatedBox.x() - targetBox.w();

		var h = targetBox.h();
		var w = relatedBox.w() + (targetBox.w() * 2);

		var box = this._prepareBox(x, y, w, h);
		var initial = this._getInitialPosition(targetBox, relatedBox, false);
		var areaName = side;
		var positionName = this.settings.initialPosition;
		
		return new Area(box, initial, areaName, positionName);
	};

	BasePreparedWithOffsets.prototype._getVerticalSide = function (relatedBox, targetBox, side) 
	{
		if (side === TargetSide.right)
		{
			var x = relatedBox.x() + relatedBox.w() + this.settings.targetOffset;
		}
		else
		{
			x = relatedBox.x() - targetBox.w() - this.settings.targetOffset;
		}

		var y = relatedBox.y() - targetBox.h();

		var w = targetBox.w();
		var h = relatedBox.h() + (targetBox.h() * 2);

		var box = this._prepareBox(x, y, w, h);
		var initial = this._getInitialPosition(targetBox, relatedBox, true);
		var areaName = side;
		var positionName = this.settings.initialPosition;
		
		return new Area(box, initial, areaName, positionName);
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
				return this._getHorizontalSide(relatedBox, targetBox, TargetSide.top);
				
			case TargetSide.bottom:
				return this._getHorizontalSide(relatedBox, targetBox, TargetSide.bottom);
				
			case TargetSide.right:
				return this._getVerticalSide(relatedBox, targetBox, TargetSide.right);
				
			case TargetSide.left:
				return this	._getVerticalSide(relatedBox, targetBox, TargetSide.left);
				
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
	
	BasePreparedWithOffsets.prototype._setupData = function (position) 
	{		
		if (!is.object(position))
			return false;
		
		if (this._isNeedToSubtractContainer())
		{
			position = this._subtractContainer(position);
		}
		
		position.coordinates.left = position.coordinates.x;
		position.coordinates.top = position.coordinates.y;
		
		return position;
			
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
		
		position = this._setupData(position);

		return position;
	};
	

	this.BasePreparedWithOffsets = BasePreparedWithOffsets;
});