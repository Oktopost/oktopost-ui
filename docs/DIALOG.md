# Dialog
Use this component to display a confirmation box.

## Features
1. Event based using Oktopost-duct
2. Blocks all other operations besides cancellation and confirmation

## Usage
```JavaScript
var confirm = new window.OUI.Components.Dialog('YES', 'NO');

confirm.onConfirm(function () {
    console.log('YES');
});

confirm.open('Are you sure?');

```

## Events
1. onOpen
2. onCancel
3. onConfirm

### Example
```JavaScript
var confirm = new window.OUI.Components.Dialog('YES', 'NO');

confirm.onCancel(function () {
    console.log('Canceled by user');
});

confirm.open('Are you sure?');

```