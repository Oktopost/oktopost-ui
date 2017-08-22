namespace('OUI.Core.Pos.Prepared', function (window) 
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
	 * @class OUI.Core.Pos.Prepared.ConfigurablePosition
	 */
	function ConfigurablePosition(options, sides)
	{
		sides = sides || [];
		
		classify(this);

		BasePreparedWithOffsets.call(this, options, defaults);
		
		this._availableSides = [
			TargetSide.top,
			TargetSide.right,
			TargetSide.bottom,
			TargetSide.left,
		];
		
		if (sides.length > 0)
		{
			this._availableSides = sides;
		}
	}
	
	
	ConfigurablePosition.get = function (options, sides) 
	{
		var configurablePosition = new ConfigurablePosition(options, sides);
		return configurablePosition.getPosition();
	};
	

	ConfigurablePosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	ConfigurablePosition.prototype.constructor = ConfigurablePosition;
	
	
	ConfigurablePosition.prototype._getAvailableSides = function () 
	{
		return this._availableSides;	
	};
	
	
	this.ConfigurablePosition = ConfigurablePosition;
});