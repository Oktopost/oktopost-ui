# List Pagination
Use this component to render pagination for lists.

## Features
1. Render pagination component
2. Zero based pagination
3. Custom events using Oktopost-Duct library

## Usage
JavaScript:

```JavaScript
var ListPagination = OUI.components.list.ListPagination;

var container = $('div.pagination');
var params = { '_page': 0, '_count': 10 };
var numItems = 60;

var pagination = new ListPagination(container, params, numItems;
```

HTML:
```HTML
<div class="pagination"></div>
```

## Events
1. onNext
2. onPrev
3. onChange