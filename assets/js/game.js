//VARIABALES AND OBJECTS

// players name and setup; created default name 'The Stranger' if no name was entered
const playerInfo = {
    name: window.prompt("What is your robot's name") || 'The Stranger',
    health: 100,
    attack: 10,
    money: 10,
    reset: function() { 
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -=7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    addMoney: function() {
        this.money += 20;
    },
};

// enemies setup
const enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

//FUNCTIONS

// random number with min and max span for dynamic values
function randomNumber(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

// fighter introduction (used for testing not in use)
const intro = (enemyName) => {
    console.log(`NEXT BATTLE ON ROBOT GLADIATORS!!! \n ${playerInfo.name} VS. ${enemyName}!`);
};

// update for fight progress
const fightUpdate = (attacker, enemy) => {
    if (attacker.name === playerInfo.name) {
        console.log(`${attacker.name} attacks ${enemy.name}. ${enemy.name} now has ${enemy.health} health reamaining.`);
    } else if (attacker.name === enemy.name) {
        console.log(`${attacker.name} attacks ${playerInfo.name}. ${playerInfo.name} now has ${playerInfo.health} health reamaining.`);
    } else {
        console.log("error in fight update");
    }
};

// create a function named "fight"
const fight = (enemy) => {
    // create round counter
    
    while(playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to fight or run
        let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.", 'FIGHT') || 'fight';
        if (promptFight.toLowerCase() === 'fight') {

            // generate random damage value based on player's attack power
            let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            //Subtract the value of `playerInfo.attack` damage from the value of `enemy Health` and use that result to update the value in the `enemy Health` variable
            enemy.health = Math.max(0, enemy.health - damage);

            //Log a resulting message to the console so we know that it worked
            if (enemy.health > 0) {
                fightUpdate(playerInfo, enemy);
            } else {
                console.log(`${enemy.name} has died!`); 
                
                // award player money for winning
                playerInfo.addMoney();
                break;    
            }


            // generate random dame value based on enemy's attack power
            damage = randomNumber(enemy.attack - 3, enemy.attack);
            
            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            //Log a resulting message to the console so we know that it worked
            if (playerInfo.health > 0) {
                fightUpdate(enemy, enemy);
            } else {
                console.log(`${playerInfo.name} has died!`);
                break;
            }

            
            // if player chooses to skip
        } else if (promptFight.toLowerCase() === 'skip') {
            // confirm player wants to skip
            let confirmSkip = window.confirm("Are you sure you want to skip?"); 
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
                // if no (false, ask question again by running fight() again)
            } else {
                fight(enemy);
            }
            // invalid response
        } else {
            window.alert(`You need to choose a valid option. Try again!`);
            fight(enemy);
        }
    }
};

// logic for starting game
const startGame = () => {

    // reset player stats
    playerInfo.reset();

    for (let i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Alert players that they are starting the battle
            window.alert(`Welcome to Robot Gladiators! Round: ${i + 1}`);
            let pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert(`Great job, you've survived the Game! You now have a score of ${playerInfo.money}.`);
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
    ) || 'leave';

    switch(shopOptionPrompt.toLowerCase()) {
        case 'refill':
            //run refill method attached to player info
            playerInfo.refillHealth();
            break;

        case 'upgrade':
            //run upgrade attack method in player info
            playerInfo.upgradeAttack();
            break;
    
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

