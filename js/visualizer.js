var width = 960,
  height = 500;

var svg = d3.select(".svg-container").append("svg")
  .attr("width", width)
  .attr("height", height);


var data = [];
for (var i = 0; i < 128; i++) {
  data[i] = {y:-500};
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

var updateProgressBar = function(value) {
  $(".progress-bar").attr("aria-valuenow", value);
  $(".progress-bar").attr("aria-valuenow", value);
  $(".progress-bar").attr("style", "width:"+value+"%");
  $(".progress-bar").text(value+"% buffered");

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
  if (audioElement.buffered.length) {
    var progress = (audioElement.buffered.end(0) / audioElement.duration) * 100;
    updateProgressBar(progress.toFixed(1));
  }
  if (audioElement.networkState === 2) {
    $(".spinner").show();
    $(".load-message").text("Loading");
  } else if (audioElement.networkState === 1) {
    $(".spinner").hide();
    $(".load-message").text("");
  }

};

var updateArray = function(array) {
  for (var i = 0; i < data.length; i++) {
    data[i].y = array[i];
  }
};

var lastRun = Date.now();
var analyze = function() {

  requestAnimationFrame(analyze);
  analyser.getFloatFrequencyData(dataArray);
  updateArray(dataArray);
  update();
};

analyze();



$(document).ready(function() {

  $(".button-pause").on("click", function() {
    audioElement.pause();
    $(".button-pause").blur();
    $(".button-pause").addClass("active");
    $(".button-play").removeClass("active");
    
  });

  $(".button-play").on("click", function() {
    //audioElement.load();
    audioElement.play();
    $(".button-play").blur();
    $(".button-play").addClass("active");
    $(".button-pause").removeClass("active");
  });

  $(".button-stop").on("click", function() {
    audioElement.pause();
    //audioElement.load();
    $(".button-stop").blur();
    $(".button-play").removeClass("active");
    $(".button-pause").removeClass("active");
  });

  $(".button-skip-forward").on("click", function() {
    audioElement.currentTime += 5;
    $(".button-skip-fastword").blur();
  });

  $(".button-skip-backward").on("click", function() {
    audioElement.currentTime -= 5;
    $(".button-skip-backward").blur();
  });

  $(".aux-event").on("click", function() {
    $(".spinner").show();
    $(".load-message").text("Loading");
    audioElement.pause();
    audioElement = $("#event")[0];
    //audioElement.load();
    audioElement.play();
    setTimeout(function(){audioElement.pause();}, 10);
    $('.track-title').html('Now Playing: Auxillary Event');
    $(".button-play").removeClass("active");
    $(".button-pause").removeClass("active");
    
  });

  $(".love-particles").on("click", function() {
    $(".spinner").show();
    $(".load-message").text("Loading");
    audioElement.pause();
    audioElement = $("#particles")[0];
    //audioElement.load();
    audioElement.play();
    setTimeout(function(){audioElement.pause();}, 10);
    $('.track-title').html('Now Playing: Love Particles');
    $(".button-play").removeClass("active");
    $(".button-pause").removeClass("active");
  });

  $(".mono-rocket").on("click", function() {

    audioElement.pause();
    audioElement = $("#rocket")[0];
    //audioElement.load();
    audioElement.play();
    setTimeout(function(){audioElement.pause();}, 10);
    $('.track-title').html('Now Playing: Mono Rocket');
    $(".button-play").removeClass("active");
    $(".button-pause").removeClass("active");
  });

});

