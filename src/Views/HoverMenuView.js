namespace('OUI.Views', function (window)
{
	var hbs 			= window.OUI.Core.View.hbs;
	var classify		= window.Classy.classify;
	var obj 			= window.Plankton.obj;
	var is				= window.Plankton.is;
	
	var ConfigurablePosition	= window.OUI.Core.Pos.Prepared.ConfigurablePosition;
	var TargetPosition			= window.OUI.Core.Pos.Enum.TargetPosition;
	var TargetSide				= window.OUI.Core.Pos.Enum.TargetSide;
	
	
	function HoverMenuView(menu, $toggleElement, contents, canPersist, extraClass, positionConfig)
	{
		classify(this);
		
		extraClass = extraClass || '';
		
		
		this._menu 				= menu;
		this._toggleElement 	= $toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= 'div.oui-hover-menu-underlay';
		this._dataAttr			= 'oui-hover-menu';
		this._positionConfig	= is.false(positionConfig) ? null : positionConfig || {};
		this._canPersist		= canPersist || false;
		
		if (this.isOpen())
		{
			return;
		}
		
		this._bindOpen();
		this._bindRemove();
		
		if (this._canPersist)
		{
			this._bindPersistInit();
		}
	}
	
	
	HoverMenuView.prototype._bindOpen = function ()
	{
		this._toggleElement.on('mouseenter.' + this._menu.getId(), this._menu.open);
	};
	
	HoverMenuView.prototype._bindRemove = function ()
	{
		this._toggleElement.on('mouseleave.' + this._menu.getId() , this._menu.close);
	};
	
	HoverMenuView.prototype._bindPersistInit = function ()
	{
		var self = this;
		
		this._toggleElement.on('click.' + this._menu.getId(), function ()
		{
			if(self.isOpen() && self._menu.isPersist())
			{
				self.getContainer().toggle();
				
				if (!self.getContainer().is(':visible'))
				{
					self.disablePersist();
				}
				else
				{
					self.enablePersist();
				}
			}
			else
			{
				self._menu.togglePersist();
			}
		});
	};
	
	HoverMenuView.prototype._unbindHover = function ()
	{
		this._toggleElement.off('mouseenter.' + this._menu.getId());
		this._toggleElement.off('mouseleave.' + this._menu.getId());
	};
	
	HoverMenuView.prototype._unbindPersistEvents = function ()
	{
		this._toggleElement.off('click.' + this._menu.getId());
		this._unbindPersistClose();
	};
	
	HoverMenuView.prototype._bindPersistClose = function ()
	{
		var self = this;
		
		$(document).on('click.' + self._menu.getId(), function (event)
		{
			if (!$(event.target).closest(self._toggleElement).length &&
			!$(event.target).closest('#' + self._menu.getId()).length)
			{
				self._menu.close();
			}
		});
	};
	
	HoverMenuView.prototype._unbindPersistClose = function ()
	{
		$(document).off('click.' + this._menu.getId());
	};
	
	
	HoverMenuView.prototype.enablePersist = function ()
	{
		this._unbindHover();
		this._bindPersistClose();
	};
	
	HoverMenuView.prototype.disablePersist = function ()
	{
		this._bindOpen();
		this._bindRemove();
		
		this._unbindPersistClose();
	};
	
	HoverMenuView.prototype.getContainer = function ()
	{
		return $('#' + this._menu.getId());
	};
	
	HoverMenuView.prototype.remove = function ()
	{
		this.getContainer().remove();
		this._unbindHover();
		this._unbindPersistEvents();
		
		this._toggleElement.removeData(this._dataAttr);
	};
	
	HoverMenuView.prototype.show = function (container)
	{
		var menu = hbs('hover-menu',
		{
			id: this._menu.getId(),
			contents: this._contents,
			extraClass: this._extraClass
		});
		
		var $container = is(container) ? container : $('body');
		
		$container.append(menu);
		
		var $target 	= this.getContainer();
		var $related 	= this._toggleElement;
		
		if (is.object(this._positionConfig))
		{
			var baseConfig = {
				container: $container,
				containerOffset: 10,
				relatedElement: $related,
				targetElement: $target,
				initialPosition: TargetPosition.center,
				initialSide: TargetSide.right,
				sides: [TargetSide.right, TargetSide.left]
			};
			
			var config = obj.merge(baseConfig, this._positionConfig);
			
			var pos = ConfigurablePosition.get(config, config.sides);
			
			$target.offset(
			{
				top: pos.coordinates.top,
				left: pos.coordinates.left
			});
			
			$target.addClass(pos.name);
		}
		
		this._toggleElement.data(this._dataAttr, this._menu.getId());
	};
	
	HoverMenuView.prototype.isOpen = function ()
	{
		return this._toggleElement.data(this._dataAttr) !== undefined;
	};
	
	
	this.HoverMenuView = HoverMenuView;
});