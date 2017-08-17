namespace('OUI.Views', function (window) 
{
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
	

	ModalView.prototype._close = function ()
	{
		$(document).off(this._escapeEvent);
		this._modal.close();
	};


	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._modal.getId());
	};

	ModalView.prototype.onOpen = function ()
	{
		var modalView = this;
		var selectors = this._closeButton + ',' + this._underlay;

		$(document).on(this._escapeEvent, function (e) 
		{
			if (e.keyCode === 27)
			{
				modalView._close();
			}
		});

		this.getContainer().on('click', selectors, this._close);
	};

	ModalView.prototype.show = function () 
	{
		var position = {
			top: 20,
			left: 20
		};

		$('body').append(hbs('modal', {
			id: this._modal.getId(),
			contents: this._contents,
			extraClass: this._className,
			position: position
		}));
	};

	ModalView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};

	
	this.ModalView = ModalView;
});