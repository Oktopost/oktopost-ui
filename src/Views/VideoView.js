namespace('OUI.Views', function (window) 
{
	var obj 		= window.Plankton.obj;
	var hbs 		= window.OUI.Core.View.hbs;
	var classify 	= window.Classy.classify;
	var Event 		= window.Duct.Event;

	var defaults = 
	{
		autoRepeat: false,
		autoPlay: false
	};


	function VideoView(videoSelector)
	{
		classify(this);

		this._videos 		= $(videoSelector);
		
		this._hiddenClass 	= 'hidden';
		this._loader 		= '.video-spinner';
		this._preview 		= '.video-preview';
		this._error 		= '.video-error';

		this._onError 		= new Event('VideoView.onError');

		this._videos.each(this._initVideo);

		this.onError(this._displayError);
	}


	VideoView.prototype._displayError = function (videoWrapper)
	{
		videoWrapper.find(this._loader).addClass(this._hiddenClass);
		videoWrapper.find(this._error).removeClass(this._hiddenClass);
	};

	VideoView.prototype._onCanPlay = function (videoWrapper, settings)
	{
		if (settings.autoPlay && settings.sources.length)
		{
			this._play(videoWrapper);
		}
	};

	VideoView.prototype._onLoadedMeta = function (videoWrapper)
	{
		videoWrapper.find(this._loader).addClass(this._hiddenClass);
		videoWrapper.find(this._preview).removeClass(this._hiddenClass).css('height', this._getHeight(videoWrapper));
	};

	VideoView.prototype._getHeight = function (videoWrapper)
	{
		var videoHeight = videoWrapper.find('video').get(0).videoHeight;
		var videoWidth 	= videoWrapper.find('video').get(0).videoWidth;
		var aspectRatio = videoWidth / videoHeight;
		
		return videoWrapper.width() / aspectRatio;
	};

	VideoView.prototype._initVideo = function (index, videoWrapper)
	{
		videoWrapper = $(videoWrapper);

		var settings 	= obj.merge(videoWrapper.data(), defaults);
		var videoView 	= this;
		
		videoWrapper.append(hbs('video', settings));
		
		videoWrapper.find('video').on('canplay', function ()
		{
			videoView._onCanPlay(videoWrapper, settings.autoPlay);			
		});

		videoWrapper.find('video').on('loadedmetadata', function ()
		{
			videoView._onLoadedMeta(videoWrapper);
		});

		videoWrapper.find('video').on('error', function ()
		{
			videoView._onError.trigger(videoWrapper);
		});

		if (settings.sources.length)
		{
			videoWrapper.find(this._preview).on('click', function ()
			{
				videoView._play(videoWrapper);
			});
		}
	};

	VideoView.prototype._play = function (videoWrapper)
	{
		videoWrapper.find(this._preview).addClass(this._hiddenClass);
		
		videoWrapper.find('video').removeClass(this._hiddenClass);
		videoWrapper.find('video').get(0).play();
	};


	VideoView.prototype.onError = function (callback)
	{
		this._onError.add(callback);
	};


	this.VideoView = VideoView;
});