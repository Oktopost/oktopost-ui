namespace('OUI.core.pos.prepared.cornered', function () 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.RightSidePosition
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