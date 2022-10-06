window.addEventListener(`load`, function () {
  // canvas setup
  const canvas = document.getElementById("canvas1");
  //drawing context
  const ctx = canvas.getContext(`2d`);
  canvas.width = 1500;
  canvas.height = 500;

  // keep track of specified user input(arrow keys)
  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener(`keydown`, (e) => {
        if (
          (e.key === `ArrowUp` || e.key === `ArrowDown`) &&
          this.game.keys.indexOf(e.keys) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === " ") {
          this.game.player.shootTop();
        }
        console.log(this.game.keys);
      });
      window.addEventListener(`keyup`, (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
        console.log(this.game.keys);
      });
    }
  }
  // handle player lasers
  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedOforDeletion = false;
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedOforDeletion = true;
    }
    draw(context) {
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  // deal with debris from damaging enemies
  class Particle {}
  // control the main character
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 1;
      this.maxSpeed = 3;
      this.projectiles = [];
    }
    update() {
      if (this.game.keys.includes(`ArrowUp`)) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes(`ArrowDown`))
        this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      // handle projectiles
      this.projectiles.forEach((projectiles) => {
        projectiles.update();
      });
      this.projectiles = this.projectiles.filter(
        (projectiles) => !projectiles.markedOforDeletion
      );
    }
    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach((projectiles) => {
        projectiles.draw(context);
      });
    }
    shootTop() {
      if (this.game.ammo > 0) {
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 30)
        );
        this.game.ammo--;
      }
      console.log(this.projectiles);
    }
  }
  // main blueprint handling many different enemy types
  /*Parent class(SUPER)*/
  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random * -1.5 - 0.5;
      this.markedOforDeletion = false;
    }
    update() {
      this.x += this.speedX;
      if (this.x + this.width < 0) this.markedOforDeletion = true;
    }
    draw(context) {
      context.fillstyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  /*Child class(SUB)*/
  class Angler1 extends Enemy {
    constructor(game) {
      /*super make sure constructor from parent class also gets executed here*/
      super(game);
      this.width = 228 * 0.2;
      this.height = 169 * 0.2;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
    }
  }
  // handle individual background layers(paralax)
  class Layer {}
  // pull all layer objects together(animate entire game world)
  class Background {}
  // draw score, timer and other information displayed for the user
  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = "Helvetica";
      this.color = "yellow";
    }
    draw(context) {
      // ammo
      context.fillStyle = this.color;
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }
    }
  }
  // logic will come together here(brain of project)
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 500;
      this.gameOver = false;
    }
    update(deltaTime) {
      this.player.update();
      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) this.ammo++;
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update();
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedOforDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      this.player.draw(context);
      this.ui.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
    }
    addEnemy() {
      this.enemies.push(new Angler1(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  // animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
