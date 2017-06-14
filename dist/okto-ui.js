(function () {
	window.OUI = new Namespace(window);
	window.namespace = OUI.getCreator();
})();
namespace('OUI.core.positioning', function () {
	'use strict';

	
	/**
	 * @class OUI.core.positioning.Box
	 */
	var Box = function (point, size) 
	{
		Classy.classify(this);
		
		/** @type {OUI.core.positioning.Point} */
		this._point = point;

		/** @type {OUI.core.positioning.Point} */
		this._size = size;
	};	
	
	Box.prototype._debug = function () 
	{
		console.log(this.x(), this.y(), this.w(), this.h());	
	};
	
	Box.prototype._isIntersectHorizontal = function (x, w)
	{
		return !(this.x()+this.w() <= x || x+w <= this.x());
	};

	Box.prototype._isIntersectVertical = function (y, h)
	{
		return !(this.y()+this.h() <= y || y+h <= this.y());
	};
	
	Box.prototype._crossHorizontalBorder = function (x, w)
	{
		return ((this.x() < x) && (this.x() + this.w() > x))
			|| (((this.x() + this.w()) > (x + w)) && (this.x() > x));
	};

	Box.prototype._crossVerticalBorder = function (y, h)
	{
		return ((this.y() < y) && (this.y() + this.h() > y))
			|| ((this.y() + this.h() > y + h) && (this.y() > y));
	};
	
	Box.prototype._intersectHorizontal = function (x, w) 
	{
		if (x > this.x())
		{
			var widthSubtract = x - this.x();
			this._point.x = x;
			this._size.x -= widthSubtract > 0 ? widthSubtract : -widthSubtract; 
		}
		
		if ((x + w) < (this.x() + this.w()))
		{
			this._size.x = x + w - this.x();
		}
	};
	
	Box.prototype._intersectVertical = function (y, h) 
	{
		if (y > this.y())
		{
			var heightSubtract = y - this.y();
			this._point.y = y;
			this._size.y -= heightSubtract > 0 ? heightSubtract : -heightSubtract; 
		}
		
		if ((y + h) < (this.y() + this.h()))
		{
			this._size.y = y + h - this.y();
		}
	};
		
	
	Box.prototype.x = function ()
	{
		return this._point.x;	
	};

	Box.prototype.y = function ()
	{
		return this._point.y;	
	};

	Box.prototype.w = function ()
	{
		return this._size.x;	
	};
		
	Box.prototype.h = function ()
	{
		return this._size.y;	
	};
	
	Box.prototype.isIntersect = function (box) 
	{
		return this._isIntersectHorizontal(box.x(), box.w()) && this._isIntersectVertical(box.y(), box.h());
	};
	
	Box.prototype.isCrossBorder = function (box) 
	{
		return this._crossHorizontalBorder(box.x(), box.w()) || this._crossVerticalBorder(box.y(), box.h());
	};
	
	Box.prototype.intersect = function (box) 
	{
		this._intersectHorizontal(box.x(), box.w());
		this._intersectVertical(box.y(), box.h());
	};
	
	
	this.Box = Box;
});
namespace('OUI.core.positioning', function () {
	'use strict';

	/**
	 * @class OUI.core.positioning.Point
	 */
	var Point = function (x, y) 
	{	
		Classy.classify(this);
		
		this.x = x;
		this.y = y;
	};
	
	
	this.Point = Point;
});
namespace('OUI.core.positioning', function () 
{
	'use strict';
	
	
	var is 		= plankton.is;
	var Box 	= OUI.core.positioning.Box;
	var Point	= OUI.core.positioning.Point;
	
	
	/**
	 * @class OUI.core.positioning.Positioner
	 */
	var Positioner = function (data) 
	{	
		Classy.classify(this);
		
		this.container = data.container;
		this.related = data.related;
		this.target = data.target;
		this.areas = data.areas;
		
		this.absolutePosition = null;
		this.relativePosition = null;
	};
	
	
	Positioner.prototype._transformTarget = function (area, initialX, initialY) 
	{
		initialX = initialX || 0;
		initialY = initialY || 0;
		
		var newX = area.box.x() + initialX;
		var newY = area.box.y() + initialY;
		
		return new Box(new Point(newX, newY), new Point(this.target.w(), this.target.h()));
	};
	
	Positioner.prototype._prepareArea = function (area) 
	{
		if (!area.box.isIntersect(this.container))
		{
			return false;
		}
		
		if (area.box.isCrossBorder(this.container))
		{
			area.box.intersect(this.container);
		}
		
		return !(area.box.w() < this.target.w() || area.box.h() < this.target.h());
	};
	
	Positioner.prototype._subtractContainer = function (point) 
	{
		return new Point(point.x - this.container.x(), point.y - this.container.y());
	};
	
	
	Positioner.prototype.tryPutTargetInArea = function (area) 
	{
		if (!this._prepareArea(area))
		{
			return false;
		}
		
		var target = this._transformTarget(area, area.initial.x, area.initial.y);
		
		if (target.isCrossBorder(area.box))
		{
			target = this._transformTarget(area);
			
			if (target.isCrossBorder(area.box))
			{
				return false;
			}
		}
		
		this.absolutePosition = new Point(target.x(), target.y());
		this.relativePosition = new Point(target.x() - this.related.x(), target.y() - this.related.y());
		
		return true;
	};
		
	Positioner.prototype.getPosition = function (isAbsolute) 
	{
		isAbsolute = isAbsolute || false;
		
		if (is.empty(this.areas))
			return false;

		var index;
		
		for (index = 0; index < this.areas.length; ++index)
		{
			if (this.tryPutTargetInArea(this.areas[index]))
			{
				break;
			}
		}
		
		if (is.null(this.absolutePosition))
		{
			return null;
		}
		
		if (isAbsolute)
		{
			return this._subtractContainer(this.absolutePosition);
		}
		
		return this._subtractContainer(this.relativePosition);
	};
	
	
	this.Positioner = Positioner;
});
namespace('OUI.core.view', function (window) {
	'use strict';


	/**
	 * @class OUI.core.view.FadeRemove
	 */
	function FadeRemove($container, extraClass, delay)
	{
		extraClass = extraClass || 'removing';
		delay = delay || 200;

		$container.addClass(extraClass);

		setTimeout(function () {
			$container.remove();
		}, delay);
	};
	

	this.FadeRemove = FadeRemove;
});
namespace('OUI.core.view', function (window) {
	'use strict';


	/**
	 * @class OUI.core.view.Hbs
	 */
	function Hbs()
	{
		Classy.classify(this);
	};


	Hbs.prototype.get = function (name, options)
	{
		options = options || {};

		return window.Handlebars['templates'][name].hbs(options);
	};
	

	this.Hbs = Hbs;
});
namespace('OUI.core.view', function (window) {
	'use strict';


	/**
	 * @class OUI.core.view.IdGenerator
	 */
	function IdGenerator(baseName)
	{
		return baseName + '-' + Math.floor(Date.now());
	};
	

	this.IdGenerator = IdGenerator;
});
// namespace('OUI.core.positioning.prepared', function (window) 
// {
// 	'use strict';
//
//
// 	var BasePreparedWithOffsets = OUI.core.positioning.prepared.base.BasePreparedWithOffsets;
//
//
// 	var defaults = {
// 		container: window,
// 		containerOffset: 0,
// 		relatedElement: null,
// 		relatedOffset: 0,
// 		targetElement: null,
// 		targetOffset: 0,
// 		isAbsolute: false
// 	};
//
//
// 	/**
// 	 * @class OUI.core.positioning.prepared.AroundWithCornersPosition
// 	 */
// 	function AroundWithCornersPosition(options)
// 	{
// 		Classy.classify(this);
//
// 		var self = this;
//
// 		var settings = $.extend(true, {}, defaults, options);
//
// 		BasePreparedWithOffsets.call(self, settings);
//
//
// 		this._getVerticalSide = function (relatedBox, targetBox, direction) 
// 		{
// 			if (direction === 1)
// 			{
// 				var y = relatedBox.y() + relatedBox.h() +  self.settings.targetOffset;
// 			}
// 			else
// 			{
// 				y = relatedBox.y() - targetBox.h() -  self.settings.targetOffset;
// 			}
//
// 			var x = relatedBox.x() - targetBox.w();
//
// 			var h = targetBox.h();
// 			var w = relatedBox.w() + (targetBox.w() * 2);
//
// 			return {
// 				box: this._prepareBox(x, y, w, h),
// 				initial: this._preparePoint(0 , 0)
// 			}
// 		};
//
// 		this._getHorizontalSide = function (relatedBox, targetBox, direction) 
// 		{
// 			if (direction === 1)
// 			{
// 				var x = relatedBox.x() + relatedBox.w() +  self.settings.targetOffset;
// 			}
// 			else
// 			{
// 				x = relatedBox.x() - targetBox.w() -  self.settings.targetOffset;
// 			}
//
// 			var y = relatedBox.y() - targetBox.h();
//
// 			var w = targetBox.w();
// 			var h = relatedBox.h() + (targetBox.h() * 2);
//
// 			return {
// 				box: this._prepareBox(x, y, w, h),
// 				initial: this._preparePoint(0, 0)
// 			}
// 		};
//
// 		this._getAreas = function (relatedBox, targetBox) 
// 		{
// 			return [
// 				this._getVerticalSide(relatedBox, targetBox, 1),
// 				this._getVerticalSide(relatedBox, targetBox, -1),
// 				this._getHorizontalSide(relatedBox, targetBox, 1),
// 				this._getHorizontalSide(relatedBox, targetBox, -1)
// 			];
// 		};	
//
// 		return this.getPosition();
// 	}
//
//
// 	this.AroundWithCornersPosition = AroundWithCornersPosition;
//
//
// 	this.AroundWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
// 	this.AroundWithCornersPosition.prototype.constructor = this.AroundWithCornersPosition;
//	
// });
namespace('OUI.core.positioning.prepared.base', function (window) 
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
	 * @class OUI.core.positioning.prepared.base.BasePreparedWithOffsets
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
namespace('OUI.core.positioning.prepared', function (window) 
{
	'use strict';

	
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.base.BasePreparedWithOffsets;
	
	
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
	 * @class OUI.core.positioning.prepared.SidesWithCornersPosition
	 */
	function SidesWithCornersPosition(options)
	{
		Classy.classify(this);
		
		var self = this;
		
		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);
		
			
		this._getSide = function (relatedBox, targetBox, direction) 
		{
			if (direction === 1)
			{
				var x = relatedBox.x() + relatedBox.w() +  self.settings.targetOffset;
			}
			else
			{
				x = relatedBox.x() - targetBox.w() -  self.settings.targetOffset;
			}
			
			var y = relatedBox.y() - targetBox.h();

			var w = targetBox.w();
			var h = relatedBox.h() + (targetBox.h() * 2);

			return {
				box: this._prepareBox(x, y, w, h),
				initial: this._preparePoint(0, 0)
			}
		};
		
		this._getAreas = function (relatedBox, targetBox) 
		{
			return [
				this._getSide(relatedBox, targetBox, 1),
				this._getSide(relatedBox, targetBox, -1)
			];
		};	
			
		
		return this.getPosition();
	}
	
	
	this.SidesWithCornersPosition = SidesWithCornersPosition;
	
	
	this.SidesWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.SidesWithCornersPosition.prototype.constructor = this.SidesWithCornersPosition;
});
namespace('OUI.core.positioning.prepared', function (window) 
{
	'use strict';

	
	var BasePreparedWithOffsets = OUI.core.positioning.prepared.base.BasePreparedWithOffsets;
	
	
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
	 * @class OUI.core.positioning.prepared.TopBottomWithCornersPosition
	 */
	function TopBottomWithCornersPosition(options)
	{
		Classy.classify(this);
		
		var self = this;
		
		var settings = $.extend(true, {}, defaults, options);

		BasePreparedWithOffsets.call(self, settings);
		
			
		this._getSide = function (relatedBox, targetBox, direction) 
		{
			if (direction === 1)
			{
				var y = relatedBox.y() + relatedBox.h() +  self.settings.targetOffset;	
			}
			else
			{
				y = relatedBox.y() - targetBox.h() -  self.settings.targetOffset;
			}
			
			var x = relatedBox.x() - targetBox.w();
	
			var h = targetBox.h();
			var w = relatedBox.w() + (targetBox.w() * 2);
			
			var initialPoint = this._preparePoint(targetBox.w() + self.settings.relatedOffset , 0);
	
			return {
				box: this._prepareBox(x, y, w, h),
				initial: initialPoint
			}
		};
		
		this._getAreas = function (relatedBox, targetBox) 
		{
			return [
				this._getSide(relatedBox, targetBox, 1),
				this._getSide(relatedBox, targetBox, -1)
			];
		};	
			
		return this.getPosition();
	}
	
	
	this.TopBottomWithCornersPosition = TopBottomWithCornersPosition;
	
	
	this.TopBottomWithCornersPosition.prototype = Object.create(BasePreparedWithOffsets.prototype);
	this.TopBottomWithCornersPosition.prototype.constructor = this.TopBottomWithCornersPosition;
});
namespace('OUI.views', function (window) {
	'use strict';


	var Hbs = window.OUI.core.view.Hbs;
	var FadeRemove = window.OUI.core.view.FadeRemove;


	/**
	 * @class OUI.views.DialogView
	 */
	function DialogView(dialog, okButtonText, cancelButtonText) 
	{
		Classy.classify(this);

		this._dialog 			= dialog;
		this._okButtonText 		= okButtonText || 'OK';
		this._cancelButtonText 	= cancelButtonText || 'Cancel';
		this._okButton 			= 'a.ok-button';
		this._cancelButton 		= 'a.cancel-button';
		this._view 				= new Hbs();
	};


	DialogView.prototype.getContainer = function ()
	{
		return $('#' + this._dialog.getId());
	};

	DialogView.prototype.bindEvents = function ()
	{
		var dialog = this._dialog;
		var $container = this.getContainer();

		$container.find(this._okButton).on('click', function (e) {
			e.preventDefault();
			dialog.confirm();
		});

		$container.find(this._cancelButton).on('click', function (e) {
			e.preventDefault();
			dialog.cancel();
		});
	};

	DialogView.prototype.show = function (message)
	{
		$('body').append(this._view.get('dialog', {
			id: this._dialog.getId(),
			message: message,
			okButtonText: this._okButtonText,
			cancelButtonText: this._cancelButtonText
		}));
	};

	DialogView.prototype.remove = function ()
	{
		FadeRemove(this.getContainer());
	};

	
	this.DialogView = DialogView;
});
namespace('OUI.views', function (window) {
	'use strict';


	var Hbs 							= window.OUI.core.view.Hbs;
	var FadeRemove 						= window.OUI.core.view.FadeRemove;
	var SidesWithCornersPosition 		= window.OUI.core.positioning.prepared.SidesWithCornersPosition;
	var TopBottomWithCornersPosition 	= window.OUI.core.positioning.prepared.TopBottomWithCornersPosition;


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
namespace('OUI.views', function (window) {
	'use strict';


	var Hbs = window.OUI.core.view.Hbs;


	/**
	 * @class OUI.views.ModalView
	 */
	function ModalView(modal, contents, className) 
	{
		Classy.classify(this);

		className = className || '';

		this._modal 		= modal;
		this._underlay 		= 'div.oui-modal-underlay';
		this._closeButton 	= 'a[data-oui-modal-close]';
		
		this._escapeEvent 	= 'keyup.' + modal.getId();

		this._className		= className;
		this._contents		= contents;

		this._view 			= new Hbs();
	};
	

	ModalView.prototype._close = function ()
	{
		$(document).off(this._escapeEvent);
		this._modal.close();
	};


	ModalView.prototype.getContainer = function ()
	{
		return $('#' + this._modal.getId());
	};

	ModalView.prototype.onOpen = function ()
	{
		var modalView = this;
		var selectors = this._closeButton + ',' + this._underlay;

		$(document).on(this._escapeEvent, function (e) 
		{
			if (e.keyCode === 27) 
				modalView._close();
		});

		this.getContainer().on('click', selectors, function (e) 
		{
			e.preventDefault();
			modalView._close();
		});
	};

	ModalView.prototype.show = function () 
	{
		var position = {
			top: 20,
			left: 20
		};

		$('body').append(this._view.get('modal', {
			id: this._modal.getId(),
			contents: this._contents,
			extraClass: this._className,
			position: position
		}));
	};

	ModalView.prototype.remove = function ()
	{
		this.getContainer().remove();
	};

	
	this.ModalView = ModalView;
});
namespace('OUI.views', function (window) {
	'use strict';


	var Hbs = window.OUI.core.view.Hbs;
	var FadeRemove = window.OUI.core.view.FadeRemove;


	/**
	 * @class OUI.views.ToastView
	 */
	function ToastView(toast, delay)
	{
		Classy.classify(this);

		delay = delay || 5000;

		this._toast 	= toast;
		this._view 		= new Hbs();
		this._delay 	= delay;

		this._dismiss 	= 'a[data-oui-dismiss]';
	};

	ToastView.prototype.bindDismiss = function ()
	{
		var toast = this._toast;

		this.getContainer().on('click', this._dismiss, function (e) {
			e.preventDefault();
			toast.dismiss();
		});
	};

	ToastView.prototype.show = function (message)
	{
		this._onAdd.add(callback);
	};

	ToastView.prototype.getContainer = function ()
	{
		return $('#' + this._toast.getId());
	};

	ToastView.prototype.show = function (message)
	{
		var view = this;

		$('body').append(this._view.get('toast', {
			message: message,
			id: this._toast.getId()
		}));

		setTimeout(function () {
			FadeRemove(view.getContainer());
		}, this._delay);
	};

	ToastView.prototype.remove = function ()
	{
		FadeRemove(this.getContainer());
	};


	this.ToastView = ToastView;
});
namespace('OUI.components', function (window) {
	'use strict';


	var Event       = window.duct.Event;
	var DialogView 	= window.OUI.views.DialogView;
	var IdGenerator = window.OUI.core.view.IdGenerator;


	/**
	 * @class OUI.components.Dialog
	 */
	function Dialog(okButtonText, cancelButtonText) 
	{
		Classy.classify(this);

		this._id 			= IdGenerator('oui-dialog');
		this._dialogView 	= new DialogView(this, okButtonText, cancelButtonText);

		this._onCancel 		= new Event('dialog.onCancel');
		this._onConfirm 	= new Event('dialog.onConfirm');
		this._onOpen 		= new Event('dialog.onOpen');

		this.onOpen(this._dialogView.bindEvents);
		this.onCancel(this._dialogView.remove);
		this.onConfirm(this._dialogView.remove);
	};

	Dialog.prototype.getId = function ()
	{
		return this._id;
	};

	Dialog.prototype.onOpen = function (callback)
	{
		this._onOpen.add(callback);
	};

	Dialog.prototype.onCancel = function (callback)
	{
		this._onCancel.add(callback);
	};

	Dialog.prototype.onConfirm = function (callback)
	{
		this._onConfirm.add(callback);
	};

	Dialog.prototype.open = function (message) 
	{
		this._dialogView.show(message);
		this._onOpen.trigger(this._dialogView.getContainer());
	};

	Dialog.prototype.confirm = function () 
	{
		this._onConfirm.trigger(this._id);
	};

	Dialog.prototype.cancel = function () 
	{
		this._onCancel.trigger(this._id);
	};


	this.Dialog = Dialog;
});
namespace('OUI.components', function (window) {
	'use strict';


	var Event 		= window.duct.Event;
	var IdGenerator = window.OUI.core.view.IdGenerator;
	var MenuView 	= window.OUI.views.MenuView;


	/**
	 * @class OUI.components.Menu
	 */
	function Menu($toggleElement, contents, extraClass)
	{
		Classy.classify(this);

		this._id 			= IdGenerator('oui-menu');
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
namespace('OUI.components', function (window) {
	'use strict';


	var Event       = window.duct.Event;
	var ModalView   = window.OUI.views.ModalView;
	var IdGenerator = window.OUI.core.view.IdGenerator;


	/**
	 * @class OUI.components.Modal
	 */
	function Modal(contents, className) 
	{
		Classy.classify(this);

		this._id            = IdGenerator('oui-modal');
		
		this._modalView     = new ModalView(this, contents, className);

		this._onBeforeOpen 	= new Event('modal.beforeOpen');
		this._onAfterOpen 	= new Event('modal.afterOpen');
		this._onBeforeClose = new Event('modal.beforeClose');
		this._onAfterClose 	= new Event('modal.afterClose');

		this.onAfterOpen(this._modalView.onOpen);
	};

	Modal.prototype.getId = function ()
	{
		return this._id;
	};

	Modal.prototype.onBeforeOpen = function (callback)
	{
		this._onBeforeOpen.add(callback);
	};

	Modal.prototype.onAfterOpen = function (callback)
	{
		this._onAfterOpen.add(callback);
	};

	Modal.prototype.onBeforeClose = function (callback)
	{
		this._onBeforeClose.add(callback);
	};

	Modal.prototype.onAfterClose = function (callback)
	{
		this._onAfterClose.add(callback);
	};

	Modal.prototype.open = function() 
	{
		this._onBeforeOpen.trigger(this._id);
		this._modalView.show();
		this._onAfterOpen.trigger(this._modalView.getContainer());
	};

	Modal.prototype.close = function() 
	{
		this._onBeforeClose.trigger(this._modalView.getContainer());
		this._modalView.remove();
		this._onAfterClose.trigger(this._id);
	};


	this.Modal = Modal;
});
namespace('OUI.components', function (window) {
	'use strict';


	var Event = window.duct.Event;
	var IdGenerator = window.OUI.core.view.IdGenerator;
	var ToastView = window.OUI.views.ToastView;


	/**
	 * @class OUI.components.Toast
	 */
	function Toast(delay)
	{
		Classy.classify(this);

		this._id 		= IdGenerator('oui-toast');

		this._toastView = new ToastView(this, delay);
				
		this._onAdd 	= new Event('toast.onAdd');
		this._onDismiss = new Event('toast.onDismiss');

		this.onAdd(this._toastView.bindDismiss);
	};


	Toast.prototype.getId = function ()
	{
		return this._id;
	};

	Toast.prototype.onAdd = function (callback)
	{
		this._onAdd.add(callback);
	};

	Toast.prototype.onDismiss = function (callback)
	{
		this._onDismiss.add(callback);
	};


	Toast.prototype.add = function (message)
	{
		this._toastView.show(message);
		this._onAdd.trigger(this._id);
	};

	Toast.prototype.dismiss = function ()
	{
		this._toastView.remove();
		this._onDismiss.trigger(this._id);
	};


	this.Toast = Toast;
});