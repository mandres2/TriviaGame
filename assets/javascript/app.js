
// ================================================================== Algorithm ====================================================================================== //
// 1) What is the objective?
        // (a) The objective is to create a Trivia game, where the user has x amount of seconds to answer a given question.
        // (b) What will be the game theme? What type of questions will be given?
                // (1) This game will be based on a Nutrition and Diet Theme.
                        // a) **8-10 "timed" multiple-choice questions
                        // b) For each given question, the user has 15 seconds to select an answer.
                        // c) User will be notified if he or she got the question right or wrong.
                        // d) After answering all questions, it will lead to a page where it will give the user results of how much they scored right and how much they scored wrong.
// 2) What is the format/style of this game?
        //a) First the user will see a "Welcome Page"
                //i) This will say "Trivia Nutrition Game," Click 'START' to Begin!
        //b) Once the user hits the start button, it will transition to the game page, where the first question is presented as well as visible countdown timer.
        //c) The game section will end once the user successfully inputs an answer for all *8-10 questions, and then a result page will pop up giving the amount the user answered correctly and the amount the user answered incorrectly.
                //i) There will be a "Reset/Play Again!" Button, which will lead back to the "Welcome Page."
// 3) Small Additions to the game:
    // a) Ideally have a sound-effect when the user clicks a button.
    // b) **Background music ~ Should be about a minute - minute & 30 seconds.


// =================================================================== Program ======================================================================================= //
// This function will run the entire script:
$(document).ready(function() {


    // Create a function that creates the start button and initial screen when the user first opens the app.

    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Trivia</a></p>";
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
    }); // Closes .answer click

    // reset button
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click

    });  // Closes jQuery wrapper

    // If the user ran out of time to answer the question, this function will appear.
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>" + Explanation[questionCounter];
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
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>" + Explanation[questionCounter];
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 6000);
    }
    //End generate loss

    // This function generates the questions:
    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question


    function wait() {
    //This function allows the ternary operator to replace if/else statements to generate more questions
    // Current value of questions: 10
    questionCounter < 9 ?
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
    //This is the final screen when the user finishes answering all questions.
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset Trivia</a></p>";
        $("#mainArea").html(gameHTML);
    }

    //This function resets the entire game, bringing back to Question 01.
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 15;
        generateQuestions();
        timerWrapper();
    }

    //This variable is that opens up the content.
    var openScreen;
    // This important variable applies the game logic.
    var gameHTML;
    // this is the counter for 15 seconds
    var counter = 15;

    //======Questions Array=====//
var questionArray = [
    "Which is least likely to lower your blood pressure?",
    "Which is least likely to lower your risk of colon cancer?",
    "Vitamin D may reduce the risk of all but one of these. Which one?",
    "Which is least likely to lower your risk of brittle bones (osteoporosis)?",
    "Which is least likely to cause food poisoning?",
    "Which is least likely to reduce your risk of diabetes?",
    "Meat eaters have a higher risk of all but one of these diseases. Which one?",
    "In regards with how MCT Oil may help with weight loss, which of the following is least likely true?",
    "Americans typically eat what percentage of their recommended intake of vegetables?",
    "How much of the recommended intake of protein should be from seafood?",
    ];

    //======Answers Array=====//
    var answerArray = [
        ["Low-Fat Yogurt", "Cantaloupe", "Whole-Grain Bread", "Spinach"],
        ["Lean Meat","Whole-Grain Bread","Low-Fat Milk","a Multivitamin"],
        ["Bone Loss","Colon Cancer","Multiple Sclerosis","Irritable Bowl Syndrome"],
        ["Low-Fat Yogurt","Collard Greens","Olive Oil","Multivitamins"],
        ["Raw-Sprouts","Salad","Mayonnaise","Chicken"],
        ["Whole-Grain Cereal","Orange Juice","Nuts/Legumes","Alcoholic Beverages"],
        ["Osteoarthritis","Diabetes","Gout","non-Hodgkins Lymphoma"],
        ["Lowers Energy Density","Burn Calories","Increase Fullness","Increase Ketones On High-Carb Diets"],
        ["About 30%", "About 40%", "About 50%", "Less than 20%"],
        ["5%", "20%", "40%", "60%"],
    ];

    //======Images to Accompany Correct Answer Array=====//
    var imageArray = new Array();
    imageArray[0] = "<img class='center-block' src='assets/images/wholegrain.jpg'>";
    imageArray[1] = "<img class='center-block' src='assets/images/lean meat.gif'>";
    imageArray[2]= "<img class='center-block' src='assets/images/IBS.jpg'>";
    imageArray[3] = "<img class='center-block' src='assets/images/olive oil.jpg'>";
    imageArray[4] = "<img class='center-block' src='assets/images/mayonnaise.jpg'>";
    imageArray[5] = "<img class='center-block' src='assets/images/orange juice.jpg'>";
    imageArray[6] = "<img class='center-block' src='assets/images/osteoarthritis.jpg'>";
    imageArray[7] = "<img class='center-block' src='assets/images/Low Carb Ketosis Graph.jpg'>";
    imageArray[8] = "<img class='center-block' src='assets/images/americans food and nutrient.jpg'>";
    imageArray[9] = "<img class='center-block' src='assets/images/seafood.jpeg'>";

    //======Solutions Array=====//
    var correctAnswers = [
    "C. Whole-Grain Bread",
    "A. Lean Meat",
    "D. Irritable Bowl Syndrome",
    "C. Olive Oil",
    "C. Mayonnaise",
    "B. Orange Juice",
    "A. Osteoarthritis",
    "D. Increase Ketones On High-Carb Diets",
    "D. Less than 20%",
    "B. 20%",
    ];

    //======Explanation to Answer when user answers Correctly or Incorrectly=====//
    var Explanation =
    [
    "The DASH study (Dietary Approaches to Stop Hypertension) showed that a lower-fat diet rich in fruits, vegetables, and low-fat dairy foods can lower blood pressure. Researchers aren’t sure whether the potassium, magnesium, calcium, protein, fiber, or other nutrients made the difference.",
    "Meat eaters seem to have a higher risk of colon cancer, even if the meat is lean. Foods that are high in magnesium (like beans, whole grains, and leafy greens) or calcium (like milk, yogurt, and cheese) seem to protect the colon. So do multivitamins (perhaps because they contain the B-vitamin folic acid) and exercise.",
    "Studies suggest that vitamin D may reduce the risk of bone loss, gum disease, multiple sclerosis, and colon cancer. Shoot for 400 IU a day (600 IU if you’re over 70). Good sources include multivitamins, calcium+D supplements, milk, and some yogurts, breads, breakfast cereals, margarines, and orange juices. Sunlight is also a good source, but not in the winter north of the line that connects Los Angeles and Atlanta.",
    "Foods high in calcium (like milk, cheese, and yogurt), vitamin K (like collards, spinach, and broccoli), potassium (like fruits and vegetables), and vitamin D help strengthen your bones. The best sources of vitamin D are sunshine, a multivitamin, or a calcium+D supplement. Weight-bearing exercise (almost any activity but swimming) also protects bones and may help prevent falls by boosting balance, coordination, and strength.",
    "Fruits and vegetables (like berries, lettuce, and sprouts) can be contaminated in the fields by tainted water or manure. Contaminated poultry, beef, and eggs may cause infections when they’re undercooked. Commercial mayonnaise is pasteurized, so it’s relatively safe.",
    "To dodge diabetes, stay lean and exercise. Studies also find a lower risk in people who drink alcoholic beverages in modest amounts (1 or 2 drinks a day for men; half a drink for women), as well as those who eat nuts, whole grains, and unsaturated fats (like the oils in salad dressing). Processed red meats (like bacon, hot dogs, and sausage), trans-fat-laden foods (like French fries, fried chicken, and pie crust), and sweets may raise diabetes risk.",
    "Meat appears to increase the risk of gout because it’s rich in a compound called purine. It’s not clear why people who eat more red meat have a higher risk of non- Hodgkins lymphoma, diabetes, and colon cancer. People who eat more red meat (and less poultry, fish, fruits, vegetables, etc.) also have a higher risk of heart disease.",
    "Low-carb Diets: Very low-carb or ketogenic diets are a effective ways to lose weight. Given that MCTs produce ketones, adding them to your diet can increase the number of carbs you can eat while staying in ketosis.",
    "The typical American eat less than 20% of the amount of vegetables recommended in updated dietary guidelines released by the U.S. Department of Agriculture and the U.S. Department of Health and Human Services for 2015-2020. The good news is that the goal of 100% is within reach for most of us. The guidelines, which are accompanied by a new food guide icon, say we should focus on more dark green, red, and orange vegetables, beans, and peas.",
    "Americans get an average of 3.5 ounces of seafood a week, but it's recommended that we more than double that to 8 ounces a week. That would be 20%, or a fifth, of the recommended weekly amount of protein foods. To do this, we should substitute one serving of seafood for one serving of meat or poultry each week.",
    ];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sound effects/Button Click Sound Effect 1.mp3");
