# Tabs
Use this component to render on-page tabs.

## Usage

HTML:
```HTML
<ul>
    <li><a href="" data-oui-tab="my-tab-1">Tab 1</a></li>
    <li><a href="" data-oui-tab="my-tab-2">Tab 2</a></li>
    <li><a href="" data-oui-tab="my-tab-3">Tab 3</a></li>
</ul>
<div id="my-tab-1">Tab 1</div>
<div id="my-tab-2">Tab 2</div>
<div id="my-tab-3">Tab 3</div>
```

JavaScript:
```JavaScript
var Tabs = window.OUI.Components.Tabs;
            
var myTabs = new Tabs('ul a');

myTabs.onSelect(function (id) {
    console.log(id);
});

myTabs.select('my-tab-1');
```

On selection the component will add class *active* to the current selected button, and will add a *hidden* class to all containers expect for the selected one. 


## Events
1. onSelect