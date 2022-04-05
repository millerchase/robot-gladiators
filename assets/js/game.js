//VARIABALES AND OBJECTS

// players name and setup; created default name 'The Stranger' if no name was entered
const playerInfo = {
    name: getPlayerName(),
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

// function for getting player's robot name
function getPlayerName() {
    let name = "";

    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }
    
    console.log(`Your robot's name is ${name}`);
    return name;
}

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

// function for fight or skip prompt
const fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?');
    
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.")
        return fightOrSkip();
    }

    if (promptFight === 'fight') {
        return false;

    } else if (promptFight.toLowerCase() === 'skip') {
        
        // confirm player wants to skip
        let confirmSkip = window.confirm("Are you sure you want to skip?"); 
        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);
            // subtract money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            
            // retur true if player wants to leave
            return true;

        } else {

            return false;
        }
    } else {
        window.alert("You need to provide a valid answer! Please try again.")
        fightOrSkip();
    }
}
// create a function named "fight"
const fight = (enemy) => {
    // create round counter
    let isPlayerTurn = true;

    // pick random first turn
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    
    while(playerInfo.health > 0 && enemy.health > 0) {
        // ask to player to fight or skip
        if(fightOrSkip()){
            break;
        }
       
        if (isPlayerTurn) {
            
            // PLAYER TURN
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
    
            // ENEMY TURN
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

         // reverse order
        } else {

            // ENEMY TURN
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

            // PLAYER TURN
            // generate random damage value based on player's attack power
            damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    
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
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;

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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    ) || 'leave';

    switch(shopOptionPrompt.toLowerCase()) {
        case "1":
        case "refill":
            //run refill method attached to player info
            playerInfo.refillHealth();
            break;

        case "2":
        case "upgrade":
            //run upgrade attack method in player info
            playerInfo.upgradeAttack();
            break;
    
        case "3":
        case "leave":
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

