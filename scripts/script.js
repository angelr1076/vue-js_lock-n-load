new Vue({
  el: '#app',
  data: {
    ramboHealth: 100,
    enemyHealth: 100,
    gameIsRunning: false,
    turns: [],
    ramboColor: 'red',
    enemyColor: 'green',
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.ramboHealth = 100;
      this.enemyHealth = 100;
      this.turns = [];
    },
    shoot: function () {
      let damage = this.calcDamage(3, 10);
      this.enemyHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Rambo hits Enemy for ${damage}`,
      });
      if (this.checkWin()) {
        return;
      }
      this.enemyAttack();
    },
    grenadeAttack: function () {
      let damage = this.calcDamage(10, 20);
      this.enemyHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Rambo uses grenade on Enemy for ${damage}`,
      });
      this.ramboHealth -= damage;
      if (this.checkWin()) {
      }
    },
    heal: function () {
      if (this.ramboHealth <= 90) {
        this.ramboHealth += 10;
      } else {
        this.ramboHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Rambo heals for 10`,
      });

      this.enemyAttack();
    },
    giveUp: function () {
      this.ramboHealth = 0;
      this.gameIsRunning = false;
      this.turns.unshift({
        isPlayer: true,
        text: `Rambo gives up and is killed by his captor.`,
      });
    },
    enemyAttack: function () {
      let damage = this.calcDamage(5, 12);
      this.ramboHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Enemy hits Rambo for ${damage}`,
      });
    },
    calcDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function () {
      if (this.enemyHealth <= 0) {
        if (confirm('You won! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.ramboHealth <= 0) {
        if (confirm('You lost! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
