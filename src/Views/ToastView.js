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

		this._onDismiss 	= new Event('ToastView.onDismiss');
		this._onCtaClick 	= new Event('ToastView.onCtaClick');

		this._onDismiss.add(this.remove);
	}


	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	ToastView.prototype.show = function (message, cta)
	{
		var toRender = $(hbs('toast',
		{
			message: message,
			cta: cta || '',
			id: this._id
		}));
		
		$('body').append(toRender);

		if (this._delay > 0) 
			setTimeout(this.remove, this._delay);

		this.getContainer().on('click', this._dismissButton, this._onDismiss.trigger);
		this.getContainer().on('click', this._ctaLink, this._onCtaClick.trigger);
		
		return new Controller(toRender);
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