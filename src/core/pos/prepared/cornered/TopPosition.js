namespace('OUI.core.pos.prepared.cornered', function (window) 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.TopPosition
	 */
	function TopPosition(options)
	{
		Classy.classify(this);
		
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
	TopPosition.prototype.constructor = this.TopPosition;
	
	
	TopPosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.TopPosition = TopPosition;
});