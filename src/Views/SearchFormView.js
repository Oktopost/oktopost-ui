namespace('OUI.Views', function (window) 
{
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var is			= window.Plankton.is;


	function SearchFormView(form, container, value, param, placeholder)
	{
		classify(this);

		this._form 			= form;
		this._container 	= $(container);

		this._input 		= 'input[type="text"]';
		this._clearButton 	= '.toggle-button';
		
		this._cancelIcon 	= 'icon-cancel-squared';
		this._searchIcon	= 'icon-search';
		
		this._inputEl		= null;

		this.render(value, param, placeholder);
		this.bindEvents();
	}
	
	
	SearchFormView.prototype._onClearButtonClick = function ()
	{
		var button 	= this._container.find(this._clearButton);
		
		if (!button.hasClass(this._cancelIcon))
			return;
		
		this._form.clear();
	};
	
	SearchFormView.prototype._getInputEl = function()
	{
		if (!is(this._inputEl))
			this._inputEl = this._container.find(this._input);
		
		return this._inputEl;
	};
	
	SearchFormView.prototype._toggleIconSearch = function(button)
	{
		button.removeClass(this._cancelIcon).addClass(this._searchIcon);
	};
	
	SearchFormView.prototype._toggleIconCancel = function(button)
	{
		button.removeClass(this._searchIcon).addClass(this._cancelIcon);
	};
	
	SearchFormView.prototype._transformIconByEvent = function(e, button)
	{
		if (!is.object(e) || !is(e.target) || !is(e.target.value))
		{
			this._toggleIconSearch(button)
		}
		else
		{
			this._toggleIconCancel(button);
		}
	};
	
	SearchFormView.prototype._transformIconByValue = function(button)
	{
		if (!is(this._getInputEl().val()))
		{
			this._toggleIconSearch(button);
		}
		else
		{
			this._toggleIconCancel(button);
		}
	};


	SearchFormView.prototype.getValue = function ()
	{
		return this._container.find(this._input).val();
	};

	SearchFormView.prototype.clearInput = function ()
	{
		var button = this._container.find(this._clearButton);

		this._getInputEl().val('');
		button.removeClass(this._cancelIcon).addClass(this._searchIcon);
	};

	SearchFormView.prototype.transformIcon = function (e)
	{
		var button 	= this._container.find(this._clearButton);
		
		if (is.object(e))
		{
			this._transformIconByEvent(e, button);
		}
		else
		{
			this._transformIconByValue(button);
		}
	};

	SearchFormView.prototype.bindEvents = function ()
	{
		this._container.on('input', this._input, this._form.input);
		this._container.on('click', this._clearButton, this._onClearButtonClick);
	};

	SearchFormView.prototype.render = function (value, param, placeholder)
	{
		this._container.append(hbs('search-form', {
			value: value,
			param: param,
			placeholder: placeholder			
		}));

		this.transformIcon();
	};


	this.SearchFormView = SearchFormView;
});