namespace('OUI.Components', function (window) 
{
	var Event 			= window.Duct.Event;
	var classify 		= window.Classy.classify;

	var FileUploadView 	= window.OUI.Views.FileUploadView;


	/**
	 * @class FileUpload
	 * @uses $.fn.fileupload
	 * 
	 * @param {string} input
	 * @param {string} button
	 * @param {string} dropzone
	 * @param {object} headers
	 * @param {string} url
	 */
	function FileUpload(input, button, dropzone, url, headers)
	{
		classify(this);
		
		headers = headers || {};

		this._view 		= new FileUploadView(input, button, dropzone);

		this._onAdd 	= new Event('FileUpload.onAdd');
		this._onDone 	= new Event('FileUpload.onDone');
		this._onSuccess = new Event('FileUpload.onSuccess');
		this._onError	= new Event('FileUpload.onError');

		$(input).fileupload(
		{
			url: 				url,
			dataType: 			'json',
			dropZone: 			$(dropzone),
			headers:			headers,
			replaceFileInput: 	false,
			add: 				this._onAdd.trigger,
			done: 				this._onDone.trigger,
			success: 			this._onSuccess.trigger,
			error:				this._onError.trigger
		});

		this.onAdd(function (e, data) {
			data.submit();
		});
	}


	FileUpload.prototype.onAdd = function (callback)
	{
		this._onAdd.add(callback);
	};

	FileUpload.prototype.onDone = function (callback)
	{
		this._onDone.add(callback);
	};

	FileUpload.prototype.onSuccess = function (callback)
	{
		this._onSuccess.add(callback);
	};
		
	FileUpload.prototype.onError = function (callback)
	{
		this._onError.add(callback);	
	};


	this.FileUpload = FileUpload;
});