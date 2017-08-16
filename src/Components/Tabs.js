namespace('OUI.Components', function (window) 
{
	var Event       = window.Duct.Event;
	var TabsView 	= window.OUI.Views.TabsView;

	var classify 	= window.Classy.classify;


	/**
	 * @class OUI.Components.Tabs
	 */
	function Tabs(buttonsSelector) 
	{
		classify(this);
		
		this._view 		= new TabsView(this, buttonsSelector);
		this._onSelect 	= new Event('tabs.onSelect');
	}


	Tabs.prototype.onSelect = function (callback)
	{
		this._onSelect.add(callback);
	};

	Tabs.prototype.select = function (tabId) 
	{
		this._view.select(tabId);
		this._onSelect.trigger(tabId);
	};


	this.Tabs = Tabs;
});