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

		this._id 			= idGenerator('oui-toast');

		this._view 			= new ToastView(this._id, delay);
				
		this._onAdd 		= new Event('toast.onAdd');
		this._onDismiss 	= new Event('toast.onDismiss');
		this._onCtaClick 	= new Event('toast.onCtaClick');

		this._view.onDismiss(this._onDismiss.trigger);
		this._view.onCtaClick(this._onCtaClick.trigger);
	}
	
	
	Toast.prototype._update = function(message, cta)
	{
		this._view.getCtrl().setText(message);
		this._view.getCtrl().setCtaText(cta);
		this._view.resetDelay();
		
		return this._view.getCtrl();
	};
	
	Toast.prototype._create = function(message, cta)
	{
		this._view.show(message, cta);
		this._onAdd.trigger(this._id);
		
		return this._view.getCtrl();
	};


	Toast.prototype.getId = function ()
	{
		return this._id;
	};

	Toast.prototype.onAdd = function (callback)
	{
		return this._onAdd.listener(callback);
	};

	Toast.prototype.onDismiss = function (callback)
	{
		return this._onDismiss.listener(callback);
	};

	Toast.prototype.onCtaClick = function (callback)
	{
		return this._onCtaClick.listener(callback);
	};
	
	Toast.prototype.add = function (message, cta)
	{
		if (this.has())
			return this._update(message, cta);
		
		return this._create(message, cta);
	};
	
	Toast.prototype.has = function()
	{
		return this._view.hasToast();
	};

	Toast.prototype.dismiss = function ()
	{
		this._view.remove();
		this._onDismiss.trigger(this._id);
	};


	this.Toast = Toast;
});