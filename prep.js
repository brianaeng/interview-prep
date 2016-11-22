$(document).ready( function() {
  var synth = window.speechSynthesis;

  var questions = ["Given a string, strip whitespace from it in-place", "Given a string, remove duplicate characters from it", "Given a string, reverse it", "Given a string with words separated by a space, reverse the words)", "Given an array of numbers, for each number find the product of all the other numbers", "Given a string, find if any permutation of the string is a palindrome", "Given an unsorted array with integers between 1 and 1,000,000, find the one integer that is in the array twice.", "Given an array, return the sum of the two largest integers", "Given an array, return the largest sum of contiguous integers"];

  var number = Math.floor((Math.random() * questions.length));

  var currentQuestion = null;

  var currentTime = null;
  // var examples = ["H e  llo W orl     d ==> HelloWord", "AAA BBB ==> A B", "Hello ==> olleH", "This is stuff ==> stuff is This"];

  $(".repeat, .show-example, .stop, .next").hide();

  var sayQuestion = function() {
    currentQuestion = questions[number];
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    synth.speak(utterThis);
  };

  $(".start").click(function(){
    // var number = Math.floor((Math.random() * questions.length));
    sayQuestion();
    currentTime = Date.now(); //in milliseconds

    $(".start, .recorded-time").hide();
    $(".next, .repeat, .show-example, .stop").show();

    // $(".show-example").click(function() {
    //   $(".example").html("<p>" + examples[number] + "</p>");
    // });
  });

  var getQuestion = function() {
    $(".recorded-time").hide();

    if (number === (questions.length - 1)) {
      number = 0;
    }
    else {
      number += 1;
    }

    currentTime = Date.now(); //in milliseconds
    sayQuestion();
  };

  $(".next").click(function(){
    getQuestion();
  });

  $(".repeat").click(function() {
    sayQuestion();
  });

  var showTimer = function(){
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
  };

  $(".stop").click(function() {
    showTimer();
  });

  $("body").keydown(function(e) {
    if (e.key === " ") {
      showTimer();
    }
    else if (e.keyCode === 39) {
      getQuestion();
    }
    else if (e.keyCode === 37) {
      sayQuestion();
    }
  });

});
