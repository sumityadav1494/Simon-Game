var gamePattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];


$(document).keydown(function () {
    if (started===false){
        $("#level-title").text("level " + level);
        nextSequence();
        started = !started;   
    }
})

$("div.btn").click(function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
        
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
});

     
    
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("div." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("div." + currentColour).removeClass("pressed");
        
    }, 200);
       
}
function checkAnswer(currentLevel) {

    if (userClickedPattern[ currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press any key to restart.")
        startOver();
    }
}
function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}