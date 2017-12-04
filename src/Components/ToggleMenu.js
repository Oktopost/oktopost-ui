namespace('OUI.Components', function (window) 
{
	var Event 			= window.Duct.Event;
	var ToggleMenuView 	= window.OUI.Views.ToggleMenuView;

	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.ToggleMenu
	 */
	function ToggleMenu(toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		this._id 			= idGenerator('oui-toggle-menu');

		this._view 			= new ToggleMenuView(this._id, toggleElement, contents, extraClass, positionConfig);
		
		this._onBeforeRender 	= new Event('toggleMenu.onBeforeRender');
		this._onAfterRender 	= new Event('toggleMenu.onAfterRender');
		
		this._onBeforeOpen 	= new Event('toggleMenu.onBeforeOpen');
		this._onAfterOpen 	= new Event('toggleMenu.onAfterOpen');
		this._onBeforeClose = new Event('toggleMenu.onBeforeClose');
		this._onAfterClose 	= new Event('toggleMenu.onAfterClose');

		this._onBeforeDestroy 	= new Event('toggleMenu.onBeforeDestroy');
		this._onAfterDestroy 	= new Event('toggleMenu.onAfterDestroy');

		this._view.onOpenClick(this.open);
		this._view.onCloseClick(this.close);
	}

	
	ToggleMenu.prototype.getId = function ()
	{
		return this._id;
	};

	ToggleMenu.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};

	ToggleMenu.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};
	
	ToggleMenu.prototype.onAfterRender = function (callback)
	{
		this._onAfterRender.add(callback);
	};
	
	ToggleMenu.prototype.onAfterDestroy = function (callback)
	{
		this._onAfterDestroy.add(callback);
	};

	ToggleMenu.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	ToggleMenu.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};
	
	ToggleMenu.prototype.onBeforeRender = function (callback)
	{
		this._onBeforeRender.add(callback);
	};
	
	ToggleMenu.prototype.onBeforeDestroy = function (callback)
	{
		this._onBeforeDestroy.add(callback);
	};
	
	ToggleMenu.prototype.render = function ()
	{
		this._onBeforeRender.trigger(this._id);
		this._view.render();
		this._onAfterRender.trigger(this._view.getContainer());
	};

	ToggleMenu.prototype.open = function ()
	{
		this._onBeforeOpen.trigger(this._view.getContainer());
		this._view.show();
		this._onAfterOpen.trigger(this._view.getContainer());
	};

	ToggleMenu.prototype.close = function ()
	{
		this._onBeforeClose.trigger(this._view.getContainer());
		this._view.hide();
		this._onAfterClose.trigger(this._view.getContainer());
	};
	
	ToggleMenu.prototype.destroy = function ()
	{
		this._onBeforeDestroy.trigger(this._view.getContainer());
		this._view.destroy();
		this._onAfterDestroy.trigger(this._id);
	};
	
	ToggleMenu.prototype.refreshPosition = function ()
	{
		this._view.refreshPosition();	
	};


	this.ToggleMenu = ToggleMenu;
});