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


	function ToggleMenuView(id, toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		extraClass = extraClass || '';

		this._id 				= id;
		this._toggleElement 	= toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= 'div.oui-toggle-menu-underlay';
		this._positionConfig	= positionConfig || {};
		this._positionClass 	= null;
		
		this._onOpenClick 	= new Event('MenuView.onOpenClick');
		this._onCloseClick 	= new Event('MenuView.onCloseClick');

		this._toggleElement.on('click.' + id, this._onOpenClick.trigger);
	}
	
	
	ToggleMenuView.prototype._unbindOpen = function () 
	{
		this._toggleElement.off('click.' + this._id);	
	};
	
	ToggleMenuView.prototype._putInPosition = function ()
	{
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		var $related 	= this._toggleElement;
		
		var baseConfig = {
			container: $container,
			containerOffset: 10,
			relatedElement: $related,
			targetElement: $target,
			initialPosition: TargetPosition.center,
			sides: [TargetSide.bottom]
		};
		
		var config = obj.merge(baseConfig, this._positionConfig);

		var pos = ConfigurablePosition.get(config, config.sides);

		$target.offset(
		{
			top: pos.coordinates.top,
			left: pos.coordinates.left
		});
		
		if (!is.null(this._positionClass))
		{
			$target.removeClass(this._positionClass);
		}

		this._positionClass = pos.name;
		$target.addClass(pos.name);
	};


	ToggleMenuView.prototype.render = function ()
	{
		$('body').append(hbs('toggle-menu', 
			{
				id: this._id,
				contents: this._contents,
				extraClass: this._extraClass
			}));
		
		this.getContainer().on('click.' + this._id, this._underlay, this._onCloseClick.trigger);
	};
	
	ToggleMenuView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	ToggleMenuView.prototype.destroy = function ()
	{
		this.getContainer().remove();
		this._unbindOpen();
	};

	ToggleMenuView.prototype.show = function ()
	{
		this.getContainer().removeClass('hidden');
		this._putInPosition();
		this.getContainer().focus();
	};
	
	ToggleMenuView.prototype.hide = function ()
	{
		this.getContainer().addClass('hidden');
	};
	
	ToggleMenuView.prototype.refreshPosition = function ()
	{
		this._putInPosition();
	};

	ToggleMenuView.prototype.onOpenClick = function (callback)
	{
		this._onOpenClick.add(callback);
	};

	ToggleMenuView.prototype.onCloseClick = function (callback)
	{
		this._onCloseClick.add(callback);
	};


	this.ToggleMenuView = ToggleMenuView;
});