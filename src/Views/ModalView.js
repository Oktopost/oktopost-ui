namespace('OUI.Views', function (window) 
{
	var is  		= window.Plankton.is;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Views.ModalView
	 */
	function ModalView(modal, contents, className) 
	{
		classify(this);

		className = className || '';

		this._modal 		= modal;
		this._underlay 		= 'div.oui-modal-underlay';
		this._closeButton 	= 'a[data-oui-modal-close]';
		
		this._escapeEvent 	= 'keyup.' + modal.getId();

		this._className		= className;
		this._contents		= contents;
	};
	

	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._modal.getId());
	};

	ModalView.prototype.onOpen = function ()
	{
		var modal = this._modal;

		$(document).on(this._escapeEvent, function (e) 
		{
			if (e.keyCode === 27)
			{
				modal.close();
			}
		});

		this.getContainer().on('click', this._closeButton, this._modal.close);
		this.getContainer().on('click', this._underlay, this._modal.underlayClick);
	};

	ModalView.prototype.show = function () 
	{
		$('body').append(hbs('modal', {
			id: this._modal.getId(),
			contents: this._contents,
			extraClass: this._className
		}));
	};

	ModalView.prototype.remove = function ()
	{
		$(document).off(this._escapeEvent);
		this.getContainer().remove();
	};

	
	this.ModalView = ModalView;
});