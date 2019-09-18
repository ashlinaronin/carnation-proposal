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

const fireAsciiContainer = document.getElementById("fire-ascii");
const waterAsciiContainer = document.getElementById("water-ascii");
let wordIndex = 0;

const waterAnimator = new VideoAnimator({
  width: 160,
  height: 120,
  videoSrc: "../water.mp4",
  onFrame: function (canvas) {
    wordIndex = wordIndex + 0.01;
    console.log(wordIndex);
    ascii.fromCanvas(canvas, {
      callback: function (asciiString) {
        waterAsciiContainer.innerHTML = asciiString;
      },
      characters: words[Math.ceil(wordIndex) % words.length]
    });
  }
});

const fireAnimator = new VideoAnimator({
  width: 160,
  height: 120,
  videoSrc: "../fire-720p.mp4",
  onFrame: function (canvas) {
    wordIndex = wordIndex + 0.01;
    console.log(wordIndex);
    ascii.fromCanvas(canvas, {
      callback: function (asciiString) {
        fireAsciiContainer.innerHTML = asciiString;
      },
      characters: words[Math.ceil(wordIndex) % words.length]
    });
  }
});

document.getElementById("play").addEventListener("click", () => {
  waterAnimator.play();
  fireAnimator.play();
});
