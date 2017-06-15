namespace('OUI.core.positioning.prepared.cornered', function (window) 
{
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;
	var TargetSide = OUI.core.positioning.enum.TargetSide;
	var TargetPosition = OUI.core.positioning.enum.TargetPosition;
	
	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.cornered.SidesPosition
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