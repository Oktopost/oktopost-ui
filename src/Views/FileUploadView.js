namespace('OUI.Views', function (window) 
{
	var classify = window.Classy.classify;

	/**
	 * @class FileUploadView
	 * @param {string} input
	 * @param {string} button
	 * @param {string} dropzone
	 */
	function FileUploadView(input, button, dropzone)
	{
		classify(this);

		this._input 			= $(input);
		this._dropzone 			= $(dropzone);
		this._button 			= $(button);
		this._dropzoneTimeout 	= null;

		this._button.on('click', this._onButtonClick);
		$(document).on('dragover', this._onDragover);
	};


	FileUploadView.prototype._onButtonClick = function (e)
	{
		this._input.trigger('click');
	};

	FileUploadView.prototype._onDragover = function (e)
	{
		var target 	= $(e.target);
		
		if (this._dropzoneTimeout) 
	    {
	        clearTimeout(this._dropzoneTimeout);
	    } 
	    else 
	    {
	        this._dropzone.addClass('in');
	    }

	    this._dropzone.toggleClass('hover', target.closest(this._dropzone).length);
	    this._dropzoneTimeout = setTimeout(this._resetHover, 100);
	};

	FileUploadView.prototype._resetHover = function ()
	{
		this._dropzoneTimeout = null;
		this._dropzone.removeClass('in hover');
	};


	this.FileUploadView = FileUploadView;
});