namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var ModalView   = window.OUI.Views.ModalView;
	
	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.Core.View.idGenerator;


	/**
	 * @class OUI.Components.Modal
	 */
	function Modal(contents, className) 
	{
		classify(this);

		this._id            = idGenerator('oui-modal');
		
		this._view     		= new ModalView(this, contents, className);

		this._onBeforeOpen 	= new Event('modal.beforeOpen');
		this._onAfterOpen 	= new Event('modal.afterOpen');
		this._onBeforeClose = new Event('modal.beforeClose');
		this._onAfterClose 	= new Event('modal.afterClose');

		this.onAfterOpen(this._view.onOpen);
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
		this._view.show();
		this._onAfterOpen.trigger(this._view.getContainer());
	};

	Modal.prototype.close = function() 
	{
		this._onBeforeClose.trigger(this._view.getContainer());
		this._view.remove();
		this._onAfterClose.trigger(this._id);
	};


	this.Modal = Modal;
});