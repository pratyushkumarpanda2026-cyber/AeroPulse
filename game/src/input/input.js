// Keyboard + touch input. Both feed the same set of logical buttons.
// Game code only asks: input.isDown('left'), input.wasPressed('a')

const KEY_MAP = {
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
  z: 'a',
  x: 'b',
  enter: 'start',
  shift: 'select',
};

const down = new Set();    
const pressed = new Set();  

function press(btn) {
  if (!down.has(btn)) pressed.add(btn);
  down.add(btn);
}

function release(btn) {
  down.delete(btn);
}

window.addEventListener('keydown', (e) => {
  const btn = KEY_MAP[e.key.toLowerCase()];
  if (!btn) return;
  e.preventDefault();
  if (!e.repeat) press(btn);
});

window.addEventListener('keyup', (e) => {
  const btn = KEY_MAP[e.key.toLowerCase()];
  if (btn) release(btn);
});

// Don't leave buttons stuck if the window loses focus.
window.addEventListener('blur', () => down.clear());

// On-screen buttons from index.html (data-key attribute).
document.querySelectorAll('[data-key]').forEach((el) => {
  const btn = KEY_MAP[el.dataset.key.toLowerCase()];
  if (!btn) return;

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    el.classList.add('pressed');
    press(btn);
  });

  const up = () => {
    el.classList.remove('pressed');
    release(btn);
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
});

export const input = {
  isDown: (btn) => down.has(btn),
  wasPressed: (btn) => pressed.has(btn),
  // Call once after every game update step.
  endFrame: () => pressed.clear(),
};