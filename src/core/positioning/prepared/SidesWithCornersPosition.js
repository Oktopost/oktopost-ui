namespace('OUI.core.positioning.prepared', function (window) {
	'use strict';

	
	var is 			= plankton.is;
	var Point 		= OUI.core.positioning.Point;
	var Box 		= OUI.core.positioning.Box;
	var Positioner 	= OUI.core.positioning.Positioner;
	
	
	var defaults = {
		container: window,
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0,
		isAbsolute: false
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.SidesWithCornersPosition
	 */
	function SidesWithCornersPosition(options)
	{
		var self = this;
		
		self.settings = $.extend(true, {}, defaults, options);
		
		var prepareElement = function (el) 
		{
			if (el instanceof HTMLElement)
			{
				return $(el);
			}
			
			return el;
		};
		
		self.settings.container = prepareElement(self.settings.container);
		self.settings.relatedElement = prepareElement(self.settings.relatedElement);
		self.settings.targetElement = prepareElement(self.settings.targetElement);
		
			
		var settingsIsValid = function () 
		{		
			return (is.object(self.settings.container) || $.isWindow(self.settings.container)) 
				&& (is.object(self.settings.relatedElement))
				&& (is.object(self.settings.targetElement));
		};
		
		var applyOffset = function (position, offset) 
		{
			var leftWithOffset = position.left - offset;
			var topWithOffset = position.top - offset;

			return {
				left: leftWithOffset > 0 ? leftWithOffset : 0,
				top: topWithOffset > 0 ? topWithOffset : 0
			};
		};
		
		var getPositionWithOffset = function (el, offset) 
		{
			var position = {left: 0, top: 0};
			
			if (!$.isWindow(el))
			{
				position = el.position();	
			}
			
			return applyOffset(position, offset);
		};
		
		var getSizeWithOffset = function (el, offset) 
		{
			if ($.isWindow(el))
			{
				el = $(el);
			}
			
			return {
				width: el.width() + offset * 2, 
				height: el.height() + offset * 2
			};
		};
		
		var getElementBox = function (el, offset) 
		{
			offset = offset || 0;
			
			if (el instanceof HTMLElement)
			{
				el = $(el);
			}
			
			var position = getPositionWithOffset(el, offset);

			var size = getSizeWithOffset(el, offset);
			
			return prepareBox(position.left, position.top, size.width, size.height);
		};
		
		var preparePoint = function (x, y) 
		{
			return new Point(x, y);	
		};
		
		var prepareBox = function(x, y, w, h)
		{
			var point = preparePoint(x, y);
			var size = preparePoint(w, h);
			
			return new Box(point, size);
		};
		
		var getContainerBox = function () 
		{
			if (self.settings.containerOffset > 0)
			{
				self.settings.containerOffset = self.settings.containerOffset * -1;
			}
			
			return getElementBox(self.settings.container, self.settings.containerOffset);
		};
		
		var getRelatedBox = function () 
		{
			return getElementBox(self.settings.relatedElement, self.settings.relatedOffset);
		};
		
		var getTargetBox = function () 
		{
			return getElementBox(self.settings.targetElement);
		};
		
		var getSide = function (relatedBox, targetBox, direction) 
		{
			if (direction === 1)
			{
				var x = relatedBox.x() + relatedBox.w() +  self.settings.targetOffset;
			}
			else
			{
				x = relatedBox.x() - targetBox.w() -  self.settings.targetOffset;
			}
			
			var y = relatedBox.y() - targetBox.h();

			var w = targetBox.w();
			var h = relatedBox.h() + (targetBox.h() * 2);

			return {
				box: prepareBox(x, y, w, h),
				initial: preparePoint(0, 0)
			}
		};
		
		var getAreas = function (relatedBox, targetBox) 
		{
			return [
				getSide(relatedBox, targetBox, 1),
				getSide(relatedBox, targetBox, -1)
			];
		};
		
		var getData = function () 
		{
			if (!settingsIsValid())
			{
				return {};
			}
			
			var containerBox = getContainerBox();
			var relatedBox = getRelatedBox();
			var targetBox = getTargetBox();
			
			return {
				container: containerBox,
				related: relatedBox,
				target: targetBox,
				areas : getAreas(relatedBox, targetBox)
			}
		};
		
		var getPosition = function () 
		{
			var positioner = new Positioner(getData());
			
			return positioner.getPosition(self.settings.isAbsolute);	
		};
		
		return getPosition();
	}

	this.SidesWithCornersPosition = SidesWithCornersPosition;
});