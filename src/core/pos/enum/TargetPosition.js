namespace('OUI.core.pos.enum', function ()
{
	'use strict';
	
	
	var Enum = Classy.Enum;
	
	
	/**
	 * @name OUI.core.pos.enum.TargetPosition
	 * @enum {string}
	 */
	this.TargetPosition = {
			center: 'center',
			left: 	'left',
			right: 	'right',
			top: 	'top',
			bottom: 'bottom'
	};
	
	
	Enum(this.TargetPosition);
});