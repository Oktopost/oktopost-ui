namespace('OUI.core.pos.prepared.cornered', function (window) 
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
	 * @class OUI.core.pos.prepared.cornered.TopPosition
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