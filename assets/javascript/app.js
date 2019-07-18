
// ============================ Algorithm ============================ //
// 1) What is the objective?
        // (a) The objective is to create a Trivia game, where the user has x amount of seconds to answer a given question.
        // (b) What will be the game theme? What type of questions will be given?
                // (1) This game will be based on a Nutrition and Diet Theme.
                        // a) 10-15 "timed" multiple-choice questions
                        // b) For each given question, the user has 25 seconds to input an answer.
                        // c) User will be notified if he or she got the question right or wrong.
                        // d) After answering all questions, it will lead to a page where it will give the user results of how much they scored right and how much they scored wrong.
// 2) What is the format of this game?
        //a) First the user will see a "Welcome Page"
                //i) This will say "Trivia Nutrtion Game," Click 'START' to Begin!
        //b) Once the user hits the start button, it will transition to the game page, where the first question is presented as well as visible countdown timer.
        //c) The game section will end once the user succesfully inputs an answer for all 15 questions, and then a result page will pop up giving the amount the user answered correctly and the amount the user answered incorrectly.
                //i) There will be a "Reset/Play Again!" Button, which will lead back to the "Welcome Page."



// ============================ Program ============================ //

$(document).ready(function() {
    // Create a function that creates the start button and initial screen

    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }

    openingPage();

    // This is an on-click event for start button to begin name

    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        $('.jumbotron').hide();

        generateQuestions();

        timerWrapper();

    }); // Closes start-button click

    $("body").on("click", ".answer", function(event){

        clickSound.play();
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theClock),
            generateLoss()
        )
    }); // Close .answer click

    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click

    });  // Closes jQuery wrapper

    // If the user ran out of time to answer the question, this function will appear.
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 1500);
    }
    
    //If the user answers the question right, this function will appear. 

    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);

        setTimeout(wait, 1500);  //End generate win
    }

    //If the user answers the question wrong, this function will appear.
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 1500);
    }
    //End generate loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question

    function wait() {
    //This function allows the ternary operator to replace if/else statements to generate more questions
    questionCounter < 7 ?
        (questionCounter++,
        generateQuestions(),
        counter = 15,
        timerWrapper() ):

       (finalScreen())
    }; //Ends function

    function timerWrapper() {
        theClock = setInterval(fifteenSeconds, 1000);
        function fifteenSeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }

    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 15;
        generateQuestions();
        timerWrapper();
    }

    var openScreen;
    var gameHTML;
    var counter = 15;
    var questionArray =
    [ "Which is least likely to lower your blood pressure?",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
    "Question 7",
    "Question 8" ];

    var answerArray = [
        ["Low-fat yogurt", "Cantaloupe", "Whole-Grain Bread", "Spinach"],
        ["A","B","C","D"],
        ["A","B","C","D"],
        ["A","B","C","D"],
        ["A","B","C","D"],
        ["A","B","C","D"],
        ["A","B","C","D"],
        ["A","B","C","D"], ];


    var imageArray = new Array();
    imageArray[0] = "<img class='center-block' src='assets/images/wholegrain.jpg'>";
    imageArray[1] = "<img class='center-block' src='image placed here'>";
    imageArray[2]= "<img class='center-block' src=''>";
    imageArray[3] = "<img class='center-block' src=''>";
    imageArray[4] = "<img class='center-block' src=''>";
    imageArray[5] = "<img class='center-block' src=''>";
    imageArray[6] = "<img class='center-block' src=''>";
    imageArray[7] = "<img class='center-block' src=''>";

    var correctAnswers =
    [ "C. Whole-Grain Bread",
    "Answer",
    "Answer",
    "Answer",
    "Answer",
    "Answer",
    "Answer",
    "Answer"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sound effects/Button Click Sound Effect 1.mp3");