# Tip
Use this component to display simple text tips.

## Usage

JavaScript:
```JavaScript
var Tip = window.OUI.components.Tip;

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