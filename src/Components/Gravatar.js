namespace('OUI.Components', function (window) 
{
	var obj 		= window.Plankton.obj;
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
		var avatar = this;

		if (this._elements.length > 1)
		{
			obj.forEach(function (image)
			{
				$(image).attr('src', avatar._get($(image)));
			});
		}
		else (this._elements.length === 1)
		{
			this._elements.attr('src', avatar._get(this._elements));
		}
	};

	Gravatar.prototype._get = function (elem)
	{
		return this._base + md5(elem.data('gravatar').toLowerCase()) + '?s=' + this._size + '&d=' + this._default;
	};


	this.Gravatar = Gravatar;
});