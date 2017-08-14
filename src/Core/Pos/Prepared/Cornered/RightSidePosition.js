namespace('OUI.Core.Pos.Prepared.Cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.right,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.Core.Pos.Prepared.Cornered.RightSidePosition
	 */
	function RightSidePosition(options)
	{
		classify(this);
		
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
	RightSidePosition.prototype.constructor = RightSidePosition;
	
	
	RightSidePosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.RightSidePosition = RightSidePosition;
});