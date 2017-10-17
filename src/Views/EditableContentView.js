namespace('OUI.Views', function (window)
{
	var is			= window.Plankton.is;
	var Event 		= window.Duct.Event;
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Components.EditableContentView
	 */
	function EditableContentView(selector, event)
	{
		classify(this);
		
		this._event = is.string.notEmpty(event) ? event : 'click';

		this._element = is.object(selector) ? selector : $(selector);

		this._content = null;
		this._onEditActivate = new Event('EditableContentView.onEditActivate');
		this._onEditFinished = new Event('EditableContentView.onEditFinished');
				
		this._onContentChanged = new Event('EditableContentView.onContentChanged');
		
		this._bindEnableEvent();
	}
	
	
	EditableContentView.prototype._bindEnableEvent = function ()
	{
		var activateEdit = this._onEditActivate;
		
		this._element.on(this._event, function (e)
		{
			activateEdit.trigger();
			$(this).focus();
		});
	};
	
	EditableContentView.prototype._editFinished = function (el)
	{
		if (el.text() !== this._content)
		{
			this._onContentChanged.trigger(this._element, this._element.text());
		}
		
		this._onEditFinished.trigger(this._element);
	};
	
	EditableContentView.prototype._bindEvents = function ()
	{
		var editFinished = this._editFinished;
		
		this._element.on('blur', function (e)
		{
			editFinished($(this));
		});
		
		this._element.on('keydown', function (e)
		{
			if (e.keyCode === 13)
			{
				$(this).blur();
			}
		});
	};
	
	EditableContentView.prototype._unbindEvents = function ()
	{
		this._element.off('blur');
		this._element.off('keydown');
	};
	
	
	EditableContentView.prototype.onEditActivate = function (callback)
	{
		this._onEditActivate.add(callback);
	};
	
	EditableContentView.prototype.onEditFinished = function (callback)
	{
		this._onEditFinished.add(callback);
	};
	
	EditableContentView.prototype.onContentChanged = function (callback)
	{
		this._onContentChanged.add(callback);
	};
	
	EditableContentView.prototype.getElement = function ()
	{
		return this._element;	
	};
	
	EditableContentView.prototype.enable = function ()
	{
		if (this._element.attr('contenteditable') === 'true')
		{
			return;
		}
		
		this._content = this._element.text();
		
		this._element.attr('contenteditable', 'true');	
		
		this._bindEvents();
	};
	
	EditableContentView.prototype.disable = function ()
	{
		if (this._element.attr('contenteditable') === 'false')
		{
			return;
		}
		
		this._content = null;
		
		this._element.removeAttr('contenteditable');
		
		this._unbindEvents();
	};
	
	
	this.EditableContentView = EditableContentView;
});