namespace('OUI.Components', function (window) 
{
	var classify 	= window.Classy.classify;
	var md5 		= window.md5;


	/**
	 * @see https://en.gravatar.com/site/implement/images/
	 * @param {jQuery} elements
	 */
	function Gravatar(elements, size, defaultImage)
	{
		classify(this);

		this._elements 	= elements;
		this._base 		= 'https://www.gravatar.com/avatar/';
		this._size 		= size || 160;
		this._default 	= defaultImage || 'identicon';

		this._init();
	};


	Gravatar.prototype._init = function ()
	{
		var getAvatar = this._getAvatar;

		if (this._elements.length > 1)
		{
			this._elements.each(function () { $(this).attr('src', getAvatar($(this))); });
		}
		else (this._elements.length === 1)
		{
			this._elements.attr('src', getAvatar(this._elements));
		}
	};

	Gravatar.prototype._getAvatar = function (elem)
	{
		return this._base + md5(elem.data('gravatar').toLowerCase()) + '?s=' + this._size + '&d=' + this._default;
	};


	this.Gravatar = Gravatar;
});