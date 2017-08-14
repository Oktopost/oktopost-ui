namespace('OUI.Core.Pos.Prepared', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;

	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	

	/**
	 * @class OUI.Core.Pos.Prepared.RoundPosition
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