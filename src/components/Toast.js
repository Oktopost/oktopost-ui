namespace('OUI.components', function (window) {
	'use strict';


	var Event = window.duct.Event;
	var IdGenerator = window.OUI.core.view.IdGenerator;
	var ToastView = window.OUI.views.ToastView;


	/**
	 * @class OUI.components.Toast
	 */
	function Toast(delay)
	{
		Classy.classify(this);

		this._id 		= IdGenerator('oui-toast');

		this._toastView = new ToastView(this, delay);
				
		this._onAdd 	= new Event('toast.onAdd');
		this._onDismiss = new Event('toast.onDismiss');

		this.onAdd(this._toastView.bindDismiss);
	};


	Toast.prototype.getId = function ()
	{
		return this._id;
	};

	Toast.prototype.onAdd = function (callback)
	{
		this._onAdd.add(callback);
	};

	Toast.prototype.onDismiss = function (callback)
	{
		this._onDismiss.add(callback);
	};


	Toast.prototype.add = function (message)
	{
		this._toastView.show(message);
		this._onAdd.trigger(this._id);
	};

	Toast.prototype.dismiss = function ()
	{
		this._toastView.remove();
		this._onDismiss.trigger(this._id);
	};


	this.Toast = Toast;
});