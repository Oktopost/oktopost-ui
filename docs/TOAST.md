# Toast
Use this component to render dynamic user messages.

## Usage
```JavaScript
var Toast = window.OUI.Components.Toast;
var myMessage = new Toast(3000);

myMessage.add('Hello World', 'Click Me'); // Text will be "Hello World" and link will be "Click Me"
```
This message will be displayed for 3 seconds before being automatically removed. 
Clicking on the link will trigger the *onCtaClick* event. Using a the public *dismiss* method will trigger the *onDismiss* event.


## Events
1. onAdd
2. onDismiss
3. onCtaClick