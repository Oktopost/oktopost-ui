# File Upload
File upload wrapper for [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload).

## Features
1. Drag and drop
2. Loading
3. Callbacks using Oktopost-Duct

## Usage

```JavaScript
var FileUpload = window.OUI.Components.FileUpload;

var fileupload = new FileUpload(
	'input.fileupload', 
	'a.button', 
	'div.dropzone', 
	'/path/to/upload');
```

## Events
1. onAdd
2. onDone
3. onSuccess