namespace('OUI.Core.Pos.Prepared.Cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.Core.Pos.Prepared.Cornered.SidesPosition
	 */
	function SidesPosition(options)
	{
		classify(this);
		
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
	SidesPosition.prototype.constructor = SidesPosition;
	
	
	SidesPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.SidesPosition = SidesPosition;
});