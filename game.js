// Get All Buttons colors
let buttonColours = ["red", "blue", "green", "yellow"];

// get all game pattern the will randomly generated
let gamePattern = [];

// get all user clicks
let userClickedPattern = [];


let level = 0;


let started = false;

// To be happened if the game leveled up
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").html("level " + level);

    let randomNumber = Math.floor((Math.random() * 4));

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    animatePress(randomChosenColour);

}

// detect the user clicks and check answer
$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

// to play the sound
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");

    audio.play().then(r => audio.remove());

}

// to make animations
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColor).removeClass("pressed");

    }, 100);

}

// to start the game in the first place
$(document).keypress(function () {

        if (!started) {
            nextSequence();
            started = true;
        }

});

$("#level-title").click(function() {

    if (!started) {
        nextSequence();
        started = true;
    }
    
});

// to check the user answers vs the game pattern
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
    } else {
        gameOver();
        startOver();
    }

    if (userClickedPattern.length === gamePattern.length) {

        setTimeout(nextSequence, 1000);

    }
}


// to game over and start over
function gameOver() {


    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);


    playSound("wrong");

    $("#level-title").html("Game Over, Press A Key to Restart");

}

// to start over again
function startOver() {
    level = 0;

    gamePattern = [];

    started = false;
}
