namespace('OUI.views', function (window) 
{
	'use strict';


	var hbs 							= window.OUI.core.view.hbs;
	var FadeRemove 						= window.OUI.core.view.FadeRemove;
	var BottomPosition	 				= window.OUI.core.positioning.prepared.cornered.BottomPosition;
	var TargetPosition					= window.OUI.core.positioning.enum.TargetPosition;


	function MenuView(menu, $toggleElement, contents, extraClass)
	{
		Classy.classify(this);

		extraClass = extraClass || '';

		this._menu 			= menu;
		this._toggleElement = $toggleElement;
		this._contents 		= contents;
		this._extraClass 	= extraClass;
		this._underlay 		= 'div.oui-menu-underlay';
	};

	MenuView.prototype.initEvent = function ()
	{
		var menu = this._menu;

		this._toggleElement.on('click', function (e) {
			e.preventDefault();
			menu.open();
		});
	};

	MenuView.prototype.bindRemove = function ()
	{
		var menu = this._menu;

		this.getContainer().on('click', this._underlay, function () {
			menu.close();
		});
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
		$('body').append(hbs('menu', {
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		}));
		
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		var $related 	= this._toggleElement;
		
		var position = new BottomPosition({
			container: $container,
			containerOffset: 0,
			relatedElement: $related,
			relatedOffset: 5,
			targetElement: $target,
			targetOffset: 0,
			isAbsolute: true,
			initialPosition: TargetPosition.center
		});

		$target.offset({
			top: position.y,
			left: position.x
		});
	};


	this.MenuView = MenuView;
});