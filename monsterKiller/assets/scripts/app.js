const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0;
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1;

const enteredValue = prompt('Set maximum life for player and monster:', '100');

let chosenMaxLife = parseInt(enteredValue);

// If entered value is NaN or negative, set maxLife to default 100
if ( isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= damageToPlayer;

    if ( currentPlayerHealth <= 0 && hasBonusLife ) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Saved by the bell!');
    }

    if ( currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You won!');
    } else if ( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
        alert('You lost!');
    } else if ( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ) {
        alert('It\'s a draw!');
    }

    // No matter who won or lost, game will reset
    if ( currentMonsterHealth <= 0 || currentPlayerHealth <=0 ) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if ( mode === MODE_ATTACK ) {
        maxDamage = ATTACK_VALUE;
    } else if ( mode === MODE_STRONG_ATTACK ) {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damageToMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageToMonster;
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
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);