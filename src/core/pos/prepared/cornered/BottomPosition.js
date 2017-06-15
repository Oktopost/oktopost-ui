namespace('OUI.core.pos.prepared.cornered', function () 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.bottom,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.BottomPosition
	 */
	function BottomPosition(options)
	{
		Classy.classify(this);
		
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
	BottomPosition.prototype.constructor = this.BottomPosition;
	
	
	BottomPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.BottomPosition = BottomPosition;
});