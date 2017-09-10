namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.ToastView
	 */
	function ToastView(toastId, delay)
	{
		classify(this);

		delay = delay || 5000;

		this._id 			= toastId;
		this._delay 		= delay;
		this._dismissButton = 'a[data-oui-dismiss]';

		this._onDismiss = new Event('ToastView.onDismiss');
		this._onDismiss.add(this.remove);
	}


	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	ToastView.prototype.show = function (message)
	{
		$('body').append(hbs('toast', 
		{
			message: message,
			id: this._id
		}));

		setTimeout(this.remove, this._delay);

		this.getContainer().on('click', this._dismissButton, this._onDismiss.trigger);
	};

	ToastView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};

	ToastView.prototype.onDismiss = function (callback)
	{
		this._onDismiss.add(callback);
	};


	this.ToastView = ToastView;
});