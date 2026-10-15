// Placeholder menu. Up/Down moves the cursor, B or Start goes back.

const ITEMS = ['CREATURES', 'BAG', 'SAVE', 'CLOSE'];

export class Menu {
  constructor() {
    this.cursor = 0;
  }

  enter() {
    this.cursor = 0;
  }

  update(input, states) {
    if (input.wasPressed('up'))   this.cursor = (this.cursor + ITEMS.length - 1) % ITEMS.length;
    if (input.wasPressed('down')) this.cursor = (this.cursor + 1) % ITEMS.length;

    if (input.wasPressed('b') || input.wasPressed('start')) states.change('overworld');
    if (input.wasPressed('a') && ITEMS[this.cursor] === 'CLOSE') states.change('overworld');
  }

  draw(r) {
    r.clear(1);
    r.rect(88, 8, 64, 64, 0);
    r.rect(88, 8, 64, 2, 3);
    r.rect(88, 70, 64, 2, 3);
    ITEMS.forEach((item, i) => {
      const prefix = i === this.cursor ? '> ' : '  ';
      r.text(prefix + item, 94, 16 + i * 12, 3);
    });
  }
}