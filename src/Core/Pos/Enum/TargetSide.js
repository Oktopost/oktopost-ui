namespace('OUI.Core.Pos.Enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.Core.Pos.Enum.TargetSide
	 * @enum {string}
	 */
	var TargetSide = {
		left: 	'left',
		right: 	'right',
		bottom: 'bottom',
		top: 	'top'
	};
	
	
	this.TargetSide = Enum(TargetSide);
});