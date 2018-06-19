namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;
	
	var Controller	= window.OUI.Views.Toast.ToastController;


	/**
	 * @class OUI.Views.ToastView
	 */
	function ToastView(toastId, delay)
	{
		classify(this);

		delay = delay || 5000;

		this._id 			= toastId;
		this._delay 		= delay;
		this._dismissButton = 'a[data-oui-dismiss]';
		this._ctaLink 		= '.cta-link';
		
		this._ctrl			= null;
		this._timer			= null;

		this._onDismiss 	= new Event('ToastView.onDismiss');
		this._onCtaClick 	= new Event('ToastView.onCtaClick');

		this._onDismiss.add(this.remove);
	}


	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};
	
	ToastView.prototype.resetDelay = function()
	{
		if (this._delay <= 0)
			return;
		
		if (is(this._timer))
			clearTimeout(this._timer);
		
		this._timer = setTimeout(this.remove, this._delay);
	}

	ToastView.prototype.show = function (message, cta)
	{
		var toRender = $(hbs('toast',
		{
			message: message,
			cta: cta || '',
			id: this._id
		}));
		
		$('body').append(toRender);
		
		this.resetDelay();

		this.getContainer().on('click', this._dismissButton, this._onDismiss.trigger);
		this.getContainer().on('click', this._ctaLink, this._onCtaClick.trigger);
		
		this._ctrl = new Controller(toRender);
		
		return this._ctrl;
	};
	
	ToastView.prototype.hasToast = function()
	{
		return this.getContainer().length !== 0;
	};
	
	ToastView.prototype.getCtrl = function()
	{
		return this._ctrl;
	};

	ToastView.prototype.remove = function ()
	{
		fadeRemove(this.getContainer());
	};

	ToastView.prototype.onDismiss = function (callback)
	{
		this._onDismiss.add(callback);
	};

	ToastView.prototype.onCtaClick = function (callback)
	{
		this._onCtaClick.add(callback);
	};


	this.ToastView = ToastView;
});