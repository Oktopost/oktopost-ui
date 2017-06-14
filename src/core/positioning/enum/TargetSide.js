namespace('OUI.core.positioning.enum', function ()
{
	'use strict';
	
	
	var Enum = Classy.Enum;
	
	
	/**
	 * @name OUI.core.positioning.enum.TargetSide
	 * @enum {string}
	 */
	this.TargetSide = {
		left: 	'left',
		right: 	'right',
		bottom: 'bottom',
		top: 	'top'
	};
	
	
	Enum(this.TargetSide);
});