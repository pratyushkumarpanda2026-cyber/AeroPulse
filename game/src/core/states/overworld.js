// Overworld: walk around a tile map, one tile at a time, with collisions.

const SPEED = 2; // pixels per frame (16 px tile = 8 frames per step)

const DIRS = {
  up:    { dx: 0,  dy: -1 },
  down:  { dx: 0,  dy: 1 },
  left:  { dx: -1, dy: 0 },
  right: { dx: 1,  dy: 0 },
};

export class Overworld {
  constructor(map) {
    this.map = map;
    this.tx = map.start.x;     // tile position
    this.ty = map.start.y;
    this.facing = 'down';
    this.moving = false;
    this.dir = null;           // direction of the current step
    this.progress = 0;         // pixels moved into the current step
  }

  // Player position in pixels, including the step in progress.
  get px() {
    const t = this.map.tileSize;
    return this.tx * t + (this.moving ? this.dir.dx * this.progress : 0);
  }
  get py() {
    const t = this.map.tileSize;
    return this.ty * t + (this.moving ? this.dir.dy * this.progress : 0);
  }

  update(input, states) {
    if (input.wasPressed('start')) {
      states.change('menu');
      return;
    }

    // Continue the current step.
    if (this.moving) {
      this.progress += SPEED;
      if (this.progress >= this.map.tileSize) {
        this.tx += this.dir.dx;
        this.ty += this.dir.dy;
        this.moving = false;
        this.progress = 0;
      }
    }

    // Start a new step if a direction is held.
    if (!this.moving) {
      for (const name of ['up', 'down', 'left', 'right']) {
        if (!input.isDown(name)) continue;
        const d = DIRS[name];
        this.facing = name;
        if (!this.map.isSolid(this.tx + d.dx, this.ty + d.dy)) {
          this.dir = d;
          this.moving = true;
          this.progress = 0;
        }
        break;
      }
    }
  }

  draw(r) {
    const T = this.map.tileSize;
    const mapW = this.map.width * T;
    const mapH = this.map.height * T;

    // Camera follows the player, stopping at the map edges.
    const camX = Math.max(0, Math.min(mapW - r.width,  Math.round(this.px + T / 2 - r.width / 2)));
    const camY = Math.max(0, Math.min(mapH - r.height, Math.round(this.py + T / 2 - r.height / 2)));

    r.clear(0);

    // Only draw tiles that are on screen.
    const x0 = Math.floor(camX / T);
    const y0 = Math.floor(camY / T);
    const x1 = Math.min(this.map.width - 1,  Math.floor((camX + r.width  - 1) / T));
    const y1 = Math.min(this.map.height - 1, Math.floor((camY + r.height - 1) / T));
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        r.tile(this.map.get(tx, ty), tx * T - camX, ty * T - camY);
      }
    }

    // Player placeholder: a dark square with a nose showing the facing direction.
    const sx = Math.round(this.px) - camX;
    const sy = Math.round(this.py) - camY;
    r.rect(sx + 2, sy + 2, 12, 12, 3);
    r.rect(sx + 4, sy + 4, 8, 8, 2);
    const nose = {
      up:    [sx + 6,  sy + 1,  4, 3],
      down:  [sx + 6,  sy + 12, 4, 3],
      left:  [sx + 1,  sy + 6,  3, 4],
      right: [sx + 12, sy + 6,  3, 4],
    }[this.facing];
    r.rect(nose[0], nose[1], nose[2], nose[3], 3);
  }
}