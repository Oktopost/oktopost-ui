namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.DialogView
	 */
	function DialogView(id, okButtonText, cancelButtonText) 
	{
		classify(this);

		this._id 				= id;
		this._okButtonText 		= okButtonText || 'OK';
		this._cancelButtonText 	= cancelButtonText || 'Cancel';
		this._okButton 			= 'a.ok-button';
		this._cancelButton 		= 'a.cancel-button';

		this._confirmEvent 		= 'keyup.' + id;

		this._onConfirmClick 	= new Event('DialogView.onConfirmClick');
		this._onCancelClick 	= new Event('DialogView.onCancelClick');

		this.onConfirmClick(this.remove);
		this.onCancelClick(this.remove);
	}


	DialogView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	DialogView.prototype.bindEvents = function ()
	{
		var container 		= this.getContainer();
		var onConfirmEvent 	= this._onConfirmClick;

		container.find(this._okButton).on('click', onConfirmEvent.trigger);
		container.find(this._cancelButton).on('click', onConfirmEvent.trigger);

		$(document).on(this._confirmEvent, function (e) 
		{
			if (e.keyCode === 13)
			{
				onConfirmEvent.trigger();
			}
		});
	};

	DialogView.prototype.show = function (message)
	{
		$('body').append(hbs('dialog', {
			id: this._id,
			message: message,
			okButtonText: this._okButtonText,
			cancelButtonText: this._cancelButtonText
		}));

		this.bindEvents();
		this.getContainer().focus();		
	};

	DialogView.prototype.remove = function ()
	{
		$(document).off(this._confirmEvent);
		fadeRemove(this.getContainer());
	};

	DialogView.prototype.onConfirmClick = function (callback)
	{
		this._onConfirmClick.add(callback);
	};

	DialogView.prototype.onCancelClick = function (callback)
	{
		this._onCancelClick.add(callback);
	};

	
	this.DialogView = DialogView;
});