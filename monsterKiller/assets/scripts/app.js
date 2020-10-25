const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 13;
const STRONG_ATTACK_VALUE = 17;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
    let maxDamage;
    if ( mode === 'ATTACK' ) {
        maxDamage = ATTACK_VALUE;
    } else if ( mode === 'STRONG_ATTACK' ) {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damageToMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageToMonster;
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

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);