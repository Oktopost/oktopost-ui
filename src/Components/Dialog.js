namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var DialogView 	= window.OUI.Views.DialogView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;
	var is			= window.Plankton.is;

	
	/**
	 * @class OUI.Components.Dialog
	 */
	function Dialog(okButtonText, cancelButtonText) 
	{
		classify(this);

		this._id 				= idGenerator('oui-dialog');
		this._okButtonText		= okButtonText;
		this._cancelButtonText	= cancelButtonText;
		
		this._onCancel 		= new Event('dialog.onCancel');
		this._onConfirm 	= new Event('dialog.onConfirm');
		this._onOpen 		= new Event('dialog.onOpen');
		
		this._view = null;
	}
	
	
	Dialog.prototype._getView = function ()
	{
		if (!is(this._view))
		{
			this._view 	= new DialogView(this._id, this._okButtonText, this._cancelButtonText);
			this._view.onCancelClick(this.triggerCancelEvent);
			this._view.onConfirmClick(this.triggerConfirmEvent);
		}
		
		return this._view;
	};
	
	
	Dialog.prototype.getId = function ()
	{
		return this._id;
	};
	
	Dialog.prototype.triggerCancelEvent = function()
	{
		this._onCancel.trigger();
	};
	
	Dialog.prototype.triggerConfirmEvent = function()
	{
		this._onConfirm.trigger();
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
		this._getView().show(message);
		this._onOpen.trigger(this._id);
	};
	
	Dialog.prototype.close = function()
	{
		this._getView().remove();
	};

	Dialog.prototype.confirm = function () 
	{
		this._onConfirm.trigger(this._id);
	};

	Dialog.prototype.cancel = function () 
	{
		this._onCancel.trigger(this._id);
	};
	
	Dialog.prototype.setView = function (view)
	{
		this._view = view;
	};


	this.Dialog = Dialog;
});