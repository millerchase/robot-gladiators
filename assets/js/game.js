//VARIABALE

// players name and setup
let playerName = window.prompt("What is your robot's name");
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

// enemies setup
let enemyName = "Roborto";
let enemyHealth = 50;
let enemyAttack = 12;


//FUNCTIONS

// fighter introduction
const intro = () => {
    window.alert(`Introducing ${playerName}! With an HP of ${playerHealth}, and attack power of ${playerAttack}! \n And... \n The oponent, ${enemyName}! With an HP of ${enemyHealth}, and attack power of ${enemyAttack}!`);
}

// update for fight progress
const fightUpdate = (attacker) => {
    if (attacker === playerName) {
        console.log(`${attacker} attacks ${enemyName}. ${enemyName} now has ${enemyHealth} health reamaining.`);
    } else if (attacker === enemyName) {
        console.log(`${attacker} attacks ${playerName}. ${playerName} now has ${playerHealth} health reamaining.`);
    } else {
        console.log("error in fight update");
    }
}

// create a function named "fight"
const fight = () => {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").toLowerCase();
    if (promptFight === 'fight') {

        intro();
    
        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth -= playerAttack;
    
        //Log a resulting message to the console so we know that it worked
        if (enemyHealth > 0) {
            fightUpdate(playerName);
        } else {
            window.alert(`${enemyName} has died!`);
        }
    
        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth -= enemyAttack;
        
        //Log a resulting message to the console so we know that it worked
        if (playerHealth > 0) {
            fightUpdate(enemyName);
        } else {
            window.alert(`${playerName} has died!`);
        }

     // if player chooses to skip
    } else if (promptFight === 'skip') {
        // confirm player wants to skip
        let confirmSkip = window.confirm("Are you sure you'd like to quite?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(`${playerName} has chosen to skip the fight. Goodbye!`);
            playerMoney = playerMoney -2;
         // if no (false, ask question again by running fight() again)
        } else {
            fight()
        }
     // invalid response
    } else {
        window.alert(`You need to choose a valid option. Try again!`);
    }
}



//INSTANCES

fight();


