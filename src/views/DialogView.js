namespace('OUI.views', function (window) 
{
	var hbs = window.OUI.core.view.hbs;
	var classify = window.Classy.classify;
	var fadeRemove = window.OUI.core.view.fadeRemove;


	/**
	 * @class OUI.views.DialogView
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
		var dialog = this._dialog;
		var $container = this.getContainer();

		$container.find(this._okButton).on('click', function (e) {
			e.preventDefault();
			dialog.confirm();
		});

		$container.find(this._cancelButton).on('click', function (e) {
			e.preventDefault();
			dialog.cancel();
		});
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