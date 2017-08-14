namespace('OUI.Core.Pos.Prepared.Cornered', function (window) 
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
	 * @class OUI.Core.Pos.Prepared.Cornered.TopBottomPosition
	 */
	function TopBottomPosition(options)
	{
		classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
	
		this._availableSides = [
			TargetSide.top,
			TargetSide.bottom
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