namespace('OUI.Views', function (window) 
{
	var Event 			= window.Duct.Event;

	var RoundPosition 	= window.OUI.Core.Pos.Prepared.RoundPosition;
    var TargetPosition 	= window.OUI.Core.Pos.Enum.TargetPosition;
    var TargetSide 		= window.OUI.Core.Pos.Enum.TargetSide;

    var classify		= window.Classy.classify;
    var obj 			= window.Plankton.obj;


	/**
	 * @class OUI.Views.TipView
	 */
	function TipView(id, baseName, positionConfig)
	{
		classify(this);

		this._id 				= id;

		this._baseName 			= baseName;
		this._selector 			= '*[data-' + baseName + ']';
		this._contentAttr 		= 'title';
		this._invisibleClass 	= 'invisible';

		this._positionConfig	= positionConfig || {};

		this._onMouseEnter 	= new Event('TipView.onMouseEnter');
		this._onMouseOut 	= new Event('TipView.onMouseOut');
		this._onClick 		= new Event('TipView.onClick');

		this._bindEvents();
	};


	TipView.prototype._getContent = function ($element)
	{
		var content = $element.data(this._baseName).toString();
		
		content = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		content = content.replace(/\[/g, '<');
		content = content.replace(/\]/g, '>');

		return content;
	};

	TipView.prototype._getPosition = function ($related, $target)
	{
		var baseConfig = 
		{	
			relatedElement:  	$related,
		    targetElement: 		$target,
		    relatedOffset: 		10,
		    initialPosition: 	TargetPosition.center,
		    initialSide: 		TargetSide.bottom
		};

		var options = obj.merge(baseConfig, this._positionConfig);

		return RoundPosition.get(options);
	};

	TipView.prototype._bindEvents = function ()
	{
		$(document).on(
		{
		    'mouseenter.tip': this._onMouseEnter.trigger,
		    'mouseleave.tip': this._onMouseOut.trigger
		}, this._selector);

		$(document).on('click.tip', this._selector, this._onClick.trigger);
	};

	
	TipView.prototype.show = function (event)
	{
		var position;
		var $element = $(event.currentTarget);
		var $tip = $('<div>')
			.attr('id', this._id)
			.addClass(this._baseName)
			.addClass(this._invisibleClass)
			.html(this._getContent($element));
		
		$('body').append($tip);

		position = this._getPosition($element, $tip);

		$tip
			.addClass(position.name)
			.removeClass(this._invisibleClass)
			.css({ 
				left: position.coordinates.left, 
				top: position.coordinates.top 
			});
	};

	TipView.prototype.remove = function ()
	{
		$('#' + this._id).remove();
	};

	TipView.prototype.onMouseEnter = function (callback)
	{
		this._onMouseEnter.add(callback);
	};

	TipView.prototype.onMouseOut = function (callback)
	{
		this._onMouseOut.add(callback);
	};

	TipView.prototype.onClick = function (callback)
	{
		this._onClick.add(callback);
	};


	this.TipView = TipView;
});