var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//to select id of button and pus hit in userChosenColour
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
 if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
   console.log("Success");
   if (userClickedPattern.length===gamePattern.length) {
     setTimeout(function () {
          nextSequence();
        }, 1000);
   }
 }else {
   console.log("Wrong");
   playSound('wrong');
   $('body').addClass('game-over');
   setTimeout(function() {
    $('body').removeClass('game-over');
  },200)
  $('#level-title').text("GAME OVER Press Restart");
 }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);

    var randomNumber = Math.floor(Math.random()*3 + 1);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  var sound = new Audio('sounds/'+ name + '.mp3');
  sound.play();
}

//Add Animations to User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
 setTimeout(function () {
   $("#" + currentColor).removeClass("pressed");
 }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
