namespace('OktoUI.views', function () {
	'use strict';


	/**
	 * @class OktoUI.views.DialogView
	 */
	function DialogView(dialog, okButtonText, cancelButtonText) 
	{
		Classy.classify(this);

		this._dialog 				= dialog;
		this._modal 				= null; 
		this._okButtonText 			= okButtonText || 'OK';
		this._cancelButtonText 		= cancelButtonText || 'Cancel';
		this._className 			= 'dialog-confirm';
	};


	DialogView.prototype._getButton = function (buttonText, onClick)
	{
		return $('<a>')
			.attr('href', '')
			.text(buttonText)
			.on('click', function (e) {
				e.preventDefault();
				onClick();
			});
	};

	DialogView.prototype._getCancelButton = function ()
	{
		return this._getButton(this._cancelButtonText, this._dialog.onCancel);
	};

	DialogView.prototype._getOkButton = function ()
	{
		return this._getButton(this._okButtonText, this._dialog.onConfirm);
	};

	DialogView.prototype._getContents = function (message)
	{
		var p = $('<p>').text(message);
		var body = $('<div>').addClass('body');
		var footer = $('<div>').addClass('footer');
		
		body.append(p);
		footer.append(this._getCancelButton(), this._getOkButton());

		return [body, footer];
	};


	DialogView.prototype.removeDialog = function ()
	{
		this._modal.close();
		this._modal = null;
	};

	DialogView.prototype.showDialog = function (message)
	{
		this._modal = new OktoUI.components.Modal(this._getContents(message), this._className);
		this._modal.onAfterOpen(function (modal) {
			modal.off();
		});
		this._modal.open();
	};

	
	this.DialogView = DialogView;
});