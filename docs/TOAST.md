# Toast
Use this component to render dynamic user messages.

## Usage
```JavaScript
var Toast = window.OUI.Components.Toast;
var myMessage = new Toast(3000);

var ctrl = myMessage.add('Hello World', 'Click Me'); // Text will be "Hello World" and link will be "Click Me"
```
This message will be displayed for 3 seconds before being automatically removed. To prevent auto remove pass *-1* to Toast constructor.
Clicking on the link will trigger *myMessage.onCtaClick* event. Using a the public *myMessage.dismiss* method will trigger the *onDismiss* event.

With ctrl you can change message by calling *ctrl.setText('Hello Again')* and change cta link text by calling *ctrl.setCtaText('Please click me, would you?')*

## Events
1. onAdd
2. onDismiss
3. onCtaClick