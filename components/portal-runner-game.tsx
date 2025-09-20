Here
is
a
complete, no
‑library workflow
for the “Portal Runner
” mini‑game from first pixel to end state, built as a single HTML file
using native
Canvas
and
browser
features
only.It
covers
state
flow, inputs, spawning, collisions, pacing, UI, and
progressive
enhancements
without
any
external
SDKs
or
services.

\
Game states
\
The finite state machine comprises Menu → Play → Pause → Win/Over → Play (restart),
with state held in a
simple
enum and switched by input or triggers.
\

\
Each state owns its own UI prompts and permissible inputs to avoid cross‑state leaks (e.g., jump is ignored in Menu/Pause, Enter restarts in Win/Over).

Boot and layout
\
On load, the document creates a full‑screen Canvas and scales
for device pixel ratio;
a
resize
handler
keeps
the
canvas
matched
to
the
viewport.
\

\
A minimal HUD is positioned
with standard HTML/CSS
and
updated
from
the
game
loop
to
avoid
layout
thrash
and
preserve
60fps drawing on the canvas.

Core loop
One requestAnimationFrame loop computes delta time, updates simulation, then renders, ensuring deterministic order: input → physics → spawning → collisions → scoring → draw.

Delta time is clamped to guard against tab switching spikes, keeping physics stable and collisions reliable across frames.

Input model
\
Keyboard events set/unset flags
for left/right/jump/slow/pause; the loop reads
the
current
snapshot
to
drive
movement
and
actions, decoupling
event
rate
from
simulation
rate.
\

\
Accessibility‑friendly bindings mirror arrows to WASD and Space/Up
for jump, with Enter mapped
to
start / restart
and
P
for pause/resume to keep controls
discoverable.
\

\
Player controller
\
Horizontal motion uses a small acceleration or direct velocity set
for snappy lateral nudges while the world
auto
‑scrolls forward to create the runner feel.

\
Vertical motion applies gravity, coyote‑time (brief jump grace after leaving ground), and a jump buffer (brief grace before landing) to reduce frustration
an
optional
single
mid
‑air jump improves recoverability.

World and spawning
\
The ground plane sits at a fixed screen Y
content
scrolls
by
subtracting
a
world
scroll
value
from
object
X
so
the
player
stays
near
the
left
third
of
the
screen.
\

\
A seeded pseudorandom generator creates repeatable “waves”: coin arcs in safe lanes, low pillars, moving spike bars, and one mid‑run sweep that teaches timing before the portal.

Collision and rules
\
Coins use circle‑vs‑AABB checks against the player to allow forgiving pickups
hazards
use
AABB
‑vs‑AABB or parametric offsets
for moving bars and sweeps.

\
Touching a hazard transitions to Over
collecting
a
coin
increments
the
counter
and
triggers
a
lightweight
particle
burst
for feedback.

\
Objective and
portal
\
A target coin count is displayed in the HUD
once
met, the
portal
spawns
ahead
and
becomes
“open,” enabling a win on proximity overlap
with the player.

\
On win, total time is recorded and a best time is stored in memory
for the session; the state
transitions
to
Win
with a prompt
to
restart.

\
Time‑slow power
\
A single time‑slow per run scales the
global
delta
time
for roughly two seconds, affecting physics, spawning
timers, and
animation
for a cinematic clutch moment.

\
The cooldown resets only between runs, and the HUD reflects Ready/In‑use states to encourage intentional activation before complex hazards.

Difficulty curve
\
Base auto‑scroll speed increases slightly over time and after coin thresholds,
while hazard spacing
tightens
marginally
to
sustain
challenge
without
abrupt
spikes.

\
The boss‑style sweeping gate appears once per seed near the end of the course to cadence the final challenge before the portal.

Rendering
\
Canvas 2D draws everything as geometry: gradient sky, parallax bands, simple shapes
for hazards, coins, portal rings, and short
‑lived particles
for hits/picks.

\
The draw
pass
is
ordered
back
‑to‑front: background/parallax → collectibles/hazards → player → particles → HUD text overlays
for clarity and readability.

HUD and
prompts
\
The HUD shows coins, target, run time, best time, slow status, and state label, updating once per frame or on change to keep it cheap.

Central prompts appear only in non‑Play states
with concise instructions
and
key
hints
so
onboarding
remains
immediate.Pause, resume, restart
Pause
freezes
simulation
updates
while still rendering
a
dimmed
frame
and
a
“Paused” tag
inputs
are
debounced
to
avoid
accidental
toggles.Restart
re
‑seeds the RNG, rebuilds waves, resets player, timers, and HUD, and returns to Play cleanly
with no retained
references.Performance
and
robustness
The
loop
uses
a
capped
delta, object
pooling
for particles, and modest draw counts
to
sustain
60fps on mid‑range devices
resizing
resynchronizes
canvas
and
transforms.Optional
off
‑main‑thread upgrades: move simulation or expensive drawing to a Worker
with OffscreenCanvas for heavier effects if needed, while keeping a
Canvas
2D fallback.

Progressive polish
Page navigation and round transitions can adopt the View Transition API
for cinematic scene changes without
a
framework,
while core gameplay
remains
independent
of
it.The
landing
section
can
use
scroll
‑driven animations
for lore/setup before the Enter
‑to‑Start prompt, without coupling to the game loop.

Offline and packaging
The game runs entirely client‑side
an
optional
service
worker
can
cache
the
single
HTML
and
assets
so
the
mini
‑game remains playable offline on repeat visits.

No third‑party libraries or remote APIs are required
all
logic, visuals, and
state
live in the
page
bundle
for maximal portability.

Landing‑page
integration
The
call
‑to‑action can appear as the portal win screen, flowing into the site’s next section or mint step
with a smooth
transition
to
match
a
heroic
token
brand
feel.The
HUD
can
mirror
site
palette
and
typography, and
a
“best time” badge can be echoed in the page header to reward engagement across the session.

Here’s a complete “vanilla-only” mini‑game that drops straight into a landing page: a fast, stylish runner
with coins, time
‑slow power, and a portal finish—no external libraries, no remote assets, just one HTML file
with HTML/CSS/JS.

##
#
Game
concept
A
neon
runner
sprints
across
a
minimal
arena, collecting
coins
to
charge
a
portal
once
charged, a
shimmering
gate
spawns
and
finishing
through
it
wins
the
round.The
twist: a
one
‑time “time‑slow” that turns near‑misses into clutch saves.

### Core mechanics
- Movement: ground‑based runner
with jump, coyote
‑time, and optional double‑jump
for responsive, forgiving air control.  
- Progression
: coins spawn in waves
after
a
target
count, the
finish
portal
appears
touching
obstacles
ends
the
run.  
- Power
: one time‑slow per round, shrinking
global
time
scale
for 2 seconds; refills only
between
rounds.

#
#
#
Controls - Arrow / WASD
: left/right
for micro‑positioning, up or
space
to
jump.  
- Shift
: time‑slow
Enter
to
start / restart
P
to
pause/resume.

#
#
#
Systems - Physics
: lightweight gravity
with coyote
‑time and jump buffer to reduce missed inputs.  
- Spawning: deterministic PRNG seeded per run
for fair, reproducible lanes.  
- Rendering
: Canvas 2D
with parallax bands, glow
‑like strokes, and simple particle bursts
for hits/picks.  
- Performance
: single requestAnimationFrame loop
no
images
auto
‑scale to device pixel ratio
object
pools
for particles.

### Level
design - Three
lanes
of
obstacle
patterns: low
pillars, moving
spikes, and
gap
bars.  
- Coin
arcs
placed
safely
between
hazards
riskier
lines
pay
more.  
- Boss
wave: a
sweeping
gate
that
enforces
timing
just
before
the
portal
spawn.

#
#
#
Visual
style - Clean
geometry: rectangles, circles, triangles
gradient
sky
and
animated
parallax
stripes.  
- Color
language: player
cyan, hazards
magenta, coins
amber, portal
violet
—high contrast
for instant readability.

###
Full
code (single file)
Copy
this
into
index.html
and
open
locally.It
’s self‑contained, no build step required.

\`\`\`html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portal Runner — Vanilla</title>
  <style>
    :root
{
  --bg0
  : #0a0b10
  --bg1
  : #0f1220
  --line
  : #1a1e30
  --player
  : #29e6ff
  --hazard
  : #ff2d8f
  --coin
  : #ffbf2f
  --portal
  : #a86bff
  --hud
  : #e7ecff
  --shadow
  : rgba(0,0,0,0.25)
  --glow
  : rgba(255,255,255,0.08)
}
html, body
{
  height: 100%;
  margin: 0
  background: radial-gradient(circle at 50% 0%,
  var(--bg1),
  var(--bg0) 70%);
  color: var(--hud);
  font - family
  : system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif
  overflow: hidden
}
#wrap
{
  position: fixed
  inset: 0
  display: grid
  grid - template - rows
  : 1fr auto
}
canvas
{
  width: 100%;
  height: 100%;
  display: block
  background: linear - gradient(180deg, rgba(10,11,16,0) 0%, rgba(10,11,16,0.3) 50%, rgba(10,11,16,0.8) 100%)
}
#hud
{
  position: absolute
  top:
  12px
  left:
  12px
  right:
  12px
  display: flex
  align - items
  : center
  justify - content
  : space-between
  pointer - events
  : none
  text - shadow
  : 0 1px 0
  var(--shadow);
  font - weight
  : 600
  letter - spacing
  : 0.3px
}
#hud
.pill
{
  background: rgba(255, 255, 255, 0.06)
  border:
  1px solid rgba(255,255,255,0.12)
  border - radius
  : 999px
  padding:
  6px 12px
  margin - right
  : 8px
  box - shadow
  : 0 4px 12px
  var(--shadow);
}
#hud
.right
{
  display: flex
  gap:
  8px
}
#centerMsg
{
  position: absolute
  inset: 0
  display: grid
  place - items
  : center
  text - align
  : center
  pointer - events
  : none
  padding:
  24px
}
#centerMsg
.box
{
  display: inline - block
  background: rgba(10, 12, 20, 0.7)
  border:
  1px solid rgba(255,255,255,0.12)
  border - radius
  : 16px
  padding:
  18px 22px
  box - shadow
  : 0 10px 30px
  var(--shadow);
  backdrop - filter
  : blur(6px)
}
kbd
{
  background: rgba(255, 255, 255, 0.08)
  border:
  1px solid rgba(255,255,255,0.18)
  border - radius
  : 6px
  padding:
  2px 6px
  font - family
  : ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace
  font - size
  : 0.9em
}
#footer
{
  padding:
  10px 14px
  display: flex
  justify - content
  : space-between
  align - items
  : center
  font - size
  : 12px
  color: rgba(231, 236, 255, 0.7)
  background: linear - gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))
  border - top
  : 1px solid rgba(255,255,255,0.06)
}
</style>
</head>
<body>
  <div id="wrap">
    <canvas id="game"></canvas>

    <div id="hud">
      <div
class="left">
        <span class="pill">Coins: <span id="coins">0</span>/<span id="target">15</span></span>
        <span class="pill">Time: <span id="time">0.0</span>s</span>
        <span class="pill">Best: <span id="best">—</span></span>
      </div>
      <div class="right">
        <span class="pill">Slow: <span id="slow">Ready</span></span>
        <span class="pill">State: <span id="state">Menu</span></span>
      </div>
    </div>

    <div id="centerMsg">
      <div class="box" id="msgBox">
        <div style="font-size:20px; margin-bottom:8px;">Portal Runner</div>
        <div style="opacity:0.9; margin-bottom:10px;">
          Collect coins to charge the portal. Touch the portal to win. Avoid hazards.
        </div>
        <div style="opacity:0.9; margin-bottom:2px;">Move: <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd> • Jump: <kbd>↑</kbd> / <kbd>W</kbd> / <kbd>Space</kbd></div>
        <div style="opacity:0.9; margin-bottom:8px;">Time‑slow: <kbd>Shift</kbd> • Pause: <kbd>P</kbd></div>
        <div style="font-weight:700;">Press <kbd>Enter</kbd> to start</div>
      </div>
    </div>

    <div id="footer">
      <div>Vanilla HTML/CSS/JS • No external assets</div>
      <div>Tip: use the time‑slow just before the boss sweep.</div>
    </div>
  </div>

  <script>
  (() => {
    // Canvas setup
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');

    const HUD = {
      coins: document.getElementById('coins'),
      target: document.getElementById('target'),
      time: document.getElementById('time'),
      best: document.getElementById('best'),
      slow: document.getElementById('slow'),
      state: document.getElementById('state'),
      msgBox: document.getElementById('msgBox')
    };

    const DPR = () => Math.min(2, window.devicePixelRatio || 1);
    function resize() {
      const dpr = DPR();
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Utilities
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const sign = (v) => (v < 0 ? -1 : v > 0 ? 1 : 0);

    // Deterministic PRNG
    function RNG(seed = 123456789) {
      let s = seed >>> 0;
      return () => {
        s ^= s << 13; s >>>= 0;
        s ^= s >>> 17; s >>>= 0;
        s ^= s << 5; s >>>= 0;
        return (s >>> 0) / 0xFFFFFFFF;
      };
    }

    // Input
    const keys = new Set();
    window.addEventListener('keydown', (e) => { keys.add(e.key.toLowerCase()); if ([' ', 'arrowup'].includes(e.key.toLowerCase())) e.preventDefault(); }
)
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()))

// Game state
const STATE = { MENU: "menu", PLAY: "play", PAUSE: "pause", WIN: "win", OVER: "over" }
const world = {
  state: STATE.MENU,
  t: 0,
  best: null,
  coins: 0,
  coinTarget: 15,
  slowReady: true,
  slowTimer: 0,
  slowMax: 2.0,
  seed: Math.floor(Math.random() * 1e9),
  laneH: 70,
  groundY: () => canvas.height / DPR() - 100,
  scrollX: 0,
  portalReady: false,
  bossSpawned: false,
}
HUD.target.textContent = world.coinTarget

// Entities
class Player {
  constructor() {
    this.w = 34
    this.h = 44
    this.x = 120
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.speed = 2.0
    this.jumpV = 8.4
    this.gravity = 22.0
    this.coyote = 0 // seconds
    this.coyoteMax = 0.09
    this.jumpBuf = 0
    this.jumpBufMax = 0.12
    this.double = true
    this.onGround = false
  }
  reset() {
    this.x = 120
    this.y = world.groundY() - this.h
    this.vx = 0
    this.vy = 0
    this.coyote = 0
    this.jumpBuf = 0
    this.double = true
    this.onGround = true
  }
  aabb() {
    return { x: this.x, y: this.y, w: this.w, h: this.h }
  }
}

class Coin {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 9
    this.t = 0
    this.hit = false
  }
}
class Haz {
  constructor(x, y, w, h, type = 0) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.type = type
    this.t = 0
  }
} // type 0 pillar, 1 spike mover, 2 sweep
class Portal {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 26
    this.t = 0
    this.open = false
  }
}

const player = new Player()
const coins = []
const hazards = []
let portal = null
const particles = []

function spawnWave(rng, baseX) {
  const lanes = [
    world.groundY() - player.h,
    world.groundY() - player.h - world.laneH,
    world.groundY() - player.h - world.laneH * 2,
  ]
  const laneY = lanes[Math.floor(rng() * lanes.length)]
  // Coins arc
  const arc = 5 + Math.floor(rng() * 3)
  const gap = 28
  for (let i = 0; i < arc; i++) {
    coins.push(new Coin(baseX + i * gap, laneY - 24 - Math.sin((i / arc) * Math.PI) * 18))
  }
  // Hazard pattern
  const choice = rng()
  if (choice < 0.4) {
    // Pillars
    const count = 2 + (rng() < 0.5)
    for (let i = 0; i < count; i++) {
      const w = 20 + Math.floor(rng() * 30)
      const h = 20 + Math.floor(rng() * 40)
      hazards.push(new Haz(baseX + 120 + i * 70, world.groundY() - h, w, h, 0))
    }
  } else if (choice < 0.8) {
    // Moving spike bar
    const h = 10,
      w = 90
    const y = laneY + player.h - 10
    const hz = new Haz(baseX + 120, y, w, h, 1)
    hazards.push(hz)
  } else {
    // Gap bar near top
    const h = 14,
      w = 140
    const y = world.groundY() - world.laneH * 2 - 18
    hazards.push(new Haz(baseX + 100, y, w, h, 0))
  }
}

function spawnBossSweep(x) {
  const h = 24
  const y = world.groundY() - world.laneH * 1.1
  hazards.push(new Haz(x, y, 200, h, 2))
}

function resetRun() {
  world.t = 0
  world.coins = 0
  world.scrollX = 0
  world.portalReady = false
  world.bossSpawned = false
  world.slowReady = true
  world.slowTimer = 0
  coins.length = 0
  hazards.length = 0
  particles.length = 0
  portal = null

  const rng = RNG(world.seed)
  let x = 360
  for (let i = 0; i < 18; i++) {
    spawnWave(rng, x)
    x += 220 + Math.floor(rng() * 120)
    if (i === 12 && !world.bossSpawned) {
      spawnBossSweep(x + 80)
      world.bossSpawned = true
    }
  }
  // Portal spawns at the end; becomes active when coin target met
  portal = new Portal(x + 240, world.groundY() - 36)
  player.reset()
  updateHUD()
}

// Collision
function hitAABB(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}
function hitCircleRect(cx, cy, r, rx, ry, rw, rh) {
  const nx = clamp(cx, rx, rx + rw)
  const ny = clamp(cy, ry, ry + rh)
  const dx = cx - nx,
    dy = cy - ny
  return dx * dx + dy * dy <= r * r
}

// Particles
function burst(x, y, color, count = 10) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() * 2 - 1) * 2.2,
      vy: (Math.random() * -1.2 - 0.4) * 2.0,
      r: 2 + Math.random() * 2,
      life: 0.6 + Math.random() * 0.4,
      t: 0,
      color,
    })
  }
}

// Time scale (for slow motion)
function timeScale() {
  if (world.slowTimer > 0) return 0.35
  return 1.0
}

// Update
let last = performance.now()
function step(now) {
  const dtRaw = Math.min(0.035, (now - last) / 1000)
  last = now

  // State transitions
  if (world.state === STATE.MENU) {
    if (keys.has("enter")) {
      world.state = STATE.PLAY
      world.seed = Math.floor(Math.random() * 1e9)
      resetRun()
    }
    draw(now)
    requestAnimationFrame(step)
    return
  }
  if (world.state === STATE.PAUSE) {
    if (keys.has("p")) keys.delete("p")
    draw(now, true)
    requestAnimationFrame(step)
    return
  }
  if (world.state === STATE.WIN || world.state === STATE.OVER) {
    if (keys.has("enter")) {
      world.state = STATE.PLAY
      world.seed = Math.floor(Math.random() * 1e9)
      resetRun()
    }
    draw(now)
    requestAnimationFrame(step)
    return
  }

  // Input for pause/slow
  if (keys.has("p")) {
    keys.delete("p")
    world.state = STATE.PAUSE
    updateHUD()
  }

  // Activate slow
  if (world.slowReady && (keys.has("shift") || keys.has("shiftleft") || keys.has("shiftright"))) {
    world.slowReady = false
    world.slowTimer = world.slowMax
  }

  const dt = dtRaw * timeScale()
  world.t += dt

  // Slow timer
  if (world.slowTimer > 0) {
    world.slowTimer -= dtRaw
    if (world.slowTimer <= 0) world.slowTimer = 0
  }

  // Player movement
  const left = keys.has("arrowleft") || keys.has("a")
  const right = keys.has("arrowright") || keys.has("d")
  const jumpKey = keys.has(" ") || keys.has("arrowup") || keys.has("w")

  const baseRun = 2.4 // auto scroll/run
  player.vx = (right ? 1 : 0 - (left ? 1 : 0)) * player.speed
  world.scrollX += (baseRun + Math.max(0, player.vx * 0.6)) * 60 * dt

  // Ground and gravity
  const ground = world.groundY()
  player.vy += player.gravity * dt
  player.y += player.vy
  if (player.y + player.h >= ground) {
    player.y = ground - player.h
    player.vy = 0
    player.onGround = true
    player.coyote = player.coyoteMax
    player.double = true
  } else {
    player.onGround = false
    player.coyote -= dt
  }

  // Jump buffer
  if (jumpKey) player.jumpBuf = player.jumpBufMax
  else player.jumpBuf -= dt
  const canGroundJump = player.coyote > 0 && player.jumpBuf > 0
  const canDouble = !player.onGround && player.double && player.jumpBuf > 0

  if (canGroundJump) {
    player.vy = -player.jumpV
    player.coyote = 0
    player.jumpBuf = 0
    burst(player.x + player.w * 0.5, player.y + player.h, "#7ef3ff", 8)
  } else if (canDouble) {
    player.vy = -player.jumpV * 0.9
    player.double = false
    player.jumpBuf = 0
    burst(player.x + player.w * 0.5, player.y + player.h * 0.5, "#7ef3ff", 6)
  }

  // Coins
  for (const c of coins) {
    if (c.hit) continue
    c.t += dt
    const cx = c.x - world.scrollX * 0.6 // parallax slightly
    const cy = c.y + Math.sin(c.t * 6) * 0.6
    if (hitCircleRect(cx, cy, c.r, player.x, player.y, player.w, player.h)) {
      c.hit = true
      world.coins++
      burst(player.x + player.w * 0.5, player.y + player.h * 0.5, "#ffd36b", 12)
      if (world.coins >= world.coinTarget) world.portalReady = true
    }
  }

  // Hazards
  for (const h of hazards) {
    h.t += dt
    let hx = h.x - world.scrollX
    let hy = h.y
    const hw = h.w,
      hh = h.h

    if (h.type === 1) {
      // moving spike bar
      hy += Math.sin(h.t * 2.4) * 18
    }
    if (h.type === 2) {
      // sweeping gate (moves horizontally against player)
      hx -= Math.sin(h.t * 1.2) * 90
    }

    if (hitAABB(player.aabb(), { x: hx, y: hy, w: hw, h: hh })) {
      world.state = STATE.OVER
      burst(player.x + player.w * 0.5, player.y + player.h * 0.5, "#ff5fae", 24)
      updateHUD()
    }
  }

  // Portal open and collision
  if (portal) {
    portal.t += dt
    portal.open = world.portalReady
    const px = portal.x - world.scrollX
    if (
      portal.open &&
      Math.hypot(player.x + player.w * 0.5 - px, player.y + player.h * 0.5 - portal.y) < portal.r + 20
    ) {
      world.state = STATE.WIN
      const total = Number.parseFloat(world.t.toFixed(2))
      if (world.best == null || total < world.best) world.best = total
      updateHUD()
    }
  }

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.t += dt
    p.x += p.vx
    p.y += p.vy
    p.vy += 22 * dt * 0.25
    if (p.t >= p.life) particles.splice(i, 1)
  }

  draw(now)
  requestAnimationFrame(step)
}

function draw(now, paused=false) {
      const w = canvas.width / DPR(), h = canvas.height / DPR();
      ctx.clearRect(0,0,w,h);

      // Parallax bands
      const t = now * 0.001;
      const bands = 6;
      for (let i=0;i<bands;i++){
        const y = h - 80 - i*16;
        ctx.fillStyle = i%2? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)';
        const ox = -((world.scrollX*0.4) % 50);
        for (let x=-50;x<w+50;x+=50){
          ctx.fillRect(x+ox, y + Math.sin(t+i)*1.5, 40, 2);
        }
      }

      // Ground
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(0, world.groundY()+player.h- player.h + 22, w, 2);

      // Coins
      for (const c of coins) {
        if (c.hit) continue;
        const cx = c.x - world.scrollX*0.6;
        const cy = c.y + Math.sin((c.t)*6)*0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, c.r, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = '#ffbf2f';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 210, 90, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Hazards
      for (const h of hazards) {
        let hx = h.x - world.scrollX;
        let hy = h.y;
        const hw = h.w, hh = h.h;

        if (h.type === 1) hy += Math.sin(h.t*2.4)*18;
        if (h.type === 2) hx -= Math.sin(h.t*1.2)*90;

        ctx.fillStyle = '#ff2d8f';
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1.5;

        if (h.type === 1) {
          // spike bar
          ctx.save();
          ctx.translate(hx, hy);
          const spikes = Math.max(4, Math.floor(hw/14));
          for (let i=0;i<spikes;i++){
            ctx.beginPath();
            ctx.moveTo(i*14, hh);
            ctx.lineTo(i*14+7, 0);
            ctx.lineTo(i*14+14, hh);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();
        } else if (h.type === 2) {
          // sweeping gate with inner gap
          ctx.save();
          ctx.translate(hx, hy);
          ctx.fillRect(0,0,hw,hh);
          ctx.globalCompositeOperation =

[1](https://www.codingnepalweb.com/best-javascript-games-for-beginners/)
[2](https://marina-ferreira.github.io/tutorials/js/memory-game/)
[3](https://www.geeksforgeeks.org/javascript/design-hit-the-mouse-game-using-html-css-and-vanilla-javascript/)
[4](https://dev.to/emmykolic/how-to-make-car-game-using-vanilla-javascript-beginners-2m0a)
[5](https://www.youtube.com/watch?v=7BHs1BzA4fs)
[6](https://www.sitepoint.com/browser-game-with-vanilla-js-and-css/)
[7](https://github.com/topics/javascript-games)
[8](https://www.reddit.com/r/gamedev/comments/1i5m9f9/plain_vanilla_javascript_html_5_game/)
[9](https: //javascript30.com)
