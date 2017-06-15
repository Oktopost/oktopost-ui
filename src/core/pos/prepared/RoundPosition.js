namespace('OUI.core.pos.prepared', function () 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;

	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.top
	};
	

	/**
	 * @class OUI.core.pos.prepared.RoundPosition
	 */
	function RoundPosition(options)
	{
		Classy.classify(this);

		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
			TargetSide.top
		];
	}
	
	
	RoundPosition.get = function (options) 
	{
		var roundPosition = new RoundPosition(options);
		return roundPosition.getPosition();
	};
	

	RoundPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	RoundPosition.prototype.constructor = this.RoundPosition;
	
	
	RoundPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
	
	
	this.RoundPosition = RoundPosition;
});