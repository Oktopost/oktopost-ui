# Menu
Use this component to render a hover toggled menu.

## Features
1. Show on mouse enter, hides on mouse leave
2. Can be persisted
3. Positioned automatically 
4. Dynamic content
5. Supports layers
6. Event based using Oktopost-duct

## Usage

### Basic
```JavaScript
var HoverMenu = window.OUI.Components.HoverMenu;

var menuButton = $('a.menu-button');
var menuContent = $('div.menu-content');
var menuClass = 'my-menu-class';

var myHoverMenu = new HoverMenu(menuButton, menuContent, menuClass);
```

### With Positioning
The HoverMenu component uses the [RoundPosition](POS.md) object for positioning. To override the default options, you can pass your own configurations, like so:

```JavaScript
var HoverMenu       = window.OUI.Components.HoverMenu;
var TargetSide      = window.OUI.Core.Pos.Enum.TargetSide;
var TargetPosition  = window.OUI.Core.Pos.Enum.TargetPosition;

var menuButton = $('a.menu-button');
var menuContent = $('div.menu-content');
var menuClass = 'my-menu-class';
var positionConfig = {
	initialSide: TargetSide.right,
	initialPosition: TargetPosition.center,
	containerOffset: 30
};

var myHoverMenu = new HoverMenu(menuButton, menuContent, menuClass, positionConfig);
```
### With Persisting
The HoverMenu component provides possibility to enable persistent mode - it disables menu closing on hover and enables menu closing on click outside the menu, for example:

```JavaScript
var HoverMenu = window.OUI.Components.HoverMenu;

var menuButton = $('a.menu-button');
var menuContent = $('div.menu-content');
var menuClass = 'my-menu-class';

var myHoverMenu = new HoverMenu(menuButton, menuContent, menuClass);

menuButton.click(function(e)
{
	myHoverMenu.togglePersist();            
    e.stopPropagation();
});
```

## Events

1. onAfterOpen
2. onAfterClose
3. onAfterPersist
4. onBeforeClose
5. onBeforeOpen
6. onBeforePersist

### Example

```JavaScript

var myHoverMenu = new HoverMenu(menuButton, menuContent, menuClass);

myHoverMenu.onAfterOpen(function (container) {
	console.log('do something');
});
```