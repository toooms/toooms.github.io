
var audioContext = null;
var canvasContext = null;
var meter = null;
var canvasWidth = 200;
var canvasHeight = 200;
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
    console.log("console test");
}

function didntGetStream() {
    alert('Failed to access mic');
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
    //canvasContext.font="30px Helvetica";
    //canvasContext.fillStyle = "black";
    //canvasContext.fillText(meter.volume.toFixed(3),200,100);
    document.getElementById("result").innerHTML = (meter.volume*10).toFixed(3);
    //document.getElementById("result").innerHTML = meter.volume.toFixed(4);

    //canvasContext.clearRect();
    
    // check if we're currently clipping
    //    if (meter.checkClipping())
    //        canvasContext.fillStyle = "red";
    //    else
    //        canvasContext.fillStyle = "green"; 
    //

    // this controls behaviour and sensativity of the box
    if (meter.volume < 0.05) {
        canvasContext.fillStyle = "#ffffc9";

        //} else if (meter.volume > 0.2) {
            //canvasContext.fillStyle = "red";
        } else {
            canvasContext.fillStyle = "gray";
    };
    
    
    //console.log(meter.volume);

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
  

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}



