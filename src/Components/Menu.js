namespace('OUI.Components', function (window) 
{
	var Event 		= window.Duct.Event;
	var MenuView 	= window.OUI.Views.MenuView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Menu
	 */
	function Menu($toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		this._id 			= idGenerator('oui-menu');
		
		this._view 			= new MenuView(this, $toggleElement, contents, extraClass, positionConfig);
		
		this._onBeforeOpen 	= new Event('menu.onBeforeOpen');
		this._onAfterOpen 	= new Event('menu.onAfterOpen');
		this._onBeforeClose = new Event('menu.onBeforeClose');
		this._onAfterClose 	= new Event('menu.onAfterClose');
		
		this.onAfterOpen(this._view.bindRemove);
	};

	
	Menu.prototype.getId = function ()
	{
		return this._id;
	};

	Menu.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};

	Menu.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};

	Menu.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	Menu.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};

	Menu.prototype.open = function ()
	{
		this._onBeforeOpen.trigger(this._id);
		this._view.show();
		this._onAfterOpen.trigger(this._view.getContainer());
	};

	Menu.prototype.close = function ()
	{
		this._onBeforeClose.trigger(this._view.getContainer());
		this._view.remove();
		this._onAfterClose.trigger(this._id);
	};


	this.Menu = Menu;
});