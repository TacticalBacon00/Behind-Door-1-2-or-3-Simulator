/*

This is a simulator for the "Monty Hall Problem" inspired by an
episode of Brooklyn Nine-Nine (s04e08 "Skyfire Cycle"). You can find
this scene at the link below and the transcript below that. Usage
instructions are below the transcript.
( http://out-there-on-the-maroon.tumblr.com/post/154356816070/hijadepavlov-scullysthumbtacks-the-monty-hall )

In this scene, Holt and Kevin present the following problem:

Kevin: "There are three doors, behind one of which is a car. You pick
a door. The host, who knows where the car is, opens a different
door, showing you there’s nothing behind it. Now the host asks
if you’d like to choose the other unopened door. Should you do it?"

Both Ray and Kevin: "It’s simple math."

Ray: "It doesn’t make any sense to switch. The prize is behind
      one of two doors. It’s a 50/50 chance either way."

Kevin: "It’s 2/3 if you switch, 1/3 if you don’t. The probability
      locks in when you make the choice."

This js script is designed to simulate the choice, then give the stats
for your guesses, to prove who is right. To run this, simply open Chrome,
IE, or Firefox, press F12, paste this whole code in the console, then
hit enter to run it. To run multiple times, keeping a rolling log
of your statistics, just run the command 'choice();' without the quotes
in your javascript console.

*/

//The three doors...yeah
var door1 = "Door #1", door2 = "Door #2", door3 = "Door #3";
//Where the car is going to be stored; to be picked later
var carLocation;
//Where the car is NOT; to be picked later
var wrongChoices;
//What you pick as your guess
var originalUserChoice;
//Will be one of the two wrong doors
var randomWrongDoor, otherWrongDoor;
//Uses a true/false to indicate if you changed your mind
var changedChoice;
//Stores a 0 or 1 to indicate heads or tails
var coinFlip;
//To track correct vs. incorrect guesses; starts counter at 0
var correctGuesses = 0, incorrectGuesses = 0;

//The actual work of the program
var choice = function() {

  //**Puts the car behind a random door**
  var randomNumber = Math.random(); //Generates a number between 0 and 0.99999999999999999999
  //If the random number is between 0 and .33, the car is behind Door #1
  if (randomNumber < .333333) {carLocation = door1; wrongChoices = [door2, door3];}
  //If the random number is between .33 and .66, the car is behind Door #2
  else if (randomNumber < .666666) {carLocation = door2; wrongChoices = [door1, door3];}
  //If the random number is between .66 and .99, the car is behind Door #3
  else if (randomNumber < .999999) {carLocation = door3; wrongChoices = [door1, door2];}
  else { alert("Random number generator failed.");} //Just in case the random number is between .9999991 and 1

  //**Asks you to pick a door and records your answer in a variable called originalUserChoice**
  originalUserChoice = prompt("Please choose a door:\nDoor #1\nDoor #2\nDoor #3", "Door #X");
  //Checks to make sure that the user entered a valid choice
  if (originalUserChoice != "Door #1" && originalUserChoice != "Door #2" && originalUserChoice != "Door #3"){
    alert("You have made an invalid choice");
    return;
  }
  alert("Your choice has been recorded.");

  //**Tosses a coin, to determine the random wrong door**
  if(Math.floor(Math.random()*2) >= 1) { //Generates a 0 or 1 (heads/tails) to assign values to both wrong doors
    randomWrongDoor = wrongChoices[0];
    otherWrongDoor = wrongChoices[1];
  } else {
    randomWrongDoor = wrongChoices[1];
    otherWrongDoor = wrongChoices[0];
  };

  //**Opening the door and revealing the empty room**
  alert("I will now open one of the doors...\n" + randomWrongDoor + " has been opened and does not contain a car!");

  //Asks if the user wants to change their mind
  changedChoice = confirm(randomWrongDoor + " does not have a car. You chose " + originalUserChoice + ". Will you change your decision?");

  //**THE FINAL REVEAL!**
  if (changedChoice == false){ //USER DID NOT CHANGE CHOICE
    if (carLocation == originalUserChoice){ //USER GUESSED CORRECTLY
      correctGuesses++; //Adds a correct guess to the counter
      alert("You have chosen...correctly!");
    } else{ //USER GUESSED INCORRECTLY
      incorrectGuesses++; //Adds an incorrect guess to the counter
      alert("You have chosen...poorly.");
    }
  } else { //USER DID CHANGE CHOICE
    if (carLocation != originalUserChoice){ //USER GUESSED CORRECTLY
      correctGuesses++; //Adds a correct guess to the counter
      alert("You have chosen...correctly!");
    } else { //USER GUESSED INCORRECTLY
      incorrectGuesses++; //Adds an incorrect guess to the counter
      alert("You have chosen...poorly.");
    }
  }
  //Gives total running stats
  alert("Your current statistics:\nCorrect guesses: " + correctGuesses + "\nIncorrect guesses: " + incorrectGuesses + "\nTotal guesses: " + (incorrectGuesses+correctGuesses) + "\nCorrect guess percentage: " + Math.floor(((correctGuesses/(correctGuesses+incorrectGuesses))*100)) + "%");
}

//Actually runs the program
choice();
