namespace('OUI.core.positioning.prepared', function (window) 
{
	'use strict';

	
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;
	var TargetSide = OUI.core.positioning.enum.TargetSide;
	var TargetPosition = OUI.core.positioning.enum.TargetPosition;
	
	
	var defaults = {
		container: window,
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0,
		isAbsolute: false,
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.TopBottomWithCornersPosition
	 */
	function TopBottomWithCornersPosition(options)
	{
		Classy.classify(this);
		
		var self = this;
		
		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);
		
	
		this.availableSides = [
			TargetSide.bottom,
			TargetSide.top
		];

		
		this._getAvailableSides = function () 
		{
			return this.availableSides;	
		};
		
			
		return this.getPosition();
	}
	
	
	this.TopBottomWithCornersPosition = TopBottomWithCornersPosition;
	
	
	this.TopBottomWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.TopBottomWithCornersPosition.prototype.constructor = this.TopBottomWithCornersPosition;
});