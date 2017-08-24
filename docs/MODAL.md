# Modal Windows
Use this component to render modal windows. 

## Features
1. Layers (multiple windows) 
2. Custom events using Oktopost-Duct library
3. Close all windows on Esc key

## Usage

### Basic
```JavaScript
var modal = new OUI.Components.Modal(contents, 'big');

modal.open();
```

### Nested Windows
```JavaScript
var Modal = window.OUI.Components.Modal;

var firstModal = new Modal(contents, 'big');

firstModal.onAfterOpen(function (container) {
    container.find('div.body a').on('click', function (e) {
        var secondModal = new Modal('', 'small');

        secondModal.open();
    });
});

firstModal.open();
```

### Show Dialog on Underlay Click

```JavaScript
var Modal 	= window.OUI.Components.Modal;
var Dialog 	= window.OUI.Components.Dialog;

var myModal = new Modal('asasas');

myModal.onAfterOpen(myModal.clearUnderlayClick);
myModal.onAfterOpen(function ()
{
	myModal.onUnderlayClick(function ()
	{
		var dialog = new Dialog('Yes', 'Cancel');

		dialog.onConfirm(function () 
		{ 
			myModal.close() 
		});
		
		dialog.open('Are you sure you want to close this window?');
	});
});

myModal.open();
```

### Closing Windows
1. Using *modal.close()*
2. Using an element with the following attribute: data-oui-modal-close
3. By clicking the *Esc* key (will close all open windows)

## Events
1. onBeforeOpen
2. onAfterOpen
3. onBeforeClose
4. onAfterClose
5. onUnderlayClick
