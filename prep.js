$(document).ready( function() {
  var synth = window.speechSynthesis;

  var questions = ["Given a string, strip whitespace from it in-place", "Given a string, remove duplicate characters from it", "Given a string, reverse it", "Given a string with words separated by a space, reverse the words)", "Given an array of numbers, for each number find the product of all the other numbers", "Given a string, find if any permutation of the string is a palindrome"];

  var number = Math.floor((Math.random() * questions.length));

  var currentQuestion = null;

  var currentTime = null;
  // var examples = ["H e  llo W orl     d ==> HelloWord", "AAA BBB ==> A B", "Hello ==> olleH", "This is stuff ==> stuff is This"];

  $(".repeat, .show-example, .stop, .next").hide();

  $(".start").click(function(){
    // var number = Math.floor((Math.random() * questions.length));
    currentQuestion = questions[number];
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    synth.speak(utterThis);
    currentTime = Date.now(); //in milliseconds

    $(".start, .recorded-time").hide();
    $(".next, .repeat, .show-example, .stop").show();

    // $(".show-example").click(function() {
    //   $(".example").html("<p>" + examples[number] + "</p>");
    // });
  });

  $(".next").click(function(){
    $(".recorded-time").hide();

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
    $(".recorded-time").show();
  });
});
