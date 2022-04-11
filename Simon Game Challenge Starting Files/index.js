var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
started = false;

// var randomChosenColour = buttonColours[nextSequence()];
// gamePattern.push(randomChosenColour);

// function nextSequence() {
//     var randomNumber = Math.floor(Math.random() * 4);
//     return randomNumber;
// }
// console.log(randomChosenColour);
// $("#" + randomChosenColour).on("click", function (event) {
//     console.log(event);
//     event.currentTarget.classList.add("pressed");
//     var aud = new Audio("sounds/" + randomChosenColour + ".mp3");
//     aud.play();

//     setTimeout(function () {
//         event.currentTarget.classList.remove("pressed");
//     }, 100);
// });

// 
$(".btn").on("click", function (event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    console.log("this is user"+userClickedPattern);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}

function playsound(name) {
    var aud = new Audio("sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currentColour){
    console.log($("#"+currentColour).attr);
    $("#"+currentColour).addClass("pressed");
    
    // var aud = new Audio("sounds/" + currentColour + ".mp3");
    // aud.play();

    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    }, 100);


};

$(document).on("keypress",function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});
// $("h1").text("Level "+level);
function checkAnswer(currentLevel){
    console.log(currentLevel, userClickedPattern, gamePattern);
    console.log(userClickedPattern[currentLevel], gamePattern[currentLevel]);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("correct");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }}
else {
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

}
    }

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}
