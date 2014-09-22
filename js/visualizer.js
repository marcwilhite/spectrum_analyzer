var width = 960,
  height = 500;

var svg = d3.select(".svg-container").append("svg")
  .attr("width", width)
  .attr("height", height);


var data = [];
for (var i = 0; i < 128; i++) {
  data[i] = {};
}

var rects = svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr('fill', function(d, i) {
    return 'rgb(' + (200 - i * 2) + ',100,' + (i + 50) + ')';})
  .attr('width', 5)
  .attr('height', 600)
  .attr('x', function(d, i) { return (i * 7.47); })
  .attr('y', 100)
  .attr('rx', 5)
  .attr('class', 'rects');

var secondsToTime = function(secs)
{

    var millisecs = secs % 1;
    millisecs = millisecs.toFixed(2);
    millisecs += '';
    millisecs = millisecs.split('.')[1];

    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds,
        "ms": millisecs
    };
    return obj;
};

var update = function() {
  svg.selectAll('.rects')
    .transition()
    .duration(20)
    .attr('y', function(d) {
      return (d.y * -3.5) - 50;
    });
  var time = secondsToTime(audioElement.currentTime);
  $('.time-stamp').html(time.m+':'+time.s+":"+time.ms);
};

var updateArray = function(array) {
  for (var i = 0; i < data.length; i++) {
    data[i].y = array[i];
  }
};

var lastRun = Date.now();
var analyze = function() {

  requestAnimationFrame(analyze);
  // var now = Date.now();
  //   lastRun = now;
  analyser.getFloatFrequencyData(dataArray);
  updateArray(dataArray);
  update();
};

analyze();


$(document).ready(function() {

  $(".button-pause").on("click", function(event) {
    audioElement.pause();
    $(".button-pause").blur();
    
  });

  $(".button-play").on("click", function(event) {
    audioElement.play();
    $(".button-play").blur();
  });

  $(".button-stop").on("click", function(event) {
    audioElement.pause();
    audioElement.load();
    $(".button-stop").blur();
  });

  $(".button-skip-forward").on("click", function(event) {
    audioElement.currentTime += 5;
    $(".button-skip-fastword").blur();
  });

  $(".button-skip-backward").on("click", function(event) {
    audioElement.currentTime -= 5;
    $(".button-skip-backward").blur();
  });

  $(".aux-event").on("click", function(event) {
    audioElement.pause();
    audioElement = document.getElementById("event");
    audioElement.load();
    $('.track-title').html('Now Playing: Auxillary Event');
  });

  $(".love-particles").on("click", function(event) {
    audioElement.pause();
    audioElement = document.getElementById("particles");
    audioElement.load();
    var source = context.createMediaElementSource(audioElement);
    source.connect(context.destination);
    source.connect(analyser);
    $('.track-title').html('Now Playing: Love Particles');
  });

  $(".mono-rocket").on("click", function(event) {
    audioElement.pause();
    audioElement = document.getElementById("rocket");
    audioElement.load();
    var source = context.createMediaElementSource(audioElement);
    source.connect(context.destination);
    source.connect(analyser);
    $('.track-title').html('Now Playing: Mono Rocket');
  });

});