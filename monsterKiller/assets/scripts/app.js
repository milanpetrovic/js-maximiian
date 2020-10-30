const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 13;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
    const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= damageToPlayer;

    if ( currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        console.log('You won!');
    } else if ( currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
        console.log('You lost!');
    } else if ( currentMonsterHealth <= 0 && currentPlayerHealth <= 0 ) {
        console.log('It\'s a draw!');
    }
}

function attackMonster(mode) {
    let maxDamage;
    if ( mode === 'ATTACK' ) {
        maxDamage = ATTACK_VALUE;
    } else if ( mode === 'STRONG_ATTACK' ) {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damageToMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageToMonster;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
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