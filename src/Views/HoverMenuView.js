namespace('OUI.Views', function (window) 
{
	var hbs 			= window.OUI.Core.View.hbs;
	var classify		= window.Classy.classify;
	var obj 			= window.Plankton.obj;
	
	var RoundPosition	= window.OUI.Core.Pos.Prepared.RoundPosition;
	var TargetPosition	= window.OUI.Core.Pos.Enum.TargetPosition;
	var TargetSide		= window.OUI.Core.Pos.Enum.TargetSide;


	function HoverMenuView(menu, $toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		extraClass = extraClass || '';

		this._menu 				= menu;
		this._toggleElement 	= $toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= 'div.oui-hover-menu-underlay';
		this._positionConfig	= positionConfig || {};
		this._isLoaded			= false;

		this._bindOpen();
		this._bindRemove();
	}


	HoverMenuView.prototype._bindOpen = function ()
	{
		this._toggleElement.on('mouseenter', this._menu.open);
	};

	HoverMenuView.prototype._bindRemove = function ()
	{
		this._toggleElement.on('mouseleave', this._menu.close);
	};
	

	HoverMenuView.prototype.enablePersist = function () 
	{
		this._toggleElement.off('mouseenter');
		this._toggleElement.off('mouseleave');
	};
	
	HoverMenuView.prototype.disablePersist = function () 
	{
		this._bindOpen();
		this._bindRemove();
	};

	HoverMenuView.prototype.getContainer = function ()
	{
		return $('#' + this._menu.getId());
	};

	HoverMenuView.prototype.remove = function ()
	{
		this.getContainer().remove();
		this._isLoaded = false;
	};

	HoverMenuView.prototype.show = function ()
	{
		var menu = hbs('hover-menu', 
		{
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		});
		
		$('body').append(menu);
		
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		var $related 	= this._toggleElement;
		
		var baseConfig = {
			container: $('body'),
			containerOffset: 10,
			relatedElement: $related,
			relatedOffset: 0,
			targetElement: $target,
			targetOffset: 0,
			initialPosition: TargetPosition.center,
			initialSide: TargetSide.right
		};

		var pos = RoundPosition.get(obj.merge(baseConfig, this._positionConfig));

		$target.offset(
		{
			top: pos.coordinates.top,
			left: pos.coordinates.left
		});

		$target.addClass(pos.name);
		
		this._isLoaded = true;
	};
	
	HoverMenuView.prototype.isOpen = function () 
	{
		return this._isLoaded;	
	};


	this.HoverMenuView = HoverMenuView;
});