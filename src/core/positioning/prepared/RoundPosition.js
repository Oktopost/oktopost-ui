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
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.top
	};
	

	/**
	 * @class OUI.core.positioning.prepared.RoundPosition
	 */
	function RoundPosition(options)
	{
		Classy.classify(this);

		var self = this;

		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);
		
		this.availableSides = [
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
			TargetSide.top
		];

		
		this._getAvailableSides = function () 
		{
			return this.availableSides;	
		};

		return this.getPosition();
	}


	this.RoundPosition = RoundPosition;


	this.RoundPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.RoundPosition.prototype.constructor = this.RoundPosition;

});