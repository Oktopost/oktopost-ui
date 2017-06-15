namespace('OUI.core.positioning.prepared.cornered', function () 
{
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;
	var TargetSide = OUI.core.positioning.enum.TargetSide;
	var TargetPosition = OUI.core.positioning.enum.TargetPosition;
	
	
	var defaults = {
		initialSide: TargetSide.left,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.cornered.LeftSidePosition
	 */
	function LeftSidePosition(options)
	{
		Classy.classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.left
		];
	}
	
	LeftSidePosition.get = function (options) 
	{
		var leftSidePosition = new LeftSidePosition(options);
		return leftSidePosition.getPosition();
	};
	

	LeftSidePosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	LeftSidePosition.prototype.constructor = this.LeftSidePosition;
	
	
	LeftSidePosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.LeftSidePosition = LeftSidePosition;
});