namespace('OUI.core.pos.prepared.cornered', function (window) 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.SidesPosition
	 */
	function SidesPosition(options)
	{
		Classy.classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
			
		this._availableSides = [
			TargetSide.right,
			TargetSide.left
		];
	}
	
	SidesPosition.get = function (options) 
	{
		var sidesPosition = new SidesPosition(options);
		return sidesPosition.getPosition();
	};
	

	SidesPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	SidesPosition.prototype.constructor = this.SidesPosition;
	
	
	SidesPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.SidesPosition = SidesPosition;
});