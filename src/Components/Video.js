namespace('OUI.Components', function (window) 
{
	var classify 	= window.Classy.classify;
	var VideoView 	= window.OUI.Views.VideoView;
	var Event 		= window.Duct.Event;


	function Video(videoSelector)
	{
		classify(this);

		this._view 		= new VideoView(videoSelector);
		this._onError 	= new Event('View.onError');

		this._view.onError(this._onError.trigger);
	}


	Video.prototype.onError = function (callback)
	{
		this._onError.add(callback);
	};


	this.Video = Video;
});