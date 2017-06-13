namespace('OUI.views', function (window) {
	'use strict';


	var Hbs = window.OUI.core.view.Hbs;
	var FadeRemove = window.OUI.core.view.FadeRemove;


	/**
	 * @class OUI.views.ToastView
	 */
	function ToastView(toast, delay)
	{
		Classy.classify(this);

		delay = delay || 5000;

		this._toast 	= toast;
		this._view 		= new Hbs();
		this._delay 	= delay;

		this._dismiss 	= 'a[data-oui-dismiss]';
	};

	ToastView.prototype.bindDismiss = function ()
	{
		var toast = this._toast;

		this.getContainer().on('click', this._dismiss, function (e) {
			e.preventDefault();
			toast.dismiss();
		});
	};

	ToastView.prototype.show = function (message)
	{
		this._onAdd.add(callback);
	};

	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._toast.getId());
	};

	ToastView.prototype.show = function (message)
	{
		var view = this;

		$('body').append(this._view.get('toast', {
			message: message,
			id: this._toast.getId()
		}));

		setTimeout(function () {
			FadeRemove(view.getContainer());
		}, this._delay);
	};

	ToastView.prototype.remove = function ()
	{
		FadeRemove(this.getContainer());
	};


	this.ToastView = ToastView;
});