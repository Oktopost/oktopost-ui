namespace('OUI.core.positioning.prepared.cornered', function () 
{
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.BasePreparedWithOffsets;
	var TargetSide = OUI.core.positioning.enum.TargetSide;
	var TargetPosition = OUI.core.positioning.enum.TargetPosition;
	
	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.positioning.prepared.cornered.RightSidePosition
	 */
	function RightSidePosition(options)
	{
		Classy.classify(this);
		
		BasePreparedWithOffsets.call(this, options, defaults);
			
		this._availableSides = [
			TargetSide.right
		];
	}
	
	RightSidePosition.get = function (options) 
	{
		var rightSidePosition = new RightSidePosition(options);
		return rightSidePosition.getPosition();
	};
	

	RightSidePosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	RightSidePosition.prototype.constructor = this.RightSidePosition;
	
	
	RightSidePosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.RightSidePosition = RightSidePosition;
});