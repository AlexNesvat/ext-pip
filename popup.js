// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
/**
 * example
 * @type {HTMLElement}
 */
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};


/**
 * picture in picture
 * @type {boolean}
 */
// Hide button if Picture-in-Picture is not supported.
pipButton.hidden = !document.pictureInPictureEnabled;

pipButton.addEventListener('click', function() {
  // If there is no element in Picture-in-Picture yet, let's request Picture
  // In Picture for the video, otherwise leave it.
  if (!document.pictureInPictureElement) {
    //videotest id of element with video
    videotest.requestPictureInPicture()
        .catch(error => {
          // Video failed to enter Picture-in-Picture mode.
        });
  } else {
    document.exitPictureInPicture()
        .catch(error => {
          // Video failed to leave Picture-in-Picture mode.
        });
  }
});

let pipWindow;
let pipWindow2;

/**
 * picture in picture second window
 * @type {boolean}
 */
// Hide button if Picture-in-Picture is not supported.
pipButton2.hidden = !document.pictureInPictureEnabled;

pipButton2.addEventListener('click', function() {
  // If there is no element in Picture-in-Picture yet, let's request Picture
  // In Picture for the video, otherwise leave it.
  if (!document.pictureInPictureElement) {
    //videotest id of element with video
    videotest2.requestPictureInPicture()
        .catch(error => {
          // Video failed to enter Picture-in-Picture mode.
        });
  } else {
    document.exitPictureInPicture()
        .catch(error => {
          // Video failed to leave Picture-in-Picture mode.
        });
  }
});

videotest.addEventListener('enterpictureinpicture', function(event) {
  //log('> Video entered Picture-in-Picture');

  pipWindow2 = event.pictureInPictureWindow;

});

videotest2.addEventListener('enterpictureinpicture', function(event) {
//  log('> Video entered Picture-in-Picture');

    pipWindow2 = event.pictureInPictureWindow;

});/*
video.addEventListener('leavepictureinpicture', function() {
  // Video left Picture-in-Picture mode.
  pipWindow.removeEventListener('resize', onPipWindowResize);
});
*/


/**
 * Canvas
 */
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
// do cool things with the context
context.font = '40pt Calibri';
context.fillStyle = 'blue';
context.fillText('Hello еуыеtest!', 150, 100);


/**
 * git copy for test
 * test: try to request picture in picture for all videos.
 * src: https://github.com/GoogleChromeLabs/picture-in-picture-chrome-extension/blob/master/src
 * https://github.com/Polymer/polymer
 */
(async () => {
  const videos = Array.from(document.querySelectorAll('video'))
      .filter(video => video.readyState != 0)
      .filter(video => video.disablePictureInPicture == false)
      .sort((v1, v2) => {
        const v1Rect = v1.getClientRects()[0];
        const v2Rect = v2.getClientRects()[0];
        return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
      });

  if (videos.length === 0)
    return;

  const video = videos[0];

  if (video.hasAttribute('__pip__')) {
    await document.exitPictureInPicture();
  } else {
    await video.requestPictureInPicture();
    video.setAttribute('__pip__', true);
    video.addEventListener('leavepictureinpicture', event => {
      video.removeAttribute('__pip__');
    }, { once: true });
    chrome.runtime.sendMessage({ message: 'enter' });
  }
})();