namespace('OUI.Core.Pos.Prepared.Cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.bottom,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.Core.Pos.Prepared.Cornered.BottomPosition
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