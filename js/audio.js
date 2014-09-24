
var contextClass = (window.AudioContext || 
  window.mozAudioContext);
if (contextClass) {
  var context = new contextClass();
} else {
  console.log("Unsupported Browser!");
  $("body").append("<div class='container'><h4>Please use the Google Chrome browser. Only Chrome fully supports the Web Audio API at this time.</h4>");
}

var analyser = context.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = 0;
analyser.smoothingTimeConstant = 0.85;
analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Float32Array(bufferLength); 

$("audio").each(function(id, element){
  var source = context.createMediaElementSource(element);
  source.connect(context.destination);
  source.connect(analyser);
  element.preload = "auto";
});
var audioElement = $("#event")[0];
audioElement.preload = "auto";
