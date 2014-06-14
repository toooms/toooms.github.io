/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var audioContext = null;
var canvasContext = null;
var meter = null;
var canvasWidth = 20;
var canvasHeight = 20;
var rafID = null;

// draw canvas
function draw () {
    canvasContext = document.getElementById( "target" ).getContext("2d");
	canvasContext.fillStyle="#fff";
    canvasContext.fillRect(0,0,canvasWidth,canvasHeight);
};


window.onload = function() {

    // call function that draws canvas
    draw();
    
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia({audio:true}, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
    console.log("hello world");
}

function didntGetStream() {
    alert('Stream generation failed.');
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
	meter = createAudioMeter(audioContext);
	mediaStreamSource.connect(meter);

    // kick off the visual updating
    drawLoop(); 
}

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    //canvasContext.font="20px Helvetica";
    //canvasContext.fillStyle = "black";
    //canvasContext.fillText(meter.volume.toFixed(3),20,20);

    // check if we're currently clipping
//    if (meter.checkClipping())
//        canvasContext.fillStyle = "red";
//    else
//        canvasContext.fillStyle = "green";
  
//    
    if (meter.volume < 0.1) {
        canvasContext.fillStyle = "#ffffc9";
        } //else if (meter.volume > 0.2) {
            //canvasContext.fillStyle = "lightgreen";
        } else {
            canvasContext.fillStyle = "gray";
    };
    
    
    //console.log(meter.volume);

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
  

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}
