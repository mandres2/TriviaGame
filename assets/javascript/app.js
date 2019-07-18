
// ================================================================== Algorithm ====================================================================================== //
// 1) What is the objective?
        // (a) The objective is to create a Trivia game, where the user has x amount of seconds to answer a given question.
        // (b) What will be the game theme? What type of questions will be given?
                // (1) This game will be based on a Nutrition and Diet Theme.
                        // a) 10 "timed" multiple-choice questions
                        // b) For each given question, the user has 25 seconds to input an answer.
                        // c) User will be notified if he or she got the question right or wrong.
                        // d) After answering all questions, it will lead to a page where it will give the user results of how much they scored right and how much they scored wrong.
// 2) What is the format of this game?
        //a) First the user will see a "Welcome Page"
                //i) This will say "Trivia Nutrtion Game," Click 'START' to Begin!
        //b) Once the user hits the start button, it will transition to the game page, where the first question is presented as well as visible countdown timer.
        //c) The game section will end once the user succesfully inputs an answer for all 15 questions, and then a result page will pop up giving the amount the user answered correctly and the amount the user answered incorrectly.
                //i) There will be a "Reset/Play Again!" Button, which will lead back to the "Welcome Page."



// =================================================================== Program ======================================================================================= //
// This function will run the entire script:
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
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>" + Explanation[questionCounter];
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 6000);
    }

    //If the user answers the question right, this function will appear.

    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter] + Explanation[questionCounter];
        $("#mainArea").html(gameHTML);

        setTimeout(wait, 6000);  //End generate win
    }

    //If the user answers the question wrong, this function will appear.
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>" + Explanation[questionCounter];
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 6000);
    }
    //End generate loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question

    function wait() {
    //This function allows the ternary operator to replace if/else statements to generate more questions
    questionCounter < 4 ?
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
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset Quiz!</a></p>";
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

    //======Questions=====//
    var questionArray =
    [ "Which is least likely to lower your blood pressure?",
    "Which is least likely to lower your risk of colon cancer?",
    "Vitamin D may reduce the risk of all but one of these. Which one?",
    "Which is least likely to lower your risk of brittle bones (osteoporosis)?",
    "Which is least likely to cause food poisoning?",
    // "Question 6",
    // "Question 7",
    // "Question 8",
    // "Question 9",
    // "Question 10",
    ];

    //======Answers=====//
    var answerArray = [
        ["Low-Fat Yogurt", "Cantaloupe", "Whole-Grain Bread", "Spinach"],
        ["Lean Meat","Whole-Grain Bread","Low-Fat Milk","a Multivitamin"],
        ["Bone Loss","Colon Cancer","Multiple Sclerosis","Irritable Bowl Syndrome"],
        ["Low-Fat Yogurt","Collard Greens","Olive Oil","Multivitamins"],
        ["Raw-Sprouts","Salad","Mayonnaise","Chicken"],
        // ["A","B","C","D"],
        // ["A","B","C","D"],
        // ["A","B","C","D"],
        ];

    //======Images to Accompany Correct Answer=====//
    var imageArray = new Array();
    imageArray[0] = "<img class='center-block' src='assets/images/wholegrain.jpg'>";
    imageArray[1] = "<img class='center-block' src='assets/images/lean meat.gif'>";
    imageArray[2]= "<img class='center-block' src='assets/images/IBS.jpg'>";
    imageArray[3] = "<img class='center-block' src='assets/images/olive oil.jpg'>";
    imageArray[4] = "<img class='center-block' src='assets/images/mayonnaise.jpg'>";
    // imageArray[5] = "<img class='center-block' src=''>";
    // imageArray[6] = "<img class='center-block' src=''>";
    // imageArray[7] = "<img class='center-block' src=''>";

    //======Solutions=====//
    var correctAnswers =
    [ "C. Whole-Grain Bread",
    "A. Lean Meat",
    "D. Irritable Bowl Syndrome",
    "C. Olive Oil",
    "C. Mayonnaise",
    // "Answer",
    // "Answer",
    // "Answer"
    ];

    //======Explanation to Answer=====//
    var Explanation =
    [
    "The DASH study (Dietary Approaches to Stop Hypertension) showed that a lower-fat diet rich in fruits, vegetables, and low-fat dairy foods can lower blood pressure. Researchers aren’t sure whether the potassium, magnesium, calcium, protein, fiber, or other nutrients made the difference.",
    "Meat eaters seem to have a higher risk of colon cancer, even if the meat is lean. Foods that are high in magnesium (like beans, whole grains, and leafy greens) or calcium (like milk, yogurt, and cheese) seem to protect the colon. So do multivitamins (perhaps because they contain the B-vitamin folic acid) and exercise.",
    "Studies suggest that vitamin D may reduce the risk of bone loss, gum disease, multiple sclerosis, and colon cancer. Shoot for 400 IU a day (600 IU if you’re over 70). Good sources include multivitamins, calcium+D supplements, milk, and some yogurts, breads, breakfast cereals, margarines, and orange juices. Sunlight is also a good source, but not in the winter north of the line that connects Los Angeles and Atlanta.",
    "Foods high in calcium (like milk, cheese, and yogurt), vitamin K (like collards, spinach, and broccoli), potassium (like fruits and vegetables), and vitamin D help strengthen your bones. The best sources of vitamin D are sunshine, a multivitamin, or a calcium+D supplement (see answer #2). Weight-bearing exercise (almost any activity but swimming) also protects bones and may help prevent falls by boosting balance, coordination, and strength.",
    "Fruits and vegetables (like berries, lettuce, and sprouts) can be contaminated in the fields by tainted water or manure. Contaminated poultry, beef, and eggs may cause infections when they’re undercooked. Commercial mayonnaise is pasteurized, so it’s relatively safe.",
    ];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sound effects/Button Click Sound Effect 1.mp3");