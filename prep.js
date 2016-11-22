$(document).ready( function() {
  var synth = window.speechSynthesis;

  var questions = ["Strip whitespace from a string in-place", "Remove duplicate characters from a string", "Reverse a string", "Reverse words in a string, where words are separated by one or more spaces)"];

  var number = Math.floor((Math.random() * questions.length));

  var currentQuestion = null;

  var currentTime = null;
  // var examples = ["H e  llo W orl     d ==> HelloWord", "AAA BBB ==> A B", "Hello ==> olleH", "This is stuff ==> stuff is This"];

  $(".repeat").hide();
  $(".show-example").hide();
  $(".stop").hide();
  $(".next").hide();

  $(".start").click(function(){
    // var number = Math.floor((Math.random() * questions.length));
    currentQuestion = questions[number];
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    synth.speak(utterThis);
    currentTime = Date.now(); //in milliseconds

    $(".start").hide();
    $(".next").show();
    $(".repeat").show();
    $(".show-example").show();
    $(".stop").show();

    // $(".show-example").click(function() {
    //   $(".example").html("<p>" + examples[number] + "</p>");
    // });
  });

  $(".next").click(function(){
    if (number === (questions.length - 1)) {
      number = 0;
    }
    else {
      number += 1;
    }

    currentTime = Date.now(); //in milliseconds
    currentQuestion = questions[number];
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    synth.speak(utterThis);

    // $(".show-example").click(function() {
      // $(".example").html("<p>" + examples[number] + "</p>");
    // });
  });

  $(".repeat").click(function() {
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    synth.speak(utterThis);
  });

  $(".stop").click(function() {
    var stopTime = Date.now();
    var duration = stopTime - currentTime;
    var milliseconds = parseInt((duration%1000)/100);
    var seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    var hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var time = hours + ":" + minutes + ":" + seconds + "." + milliseconds;

    $(".recorded-time").html("<p>" + time + "</p>");
  });
});
