namespace('OUI.core.pos.prepared.cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= window.OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.TopBottomPosition
	 */
	function TopBottomPosition(options)
	{
		classify(this);
		
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
	TopBottomPosition.prototype.constructor = TopBottomPosition;
	
	
	TopBottomPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.TopBottomPosition = TopBottomPosition;
});