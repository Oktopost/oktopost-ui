namespace('OktoUI.core.positioning.prepared', function () {
	'use strict';


	var Point = OktoUI.core.positioning.Point;
	var Box = OktoUI.core.positioning.Box;
	
	
	var defaults = {
		container: $('window'),
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0
	};
	
	
	/**
	 * @class OktoUI.core.positioning.prepared.SidesWithCornersPosition
	 */
	var SidesWithCornersPosition = function (options)
	{
		Classy.classify(this);
		
		var self = this;
		
		self.settings = $.extend(true, {}, defaults, options);
		
		var getElementBox = function (el, offset) 
		{
			offset = offset || 0;
			
			var position = el.position();
			var width = el.width();
			var height = el.height();
			
			return prepareBox(position.left - offset, position.top - offset, width + offset, height + offset);
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
			return getElementBox(self.settings.targetElement, self.settings.targetOffset);
		};
		
		var getLeftSide = function () 
		{
			
		};
		
		var getSide = function (relatedBox, targetBox, direction) 
		{
			var x = relatedBox.x() + (relatedBox.w() * direction);
			var y = relatedBox.y() - targetBox.h();

			var w = targetBox.w();
			var h = relatedBox.h() + (targetBox.h() * 2);
			
			return {
				area: prepareBox(x, y, w, h),
				initial: preparePoint(x, y)
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
			var containerBox = getContainerBox();
			var relatedBox = getRelatedBox();
			var targetBox = getTargetBox();
			
			
		};
		
	};

});