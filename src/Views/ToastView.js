namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var classify 	= window.Classy.classify;
	

	/**
	 * @class OUI.Views.ToastView
	 */
	function ToastView(toast, delay)
	{
		classify(this);

		delay = delay || 5000;

		this._toast 	= toast;
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

		$('body').append(hbs('toast', {
			message: message,
			id: this._toast.getId()
		}));

		setTimeout(function () {
			fadeRemove(view.getContainer());
		}, this._delay);
	};

	ToastView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};


	this.ToastView = ToastView;
});