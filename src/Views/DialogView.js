namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;


	/**
	 * @class OUI.Views.DialogView
	 */
	function DialogView(dialog, okButtonText, cancelButtonText) 
	{
		classify(this);

		this._dialog 			= dialog;
		this._okButtonText 		= okButtonText || 'OK';
		this._cancelButtonText 	= cancelButtonText || 'Cancel';
		this._okButton 			= 'a.ok-button';
		this._cancelButton 		= 'a.cancel-button';
	}


	DialogView.prototype.getContainer = function ()
	{
		return $('#' + this._dialog.getId());
	};

	DialogView.prototype.bindEvents = function ()
	{
		var $container = this.getContainer();

		$container.find(this._okButton).on('click', this._dialog.confirm);
		$container.find(this._cancelButton).on('click', this._dialog.cancel);
	};

	DialogView.prototype.show = function (message)
	{
		$('body').append(hbs('dialog', {
			id: this._dialog.getId(),
			message: message,
			okButtonText: this._okButtonText,
			cancelButtonText: this._cancelButtonText
		}));
	};

	DialogView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};

	
	this.DialogView = DialogView;
});