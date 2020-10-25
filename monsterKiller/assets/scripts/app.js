const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 13;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const damageToMonster = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damageToMonster;
    const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= damageToPlayer;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        console.log('You won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        console.log('You lost!');
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        console.log('It\'s a draw!');
    }
}

attackBtn.addEventListener('click', attackHandler);