$(document).ready( function() {
  var synth = window.speechSynthesis;

  var questions = ["Given a string, strip whitespace from it in-place",
  "Given a string, remove duplicate characters from it",
  "Given a string, reverse it",
  "Given a string with words separated by a space, reverse the words)",
  "Given an array of numbers, for each number find the product of all the other numbers",
  "Given a string, find if any permutation of the string is a palindrome",
  "Given an unsorted array with integers between 1 and 1,000,000, find the one integer that is in the array twice.",
  "Given an array, return the sum of the two largest integers",
  "Given an array, return the largest sum of contiguous integers"];

  var number = Math.floor((Math.random() * questions.length));

  var currentQuestion = null;

  var currentTime = null;
  // var examples = ["H e  llo W orl     d ==> HelloWord",
  // "AAA BBB ==> A B",
  // "Hello ==> olleH",
  // "This is stuff ==> stuff is This",
  // "[1,2,3,4,5] ==> [14, 13, 12, 11, 10]",
  // "aggppa ==> agppga (true)",
  // "[1,2,345,213...2,23543] ==> 2",
  // "[1,5,6,9,23,2] ==> 32",
  // "[24,67,12,1,6,3] ==> 91"
  // ];

  $(".repeat, .show-example, .stop, .next").hide();

  var voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  var sayQuestion = function() {
    currentQuestion = questions[number];
    var utterThis = new SpeechSynthesisUtterance(currentQuestion);
    utterThis.rate = 0.8;
    utterThis.voice = voices[65];
    synth.speak(utterThis);
  };

  var getQuestion = function() {
    $(".show-example").show();
    // $(".example-text").html("");
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

  // var showExample = function() {
  //   $(".show-example").hide();
  //   $(".example-text").html("<p>" + examples[number] + "</p>");
  // };

  $(".start").click(function(){
    sayQuestion();
    currentTime = Date.now(); //in milliseconds

    $(".start, .recorded-time").hide();
    $(".next, .repeat, .show-example, .stop").show();
  });

  // $(".show-example").click(function() {
  //   showExample();
  // });

  $(".next").click(function(){
    getQuestion();
  });

  $(".repeat").click(function() {
    sayQuestion();
  });

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
    // else if (e.keyCode === 40){
    //   showExample();
    // }
  });

});
