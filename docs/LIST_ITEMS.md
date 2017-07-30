# List Items
Use this component to render list items.

## Features
1. Accepts Handlebars templates
3. onRender event using Oktopost-Duct library

## Usage
JavaScript:

```JavaScript
var ListItems = OUI.components.list.ListItems;

var items = new ListItems($('div.list-container'));
var template = window.Handlebars['template']['templateDir']['templateName'];

getDataFromServer(function (json) 
{
	items.renderHbs(template, json.Items);
});
```

HTML:
```HTML
<div class="list-container"></div>
```

Handlebars template:
```HTML
<div class="item" id="{{id}}">
	...
</div>
```

Items:
```Json
[
	{id: 'item-1'},
	{id: 'item-2'}
]
```

## Events
1. onRender