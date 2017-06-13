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
		/** @type {OUI.core.positioning.Point} */
		this._point = point;

		/** @type {OUI.core.positioning.Point} */
		this._size = size;


		this._intersectHorizontal = function (x, w)
		{
			return !(this.x()+this.w() < x || x+w < this.x());
		};

		this._intersectVertical = function (y, h)
		{
			return !(this.y()+this.h() < y || y+h < this.y());
		};

		
		this.x = function () 
		{
			return this._point.x;	
		};

		this.y = function () 
		{
			return this._point.y;	
		};

		this.w = function () 
		{
			return this._size.x;	
		};
		
		this.h = function () 
		{
			return this._size.y;	
		};
	};	
	
	Box.prototype.intersect = function (box) 
	{
		return this._intersectHorizontal(box.x(), box.w()) && this._intersectVertical(box.y(), box.h());
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
		this.x = x;
		this.y = y;
	};
	
	
	this.Point = Point;
});
namespace('OUI.core.positioning', function () {
	'use strict';

	
	/**
	 * @class OUI.core.positioning.Positioner
	 */
	var Positioner = function () 
	{
		
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
/**
 * Created by ivan on 12/06/17.
 */

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


	var Hbs = window.OUI.core.view.Hbs;
	var FadeRemove = window.OUI.core.view.FadeRemove;


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

		this.getContainer().find('div.wrapper').offset({
			top: 10,
			left: 10
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