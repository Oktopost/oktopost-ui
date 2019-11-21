namespace('OUI.Views', function (window)
{
	var is  		= window.Plankton.is;
	var foreach		= window.Plankton.foreach;
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
		this._underlay 		= '.oui-modal-underlay';
		this._closeButton 	= '[data-oui-modal-close]';
		
		if (!is(window.OUI.Views.ModalViewIds))
			window.OUI.Views.ModalViewIds = [];
		
		this._escapeEvent 	= 'keyup.' + id;

		this._className		= className;
		this._contents		= contents;

		this._onCloseClick 		= new Event('ModalView.onCloseClick');
		this._onUnderlayClick 	= new Event('ModalView.onUnderlayClick');
		this._onEscape 			= new Event('ModalView.onEscape');
	};
	
	
	ModalView.prototype._triggerOnEscape = function()
	{
		if (window.OUI.Views.ModalViewIds.length === 0)
		{
			this._onEscape.trigger();
			return;
		}
		
		var lastId = window.OUI.Views.ModalViewIds[window.OUI.Views.ModalViewIds.length - 1];
		
		if (lastId !== this._id)
			return;
		
		this._onEscape.trigger();
	};
	
	ModalView.prototype._switchBodyScroll = function ()
	{
		var modals = $('.oui-modal-underlay').length;
		
		if (modals === 0)
		{
			$('body').removeClass('no-scroll');
		}
		else
		{
			$('body').addClass('no-scroll');
		}
	};
	
	ModalView.prototype._getHTML = function()
	{
		var options = {
			id: this._id,
			contents: '',
			extraClass: this._className
		};
		
		if (!is(this._contents))
		{
			return hbs('modal', options);
		}
		
		if (is.string(this._contents))
		{
			options.contents = this._contents;
			return hbs('modal', options);
		}
		
		var parentWrapper = document.createElement('div');
		parentWrapper.innerHTML = hbs('modal', options);
		
		if (is.array(this._contents))
		{
			foreach(this._contents, function (child)
			{
				parentWrapper.querySelector('.wrapper').appendChild(child);
			})
		}
		else if (is.object(this._contents) && is.defined(this._contents.length))
		{
			foreach.pair(this._contents, function (idx, child)
			{
				if (idx === 'length')
					return true;
				
				parentWrapper.querySelector('.wrapper').appendChild(child);
			})
		}
		else
		{
			parentWrapper.querySelector('.wrapper').appendChild(this._contents);
		}
		
		return parentWrapper.children[0];
	};
	

	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	ModalView.prototype.bindEvents = function ()
	{
		var triggerOnEscape = this._triggerOnEscape;

		$(document).on(this._escapeEvent, function (e)
		{
			if (e.keyCode === 27)
			{
				triggerOnEscape();
			}
		});

		this.getContainer().on('click', this._closeButton, this._onCloseClick.trigger);
		this.getContainer().on('click', this._underlay, this._onUnderlayClick.trigger);
	};

	ModalView.prototype.show = function ()
	{
		$('body').append(this._getHTML());
		
		window.OUI.Views.ModalViewIds.push(this._id);

		this.bindEvents();
		this._switchBodyScroll();
	};
	
	ModalView.prototype.focus = function()
	{
		this.getContainer().focus();
	};

	ModalView.prototype.remove = function ()
	{
		var currentId = this._id;
		
		window.OUI.Views.ModalViewIds = window.OUI.Views.ModalViewIds.filter(function (id)
		{
			return id !== currentId
		});

		$(document).off(this._escapeEvent);
		this.getContainer().remove();
		this._switchBodyScroll();
	};

	ModalView.prototype.hideContainer = function ()
	{
		this.getContainer().addClass('hiding');
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