namespace('OUI.core.view', function (window) {
	'use strict';


	/**
	 * @class OUI.core.view.FadeRemove
	 */
	function FadeRemove($container, extraClass, delay)
	{
		extraClass = extraClass || 'removing';
		delay = delay || 200;

		$container.addClass(extraClass);

		setTimeout(function () {
			$container.remove();
		}, delay);
	};
	

	this.FadeRemove = FadeRemove;
});