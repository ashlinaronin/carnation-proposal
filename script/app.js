/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

var words = [
  "fire","water","earth","wind"
];

(function() {
  var asciiContainer = document.getElementById("ascii");
  var capturing = false;
  var wordIndex = 0;

  camera.init({
    width: 160,
    height: 120,
    fps: 30,
    mirror: true,

    onFrame: function(canvas) {
      wordIndex = wordIndex + 0.01;
      console.log(wordIndex);
      ascii.fromCanvas(canvas, {
        callback: function(asciiString) {

          asciiContainer.innerHTML = asciiString;
        },
        characters: words[Math.ceil(wordIndex) % words.length]
      });
    },

    onSuccess: function() {
      document.getElementById("info").style.display = "none";

      const button = document.getElementById("button");
      button.style.display = "block";
      button.onclick = function() {
        if (capturing) {
          camera.pause();
          button.innerText = 'resume';
        } else {
          camera.start();
          button.innerText = 'pause';
        }
        capturing = !capturing;
      };
    },

    onError: function(error) {
      // TODO: log error
    },

    onNotSupported: function() {
      document.getElementById("info").style.display = "none";
      asciiContainer.style.display = "none";
      document.getElementById("notSupported").style.display = "block";
    }
  });
})();