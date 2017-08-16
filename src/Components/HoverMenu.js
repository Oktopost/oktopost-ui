namespace('OUI.Components', function (window) 
{
	var Event 			= window.Duct.Event;
	var HoverMenuView 	= window.OUI.Views.HoverMenuView;

	var classify 		= window.Classy.classify;
	var idGenerator 	= window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.HoverMenu
	 */
	function HoverMenu($toggleElement, contents, canPersist, extraClass, positionConfig)
	{
		classify(this);

		this._id 				= idGenerator('oui-hover-menu');
		
		this._view 				= new HoverMenuView(this, $toggleElement, contents, canPersist, extraClass, positionConfig);
		
		this._onBeforeOpen 		= new Event('hover-menu.onBeforeOpen');
		this._onAfterOpen 		= new Event('hover-menu.onAfterOpen');
		this._onBeforeClose 	= new Event('hover-menu.onBeforeClose');
		this._onAfterClose 		= new Event('hover-menu.onAfterClose');
		
		this._onBeforePersist	= new Event('hover-menu.onBeforePersist');
		this._onAfterPersist	= new Event('hover-menu.onAfterPersist');
		
		this._isPersist	= false;
	}


	HoverMenu.prototype.getId = function ()
	{
		return this._id;
	};
	
	HoverMenu.prototype.getContainer = function () 
	{
		return this._view.getContainer();	
	};

	HoverMenu.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};

	HoverMenu.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};

	HoverMenu.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	HoverMenu.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};
	
	HoverMenu.prototype.onBeforePersist = function (callback)
	{
		this._onBeforePersist.add(callback);
	};
	
	HoverMenu.prototype.onAfterPersist = function (callback)
	{
		this._onAfterPersist.add(callback);	
	};
	
	HoverMenu.prototype.open = function ()
	{
		if (this._view.isOpen())
		{
			return;
		}
		
		this._onBeforeOpen.trigger(this.getId());
		this._view.show();
		this._onAfterOpen.trigger(this._view.getContainer());
	};

	HoverMenu.prototype.close = function ()
	{
		if (this._isPersist)
		{
			this._isPersist = false;
			this._view.disablePersist();
		}
		
		this._onBeforeClose.trigger(this._view.getContainer());
		this._view.remove();
		this._onAfterClose.trigger(this.getId());
	};
	
	HoverMenu.prototype.togglePersist = function ()
	{
		if (this.isOpen() && this.isPersist())
		{
			this.close();
			return;
		}
		
		this._onBeforePersist.trigger(this._view.getContainer());
		this._isPersist = true;
		this._view.enablePersist();
		this._onAfterPersist.trigger(this._view.getContainer());
	};
	
	HoverMenu.prototype.isOpen = function () 
	{
		return this._view.isOpen();	
	};
	
	HoverMenu.prototype.isPersist = function () 
	{
		return this._isPersist;	
	};

	this.HoverMenu = HoverMenu;
});