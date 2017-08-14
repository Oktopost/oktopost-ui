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
	 * @class OUI.Core.Pos.Prepared.Cornered.TopPosition
	 */
	function TopPosition(options)
	{
		classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
			
		this._availableSides = [
			TargetSide.top
		];
	}
	
	TopPosition.get = function (options) 
	{
		var topPosition = new TopPosition(options);
		return topPosition.getPosition();
	};
	

	TopPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	TopPosition.prototype.constructor = TopPosition;
	
	
	TopPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.TopPosition = TopPosition;
});