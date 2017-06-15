namespace('OUI.core.positioning.prepared.cornered', function (window) 
{
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;
	var TargetSide = OUI.core.positioning.enum.TargetSide;
	var TargetPosition = OUI.core.positioning.enum.TargetPosition;
	
	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.cornered.TopBottomPosition
	 */
	function TopBottomPosition(options)
	{
		Classy.classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
	
		this._availableSides = [
			TargetSide.bottom,
			TargetSide.top
		];
	}
	
	TopBottomPosition.get = function (options) 
	{
		var topBottomPosition = new TopBottomPosition(options);
		return topBottomPosition.getPosition();
	};
	

	TopBottomPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	TopBottomPosition.prototype.constructor = this.TopBottomPosition;
	
	
	TopBottomPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.TopBottomPosition = TopBottomPosition;
});