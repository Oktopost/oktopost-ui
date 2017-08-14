namespace('OUI.Core.View', function (window) 
{
	this.fadeRemove = function ($container, extraClass, delay)
	{
		extraClass = extraClass || 'removing';
		delay = delay || 200;

		$container.addClass(extraClass);

		setTimeout(function () {
			$container.remove();
		}, delay);
	};
});