# Video
Use this component to render an HTML5 video element.

## Features
1. Preview image
2. Loader
3. Optional auto play and repeat
3. Error event using Duct

## Usage

HTML:
```HTML
<div
	data-sources='["[PATH_TO_VIDEO]"]'
	data-preview="[PREVIEW_IMAGE]"
	data-auto-repeat="false"
	data-auto-play="false"></div>
```

JavaSctipt: 
```JavaScript
var Video = window.OUI.Components.Video;

var myVideo = new Video('div');

myVideo.onError(function (videoElement) 
{
	console.log("Error " + videoElement.error.code + "; details: " + videoElement.error.message);
})
```

### Available Data Attributes
| Attribute | Default | Description |
| --------- | ------- | ---------- |
| data-sources | None | Array of paths to videos |
| data-preview | None | Path to preview image |
| data-auto-repeat | false | Play the video in a loop |
| data-auto-play | false | Play the video on load |


## onError(videoWrapper)
On error the component will fire an [HTMLMediaElement.error](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error) event.