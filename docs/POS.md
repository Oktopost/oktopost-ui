# Pos
Use this library to position elements relatively to others, considering offsets and container limitations.

## Usage 
The entry point is prepared objects (*core/positioning/prepared*). Each object represents an area to position target element in.

```JavaScript
var RoundPosition   = window.OUI.core.positioning.prepared.RoundPosition;
var TargetPosition  = window.OUI.core.positioning.enum.TargetPosition;
var TargetSide      = window.OUI.core.positioning.enum.TargetSide;

var $target = $('<div />', {
    text: 'target',
    style: 'width:100px; height: 100px; position: absolute'
});

var options = {
    container: $('.container'),
    relatedElement:  $('.related'),
    targetElement: $target,
    initialPosition: TargetPosition.bottom,
    initialSide: TargetSide.left
};

var position = RoundPosition.get(options);

$target.css({
    top: position.coordinates.top, 
    left: position.coordinates.left
});

$target.addClass(position.name);
```

### Return Object
```JavaScript
{
    coordinates: {
        x: 0,
        y: 0,
        left: 0,
        top: 0
    },
    name: "top-center" // [side]-[position]
}
```


### Options
* **container** jQuery|HTMLElement. Container inside which the positioning is performed. If not provided, *window* will be used by default
* **containerOffset** Number. Target element offset from container
* **relatedElement** jQuery|HTMLElement. Target element will be positioned according to this element
* **relatedOffset** Number. Related element margin, can be positive or negative
* **targetElement** jQuery|HTMLElement. Positioned element
* **targetOffset** Number. Target margin from relatedElement
* **isRelative** Boolean. Return absolute or relative position to relatedElement
* **initialPosition** String. See *window.OUI.core.positioning.enum.TargetPosition*
* **initialSide** String. See *window.OUI.core.positioning.enum.TargetSide*

**Note** that the *targetElement* must have width and height in order to be positioned correctly.