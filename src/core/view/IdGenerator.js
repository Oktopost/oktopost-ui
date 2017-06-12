namespace('OUI.core.view', function (window) {
	'use strict';


	/**
	 * @class OUI.core.view.IdGenerator
	 */
	function IdGenerator(baseName)
	{
		return baseName + '-' + Math.floor(Date.now());
	};
	

	this.IdGenerator = IdGenerator;
});