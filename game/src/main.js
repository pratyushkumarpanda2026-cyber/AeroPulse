// Entry point: sets everything up and runs the fixed 60 FPS loop

import { input } from './input/input.js';
import { Renderer } from './render/renderer.js';
import { StateMachine } from './core/stateMachine.js';
import { Overworld } from './core/states/overworld.js';
import { Menu } from './core/states/menu.js';

const canvas = document.getElementById('screen');
const renderer = new Renderer(canvas);

const states = new StateMachine();
states.register('overworld', new Overworld());
states.register('menu', new Menu());
states.change('overworld');

const STEP = 1000 / 60;
let last = performance.now();
let accumulator = 0;

function frame(now) {
  accumulator += Math.min(now - last, 250);
  last = now;

  while (accumulator >= STEP) {
    states.update(input);
    input.endFrame();
    accumulator -= STEP;
  }

  states.draw(renderer);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);