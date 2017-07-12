namespace('OUI.views', function (window) 
{
	var RoundPosition 	= window.OUI.core.pos.prepared.RoundPosition;
    var TargetPosition 	= window.OUI.core.pos.enum.TargetPosition;
    var TargetSide 		= window.OUI.core.pos.enum.TargetSide;

    var classify		= window.Classy.classify;


	/**
	 * @class OUI.views.TipView
	 */
	function TipView(tip, baseName)
	{
		classify(this);

		this._tip 				= tip;

		this._tipBaseName 		= baseName;
		this._tipSelector 		= '*[data-' + baseName + ']';
		this._tipContentAttr 	= 'title';
		this._invisibleClass 	= 'invisible';
	};


	TipView.prototype._getContent = function ($element)
	{
		var content = $element.data(this._tipBaseName);

		content = content.replace(/\[/g, '<');
		content = content.replace(/\]/g, '>');

		return content;
	};

	TipView.prototype._getPosition = function ($related, $target)
	{
		var options = {			
			relatedElement:  $related,
		    targetElement: $target,
		    relatedOffset: 10,
		    initialPosition: TargetPosition.center,
		    initialSide: TargetSide.bottom
		};

		return RoundPosition.get(options);
	};


	TipView.prototype.bindHover = function ()
	{
		var view = this;

		$(document).on(
		{
		    'mouseenter.tip': function () 
		    {
		        view._tip.add($(this));
		    },
		    'mouseleave.tip': function () 
		    {
		        view._tip.remove();
		    }
		}, this._tipSelector);

		$(document).on('click.tip', this._tipSelector, function () 
		{
			view._tip.remove();
		});
	};

	TipView.prototype.getContainer = function ()
	{
		return $('#' + this._tip.getId());
	};

	TipView.prototype.show = function ($element)
	{
		var position;
		var $tip = $('<div>')
			.attr('id', this._tip.getId())
			.addClass(this._tipBaseName)
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
		this.getContainer().remove();
	};


	this.TipView = TipView;
});