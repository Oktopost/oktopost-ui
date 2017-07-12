namespace('OUI.components', function (window) 
{
	var Event       = window.Duct.Event;
	var ModalView   = window.OUI.views.ModalView;
	
	var classify 	= window.Classy.classify;
	var idGenerator = window.OUI.core.view.idGenerator;


	/**
	 * @class OUI.components.Modal
	 */
	function Modal(contents, className) 
	{
		classify(this);

		this._id            = idGenerator('oui-modal');
		
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