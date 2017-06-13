# Modal Windows
Use this component to render modal windows. 

## Features
1. Layers (multiple windows) 
2. Custom events using Oktopost-Duct library
3. Close all windows on Esc key

## Usage

### Basic
```JavaScript
var modal = new OUI.components.Modal(contents, 'big');

modal.open();
```

### Complex
```JavaScript
var firstModal = new OUI.components.Modal(contents, 'big');

firstModal.onAfterOpen(function (container) {
    container.find('div.body a').on('click', function (e) {
        var secondModal = new OUI.components.Modal('', 'small');

        secondModal.open();
    });
});

firstModal.open();
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
