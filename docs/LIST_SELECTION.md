# List Selection
Use this component to save selected items in lists.

## Features
1. Save selected items across pages.
2. Select and deselect multiple items.
3. Custom events using Oktopost-Duct library.

## Usage

JavaScript:
```JavaScript
var ListSelection = OUI.components.list.ListSelection;

var selection = new ListSelection('input[type="checkbox"]');

selection.onDeselect(function () {
	console.log(selection.getSelected().join(','));
});

selection.onSelect(function () {
	console.log(selection.getSelected().join(','));
});
```

HTML:
```HTML
<ul>
	<li>
		<label>
			<input type="checkbox" name="checkbox[]" id="checkbox-1">
			Box 1
		</label>
	</li>
	<li>
		<label>
			<input type="checkbox" name="checkbox[]" id="checkbox-2">
			Box 2
		</label>
	</li>
</ul>
```

## Methods
### select([ itemIds ])
Select one or multiple items by Id.

### deselect([ itemIds ])
Deselect one or multiple items by Id.

### getSelected()
Will return an array of selected item Ids.

## Events

1. onSelect
2. onDeselect

Note that each event will fire once per item. This means that if you select or de-select multiple items, these events will fire multiple times.