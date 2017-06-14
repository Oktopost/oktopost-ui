namespace('OUI.views', function (window) {
	'use strict';


	var Hbs 							= window.OUI.core.view.Hbs;
	var FadeRemove 						= window.OUI.core.view.FadeRemove;
	var SidesWithCornersPosition 		= window.OUI.core.positioning.prepared.SidesWithCornersPosition;
	var BottomWithCornersPosition 		= window.OUI.core.positioning.prepared.BottomWithCornersPosition;


	function MenuView(menu, $toggleElement, contents, extraClass)
	{
		Classy.classify(this);

		extraClass = extraClass || '';

		this._menu 			= menu;
		this._toggleElement = $toggleElement;
		this._contents 		= contents;
		this._extraClass 	= extraClass;
		this._underlay 		= 'div.oui-menu-underlay';

		this._view 			= new Hbs();
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
		FadeRemove(this.getContainer());
	};

	MenuView.prototype.show = function ()
	{
		$('body').append(this._view.get('menu', {
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		}));
		
		var $container 	= this.getContainer();
		var $target 	= $container.find('div.wrapper');
		var $related 	= this._toggleElement;
		
		var position = new TopBottomWithCornersPosition({
			container: $container,
			containerOffset: 0,
			relatedElement: $related,
			relatedOffset: 5,
			targetElement: $target,
			targetOffset: 0,
			isAbsolute: true
		});

		$target.offset({
			top: position.y,
			left: position.x
		});
	};


	this.MenuView = MenuView;
});