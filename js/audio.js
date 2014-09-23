
var context = new webkitAudioContext();
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
});
var audioElement = $("#event")[0];
