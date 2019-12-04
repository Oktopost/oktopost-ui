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
	
	var EscapeEventContainer	= window.OUI.Views.EscapeEventContainer;


	function MenuView(id, toggleElement, contents, extraClass, positionConfig)
	{
		classify(this);

		extraClass = extraClass || '';

		this._id 				= id;
		this._toggleElement 	= toggleElement;
		this._contents 			= contents;
		this._extraClass 		= extraClass;
		this._underlay 			= '.oui-menu-underlay';
		this._positionConfig	= positionConfig || {};
		this._positionClass 	= null;
		
		this._escapeContainer = new EscapeEventContainer();
		
		this._escapeEvent	 	= 'keyup.' + id;
		
		this._onOpenClick 	= new Event('MenuView.onOpenClick');
		this._onCloseClick 	= new Event('MenuView.onCloseClick');

		this._toggleElement.on('click.' + id, this._onOpenClick.trigger);
	}
	
	
	MenuView.prototype._triggerOnEscape = function()
	{
		if (this._escapeContainer.isEmpty())
		{
			this._onCloseClick.trigger();
			return;
		}
		
		if (!this._escapeContainer.isLastId(this._id))
		{
			return;
		}
		
		this._onCloseClick.trigger();
	};
	
	MenuView.prototype._unbindOpen = function () 
	{
		this._toggleElement.off('click.' + this._id);	
	};
	
	MenuView.prototype._putInPosition = function ()
	{
		var $container 	= this.getContainer();
		var $target 	= $container.find('.wrapper');
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
	
	MenuView.prototype._getHTML = function()
	{
		var options = {
			id: this._id,
			contents: '',
			extraClass: this._extraClass
		};
		
		if (!is(this._contents))
		{
			return hbs('menu', options);
		}
		
		if (is.string(this._contents))
		{
			options.contents = this._contents;
			return hbs('menu', options);
		}
		
		var parentWrapper = document.createElement('div');
		parentWrapper.innerHTML = hbs('menu', options);
		
		if (is.array(this._contents))
		{
			foreach(this._contents, function (child)
			{
				parentWrapper.querySelector('.wrapper').appendChild(child);
			})
		}
		else if (is.object(this._contents) && is.defined(this._contents.length))
		{
			foreach.pair(this._contents, function (idx, child)
			{
				if (idx === 'length')
					return true;
				
				parentWrapper.querySelector('.wrapper').appendChild(child);
			})
		}
		else
		{
			parentWrapper.querySelector('.wrapper').appendChild(this._contents);
		}
		
		return parentWrapper.children[0];
	};


	MenuView.prototype.getContainer = function ()
	{
		return $('#' + this._id);
	};

	MenuView.prototype.remove = function (unbindEvent)
	{
		this.getContainer().remove();
		
		this._escapeContainer.remove(this._id);
		$(document).off(this._escapeEvent);
		
		if (unbindEvent)
		{
			this._unbindOpen();
		}
	};

	MenuView.prototype.show = function ()
	{
		$('body').append(this._getHTML());
	
		this._putInPosition();
		
		this._escapeContainer.add(this._id);
		
		this.getContainer().on('click.' + this._id, this._underlay, this._onCloseClick.trigger);
		this.getContainer().focus();
		
		var triggerOnEscape = this._triggerOnEscape;
		
		$(document).on(this._escapeEvent, function (e)
		{
			if (e.keyCode === 27)
			{
				triggerOnEscape();
			}
		});
	};
	
	MenuView.prototype.refreshPosition = function ()
	{
		this._putInPosition();
	};

	MenuView.prototype.onOpenClick = function (callback)
	{
		this._onOpenClick.add(callback);
	};

	MenuView.prototype.onCloseClick = function (callback)
	{
		this._onCloseClick.add(callback);
	};


	this.MenuView = MenuView;
});