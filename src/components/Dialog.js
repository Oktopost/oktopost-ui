namespace('OktoUI.components', function () {
	'use strict';


	var Event       = duct.Event;
	var DialogView 	= OktoUI.views.DialogView;


	/**
	 * @class OktoUI.components.Dialog
	 */
	function Dialog(okButtonText, cancelButtonText) 
	{
		Classy.classify(this);

		this._dialogView 	= new DialogView(this, okButtonText, cancelButtonText);

		this._onCancel 		= new Event('dialog.onCancel');
		this._onConfirm 	= new Event('dialog.onConfirm');		

		this._onCancel.add(this._dialogView.removeDialog);
		this._onConfirm.add(this._dialogView.removeDialog);
	};

	
	Dialog.prototype.onCancel = function ()
	{
		this._onCancel.trigger();
	};

	Dialog.prototype.onConfirm = function ()
	{
		this._onConfirm.trigger();
	};

	Dialog.prototype.confirm = function (message, onConfirm) 
	{
		this._onConfirm.add(onConfirm);
		this._dialogView.showDialog(message);
	};


	this.Dialog = Dialog;
});