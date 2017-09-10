namespace('OUI.Views.List', function (window) 
{
	var classify 	= window.Classy.classify;
	var foreach 	= window.Plankton.foreach;
	var fadeRemove 	= window.OUI.Core.View.fadeRemove;
	var Event 		= window.Duct.Event;


	/**
	 * @class OUI.Views.List.ListItemsView
	 */
	function ListItemsView(container) 
	{
		classify(this);

		this._container 	= $(container);
		this._loadingClass 	= 'loading';
		this._onClick 		= new Event('ListItemsView.onClick');
	}


	ListItemsView.prototype._handleItemClick = function (e)
	{
		var elem = $(e.target);

		if (!elem.is(':checkbox'))
		{
			this._onClick.trigger(elem.data('id'));
		}
	};
	
	
	ListItemsView.prototype.getItemsWrapper = function ()
	{
		var container = this._container;
		return container.parent()[0].tagName === 'TABLE' ? container.parent() : container;
	};

	ListItemsView.prototype.getContainer = function ()
	{
		return this._container;
	};

	ListItemsView.prototype.render = function (items, template)
	{
		var container = this._container;

		container.empty();
		this.getItemsWrapper().removeClass(this._loadingClass);
		
		foreach(items, function (item) 
		{
			container.append(template.hbs(item));
		});
		
		this._container.find('[data-id]').on('click', this._handleItemClick);
	};

	ListItemsView.prototype.highlightTerm = function (term)
	{
		if (term.length)
		{
			this._container.highlight(term);
		}
		else
		{
			this._container.unhighlight();
		}
	};

	ListItemsView.prototype.removeItems = function (ids)
	{
		foreach(ids, function (id) 
		{
			fadeRemove($('[data-id="' + id + '"]'));
		});
	};

	ListItemsView.prototype.setLoading = function ()
	{
		this.getItemsWrapper().addClass(this._loadingClass);
	};

	ListItemsView.prototype.onClick = function (callback)
	{
		this._onClick.add(callback);
	};

	
	this.ListItemsView = ListItemsView;
});