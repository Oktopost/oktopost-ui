namespace('OUI.Views', function (window) 
{
	var is 			= window.Plankton.is;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Views.TabsView
	 */
	function TabsView(tabs, buttonsSelector) 
	{
		classify(this);

		this._tabs 			= tabs;

		this._activeClass 	= 'active';
		this._hiddenClass 	= 'hidden';
		this._dataAttr 		= 'oui-tab';

		this._buttons 		= $(buttonsSelector);

		this._buttons.on('click', this._onClick);
	}


	TabsView.prototype._onClick = function (e)
	{
		this._tabs.select($(e.target).data(this._dataAttr));
	};

	TabsView.prototype._forEachTab = function (tabId, index)
	{
		var tabButton 		= this._buttons.eq(index);
		var tabContainer 	= $('#' + tabButton.data(this._dataAttr));

		if (tabButton.data(this._dataAttr) === tabId)
		{
			tabButton.addClass(this._activeClass);
			tabContainer.removeClass(this._hiddenClass);
		}
		else
		{
			tabContainer.addClass(this._hiddenClass);	
		}
	};


	TabsView.prototype.select = function (tabId)
	{
		this._buttons.removeClass(this._activeClass);
		this._buttons.each(this._forEachTab.bind(this, tabId));
	};


	this.TabsView = TabsView;
});