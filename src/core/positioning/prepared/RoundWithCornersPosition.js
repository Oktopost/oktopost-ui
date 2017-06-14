namespace('OUI.core.positioning.prepared', function (window) 
{
	'use strict';


	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;


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
	 * @class OUI.core.positioning.prepared.RoundWithCornersPosition
	 */
	function RoundWithCornersPosition(options)
	{
		Classy.classify(this);

		var self = this;

		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);


		this._getVerticalSide = function (relatedBox, targetBox, direction) 
		{
			if (direction === 1)
			{
				var y = relatedBox.y() + relatedBox.h() +  self.settings.targetOffset;
			}
			else
			{
				y = relatedBox.y() - targetBox.h() -  self.settings.targetOffset;
			}

			var x = relatedBox.x() - targetBox.w();

			var h = targetBox.h();
			var w = relatedBox.w() + (targetBox.w() * 2);

			return {
				box: this._prepareBox(x, y, w, h),
				initial: this._preparePoint(0 , 0)
			}
		};

		this._getHorizontalSide = function (relatedBox, targetBox, direction) 
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
				box: this._prepareBox(x, y, w, h),
				initial: this._preparePoint(0, 0)
			}
		};

		this._getAreas = function (relatedBox, targetBox) 
		{
			return [
				this._getVerticalSide(relatedBox, targetBox, 1),
				this._getVerticalSide(relatedBox, targetBox, -1),
				this._getHorizontalSide(relatedBox, targetBox, 1),
				this._getHorizontalSide(relatedBox, targetBox, -1)
			];
		};	

		return this.getPosition();
	}


	this.RoundWithCornersPosition = RoundWithCornersPosition;


	this.RoundWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.RoundWithCornersPosition.prototype.constructor = this.RoundWithCornersPosition;

});