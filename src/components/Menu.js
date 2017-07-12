namespace('OUI.components', function (window) 
{
	var Event 		= window.Duct.Event;
	var MenuView 	= window.OUI.views.MenuView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Menu
	 */
	function Menu($toggleElement, contents, extraClass)
	{
		classify(this);

		this._id 			= idGenerator('oui-menu');
		
		this._menuView 		= new MenuView(this, $toggleElement, contents, extraClass);
		
		this._onBeforeOpen 	= new Event('menu.onBeforeOpen');
		this._onAfterOpen 	= new Event('menu.onAfterOpen');
		this._onBeforeClose = new Event('menu.onBeforeClose');
		this._onAfterClose 	= new Event('menu.onAfterClose');

		this._menuView.initEvent();

		this.onAfterOpen(this._menuView.bindRemove);
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
		this._menuView.show();
		this._onAfterOpen.trigger(this._menuView.getContainer());
	};

	Menu.prototype.close = function ()
	{
		this._onBeforeClose.trigger(this._menuView.getContainer());
		this._menuView.remove();
		this._onAfterClose.trigger(this._id);
	};


	this.Menu = Menu;
});