namespace('OUI.Components', function (window)
{
	var foreach		= window.Plankton.foreach;
	var classify 	= window.Classy.classify;
	
	
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
	}
	
	
	Gravatar.prototype._init = function ()
	{
		foreach(this._elements.toArray(), this._set);
	};
	
	Gravatar.prototype._set = function (elem)
	{
		$(elem).attr('src', this._get($(elem)));
	};
	
	Gravatar.prototype._get = function (elem)
	{
		return this._base + md5(elem.data('gravatar').toLowerCase()) + '?s=' + this._size + '&d=' + this._default;
	};
	
	
	this.Gravatar = Gravatar;
});