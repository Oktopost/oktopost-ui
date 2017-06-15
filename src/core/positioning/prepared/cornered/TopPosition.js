namespace('OUI.core.positioning.prepared.cornered', function (window) 
{
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;
	var TargetSide = OUI.core.positioning.enum.TargetSide;
	var TargetPosition = OUI.core.positioning.enum.TargetPosition;
	
	
	var defaults = {
		initialSide: TargetSide.top,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.cornered.TopPosition
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