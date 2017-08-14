namespace('OUI.Core.Pos.Prepared.Cornered', function (window) 
{
	var classify				= window.Classy.classify;
	var TargetSide 				= window.OUI.Core.Pos.Enum.TargetSide;
	var TargetPosition 			= window.OUI.Core.Pos.Enum.TargetPosition;
	var BasePreparedWithOffsets = window.OUI.Core.Pos.Prepared.BasePreparedWithOffsets;
	
	
	var defaults = {
		initialSide: TargetSide.left,
		initialPosition: TargetPosition.center
	};
	
	
	/**
	 * @class OUI.Core.Pos.Prepared.Cornered.LeftSidePosition
	 */
	function LeftSidePosition(options)
	{
		classify(this);
		
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
	LeftSidePosition.prototype.constructor = LeftSidePosition;
	
	
	LeftSidePosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
		
	
	this.LeftSidePosition = LeftSidePosition;
});