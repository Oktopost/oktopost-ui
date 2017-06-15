namespace('OUI.core.pos.prepared.cornered', function (window) 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.TopBottomPosition
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