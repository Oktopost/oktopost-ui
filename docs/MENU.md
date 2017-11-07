# Menu
Use this component to render a pop up menu.

## Features
1. Click outside closes the menu
2. Positioned automatically 
3. Dynamic content
4. Supports layers
5. Event based using Oktopost-duct

## Usage

### Basic
```JavaScript
var Menu = window.OUI.Components.Menu;

var menuButton = $('a.menu-button');
var menuContent = $('div.menu-content');
var menuClass = 'my-menu-class';

var myMenu = new Menu(menuButton, menuContent, menuClass);
```

### With Positioning
The Menu component uses the [BottomPosition](POS.md) object for positioning. To override the default options, you can pass your own configurations, like so:

```JavaScript
var Menu = window.OUI.Components.Menu;

var menuButton = $('a.menu-button');
var menuContent = $('div.menu-content');
var menuClass = 'my-menu-class';
var positionConfig = {
	containerOffset: 30
};

var myMenu = new Menu(menuButton, menuContent, menuClass, positionConfig);
```

### Menu Toggle
By default, the menu button will unbind after the first click. To enable toggle, use:

```JavaScript
myMenu.disableUnbinding();
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