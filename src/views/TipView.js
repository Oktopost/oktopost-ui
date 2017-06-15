namespace('OUI.views', function (window) 
{
	var classify		= window.Classy.classify;
	var RoundPosition 	= window.OUI.core.pos.prepared.RoundPosition;
    var TargetPosition 	= window.OUI.core.pos.enum.TargetPosition;
    var TargetSide 		= window.OUI.core.pos.enum.TargetSide;


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
	};


	TipView.prototype._getContent = function ($element)
	{
		var content = $element.data(this._tipBaseName);

		content = content.replace(/\[/g, '<');
		content = content.replace(/\]/g, '>');

		return content;
	};

	TipView.prototype._getCoordinates = function ($related, $target)
	{
		console.log($related, $target);

		console.log($related.position(), $related.width(), $related.height());
		console.log($target.position(), $target.width(), $target.height());
			
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
		var $tip = $('<div>')
			.attr('id', this._tip.getId())
			.addClass(this._tipBaseName)
			.html(this._getContent($element));

		var coords = this._getCoordinates($element, $tip);

		$tip.css({
			top: coords.y, 
			left: coords.x
		});

		$('body').append($tip);
	};

	TipView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};


	this.TipView = TipView;
});