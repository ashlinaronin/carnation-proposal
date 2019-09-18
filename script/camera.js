/*
	camera.js v1.1
	http://github.com/idevelop/camera.js
	Author: Andrei Gheorghe (http://idevelop.github.com)
	License: MIT
*/

var camera = (function () {
  var options;
  var video, canvas, context;
  var videoLoaded = false;

  function initVideoStream() {
    video = document.getElementById('water-video');

    video.addEventListener("loadeddata", onLoadedData, false);
    initCanvas();
  }

  function initCanvas() {
    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', options.width);
    canvas.setAttribute('height', options.height);

    context = canvas.getContext('2d');

    // mirror video
    if (options.mirror) {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }
  }

  function onLoadedData() {
    videoLoaded = true;
    video.play();
    video.removeEventListener("loadeddata", onLoadedData);

    animate();
  }

  function animate() {
    var vRatio = (canvas.height / video.videoHeight) * video.videoWidth;
    context.drawImage(video, 0,0, vRatio, canvas.height);
    // context.drawImage(video, 0, 0, video.width, video.height);
    options.onFrame(canvas);
    requestAnimationFrame(animate);
  }

  return {
    init: function (captureOptions) {
      var doNothing = function () {
      };

      options = captureOptions || {};

      options.fps = options.fps || 30;
      options.width = options.width || 640;
      options.height = options.height || 480;
      options.mirror = options.mirror || false;
      options.targetCanvas = options.targetCanvas || null; // TODO: is the element actually a <canvas> ?

      options.onSuccess = options.onSuccess || doNothing;
      options.onError = options.onError || doNothing;
      options.onNotSupported = options.onNotSupported || doNothing;
      options.onFrame = options.onFrame || doNothing;

      initVideoStream();
    }
  };
})();