namespace('OUI.views', function (window) 
{
	var hbs 		= window.OUI.core.view.hbs;
	var classify 	= window.Classy.classify;


	function SearchFormView(form, container, value, param, placeholder)
	{
		classify(this);

		this._form 			= form;
		this._container 	= $(container);

		this._input 		= 'input[type="text"]';
		this._clearButton 	= 'i.toggle-button';
		
		this._cancelIcon 	= 'icon-cancel-squared';
		this._searchIcon	= 'icon-search';

		this.render(value, param, placeholder);
		this.bindEvents();
	}


	SearchFormView.prototype.getValue = function ()
	{
		return this._container.find(this._input).val();
	};

	SearchFormView.prototype.clearInput = function (e)
	{
		var button = this._container.find(this._clearButton);

		this._container.find(this._input).val('');
		button.removeClass(this._cancelIcon).addClass(this._searchIcon);
	};

	SearchFormView.prototype.transformIcon = function (e)
	{
		var button 	= this._container.find(this._clearButton);
		var input 	= this._container.find(this._input);

		button.removeClass(this._searchIcon).addClass(this._cancelIcon);
	};

	SearchFormView.prototype.bindEvents = function ()
	{
		this._container.on('input', this._input, this._form.input);
		this._container.on('click', this._clearButton, this._form.clear);
		this._container.on('submit', function (e) { e.preventDefault(); });
	};

	SearchFormView.prototype.render = function (value, param, placeholder)
	{
		this._container.append(hbs('search-form', {
			value: value,
			param: param,
			placeholder: placeholder			
		}));

		if (value.length)
		{
			this._container.find(this._clearButton).addClass(this._animationClass);
		}
	};


	this.SearchFormView = SearchFormView;
});