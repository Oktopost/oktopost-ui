namespace('OUI.core.pos.prepared.cornered', function () 
{
	var TargetSide 				= OUI.core.pos.enum.TargetSide;
	var TargetPosition 			= OUI.core.pos.enum.TargetPosition;
	var BasePreparedWithOffsets = OUI.core.pos.prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.left,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.core.pos.prepared.cornered.LeftSidePosition
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