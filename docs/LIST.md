# List
Use this component to create paginated lists.

## Features
1. Pagination
2. Search
3. Multi-Page Item Selection
4. Sorting
5. Loading State

## Usage

JavaScript:

```JavaScript
var ListMediator 	= window.OUI.Components.List.ListMediator;
var ListSearch 		= window.OUI.Components.List.ListSearch;

var listSearch = new ListSearch('div.search-form-wrapper', currentQuery);

listSearch.setNullstate('div.search-nullstate', searchNullstateTemplate);
listSearch.setItemsContainer('.items-container');

var myList = new ListMediator(queryParams);

myList.setItems('.items-container', itemsTemplate);
myList.setPagination('div.pagination', totalItems);
myList.setNullstate('main', nullstateTemplate);
myList.setSearch(listSearch);
myList.setSorting();

myList.onPaginationChange(this._updateList);
myList.onSort(this._updateList);
myList.onSearch(this._updateList);
```

HTML:

```HTML
<main>
<nav class="page-actions">
	<div class="search-form-wrapper"></div>
	<div class="pagination"></div>
</nav>
<section>
	<div class="search-nullstate"></div>
	<table class="campaigns-list">
		<thead>
			<tr>
				<th colspan="2">
					<a href="" data-order-by="name" data-order-way="0" class="sortable">
						Campaign
					</a>
				</th>
				<th>Posts</th>
				<th>Engagement</th>
				<th>
					<a href="" data-order-by="converts" data-order-way="0" class="sortable">
						Conversions
					</a>
				</th>
				<th>
					<a href="" data-order-by="created" data-order-way="0" class="sortable">
						Created on
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="items-container"></tbody>
	</table>
</section>
</main>
```

## Events
1. onRenderNullstate
2. onRender
3. onSort
4. onSearch
5. onPaginationChange

## Uses
1. [List Items](list/LIST_ITEMS.md)
2. [List Selection](list/LIST_SELECTION.md)
3. [List Pagination](list/LIST_PAGINATION.md)
4. [List Sorting](list/LIST_SORTING.md)
5. [List Search](list/LIST_SEARCH.md)