// Holds the current game state (overworld, battle, menu, dialogue

export class StateMachine {
  constructor() {
    this.states = {};
    this.current = null;
  }

  register(name, state) {
    this.states[name] = state;
  }

  change(name) {
    const next = this.states[name];
    if (!next) throw new Error(`Unknown state: ${name}`);
    if (this.current && this.current.exit) this.current.exit();
    this.current = next;
    if (this.current.enter) this.current.enter();
  }

  update(input) {
    if (this.current) this.current.update(input, this);
  }

  draw(renderer) {
    if (this.current) this.current.draw(renderer);
  }
}