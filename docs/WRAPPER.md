# Wrapper
Use this component to render templates inside a container.

## Features
1. *onRender* callback
2. *render* method


## Usage
JavaScript:
```JavaScript
var Wrapper = window.OUI.Components.Wrapper;

var nullstate = new Wrapper(container, template);

nullstate.onRender(function () {
	console.log('nullstate rendered');
});

nullstate.render({});
```

## Events
1. onRender