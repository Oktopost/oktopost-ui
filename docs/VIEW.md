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