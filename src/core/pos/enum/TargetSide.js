namespace('OUI.core.pos.enum', function ()
{
	'use strict';
	
	
	var Enum = Classy.Enum;
	
	
	/**
	 * @name OUI.core.pos.enum.TargetSide
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