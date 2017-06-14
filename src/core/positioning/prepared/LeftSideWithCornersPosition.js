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
	 * @class OUI.core.positioning.prepared.LeftSideWithCornersPosition
	 */
	function LeftSideWithCornersPosition(options)
	{
		Classy.classify(this);
		
		var self = this;
		
		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);
		
			
		this._getSide = function (relatedBox, targetBox) 
		{
			var x = relatedBox.x() - targetBox.w() -  self.settings.targetOffset;

			var y = relatedBox.y() - targetBox.h();

			var w = targetBox.w();
			var h = relatedBox.h() + (targetBox.h() * 2);

			return {
				box: this._prepareBox(x, y, w, h),
				initial: this._preparePoint(0, 0)
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
	
	
	this.LeftSideWithCornersPosition = LeftSideWithCornersPosition;
	
	
	this.LeftSideWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.LeftSideWithCornersPosition.prototype.constructor = this.LeftSideWithCornersPosition;
});