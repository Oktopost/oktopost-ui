namespace('OUI.core.pos.prepared.cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= window.OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.bottom,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.BottomPosition
	 */
	function BottomPosition(options)
	{
		classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.bottom
		];
	}
	
	
	BottomPosition.get = function (options) 
	{
		var bottomPosition = new BottomPosition(options);
		return bottomPosition.getPosition();
	};
	

	BottomPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	BottomPosition.prototype.constructor = BottomPosition;
	
	
	BottomPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.BottomPosition = BottomPosition;
});