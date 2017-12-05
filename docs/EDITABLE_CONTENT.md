# Editable content
This component is used for attaching "contenteditable" html attribute to elements and handling content changes.

## Features
By default 'click' event is used to enable edit mode, another event can be specified as second parameter to constructor.
Also editable mode can be enabled and disabled manually by calling enable() and disable() methods.

## Usage

```Javascript
var EditableContent = window.OUI.Components.EditableContent;

var editableContent = new EditableContent($('a.editable'), 'click');

var oldContent = '';

editableContent.onBeforeEnable(function (el)
{
    oldContent = el.text();
});

editableContent.onChange(function (el, content)
{
    if (is.string.empty(content))
    {
        el.text(oldContent);
        return;
    }
    
    //process changes
});
```

## Events
1. onBeforeEnable
2. onAfterEnable
3. onBeforeDisable
4. onAfterDisable
5. onChange