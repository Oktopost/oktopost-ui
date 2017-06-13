# Toast
Use this component to render dynamic user messages.

## Usage
```JavaScript
var Toast = window.OUI.components.Toast;
var myMessage = new Toast(3000);

myMessage.add('Hello World');
```
This message will be displayed for 3 seconds before being automatically removed.

## Events
1. onAdd
2. onDismiss