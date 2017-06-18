namespace('OUI.core.pos.prepared', function (window) 
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
	 * @class OUI.core.pos.prepared.RoundPosition
	 */
	function RoundPosition(options)
	{
		classify(this);

		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.top,
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
		];
	}
	
	
	RoundPosition.get = function (options) 
	{
		var roundPosition = new RoundPosition(options);
		return roundPosition.getPosition();
	};
	

	RoundPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	RoundPosition.prototype.constructor = RoundPosition;
	
	
	RoundPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
	
	
	this.RoundPosition = RoundPosition;
});