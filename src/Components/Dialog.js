namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var DialogView 	= window.OUI.Views.DialogView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Dialog
	 */
	function Dialog(okButtonText, cancelButtonText) 
	{
		classify(this);

		this._id 			= idGenerator('oui-dialog');
		
		this._view 			= new DialogView(this, okButtonText, cancelButtonText);

		this._onCancel 		= new Event('dialog.onCancel');
		this._onConfirm 	= new Event('dialog.onConfirm');
		this._onOpen 		= new Event('dialog.onOpen');

		this.onOpen(this._view.bindEvents);
		this.onCancel(this._view.remove);
		this.onConfirm(this._view.remove);
	}

	Dialog.prototype.getId = function ()
	{
		return this._id;
	};

	Dialog.prototype.onOpen = function (callback)
	{
		this._onOpen.add(callback);
	};

	Dialog.prototype.onCancel = function (callback)
	{
		this._onCancel.add(callback);
	};

	Dialog.prototype.onConfirm = function (callback)
	{
		this._onConfirm.add(callback);
	};

	Dialog.prototype.open = function (message) 
	{
		this._view.show(message);
		this._onOpen.trigger(this._view.getContainer());
	};

	Dialog.prototype.confirm = function () 
	{
		this._onConfirm.trigger(this._id);
	};

	Dialog.prototype.cancel = function () 
	{
		this._onCancel.trigger(this._id);
	};


	this.Dialog = Dialog;
});