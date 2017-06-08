# OktoUI
Oktopost library for basic UI components.
## Installation
Install the package:
```
bower install oktopost-ui
```
Place the following files in your HTML template:
```
/bower_components/oktopost-ui/dist/okto-ui.css
/bower_components/oktopost-ui/dist/okto-ui.js
```

## Modal Windows
Use this component to render modal windows. 
### Features
1. Layers (multiple windows) 
2. Custom events using Oktopost-Duct library
3. Close all windows on Esc key

### Basic Usage
The Modal constructor accepts the content and an additional class that will be added to the container. 
``` JavaScript
var modal = new OktoUI.components.Modal(contents, 'big');
modal.open();
```
This will append the following HTML to the document body:
``` HTML
<div class="oui-modal big" id="oui-modal-1496942511985">
    <div class="wrapper">
       <!-- Modal Content Goes Here -->
    </div>
    <div class="oui-modal-underlay"></div>
</div>
```
### Closing Windows
1. Using modal.close()
2. Using an <a> element with the following attribute: data-oui-modal-close
3. By clicking the Escape key (will close all open windows)

### Events
``` JavaScript
var modal = new OktoUI.components.Modal(contents);
modal.onBeforeOpen(function (id) {});
modal.onAfterOpen(function (container) {});
modal.onBeforeClose(function (container) {});
modal.onAfterClose(function (id) {});
modal.open();
```

### Layers Example
``` JavaScript
var firstModal = new OktoUI.components.Modal(contents, 'big');

firstModal.onAfterOpen(function (container) {
    container.find('div.body a').on('click', function (e) {
        var secondModal = new OktoUI.components.Modal(secondModalContents, 'small');
        secondModal.open();
    });
});

firstModal.open();
```