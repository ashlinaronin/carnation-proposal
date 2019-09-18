export default class VideoAnimator {
  constructor(options) {
    const doNothing = () => {};

    this.options = options || {};

    this.options.fps = options.fps || 30;
    this.options.width = options.width || 640;
    this.options.height = options.height || 480;
    this.options.mirror = options.mirror || false;
    this.options.targetCanvas = options.targetCanvas || null; // TODO: is the element actually a <canvas> ?
    this.options.videoSrc = options.videoSrc || "../water.mp4";

    this.options.onSuccess = options.onSuccess || doNothing;
    this.options.onError = options.onError || doNothing;
    this.options.onNotSupported = options.onNotSupported || doNothing;
    this.options.onFrame = options.onFrame || doNothing;

    this.onLoadedData = this.onLoadedData.bind(this);
    this.animate = this.animate.bind(this);

    this.initVideoStream();
  }

  initVideoStream() {
    this.video = document.createElement("video");
    this.video.src = this.options.videoSrc;
    this.video.addEventListener("loadeddata", this.onLoadedData, false);
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', this.options.width);
    this.canvas.setAttribute('height', this.options.height);

    this.context = this.canvas.getContext('2d');
  }

  play() {
    this.video.play();
  }

  onLoadedData() {
    // this.videoLoaded = true;
    debugger;
    // this.video.play();
    this.video.removeEventListener("loadeddata", this.onLoadedData);

    this.animate();
  }

  animate() {
    const vRatio = (this.canvas.height / this.video.videoHeight) * this.video.videoWidth;
    this.context.drawImage(this.video, 0,0, vRatio, this.canvas.height);
    this.options.onFrame(this.canvas);
    requestAnimationFrame(this.animate);
  }
}