namespace('OUI.Views', function (window) 
{
	var is  		= window.Plankton.is;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.ModalView
	 */
	function ModalView(id, contents, className) 
	{
		classify(this);

		className = className || '';

		this._id 			= id;
		this._underlay 		= 'div.oui-modal-underlay';
		this._closeButton 	= 'a[data-oui-modal-close]';
		
		this._escapeEvent 	= 'keyup.' + id;

		this._className		= className;
		this._contents		= contents;

		this._onCloseClick 		= new Event('ModalView.onCloseClick');
		this._onUnderlayClick 	= new Event('ModalView.onUnderlayClick');
		this._onEscape 			= new Event('ModalView.onEscape');
	};
	

	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	ModalView.prototype.bindEvents = function ()
	{
		var onEscape = this._onEscape;

		$(document).on(this._escapeEvent, function (e) 
		{
			if (e.keyCode === 27)
			{
				onEscape.trigger();
			}
		});

		this.getContainer().on('click', this._closeButton, this._onCloseClick.trigger);
		this.getContainer().on('click', this._underlay, this._onUnderlayClick.trigger);
	};

	ModalView.prototype.show = function () 
	{
		$('body').append(hbs('modal', {
			id: this._id,
			contents: this._contents,
			extraClass: this._className
		}));

		this.bindEvents();
		this.getContainer().focus();
	};

	ModalView.prototype.remove = function ()
	{
		$(document).off(this._escapeEvent);
		this.getContainer().remove();
	};

	ModalView.prototype.onCloseClick = function (callback)
	{
		this._onCloseClick.add(callback);
	};

	ModalView.prototype.onUnderlayClick = function (callback)
	{
		this._onUnderlayClick.add(callback);
	};

	ModalView.prototype.onEscape = function (callback)
	{
		this._onEscape.add(callback);
	};


	
	this.ModalView = ModalView;
});