namespace('OUI.core.pos.enum', function (window)
{
	var Enum = window.Classy.Enum;
	
	
	/**
	 * @class OUI.core.pos.enum.TargetPosition
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