//VARIABALE

// players name and setup; created default name 'The Stranger' if no name was entered
let playerName = window.prompt("What is your robot's name") || 'The Stranger';
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

// enemies setup
let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;


//FUNCTIONS

// fighter introduction
const intro = (enemyName) => {
    console.log(`NEXT BATTLE ON ROBOT GLADIATORS!!! \n ${playerName} VS. ${enemyName}!`);
}

// update for fight progress
const fightUpdate = (attacker, enemyName) => {
    if (attacker === playerName) {
        console.log(`${attacker} attacks ${enemyName}. ${enemyName} now has ${enemyHealth} health reamaining.`);
    } else if (attacker === enemyName) {
        console.log(`${attacker} attacks ${playerName}. ${playerName} now has ${playerHealth} health reamaining.`);
    } else {
        console.log("error in fight update");
    }
}

// create a function named "fight"
const fight = (enemyName) => {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    
    intro(enemyName);
    
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run
        let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.").toLowerCase();
        if (promptFight === 'fight') {
            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth -= playerAttack;
            //Log a resulting message to the console so we know that it worked
            if (enemyHealth > 0) {
                fightUpdate(playerName, enemyName);
            } else {
                console.log(`${enemyName} has died!`); 

                // award player money for winning
                playerMoney += 20;
                break;    
            }
        
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth -= enemyAttack;
            //Log a resulting message to the console so we know that it worked
            if (playerHealth > 0) {
                fightUpdate(enemyName, enemyName);
            } else {
                console.log(`${playerName} has died!`);
                break;
            }    

            // if player chooses to skip
        } else if (promptFight === 'skip') {
            // confirm player wants to skip
            let confirmSkip = window.confirm("Are you sure you want to skip?"); 
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(`${playerName} has decided to skip this fight. Goodbye!`);
                playerMoney -= 10;
                console.log("playerMoney", playerMoney);
                break;
                // if no (false, ask question again by running fight() again)
            } else {
                fight(enemyName)
            }
            // invalid response
        } else {
            window.alert(`You need to choose a valid option. Try again!`);
            fight(enemyName);
        }
    }
}


//INSTANCES
// let enemyName = enemyNames[Math.floor(Math.random() * 3)];

for (let i = 0; i < enemyNames.length; i++) {
    let pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}

