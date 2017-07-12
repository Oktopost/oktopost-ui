namespace('OUI.views', function (window) 
{
	var hbs 		= window.OUI.core.view.hbs;
	var classify 	= window.Classy.classify;


	function SearchFormView(searchForm, container, placeholder)
	{
		classify(this);

		this._searchForm 		= searchForm;
		this._placeholder 		= placeholder;
		this._container 		= $(container);

		this._searchInput 		= 'input[type="text"]';
		this._clearButton 		= 'button.tcon';
		this._animationClass 	= 'tcon-transform';

		this.render();
		this.bindEvents();
	};

	SearchFormView.prototype.clearInput = function (button)
	{
		this._container.find(this._searchInput).val('');
		button.removeClass(this._animationClass);
	};

	SearchFormView.prototype.transformIcon = function (input)
	{
		var button = this._container.find(this._clearButton);

		if (input.val().length > 0)
		{
			button.addClass(this._animationClass);
		}
		else
		{
			button.removeClass(this._animationClass);	
		}
	};

	SearchFormView.prototype.bindEvents = function ()
	{
		var searchForm = this._searchForm;
		
		this._container.on('keyup', this._searchInput, function () 
		{
			searchForm.keyup($(this));
		});

		this._container.on('keydown', this._searchInput, function () 
		{
			searchForm.keydown($(this));
		});

		this._container.on('change', this._searchInput, function () 
		{
			searchForm.change($(this));
		});

		this._container.on('click', this._clearButton, function () 
		{
			searchForm.clear($(this));
		});
	};

	SearchFormView.prototype.render = function ()
	{
		this._container.append(hbs('search-form', {
			placeholder: this._placeholder
		}));
	};


	this.SearchFormView = SearchFormView;
});