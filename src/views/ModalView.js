namespace('OktoUI.views', function () {
	'use strict';


	/**
	 * @class OktoUI.views.ModalView
	 */
	function ModalView(modal, contents, className) 
	{
		Classy.classify(this);

		className = className || '';

		this._modal 		= modal;
		this._underlay  	= 'oui-modal-underlay';
		this._closeButton 	= 'a[data-oui-modal-close]';
		this._baseName  	= 'oui-modal';
		this._wrapper   	= 'wrapper';
		this._removeClass 	= 'removing';
		this._removeDelay 	= 200;
		this._className		= className;
		this._contents		= contents;
	};
	

	ModalView.prototype._createContainer = function () 
	{
		return $('<div>')
			.addClass(this._baseName)
			.addClass(this._className)
			.attr('id', this._modal.getId());
	};

	ModalView.prototype._getEscapeEvent = function ()
	{
		return 'keyup.' + this._modal.getId();
	};
	
	ModalView.prototype._close = function ()
	{
		$(document).off(this._getEscapeEvent());
		this._modal.close();
	};


	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._modal.getId());
	};

	ModalView.prototype.show = function () 
	{
		var $modal 		= this._createContainer();
		var $underlay 	= $('<div>').addClass(this._underlay);
		var $wrapper 	= $('<div>').addClass(this._wrapper);

		$wrapper.append(this._contents);
		$modal.append($wrapper, $underlay);

		$('body').append($modal);
	};

	ModalView.prototype.onOpen = function ()
	{
		var view = this;
		var selectors = this._closeButton + ', div.' + this._underlay;

		$(document).on(this._getEscapeEvent(), function (e) 
		{
			if (e.keyCode === 27) 
				view._close();
		});

		this.getContainer().on('click', selectors, function (e) 
		{
			e.preventDefault();
			view._close();
		});
	};

	ModalView.prototype.remove = function ()
	{
		var $container = this.getContainer();

		$container.addClass(this._removeClass);

		setTimeout(function () {
			$container.remove();
		}, this._removeDelay);
	};

	
	this.ModalView = ModalView;
});