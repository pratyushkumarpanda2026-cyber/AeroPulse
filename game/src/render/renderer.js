// All canvas drawing lives here. Game logic never touches the canvas directly.

export const PALETTE = ['#9bbc0f', '#8bac0f', '#306230', '#0f380f']; // light -> dark

export class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.width = canvas.width;   // 160
    this.height = canvas.height; // 144
  }

  clear(color = 0) {
    this.ctx.fillStyle = PALETTE[color];
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  rect(x, y, w, h, color = 3) {
    this.ctx.fillStyle = PALETTE[color];
    this.ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  text(str, x, y, color = 3) {
    this.ctx.fillStyle = PALETTE[color];
    this.ctx.font = '8px monospace';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(str, Math.round(x), Math.round(y));
  }

  // Placeholder look for each tile id. Replace with real art later.
  tile(id, x, y) {
    const T = 16;
    switch (id) {
      case 1: // tree
        this.rect(x, y, T, T, 0);
        this.rect(x + 2, y + 1, 12, 10, 2);
        this.rect(x + 4, y + 3, 8, 6, 3);
        this.rect(x + 7, y + 11, 2, 5, 3);
        break;
      case 2: // water
        this.rect(x, y, T, T, 2);
        this.rect(x + 2, y + 4, 6, 1, 0);
        this.rect(x + 9, y + 10, 5, 1, 0);
        break;
      case 3: // path
        this.rect(x, y, T, T, 1);
        break;
      case 4: // tall grass
        this.rect(x, y, T, T, 0);
        this.rect(x + 2, y + 4, 1, 5, 2);
        this.rect(x + 7, y + 8, 1, 5, 2);
        this.rect(x + 12, y + 3, 1, 5, 2);
        break;
      default: // grass
        this.rect(x, y, T, T, 0);
    }
  }
}