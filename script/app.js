/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

import VideoAnimator from "./VideoAnimator.js";

const words = [
  "fire", "water", "earth", "wind"
];

const asciiContainer = document.getElementById("ascii");
let wordIndex = 0;

const waterAnimator = new VideoAnimator({
  width: 160,
  height: 120,
  videoElement: document.getElementById("water-video"),
  onFrame: function (canvas) {
    debugger;
    wordIndex = wordIndex + 0.01;
    console.log(wordIndex);
    ascii.fromCanvas(canvas, {
      callback: function (asciiString) {
        asciiContainer.innerHTML = asciiString;
      },
      characters: words[Math.ceil(wordIndex) % words.length]
    });
  }
});

document.getElementById("play").addEventListener("click", () => {
  waterAnimator.play();
});

// cam.initVideoStream();