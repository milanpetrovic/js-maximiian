const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0;
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Set maximum life for player and monster:', '100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

// If entered value is NaN or negative, set maxLife to default 100
if ( isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    
    switch(event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        default:
            logEntry = {};
    }
    
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= damageToPlayer;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, damageToPlayer, currentMonsterHealth, currentPlayerHealth);

    if ( currentPlayerHealth <= 0 && hasBonusLife ) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Saved by the bell!');
    }

    if ( currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Player Won!', currentMonsterHealth, currentPlayerHealth);
    } else if ( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
        alert('You lost!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Monster Won!', currentMonsterHealth, currentPlayerHealth);
    } else if ( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ) {
        alert('Draw!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Draw!', currentMonsterHealth, currentPlayerHealth);
    }

    // No matter who won or lost, game will reset
    if ( currentMonsterHealth <= 0 || currentPlayerHealth <=0 ) {
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damageToMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageToMonster;
    writeToLog(logEvent, damageToMonster, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if ( currentPlayerHealth >= chosenMaxLife - HEAL_VALUE ) {
        console.log('You can\'t heal more than your max initial health');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);