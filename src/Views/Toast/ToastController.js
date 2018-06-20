namespace('OUI.Views.Toast', function (window)
{
	var is		 = window.Plankton.is;
	var classify = window.Classy.classify;
	
	
	var ToastController = function (toast)
	{
		classify(this);
		this._toast = toast;
	};
	
	
	ToastController.prototype.getCta = function ()
	{
		return this._toast.find('a');
	};
	
	ToastController.prototype.setText = function (text)
	{
		if (!is.string(text))
			text = text.toString();
		
		this._toast.find('p').text(text);
	};
	
	ToastController.prototype.setCtaText = function (text)
	{
		if (!is(text))
		{
			text = '';
		}
		else if (!is.string(text))
		{
			text = text.toString();
		}
		
		if (!is(text))
		{
			this.getCta().hide();
		}
		else
		{
			this.getCta().show();
		}
		
		this.getCta().text(text);
	};
	
	
	this.ToastController = ToastController;
});