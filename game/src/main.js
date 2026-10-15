// Entry point: loads the map, sets everything up and runs the fixed 60 FPS loop.

import { input } from './input/input.js';
import { Renderer } from './render/renderer.js';
import { StateMachine } from './core/stateMachine.js';
import { TileMap } from './core/tilemap.js';
import { Overworld } from './core/states/overworld.js';
import { Menu } from './core/states/menu.js';

const canvas = document.getElementById('screen');
const renderer = new Renderer(canvas);

let mapData;
try {
  // Path is relative to game/index.html. Run Live Server from the project root.
  const res = await fetch('../assets/maps/town.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  mapData = await res.json();
} catch (err) {
  console.error('Could not load map:', err);
  renderer.clear(0);
  renderer.text('MAP LOAD FAILED', 8, 8, 3);
  renderer.text('See console (F12)', 8, 20, 3);
  throw err;
}

const states = new StateMachine();
states.register('overworld', new Overworld(new TileMap(mapData)));
states.register('menu', new Menu());
states.change('overworld');

// Fixed timestep: game logic always advances in exact 1/60 s steps,
// no matter how fast the screen refreshes.
const STEP = 1000 / 60;
let last = performance.now();
let accumulator = 0;

function frame(now) {
  accumulator += Math.min(now - last, 250); // cap so a tab switch doesn't cause a huge catch-up
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