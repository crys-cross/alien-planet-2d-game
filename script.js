window.addEventListener(`load`, function () {
  // canvas setup
  const canvas = document.getElementById("canvas1");
  //drawing context
  const ctx = canvas.getContext(`2d`);
  canvas.width = 1500;
  canvas.height = 500;

  // keep track of specified user input(arrow keys)
  class InputHandler {}
  // handle player lasers
  class Projectile {}
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
      this.speedY = 0;
    }
    update() {
      this.y += this.speedY;
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height);
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
    }
  }
});
