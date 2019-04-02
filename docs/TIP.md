# Tip
Use this component to display simple text tips.

## Usage

### Basic

JavaScript:
```JavaScript
var Tip = window.OUI.Components.Tip;

var myTip = new Tip('oui-tip');
```

HTML:
```HTML
<a href="" data-oui-tip="Lorem ipsum dolor sit amet">My Tip</a>
```

To use HTML markup inside tooltips:
```HTML
<a href="" data-oui-tip="[b]Title[/b]Lorem ipsum dolor sit amet">My Tip</a>
```
This will result in:
```HTML
<b>Title</b>Lorem ipsum dolor sit amet
```
List of allowed tags is limited by sanitizer. By default only few tags are allowed.
You can set your own sanitizer at any moment with `myTip.setSanitizer(mySanitizer)`. 
Sanitizer is supposed to have `sanitize(string)` method and return string.

### With Positioning
The Tip component uses the [RoundPosition](POS.md) object for positioning. To override the default options, you can pass your own configurations, like so:

```JavaScript
var myOptions = {
	containerOffset: 30
};

var myTip = new Tip('oui-tip', myOptions);
```