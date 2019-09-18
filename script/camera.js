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
  var renderTimer;


  function initVideoStream() {
    video = document.getElementById('water-video');

    video.addEventListener("loadeddata", onLoadedData, false);
    initCanvas();
  }

  function initCanvas() {
    canvas = options.targetCanvas || document.createElement("canvas");
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
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    video.removeEventListener("loadeddata", onLoadedData);

    animate();
  }

  function animate() {
    context.drawImage(video, 0, 0, video.width, video.height);
    options.onFrame(canvas);
    requestAnimationFrame(animate);
  }

  function startCapture() {
    video.play();

    renderTimer = setInterval(function () {
      try {
        context.drawImage(video, 0, 0, video.width, video.height);
        options.onFrame(canvas);
      } catch (e) {
        // TODO
      }
    }, Math.round(1000 / options.fps));
  }

  function stopCapture() {
    pauseCapture();

    if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = null;
    } else {
      video.srcObject = null;
    }
  }

  function pauseCapture() {
    if (renderTimer) clearInterval(renderTimer);
    video.pause();
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
    },

    start: startCapture,

    pause: pauseCapture,

    stop: stopCapture
  };
})();