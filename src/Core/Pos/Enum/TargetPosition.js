namespace('OUI.Core.Pos.Enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.Core.Pos.Enum.TargetPosition
	 * @enum {string}
	 */
	var TargetPosition = {
			center: 'center',
			left: 	'left',
			right: 	'right',
			top: 	'top',
			bottom: 'bottom'
	};
	
	
	this.TargetPosition = Enum(TargetPosition);
});