# Menu
Use this component to render a pop up menu.

## Features
1. Click outside closes the menu
2. Positioned automatically 
3. Dynamic content
4. Supports layers
5. Event based using Oktopost-duct

## Usage

```JavaScript
var Menu = window.OUI.components.Menu;

var menuButton = $('a.menu-button');
var menuContent = $('div.menu-content');
var menuClass = 'my-menu-class';

var myMenu = new Menu(menuButton, menuContent, menuClass);
```

## Events

1. onAfterOpen
2. onAfterClose
3. onBeforeClose
4. onBeforeOpen

### Example

```JavaScript

var myMenu = new Menu(menuButton, menuContent, menuClass);

myMenu.onAfterOpen(function (container) {
	console.log('do something');
});
```