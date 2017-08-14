namespace('OUI.Views', function (window) 
{
	var hbs 			= window.OUI.Core.View.hbs;
	var classify		= window.Classy.classify;
	var obj 			= window.Plankton.obj;
	
	var BottomPosition	= window.OUI.Core.Pos.Prepared.Cornered.BottomPosition;
	var TargetPosition	= window.OUI.Core.Pos.Enum.TargetPosition;


	function MenuView(menu, $toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		extraClass = extraClass || '';

		this._menu 				= menu;
		this._toggleElement 	= $toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= 'div.oui-menu-underlay';
		this._positionConfig	= positionConfig || {};

		this._bindOpen();
	};


	MenuView.prototype._bindOpen = function ()
	{
		this._toggleElement.on('click', this._menu.open);
	};


	MenuView.prototype.bindRemove = function ()
	{
		this.getContainer().on('click', this._underlay, this._menu.close);
	};

	MenuView.prototype.getContainer = function ()
	{
		return $('#' + this._menu.getId());
	};

	MenuView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};

	MenuView.prototype.show = function ()
	{
		$('body').append(hbs('menu', 
		{
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		}));
		
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		var $related 	= this._toggleElement;
		
		var baseConfig = {
			container: $container,
			containerOffset: 10,
			relatedElement: $related,
			relatedOffset: 0,
			targetElement: $target,
			targetOffset: 0,
			initialPosition: TargetPosition.center
		};

		var pos = BottomPosition.get(obj.merge(baseConfig, this._positionConfig));

		$target.offset(
		{
			top: pos.coordinates.top,
			left: pos.coordinates.left
		});

		$target.addClass(pos.name);
	};


	this.MenuView = MenuView;
});