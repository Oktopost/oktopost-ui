namespace('OUI.core.positioning', function (window) 
{
	'use strict';

	
	var is 			= plankton.is;
	var Point 		= OUI.core.positioning.Point;
	var Box 		= OUI.core.positioning.Box;
	var Positioner 	= OUI.core.positioning.Positioner;
	
	
	var defaults = {
		container: window,
		containerOffset: 0,
		relatedElement: null,
		relatedOffset: 0,
		targetElement: null,
		targetOffset: 0,
		isAbsolute: false
	};
	
	
	/**
	 * @class OUI.core.positioning.BasePreparedWithOffsets
	 */
	function BasePreparedWithOffsets(options)
	{
		Classy.classify(this);
		
		this.settings = $.extend(true, {}, defaults, options);
		
		this.settings.container = this._prepareElement(this.settings.container);
		this.settings.relatedElement = this._prepareElement(this.settings.relatedElement);
		this.settings.targetElement = this._prepareElement(this.settings.targetElement);
		
		this._getAreas = function (relatedBox, targetBox) {};
	}
	
	
	BasePreparedWithOffsets.prototype._prepareElement = function (el) 
	{
		if (el instanceof HTMLElement)
		{
			return $(el);
		}
		
		return el;
	};
	
	BasePreparedWithOffsets.prototype._settingsIsValid = function () 
	{		
		return (is.object(this.settings.container) || $.isWindow(this.settings.container)) 
			&& (is.object(this.settings.relatedElement))
			&& (is.object(this.settings.targetElement));
	};
		
	BasePreparedWithOffsets.prototype._applyOffset = function (position, offset) 
	{
		var leftWithOffset = position.left - offset;
		var topWithOffset = position.top - offset;

		return {
			left: leftWithOffset > 0 ? leftWithOffset : 0,
			top: topWithOffset > 0 ? topWithOffset : 0
		};
	};
		
	BasePreparedWithOffsets.prototype.getPositionWithOffset = function (el, offset) 
	{
		var position = {left: 0, top: 0};
		
		if (!$.isWindow(el))
		{
			position = el.offset();	
		}
		
		return this._applyOffset(position, offset);
	};
	
	BasePreparedWithOffsets.prototype._getSizeWithOffset = function (el, offset) 
	{
		if ($.isWindow(el))
		{
			el = $(el);
		}
		
		return {
			width: el.width() + offset * 2, 
			height: el.height() + offset * 2
		};
	};
	
	BasePreparedWithOffsets.prototype._getElementBox = function (el, offset) 
	{
		offset = offset || 0;
		
		if (el instanceof HTMLElement)
		{
			el = $(el);
		}
		
		var position = this.getPositionWithOffset(el, offset);

		var size = this._getSizeWithOffset(el, offset);
		
		return this._prepareBox(position.left, position.top, size.width, size.height);
	};
	
	BasePreparedWithOffsets.prototype._preparePoint = function (x, y) 
	{
		return new Point(x, y);	
	};
	
	BasePreparedWithOffsets.prototype._prepareBox = function(x, y, w, h)
	{
		var point = this._preparePoint(x, y);
		var size = this._preparePoint(w, h);
		
		return new Box(point, size);
	};
	
	BasePreparedWithOffsets.prototype._getContainerBox = function () 
	{
		if (this.settings.containerOffset > 0)
		{
			this.settings.containerOffset = this.settings.containerOffset * -1;
		}
		
		return this._getElementBox(this.settings.container, this.settings.containerOffset);
	};
	
	BasePreparedWithOffsets.prototype._getRelatedBox = function () 
	{
		return this._getElementBox(this.settings.relatedElement, this.settings.relatedOffset);
	};
	
	BasePreparedWithOffsets.prototype._getTargetBox = function () 
	{
		return this._getElementBox(this.settings.targetElement);
	};


	BasePreparedWithOffsets.prototype.getData = function () 
	{
		if (!this._settingsIsValid())
		{
			return {};
		}
		
		var containerBox = this._getContainerBox();
		var relatedBox = this._getRelatedBox();
		var targetBox = this._getTargetBox();

		return {
			container: containerBox,
			related: relatedBox,
			target: targetBox,
			areas : this._getAreas(relatedBox, targetBox)
		}
	};
	
	BasePreparedWithOffsets.prototype.getPosition = function () 
	{
		var positioner = new Positioner(this.getData());

		return positioner.getPosition(this.settings.isAbsolute);
	};
	

	this.BasePreparedWithOffsets = BasePreparedWithOffsets;
});