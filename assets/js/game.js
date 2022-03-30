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
};


// update for fight progress
const fightUpdate = (attacker, enemyName) => {
    if (attacker === playerName) {
        console.log(`${attacker} attacks ${enemyName}. ${enemyName} now has ${enemyHealth} health reamaining.`);
    } else if (attacker === enemyName) {
        console.log(`${attacker} attacks ${playerName}. ${playerName} now has ${playerHealth} health reamaining.`);
    } else {
        console.log("error in fight update");
    }
};

// create a function named "fight"
const fight = (enemyName) => {;
    // create round counter
    let round = 1;
    
    intro(enemyName);
    
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run
        let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.", 'FIGHT').toLowerCase() || 'fight';
        if (promptFight === 'fight') {
            console.log(`Round: ${round}`);
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
            
            // count for end of round
            round += 1;
            
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
                fight(enemyName);
            }
            // invalid response
        } else {
            window.alert(`You need to choose a valid option. Try again!`);
            fight(enemyName);
        }
    }
};

// logic for starting game
const startGame = () => {

    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (let i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // Alert players that they are starting the battle
            window.alert(`Welcome to Robot Gladiators! Battle: ${i + 1}`);
            let pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);

            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        
    }
    // play again
    endGame();
};

// logic for end of game
const endGame = () => {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert(`Great job, you've survived the Game! You now have a score of ${playerMoney}.`);
    } else {
        window.alert("You've lost your robot in battle.");
    }
    
    // ask player if they'd like to play again
    let playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// logic for the shop
const shop = () => {
    // ask player what they'd like to do
    let shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    ).toLowerCase();

    switch(shopOptionPrompt) {
        case 'refill':
            // make sure player has enough money
            if (playerMoney >= 7) {
                window.alert('Refilling player\'s health by 20 for 7 dollars.');

                // increase health and decrease money
                playerHealth += 20;
                playerMoney -= 7;
                break;

            } else {
                window.alert("You don't have enough money!");
                break;
            }
            

        case 'upgrade':
            // make sure player has enough money
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack decrease money
                playerAttack += 6;
                playerMoney -= 7;
                break;

            } else {
                window.alert("You don't have enough money!");
                break;
            }
            

        case 'leave':
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//INSTANCES

startGame();

