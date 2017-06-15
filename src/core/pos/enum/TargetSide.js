namespace('OUI.core.pos.enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.core.pos.enum.TargetSide
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