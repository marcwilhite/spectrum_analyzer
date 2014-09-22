
var context = new webkitAudioContext();
var audioElement = document.getElementById("event");
var analyser = context.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = 0;
analyser.smoothingTimeConstant = 0.85;
analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Float32Array(bufferLength); 

audioElement.addEventListener("canplay", function() {
    var source = context.createMediaElementSource(audioElement);
    source.connect(context.destination);
    source.connect(analyser);

});
