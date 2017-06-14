namespace('OUI.core.positioning.prepared', function (window) 
{
	'use strict';

	
	var BasePreparedWithOffsets = OUI.core.positioning.BasePreparedWithOffsets;
	
	
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
	 * @class OUI.core.positioning.prepared.TopWithCornersPosition
	 */
	function TopWithCornersPosition(options)
	{
		Classy.classify(this);
		
		var self = this;
		
		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);
		
			
		this._getSide = function (relatedBox, targetBox) 
		{
			var y = relatedBox.y() - targetBox.h() -  self.settings.targetOffset;

			var x = relatedBox.x() - targetBox.w();
	
			var h = targetBox.h();
			var w = relatedBox.w() + (targetBox.w() * 2);
			
			var initialPoint = this._preparePoint(targetBox.w() + self.settings.relatedOffset , 0);
	
			return {
				box: this._prepareBox(x, y, w, h),
				initial: initialPoint
			}
		};
		
		this._getAreas = function (relatedBox, targetBox) 
		{
			return [
				this._getSide(relatedBox, targetBox)
			];
		};	
			
		return this.getPosition();
	}
	
	
	this.TopWithCornersPosition = TopWithCornersPosition;
	
	
	this.TopWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.TopWithCornersPosition.prototype.constructor = this.TopWithCornersPosition;
});