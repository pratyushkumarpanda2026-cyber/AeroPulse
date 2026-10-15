# AeroPulse

A handheld game console built from scratch: custom CPU, custom hardware, and an original creature-battling RPG to run on it.

The project has two halves that grow side by side:

- **Software**: a complete game written first in JavaScript, plus the tools and content around it.
- **Hardware**: a CPU designed in Verilog, with a Python assembler and a JavaScript emulator to prototype ideas before building them in silicon (or on an FPGA).

The game is written as a normal browser game first and ported to the custom CPU later, so the software side never has to wait on the hardware.

## Status

Early planning. The software side is the focus while the hardware learning path progresses. See [`SPEC.md`](SPEC.md) for the evolving console specification and the Issues tab for current tasks.

## What's in the plan

### 1. The game (JavaScript)

- 160x144 canvas, fixed 60 FPS game loop
- Keyboard and touch input
- State machine: overworld, battle, menu, dialogue
- Tile map walking with collisions
- Battle system using placeholder rectangles, with creatures and moves defined in JSON
- Autosave to `localStorage`, with export/import buttons

### 2. Content and tools

- Pixel art for tiles and creatures, made in Piskel or Aseprite
- Maps authored in Tiled and exported as JSON
- A Python script that validates creature and move data and balance-tests battles by simulating thousands of fights
- Original creature names, types, and a simple type chart

### 3. CPU preparation

- **Assembler** (Python) for a small made-up instruction set, even 10 instructions. Details will change; the point is learning how instructions become bytes.
- **Emulator** (JavaScript) that runs the assembled machine code, so any CPU idea can be tested before it is written in Verilog.
- **CHIP-8 emulator** as a warm-up. It is a real, documented CPU, so implementing it teaches fetch-decode-execute.

## Suggested repo layout

Adjust to match whatever layout you agree on.

```
.
├── README.md
├── SPEC.md              # console specification (living document)
├── game/                # browser game
│   ├── index.html
│   └── src/
│       ├── core/        # game logic: battle rules, state, saving (no canvas calls)
│       ├── render/      # drawing code
│       └── input/       # keyboard and touch
├── assets/
│   ├── art/             # Piskel / Aseprite source files and exports
│   └── maps/            # Tiled maps (JSON)
├── data/                # creatures, moves, type chart (JSON)
├── tools/
│   ├── validate.py      # data checker
│   └── simulate.py      # battle balance simulator
├── cpu/
│   ├── assembler/       # Python assembler
│   ├── emulator/        # JavaScript emulator
│   └── chip8/           # CHIP-8 warm-up
└── hardware/            # Verilog (later)
```

## Design principle

**Keep game logic separate from drawing and input.** Battle rules live in their own module with no canvas calls. That makes them easy to test now and easy to rewrite for the custom CPU later.

## Who does what

| Area | Owner |
| --- | --- |
| Browser game, battle system, saving, art pipeline | Friend |
| Hardware learning path, Python assembler, emulator | You |
| CHIP-8 emulator | Both |

## Getting started



## Roadmap

- [✅] Game starter project: canvas, loop, input, state machine, saving
- [✅] Overworld with tile map and collisions
- [ ] Battle system with JSON data
- [ ] Data validator and balance simulator
- [ ] Draft ISA and Python assembler
- [ ] JavaScript emulator for the ISA
- [ ] CHIP-8 emulator
- [ ] First Verilog CPU

## Contributing

1. Pick an open issue from the task board.
2. Work on a branch and open a pull request.
3. Update `SPEC.md` whenever a decision affects the console design.

## License

MIT
