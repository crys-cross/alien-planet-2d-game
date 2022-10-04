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
      this.markedOforDeletion = fales;
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedOforDeletion = true;
    }
    draw(context) {
      context.fillStyle = "yellow";
      fillRect(this.x, this.y, this.width, this.height);
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
      this.projectile = [];
    }
    update() {
      if (this.game.keys.includes(`ArrowUp`)) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes(`ArrowDown`))
        this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      // handle projectile
      this.projectile.forEach((projectile) => {
        projectile.update();
      });
    }
    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    shootTop() {
      this.projectile.push(new Projectile(this.game, this.x, this.y));
    }
  }
  // main blueprint handling many different enemy types
  class Enemy {}
  // handle individual background layers(paralax)
  class Layer {}
  // pull all layer objects together(animate entire game world)
  class Background {}
  // draw score, timer and other information displayed for the user
  class UI {}
  // logic will come together here(brain of project)
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.keys = [];
    }
    update() {
      this.player.update();
    }
    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  // animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
