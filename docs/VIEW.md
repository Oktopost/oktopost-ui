# View Helpers


## hbs
This helper can be used to fetch pre-compiled Handlebars templates.

```JavaScript
var hbs = window.OUI.core.view.hbs;

hbs(templateName, params);
```

## idGenerator
This helper can be used to generate a unique Id for DOM elements.

```JavaScript
var hbs = window.OUI.core.view.isGenerator;

va myId = idGenerator('my-prefix'); // my-prefix-so7567s1pcpojemi
```

## fadeRemove
This helper can be used to remove elements after a certain delay.

```JavaScript
var fadeRemove = window.OUI.core.view.fadeRemove;

fadeRemove($('#elem'), classOnRemove, delay);
```

## pos
Library used to position element relatively to another with considering offsets and container limitations. 
Entry point is prepared objects each of them presents area to position target element. 
Available prepared objects can be found in core/positioning/prepared directory. 
Get method returns Point object with "x" and "y" properties.

### options
* container: container inside which the positioning is performed. If not provided, a window will be used. Can be jQuery object or HTMLElement,
* containerOffset: negative offset &ndash; container padding,
* relatedElement: element relatively to which will be positioned target element. Can be jQuery object or HTMLElement,
* relatedOffset: related element margin, can be positive or negative,
* targetElement: positioned element, must have width and height,
* targetOffset: target element margin, can be positive or negative,
* isRelative: return absolute position or relatively to relatedElement, false by default,
* initialPosition: initial point of positioning, from TargetPosition enum,
* initialSide: initial side of positioning, from TargetSide enum, used if prepared objects have more than one side for positioning.

### usage
```Javascript
var RoundPosition = window.OUI.core.positioning.prepared.RoundPosition;
var TargetPosition = window.OUI.core.positioning.enum.TargetPosition;
var TargetSide = window.OUI.core.positioning.enum.TargetSide;

var $target = $('<div />', {
				text: 'target',
				style: 'width:100px; height: 100px; position: absolute'
			});

var options = {
    container: $('.container'),
    relatedElement:  $('.related'),
    targetElement: $target,
    isAbsolute: true,
    initialPosition: TargetPosition.bottom,
    initialSide: TargetSide.left
};

var position = RoundPosition.get(options);

$target.css({top: position.y, left: position.x});
```