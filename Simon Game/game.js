
var buttonColours = ["red","blue","green","yellow"]

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keydown(function(){

    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true
    }

})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
   })


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4)

    var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)


}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}
function animatePress(currentColour){
    $(document).ready(function (){
        $("#" + currentColour).addClass("pressed");
        setTimeout(() => {
            $("#" + currentColour).removeClass("pressed");
        },100);
    })
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        
        playSound("wrong");

        startOver();

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("!Gameover! press any ket to start again")
    }
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];   
}