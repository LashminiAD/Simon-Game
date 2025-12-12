var buttonColors = ["red", "blue", "green", "yellow"]; //array of clrs

var gamePattern = []; //comp rn pattern
var userClickedPattern = []; //user answer pattern

var started = false; //game started or not
var level = 0; //game level


//detects 1st keypress - start the game
$(document).on("keypress touchstart", function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});


 // detects button click handler
    $(".btn").click(function(){

        var userChosenClr =$(this).attr("id");
        userClickedPattern.push(userChosenClr);

        playSound(userChosenClr);
        animatePress(userChosenClr);

        checkAnswer(userClickedPattern.length-1); //len -1 = [r, b] //len 2 = 2-1=1 (index 0,1)
    });


    function checkAnswer(currentIndex){
       if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
            console.log("success");

            // check if user finished the sequence
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                    // userClickedPattern = []; // reset user pattern for new level
                },1000);
            }
        } else {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            $("#level-title").text("GAME OVER, Press any key / tap to Restart");

            startOver();
       }
    }



// next sequence function 
   function nextSequence() {
        userClickedPattern = []; // reset user pattern for new level
        level++;
        $("#level-title").text("Level " + level);
       

        // generate random number 0-3
        var rn = Math.floor(Math.random() *4);
        var rchosenClr= buttonColors[rn];

        gamePattern.push(rchosenClr);
        
        // animate flash
        $("#" + rchosenClr).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(rchosenClr);
    }

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


// play sound function
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
  
    // animate button press
    function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);
    }
   