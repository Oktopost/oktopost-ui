namespace('OUI.Components', function (window)
{
	var Event = window.Duct.Event;
	var EditableContentView = window.OUI.Views.EditableContentView;

	var classify = window.Classy.classify;


	/**
	 * @class OUI.Components.EditableContent
	 */
	function EditableContent(selector, event)
	{
		classify(this);
		
		this._view = new EditableContentView(selector, event);
		
		this._view.onContentChanged(this._contentChanged);
		this._view.onEditActivate(this.enable);
		this._view.onEditFinished(this.disable);
		
		this._onContentChanged = new Event('EditableContent.onContentChange');
		
		this._onBeforeEnable 	= new Event('EditableContent.onBeforeEnable');
		this._onAfterEnable 	= new Event('EditableContent.onAfterEnable');
		this._onBeforeDisable	= new Event('EditableContent.onBeforeDisable');
		this._onAfterDisable	= new Event('EditableContent.onAfterDisabled');
	}
	
	
	EditableContent.prototype._contentChanged = function (element, content)
	{
		this._onContentChanged.trigger(element, content);	
	};
	
	
	EditableContent.prototype.onChange = function (callback)
	{
		this._onContentChanged.add(callback);
	};
	
	EditableContent.prototype.onBeforeEnable = function (callback)
	{
		this._onBeforeEnable.add(callback);
	};
	
	EditableContent.prototype.onAfterEnable = function (callback)
	{
		this._onAfterEnable.add(callback);
	};
	
	EditableContent.prototype.onBeforeDisable = function (callback)
	{
		this._onBeforeDisable.add(callback);
	};
	
	EditableContent.prototype.onAfterDisabled = function (callback)
	{
		this._onAfterDisable.add(callback);
	};
	
	EditableContent.prototype.enable = function ()
	{
		this._onBeforeEnable.trigger(this._view.getElement());
		
		this._view.enable();
		
		this._onAfterEnable.trigger(this._view.getElement());
	};
	
	EditableContent.prototype.disable = function ()
	{
		this._onBeforeDisable.trigger(this._view.getElement());
		
		this._view.disable();
		
		this._onAfterDisable.trigger(this._view.getElement());
	};
	
	
	this.EditableContent = EditableContent;
});