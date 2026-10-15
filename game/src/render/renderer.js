// All canvas drawing lives here. Game logic never touches the canvas directly.

export const PALETTE = ['#9bbc0f', '#8bac0f', '#306230', '#0f380f']; 

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
}