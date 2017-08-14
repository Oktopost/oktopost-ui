namespace('OUI.Components', function (window) 
{
	var Event 		= window.Duct.Event;	
	var ToastView 	= window.OUI.Views.ToastView;

	var classify	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Toast
	 */
	function Toast(delay)
	{
		classify(this);

		this._id 		= idGenerator('oui-toast');

		this._view 		= new ToastView(this, delay);
				
		this._onAdd 	= new Event('toast.onAdd');
		this._onDismiss = new Event('toast.onDismiss');

		this.onAdd(this._view.bindDismiss);
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
		this._view.show(message);
		this._onAdd.trigger(this._id);
	};

	Toast.prototype.dismiss = function ()
	{
		this._view.remove();
		this._onDismiss.trigger(this._id);
	};


	this.Toast = Toast;
});