// Placeholder overworld: a square you can move around.
// Replaced later by the tile map and collisions.

export class Overworld {
  constructor() {
    this.x = 76;
    this.y = 68;
    this.shade = 3;
  }

  update(input, states) {
    const speed = 1;
    if (input.isDown('left'))  this.x -= speed;
    if (input.isDown('right')) this.x += speed;
    if (input.isDown('up'))    this.y -= speed;
    if (input.isDown('down'))  this.y += speed;

    this.x = Math.max(0, Math.min(152, this.x));
    this.y = Math.max(0, Math.min(136, this.y));

    // Press A to change the square's shade (tests wasPressed).
    if (input.wasPressed('a')) this.shade = this.shade === 3 ? 2 : 3;

    if (input.wasPressed('start')) states.change('menu');
  }

  draw(r) {
    r.clear(0);
    r.rect(this.x, this.y, 8, 8, this.shade);
    r.text('OVERWORLD', 4, 4, 3);
  }
}