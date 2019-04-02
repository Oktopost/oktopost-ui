namespace('OUI.Views.Tip', function (window)
{
	var classify			= window.Classy.classify;
	var foreach				= window.Plankton.foreach;
	
	
	/**
	 * @class OUI.Views.Tip.DefaultSanitizer
	 */
	function DefaultSanitizer()
	{
		classify(this);
		
		this._transformationMap = {
			'[b]':  '<b>', '[/b]': '</b>',
			'[i]':  '<i>', '[/i]': '</i>',
			'[s]':  '<s>', '[/s]': '</s>',
			'[br]': '<br>'
		};
		
		this._compiledMap = [];
		this._compileMap();
	}
	
	
	DefaultSanitizer.prototype._codeToRegex = function (code)
	{
		return new RegExp(code.replace(/\[/g, '\\['), 'g');
	};
	
	DefaultSanitizer.prototype._compileMap = function ()
	{
		foreach.pair(this._transformationMap, this, function (code, tag)
		{
			this._compiledMap.push({regex: this._codeToRegex(code), tag: tag})
		})
	};
	
	
	DefaultSanitizer.prototype.sanitize = function (string)
	{
		string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		
		foreach(this._compiledMap, function (map)
		{
			string = string.replace(map.regex, map.tag);
		});
		
		return string;
	};
	
	
	this.DefaultSanitizer = DefaultSanitizer;
});