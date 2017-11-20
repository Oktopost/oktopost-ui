namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify	= window.Classy.classify;
	var obj 		= window.Plankton.obj;
	var is			= window.Plankton.is;
	var Event 		= window.Duct.Event;
	
	var ConfigurablePosition	= window.OUI.Core.Pos.Prepared.ConfigurablePosition;
	var TargetPosition			= window.OUI.Core.Pos.Enum.TargetPosition;
	var TargetSide				= window.OUI.Core.Pos.Enum.TargetSide;


	function TourTipView(id, contents, attachTo, positionConfig, extraClass)
	{
		classify(this);

		this._id 				= id;
		this._attachTo 			= $(attachTo);
		this._contents 			= contents;
		this._extraClass 		= extraClass || '';

		this._underlay 			= 'div.oui-tour-tip-underlay';
		this._positionConfig	= positionConfig || {};

		this._onUnderlayClick 	= new Event('TourTipView.onUnderlayClick');
	}

	
	TourTipView.prototype._positionTip = function ()
	{
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		
		var baseConfig = {
			container: 			$container,
			containerOffset: 	10,
			relatedElement: 	this._attachTo,
			targetElement: 		$target,
			initialPosition: 	TargetPosition.center,
			sides: 				[ TargetSide.top, TargetSide.right, TargetSide.bottom, TargetSide.left ]
		};
		
		var config 	= obj.merge(baseConfig, this._positionConfig);
		var pos 	= ConfigurablePosition.get(config, config.sides);

		$target.offset(
		{
			top: 	pos.coordinates.top,
			left: 	pos.coordinates.left
		});
		
		if (!is.null(this._positionClass))
		{
			$target.removeClass(this._positionClass);
		}

		this._positionClass = pos.name;
		$target.addClass(pos.name);
	};


	TourTipView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	TourTipView.prototype.remove = function ()
	{
		this.getContainer().remove();		
	};

	TourTipView.prototype.show = function ()
	{
		$('body').append(hbs('tour-tip', 
		{
			id: 		this._id,
			contents: 	this._contents,
			extraClass: this._extraClass
		}));
	
		this._positionTip();
		
		this.getContainer().on('click.' + this._id, this._underlay, this._onUnderlayClick.trigger);
		this.getContainer().focus();
	};	

	TourTipView.prototype.onUnderlayClick = function (callback)
	{
		this._onUnderlayClick.add(callback);
	};


	this.TourTipView = TourTipView;
});