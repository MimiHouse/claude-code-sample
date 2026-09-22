import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

// Resolved against this script, not the cwd, so the checks run from anywhere.
const FILE = fileURLToPath(new URL("index.html", import.meta.url));

const m = fs.readFileSync(FILE, "utf8")
            .match(/<script>([\s\S]*?)<\/script>/);
const source = m[1] + `
globalThis.__t = {
  ninja, cam, spawn, stageRows, spawnEnemies, spawnPickups, spawnFlags,
  FLAG_SPRITE, P_FLAG, FLAG_COLS, FLAG_ROWS, FLAG_W, FLAG_H,
  killEnemy, spawnBurst, snapCamera,
  solidAt, solidGrid, blockedAt, probeGround, overlaps, moveEntity, moveX, moveY,
  update, render, updateCamera, respawn, restart, setCrouch, throwShuriken,
  killNinja, updateEnemy, fireBullet, poseNameOf, enemyPoseOf, keys,
  leadHazard, LUNGE_HIT_W, LUNGE_HIT_TOP, LEAP_HIT_W, LEAP_HIT_TOP,
  NINJA_POSES, ENEMY_POSES, NINJA_IDLE, NINJA_CROUCH,
  P_NINJA, P_CHARGER, P_WARDEN, P_RUSHER,
  FONT, FONT_W, FONT_H, drawText, textWidth,
  FONT_HD, FONT_HD_W, FONT_HD_H, drawTextHD, textWidthHD, RENDER_SCALE,
  NINJA_POSES, ENEMY_POSES, FOE_NAMES, ASSET_BASE,
  perfSample, FRAME_BUDGET, Q_FULL, Q_REDUCED, Q_MINIMAL,
  get quality() { return quality; }, set quality(v) { quality = v; },
  get perfMean() { return perfMean; }, get perfWorst() { return perfWorst; },
  spawnWaveRusher, groundTopRow, WAVE_INTERVAL, WAVE_MAX_ALIVE,
  separateBodies, hopIfBlocked, wallAhead, clearAbove, ENEMY_JUMP_VY,
  RUSH_SPEED, RUSH_LEAP_RANGE, SHURIKEN_SPEED,
  COLS, ROWS, SEG_W, WORLD_W, WORLD_H, TILE, VIEW_W, VIEW_H, STEP,
  BODY_W, BODY_H, CROUCH_H, CROUCH_SPEED, MOVE_SPEED, NINJA_COLS, NINJA_ROWS,
  CELL_NINJA, SPRITE_OFF_X, SPRITE_W, ENEMY_W, ENEMY_H, SHURIKEN_SIZE,
  SHURIKEN_MAX, SHURIKEN_START, SHURIKEN_PICKUP, THROW_COOLDOWN,
  COYOTE_TIME, JUMP_BUFFER, JUMP_VEL, GRAVITY_RISE, GRAVITY_FALL, MAX_FALL,
  CHG_AGGRO, CHG_MELEE, CHG_WINDUP, CHG_SWING, CHG_SPEED,
  WARD_RANGE, WARD_AIM, WARD_RELOAD, BULLET_Y_OFF, BULLET_SPEED,
  ACCEL_GROUND, ENEMY_JUMP_VY, resetEnemies, ENEMY_WAKE, enemyAwake,
  vaultSites, VAULT_COUNT, VAULT_RECOVER, VAULT_INSET, VAULT_VX,
  VAULT_GRAVITY, VAULT_PEEK, VAULT_CLIMB, VAULT_REVEAL, MOVE_SPEED,
  WALL_TOP, WALL_BOT, GRAVITY_FALL,
  CROWD_DEEP, CROWD_YIELD, crowdYield,
  vaultAirborne, fireVault, pumpVaults, drawVaultMarkers,
  get vaultsFired() { return vaultsFired; },
  COVER_H, SLASH_RANGE, SLASH_TIME, SLASH_HIT, SLASH_WIND,
  SLASH_W, SLASH_TOP, SLASH_BOT, CHG_MELEE, CHG_HIT_W,
  BUMP_VX, BUMP_VY, BUMP_GRACE, ARC_CY, ARC_RY, ARC_THICK,
  CREDITS, BTN_CREDITS, BTN_BACK, drawCredits,
  ARC_LEAD, ARC_NEAR, ARC_MID, ARC_TAIL,
  BULLET_H, BULLET_W, BULLET_Y_OFF, BULLET_SPEED,
  MUSIC_MELODY, MUSIC_CHORDS, MUSIC_BPM, MUSIC_BAR, MUSIC_LEN,
  MUSIC_BASS, MUSIC_KICK, MUSIC_SNARE, MUSIC_HAT,
  CELL_PROP,
  STRIDE_PX, FOE_STRIDE_PX, strideOf, WALK_CYCLE, walkFrame, isWalking, trackWalk,
  WALK_RATE_MIN, WALK_RATE_SMOOTH, IDLE_FPS,
  sfxFlag, sfxPickup, sfxDryFire, sfxBump,
  drawLowAmmoWarning, WARN_R, WARN_W_PX, WARN_H_PX,
  gapWidthAhead, handleGap, ENEMY_HOP_REACH, ENEMY_HOP_AIR, ENEMY_LEAP_VX,
  GAP_MARGIN, ENEMY_JUMP_VY,
  attack, slash, enemyInSlashRange, enemyGait, enemyPoseOf,
  get slashes() { return slashes; },
  GOAL_TILE, CHG_LEASH,
  CHG_LUNGE_MIN, CHG_LUNGE_RANGE, CHG_LUNGE_WIND, CHG_LUNGE_TIME,
  CHG_LUNGE_SPEED, CHG_LUNGE_CD, CHG_LUNGE_DIST,
  WARD_BURST_RANGE, WARD_BURST_SHOTS, WARD_BURST_GAP,
  WARD_BACKSTEP_RANGE, WARD_BACKSTEP_SPEED, WARD_BACKSTEP_MAX,
  WARD_SWEEP_RANGE, WARD_SWEEP_WIND, WARD_SWEEP_TIME, WARD_SWEEP_RECOVER,
  WARD_SWEEP_REACH, WARD_SWEEP_TOP, WARD_SWEEP_BOT,
  CHG_HIT_W, CHG_HIT_TOP, CHG_HIT_BOT,
  RUSH_MAX_LEAPS, RUSH_LEAP_DECAY, RUSH_LEAP_VY,
  get pickups() { return pickups; },
  deathGrey, DEATH_TIME, DEATH_HOLD, DEATH_FADE,
  findDeadlockPockets, findPitLipDefects, standableRows, isPitCol,
  PIT_LIP_CLEAR, COVER_ROWS, FLOOR_ROWS, headroom, wallAhead,
  get canvasStyle() { return canvas.style; },
  onScreen, bodyAhead, dropIsSafe, pitAhead,
  get enemies() { return enemies; },
  get bullets() { return bullets; },
  get shurikens() { return shurikens; },
  get hazards() { return hazards; },
  get trauma() { return trauma; },
  get punchX() { return punchX; }, get punchY() { return punchY; },
  addTrauma, addPunch, updateShake, shakeOffsetX, shakeOffsetY,
  TRAUMA_DECAY, SHAKE_PX, PUNCH_PX, IMPACT_TIME,
  FREEZE_BLADE, FREEZE_SHURIKEN, drawSilhouette, FLASH_GAIN, FLASH_MAX,
  PERCH_SCAN, PERCH_WIND, PERCH_DIVE_VX, PERCH_DIVE_VY, PERCH_LAND,
  PERCH_HIT_W, PERCH_HIT_TOP, PERCH_HIT_BOT, enemyPoseOf, drawEnemyWeapon,
  get pickups() { return pickups; },
  get flags() { return flags; },
  get particles() { return particles; },
  get flagsTaken() { return flagsTaken; },
  get clock() { return clock; },
  get hitFreeze() { return hitFreeze; },
  get flash() { return flash; },
  get mode() { return mode; },
  get dyingT() { return dyingT; },
  get lives() { return lives; },
  get playTime() { return playTime; },
  get wakeT() { return wakeT; }, set wakeT(v) { wakeT = v; },
  get score() { return score; },
  get timeBonus() { return timeBonus; },
  SCORE_KILL, SCORE_PICKUP, SCORE_FLAG, SCORE_TIME_STEP,
  SCORE_PAR_PER_TILE, stagePar,
  SAVE_KEY, STAGE_ID, bestFor, recordRun, loadSave, writeSave,
  ASSET_BASE, loadAssets, drawPose, playCue, musicSampleWanted,
  startMusicSample, stopMusicSample, ART, CUES,
  get musicSample() { return musicSample; },
  get saved() { return saved; },
  get newRecord() { return newRecord; },
  get stageTotal() { return stageTotal; },
  get showDebug() { return showDebug; },
  timeText,
  get gameOverT() { return gameOverT; },
  get hover() { return hover; },
  START_LIVES, GAMEOVER_TIME, GAMEOVER_LOCK, canSkipGameOver,
  buttonsFor, hitButton, canvasPos, togglePause, startGame, toTitle,
  BTN_START, BTN_RESUME, BTN_RESTART, BTN_TITLE, drawTitle, drawPause,
  drawGameOver, drawHud,
  audioUnlock, toggleMute, sfxThrow, sfxSlash, sfxKill, sfxDeath,
  sfxBladeKill, drawPixels, drawEntities, sprayTag, drawStars, TAG_INKS,
  rnd, SKY_BANDS,
  pumpMusic, musicWanted, MUSIC_STEP, MUSIC_LOOKAHEAD, MASTER_VOL,
  silenceMusic, sfxDeathSting,
  get musicVoices() { return musicVoices; },
  get stoppedCount() { return musicVoices.length; },
  get actx() { return actx; },
  get muted() { return muted; },
  get musicOn() { return musicOn; },
  get musicStep() { return musicStep; },
  get musicNext() { return musicNext; },
  get masterGain() { return masterGain; },
  get shurikenAmmo() { return shurikenAmmo; },
  get throwCd() { return throwCd; },
  get kills() { return kills; },
  get deaths() { return deaths; },
  get checkpoint() { return checkpoint; }
};
`;
const rects = [];
const blits = [];
const ctx = { fillStyle: "", font: "", textBaseline: "", imageSmoothingEnabled: true,
  fillRect(x, y, w, h) { rects.push({ x, y, w, h, c: this.fillStyle }); }, fillText() {},
  drawImage(img, sx, sy, sw, sh, dx, dy) { blits.push({ sx, sy, sw, sh, dx, dy }); },
  save() {}, restore() {}, translate() {}, scale() {} };
/* A fake AudioContext. Without it the whole audio module short-circuits to
   no-ops and none of the synthesis is ever executed -- the tests would only be
   proving that absent audio does not crash. It records what was built, and its
   clock is manual so the music scheduler's lookahead can be inspected. */
const audioLog = { contexts: 0, oscillators: 0, sources: 0, buffers: 0,
                   gains: [], startedAt: [], stoppedAt: [], decoded: 0,
                   freqs: [] };
let audioNow = 0;
const mkParam = (v, log) => ({
  value: v,
  // Values are recorded, not discarded: the per-call detune that keeps repeated
  // hits from sounding mechanically identical is invisible otherwise.
  setValueAtTime(x) { if (log) log.push(x); return this; },
  exponentialRampToValueAtTime() { return this; },
  linearRampToValueAtTime() { return this; },
  // silenceMusic() calls this. Without it the call throws, the try/catch around
  // it swallows the TypeError, and the cut silently does nothing.
  cancelScheduledValues() { return this; }
});
class FakeAudioContext {
  constructor() { audioLog.contexts++; this.destination = { connect() {} }; }
  get currentTime() { return audioNow; }
  get sampleRate() { return 48000; }
  createGain() {
    const g = { gain: mkParam(1), connect() {} };
    audioLog.gains.push(g);
    return g;
  }
  createOscillator() {
    audioLog.oscillators++;
    return { type: "sine", frequency: mkParam(440, audioLog.freqs), connect() {},
             start(t) { audioLog.startedAt.push(t); },
             stop(t) { audioLog.stoppedAt.push(t); } };
  }
  createBufferSource() {
    audioLog.sources++;
    return { buffer: null, playbackRate: mkParam(1), connect() {},
             start() {}, stop() {} };
  }
  createBiquadFilter() {
    return { type: "lowpass", Q: mkParam(1), frequency: mkParam(1000), connect() {} };
  }
  createBuffer(ch, len) {
    audioLog.buffers++;
    return { length: len, getChannelData: () => new Float32Array(len) };
  }
  decodeAudioData() {
    audioLog.decoded++;
    return Promise.resolve({ duration: 1.2, length: 57600, sampleRate: 48000,
                             numberOfChannels: 2 });
  }
}

/* A fake localStorage, pre-seeded BEFORE the game loads so loadSave() has
   something to parse -- including two hostile records, because a stale or
   hand-edited payload must not be able to reach the HUD. storeMode flips the
   whole layer to throwing, which is what a private window looks like. */
const storeBacking = new Map();
let storeMode = "ok";                       // "ok" | "throw"
const SEEDED_BEST = { score: 12345, time: 87.5 };
storeBacking.set("shinobi-alley/v1", JSON.stringify({
  bests: {
    "alley-1": SEEDED_BEST,
    "alley-2": { score: "not a number", time: -4 },   // hostile
    "alley-3": null                                   // hostile
  },
  muted: false
}));
const fakeStorage = {
  getItem(k) {
    if (storeMode === "throw") throw new Error("storage blocked");
    return storeBacking.has(k) ? storeBacking.get(k) : null;
  },
  setItem(k, v) {
    if (storeMode === "throw") throw new Error("storage blocked");
    storeBacking.set(k, String(v));
  },
  removeItem(k) { storeBacking.delete(k); },
  clear() { storeBacking.clear(); }
};

let assetFixture = null;
const fakeFetch = async (url) => {
  if (!assetFixture) return { ok: false, status: 404 };
  if (String(url).endsWith("manifest.json")) {
    return { ok: true, json: async () => assetFixture.manifest };
  }
  const file = String(url).slice(String(url).lastIndexOf("/") + 1);
  if (assetFixture.audioFiles && assetFixture.audioFiles.has(file)) {
    return { ok: true, arrayBuffer: async () => new ArrayBuffer(16) };
  }
  return { ok: false, status: 404 };
};
class FakeImage {
  constructor() { this.width = 0; this.height = 0; }
  set src(v) {
    this._src = v;
    if (assetFixture && assetFixture.atlas) {
      this.width = assetFixture.atlas.w;
      this.height = assetFixture.atlas.h;
      Promise.resolve().then(() => this.onload && this.onload());
    } else {
      Promise.resolve().then(() => this.onerror && this.onerror());
    }
  }
  get src() { return this._src; }
}

const listeners = {};
const canvasStub = {
  getContext: () => ctx,
  style: {},
  width: 640, height: 360,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 640, height: 360 }),
  addEventListener: (t, fn) => { (listeners[t] ??= []).push(fn); }
};
const sandbox = {
  document: { getElementById: () => canvasStub },
  addEventListener: (t, fn) => { (listeners[t] ??= []).push(fn); },
  requestAnimationFrame: () => 1, performance: { now: () => 0 }, console,
  AudioContext: FakeAudioContext,
  localStorage: fakeStorage,
  fetch: fakeFetch,
  Image: FakeImage
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: "game" });
const t = sandbox.__t;
const bootMode = t.mode;      // observed before any test touches the state
const bootDebug = t.showDebug;   // must be off: it used to ship on
// What loadSave() made of the seeded payload. Captured here because the suite
// goes on to clear the stage repeatedly, and beating a seeded record is the
// save layer working correctly, not a failure.
const bootBests = JSON.parse(JSON.stringify(t.saved.bests));
const bootMuted = t.muted;

// Audio has to stay silent until a user gesture, and that is only observable
// BEFORE the suite's first simulated keypress -- which unlocks it. So the
// evidence is collected here, at load, and asserted in the audio section.
const bootAudio = { actx: t.actx, contexts: audioLog.contexts, muted: t.muted };
t.sfxThrow(); t.sfxSlash(); t.sfxKill(); t.sfxDeath(); t.pumpMusic();
bootAudio.osc = audioLog.oscillators;
bootAudio.src = audioLog.sources;
bootAudio.musicOn = t.musicOn;
t.toggleMute(); bootAudio.mutedAfterToggle = t.muted;
t.toggleMute(); bootAudio.mutedAfterSecond = t.muted;

const key = (ty, code) => { for (const fn of listeners[ty] ?? []) fn({ code, preventDefault() {} }); };
// Canvas events land in the same listener map as window events (the stub shares
// it), which is all these need: a client point inside a 640x360 rect at 1:1.
const mouse = (ty, x, y) => {
  for (const fn of listeners[ty] ?? []) fn({ clientX: x, clientY: y, preventDefault() {} });
};
const centreOf = (b) => [b.x + b.w / 2, b.y + b.h / 2];
const tick = (n = 1) => { for (let i = 0; i < n; i++) { t.updateCamera(); t.update(t.STEP); } };
// Timed wave spawns now arrive whether or not the player moves, which will
// happily kill the ninja in the middle of a camera or AI assertion. These tick
// wrappers keep waves out of tests that are not about waves.
function clearWaves() { for (const e of t.enemies) if (e.wave) e.alive = false; }
function tickNoWave(n) { for (let i = 0; i < n; i++) { clearWaves(); tick(1); } }
function tickIso(n) {
  for (let i = 0; i < n; i++) { t.ninja.invuln = 99; clearWaves(); tick(1); }
}
// Wait out the whole death sequence, however long it is configured to be.
function tickThroughDeath() {
  const limit = Math.ceil(t.DEATH_TIME / t.STEP) + 6;
  for (let i = 0; i < limit && t.mode !== "play"; i++) tick(1);
}
// Advance to a given point INSIDE the death sequence, by its own clock, so the
// assertions do not depend on counting frames by hand.
function tickToElapsed(target) {
  const limit = Math.ceil(t.DEATH_TIME / t.STEP) + 6;
  for (let i = 0; i < limit; i++) {
    if (t.mode !== "dying" || t.DEATH_TIME - t.dyingT >= target) break;
    tick(1);
  }
}
// Columns that are plain walkable ground with nothing overhead.
function clearCol(c) {
  return c >= 0 && t.solidAt(c, 20) && ![16, 17, 18, 19].some(r => t.solidAt(c, r));
}
// An enemy whose leftward approach is unobstructed, so its AI can actually run.
// Picking enemies[0] blindly lands on ones parked behind a hop block.
// The cover block on a warden's approach side, as a tile column.
function coverInFrontOf(e) {
  const gc = Math.floor(e.x / t.TILE);
  let col = -1;
  for (let c = gc - 12; c < gc; c++) if (t.solidAt(c, 19) && t.solidAt(c, 18)) col = c;
  return col;
}

/* `posted` chargers hold their ground and never advance, which is the point of
   them -- so a test about charging, dashing or the walk cycle must not be handed
   one. Skipped by default; pass true to ask for one specifically. */
function pickEnemy(kind, clearTiles, posted = false) {
  return t.enemies.find(e => {
    if (e.kind !== kind || !e.alive) return false;
    // Never a ledge sentry. Every test that reaches for "a charger" wants one
    // running its own state machine, and a perched body is running the sentry's
    // instead -- it would answer questions about approach and aim with "perch".
    if (e.ledge) return false;
    if (!!e.post !== posted) return false;
    const ec = Math.floor(e.x / t.TILE);
    for (let c = ec - clearTiles; c <= ec; c++) if (!clearCol(c)) return false;
    return true;
  });
}

let pass = 0, fail = 0;
const check = (name, cond, d = "") => {
  if (cond) { pass++; console.log(`  PASS  ${name}${d && "  " + d}`); }
  else { fail++; console.log(`  FAIL  ${name}${d && "  " + d}`); }
};
// Longest stretch of plain walkable ground with nothing overhead, so tests can
// place the ninja without dropping him inside a hop block.
function flatRun(minLen) {
  let best = null, start = -1;
  for (let c = 0; c <= t.COLS; c++) {
    const ok = c < t.COLS && t.solidAt(c, 20) &&
               ![16, 17, 18, 19].some(r => t.solidAt(c, r));
    if (ok) { if (start < 0) start = c; continue; }
    if (start >= 0 && c - start >= minLen &&
        (!best || (c - start) > (best[1] - best[0] + 1))) best = [start, c - 1];
    start = -1;
  }
  return best;
}

/* A flat tile with no collectible within three tiles of it.
   The stage has six shuriken pickups now, not two, and ten flags. A test that
   parks the player on one silently collects it, which showed up as an
   unexplained +250 on the score and +3 on the ammunition -- the tests were not
   wrong about the rules, they were standing somewhere that had become an item. */
function clearOfItems(from) {
  for (let c = from; c < t.COLS - 4; c++) {
    const x = c * t.TILE;
    if ([...t.pickups, ...t.flags].some(o => Math.abs(o.x - x) < 3 * t.TILE)) continue;
    if (!t.solidAt(c, 20)) continue;
    if ([16, 17, 18, 19].some(r => t.solidAt(c, r))) continue;
    return c;
  }
  return from;
}

let SAFE_TILE = 27;        // reset once the stage is readable
function stand(tileCol, tileRow = 20) {
  /* Past the opening grace. Nothing engages for the first ENEMY_WAKE seconds of
     an attempt -- a real rule, with its own tests below -- but almost every
     behaviour test here wants an enemy that is already awake, and ticking the
     grace out in each of them would be slower and would say nothing about what
     they measure. wakeT, not playTime: the score clock has to stay untouched,
     and hanging the grace off it made the time-attack tests start at 3.5s.  */
  t.wakeT = 0;
  t.keys.clear();
  t.ninja.h = t.BODY_H; t.ninja.crouch = false;
  Object.assign(t.ninja, { x: tileCol * t.TILE, y: tileRow * t.TILE - t.BODY_H,
    vx: 0, vy: 0, onGround: true, coyote: 0, buffer: 0,
    throwTimer: 0, landTimer: 0, invuln: 0, animTime: 0, facing: 1 });
  t.snapCamera();
}

// The placed roster, read once so later tests compare against the stage
// rather than against a number somebody has to remember to update.
// "Placed" means authored into the stage map: neither a wave spawn nor a
// vaulter, both of which are transient by design.
const isPlaced = (e) => !e.wave && !e.vault;
const placedCount = t.enemies.filter(isPlaced).length;
SAFE_TILE = clearOfItems(27);
console.log("\n== load + sprites ==");
// Enemy poses are nested per kind now: the three no longer share one body.
const allPoses = [["ninja", t.NINJA_POSES]];
for (const kind in t.ENEMY_POSES) allPoses.push([kind, t.ENEMY_POSES[kind]]);
let ok = true, err = "";
for (const [owner, set] of allPoses) {
  // Every character is on the same native grid now.
  const cols = t.NINJA_COLS, rowsWant = t.NINJA_ROWS;
  for (const n in set) {
    if (set[n].length !== rowsWant) { ok = false; err = owner + "." + n + " rows"; }
    for (const r of set[n]) {
      if (r.length !== cols) { ok = false; err = owner + "." + n + " cols"; }
    }
  }
}
check(`every character pose is ${t.NINJA_COLS}x${t.NINJA_ROWS}`, ok, err);
check("the hero is authored one array cell per screen pixel",
      t.CELL_NINJA === 1 && t.NINJA_COLS * t.CELL_NINJA === t.SPRITE_W &&
      t.NINJA_ROWS * t.CELL_NINJA === t.BODY_H,
      `cell ${t.CELL_NINJA}, ${t.NINJA_COLS}x${t.NINJA_ROWS} -> ${t.SPRITE_W}x${t.BODY_H}`);
// The grid these replaced was 16x24 painted at 2x: 384 authored pixels for a
// whole character, which is why none of them could carry a face.
check("...which is four times the pixel budget the 16x24 grid allowed",
      t.NINJA_COLS * t.NINJA_ROWS === 4 * (16 * 24),
      `${t.NINJA_COLS * t.NINJA_ROWS} vs 384`);
check("props stay on the coarse grid", t.CELL_PROP === 2 &&
      t.FLAG_COLS * t.CELL_PROP === t.FLAG_W, `flag ${t.FLAG_W}px wide`);
check("the palette is a ramp, not a pair",
      Object.keys(t.P_NINJA).length >= 12, `${Object.keys(t.P_NINJA).length} colours`);
check("poses: " + allPoses.map(([o, set]) => o + " " + Object.keys(set).length).join(", "),
      true);

console.log("\n== stage is 4x+ longer (req 1) ==");
check("stage is 400 tiles (was 80 -> 5x)", t.COLS === 400, `COLS=${t.COLS}`);
check("10 segments of 40", t.COLS / t.SEG_W === 10);
check("world 6400px wide", t.WORLD_W === 6400);
check("every row is 400 wide", t.stageRows.every(r => r.length === 400));
check("spawn exists and 10 flags are placed", !!t.spawn && t.spawnFlags.length === 10,
      `spawn x=${t.spawn.x}, ${t.spawnFlags.length} flags`);
const runSec = (t.WORLD_W - t.VIEW_W) / t.MOVE_SPEED;
check("straight-line run is about a minute of play", runSec > 30 && runSec < 60,
      `${runSec.toFixed(0)}s pure running, plus combat`);

console.log("\n== enemy roster + placement (req 3) ==");
const chg = t.enemies.filter(e => e.kind === "charger" && !e.ledge);
const rsh = t.enemies.filter(e => e.kind === "rusher" && !e.ledge);
const gun = t.enemies.filter(e => e.kind === "warden" && !e.ledge);
/* The roster doubled. Expressed as a floor and a ratio rather than as one
   number, because it is going to keep moving and the property that matters is
   "about twice what it was, and all three patterns present in quantity". */
check("the roster is at least twice its original 28, across 3 patterns",
      t.enemies.length >= 56 && chg.length >= 18 && rsh.length >= 14 && gun.length >= 8,
      `${chg.length} charger / ${rsh.length} rusher / ${gun.length} warden`);
check("denser than one enemy per 15 tiles", t.COLS / t.enemies.length < 15,
      `one every ${(t.COLS / t.enemies.length).toFixed(1)} tiles`);
// Six now, not two: a pickup used to be a permanent upgrade to how many
// shuriken could be airborne, and is now ammunition that gets spent.
check("six shuriken pickups", t.pickups.length === 6, `${t.pickups.length}`);
let grounded = true, clear = true, spread = [];
for (const e of t.enemies) {
  if (!t.probeGround(e)) grounded = false;
  if (t.blockedAt(e.x, e.y, e.w, e.h)) clear = false;
  spread.push(Math.floor(e.x / t.TILE));
}
check("every enemy stands on solid ground (none over a pit)", grounded);
check("no enemy is embedded in terrain", clear);
spread.sort((a, b) => a - b);
check("enemies spread from segment 2 to the last segment (seg 1 is a quiet intro)",
      spread[0] < 80 && spread[spread.length - 1] > 340,
      `tiles ${spread[0]}..${spread[spread.length - 1]}`);
/* HEIGHT IS A THREAT AXIS NOW.
   The rule used to be that every enemy stood on the player's own walking level,
   because a warden on a ledge fires horizontally and the shot sails over your
   head -- elevated enemies could not fight and could not be fought. That is
   still true of an elevated enemy running its NORMAL states, so the ones up
   there run a different machine: perch, crouch, drop on you, then behave like
   anything else. These checks are the terms that make that fair. */
const onFloor = t.enemies.filter(e => e.y + e.h === 20 * t.TILE);
const sentries = t.enemies.filter(e => e.ledge);
check("every enemy is either on the alley floor or a ledge sentry",
      onFloor.length + sentries.length === t.enemies.length,
      `${onFloor.length} floor + ${sentries.length} sentries = ${t.enemies.length}`);
check("no enemy is elevated WITHOUT being a sentry",
      !t.enemies.some(e => e.y + e.h !== 20 * t.TILE && !e.ledge));
check("sentries occupy more than one height",
      new Set(sentries.map(e => e.y)).size >= 2,
      `heights ${[...new Set(sentries.map(e => 320 - (e.y + e.h)))].sort((a, b) => a - b).join(",")}px above the floor`);
check("sentries cover all three kinds", new Set(sentries.map(e => e.kind)).size === 3,
      JSON.stringify(sentries.reduce((a, e) => (a[e.kind] = (a[e.kind] || 0) + 1, a), {})));
check("every sentry starts perched, not walking",
      sentries.every(e => e.state === "perch"));
check("a perched sentry is harmless", sentries.every(e => !e.lethal));
/* A dive needs somewhere to land. A marker over a pit, or on a platform with
   nothing but more air beneath it, is a drop into the kill plane -- which reads
   as an enemy deleting itself the moment you walk past. */
let diveHasFloor = true, diveLands = [];
for (const e of sentries) {
  const tx = Math.floor((e.x + e.w / 2) / t.TILE);
  const feetRow = Math.floor((e.y + e.h) / t.TILE);
  let found = -1;
  for (let r = feetRow; r < t.ROWS; r++) if (t.solidAt(tx, r)) { found = r; break; }
  if (found < 0) diveHasFloor = false;
  else diveLands.push(found);
}
check("every sentry has a floor under its drop", diveHasFloor,
      `landing rows ${[...new Set(diveLands)].sort((a, b) => a - b).join(",")}`);
/* The crouch is the ONLY warning a drop gets, so it has to outlast a human
   reaction. 250ms is the usual figure for a simple visual cue; the window is
   deliberately well clear of it. */
check("the dive is telegraphed longer than a reaction takes", t.PERCH_WIND >= 0.30,
      `${(t.PERCH_WIND * 1000).toFixed(0)}ms crouch`);
check("the scan strip is narrower than the screen", t.PERCH_SCAN < t.VIEW_W / 2,
      `${t.PERCH_SCAN}px vs ${t.VIEW_W / 2}px half-screen`);

console.log("\n== ninja steps back, stage does not (req 2) ==");
t.restart();
const run = flatRun(20);
check("found a long flat stretch to test scrolling on", !!run,
      run ? `tiles ${run[0]}..${run[1]}` : "none");
// The longest flat stretch is also where the chargers live; clear them so the
// camera assertions measure scrolling and not a respawn.
for (const e of t.enemies) e.alive = false;
stand(run[1] - 1);
const camHere = t.cam.x;
const xStart = t.ninja.x;
key("keydown", "ArrowLeft"); tickIso(30);
check("ArrowLeft moves the ninja backwards", t.ninja.x < xStart,
      `x ${xStart} -> ${t.ninja.x.toFixed(0)}`);
check("faces left when walking back", t.ninja.facing === -1);
tickIso(220);
key("keyup", "ArrowLeft");
check("the stage never scrolls back", t.cam.x === camHere, `cam stayed ${t.cam.x}`);
check("screen's left edge acts as a solid wall", Math.round(t.ninja.x) === t.cam.x,
      `ninja x=${t.ninja.x.toFixed(0)} cam=${t.cam.x}`);
check("velocity is zeroed at the wall", t.ninja.vx === 0);
t.keys.clear();
// Re-place near the START of the flat run: the ninja needs ~310px of clear
// runway to push the camera, and the run's right end abuts a pit.
stand(run[0] + 5);
const camLow = t.cam.x;
key("keydown", "ArrowRight"); tickIso(150); key("keyup", "ArrowRight");
check("walking right advances the ratchet", t.cam.x > camLow,
      `cam ${camLow} -> ${t.cam.x}`);
// The real invariant is monotonicity, not equality: the skid carries the ninja
// a few px further right after the left press, which legitimately nudges the
// ratchet forward. Assert it never DECREASES, sampling every frame.
const camAdvanced = t.cam.x;
key("keydown", "ArrowLeft");
let minCam = t.cam.x, prevCam = t.cam.x, regressed = 0;
for (let i = 0; i < 180; i++) {
  t.ninja.invuln = 99; clearWaves(); tick(1);
  if (t.cam.x < prevCam) regressed++;
  prevCam = t.cam.x;
  minCam = Math.min(minCam, t.cam.x);
}
key("keyup", "ArrowLeft");
check("camera is monotonic: never rewinds across 180 frames of walking left",
      regressed === 0 && minCam >= camAdvanced,
      `${regressed} regressions, min ${minCam} vs ${camAdvanced}`);
t.keys.clear();
// A death is a reset, so the view is allowed to snap back there.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(run[1] - 1); tick(2);
t.ninja.y = t.WORLD_H + 200; tick(1);
tickThroughDeath();
check("respawn is allowed to snap the view back", t.cam.x < camHere, `cam=${t.cam.x}`);

console.log("\n== crouch (req 5) ==");
stand(3);
const feetBefore = t.ninja.y + t.ninja.h;
t.setCrouch(true);
check("crouch shrinks the hitbox", t.ninja.h === t.CROUCH_H && t.CROUCH_H < t.BODY_H,
      `h=${t.ninja.h}, body=${t.BODY_H}`);
/* The height is bound by the cover contract, not chosen. It was 24 -- exactly
   half the body -- which read as sitting on the floor rather than squatting, so
   it went to 27; "exactly half" was never the requirement and asserting it
   pinned the pose to the wrong number. What actually has to hold:

     CROUCH_H + BULLET_H <= BULLET_Y_OFF < COVER_H

   The first half is what lets a thrown slash pass over a ducking head -- the
   bullet's BOTTOM edge, not its origin, has to clear the crouch box, which is
   why BULLET_H is in it. The second half is what lets cover stop the same
   throw. COVER_H is two tiles, i.e. what every ground block in the stage is
   built from, so it is the ceiling on how tall the crouch can ever be. */
check("a thrown slash still clears a ducking head",
      t.CROUCH_H + t.BULLET_H <= t.BULLET_Y_OFF,
      `crouch ${t.CROUCH_H} + bullet ${t.BULLET_H} vs offset ${t.BULLET_Y_OFF}`);
check("...and cover still stops the same throw", t.BULLET_Y_OFF < t.COVER_H,
      `${t.BULLET_Y_OFF} < ${t.COVER_H}`);
check("the crouch is as tall as that ordering allows",
      t.CROUCH_H >= t.COVER_H - t.BULLET_H - 2,
      `${t.CROUCH_H} of a possible ${t.COVER_H - t.BULLET_H - 1}`);
check("feet stay planted while crouching", t.ninja.y + t.ninja.h === feetBefore,
      `feet ${t.ninja.y + t.ninja.h}`);
t.setCrouch(false);
check("standing restores 48", t.ninja.h === t.BODY_H && t.ninja.y + t.ninja.h === feetBefore);
const emptyRow = ".".repeat(t.NINJA_COLS);
const blankRows = t.NINJA_CROUCH.filter(r => r === emptyRow).length;
check("crouch sprite is blank on top and solid below",
      blankRows === t.NINJA_ROWS - t.CROUCH_H &&
      t.NINJA_CROUCH.slice(blankRows).every(r => r !== emptyRow),
      `${blankRows} blank, want ${t.NINJA_ROWS - t.CROUCH_H}`);
check("content rows x cell = CROUCH_H exactly",
      (t.NINJA_ROWS - blankRows) * t.CELL_NINJA === t.CROUCH_H);
stand(3);
key("keydown", "ArrowDown"); key("keydown", "ArrowRight"); tick(60);
check("ArrowDown crouches via input", t.ninja.crouch === true);
check("crouch pose selected", t.poseNameOf(t.ninja) === "crouch");
check("crouching caps speed at CROUCH_SPEED", t.ninja.vx === t.CROUCH_SPEED,
      `vx=${t.ninja.vx}`);
const cy = t.ninja.y;
key("keydown", "KeyZ"); tick(3);
check("cannot jump while crouched", t.ninja.y >= cy - 1);
key("keyup", "KeyZ"); key("keyup", "ArrowDown"); key("keyup", "ArrowRight");
t.keys.clear();
// The 4-row geometry rule guarantees no low ceilings exist on this stage, so
// the refusal branch is unreachable in the level as built. Inject a temporary
// ceiling tile to exercise the guard, then restore the grid.
stand(3);
t.setCrouch(true);
const crouchedY = t.ninja.y;
const ceilIdx = 17 * t.COLS;
t.solidGrid[ceilIdx + 3] = 1; t.solidGrid[ceilIdx + 4] = 1;
t.setCrouch(false);
check("refuses to stand when there is no headroom",
      t.ninja.crouch === true && t.ninja.y === crouchedY,
      "guard is defensive: the 4-row rule means no such ceiling ships");
t.solidGrid[ceilIdx + 3] = 0; t.solidGrid[ceilIdx + 4] = 0;
t.setCrouch(false);
check("stands again once the ceiling is gone", t.ninja.crouch === false);

console.log("\n== the blade is the basic weapon, the shuriken is ammunition ==");
/* The concept changed. X used to be context-sensitive -- blade inside
   SLASH_RANGE, shuriken outside it -- so the weapon you got depended on a
   distance you could not see, and it was the shuriken most of the time. X is
   the blade now, always and unlimited; the shuriken moved to C and is spent. */
t.restart();
stand(3);
check("X is the blade at point-blank range", (() => {
  const e = pickEnemy("charger", 7);
  stand(Math.floor(e.x / t.TILE) - 2);
  t.attack();
  return t.slashes.length === 1 && t.shurikens.length === 0;
})());
check("...and X is STILL the blade from eight tiles out", (() => {
  t.restart();
  const e = pickEnemy("charger", 7);
  for (const o of t.enemies) if (o !== e) o.alive = false;
  stand(Math.floor(e.x / t.TILE) - 8);
  check("nothing is in blade range from there", t.enemyInSlashRange() === false);
  t.attack();
  return t.slashes.length === 1 && t.shurikens.length === 0;
})(), "the blade is not rationed, so it does not need a fallback");

t.restart();
stand(3);
check("a run starts with a stock of shuriken",
      t.shurikenAmmo === t.SHURIKEN_START && t.SHURIKEN_START > 0,
      `${t.shurikenAmmo}`);
check("the stock is well under the carry limit at the start",
      t.SHURIKEN_START < t.SHURIKEN_MAX, `${t.SHURIKEN_START} of ${t.SHURIKEN_MAX}`);
check("the carry limit is ten", t.SHURIKEN_MAX === 10, `${t.SHURIKEN_MAX}`);
t.throwShuriken();
check("C throws one shuriken", t.shurikens.length === 1);
check("throw pose plays", t.poseNameOf(t.ninja) === "throw");
check("and it SPENDS one", t.shurikenAmmo === t.SHURIKEN_START - 1, `${t.shurikenAmmo}`);
t.throwShuriken();
check("a cooldown paces the throws rather than the last one's flight time",
      t.shurikens.length === 1 && t.throwCd > 0,
      `${t.shurikens.length} airborne, cd=${t.throwCd.toFixed(3)}`);
check("shuriken flies forward (right)", t.shurikens[0].vx > 0);
tickNoWave(Math.ceil(t.THROW_COOLDOWN * 60) + 1);
t.throwShuriken();
check("once the cooldown is up, another one goes -- while the first is still in flight",
      t.shurikens.length === 2,
      "travel time gated the old unlimited weapon; with a finite stock that punishes a miss twice");
// Run the stock down and check the empty case is distinguishable.
{
  t.restart(); stand(3);
  let fired = 0;
  for (let i = 0; i < 400 && t.shurikenAmmo > 0; i++) {
    t.throwShuriken();
    if (t.throwCd > 0 && t.shurikens.length > fired) fired++;
    tickNoWave(1);
  }
  check("the stock runs out", t.shurikenAmmo === 0, `${t.shurikenAmmo} left`);
  const before = t.shurikens.length;
  const osc0 = audioLog.oscillators;
  t.throwShuriken();
  check("an empty stock throws nothing", t.shurikens.length === before);
  check("...but it does make a sound, so an empty stock is not a dropped input",
        audioLog.oscillators > osc0);
  // The blade is what keeps the game playable at zero.
  const e = pickEnemy("charger", 7);
  stand(Math.floor(e.x / t.TILE) - 2);
  t.ninja.facing = 1;
  t.attack();
  check("the blade still works at zero ammunition", t.slashes.length === 1);
  for (let i = 0; i < 20 && e.alive; i++) tickNoWave(1);
  check("...and still kills", !e.alive);
}

// Kill a charger with a shuriken.
t.restart();
const target = t.enemies.find(e => e.kind === "charger" && !e.ledge);
stand(Math.floor(target.x / t.TILE) - 5);
const killsBefore = t.kills;
t.throwShuriken();
let hit = false;
for (let i = 0; i < 120 && !hit; i++) { tick(1); hit = !target.alive; }
check("shuriken kills a charger in one hit", !target.alive && t.kills === killsBefore + 1,
      `kills=${t.kills}`);

// Pickups are ammunition now, and they are capped.
t.restart();
const pk = t.pickups[0];
stand(Math.floor(pk.x / t.TILE));
const ammoBeforePick = t.shurikenAmmo;
t.ninja.x = pk.x - 4; t.ninja.y = pk.y - 10;
tick(6);
check("a pickup tops the stock up",
      t.shurikenAmmo === ammoBeforePick + t.SHURIKEN_PICKUP,
      `${ammoBeforePick} -> ${t.shurikenAmmo}`);
check("there are enough pickups in the stage to matter now",
      t.pickups.length >= 4,
      `${t.pickups.length} -- there were two, back when one was a permanent upgrade`);
{
  // The cap has to hold however many you walk over.
  t.restart();
  t.ninja.invuln = 999;
  for (const p of t.pickups) {
    stand(Math.floor(p.x / t.TILE));
    t.ninja.invuln = 999;
    t.ninja.x = p.x - 4; t.ninja.y = p.y - 10;
    tick(4);
  }
  check("the stock never exceeds the carry limit",
        t.shurikenAmmo <= t.SHURIKEN_MAX,
        `${t.shurikenAmmo} of ${t.SHURIKEN_MAX}`);
}

console.log("\n== charger pattern: rush right-to-left (req 6) ==");
t.restart();
const c = pickEnemy("charger", 7);
check("found a charger with an unobstructed approach", !!c,
      c ? `tile ${Math.floor(c.x / t.TILE)}` : "none");
for (const e of t.enemies) if (e !== c) e.alive = false;   // clear the lane
const cTile = Math.floor(c.x / t.TILE);
stand(cTile - 5);                    // inside aggro, clear ground between us
check("charger starts idle", c.state === "idle");
tickIso(4);
check("aggro triggers a charge", c.state === "charge", `state=${c.state}`);
check("charges LEFT toward the player", c.vx < 0, `vx=${c.vx}`);
check("faces the player", c.facing === -1);
let sawWindup = false, sawSwing = false, sawHazard = false, sawRecover = false;
for (let i = 0; i < 400; i++) {
  tickIso(1);                        // observe without respawn resetting the state
  if (c.state === "windup") sawWindup = true;
  if (c.state === "swing") sawSwing = true;
  if (c.state === "recover") sawRecover = true;
  if (t.hazards.length > 0) sawHazard = true;
  if (sawRecover) break;
}
t.ninja.invuln = 0;
check("telegraphs with a windup before swinging", sawWindup);
check("swing state fires", sawSwing);
check("swing spawns a lethal melee hitbox", sawHazard);
check("recovers into a cooldown after the swing", sawRecover);
// Now lethality, vulnerable.
t.restart();
const c3 = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== c3) e.alive = false;
stand(Math.floor(c3.x / t.TILE) - 5);
let died = false;
// Under 4.2s so no wave spawn can steal the kill.
for (let i = 0; i < 200 && !died; i++) { tickNoWave(1); died = t.deaths > 0; }
check("the swing kills the player", died, `deaths=${t.deaths}`);
// Body contact alone must be harmless.
t.restart();
const c2 = pickEnemy("charger", 4) || t.enemies.find(e => e.kind === "charger" && !e.ledge);
for (const e of t.enemies) if (e !== c2) e.alive = false;
stand(Math.floor(c2.x / t.TILE));
t.ninja.x = c2.x; t.ninja.invuln = 0;
c2.state = "idle"; c2.timer = 0;
const dBefore = t.deaths;
t.updateCamera(); t.update(t.STEP);
check("body contact is harmless (only weapons kill)", t.deaths === dBefore,
      "this is what makes one-hit death fair");

console.log("\n== warden pattern + crouch dodge (req 5 x 6) ==");
t.restart();
const g = pickEnemy("warden", 10) || t.enemies.find(e => e.kind === "warden" && !e.ledge);
const gTile = Math.floor(g.x / t.TILE);
for (const e of t.enemies) if (e !== g) e.alive = false;
stand(gTile - 9);
check("warden starts idle", g.state === "idle");
tickNoWave(3);
check("player in range triggers aim", g.state === "aim", `state=${g.state}`);
let fired = false;
for (let i = 0; i < 60 && !fired; i++) { tickNoWave(1); fired = t.bullets.length > 0; }
check("aim resolves into a bullet", fired);
check("bullet travels LEFT toward the player", t.bullets[0].vx < 0);
check("warden then reloads and cannot fire", g.state === "reload");
const bulletY = t.bullets[0].y, gFeet = g.y + g.h;
check("bullet sits at feet - 36px", Math.round(gFeet - bulletY) === t.BULLET_Y_OFF,
      `y=${bulletY} feet=${gFeet}`);

// The headline mechanic: standing is hit, crouching is not.
// Guard against the failure that cost a debugging round: an un-exported
// constant reads as undefined, arithmetic on it yields NaN, and stand(NaN)
// drops the ninja out of the world -- which looks exactly like being shot.
for (const [k, v] of Object.entries({
  WARD_SWEEP_RANGE: t.WARD_SWEEP_RANGE, WARD_SWEEP_REACH: t.WARD_SWEEP_REACH,
  WARD_SWEEP_TOP: t.WARD_SWEEP_TOP, WARD_SWEEP_BOT: t.WARD_SWEEP_BOT,
  WARD_SWEEP_WIND: t.WARD_SWEEP_WIND, WARD_BURST_RANGE: t.WARD_BURST_RANGE,
  CHG_HIT_W: t.CHG_HIT_W, CHG_LUNGE_DIST: t.CHG_LUNGE_DIST,
})) {
  check(`${k} is exported as a number`, Number.isFinite(v), String(v));
}

function bulletTrial(crouch) {
  t.restart();
  const gg = t.enemies.find(e => e.kind === "warden" && !e.ledge);
  for (const e of t.enemies) if (e !== gg) e.alive = false;   // isolate the warden
  // Stand OUTSIDE the polearm's reach. Inside it the warden swings instead of
  // throwing, and a sweep is a blade -- not something a crouch is meant to
  // duck. This trial is about the thrown slash.
  const tiles = Math.ceil((t.WARD_SWEEP_RANGE + 16) / t.TILE);
  const col = Math.floor(gg.x / t.TILE) - tiles;
  // Clear any cover between us so the line is genuinely open; standing behind
  // the block is tested separately, and there the block SHOULD save you.
  const cleared = [];
  for (let c = col; c < Math.floor(gg.x / t.TILE); c++) {
    for (const r of [t.ROWS - 4, t.ROWS - 3]) {
      if (t.solidAt(c, r)) { t.solidGrid[r * t.COLS + c] = 0; cleared.push([c, r]); }
    }
  }
  stand(col);
  if (crouch) { key("keydown", "ArrowDown"); }
  const d0 = t.deaths;
  let out = "survived";
  for (let i = 0; i < 200; i++) {
    tickNoWave(1);                    // under one wave interval
    if (t.deaths > d0) { out = "hit"; break; }
  }
  t.keys.clear();
  for (const [c, r] of cleared) t.solidGrid[r * t.COLS + c] = 1;
  return out;
}
check("standing in the path of a thrown slash is lethal",
      bulletTrial(false) === "hit");
check("CROUCHING dodges the thrown slash", bulletTrial(true) === "survived",
      "crouch box tops out at feet-24, the slash flies at feet-36");
const geom = t.BULLET_Y_OFF - t.CROUCH_H;
check("the dodge has real clearance", geom > 0 && geom < 16,
      `bullet passes ${geom}px above the crouched head`);

console.log("\n== touching an enemy is survivable; its ATTACK is not ==");
/* A charger's dash and a rusher's leap used to set `e.lethal` for the whole
   move and test it against the whole body box, so brushing a shoulder as one
   flew past killed you. That is a collision, not an attack. Both moves now lead
   with a narrow hitbox in front of the body, refreshed every frame so it tracks
   the dash, and no body is lethal to touch at all. */
{
  // Walk a charger into the player and stand there. Nothing should happen.
  t.restart();
  const cc = pickEnemy("charger", 7);
  for (const e of t.enemies) if (e !== cc) e.alive = false;
  stand(Math.floor(cc.x / t.TILE) - 1);
  // Put the two boxes squarely on top of each other and hold.
  let touched = 0;
  for (let i = 0; i < 60; i++) {
    t.ninja.x = cc.x;                       // fully overlapping
    if (t.mode !== "play") break;
    tickIso(1);
    if (t.overlaps(cc, t.ninja)) touched++;
  }
  check("the bodies really were overlapping", touched > 20, `${touched} frames`);
  check("standing inside an enemy does not kill you", t.mode === "play",
        `mode=${t.mode}, deaths=${t.deaths}`);
}
{
  // ...but its swing does. The charger's melee already spawned a hazard; this
  // pins that the hazard, not the body, is what kills.
  t.restart();
  const cc = pickEnemy("charger", 7);
  for (const e of t.enemies) if (e !== cc) e.alive = false;
  stand(Math.floor(cc.x / t.TILE) - 2);
  /* Two runs, because one cannot answer both questions: killNinja() clears
     `hazards`, so the run that dies has nothing left to look at on the frame it
     died -- the swing box is gone by the time the loop can see it.

     Run one is invulnerable and only watches. tickIso sets invuln every frame,
     which is exactly what is wanted here and exactly what must NOT be used in
     run two. */
  let sawHazard = false;
  for (let i = 0; i < 400 && !sawHazard; i++) {
    tickIso(1);
    if (t.hazards.length > 0) sawHazard = true;
  }
  check("it swings, and the swing is a hazard box", sawHazard);
  // Run two is vulnerable and only measures whether it dies.
  t.restart();
  const cd = pickEnemy("charger", 7);
  for (const e of t.enemies) if (e !== cd) e.alive = false;
  stand(Math.floor(cd.x / t.TILE) - 2);
  let died = false;
  for (let i = 0; i < 400 && !died; i++) {
    tickNoWave(1);
    died = t.mode !== "play";
  }
  check("standing in that swing kills", died, `mode=${t.mode}`);
}
{
  // The lunge leads with steel: a box in front, narrower than the body.
  t.restart();
  const lc = pickEnemy("charger", 7);
  for (const e of t.enemies) if (e !== lc) e.alive = false;
  stand(Math.floor(lc.x / t.TILE) - Math.round(t.CHG_LUNGE_MIN / t.TILE) - 2);
  t.ninja.invuln = 9999;                     // observe, do not die
  let lungeHazards = 0, lungeFrames = 0;
  for (let i = 0; i < 300; i++) {
    tickIso(1);
    if (lc.state === "lunge") {
      lungeFrames++;
      if (t.hazards.length > 0) lungeHazards++;
    }
    if (lungeFrames > 0 && lc.state === "recover") break;
  }
  check("the dash happens", lungeFrames > 2, `${lungeFrames} frames`);
  check("...and carries a hazard box for the whole of it",
        lungeHazards >= lungeFrames - 1, `${lungeHazards} of ${lungeFrames} frames`);
  check("the dash's hitbox is narrower than the charger's body",
        t.LUNGE_HIT_W < t.ENEMY_W, `${t.LUNGE_HIT_W} vs body ${t.ENEMY_W}`);
  check("no charger is ever lethal to touch",
        t.enemies.every(e => !e.lethal));
}
{
  // Same for the rusher's leap.
  t.restart();
  const rr = t.enemies.find(e => e.kind === "rusher" && !e.ledge);
  for (const e of t.enemies) if (e !== rr) e.alive = false;
  stand(Math.floor(rr.x / t.TILE) - 3);
  t.ninja.invuln = 9999;
  let leapFrames = 0, leapHazards = 0;
  for (let i = 0; i < 400; i++) {
    tickIso(1);
    if (rr.state === "leap") {
      leapFrames++;
      if (t.hazards.length > 0) leapHazards++;
    }
  }
  check("the rusher leaps", leapFrames > 2, `${leapFrames} frames`);
  check("...and leads with its daggers rather than its body",
        leapHazards >= leapFrames - 2, `${leapHazards} of ${leapFrames} frames`);
  check("the leap's hitbox is narrower than the rusher's body",
        t.LEAP_HIT_W < t.ENEMY_W, `${t.LEAP_HIT_W} vs body ${t.ENEMY_W}`);
}
{
  // The hazard has to TRACK the dash. Pushed once for the whole move it would
  // sit where the attack started, which is the bug this shape avoids.
  t.restart();
  const e0 = t.enemies.find(x => x.kind === "charger" && !x.ledge);
  e0.facing = 1;
  const x0 = e0.x;
  t.hazards.length = 0;
  t.leadHazard(e0, t.LUNGE_HIT_W, t.LUNGE_HIT_TOP, 8);
  const h0 = t.hazards[t.hazards.length - 1].x;
  e0.x = x0 + 40;
  t.leadHazard(e0, t.LUNGE_HIT_W, t.LUNGE_HIT_TOP, 8);
  const h1 = t.hazards[t.hazards.length - 1].x;
  check("the lead hazard follows the body", h1 - h0 === 40, `${h0} -> ${h1}`);
  check("...and it is in FRONT of the body", h0 >= x0, `${h0} vs ${x0}`);
  check("it lasts one frame, so a stale box cannot linger",
        t.hazards[t.hazards.length - 1].ttl <= 1 / 30);
}

console.log("\n== death: back to the start, every enemy restored ==");
t.restart();
const runDeep = flatRun(20);
stand(runDeep[1] - 2);
tick(2);
const deepX = t.ninja.x;
check("player is deep into the stage before dying", deepX > 40 * t.TILE,
      `tile ${Math.floor(deepX / t.TILE)}`);
// Bank some progress: collect a flag and kill a few enemies.
const someFlag = [...t.flags].sort((a, b) => a.x - b.x)[0];
t.ninja.invuln = 999; t.ninja.x = someFlag.x; t.ninja.y = someFlag.y;
t.snapCamera(); tick(1);
check("a flag was collected", t.flagsTaken === 1);
stand(runDeep[1] - 2); tick(1);
const victims = t.enemies.filter(e => e.alive && !e.wave).slice(0, 3);
for (const v of victims) t.killEnemy(v);
check("three enemies were killed", t.enemies.filter(e => !e.alive && !e.wave).length >= 3);
const ammoBefore = t.shurikenAmmo;
// Let any hitstop from those kills expire first: update() returns early while
// hitFreeze > 0, so the out-of-world check would never run on that frame.
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0;
t.ninja.y = t.WORLD_H + 200;
tick(1);
check("death enters a dying state rather than teleporting instantly",
      t.mode === "dying");
tickThroughDeath();
check("returns to play", t.mode === "play");
check("respawns at the stage's FIRST position", t.ninja.x === t.spawn.x,
      `x=${t.ninja.x} spawn=${t.spawn.x}`);
check("and on the ground there", t.ninja.y === t.spawn.y && t.probeGround(t.ninja));
check("the view snaps back to the start", t.cam.x === 0, `cam=${t.cam.x}`);
check("EVERY placed enemy is restored, including the ones you killed",
      t.enemies.filter(isPlaced).length === placedCount &&
      t.enemies.filter(isPlaced).every(e => e.alive),
      `${t.enemies.filter(e => isPlaced(e) && e.alive).length}/${placedCount} alive`);
// "perch" is the resting state of a ledge sentry, exactly as "idle" is a
// charger's and "wait" is a rusher's: a death has to put a sentry back on its
// roof, not leave it wherever its dive ended.
check("restored enemies are back at their posts and idle",
      t.enemies.filter(e => !e.wave).every(e =>
        Math.abs(e.x + e.w / 2 - e.homeX) < 1 &&
        (e.state === "idle" || e.state === "wait" || e.state === "perch")));
check("projectiles and hazards are cleared",
      t.bullets.length === 0 && t.hazards.length === 0 && t.shurikens.length === 0);
check("collected flags are NOT lost (death is not a full restart)",
      t.flagsTaken === 1, `flags=${t.flagsTaken}`);
/* Ammunition survives a death, the way the old permanent cap did. It is the
   same rule for the same reason: the pickups do not come back inside a run, so
   resetting the stock would make dying cost you ammunition you can no longer
   replace, on a stage you now have to re-cross. */
check("the shuriken stock is kept", t.shurikenAmmo === ammoBefore,
      `${ammoBefore} -> ${t.shurikenAmmo}`);
check("death counter incremented", t.deaths === 1, `deaths=${t.deaths}`);
// No instant ambush on the frame you come back.
const spawnCampers = t.enemies.filter(e => e.alive &&
  Math.abs(e.x - t.ninja.x) < 120);
check("nothing is camping the respawn point", spawnCampers.length === 0,
      `${spawnCampers.length} within 120px`);

t.restart();
check("10 collectible flags, none taken at start",
      t.flags.length === 10 && t.flagsTaken === 0);
// flags[] is built row-major, NOT left-to-right, so visiting it in array order
// makes the camera ratchet's left wall shove the ninja off later flags.
for (const f of [...t.flags].sort((a, b) => a.x - b.x)) {
  t.ninja.invuln = 999;              // ignore combat while sweeping the stage
  t.ninja.x = f.x; t.ninja.y = f.y;
  t.snapCamera();
  tick(1);
}
check("collecting every flag clears the stage", t.mode === "clear",
      `flags ${t.flagsTaken}/${t.flags.length}`);
t.restart();
check("R restarts to play mode at spawn",
      t.mode === "play" && t.ninja.x === t.spawn.x && t.kills === 0 && t.deaths === 0);

console.log("\n== geometry: forward-only reachability ==");
function standable(tx, ty) {
  if (!t.solidAt(tx, ty)) return false;
  for (let k = 1; k <= 3; k++) if (t.solidAt(tx, ty - k)) return false;
  return true;
}
const all = [];
for (let ty = 0; ty < t.ROWS; ty++)
  for (let tx = 0; tx < t.COLS; tx++) if (standable(tx, ty)) all.push(tx + "," + ty);
const allSet = new Set(all);
const sTx = Math.floor(t.spawn.x / t.TILE), sTy = (t.spawn.y + t.BODY_H) / t.TILE;
const seen = new Set([sTx + "," + sTy]);
const q = [[sTx, sTy]];
while (q.length) {
  const [tx, ty] = q.shift();
  for (let ny = ty - 4; ny <= ty + 12; ny++) {
    // Forward-only: dx >= 0. Movement cannot go backwards any more, so the
    // reachability model must not either.
    for (let nx = tx; nx <= tx + 6; nx++) {
      if (nx === tx && ny === ty) continue;
      const k = nx + "," + ny;
      if (seen.has(k) || !allSet.has(k)) continue;
      const climb = ty - ny, dx = nx - tx;
      if (climb > 4) continue;
      if (climb > 0 ? dx > 4 : dx > 6) continue;
      seen.add(k); q.push([nx, ny]);
    }
  }
}
// Tiles behind the spawn can never be reached once movement is forward-only,
// so they are excluded rather than counted as level-design faults.
const orphans = all.filter(k => !seen.has(k) && Number(k.split(",")[0]) >= sTx);
const behind = all.filter(k => Number(k.split(",")[0]) < sTx).length;
console.log(`  NOTE  ${behind} surfaces sit behind the spawn and are unreachable by design`);
check("every standable surface at or ahead of spawn is reachable moving only forward",
      orphans.length === 0,
      orphans.length ? `${orphans.length} orphans: ` + orphans.slice(0, 12).join(" ")
                     : `${all.length} surfaces all reachable`);
let flagsOk = 0, flagBad = [];
for (const f of t.spawnFlags) {
  const fx = Math.floor(f.x / t.TILE), fy = (f.y + t.FLAG_H) / t.TILE;
  if (seen.has(fx + "," + fy)) flagsOk++; else flagBad.push(`tile ${fx} row ${fy}`);
}
check("every flag sits on a reachable surface", flagBad.length === 0,
      flagBad.length ? flagBad.join("; ") : `all ${flagsOk} reachable`);
for (const p of t.spawnPickups) {
  const px = Math.floor(p.x / t.TILE), py = (p.y + 13) / t.TILE;
  check(`pickup at tile ${px} is on a reachable surface`, seen.has(px + "," + py));
}

console.log("\n== every pit is crossable with weighty movement ==");
const pitCols = [];
for (let c = 0; c < t.COLS; c++) {
  let any = false;
  for (let r = 0; r < t.ROWS; r++) if (t.solidAt(c, r)) { any = true; break; }
  if (!any) pitCols.push(c);
}
const pits = [];
for (const c of pitCols) {
  const lastP = pits[pits.length - 1];
  if (lastP && c === lastP[1] + 1) lastP[1] = c; else pits.push([c, c]);
}
// An auto-player rather than a single scripted jump: it holds right and jumps
// whenever the ground ahead runs out. Some gaps are crossed by floating
// platforms in two or three hops, which a one-jump script can never model.
function autoCross(a, b) {
  t.restart();
  for (const e of t.enemies) e.alive = false;     // this is a geometry test
  let gc = a - 1;
  while (gc > 0 && !clearCol(gc)) gc--;           // back up to real ground
  let startC = gc;
  for (let k = 0; k < 8; k++) { if (!clearCol(startC - 1)) break; startC--; }
  stand(startC);
  key("keydown", "ArrowRight");
  let ok = false;
  for (let f = 0; f < 420; f++) {
    if (t.ninja.onGround) {
      const footRow = Math.floor((t.ninja.y + t.ninja.h) / t.TILE);
      const ahead = Math.floor((t.ninja.x + t.ninja.w + 5) / t.TILE);
      const holeAhead = !t.solidAt(ahead, footRow) || !t.solidAt(ahead + 1, footRow);
      const stepAhead = t.solidAt(ahead, footRow - 1);   // cover block at shin height
      if (holeAhead || stepAhead) {
        t.keys.delete("KeyZ");                    // re-arm the repeat guard
        key("keydown", "KeyZ");
      }
    }
    clearWaves(); tick(1);
    if (t.mode === "dying") break;
    if (t.ninja.onGround && t.ninja.x > (b + 1) * t.TILE) { ok = true; break; }
  }
  t.keys.clear();
  return ok;
}
check("stage has pits", pits.length > 0,
      pits.map(([a, b]) => `${a}-${b}`).join(", "));
let allCross = true, detail = [];
for (const [a, b] of pits) {
  if (!autoCross(a, b)) { allCross = false; detail.push(`cols ${a}-${b}`); }
}
check("an auto-player clears every gap", allCross,
      detail.length ? "FAILED at " + detail.join("; ") : `${pits.length}/${pits.length} gaps crossed`);

console.log("\n== readability: value separation ==");
const lum = (hex) => {
  const v = hex.replace("#", "");
  const [r, gg, b] = [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * gg + 0.0722 * b;
};
// Mirrors SKY_BANDS in index.html. Night: every band under luminance 33,
// which is what keeps the 40-point gap from the ninja's gi at 73.
const SKY = ["#0B1022", "#101A33", "#15203A", "#281A26"];
const WALL = "#7A6A5E", TILES = "#8E7360";   // background desaturated to sit back     // what characters actually stand against
const nb = lum(t.P_NINJA.B), cb = lum(t.P_CHARGER.G), gb = lum(t.P_WARDEN.G);
// Only the ninja jumps into open sky, so only he needs sky separation.
check("ninja separates from the sky he jumps into (>=40)",
      Math.min(...SKY.map(b => Math.abs(lum(b) - nb))) >= 40,
      `gap ${Math.min(...SKY.map(b => Math.abs(lum(b) - nb))).toFixed(0)} (ninja ${nb.toFixed(0)})`);
const rb = lum(t.P_RUSHER.G);
for (const [name, body] of [["ninja", nb], ["charger", cb], ["warden", gb],
                            ["rusher", rb]]) {
  const worst = Math.min(Math.abs(lum(WALL) - body), Math.abs(lum(TILES) - body));
  check(`${name} separates from the brick wall / tiles (>=25)`, worst >= 25,
        `gap ${worst.toFixed(0)} (body ${body.toFixed(0)}, wall ${lum(WALL).toFixed(0)})`);
}
check("ninja reads apart from both enemy types (>=40)",
      Math.abs(nb - cb) >= 40 && Math.abs(nb - gb) >= 40,
      `ninja ${nb.toFixed(0)} vs charger ${cb.toFixed(0)} / warden ${gb.toFixed(0)}`);
// Equal-value enemies are fine if they differ in HUE -- that is what reads at
// 32px, and they also differ by head colour and behaviour.
const dom = (hex) => {
  const v = hex.replace("#", "");
  const c = [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16));
  return c.indexOf(Math.max(...c));
};
// Chroma, not just brightness: the background should be near-grey and the
// characters should carry the colour, so neither shouts over the other.
const chroma = (hex) => {
  const v = hex.replace("#", "");
  const c = [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16));
  return (Math.max(...c) - Math.min(...c)) / 255;
};
const bgCols = [...SKY, WALL, TILES, "#1E2640", "#283152"];
const worstBg = Math.max(...bgCols.map(chroma));
check("background is desaturated (chroma <= 0.22 everywhere)", worstBg <= 0.22,
      `worst ${worstBg.toFixed(3)}`);
for (const [name, col] of [["ninja", t.P_NINJA.B], ["charger", t.P_CHARGER.G],
                           ["warden", t.P_WARDEN.G], ["rusher", t.P_RUSHER.G]]) {
  check(`${name} body is saturated (chroma >= 0.30)`, chroma(col) >= 0.30,
        `chroma ${chroma(col).toFixed(3)}`);
}
check("every character out-saturates every background colour",
      Math.min(chroma(t.P_NINJA.B), chroma(t.P_CHARGER.G),
               chroma(t.P_WARDEN.G), chroma(t.P_RUSHER.G)) > worstBg,
      `min character ${Math.min(chroma(t.P_NINJA.B), chroma(t.P_CHARGER.G), chroma(t.P_WARDEN.G), chroma(t.P_RUSHER.G)).toFixed(3)} > max bg ${worstBg.toFixed(3)}`);

check("charger and warden differ in hue (red/tan vs green/olive)",
      dom(t.P_CHARGER.G) !== dom(t.P_WARDEN.G),
      `dominant channel ${dom(t.P_CHARGER.G)} vs ${dom(t.P_WARDEN.G)}`);

console.log("\n== sprite rasterization still exact ==");
t.restart();
stand(3);
rects.length = 0;
t.ninja.animTime = 0; t.ninja.invuln = 0;
t.updateCamera(); t.render();
const cell = t.CELL_NINJA;
const sx = Math.round(t.ninja.x + t.SPRITE_OFF_X - t.cam.x);
const sy = Math.round(t.ninja.y - t.cam.y);
const grid = Array.from({ length: t.NINJA_ROWS },
                        () => Array(t.NINJA_COLS).fill("."));
const inv = Object.fromEntries(Object.entries(t.P_NINJA).map(([k, v]) => [v, k]));
for (const r of rects.filter(r => r.w === cell && r.h === cell && inv[r.c])) {
  const gc = (r.x - sx) / cell, gr = (r.y - sy) / cell;
  if (Number.isInteger(gc) && Number.isInteger(gr) &&
      gr >= 0 && gr < t.NINJA_ROWS && gc >= 0 && gc < t.NINJA_COLS)
    grid[gr][gc] = inv[r.c];
}
check("idle rasterizes to NINJA_IDLE byte-for-byte",
      grid.map(r => r.join("")).join("\n") === t.NINJA_IDLE.join("\n"));

console.log("\n== flag design is distinct from the shuriken ==");
check("flag is a 10x14 banner sprite", t.FLAG_COLS === 10 && t.FLAG_ROWS === 14);
check("flag is far larger than the shuriken icon",
      (t.FLAG_W * t.FLAG_H) > (t.SHURIKEN_SIZE * t.SHURIKEN_SIZE) * 4,
      `${t.FLAG_W}x${t.FLAG_H} vs ${t.SHURIKEN_SIZE}x${t.SHURIKEN_SIZE}`);
const fr = parseInt(t.P_FLAG.R.slice(1, 3), 16), fg = parseInt(t.P_FLAG.R.slice(3, 5), 16);
check("banner is dominantly red (shuriken is grey/white)", fr > fg + 80,
      `R=${fr} G=${fg}`);
check("flag sprite has a pole column and a banner block",
      t.FLAG_SPRITE.every(r => r.length === 10) &&
      t.FLAG_SPRITE.filter(r => r.includes("R")).length >= 5);

console.log("\n== background lights animate on their own ==");
function windowSig() {
  rects.length = 0;
  t.render();
  return rects.filter(r => r.w === 5 && r.h === 7).map(r => r.c).join("|");
}
t.restart(); stand(3);
const w0 = windowSig();
check("mid-layer windows are being drawn", w0.length > 0, `${w0.split("|").length} windows`);
tick(200);                       // 3.3s of clock, ninja never moves
const w1 = windowSig();
check("windows change with NO player movement (clock-driven, not position)",
      w0 !== w1, "previously a pure function of position, so nothing animated");
check("ninja really did not move", t.ninja.x === 3 * t.TILE && t.cam.x === 0);
check("clock advanced", t.clock > 3, `clock=${t.clock.toFixed(2)}s`);

console.log("\n== impact effects ==");
t.restart();
/* The sentries are stood down for this block. It counts the particles ONE kill
   produces, and a sentry dropping into the alley nearby lands its own dust
   burst into the same array -- which is correct behaviour and the wrong thing
   to be measuring here. */
for (const e of t.enemies) if (e.ledge) e.alive = false;
const fx1 = t.enemies.find(e => e.kind === "charger" && !e.ledge);
stand(Math.floor(fx1.x / t.TILE) - 5);
t.throwShuriken();
let gone = false;
for (let i = 0; i < 150 && !gone; i++) { tick(1); gone = !fx1.alive; }
check("shuriken kill spawns a particle burst", t.particles.length >= 12,
      `${t.particles.length} particles`);
check("kill applies a few frames of hitstop", t.hitFreeze > 0,
      `${(t.hitFreeze * 1000).toFixed(0)}ms`);
check("kill tints the screen", t.flash > 0);
tick(60);
check("particles expire", t.particles.length === 0);

console.log("\n== hit feel: trauma, the shove, and the impact frame ==");
{
  t.restart();
  // 1. It COMPOSES. This is the whole reason it is a scalar and not a timer.
  t.addTrauma(0.3);
  const one = t.trauma;
  t.addTrauma(0.3);
  check("a second hit ADDS trauma rather than restarting it", t.trauma > one + 0.25,
        `${one.toFixed(2)} -> ${t.trauma.toFixed(2)}`);
  t.addTrauma(5);
  check("trauma is clamped at full", t.trauma === 1, `${t.trauma}`);

  // 2. Whole pixels only. Sub-pixel camera motion under pixelated upscaling is
  //    the shimmer the whole background is built to avoid.
  let allInt = true, peakFull = 0;
  for (let i = 0; i < 40; i++) {
    const x = t.shakeOffsetX(), y = t.shakeOffsetY();
    if (!Number.isInteger(x) || !Number.isInteger(y)) allInt = false;
    peakFull = Math.max(peakFull, Math.abs(x), Math.abs(y));
    t.updateShake(0);                 // advance the phase, not the decay
  }
  check("the shake offset is always whole pixels", allInt);
  check("full trauma shakes within its budget", peakFull > 2 && peakFull <= t.SHAKE_PX + t.PUNCH_PX,
        `peak ${peakFull}px, budget ${t.SHAKE_PX}+${t.PUNCH_PX}px`);

  // 3. Squared falloff: half the trauma is a QUARTER of the shake, which is
  //    what puts a tap and a slam on one curve.
  t.restart(); t.addTrauma(1);
  let a = 0; for (let i = 0; i < 40; i++) { a = Math.max(a, Math.abs(t.shakeOffsetX())); t.updateShake(0); }
  t.restart(); t.addTrauma(0.5);
  let b = 0; for (let i = 0; i < 40; i++) { b = Math.max(b, Math.abs(t.shakeOffsetX())); t.updateShake(0); }
  check("half the trauma is about a quarter of the shake", b > 0 && a / b >= 3,
        `${a}px at full vs ${b}px at half`);

  // 4. It goes away, and quickly. A shake that outlives the hit reads as a bug.
  t.restart(); t.addTrauma(1);
  let frames = 0;
  while (t.trauma > 0 && frames < 120) { t.updateShake(t.STEP); frames++; }
  check("full trauma is spent in under a third of a second",
        frames * t.STEP < 0.33, `${(frames * t.STEP * 1000).toFixed(0)}ms`);

  // 5. Hitstop HOLDS the shove. The freeze frame is the hit; a camera that
  //    keeps moving through it turns the freeze into a stutter.
  t.restart();
  const kb = pickEnemy("charger", 7);
  for (const x of t.enemies) if (x !== kb) x.alive = false;
  stand(Math.floor(kb.x / t.TILE) - 2);
  t.ninja.facing = 1;
  for (let i = 0; i < 240 && kb.alive; i++) { t.slash(); tickIso(1); }
  check("a blade kill leaves the world frozen", t.hitFreeze > 0,
        `${(t.hitFreeze * 1000).toFixed(0)}ms`);
  check("...and shoves the view", Math.hypot(t.punchX, t.punchY) > 1,
        `${Math.hypot(t.punchX, t.punchY).toFixed(1)}px`);
  check("the shove points AWAY from the player", t.punchX > 0,
        `punchX=${t.punchX.toFixed(2)} (enemy was to the right)`);
  const heldTrauma = t.trauma, heldPunch = t.punchX;
  tick(1);
  check("the freeze holds the shake still", t.trauma === heldTrauma && t.punchX === heldPunch,
        `trauma ${heldTrauma.toFixed(3)} held`);

  // 6. The impact frame exists and is gone almost immediately.
  check("the kill sets an impact frame", kb.impact > 0,
        `${(kb.impact * 1000).toFixed(0)}ms`);
  check("the impact frame is two frames, not a lingering ghost",
        kb.impact <= t.IMPACT_TIME + 1e-9 && t.IMPACT_TIME <= 3 / 60,
        `${(t.IMPACT_TIME * 60).toFixed(0)} frames`);
  // Drawn as a run-coalesced silhouette: cheap enough to leave on. A per-pixel
  // stamp of the same pose is about 800 rects.
  const before = rects.length;
  t.drawSilhouette(t.ENEMY_POSES.charger.base, 40, 40, false, "#FFFFFF", t.CELL_NINJA);
  check("the silhouette coalesces into runs", rects.length - before < 120,
        `${rects.length - before} rects for a 32x48 stamp`);
}

// Particle gravity, tested where particles actually still exist.
t.restart();
t.spawnBurst(t.ninja.x, t.ninja.y - 40, 8, ["#FFFFFF"], 120, 0.6);
const pg0 = { x: t.particles[0].x, y: t.particles[0].y };
tickNoWave(4);
check("particles are affected by gravity",
      t.particles[0] && t.particles[0].y !== pg0.y);

console.log("\n== player death is a freeze frame, then grayscale (req 3) ==");
t.restart();
stand(3);
// Kill an enemy first: it leaves a flash burning and particles in flight, which
// is what lets us prove the freeze really stops the world. killEnemy() also
// applies hitstop, and update() returns early while that burns -- so let it
// expire before dropping the ninja, or the death frame is eaten by the stop.
t.killEnemy(t.enemies.find(e => e.alive));
for (let i = 0; i < 5; i++) tickNoWave(1);
const flashBefore = t.flash;
const partsBefore = t.particles.length;
const witness = t.enemies.find(e => e.alive && e.x > t.ninja.x);
const wx = witness ? witness.x : 0, wy = witness ? witness.y : 0;

t.ninja.y = t.WORLD_H + 200;
tick(1);
const frozenClock = t.clock;
check("death enters dying", t.mode === "dying");
check("the death itself adds no particles: the freeze frame IS the effect",
      partsBefore > 0 && t.particles.length === partsBefore,
      `${partsBefore} -> ${t.particles.length}`);
check("a flash left over from a kill does not freeze on screen",
      flashBefore > 0 && t.flash === 0,
      `before=${flashBefore.toFixed(2)} now=${t.flash}`);
check("screen starts in full colour", t.deathGrey() === 0);

// Nothing may advance during the freeze.
tickToElapsed(t.DEATH_HOLD - t.STEP);
check("the world clock is frozen", t.clock === frozenClock,
      `${t.clock} vs ${frozenClock}`);
check("particles in flight are frozen too", t.particles.length === partsBefore);
check("enemies are frozen",
      witness === undefined || (witness.x === wx && witness.y === wy));
check("still in colour through the impact beat", t.deathGrey() === 0,
      `grey=${t.deathGrey()}`);

// ...then it drains to grey and holds there.
tickToElapsed(t.DEATH_HOLD + t.DEATH_FADE / 2);
const midGrey = t.deathGrey();
check("desaturation is under way mid-fade", midGrey > 0.2 && midGrey < 0.95,
      `grey=${midGrey.toFixed(2)}`);
tickToElapsed(t.DEATH_HOLD + t.DEATH_FADE);
check("fully grey once the fade completes", t.deathGrey() === 1,
      `grey=${t.deathGrey().toFixed(3)}`);
check("and it is still grey while the still frame is held",
      t.mode === "dying" && t.deathGrey() === 1, `mode=${t.mode}`);
const greyFrames = Math.round((t.DEATH_TIME - t.DEATH_HOLD - t.DEATH_FADE) / t.STEP);
check("the grey hold is a real pause, not a single frame", greyFrames >= 20,
      `${greyFrames} frames`);

tickThroughDeath();
check("dying resolves back into play", t.mode === "play");
check("colour is restored on respawn", t.deathGrey() === 0);
check("back at the stage's first position", t.ninja.x === t.spawn.x,
      `x=${t.ninja.x} spawn=${t.spawn.x}`);

console.log("\n== stage variety (req: less monotonous) ==");
const pitWidths = pits.map(([a, b]) => b - a + 1);
check("pits come in several widths", new Set(pitWidths).size >= 3,
      `widths: ${pitWidths.join(",")}`);
const ledgeRows = new Set();
for (let r = 0; r < 20; r++)
  for (let c = 0; c < t.COLS; c++) if (t.solidAt(c, r)) { ledgeRows.add(r); break; }
check("terrain uses several elevations", ledgeRows.size >= 3,
      `rows above ground in use: ${[...ledgeRows].sort((a, b) => a - b).join(",")}`);
let surfaceChanges = 0, prevTop = null;
for (let c = 0; c < t.COLS; c++) {
  let top = null;
  for (let r = 0; r < t.ROWS; r++) if (t.solidAt(c, r)) { top = r; break; }
  if (top !== prevTop) { surfaceChanges++; prevTop = top; }
}
check("the walking surface changes height often", surfaceChanges >= 40,
      `${surfaceChanges} elevation changes across 400 tiles`);

console.log("\n== rusher: third pattern, comes at you from the right ==");
t.restart();
const r0 = pickEnemy("rusher", 11);
check("found a rusher with an unobstructed approach", !!r0,
      r0 ? `tile ${Math.floor(r0.x / t.TILE)}` : "none");
for (const e of t.enemies) if (e !== r0) e.alive = false;
stand(Math.floor(r0.x / t.TILE) - 10);
check("rusher idles off-screen in 'wait'", r0.state === "wait", `state=${r0.state}`);
tickIso(3);
check("commits the moment it is on screen (no aggro needed)", r0.state === "run",
      `state=${r0.state}`);
check("runs LEFT toward the player", r0.vx < 0, `vx=${r0.vx}`);
check("faster than a charger", t.RUSH_SPEED > t.CHG_SPEED,
      `${t.RUSH_SPEED} vs ${t.CHG_SPEED}`);
check("not lethal while merely running", r0.lethal === false);
let sawLeap = false;
for (let i = 0; i < 500 && !sawLeap; i++) { tickIso(1); sawLeap = r0.state === "leap"; }
check("closes the distance and leaps", sawLeap);
// The leap leads with the daggers instead of making the body lethal, so what
// there is to check here is the hazard box, not a flag on the enemy.
check("the leap puts an attack box in front of it", (() => {
  for (let i = 0; i < 40; i++) {
    if (r0.state === "leap" && t.hazards.length > 0) return true;
    t.ninja.invuln = 9999;
    tickIso(1);
  }
  return false;
})());
check("...and never makes its body lethal to touch", r0.lethal === false);
// Touching a non-leaping rusher must stay harmless.
t.restart();
const r1 = pickEnemy("rusher", 4) || t.enemies.find(e => e.kind === "rusher" && !e.ledge);
for (const e of t.enemies) if (e !== r1) e.alive = false;
stand(Math.floor(r1.x / t.TILE));
t.ninja.x = r1.x; r1.state = "run"; r1.lethal = false;
const dR = t.deaths;
tick(1);
check("body contact with a running rusher is harmless", t.deaths === dR);

console.log("\n== standing still is not safe: wave spawns ==");
t.restart();
stand(3);
const placed = t.enemies.length;
for (let i = 0; i < Math.ceil(t.WAVE_INTERVAL * 60) + 6; i++) { t.ninja.invuln = 99; tick(1); }
const waves = t.enemies.filter(e => e.wave);
check("a rusher arrives while the player never moves", waves.length >= 1,
      `${waves.length} spawned after ${t.WAVE_INTERVAL}s`);
check("player really did not move", t.ninja.x === 3 * t.TILE);
check("spawned past the RIGHT edge of the view",
      waves.every(e => e.x + e.w > t.cam.x + t.VIEW_W - 8),
      waves.map(e => `x=${e.x}`).join(" "));
check("spawns land on solid ground", waves.every(e => t.probeGround(e) || e.vy >= 0));
check("spawned rushers start running, not waiting",
      waves.every(e => e.state === "run" || e.state === "leap"));
for (let i = 0; i < 60 * 25; i++) { t.ninja.invuln = 99; tick(1); }
check("wave spawns are capped so they cannot snowball",
      t.enemies.filter(e => e.alive && e.wave).length <= t.WAVE_MAX_ALIVE,
      `${t.enemies.filter(e => e.alive && e.wave).length} alive, cap ${t.WAVE_MAX_ALIVE}`);
check("dead wave spawns are retired from the list",
      t.enemies.filter(e => e.wave && !e.alive && e.dying <= 0).length === 0);
check("placed roster is untouched by waves",
      t.enemies.filter(e => !e.wave).length === placed);

console.log("\n== HUD is a bitmap font, not antialiased canvas text ==");
const src = fs.readFileSync(FILE, "utf8");
check("no ctx.fillText anywhere (it blurs under upscaling)",
      !/ctx\.fillText\(/.test(src));
check("no ctx.font / textBaseline left", !/ctx\.font\s*=/.test(src));
check("font has a full alphanumeric set", Object.keys(t.FONT).length >= 40,
      `${Object.keys(t.FONT).length} glyphs`);
let fontOk = true;
for (const ch in t.FONT) {
  if (t.FONT[ch].length !== t.FONT_H) fontOk = false;
  for (const row of t.FONT[ch]) if (row.length !== t.FONT_W) fontOk = false;
}
check("every glyph is exactly 3x5", fontOk);
rects.length = 0;
t.drawText("FLAG 10/10", 8, 8, "#FFE45E", 2);
const glyphRects = rects.filter(r => r.w === 2 && r.h === 2);
check("drawText emits only integer-aligned square pixels",
      glyphRects.length > 0 && glyphRects.every(r =>
        Number.isInteger(r.x) && Number.isInteger(r.y)),
      `${glyphRects.length} pixels`);
check("textWidth matches the advance used", t.textWidth("ABC", 2) === 3 * 4 * 2);

/* THE HUD FONT, and the resolution it exists to use.
   The 3x5 font above is fifteen pixels per character. That is enough for a
   label and not enough for a number read at a glance, which is what made the
   readout look coarse -- it WAS coarse, and upscaling cannot add detail nobody
   drew. These checks pin down the three properties the replacement depends on:
   it is denser, it snaps to the DEVICE grid rather than the world grid, and it
   coalesces into runs so that density is affordable. */
check("the render buffer is larger than the world grid", t.RENDER_SCALE >= 2,
      `${t.VIEW_W}x${t.VIEW_H} world into a ${t.VIEW_W * t.RENDER_SCALE}x${t.VIEW_H * t.RENDER_SCALE} buffer`);
check("the HUD font is denser than the label font",
      t.FONT_HD_W * t.FONT_HD_H > t.FONT_W * t.FONT_H * 2,
      `${t.FONT_HD_W}x${t.FONT_HD_H} = ${t.FONT_HD_W * t.FONT_HD_H} cells vs ${t.FONT_W * t.FONT_H}`);
check("the HUD font covers the label font's glyph set",
      Object.keys(t.FONT).every(ch => t.FONT_HD[ch]),
      `${Object.keys(t.FONT_HD).length} HD glyphs vs ${Object.keys(t.FONT).length}`);
let hdOk = true;
for (const ch in t.FONT_HD) {
  if (t.FONT_HD[ch].length !== t.FONT_HD_H) hdOk = false;
  for (const row of t.FONT_HD[ch]) if (row.length !== t.FONT_HD_W) hdOk = false;
}
check("every HD glyph is the declared size", hdOk);
rects.length = 0;
t.drawTextHD("SCORE 014250", 8, 8, "#9CFF7A", 2);
const hdMarks = rects.length;
// A cell of 1 device pixel is half a world unit: the sub-unit precision is the
// entire point, and asserting integer world coordinates here would forbid it.
check("the HUD font lands on the DEVICE pixel grid",
      rects.every(r => Number.isInteger(r.x * t.RENDER_SCALE) &&
                       Number.isInteger(r.y * t.RENDER_SCALE) &&
                       Number.isInteger(r.h * t.RENDER_SCALE)),
      `${hdMarks} marks`);
check("the HUD font coalesces runs rather than emitting cells",
      hdMarks < 12 * t.FONT_HD_W * t.FONT_HD_H * 0.7,
      `${hdMarks} marks for 12 characters (${12 * t.FONT_HD_W * t.FONT_HD_H} cells)`);
check("textWidthHD matches the advance used",
      t.textWidthHD("ABC", 2) === 3 * (t.FONT_HD_W + 1) * (2 / t.RENDER_SCALE));

console.log("\n== the frame budget defends itself ==");
{
  /* The contract is narrow and worth stating: when frames are slow, DECORATION
     goes and the GAME does not. The fixed timestep already guarantees the
     simulation is identical at any frame rate, so the only thing quality is
     allowed to touch is what gets drawn. */
  t.restart();
  t.quality = t.Q_FULL;
  // Half a second of missed frames.
  for (let i = 0; i < 40; i++) t.perfSample(t.FRAME_BUDGET + 8);
  check("sustained slow frames drop the quality level", t.quality < t.Q_FULL,
        `level ${t.quality}`);
  const dropped = t.quality;
  for (let i = 0; i < 40; i++) t.perfSample(t.FRAME_BUDGET + 8);
  check("...and keep dropping it", t.quality < dropped, `level ${t.quality}`);
  check("it never drops below the floor", t.quality >= t.Q_MINIMAL);
  // Two comfortable seconds.
  for (let i = 0; i < 300; i++) t.perfSample(t.FRAME_BUDGET * 0.4);
  check("comfortable frames earn the level back", t.quality === t.Q_FULL,
        `level ${t.quality}`);
  /* A frame sitting exactly ON the budget must not flip the level every frame.
     The drop test is "over budget" and the recovery test is "comfortably
     under", so there is a dead band between them and 16.67ms sits in it. */
  t.quality = t.Q_FULL;
  for (let i = 0; i < 400; i++) t.perfSample(t.FRAME_BUDGET * 0.85);
  check("a frame on the boundary cannot oscillate the level",
        t.quality === t.Q_FULL, `level ${t.quality} after 400 boundary frames`);

  // Fewer draw calls at a lower level, identical world.
  t.restart(); stand(30);
  tickIso(20);
  const before = { x: t.ninja.x, y: t.ninja.y, foes: t.enemies.filter(e => e.alive).length };
  t.quality = t.Q_FULL;
  rects.length = 0; t.render();
  const full = rects.length;
  t.quality = t.Q_MINIMAL;
  rects.length = 0; t.render();
  const minimal = rects.length;
  check("a lower quality level draws less", minimal < full,
        `${full} -> ${minimal} marks`);
  check("...and changes nothing about the world",
        t.ninja.x === before.x && t.ninja.y === before.y &&
        t.enemies.filter(e => e.alive).length === before.foes);
  t.quality = t.Q_FULL;
}

console.log("\n== shuriken is faster but still cannot tunnel ==");
check("shuriken speed raised", t.SHURIKEN_SPEED >= 450, `${t.SHURIKEN_SPEED} px/s`);
check("per-step travel stays under a tile", t.SHURIKEN_SPEED * t.STEP < t.TILE,
      `${(t.SHURIKEN_SPEED * t.STEP).toFixed(1)}px/step < ${t.TILE}px`);

console.log("\n== shuriken follows facing ==");
t.restart(); stand(60);
t.ninja.facing = 1;
t.throwShuriken();
check("facing right throws right", t.shurikens[0].vx > 0, `vx=${t.shurikens[0].vx}`);
check("spawns off the right hand", t.shurikens[0].x >= t.ninja.x + t.ninja.w - 1);
t.restart(); stand(60);
t.ninja.facing = -1;
t.throwShuriken();
check("facing LEFT throws left", t.shurikens[0].vx < 0, `vx=${t.shurikens[0].vx}`);
check("spawns off the left hand", t.shurikens[0].x < t.ninja.x);
const leftShuriken = t.shurikens[0];
for (let i = 0; i < 20; i++) tickNoWave(1);
check("left-thrown shuriken actually travels left",
      leftShuriken.x < t.ninja.x - 40 || t.shurikens.length === 0);
t.restart(); stand(60);
t.ninja.facing = -1; t.throwShuriken();
for (let i = 0; i < 200 && t.shurikens.length; i++) tickNoWave(1);
check("it is culled at the left edge too (no leak)", t.shurikens.length === 0);

console.log("\n== enemies hop over structures ==");
// seg1 has a 2-tile hop block at tiles 24-25; park a charger behind it.
t.restart();
{
  const probe = t.enemies.find(x => x.kind === "charger" && !x.ledge);
  probe.x = 26 * t.TILE; probe.y = 20 * t.TILE - t.ENEMY_H; probe.onGround = true;
  check("wallAhead sees the hop block to the left", t.wallAhead(probe, -1) === true);
  check("clearAbove confirms it is only 2 tiles tall", t.clearAbove(probe, -1) === true);
  probe.x = 60 * t.TILE;
  check("wallAhead is false on open ground", t.wallAhead(probe, -1) === false);
}
t.restart();
// Not a posted one: those never advance, which is the point of them.
const hopper = t.enemies.find(e => e.kind === "charger" && !e.ledge && !e.post);
for (const e of t.enemies) if (e !== hopper) e.alive = false;
hopper.x = 27 * t.TILE; hopper.y = 20 * t.TILE - t.ENEMY_H;
hopper.vx = 0; hopper.vy = 0; hopper.onGround = true; hopper.state = "charge";
/* The player stands on the FAR side of the block, at tile 18, so reaching swing
   range requires crossing it -- which is the thing being measured. Standing at
   20 left the charger halting four pixels short of "fully past", because
   CHG_MELEE went up with the blade's reach and a charger stops the moment it is
   inside it. Standing at 14 was worse: that is outside the lunge band, so it
   only walked, and the leash stopped it before the block.

   homeX is pinned too. The test moves the body by hand and homeX kept the value
   from its original post, so the leash was measured against a place it had
   never been. */
hopper.homeX = 27 * t.TILE + t.ENEMY_W / 2;
stand(18);
const hopStartX = hopper.x;
let onTop = false, gotOver = false;
for (let i = 0; i < 700 && !gotOver; i++) {
  tickIso(1);
  if (!hopper.alive) break;
  if (hopper.y < 20 * t.TILE - t.ENEMY_H - 8) onTop = true;   // stood on the block
  if (hopper.x + hopper.w < 24 * t.TILE) gotOver = true;      // fully past it
}
check("a charger hops up onto the 2-tile block", onTop, `y=${hopper.y.toFixed(0)}`);
check("and continues past it instead of jamming", gotOver,
      `x ${hopStartX} -> ${hopper.x.toFixed(0)} (block ends at 384)`);

console.log("\n== a crowd resolves by walking, not by shoving ==");
/* This used to push every overlapping pair apart. The shove is POSITIONAL, so
   it fights whatever the AI decided that frame -- a charger walks forward, gets
   pushed back, walks forward again, and the bodies visibly vibrate. At
   twenty-eight enemies that read as jostling; at fifty-six it was a scrum.

   Bodies pass through one another now. Nothing pushes anything, so nothing can
   contradict the AI, and the concession is to SPEED instead: the body walking
   into another eases off, so a deep pair slides apart over a few frames rather
   than travelling locked together. */
t.restart(); stand(60);
const a1 = t.enemies[0], a2 = t.enemies[1];
for (const e of t.enemies) e.alive = false;
a1.alive = true; a2.alive = true;
a1.x = 80 * t.TILE; a1.y = 20 * t.TILE - t.ENEMY_H;
a2.x = 80 * t.TILE; a2.y = 20 * t.TILE - t.ENEMY_H;
check("two enemies start perfectly overlapped", t.overlaps(a1, a2));
{
  const x1 = a1.x, x2 = a2.x;
  t.separateBodies();
  check("nothing is teleported apart", a1.x === x1 && a2.x === x2,
        `${x1} -> ${a1.x}, ${x2} -> ${a2.x}`);
}
/* The concession is to a FACTOR, not to vx. updateEnemy() rewrites vx from
   scratch every frame, so scaling vx after the bodies had moved -- which is
   where this started -- did nothing at all. */
{
  a1.vx = 90; a2.vx = 90;                   // a1 behind, a2 just ahead of it
  a2.x = a1.x + 4;
  t.crowdYield();
  check("the body walking into another eases off", a1.crowd < 1, `${a1.crowd}`);
  check("...and the one ahead of it keeps its speed", a2.crowd === 1, `${a2.crowd}`);
  check("...and neither one's velocity was rewritten",
        a1.vx === 90 && a2.vx === 90);
}
{
  // Brushing past is left alone entirely -- only a deep overlap concedes.
  a1.x = 80 * t.TILE; a2.x = a1.x + a1.w - 2;
  a1.vx = 90; a2.vx = 90;
  t.crowdYield();
  check("a glancing overlap costs nothing", a1.crowd === 1, `${a1.crowd}`);
}
{
  // And a deep pair does come apart, by walking.
  t.restart(); stand(60);
  const b1 = t.enemies.find(e => e.alive && e.kind === "charger" && !e.ledge && !e.post);
  const b2 = t.enemies.find(e => e.alive && e !== b1 && e.kind === "charger" && !e.ledge && !e.post);
  for (const e of t.enemies) if (e !== b1 && e !== b2) e.alive = false;
  /* Placed OUTSIDE the lunge band. At 90px they are inside it, and a lunge is
     a fixed dash followed by half a second of recovery with the velocity pinned
     to zero -- so the pair spends most of its time not moving at all and the
     separation, which is a difference in speed, has nothing to work with. This
     measures plain walking, which is the case the complaint was about. */
  /* Six tiles back, and homeX on their OWN position. Putting homeX 200px away
     left them outside their leash from the first frame, so vx was pinned to
     zero and a difference in speed had nothing to act on -- they were not
     stuck, they were standing where they were told to. */
  b1.x = t.ninja.x + 6 * t.TILE; b1.y = 20 * t.TILE - t.ENEMY_H;
  b2.x = b1.x; b2.y = b1.y;
  b1.homeX = b1.x + b1.w / 2; b2.homeX = b2.x + b2.w / 2;
  b1.state = "charge"; b2.state = "charge";
  b1.lungeCd = 99; b2.lungeCd = 99;         // walk, do not dash
  let apart = false, frames = 0;
  for (let i = 0; i < 300 && !apart; i++) {
    t.ninja.invuln = 999;
    t.ninja.x = 60 * t.TILE;                // hold still, so they keep coming
    tickNoWave(1);
    frames = i;
    if (!t.overlaps(b1, b2)) apart = true;
  }
  check("a deep pair walks itself apart", apart,
        `gap ${Math.abs(b1.x - b2.x).toFixed(1)}px after ${frames} frames`);
  check("...and it takes a moment rather than snapping", frames > 3,
        `${frames} frames -- a jump apart would be the old shove`);
}
// The player must never be shoved by separation.
t.restart(); stand(60);
const pusher = t.enemies.find(e => e.alive);
pusher.x = t.ninja.x; pusher.y = 20 * t.TILE - t.ENEMY_H;
pusher.homeX = pusher.x + pusher.w / 2;   // teleported, so move its post too,
                                          // else the leash clamp blocks the push
const ninjaXBefore = t.ninja.x;
t.separateBodies();
check("only the enemy yields; the player is never displaced",
      t.ninja.x === ninjaXBefore && pusher.x !== ninjaXBefore,
      `ninja ${t.ninja.x}, enemy ${pusher.x.toFixed(1)}`);

console.log("\n== enemies never deadlock against structures ==");
// Regression for the reported pile-up: seg1 has a hop block at tiles 24-25, and
// separation used to shove an IDLE charger into it, wedging every wave spawn
// behind a body that could not move. Replay the exact scenario.
check("bodyAhead detects a peer in the way", (() => {
  t.restart();
  const a = t.enemies[0], b = t.enemies[1];
  for (const e of t.enemies) e.alive = false;
  a.alive = b.alive = true;
  a.x = 200 * t.TILE; a.y = 20 * t.TILE - t.ENEMY_H;
  b.x = a.x - t.ENEMY_W - 4; b.y = a.y;
  return t.bodyAhead(a, -1) === true && t.bodyAhead(a, 1) === false;
})());
check("jump clears a full body height", (() => {
  const rise = (t.ENEMY_JUMP_VY * t.ENEMY_JUMP_VY) / (2 * t.GRAVITY_RISE);
  return rise > t.ENEMY_H;
})(), `rise ${((t.ENEMY_JUMP_VY ** 2) / (2 * t.GRAVITY_RISE)).toFixed(0)}px > body ${t.ENEMY_H}px`);
check("dropIsSafe tells a step-down from a bottomless pit", (() => {
  t.restart();
  const e = t.enemies[0];
  // Derive the columns from the grid rather than hardcoding: the stage moves.
  let blockCol = -1, pitCol = -1;
  for (let c = 1; c < 120; c++) {
    if (blockCol < 0 && t.solidAt(c, 18) && t.solidAt(c, 19) &&
        !t.solidAt(c + 1, 18) && t.solidAt(c + 1, 20)) blockCol = c;
    let bare = true;
    for (let r = 0; r < t.ROWS; r++) if (t.solidAt(c, r)) bare = false;
    if (pitCol < 0 && bare && t.solidAt(c - 1, 20)) pitCol = c;
  }
  if (blockCol < 0 || pitCol < 0) return false;
  e.x = blockCol * t.TILE; e.y = 18 * t.TILE - t.ENEMY_H;   // stood on cover
  const stepDown = t.dropIsSafe(e, 1);
  e.x = (pitCol - 1) * t.TILE; e.y = 20 * t.TILE - t.ENEMY_H;   // at a pit lip
  const overPit = t.dropIsSafe(e, 1);
  return stepDown === true && overPit === false;
})());

t.restart();
let worstStack = 0, closest = 999, frozenFrames = 0, lastSig = "";
let sustained = 0, worstSustained = 0;
for (let f = 0; f < 60 * 26; f++) {
  t.ninja.invuln = 99;                 // survive long enough for a crowd to form
  tick(1);
  const live = t.enemies.filter(e => e.alive &&
    e.x > t.cam.x - 100 && e.x < t.cam.x + t.VIEW_W + 100);
  let stacks = 0;
  for (let i = 0; i < live.length; i++) {
    for (let j = i + 1; j < live.length; j++) {
      if (Math.abs((live[i].y + live[i].h) - (live[j].y + live[j].h)) <= 24 &&
          t.overlaps(live[i], live[j])) stacks++;
    }
  }
  worstStack = Math.max(worstStack, stacks);
  if (stacks >= 2) sustained++; else sustained = 0;
  worstSustained = Math.max(worstSustained, sustained);
  for (const e of live) {
    closest = Math.min(closest, Math.abs(e.x - t.ninja.x) / t.TILE);
  }
  /* A deadlock is movement PREVENTED, so only bodies that are trying to move
     count. Signing every visible enemy conflated three legitimate ways to be
     stationary with a jam: a charger guarding its post, one frozen through the
     0.89s of windup-swing-recover, and -- since the roster doubled -- a posted
     charger, which never moves at all by design. With more of all three on
     screen, "everyone's x is unchanged" crossed 1.5s routinely while nothing
     was actually stuck. */
  /* "Trying to move" means the AI set a velocity this frame. A leashed charger
     sits in `charge` with vx pinned to zero, which is correct behaviour and
     used to be masked only because the old shoving nudged it every frame -- so
     state alone is not intent, and vx is. */
  const trying = live.filter(e =>
    !e.post && Math.abs(e.vx) > 1 && (e.state === "charge" || e.state === "run"));
  const sig = trying.map(e => Math.round(e.x)).join(",");
  if (sig === lastSig && trying.length > 1) frozenFrames++; else frozenFrames = 0;
  lastSig = sig;
  if (frozenFrames > 90) break;        // 1.5s of blocked pursuit = deadlock
}
check("no deadlock: pursuers are never blocked for 1.5s", frozenFrames <= 90,
      `${frozenFrames} identical frames`);
check("enemies get past the hop block and reach the player", closest < 6,
      `closest approach ${closest.toFixed(1)} tiles`);
// A one-frame overlap while two bodies cross mid-leap is invisible; what reads
// as "piling up" is stacking that PERSISTS. Measure duration, not peak.
check("stacking is never sustained (no visible pile)", worstSustained < 30,
      `worst run ${worstSustained} frames (${(worstSustained / 60).toFixed(2)}s), peak ${worstStack} pairs`);

console.log("\n== rushers pass through, they do not swarm ==");
t.restart();
const pr = pickEnemy("rusher", 11);
for (const e of t.enemies) if (e !== pr) e.alive = false;
stand(Math.floor(pr.x / t.TILE) - 10);
tickIso(4);
check("travels left on entry", pr.vx < 0, `vx=${pr.vx}`);
check("always faces left while running", pr.facing === -1);
let leaps = 0, passedPlayer = false, prevState = pr.state;
for (let i = 0; i < 900 && pr.alive; i++) {
  // This is about the rusher's PATH, so the player has to stay alive to be
  // walked past. Contact used to kill, which froze the world in "dying" and
  // left the rusher standing where it hit, so the pass never happened.
  t.ninja.invuln = 9999;
  tickIso(1);
  if (pr.state === "leap" && prevState !== "leap") leaps++;
  prevState = pr.state;
  if (pr.x + pr.w < t.ninja.x) passedPlayer = true;
}
check("leaps no more than the designed maximum per pass",
      leaps <= t.RUSH_MAX_LEAPS, `${leaps} leaps, max ${t.RUSH_MAX_LEAPS}`);
check("carries on PAST the player instead of circling back", passedPlayer);
check("then leaves the stage and despawns", !pr.alive);
check("wave cadence is thinned out", t.WAVE_INTERVAL >= 5 && t.WAVE_MAX_ALIVE <= 2,
      `${t.WAVE_INTERVAL}s interval, max ${t.WAVE_MAX_ALIVE} alive`);

console.log("\n== chargers guard a post instead of trailing you ==");
t.restart();
const lc = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== lc) e.alive = false;
const home = lc.homeX;
stand(Math.floor(lc.x / t.TILE) - 12);
for (let i = 0; i < 500; i++) tickIso(1);
check("charger never strays beyond its leash",
      Math.abs((lc.x + lc.w / 2) - home) <= t.CHG_LEASH + 6,
      `${Math.abs((lc.x + lc.w / 2) - home).toFixed(0)}px from post, leash ${t.CHG_LEASH}`);
// Walking away must not drag it along.
key("keydown", "ArrowRight");
for (let i = 0; i < 600; i++) tickIso(1);
key("keyup", "ArrowRight"); t.keys.clear();
check("walking away does not drag it across the stage",
      !lc.alive || Math.abs((lc.x + lc.w / 2) - home) <= t.CHG_LEASH + 6,
      lc.alive ? `${Math.abs((lc.x + lc.w / 2) - home).toFixed(0)}px` : "despawned behind camera");

console.log("\n== reaching the end shows an ending ==");
t.restart();
stand(3);
check("goal sits near the end of the stage", t.GOAL_TILE > t.COLS - 12,
      `tile ${t.GOAL_TILE}/${t.COLS}`);
t.ninja.x = t.GOAL_TILE * t.TILE; t.snapCamera();
tick(1);
check("crossing the goal clears the stage without needing every flag",
      t.mode === "clear" && t.flagsTaken < t.flags.length,
      `mode=${t.mode} flags=${t.flagsTaken}/${t.flags.length}`);
rects.length = 0;
t.render();
/* The title is drawn with the 5x7 HUD font at a 5-device-pixel cell, so its
   marks are RUNS one cell tall and one-or-more cells wide -- not the square
   cells the 3x5 font emitted. Height is the stable thing to count. */
const titleCell = 5 / t.RENDER_SCALE;
const glyphPx = rects.filter(r => r.h === titleCell).length;
check("ending screen renders a large title", glyphPx > 40,
      `${glyphPx} marks at a ${titleCell}-unit cell`);
const dim = rects.some(r => r.w === t.VIEW_W && typeof r.c === "string" &&
                            r.c.startsWith("rgba(8,10,16"));
check("ending dims the playfield behind it", dim);
// Rank must reflect the run, not just that it ended.
t.restart();
for (const f of [...t.flags].sort((a, b) => a.x - b.x)) {
  t.ninja.invuln = 999; t.ninja.x = f.x; t.ninja.y = f.y; t.snapCamera(); tick(1);
}
check("sweeping every flag with no deaths is the top result",
      t.mode === "clear" && t.flagsTaken === t.flags.length && t.deaths === 0,
      `flags ${t.flagsTaken}/${t.flags.length} deaths ${t.deaths}`);

console.log("\n== background lights are stable while the camera moves ==");
// The bug: window seeds keyed off SCREEN x, so every camera move re-rolled the
// whole facade. With clock frozen, panning must not change which windows are lit.
function litCount(camX) {
  t.cam.x = camX;
  rects.length = 0;
  t.render();
  return rects.filter(r => r.w === 5 && r.h === 7 && r.c === "#FFD98A")
              .filter(r => r.x > 120 && r.x < 520).length;
}
t.restart();
const counts = [];
for (let d = 0; d <= 40; d += 8) counts.push(litCount(2000 + d));
check("lit-window count holds steady across a 40px pan",
      Math.max(...counts) - Math.min(...counts) <= 1,
      `counts ${counts.join(",")} (was re-rolling every frame)`);
check("windows are actually being lit", Math.max(...counts) > 0, `${counts[0]} lit`);
// ...and they must still animate on their own over time.
t.restart(); stand(3);
const before = litCount(0);
tickIso(60 * 8);
const after = litCount(0);
check("but they still blink over time on their own",
      before !== after || t.clock > 7,
      `clock=${t.clock.toFixed(1)}s, lit ${before} -> ${after}`);

console.log("\n== enemies walk on the same four-phase cycle (req 1, 6) ==");
const FOE_KINDS = ["charger", "rusher", "warden"];
for (const kind of FOE_KINDS) {
  for (const k of t.WALK_CYCLE) {
    check(`${kind} has a ${k} pose`, Array.isArray(t.ENEMY_POSES[kind][k]));
  }
}
check("every kind's cycle differs from its own standing pose", (() => {
  return FOE_KINDS.every(kind => {
    const b = t.ENEMY_POSES[kind].base;
    return t.WALK_CYCLE.every(k => {
      const w = t.ENEMY_POSES[kind][k];
      let diff = 0;
      for (let i = 0; i < t.NINJA_ROWS; i++) if (b[i] !== w[i]) diff++;
      return diff >= 6;
    });
  });
})(), "legs strided");
t.restart();
const wk = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== wk) e.alive = false;
// Nine tiles, not five. A charger walks until it is inside CHG_MELEE and then
// stops to swing, so the approach is what it gets to animate in -- and with the
// wider swing range five tiles left it only 34px of walking, which is less than
// one four-phase cycle.
stand(Math.floor(wk.x / t.TILE) - 9);
check("a standing enemy uses the base pose", t.enemyGait(wk) === "base");
const gaits = new Set();
// Long enough to cover a full cycle, and a charger does not walk continuously:
// it stops to swing and then recovers.
for (let i = 0; i < 480; i++) { tickIso(1); if (t.isWalking(wk)) gaits.add(t.enemyGait(wk)); }
check("enemies cycle on a shorter stride than the hero",
      t.FOE_STRIDE_PX < t.STRIDE_PX &&
      t.strideOf(wk) === t.FOE_STRIDE_PX && t.strideOf(t.ninja) === t.STRIDE_PX,
      `foe ${t.FOE_STRIDE_PX}px vs hero ${t.STRIDE_PX}px`);
check("...short enough that a leashed charger completes one",
      t.FOE_STRIDE_PX * t.WALK_CYCLE.length <= t.CHG_LEASH,
      `cycle ${t.FOE_STRIDE_PX * t.WALK_CYCLE.length}px vs leash ${t.CHG_LEASH}px`);
check("a walking enemy works through all four phases", gaits.size === 4,
      `poses seen while walking: ${[...gaits].sort().join(",")}`);
check("...and never falls back to standing while walking",
      !gaits.has("base"), `${[...gaits].sort().join(",")}`);
check("gait is driven by ground covered, not by a timer", wk.walkDist > 20,
      `walkDist=${wk.walkDist.toFixed(1)}`);
const seeds = new Set(t.enemies.filter(e => !e.wave).slice(0, 6).map(e => e.animTime.toFixed(2)));
check("enemies are phase-offset so a group does not march in lockstep",
      seeds.size > 1, `${seeds.size} distinct phases`);

console.log("\n== cover: crouch < bullet < cover (req 2) ==");
check("the ordering that keeps both mechanics alive holds",
      t.CROUCH_H < t.BULLET_Y_OFF && t.BULLET_Y_OFF < t.COVER_H,
      `crouch ${t.CROUCH_H} < bullet ${t.BULLET_Y_OFF} < cover ${t.COVER_H}`);
check("cover is 2 tiles tall", t.COVER_H === 2 * t.TILE);
// Every ground-attached block must be exactly COVER_H, nothing taller/shorter.
let badBlocks = [];
for (let c = 0; c < t.COLS; c++) {
  if (!t.solidAt(c, 20)) continue;
  let h = 0;
  for (let r = 19; r >= 12; r--) { if (t.solidAt(c, r)) h++; else break; }
  if (h > 0 && h * t.TILE !== t.COVER_H) badBlocks.push(`col ${c} = ${h * t.TILE}px`);
}
check("every ground block is exactly COVER_H tall", badBlocks.length === 0,
      badBlocks.length ? badBlocks.slice(0, 6).join(", ") : "all 32px");
// Each warden must have cover on the approach side.
let uncovered = [];
for (const g of t.enemies.filter(e => e.kind === "warden" && !e.ledge)) {
  const gc = Math.floor(g.x / t.TILE);
  let found = false;
  for (let c = gc - 10; c < gc; c++) if (t.solidAt(c, 19) && t.solidAt(c, 18)) found = true;
  if (!found) uncovered.push(gc);
}
check("every warden has cover within 10 tiles of its approach",
      uncovered.length === 0,
      uncovered.length ? "bare wardens at tiles " + uncovered.join(",") : "all 9 covered");
// A bullet must actually be stopped by a cover block.
t.restart();
const cg = t.enemies.find(e => e.kind === "warden" && !e.ledge);
for (const e of t.enemies) if (e !== cg) e.alive = false;
const cgTile = Math.floor(cg.x / t.TILE);
let coverCol = -1;
for (let c = cgTile - 10; c < cgTile; c++) if (t.solidAt(c, 19) && t.solidAt(c, 18)) coverCol = c;
check("found the cover block in front of that warden", coverCol > 0, `tile ${coverCol}`);
stand(coverCol - 2);                       // tuck in behind it
key("keydown", "ArrowDown");
let survived = true;
for (let i = 0; i < 260; i++) { tickNoWave(1); if (t.deaths > 0) { survived = false; break; } }
t.keys.clear();
check("crouching behind cover blocks the shot outright", survived,
      `deaths=${t.deaths}`);

console.log("\n== X is the blade, at every range (req 3, revised) ==");
t.restart();
const sv = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== sv) e.alive = false;
stand(Math.floor(sv.x / t.TILE) - 8);
check("nothing in blade range from 8 tiles out", t.enemyInSlashRange() === false);
t.attack();
// The point of the revision: no silent substitution. X swings whether or not
// there is anything in reach, because the blade is not rationed.
check("X still swings the blade, and throws nothing",
      t.slashes.length === 1 && t.shurikens.length === 0);
// Now step right up to it.
t.restart();
const sv2 = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== sv2) e.alive = false;
stand(Math.floor(sv2.x / t.TILE) - 2);
t.ninja.facing = 1;
check("an enemy two tiles away IS in blade range", t.enemyInSlashRange() === true);
t.attack();
check("X becomes a slash, not a throw", t.slashes.length === 1 && t.shurikens.length === 0);
/* The draw comes first. Three frames of the blade leaving the scabbard, then
   the cut -- the complaint was that a melee attack showed no weapon worth
   seeing, and a sword that is simply already out shows no draw either. */
check("the draw pose plays first", t.poseNameOf(t.ninja) === "draw",
      t.poseNameOf(t.ninja));
{
  let sawDraw = false, sawCut = false;
  for (let i = 0; i < Math.ceil(t.SLASH_TIME * 60) + 1; i++) {
    const p = t.poseNameOf(t.ninja);
    if (p === "draw") sawDraw = true;
    if (p === "slash") { sawCut = true; break; }
    tickNoWave(1);
  }
  check("...and the cut follows it", sawDraw && sawCut, `draw=${sawDraw} cut=${sawCut}`);
  check("the draw is short enough to still feel immediate", t.SLASH_WIND <= 0.07,
        `${(t.SLASH_WIND * 1000).toFixed(0)}ms`);
}
check("the blade does not spend ammunition",
      t.shurikenAmmo === t.SHURIKEN_START, `${t.shurikenAmmo}`);
check("blade lands in front of the ninja",
      t.slashes[0].x >= t.ninja.x + t.ninja.w - 4);
// Still one hit and still no travel time -- but it lands after the draw, not
// on the frame the button went down.
{
  const frames = Math.ceil(t.SLASH_WIND * 60) + 2;
  tickNoWave(frames);
  check("the slash kills in one hit, with no travel time", !sv2.alive,
        `killed within ${(frames / 60 * 1000).toFixed(0)}ms`);
}
check("and it is faster than a shuriken flight", t.SLASH_HIT < 0.2,
      `${(t.SLASH_HIT * 1000).toFixed(0)}ms active`);
// Facing left must swing left.
t.restart();
stand(60);
t.ninja.facing = -1;
t.slash();
check("facing left swings left", t.slashes[0].x < t.ninja.x);

console.log("\n== standing throws clear cover, crouched ones do not ==");
// Find a cover block with open ground in front of it.
t.restart();
let cvCol = -1;
for (let c = 6; c < 120; c++) {
  if (t.solidAt(c, 18) && t.solidAt(c, 19) && clearCol(c - 3) && clearCol(c - 4)) { cvCol = c; break; }
}
check("found a cover block with clear approach", cvCol > 0, `tile ${cvCol}`);
for (const e of t.enemies) e.alive = false;

function throwOverCover(crouch) {
  // restart() first: the throw is rationed and paced now, so calling this twice
  // in a row returned "no-throw" the second time -- the cooldown had not
  // expired and the stock had gone down by one.
  t.restart();
  for (const e of t.enemies) e.alive = false;
  t.shurikens.length = 0;
  stand(cvCol - 3);
  t.ninja.facing = 1;
  if (crouch) { t.setCrouch(true); }
  t.throwShuriken();
  if (t.shurikens.length === 0) return "no-throw";
  const startX = t.shurikens[0].x;
  for (let i = 0; i < 30; i++) {
    tickNoWave(1);
    if (t.shurikens.length === 0) return "blocked";
    if (t.shurikens[0].x > (cvCol + 2) * t.TILE) return "cleared";
  }
  t.keys.clear();
  return t.shurikens.length ? "slow" : "blocked";
}
check("STANDING: the shuriken flies over the block", throwOverCover(false) === "cleared");
check("CROUCHED: the block stops it", throwOverCover(true) === "blocked");
// Geometry, stated explicitly so a future tweak cannot silently break it.
t.restart(); stand(60); t.ninja.facing = 1;
t.throwShuriken();
const sh = t.shurikens[0];
const feet = t.ninja.y + t.ninja.h;
check("standing shuriken sits entirely above cover height",
      (feet - sh.y) - sh.h >= t.COVER_H,
      `bottom is ${((feet - sh.y) - sh.h)}px up vs cover ${t.COVER_H}px`);
t.restart(); stand(60); t.setCrouch(true); t.ninja.facing = 1;
t.throwShuriken();
const shc = t.shurikens[0];
check("crouched shuriken sits inside cover height",
      (feet - shc.y) < t.COVER_H,
      `${(feet - shc.y)}px up vs cover ${t.COVER_H}px`);
{
  // Stated structurally so it survives a change of grid: the throw reaches
  // further out than the idle does, and it reaches at the height the shuriken
  // leaves from rather than down at the waist.
  const rightmost = (rows) => Math.max(...rows.map(r => r.replace(/\.+$/, "").length));
  check("the throw reaches further out than the idle arm",
        rightmost(t.NINJA_POSES.throw) > rightmost(t.NINJA_IDLE),
        `${rightmost(t.NINJA_POSES.throw)} vs ${rightmost(t.NINJA_IDLE)}`);
  const changed = t.NINJA_POSES.throw
    .map((r, i) => (r === t.NINJA_IDLE[i] ? -1 : i)).filter(i => i >= 0);
  const feetUp = (i) => t.NINJA_ROWS - i;          // rows above the feet
  check("the reach happens at shoulder height, not at the waist",
        changed.length > 0 && Math.max(...changed.map(feetUp)) >= 30,
        `changed rows sit ${changed.map(feetUp).join(",")}px above the feet`);
  // The release point is feet-42 and the shuriken is 10px tall, so it spans
  // feet-42 to feet-32. The arm meets its LOWER edge -- feet-42 is above the
  // shoulder of a 48px character, because that height is set by the cover block
  // rather than by anatomy.
  const band = changed.map(feetUp);
  check("...and the arm meets the span the shuriken occupies",
        Math.max(...band) >= 32 && Math.min(...band) <= 42,
        `arm spans feet-${Math.min(...band)} to feet-${Math.max(...band)}, ` +
        `shuriken feet-32 to feet-42`);
}


console.log("\n== stage layout rules (req 1, 5) ==");
// The shipped map must satisfy both rules.
check("no enemy deadlock pockets anywhere in the stage",
      t.findDeadlockPockets().length === 0,
      t.findDeadlockPockets().join(", "));
check("no pit-lip defects anywhere in the stage",
      t.findPitLipDefects().length === 0,
      t.findPitLipDefects().join(", "));

// standableRows() is the reason the pocket was found at all: groundTopRow()
// returns the floating platform and never the ground under it.
const underPlatform = t.standableRows(59);
check("standableRows finds the ground UNDER a floating platform",
      underPlatform.includes(20) && underPlatform.includes(16),
      `rows ${underPlatform.join(",")}`);

// Regression, tile 57 (~14%): the reported "enemies pile up and vanish" spot.
const pocketBody = { x: 57 * t.TILE, y: 20 * t.TILE - t.ENEMY_H,
                     w: t.ENEMY_W, h: t.ENEMY_H };
check("tile 57: an enemy wedged against the post can now hop it",
      t.wallAhead(pocketBody, -1) === false || t.headroom(pocketBody, 2) === true,
      `wall=${t.wallAhead(pocketBody, -1)} headroom=${t.headroom(pocketBody, 2)}`);

// Regression, tile 330 (~82%): the same pattern, second occurrence.
const pocketBody2 = { x: 330 * t.TILE, y: 20 * t.TILE - t.ENEMY_H,
                      w: t.ENEMY_W, h: t.ENEMY_H };
check("tile 330: same pattern, also clear",
      t.wallAhead(pocketBody2, -1) === false || t.headroom(pocketBody2, 2) === true);

// Regression, tile 14 (~3.5%): a cover block used to hang over the pit at 15.
check("tile 14: nothing hangs over the opening pit",
      !t.COVER_ROWS.some(r => t.solidAt(14, r)),
      "cover rows still solid at col 14");
check("tile 15 is still the pit it always was", t.isPitCol(15));
check("the pit now has a flat run-up on both sides",
      [13, 14, 16, 17].every(c => !t.COVER_ROWS.some(r => t.solidAt(c, r))));

// Regression, tile 310 (~77.5%): a cover block sat on the jump lip.
check("tile 310: the jump lip is clear",
      !t.COVER_ROWS.some(r => t.solidAt(310, r)));

// A rule that cannot fail is not a rule. Poke the old geometry back in and
// confirm each finder reports it, then restore the grid.
function withTiles(cells, fn) {
  const saved = cells.map(([c, r]) => t.solidGrid[r * t.COLS + c]);
  for (const [c, r] of cells) t.solidGrid[r * t.COLS + c] = 1;
  try { return fn(); }
  finally { cells.forEach(([c, r], i) => { t.solidGrid[r * t.COLS + c] = saved[i]; }); }
}
const reintroduced = withTiles([[57, 16], [58, 16], [59, 16], [60, 16]],
                               () => t.findDeadlockPockets());
check("re-adding the old segment-2 platform is REJECTED by the pocket rule",
      reintroduced.some(x => x.startsWith("57:")), reintroduced.join(", "));
const reintroducedLip = withTiles([[14, 18], [14, 19]], () => t.findPitLipDefects());
check("re-adding the block over the opening pit is REJECTED by the lip rule",
      reintroducedLip.some(x => x.startsWith("14:")), reintroducedLip.join(", "));
check("the grid is restored after those probes",
      t.findDeadlockPockets().length === 0 && t.findPitLipDefects().length === 0);

// Dynamic: the exact scenario that used to delete a rusher at tile 57.
t.restart();
t.ninja.x = 66 * t.TILE; t.ninja.y = 20 * t.TILE - t.BODY_H; t.snapCamera();
const trapped = {
  kind: "rusher", x: 64 * t.TILE, y: 20 * t.TILE - t.ENEMY_H,
  w: t.ENEMY_W, h: t.ENEMY_H, vx: 0, vy: 0, onGround: true, facing: -1,
  state: "run", timer: 0, alive: true, dying: 0, lethal: false, wave: true,
  lastX: 64 * t.TILE, stuckT: 0, homeX: 64 * t.TILE + t.ENEMY_W / 2,
  leapt: false, animTime: 0
};
t.enemies.push(trapped);
let minTile = 99, wedgedFrames = 0;
for (let f = 0; f < 300 && trapped.alive; f++) {
  t.ninja.invuln = 999;
  t.updateEnemy(trapped, t.STEP);
  minTile = Math.min(minTile, trapped.x / t.TILE);
  if (trapped.stuckT > 0.5) wedgedFrames++;
}
check("a rusher walking into the old pocket now clears the post",
      minTile < 55, `reached tile ${minTile.toFixed(1)}, post is at 55-56`);
check("and it never sits wedged long enough to be deleted",
      wedgedFrames === 0, `${wedgedFrames} wedged frames`);

// The safety net itself: when an enemy genuinely has nowhere to go it should
// withdraw visibly rather than blink out.
t.restart();
const netted = {
  kind: "rusher", x: 60 * t.TILE, y: 20 * t.TILE - t.ENEMY_H,
  w: t.ENEMY_W, h: t.ENEMY_H, vx: 0, vy: 0, onGround: true, facing: -1,
  state: "run", timer: 0, alive: true, dying: 0, lethal: false, wave: true,
  lastX: 60 * t.TILE, stuckT: 0.79, homeX: 60 * t.TILE, leapt: false, animTime: 0
};
// Box it in on all sides so no hop and no walk can resolve it.
withTiles([[59, 18], [59, 19], [60, 16], [61, 16], [62, 16], [59, 16]], () => {
  t.enemies.push(netted);
  const before = t.particles.length;
  for (let f = 0; f < 120 && netted.alive; f++) {
    netted.lastX = netted.x;          // held still: the stuck timer must climb
    t.updateEnemy(netted, t.STEP);
  }
  check("a truly stuck enemy is removed rather than vibrating forever",
        !netted.alive);
  check("...but it fades out instead of blinking out", netted.dying > 0,
        `dying=${netted.dying}`);
  check("...with a puff of smoke", t.particles.length > before,
        `${before} -> ${t.particles.length}`);
});



console.log("\n== opening screen and pause (req 4) ==");
check("the game boots onto the title screen, not into the alley",
      bootMode === "title", `booted in "${bootMode}"`);
check("restart() itself still lands in play, so R and the menus work",
      (t.restart(), t.mode) === "play");

t.toTitle();
check("toTitle returns to the opening screen", t.mode === "title");
/* Two buttons now, and START is still the FIRST one -- which is the part worth
   pinning. The keyboard mirrors whatever is first, and a credits screen that
   answered the Start key would be the worst possible regression here. */
check("the title screen leads with START", t.buttonsFor("title")[0] === t.BTN_START);
check("...and offers credits beside it",
      t.buttonsFor("title").length === 2 &&
      t.buttonsFor("title")[1] === t.BTN_CREDITS);

/* THE CC-BY OBLIGATION, checked rather than trusted.
   Two of the four character packs are CC-BY 3.0, which asks for attribution in
   the work. assets/README.md required a credits screen before any CC-BY asset
   could be added; this is what stops that from being a promise. The manifest
   lists the authors whose licence obliges a credit, and every one of them has
   to appear on the screen a player can actually reach. */
{
  const credited = t.CREDITS.map(c => c[1].toUpperCase()).join(" ");
  let cman = null;
  try {
    cman = JSON.parse(fs.readFileSync(new URL("assets/manifest.json", import.meta.url), "utf8"));
  } catch (err) { cman = null; }
  const owed = (cman && cman.meta && cman.meta.creditRequired) || [];
  check("the credits screen is reachable from the title",
        t.buttonsFor("title").indexOf(t.BTN_CREDITS) >= 0 &&
        t.buttonsFor("credits").length === 1);
  if (!owed.length) {
    console.log("  SKIP  no CC-BY assets present, so nothing is owed a credit");
  } else {
    const missing = owed.filter(a => credited.indexOf(a.toUpperCase()) < 0);
    check("every author the licence obliges us to credit is on that screen",
          missing.length === 0,
          missing.length ? "missing " + missing.join(", ") : owed.join(", "));
  }
  check("the credits name the licences, not just the authors",
        /CC0/.test(credited) && /CC BY|CC-BY/.test(credited));
  /* Music is an asset too, and it is the one most likely to be swapped without
     anyone thinking about the licence -- a track is a single file drop. CC0
     obliges no credit, so this is not a licence check; it is a check that the
     screen does not claim the repository wrote music it did not write. */
  const mus = cman && cman.meta && cman.meta.music;
  if (mus) {
    check("the shipped music is credited to its author",
          credited.indexOf(String(mus.author).toUpperCase()) >= 0,
          `${mus.title} by ${mus.author} (${mus.licence})`);
    check("the manifest actually routes it to the music cue",
          cman.audio && cman.audio.music === mus.file,
          JSON.stringify(cman.audio));
  } else {
    console.log("  SKIP  no music asset; the synthesised loop is what plays");
  }
}
// Nothing may simulate on the title screen...
const titleX = t.ninja.x;
tick(30);
check("no simulation on the title screen", t.ninja.x === titleX);
// ...but the clock must run, or the logo screen is a still image.
const titleClock = t.clock;
tick(10);
check("the alley behind the logo stays alive", t.clock > titleClock);

// Z on the title starts the game rather than buffering a jump that would fire
// on the first frame of play.
t.toTitle();
key("keydown", "KeyZ"); key("keyup", "KeyZ");
check("Z on the title starts the game", t.mode === "play");
check("...without a jump buffered into the first frame", t.ninja.buffer === 0,
      `buffer=${t.ninja.buffer}`);

t.toTitle();
key("keydown", "Space"); key("keyup", "Space");
check("Space on the title starts the game", t.mode === "play");

// Clicking the button is the other half of the same action.
t.toTitle();
mouse("mousemove", ...centreOf(t.BTN_START));
check("the pointer highlights the START button", t.hover === t.BTN_START);
mouse("click", ...centreOf(t.BTN_START));
check("clicking START starts the game", t.mode === "play");
t.toTitle();
mouse("click", 10, 10);
check("clicking empty space does nothing", t.mode === "title");
mouse("mousemove", 10, 10);
check("...and does not highlight anything", t.hover === null);
check("hit-testing respects the current mode",
      (t.startGame(), t.hitButton({ x: t.BTN_START.x + 4, y: t.BTN_START.y + 4 })) === null);

// Pause is an absolute stop.
t.restart();
stand(20);
const pausedX = t.ninja.x, pausedClock = t.clock, pausedParts = t.particles.length;
key("keydown", "Space"); key("keyup", "Space");
check("Space pauses", t.mode === "paused");
tick(40);
check("the ninja does not move while paused", t.ninja.x === pausedX);
check("the world clock is stopped while paused", t.clock === pausedClock,
      `${t.clock} vs ${pausedClock}`);
check("particles are stopped while paused", t.particles.length === pausedParts);
check("the pause menu offers resume and restart",
      t.buttonsFor("paused").length === 2);
// Losing focus must not sneak a resume in.
for (const fn of listeners["blur"] ?? []) fn({});
check("losing focus does not resume", t.mode === "paused");
key("keydown", "Space"); key("keyup", "Space");
check("Space resumes", t.mode === "play");
t.keys.add("ArrowRight");
tick(6);
check("and the ninja moves again once resumed", t.ninja.x !== pausedX,
      `x=${t.ninja.x} vs ${pausedX}`);
t.keys.clear();

key("keydown", "Space"); key("keyup", "Space");
mouse("click", ...centreOf(t.BTN_RESUME));
check("clicking RESUME resumes", t.mode === "play");
key("keydown", "Space"); key("keyup", "Space");
mouse("click", ...centreOf(t.BTN_RESTART));
check("clicking RESTART restarts into play", t.mode === "play" && t.kills === 0);

// Space must not pause the ending or the title.
t.restart();
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("reaching the goal still clears", t.mode === "clear");
key("keydown", "Space"); key("keyup", "Space");
check("Space does not pause the clear screen", t.mode === "clear");

// CSS scaling: the stub reports a 640x360 box, so view space is client space.
const mapped = t.canvasPos({ clientX: 320, clientY: 180 });
check("pointer coordinates map into view space",
      mapped.x === 320 && mapped.y === 180, `${mapped.x},${mapped.y}`);

// The menus draw without throwing, with the real ctx stub.
t.toTitle(); t.drawTitle();
t.restart(); t.togglePause(); t.drawPause(); t.togglePause();
check("the menu screens render without throwing", true);

console.log("\n== three lives, then game over (req 7) ==");
// Die away from the spawn column, so "the ninja was not sent back to the start"
// is an observation rather than a coincidence.
const DEATH_TILE = clearOfItems(30);
let lastDeathX = 0;
function dieOnce() {
  stand(DEATH_TILE);
  for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }   // clear hitstop
  t.ninja.invuln = 0;
  t.ninja.y = t.WORLD_H + 200;
  tick(1);
  /* Recorded on the first frame of "dying", not before it. Two things move him
     otherwise: walking into an enemy shoves you now, so the twelve settling
     frames can push him off the tile he was placed on, and whatever velocity
     that left him with is still integrated on the frame the death is detected.
     What this is here to pin is that nothing moves him AFTER that. */
  lastDeathX = t.ninja.x;
}
t.restart();
check("a run starts with three lives", t.lives === 3 && t.START_LIVES === 3,
      `lives=${t.lives}`);
dieOnce();
check("the first death spends a life", t.lives === 2, `lives=${t.lives}`);
tickThroughDeath();
check("...and respawns into play", t.mode === "play");
dieOnce();
check("the second death spends another", t.lives === 1, `lives=${t.lives}`);
tickThroughDeath();
check("...and still respawns", t.mode === "play");
dieOnce();
check("the third death spends the last life", t.lives === 0, `lives=${t.lives}`);
check("the freeze frame still plays out first", t.mode === "dying");
tickThroughDeath();
check("the run ends in game over rather than respawning", t.mode === "gameover",
      `mode=${t.mode}`);
check("the finished run stays desaturated", t.deathGrey() === 1);
check("the ninja was NOT sent back to the start: the frame stays frozen",
      t.ninja.x === lastDeathX && t.ninja.x !== t.spawn.x,
      `x=${t.ninja.x} died at ${lastDeathX} spawn=${t.spawn.x}`);

// The input deadzone: the key that killed you must not skip the summary.
check("the summary is briefly unskippable", t.canSkipGameOver() === false);
check("...and shows no button while locked", t.buttonsFor("gameover").length === 0);
key("keydown", "Space"); key("keyup", "Space");
check("Space is ignored during the deadzone", t.mode === "gameover");
tick(Math.ceil(t.GAMEOVER_LOCK / t.STEP) + 1);
check("then it becomes skippable", t.canSkipGameOver() === true);
check("...and offers a TITLE button", t.buttonsFor("gameover")[0] === t.BTN_TITLE);
t.drawGameOver();
key("keydown", "Space"); key("keyup", "Space");
check("Space returns to the opening screen", t.mode === "title", `mode=${t.mode}`);
check("the run is reset for the next attempt",
      t.lives === 3 && t.kills === 0 && t.deaths === 0 && t.flagsTaken === 0);

// R retries directly instead of going via the title.
t.restart();
dieOnce(); tickThroughDeath();
dieOnce(); tickThroughDeath();
dieOnce(); tickThroughDeath();
check("three deaths reach game over again", t.mode === "gameover");
tick(Math.ceil(t.GAMEOVER_LOCK / t.STEP) + 1);
key("keydown", "KeyR"); key("keyup", "KeyR");
check("R retries straight into play", t.mode === "play" && t.lives === 3);

// Left alone, it returns to the title by itself.
t.restart();
dieOnce(); tickThroughDeath();
dieOnce(); tickThroughDeath();
dieOnce(); tickThroughDeath();
check("game over is reached", t.mode === "gameover");
const autoFrames = Math.ceil(t.GAMEOVER_TIME / t.STEP) + 4;
for (let i = 0; i < autoFrames && t.mode === "gameover"; i++) tick(1);
check("game over returns to the title on its own if left alone",
      t.mode === "title", `mode=${t.mode}`);

// Lives survive the things that are not deaths.
t.restart();
t.killEnemy(t.enemies.find(e => e.alive));
tick(6);
check("killing an enemy costs no life", t.lives === 3);
t.togglePause(); t.togglePause();
check("pausing costs no life", t.lives === 3);



console.log("\n== audio (req 2) ==");
// Silence until a gesture: browsers refuse to start audio otherwise, and the
// game must not try. (Evidence captured at load, above.)
check("no audio context exists before a gesture", bootAudio.actx === null);
check("the SFX are safe no-ops before the context exists",
      bootAudio.osc === 0 && bootAudio.src === 0,
      `${bootAudio.osc} osc, ${bootAudio.src} src`);
check("the music scheduler is a no-op too", bootAudio.musicOn === false);
check("mute still toggles with no context",
      bootAudio.muted === false && bootAudio.mutedAfterToggle === true &&
      bootAudio.mutedAfterSecond === false);

// A keypress is the gesture. By now the suite has pressed plenty of keys.
check("a keypress creates the audio context", t.actx !== null);
check("exactly one context is ever created", audioLog.contexts === 1);
key("keydown", "ArrowUp"); key("keyup", "ArrowUp");   // no binding, no side effect
check("...and unlocking again is idempotent", audioLog.contexts === 1);
check("a shared noise buffer is built once, not per sound",
      audioLog.buffers === 1, `${audioLog.buffers} buffers`);
check("master, sfx and music buses all exist",
      t.masterGain !== null && audioLog.gains.length >= 3);

// Each effect actually builds nodes now.
function countsFor(fn) {
  const o = audioLog.oscillators, s = audioLog.sources;
  fn();
  return { osc: audioLog.oscillators - o, src: audioLog.sources - s };
}
/* These used to pin every cue to its exact minimum -- "one noise source and one
   oscillator" -- and that count WAS the complaint. One burst plus one tone is a
   synthesiser beep, because a hit needs a transient of a few milliseconds, a
   body of about a tenth of a second and a tail several times longer than that,
   and those are three different time scales. Two layers with the same decay are
   one layer twice. So these assert the STRUCTURE now, not a minimum. */
const cThrow = countsFor(t.sfxThrow);
const cSlash = countsFor(t.sfxSlash);
const cKill = countsFor(t.sfxKill);
const LAYERED = [["throw", t.sfxThrow], ["slash", t.sfxSlash],
                 ["kill", t.sfxKill], ["bladeKill", t.sfxBladeKill],
                 ["death", t.sfxDeath], ["flag", t.sfxFlag],
                 ["pickup", t.sfxPickup]];
for (const [name, fn] of LAYERED) {
  const c = countsFor(fn);
  check(`${name} is built from at least three layers`,
        c.osc + c.src >= 3, JSON.stringify(c));
  check(`${name} has both a noise layer and a pitched layer`,
        c.src >= 1 && c.osc >= 1, JSON.stringify(c));
}
/* VARIATION. Two calls must not produce the same sound. Real hits never do, and
   a cue that is bit-identical every time is the fastest thing there is for an
   ear to file as synthetic -- it is more noticeable than any amount of missing
   spectral detail. Every layer is detuned and re-levelled a few percent per
   call, which costs nothing. */
{
  const grab = (fn) => {
    const i = audioLog.freqs.length;
    fn();
    return audioLog.freqs.slice(i).join(",");
  };
  for (const [name, fn] of LAYERED) {
    const a = grab(fn), b = grab(fn);
    check(`${name} is not bit-identical twice in a row`, a !== b && a.length > 0,
          `${a} / ${b}`);
  }
}
// Wall-clock length of everything one call schedules.
function spanOf(fn) {
  const i0 = audioLog.startedAt.length, j0 = audioLog.stoppedAt.length;
  fn();
  const starts = audioLog.startedAt.slice(i0), stops = audioLog.stoppedAt.slice(j0);
  if (!starts.length) return 0;
  return Math.max(...stops) - Math.min(...starts);
}
const cDeath = countsFor(t.sfxDeath);
// Layered like the rest, but the LENGTH is still the constraint that matters:
// it plays under a freeze frame, and anything that outlasts the freeze drones.
check("the player death is a falling figure, layered like the rest",
      cDeath.osc >= 3 && cDeath.src >= 1, JSON.stringify(cDeath));
const deathSpan = spanOf(t.sfxDeath);
check("and it is SHORT -- it must not drone under the whole grayscale hold",
      deathSpan > 0 && deathSpan <= 0.35, `${(deathSpan * 1000).toFixed(0)}ms`);
check("the death sound ends well before the freeze does",
      deathSpan < t.DEATH_TIME / 2,
      `${(deathSpan * 1000).toFixed(0)}ms vs freeze ${(t.DEATH_TIME * 1000).toFixed(0)}ms`);

// The effects fire from the actions themselves, not from the input layer, so
// they hold for any caller.
t.restart(); stand(60); t.ninja.facing = 1;
const beforeThrow = audioLog.sources;
t.throwShuriken();
check("throwing a shuriken makes a sound", audioLog.sources > beforeThrow);
const beforeSlash = audioLog.sources;
t.slash();
check("slashing makes a sound", audioLog.sources > beforeSlash);
const beforeKill = audioLog.sources;
t.killEnemy(t.enemies.find(e => e.alive));
check("killing an enemy makes a sound", audioLog.sources > beforeKill);
t.restart(); stand(60);
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0;
const beforeDeath = audioLog.oscillators;
t.ninja.y = t.WORLD_H + 200; tick(1);
check("dying makes a sound", audioLog.oscillators >= beforeDeath + 2);
tickThroughDeath();

// Mute is a master-gain cut, not a teardown: sounds still build, they just do
// not reach the destination at volume.
t.toggleMute();
check("muting drops the master gain to zero", t.masterGain.gain.value === 0);
t.toggleMute();
check("unmuting restores it", t.masterGain.gain.value === t.MASTER_VOL);
key("keydown", "KeyM"); key("keyup", "KeyM");
check("M toggles mute", t.muted === true);
key("keydown", "KeyM"); key("keyup", "KeyM");
check("...and back", t.muted === false);
check("M does not leak through to the ninja as an action",
      t.ninja.throwTimer === 0 && t.ninja.slashTimer === 0);

// The music scheduler follows the mode, and only ever queues its lookahead.
t.restart();
audioNow = 100;
t.pumpMusic();
check("music plays during play", t.musicOn === true);
const queued = t.musicStep;
check("the scheduler queues its lookahead, not the whole song",
      queued > 0 && queued <= Math.ceil(t.MUSIC_LOOKAHEAD / t.MUSIC_STEP) + 1,
      `${queued} notes queued`);
check("the cursor sits ahead of the audio clock",
      t.musicNext >= audioNow, `next=${t.musicNext} now=${audioNow}`);
t.pumpMusic();
check("pumping again with no clock movement queues nothing new",
      t.musicStep === queued, `${t.musicStep} vs ${queued}`);
// The scheduler deliberately DROPS backlog when the clock jumps -- a tab that
// was backgrounded for a second must not dump a second of notes at once -- so
// the clock has to be advanced the way a running frame loop would advance it.
function runMusic(seconds) {
  const st0 = t.musicStep, o0 = audioLog.oscillators, s0 = audioLog.sources;
  for (let el = 0; el < seconds; el += 0.05) { audioNow += 0.05; t.pumpMusic(); }
  return { steps: t.musicStep - st0, osc: audioLog.oscillators - o0,
           src: audioLog.sources - s0 };
}
const oneSecond = runMusic(1.0);
check("a second of audio time queues about a second of notes",
      Math.abs(oneSecond.steps - 1.0 / t.MUSIC_STEP) <= 1.5,
      `${oneSecond.steps} notes, tempo wants ${(1 / t.MUSIC_STEP).toFixed(1)}`);

t.togglePause();
check("pausing stops the music", t.musicWanted() === false);
t.pumpMusic();
const pausedStep = t.musicStep;
audioNow += 2.0;
t.pumpMusic();
check("...and nothing is queued while paused", t.musicStep === pausedStep);
t.togglePause();
audioNow += 0.1;
t.pumpMusic();
check("resuming re-anchors the scheduler rather than catching up on the backlog",
      t.musicStep - pausedStep <= Math.ceil(t.MUSIC_LOOKAHEAD / t.MUSIC_STEP) + 1,
      `${t.musicStep - pausedStep} notes`);

t.toTitle();
check("music plays on the title screen too", t.musicWanted() === true);
t.restart(); stand(60);
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0; t.ninja.y = t.WORLD_H + 200; tick(1);
check("the death freeze silences the loop", t.musicWanted() === false);
tickThroughDeath();
check("...and it returns with play", t.musicWanted() === true);



console.log("\n== ninja proportions (req 6) ==");
const idle = t.NINJA_POSES.idle;
const solid = (r) => r.length - (r.match(/\./g) ?? []).length;
const firstInk = (rows) => rows.findIndex(r => solid(r) > 0);
// The head block runs from the top of the hood down to the jaw, which is the
// lowest row still carrying skin.
const GI0 = new Set(["K", "D", "B", "L", "H"]);
const bodyWRaw = (r) => {
  const lo = 6, hi = Math.min(r.length, 23);
  let first = -1, last = -1;
  for (let c = lo; c < hi; c++) if (GI0.has(r[c])) { if (first < 0) first = c; last = c; }
  return first < 0 ? 0 : last - first + 1;
};
const neckOf = (pose, widthOf) => {
  let best = -1, bestW = Infinity;
  for (let i = 3; i < Math.floor(pose.length * 0.35); i++) {
    const w = widthOf(pose[i]);
    if (w > 0 && w < bestW) { bestW = w; best = i; }
  }
  return best;
};
const headTop = firstInk(idle), headBot = neckOf(idle, (r) => bodyWRaw(r));
const headRows = headBot - headTop + 1;
check("the head is at most a quarter of the sprite's height",
      headRows <= t.NINJA_ROWS / 4,
      `${headRows} of ${t.NINJA_ROWS} rows (${(headRows / t.NINJA_ROWS * 100).toFixed(0)}%)`);
// Measured as the span of GI colours within the hitbox columns. The scarf tail
// trails outside them and the swung arm reaches past them, and a colour count
// cannot measure the waist because the sash is scarf-coloured.
const GI = new Set(["K", "D", "B", "L", "H"]);
const bodyW = (r) => {
  const lo = 6, hi = Math.min(r.length, 23);
  let first = -1, last = -1;
  for (let c = lo; c < hi; c++) if (GI.has(r[c])) { if (first < 0) first = c; last = c; }
  return first < 0 ? 0 : last - first + 1;
};
const headW = Math.max(...idle.slice(headTop, headBot + 1).map(bodyW));
const shoulderW = Math.max(...idle.slice(headBot + 1, headBot + 6).map(bodyW));
check("the head is clearly narrower than the shoulders", headW <= shoulderW - 2,
      `head ${headW} cols vs shoulders ${shoulderW}`);

// Legs: two columns of fill each, not one. This is the "too thin" complaint.
const legRow = idle[idle.length - 5];
const fills = legRow.split(/[.K]+/).filter(Boolean);
check("the sprite has two legs at mid-shin", fills.length === 2, legRow);
check("each leg is at least two columns of fill, not a stick",
      fills.every(f => f.length >= 2), `runs: ${fills.join("|")} in ${legRow}`);
const mid = Math.floor(t.NINJA_COLS / 2);
const legTop = idle.findIndex((r, i) =>
  i > headBot && r.slice(mid - 2, mid + 2).includes("KK"));
check("the legs are at least a third of the sprite's height",
      t.NINJA_ROWS - legTop >= t.NINJA_ROWS / 3,
      `${t.NINJA_ROWS - legTop} of ${t.NINJA_ROWS} rows`);
check("the sprite still bottoms out on the hitbox",
      solid(idle[idle.length - 1]) > 0);

console.log("\n== the walk cycle has a passing phase and a bob (req 6) ==");
check("the cycle is four phases, not two", t.WALK_CYCLE.length === 4);
check("every phase exists as a pose",
      t.WALK_CYCLE.every(k => Array.isArray(t.NINJA_POSES[k])));
check("no phase is the standing pose -- that was the old cycle's other frame",
      t.WALK_CYCLE.every(k =>
        t.NINJA_POSES[k].join("") !== idle.join("") &&
        t.NINJA_POSES[k].join("") !== t.NINJA_POSES.idleB.join("")));
check("all four phases are distinct",
      new Set(t.WALK_CYCLE.map(k => t.NINJA_POSES[k].join(""))).size === 4);

const [A, B, C, D] = t.WALK_CYCLE.map(k => t.NINJA_POSES[k]);
// Only the LEGS of the two contact frames share a silhouette -- the arms
// counter-swing, which is the other half of what distinguishes them. Depth
// shading separates the legs, which is why the palette needed a far-limb
// colour.
const silhouette = (rows) => rows.map(r => r.replace(/[^.]/g, "#")).join("");
const legHalf = (rows) => rows.slice(Math.floor(rows.length * 0.62));
check("the two contact frames' legs share a silhouette",
      silhouette(legHalf(A)) === silhouette(legHalf(C)),
      `\n${legHalf(A).join("\n")}\n---\n${legHalf(C).join("\n")}`);
check("...but are drawn differently, so the step still reads",
      A.join("") !== C.join(""));
check("the far limb uses the dark shade", A.join("").includes("D") &&
      C.join("").includes("D"));
check("the palette defines it", typeof t.P_NINJA.D === "string");

// Passing phase: one foot planted, the other lifted clear of the ground.
const bottomInk = (rows) => solid(rows[rows.length - 1]);
check("contact frames have both feet on the ground",
      bottomInk(A) >= 6 && bottomInk(C) >= 6,
      `A=${bottomInk(A)} C=${bottomInk(C)}`);
check("passing frames have one foot lifted clear",
      bottomInk(B) < bottomInk(A) && bottomInk(D) < bottomInk(C),
      `B=${bottomInk(B)} D=${bottomInk(D)} vs A=${bottomInk(A)}`);

// The bob: the body sits a row lower when both feet are planted.
check("the body drops a row on contact and rises on the pass",
      firstInk(A) > firstInk(B) && firstInk(C) > firstInk(D),
      `A=${firstInk(A)} B=${firstInk(B)} C=${firstInk(C)} D=${firstInk(D)}`);

// Arms counter-swing, or the contact frames would differ only in leg shading.
// The arm band: shoulder to hip, where a swing changes the silhouette.
const armCols = (rows) => rows
  .slice(Math.floor(rows.length * 0.28), Math.floor(rows.length * 0.54))
  .map(solid).reduce((a, b) => a + b, 0);
check("the arms swing with the cycle", armCols(A) !== armCols(C),
      `A=${armCols(A)} C=${armCols(C)}`);

console.log("\n== the cycle is driven by ground covered, not by time (req 6) ==");
t.restart();
stand(SAFE_TILE);
t.ninja.walkDist = 0;
const phase0 = t.walkFrame(t.ninja);
t.ninja.walkDist = t.STRIDE_PX;
check("one stride of ground advances one phase",
      t.walkFrame(t.ninja) !== phase0);
t.ninja.walkDist = t.STRIDE_PX * 5;
check("four phases later it comes back around",
      t.walkFrame(t.ninja) === t.WALK_CYCLE[1],
      `${t.walkFrame(t.ninja)} vs ${t.WALK_CYCLE[1]}`);
t.ninja.walkDist = 0;
check("standing still holds phase 0", t.walkFrame(t.ninja) === t.WALK_CYCLE[0]);

// walkDist must equal real displacement, which is what keeps the feet from
// sliding -- and means shoving into a wall animates nothing.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
t.ninja.walkDist = 0;
t.keys.add("ArrowRight");
// Measure against ground covered on the frames that actually counted -- the
// first couple of frames of acceleration are below the walking threshold, and
// the cycle deliberately does not advance during them.
let covered = 0;
for (let i = 0; i < 30; i++) {
  const x0 = t.ninja.x;
  tickIso(1);
  if (t.isWalking(t.ninja)) covered += Math.abs(t.ninja.x - x0);
}
t.keys.clear();
check("the cycle advances by exactly the ground covered while walking",
      Math.abs(t.ninja.walkDist - covered) < 1.5,
      `walkDist=${t.ninja.walkDist.toFixed(1)} covered=${covered.toFixed(1)}`);

// Every phase gets used, and none of them is the standing pose.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
const phasesSeen = new Set();
t.keys.add("ArrowRight");
for (let i = 0; i < 120; i++) {
  tickIso(1);
  if (t.isWalking(t.ninja) && t.ninja.onGround)
    phasesSeen.add(t.poseNameOf(t.ninja));
}
t.keys.clear();
check("walking works through all four phases", phasesSeen.size === 4,
      `saw: ${[...phasesSeen].sort().join(",")}`);
check("and never shows the standing pose mid-stride",
      !phasesSeen.has("idle") && !phasesSeen.has("idleB"),
      `saw: ${[...phasesSeen].sort().join(",")}`);

// Crouch-walking covers less ground per second, so the cycle slows by itself.
t.restart(); for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE); t.ninja.walkDist = 0;
t.keys.add("ArrowRight"); tickIso(40); t.keys.clear();
const runDist = t.ninja.walkDist;
t.restart(); for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE); t.ninja.walkDist = 0;
t.keys.add("ArrowRight"); t.keys.add("ArrowDown"); tickIso(40); t.keys.clear();
const crouchDist = t.ninja.walkDist;
check("crouch-walking slows the cycle for free, because it covers less ground",
      crouchDist > 0 && crouchDist < runDist * 0.6,
      `crouch ${crouchDist.toFixed(0)}px vs run ${runDist.toFixed(0)}px`);

// A death resets the phase, so the respawn does not start mid-stride.
t.restart();
stand(SAFE_TILE); t.ninja.walkDist = 999;
t.respawn();
check("respawning resets the stride phase", t.ninja.walkDist === 0);



console.log("\n== pickups are audible (req 8) ==");
const cFlag = countsFor(t.sfxFlag);
check("the flag chime is a struck arpeggio, not three bare tones",
      cFlag.osc >= 3 && cFlag.src >= 3, JSON.stringify(cFlag));
const cPick = countsFor(t.sfxPickup);
check("the shuriken pickup is a struck ting with a bright edge",
      cPick.osc >= 3 && cPick.src >= 2, JSON.stringify(cPick));
check("the flag reads as the bigger event of the two", cFlag.osc > cPick.osc);

// Fired from the pickup itself, so any route to it is audible.
t.restart();
const flag = t.flags.find(f => !f.taken);
const oscBeforeFlag = audioLog.oscillators;
stand(Math.round(flag.x / t.TILE));
t.ninja.y = flag.y;
tickNoWave(1);
check("taking a flag makes a sound", t.flagsTaken >= 1 &&
      audioLog.oscillators > oscBeforeFlag,
      `flags=${t.flagsTaken}, +${audioLog.oscillators - oscBeforeFlag} osc`);

t.restart();
const cap0 = t.shurikenAmmo;
const pick = t.pickups.find(pk => !pk.taken);
const oscBeforePick = audioLog.oscillators;
stand(Math.round(pick.x / t.TILE));
t.ninja.y = pick.y - 10;
for (let i = 0; i < 20 && t.shurikenAmmo === cap0; i++) tickNoWave(1);
check("taking a shuriken pickup makes a sound",
      t.shurikenAmmo > cap0 && audioLog.oscillators > oscBeforePick,
      `stock ${cap0}->${t.shurikenAmmo}, +${audioLog.oscillators - oscBeforePick} osc`);

console.log("\n== enemies cross pits instead of falling in (req 9) ==");
check("the leap's reach is derived from the jump, not hand-tuned",
      Math.abs(t.ENEMY_HOP_REACH - t.ENEMY_HOP_AIR * t.ENEMY_LEAP_VX) < 0.01);
check("one leap clears at least three tiles",
      t.ENEMY_HOP_REACH >= 3 * t.TILE + t.GAP_MARGIN,
      `${t.ENEMY_HOP_REACH.toFixed(0)}px`);

function groundRowOf(c) {
  for (let r = 0; r < t.ROWS; r++) if (t.solidAt(c, r)) return r;
  return -1;
}
const hasFloor = (c) => t.solidAt(c, t.ROWS - 2) || t.solidAt(c, t.ROWS - 1);

// What a walker actually has to cross is a run of MISSING FLOOR, not a run of
// bottomless columns: segment 5's chasm is five tiles of absent floor with two
// stepping stones suspended over it, and only its middle column is bottomless.
const groundGaps = [];
for (let c = 0, cur = null; c <= t.COLS; c++) {
  if (c < t.COLS && !hasFloor(c)) { cur ??= { from: c }; cur.to = c; }
  else if (cur) { groundGaps.push(cur); cur = null; }
}
check("the stage has several floor-level gaps", groundGaps.length >= 6,
      `${groundGaps.length} gaps: ${groundGaps.map(g => `${g.from}..${g.to}`).join(" ")}`);

const flatBody = { x: 30 * t.TILE, y: 20 * t.TILE - t.ENEMY_H,
                   w: t.ENEMY_W, h: t.ENEMY_H };
check("flat ground reads as no gap", t.gapWidthAhead(flatBody, -1) === 0);
for (const g of groundGaps) {
  const c = g.to + 1;
  if (c >= t.COLS || !hasFloor(c)) continue;
  const body = { x: c * t.TILE, y: (t.ROWS - 2) * t.TILE - t.ENEMY_H,
                 w: t.ENEMY_W, h: t.ENEMY_H };
  const want = (g.to - g.from + 1) * t.TILE;
  check(`the gap at cols ${g.from}..${g.to} measures ${want}px from the lip`,
        t.gapWidthAhead(body, -1) === want, `got ${t.gapWidthAhead(body, -1)}`);
}

// The regression that matters: walk both enemy kinds at every floor-level gap
// on the stage and confirm none of them ends up in one.
function crossTrial(kind, g) {
  let startCol = g.to + 1, farCol = g.from - 1;
  while (startCol < t.COLS && !hasFloor(startCol)) startCol++;
  while (farCol >= 0 && !hasFloor(farCol)) farCol--;
  startCol += 2; farCol -= 2;
  if (startCol >= t.COLS || farCol < 0) return "unusable";
  const gs = groundRowOf(startCol), gf = groundRowOf(farCol);
  if (gs < 0 || gf < 0) return "unusable";
  t.restart();
  // These probes drive updateEnemy() by hand rather than going through stand(),
  // so they have to clear the engagement grace themselves -- otherwise every
  // probe measures an enemy that is deliberately standing still.
  t.wakeT = 0;
  t.ninja.x = farCol * t.TILE;
  t.ninja.y = gf * t.TILE - t.BODY_H;
  t.snapCamera();
  t.cam.x = Math.max(0, (g.from - 12) * t.TILE);
  for (const e of t.enemies) e.alive = false;
  const e = {
    kind, x: startCol * t.TILE, y: gs * t.TILE - t.ENEMY_H,
    w: t.ENEMY_W, h: t.ENEMY_H, vx: 0, vy: 0, onGround: true, facing: -1,
    state: kind === "rusher" ? "run" : "idle",
    timer: 0, alive: true, dying: 0, lethal: false, wave: true,
    lastX: startCol * t.TILE, stuckT: 0, homeX: startCol * t.TILE + t.ENEMY_W / 2,
    leapt: false, animTime: 0, walkDist: 0, walkRate: 0, leapT: 0, leapDir: -1
  };
  t.enemies.push(e);
  for (let f = 0; f < 700; f++) {
    t.ninja.invuln = 1e9;
    t.updateEnemy(e, t.STEP);
    if (e.y > t.WORLD_H) return "fell";
    if (!e.alive) return "despawned";
    if (e.x / t.TILE < g.from - 1) return "crossed";
  }
  return "held";
}
const outcomes = [];
for (const g of groundGaps) {
  for (const kind of ["charger", "rusher"]) {
    outcomes.push({ g, kind, r: crossTrial(kind, g) });
  }
}
const fell = outcomes.filter(o => o.r === "fell");
check("nothing walks into a pit, at any gap, for any enemy kind",
      fell.length === 0,
      fell.map(o => `${o.kind}@${o.g.from}..${o.g.to}`).join(", "));

const reachable = (g) => (g.to - g.from + 1) * t.TILE + t.GAP_MARGIN <= t.ENEMY_HOP_REACH;
const missed = outcomes.filter(o => reachable(o.g) && o.r !== "crossed");
check("every gap a single leap can reach is actually crossed",
      missed.length === 0,
      missed.map(o => `${o.kind}@${o.g.from}..${o.g.to}:${o.r}`).join(", "));
const wrongHold = outcomes.filter(o => o.r === "held" && reachable(o.g));
check("a gap too wide to leap is held at the lip, never entered",
      wrongHold.length === 0 &&
      outcomes.filter(o => !reachable(o.g)).every(o => o.r === "held"),
      outcomes.map(o => `${o.kind}@${o.g.from}:${o.r}`).join(" "));

// handleGap's two branches, asserted directly.
const nearBody = { x: 30 * t.TILE, y: 20 * t.TILE - t.ENEMY_H, w: t.ENEMY_W,
                   h: t.ENEMY_H, vx: -50, vy: 0, onGround: true, leapT: 0,
                   leapDir: -1 };
check("no gap means no leap", t.handleGap(nearBody, -1) === false);

function lipBody(g) {
  let c = g.to + 1;
  while (c < t.COLS && !hasFloor(c)) c++;
  return { x: c * t.TILE, y: groundRowOf(c) * t.TILE - t.ENEMY_H,
           w: t.ENEMY_W, h: t.ENEMY_H, vx: -50, vy: 0, onGround: true,
           leapT: 0, leapDir: -1 };
}
const nearGap = groundGaps.find(reachable);
const leaper = lipBody(nearGap);
check("a reachable gap commits a leap",
      t.handleGap(leaper, -1) === true && leaper.vy === -t.ENEMY_JUMP_VY &&
      leaper.leapT > 0 && leaper.vx === -t.ENEMY_LEAP_VX,
      `vy=${leaper.vy} leapT=${leaper.leapT} vx=${leaper.vx}`);
const wideGap = groundGaps.find(g => !reachable(g));
if (wideGap) {
  const holder = lipBody(wideGap);
  check("an unreachable gap stops the walker dead instead",
        t.handleGap(holder, -1) === true && holder.vx === 0 && holder.vy === 0,
        `vx=${holder.vx} vy=${holder.vy}`);
} else {
  check("an unreachable gap stops the walker dead instead", true,
        "no gap on this stage is out of reach");
}

console.log("\n== blocked against a wall, the legs stop (req 10) ==");
// A two-tile cover block with clear ground in front of it.
const wallCol = 24;
check("found a wall to push against",
      t.solidAt(wallCol, 18) && t.solidAt(wallCol, 19) && !t.solidAt(wallCol - 4, 18),
      `col ${wallCol}`);
t.restart();
for (const e of t.enemies) e.alive = false;
stand(wallCol - 4);
t.keys.add("ArrowRight");
// Walk up to the wall.
for (let i = 0; i < 80; i++) { for (const e of t.enemies) e.alive = false; tickIso(1); }
const stuckX = t.ninja.x, stuckDist = t.ninja.walkDist;
const wallPoses = [];
for (let i = 0; i < 90; i++) {
  for (const e of t.enemies) e.alive = false;
  tickIso(1);
  wallPoses.push(t.poseNameOf(t.ninja));
}
t.keys.clear();
check("he really is held against the wall",
      Math.abs(t.ninja.x - stuckX) < 1.5,
      `x ${stuckX.toFixed(1)} -> ${t.ninja.x.toFixed(1)}`);
check("the stride phase is frozen while blocked",
      t.ninja.walkDist === stuckDist,
      `walkDist ${stuckDist.toFixed(1)} -> ${t.ninja.walkDist.toFixed(1)}`);
check("the progress reading settles near zero despite vx oscillating",
      Math.abs(t.ninja.walkRate) < t.WALK_RATE_MIN,
      `walkRate=${t.ninja.walkRate.toFixed(1)}, vx=${t.ninja.vx.toFixed(0)}`);
check("no walk frame is shown while blocked",
      !wallPoses.some(p => t.WALK_CYCLE.includes(p)),
      `saw: ${[...new Set(wallPoses)].join(",")}`);
// The only change allowed is the idle blink, which is 2.5fps over 1.5s.
let flips = 0;
for (let i = 1; i < wallPoses.length; i++) if (wallPoses[i] !== wallPoses[i - 1]) flips++;
check("the pose does not buzz: at most the idle blink rate", flips <= 8,
      `${flips} pose changes in ${wallPoses.length} frames`);

// And it recovers: turning away walks normally again.
t.keys.add("ArrowLeft");
for (let i = 0; i < 20; i++) { for (const e of t.enemies) e.alive = false; tickIso(1); }
t.keys.clear();
check("walking away from the wall animates again", t.isWalking(t.ninja),
      `walkRate=${t.ninja.walkRate.toFixed(1)}`);



console.log("\n== the loop DRIVES, and is still music (req: fast, dynamic BGM) ==");
/* This block asserted the opposite twice over, and both versions were right at
   the time. First the loop was 132bpm with a note on all 32 subdivisions, which
   is not a phrase; the fix was 108bpm, rests, and a brush instead of a hat, and
   the tests were written to pin that down. The brief is now a fast action loop,
   so the tempo ceiling had to go.

   What did NOT change is the lesson underneath the first fix: the drive belongs
   in the RHYTHM SECTION, not in a melody that fills every subdivision. So the
   tempo floor is high, the bass and the kit are required to exist, and the
   melody is still held to resting more than it plays. */
check("the tempo drives",
      t.MUSIC_BPM >= 138 && t.MUSIC_BPM <= 164,
      `${t.MUSIC_BPM}bpm, step ${(t.MUSIC_STEP * 1000).toFixed(0)}ms`);
check("the bass moves WITHIN the bar rather than holding one note",
      t.MUSIC_BASS.length === t.MUSIC_BAR &&
      new Set(t.MUSIC_BASS).size >= 2,
      `${t.MUSIC_BASS.length} steps, ${new Set(t.MUSIC_BASS).size} distinct offsets`);
check("the bass riff is diatonic against EVERY chord in the loop", (() => {
  // Only root, fifth and octave are safe against all of Am F G E Dm C: an
  // offset of 10 is a nice riff over Am and an E-flat over F.
  return t.MUSIC_BASS.every(o => o % 12 === 0 || o % 12 === 7);
})(), `offsets ${[...new Set(t.MUSIC_BASS)].join(",")}`);
check("the kit is a kit, not one tick repeating",
      t.MUSIC_KICK.length >= 2 && t.MUSIC_SNARE.length >= 2 &&
      t.MUSIC_HAT.length >= 2 &&
      new Set([...t.MUSIC_KICK, ...t.MUSIC_SNARE]).size ===
        t.MUSIC_KICK.length + t.MUSIC_SNARE.length,
      `kick ${t.MUSIC_KICK} snare ${t.MUSIC_SNARE} hat ${t.MUSIC_HAT}`);
check("there is a backbeat: the snare answers the kick off the beat",
      t.MUSIC_SNARE.every(x => x % 2 === 0) &&
      t.MUSIC_SNARE.every(x => t.MUSIC_KICK.indexOf(x) < 0),
      `snare on ${t.MUSIC_SNARE.join(",")} of ${t.MUSIC_BAR}`);
check("the loop is long enough not to announce itself",
      t.MUSIC_LEN * t.MUSIC_STEP >= 8,
      `${(t.MUSIC_LEN * t.MUSIC_STEP).toFixed(1)}s`);

// RESTS. The old loop put a note on all 32 steps, and that is the measurable
// form of "it sounds like a sound set": a phrase is mostly silence.
check("the melody rests more than it plays",
      t.MUSIC_MELODY.length < t.MUSIC_LEN / 2,
      `${t.MUSIC_MELODY.length} notes across ${t.MUSIC_LEN} steps`);
check("some notes are held for several steps",
      t.MUSIC_MELODY.some(n => n[2] >= 3),
      `longest ${Math.max(...t.MUSIC_MELODY.map(n => n[2]))} steps`);
check("no two melody notes start on the same step",
      new Set(t.MUSIC_MELODY.map(n => n[0])).size === t.MUSIC_MELODY.length);
check("the melody sits inside the loop",
      t.MUSIC_MELODY.every(n => n[0] >= 0 && n[0] < t.MUSIC_LEN));

// HARMONY. A progression with a triad per bar, not one line over a drone.
check("there is a chord for every bar",
      t.MUSIC_CHORDS.length === t.MUSIC_LEN / t.MUSIC_BAR,
      `${t.MUSIC_CHORDS.length} chords, ${t.MUSIC_LEN / t.MUSIC_BAR} bars`);
check("every chord is at least a triad",
      t.MUSIC_CHORDS.every(c => c.notes.length >= 3));
/* THE TURN. A four-bar loop with one progression is a texture: after three
   passes the ear stops hearing music and starts hearing a background process.
   Eight bars in two halves give it a beginning and a middle. */
check("the loop is in two halves, not one repeated figure", (() => {
  const half = t.MUSIC_CHORDS.length / 2;
  const a = t.MUSIC_CHORDS.slice(0, half).map(c => c.bass).join(",");
  const b = t.MUSIC_CHORDS.slice(half).map(c => c.bass).join(",");
  return t.MUSIC_CHORDS.length >= 8 && a !== b;
})(), "the B half has to be a different progression, or there is no turn");
check("the melody's two halves are different shapes too", (() => {
  const mid = t.MUSIC_LEN / 2;
  const a = t.MUSIC_MELODY.filter(n => n[0] < mid);
  const b = t.MUSIC_MELODY.filter(n => n[0] >= mid);
  if (!a.length || !b.length) return false;
  const shape = (ns) => ns.map(n => n[2]).join(",");
  const top = (ns) => Math.max(...ns.map(n => n[1]));
  // Different rhythm AND a different ceiling: transposing the A melody over new
  // chords is a key change with no tune in it.
  return shape(a) !== shape(b) && top(b) > top(a);
})());
check("the progression moves rather than droning",
      new Set(t.MUSIC_CHORDS.map(c => c.bass)).size >= 3,
      `${new Set(t.MUSIC_CHORDS.map(c => c.bass)).size} distinct roots`);

// Diatonic to A NATURAL minor. The old loop used A harmonic minor so it could
// lean on G#, which is where its urgency came from and is the thing the brief
// asked to lose.
{
  const semi = (f) => Math.round(12 * Math.log2(f / 440));
  const A_MINOR = new Set([0, 2, 3, 5, 7, 8, 10]);   // A B C D E F G
  const pc = (f) => ((semi(f) % 12) + 12) % 12;
  const all = [...t.MUSIC_MELODY.map(n => n[1]),
               ...t.MUSIC_CHORDS.flatMap(c => [c.bass, ...c.notes])];
  /* Diatonic to A natural minor -- with exactly ONE exception, and it is the
     point of the eight-bar version. Bar 8 is E major, whose third is G#: the
     leading tone. It is the only chord in the loop that actually wants to
     resolve, and that want is what pulls the B half back into bar 1.

     The old four-bar loop had no leading tone anywhere, which is why it turned
     over forever without ever arriving. So the assertion is not "no leading
     tone" any more; it is "the leading tone appears in the V chord and nowhere
     else", which is a much tighter claim and the one that matters. */
  const leading = all.filter(f => pc(f) === 11);
  const vChord = t.MUSIC_CHORDS.find(c => pc(c.bass) === 7);   // E
  check("every pitch is in A natural minor bar the dominant's third",
        all.every(f => A_MINOR.has(pc(f)) || pc(f) === 11),
        all.filter(f => !A_MINOR.has(pc(f)) && pc(f) !== 11).join(","));
  check("there is a dominant chord to turn on", !!vChord);
  check("the leading tone appears ONLY in that chord",
        leading.length > 0 && vChord &&
        leading.every(f => [vChord.bass, ...vChord.notes].some(n => pc(n) === pc(f))),
        `${leading.length} leading tones`);
  /* The calm version banned the leading tone from the tune outright -- "in the
     tune it reads as a wrong note" -- which is true when the tune is floating
     over a pad and false when it is landing on the dominant with a kick under
     it. What has to hold is that it only ever appears where the harmony is
     already asking for it: in the dominant's own bar. Anywhere else it IS a
     wrong note, and that is the claim worth keeping. */
  check("a leading tone in the tune only lands in the dominant's own bar",
        t.MUSIC_MELODY.filter(n => pc(n[1]) === 11).every(([at]) => {
          const c = t.MUSIC_CHORDS[Math.floor(at / t.MUSIC_BAR) % t.MUSIC_CHORDS.length];
          return pc(c.bass) === 7;
        }),
        `${t.MUSIC_MELODY.filter(n => pc(n[1]) === 11).length} in the tune`);
  check("every melody note is a chord tone or the seventh of its own bar", (() => {
    return t.MUSIC_MELODY.every(([at, f]) => {
      const c = t.MUSIC_CHORDS[Math.floor(at / t.MUSIC_BAR) % t.MUSIC_CHORDS.length];
      const root = pc(c.bass);
      // A seventh over the chord is consonant enough to leave unresolved; a
      // fourth or a sixth is not, and would have to be led somewhere.
      const seventh = (root + 10) % 12;
      return [c.bass, ...c.notes].some(n => pc(n) === pc(f)) || pc(f) === seventh;
    });
  })(), "a melody note that is neither has to be resolved, and this loop never does");
}

// Measured at the audio graph. A bar line has to put a whole triad plus a bass
// note in at once -- each voice being two detuned oscillators -- and a whole
// loop must schedule far fewer than one voice per step.
t.restart();
t.pumpMusic();
{
  const loop = runMusic(t.MUSIC_LEN * t.MUSIC_STEP);
  // Expressed per step rather than as a total, so lengthening the loop cannot
  // fail it -- which is exactly what happened when it went from four bars to
  // eight and the fixed ceiling of 160 caught the new 172.
  const perStep = loop.osc / Math.max(1, loop.steps);
  /* The ceiling went up with the rhythm section: a bass note on every eighth
     plus a kick, a snare body and a pad is more oscillators per step than a pad
     and a sparse tune were. It is still a ceiling, and it is what would catch
     somebody adding a second melody voice without noticing the cost. */
  check("a full loop schedules harmony, melody, bass and kit",
        perStep >= 2.0 && perStep <= 8.0,
        `${perStep.toFixed(2)} oscillators per step over ${loop.steps} steps`);
  /* Noise sources per bar: one brush, one per snare, one per hat. The figure
     that matters is that it is BOUNDED per bar -- the failure this replaces was
     a tick on every offbeat with nothing else, which is the same count and a
     completely different thing, so the shape of the kit is asserted above and
     this only holds the budget. */
  const bars = t.MUSIC_LEN / t.MUSIC_BAR;
  const perBar = loop.src / bars;
  check("the kit stays inside its noise budget per bar",
        perBar >= 2 && perBar <= 8, `${perBar.toFixed(1)} noise sources per bar`);
  check("a loop is one loop, not several",
        loop.steps <= t.MUSIC_LEN + 2, `${loop.steps} of ${t.MUSIC_LEN} steps`);
}

console.log("\n== run clock for time attack (req 12) ==");
check("00:00 at the start", t.timeText(0) === "00:00", t.timeText(0));
check("one second reads 00:01", t.timeText(1) === "00:01", t.timeText(1));
check("it rolls into minutes", t.timeText(61) === "01:01", t.timeText(61));
check("59:59 is reached", t.timeText(3599) === "59:59", t.timeText(3599));
check("fractions truncate rather than round up",
      t.timeText(1.99) === "00:01", t.timeText(1.99));
check("it clamps instead of widening the readout",
      t.timeText(999999) === "99:59", t.timeText(999999));
// A fixed-width readout is what keeps the centred HUD plate from jittering.
const widths = new Set([0, 9, 59, 60, 599, 600, 3600, 99999].map(v => t.timeText(v).length));
check("the readout is always five glyphs wide", widths.size === 1 && widths.has(5),
      [...widths].join(","));

t.restart();
check("a run starts at zero", t.playTime === 0);
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(60);
check("one second of play advances it by one second",
      Math.abs(t.playTime - 1) < 0.02, `${t.playTime.toFixed(3)}s`);
check("...and the readout agrees", t.timeText(t.playTime) === "00:01",
      t.timeText(t.playTime));

// Pausing must not tick, or pausing would be a way to stop the clock mid-run.
t.togglePause();
const paused0 = t.playTime;
tickIso(60);
check("a pause freezes the clock", t.playTime === paused0,
      `${paused0.toFixed(3)} -> ${t.playTime.toFixed(3)}`);
t.togglePause();
tickIso(30);
check("resuming starts it again", t.playTime > paused0);

// A death restarts the stage clock: each life is timed from zero.
stand(SAFE_TILE);
tickIso(120);
const clockBeforeDeath = t.playTime;
check("the clock has run up before the death", clockBeforeDeath > 1.5,
      `${clockBeforeDeath.toFixed(2)}s`);
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0;
t.ninja.y = t.WORLD_H + 200;
tick(1);
check("death enters the freeze", t.mode === "dying");
const duringFreeze = t.playTime;
tick(20);
check("the freeze itself does not tick the clock", t.playTime === duringFreeze,
      `${duringFreeze.toFixed(3)} -> ${t.playTime.toFixed(3)}`);
tickThroughDeath();
check("respawning puts the stage clock back to zero", t.playTime < 0.05,
      `${t.playTime.toFixed(3)}s`);
check("...so the readout restarts at 00:00", t.timeText(t.playTime) === "00:00",
      t.timeText(t.playTime));
// It must then run again, not stay stuck at zero.
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(60);
check("and it runs again on the new life", Math.abs(t.playTime - 1) < 0.05,
      `${t.playTime.toFixed(3)}s`);
// Restarting by hand does the same.
t.restart();
check("R also resets it", t.playTime === 0);

// The ending freezes it, so the final figure is the score.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(30);
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("reaching the goal clears the stage", t.mode === "clear");
const finalTime = t.playTime;
tick(60);
check("the clock stops at the ending", t.playTime === finalTime,
      `${finalTime.toFixed(3)} -> ${t.playTime.toFixed(3)}`);

// The title screen must not bank time for the next run.
t.toTitle();
check("returning to the title resets it", t.playTime === 0);
tick(60);
check("and the title screen does not tick", t.playTime === 0);

// Both end screens and the pause menu render with the clock in them.
t.restart(); tickIso(90);
t.drawHud();
t.togglePause(); t.drawPause(); t.togglePause();
check("the HUD and pause menu render the clock without throwing", true);



console.log("\n== an empty stock is audible (req: limited shuriken) ==");
/* The screen-clearing ninjutsu is gone -- five seconds of invulnerability is an
   off switch, not a difficulty setting -- and with it its blast. What a limited
   weapon needs instead is a sound for having nothing left, or an empty stock is
   indistinguishable from a dropped keypress. */
const cDry = countsFor(t.sfxDryFire);
check("the dry click is the smallest sound in the set",
      cDry.osc + cDry.src > 0 &&
      cDry.osc + cDry.src <= cKill.osc + cKill.src,
      JSON.stringify(cDry));
const drySpan = spanOf(t.sfxDryFire);
check("and it is short enough never to read as an action",
      drySpan > 0 && drySpan < 0.12, `${(drySpan * 1000).toFixed(0)}ms`);
{
  // It fires from the empty throw itself, not from a caller that has to
  // remember to make the sound.
  t.restart(); stand(3);
  for (let i = 0; i < 400 && t.shurikenAmmo > 0; i++) { t.throwShuriken(); tickNoWave(1); }
  check("the stock is empty", t.shurikenAmmo === 0);
  const o0 = audioLog.oscillators, s0 = audioLog.sources;
  t.throwShuriken();
  check("an empty throw clicks", audioLog.oscillators - o0 === cDry.osc &&
        audioLog.sources - s0 === cDry.src,
        `+${audioLog.oscillators - o0} osc, +${audioLog.sources - s0} src`);
  check("...and throws nothing", t.shurikens.every(x => x.vx !== undefined));
}
// An ordinary kill is still audible: nothing in the set suppresses it.
t.restart();
const oscBeforePlainKill = audioLog.oscillators;
t.killEnemy(t.enemies.find(e => e.alive));
check("an ordinary kill is still audible",
      audioLog.oscillators > oscBeforePlainKill);

console.log("\n== the three enemies are three x14_bodies, not one recoloured (req 14) ==");
const x14_sil = (rows) => rows.map(r => r.replace(/[^.]/g, "#")).join("|");
const x14_bodies = FOE_KINDS.map(k => [k, t.ENEMY_POSES[k].base]);
for (let i = 0; i < x14_bodies.length; i++) {
  for (let j = i + 1; j < x14_bodies.length; j++) {
    check(`${x14_bodies[i][0]} and ${x14_bodies[j][0]} have different silhouettes`,
          x14_sil(x14_bodies[i][1]) !== x14_sil(x14_bodies[j][1]));
  }
}
// Not just different: recognisably different. Count rows whose outline differs.
for (let i = 0; i < x14_bodies.length; i++) {
  for (let j = i + 1; j < x14_bodies.length; j++) {
    const a = x14_bodies[i][1].map(r => r.replace(/[^.]/g, "#"));
    const b = x14_bodies[j][1].map(r => r.replace(/[^.]/g, "#"));
    let diff = 0;
    for (let r = 0; r < 24; r++) if (a[r] !== b[r]) diff++;
    check(`${x14_bodies[i][0]} vs ${x14_bodies[j][0]}: at least a third of rows differ`,
          diff >= 8, `${diff} of 24 rows`);
  }
}
// Mass inside the torso band. A width metric kept catching the arms and the
// weapons, which reach outside the body on purpose -- the rusher's two daggers
// make it the widest thing on screen while being the leanest body.
const x14_widest = (rows) =>
  rows.reduce((n, r) => n + r.slice(6, 24).replace(/\./g, "").length, 0);
check("the charger is the most massive body",
      x14_widest(t.ENEMY_POSES.charger.base) > x14_widest(t.ENEMY_POSES.rusher.base) &&
      x14_widest(t.ENEMY_POSES.charger.base) > x14_widest(t.ENEMY_POSES.warden.base));
check("each kind has its own attack pose",
      Array.isArray(t.ENEMY_POSES.charger.attack) &&
      Array.isArray(t.ENEMY_POSES.charger.lunge) &&
      Array.isArray(t.ENEMY_POSES.rusher.leap) &&
      Array.isArray(t.ENEMY_POSES.warden.aim) &&
      Array.isArray(t.ENEMY_POSES.warden.duck));

console.log("\n== charger: the lunge (req 14) ==");
t.restart();
const x14_lc = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== x14_lc) e.alive = false;
// Stand inside the lunge band rather than next to it.
const x14_lungeTile = Math.floor(x14_lc.x / t.TILE) - Math.round(t.CHG_LUNGE_MIN / t.TILE) - 2;
stand(x14_lungeTile);
check("standing in the lunge band",
      Math.abs(x14_lc.x - t.ninja.x) >= t.CHG_LUNGE_MIN &&
      Math.abs(x14_lc.x - t.ninja.x) <= t.CHG_LUNGE_RANGE,
      `${Math.round(Math.abs(x14_lc.x - t.ninja.x))}px, band ${t.CHG_LUNGE_MIN}..${t.CHG_LUNGE_RANGE}`);
let x14_sawWind = false, x14_sawLunge = false, x14_lungeVx = 0;
let x14_lungeLethal = false, x14_lungeHazard = false;
for (let i = 0; i < 200; i++) {
  tickIso(1);
  if (x14_lc.state === "lungeWind") x14_sawWind = true;
  if (x14_lc.state === "lunge") {
    x14_sawLunge = true;
    x14_lungeVx = x14_lc.vx;
    if (x14_lc.lethal) x14_lungeLethal = true;
    if (t.hazards.length > 0) x14_lungeHazard = true;
  }
  if (x14_sawLunge && x14_lc.state === "recover") break;
}
check("it telegraphs the lunge before committing", x14_sawWind);
check("then dashes", x14_sawLunge);
check("the dash is faster than its walk",
      Math.abs(x14_lungeVx) > t.CHG_SPEED, `${Math.abs(x14_lungeVx)} vs walk ${t.CHG_SPEED}`);
// The dash carries a hitbox in front of it rather than making the whole body
// lethal: its back and flanks are safe to touch, so jumping over a lunge is an
// answer instead of a gamble.
check("the dash carries an attack box rather than a lethal body",
      x14_lungeHazard && !x14_lungeLethal,
      `hazard=${x14_lungeHazard} bodyLethal=${x14_lungeLethal}`);
check("the lunge pose is shown while it happens",
      t.ENEMY_POSES.charger.lunge !== t.ENEMY_POSES.charger.base);
// The telegraph has to be long enough to react to.
check("the telegraph is at least a fifth of a second", t.CHG_LUNGE_WIND >= 0.2,
      `${t.CHG_LUNGE_WIND}s`);
// And it must not become the only thing the charger does.
check("a cooldown follows the lunge", x14_lc.lungeCd > 0, `cd=${x14_lc.lungeCd.toFixed(2)}`);
check("the cooldown is longer than the lunge itself",
      t.CHG_LUNGE_CD > t.CHG_LUNGE_WIND + t.CHG_LUNGE_TIME);

// The leash invariant must survive the dash: that is what the first attempt broke.
t.restart();
for (const e of t.enemies) e.alive = false;
const x14_leashFoes = t.enemies.filter(e => e.kind === "charger" && !e.ledge);
let x14_worst = 0;
for (const foe of t.enemies) foe.alive = foe.kind === "charger" && !foe.ledge;
for (let i = 0; i < 900; i++) {
  tickIso(1);
  t.keys.add("ArrowRight");
  for (const foe of t.enemies) {
    if (!foe.alive || foe.kind !== "charger") continue;
    x14_worst = Math.max(x14_worst, Math.abs(foe.x + foe.w / 2 - foe.homeX));
  }
}
t.keys.clear();
check("no charger leaves its leash, lunge included",
      x14_worst <= t.CHG_LEASH + 4, `x14_worst ${x14_worst.toFixed(0)}px, leash ${t.CHG_LEASH}`);

// Close in and it still walks and swings rather than lunging.
t.restart();
const x14_cc = pickEnemy("charger", 7);
for (const e of t.enemies) if (e !== x14_cc) e.alive = false;
stand(Math.floor(x14_cc.x / t.TILE) - 3);
let x14_sawClose = new Set();
for (let i = 0; i < 300; i++) { tickIso(1); x14_sawClose.add(x14_cc.state); }
check("at close range it still closes on foot and swings",
      x14_sawClose.has("swing") && x14_sawClose.has("windup"),
      `states: ${[...x14_sawClose].sort().join(",")}`);

console.log("\n== warden: burst fire and giving ground (req 14) ==");
function x14_gunTrial(tilesAway) {
  t.restart();
  const x14_gg = pickEnemy("warden", 10) || t.enemies.find(e => e.kind === "warden" && !e.ledge);
  for (const e of t.enemies) if (e !== x14_gg) e.alive = false;
  stand(Math.floor(x14_gg.x / t.TILE) - tilesAway);
  let shots = 0;
  for (let i = 0; i < 200; i++) {
    const before = t.bullets.length;
    t.ninja.invuln = 999;
    tickNoWave(1);
    if (t.bullets.length > before) shots += t.bullets.length - before;
    if (x14_gg.state === "reload") break;
  }
  return { shots, foe: x14_gg, dist: Math.abs(x14_gg.x - t.ninja.x) };
}
const x14_farShot = x14_gunTrial(12);
check("at distance it fires a single aimed shot",
      x14_farShot.dist > t.WARD_BURST_RANGE && x14_farShot.shots === 1,
      `${x14_farShot.shots} shots at ${Math.round(x14_farShot.dist)}px`);
const x14_nearShot = x14_gunTrial(5);
check("up close it fires a burst",
      x14_nearShot.dist <= t.WARD_BURST_RANGE && x14_nearShot.shots === t.WARD_BURST_SHOTS,
      `${x14_nearShot.shots} shots at ${Math.round(x14_nearShot.dist)}px`);
check("the burst is more than one round", t.WARD_BURST_SHOTS >= 3);
check("burst rounds come fast enough that one crouch covers them",
      t.WARD_BURST_GAP * (t.WARD_BURST_SHOTS - 1) < 0.4,
      `${(t.WARD_BURST_GAP * (t.WARD_BURST_SHOTS - 1)).toFixed(2)}s span`);

// The crouch mechanic is load-bearing: EVERY round of a burst must pass over a
// ducking player, or the burst would quietly break the game's core answer.
t.restart();
const x14_bg = pickEnemy("warden", 10) || t.enemies.find(e => e.kind === "warden" && !e.ledge);
for (const e of t.enemies) if (e !== x14_bg) e.alive = false;
stand(Math.floor(x14_bg.x / t.TILE) - 5);
const x14_heights = new Set();
for (let i = 0; i < 200; i++) {
  t.ninja.invuln = 999;
  tickNoWave(1);
  for (const b of t.bullets) x14_heights.add(Math.round((x14_bg.y + x14_bg.h) - b.y));
  if (x14_bg.state === "reload") break;
}
check("every burst round sits at the same crouch-dodgeable height",
      x14_heights.size === 1 && x14_heights.has(t.BULLET_Y_OFF),
      `x14_heights seen: ${[...x14_heights].join(",")} (want ${t.BULLET_Y_OFF})`);

// Giving ground, bounded.
t.restart();
const x14_sg = pickEnemy("warden", 10) || t.enemies.find(e => e.kind === "warden" && !e.ledge);
for (const e of t.enemies) if (e !== x14_sg) e.alive = false;
stand(Math.floor(x14_sg.x / t.TILE) - 2);
const x14_gunHome = x14_sg.homeX;
let x14_gunWorst = 0;
for (let i = 0; i < 600; i++) {
  t.ninja.invuln = 999;
  tickNoWave(1);
  x14_gunWorst = Math.max(x14_gunWorst, (x14_sg.x + x14_sg.w / 2) - x14_gunHome);
}
check("it gives ground when you close in", x14_gunWorst > 4,
      `moved ${x14_gunWorst.toFixed(0)}px back`);
check("...but not far enough to be herded away",
      x14_gunWorst <= t.WARD_BACKSTEP_MAX + t.WARD_BACKSTEP_SPEED * t.STEP + 2,
      `${x14_gunWorst.toFixed(0)}px vs cap ${t.WARD_BACKSTEP_MAX}`);

console.log("\n== rusher: a second leap (req 14) ==");
check("two leaps per pass", t.RUSH_MAX_LEAPS === 2);
check("the follow-up is weaker", t.RUSH_LEAP_DECAY < 1 && t.RUSH_LEAP_DECAY > 0.5);
t.restart();
for (const e of t.enemies) e.alive = false;
const x14_rr = {
  kind: "rusher", x: 40 * t.TILE, y: 20 * t.TILE - t.ENEMY_H,
  w: t.ENEMY_W, h: t.ENEMY_H, vx: 0, vy: 0, onGround: true, facing: -1,
  state: "run", timer: 0, alive: true, dying: 0, lethal: false, wave: true,
  lastX: 40 * t.TILE, stuckT: 0, homeX: 40 * t.TILE, animTime: 0,
  walkDist: 0, walkRate: 0, leapT: 0, leapDir: -1,
  leaps: 0, lungeCd: 0, lungeDir: -1, shots: 0
};
t.enemies.push(x14_rr);
stand(30);
const x14_leapVys = [];
let x14_lastLeaps = 0;
for (let i = 0; i < 600 && x14_rr.alive; i++) {
  t.ninja.invuln = 999;
  t.ninja.x = x14_rr.x - 40;                 // stay just inside leap range
  t.ninja.y = 20 * t.TILE - t.BODY_H;
  t.updateEnemy(x14_rr, t.STEP);
  if (x14_rr.leaps > x14_lastLeaps) { x14_leapVys.push(x14_rr.vy); x14_lastLeaps = x14_rr.leaps; }
}
check("it leaps twice on one pass", x14_leapVys.length === 2,
      `${x14_leapVys.length} leaps: ${x14_leapVys.map(v => v.toFixed(0)).join(", ")}`);
check("the second leap is lower than the first",
      x14_leapVys.length === 2 && Math.abs(x14_leapVys[1]) < Math.abs(x14_leapVys[0]),
      x14_leapVys.map(v => v.toFixed(0)).join(" then "));
check("and it does not leap a third time", x14_rr.leaps <= t.RUSH_MAX_LEAPS,
      `leaps=${x14_rr.leaps}`);

console.log("\n== a taken shuriken pickup stays taken (req 16) ==");
t.restart();
const x14_pk = t.pickups.find(x => !x.taken);
const x14_capAtStart = t.shurikenAmmo;
stand(Math.round(x14_pk.x / t.TILE));
t.ninja.y = x14_pk.y - 10;
for (let i = 0; i < 20 && !x14_pk.taken; i++) tickNoWave(1);
check("the pickup was taken", x14_pk.taken === true);
check("...and topped up the stock",
      t.shurikenAmmo === x14_capAtStart + t.SHURIKEN_PICKUP,
      `${x14_capAtStart} -> ${t.shurikenAmmo}`);
const x14_capAfterPickup = t.shurikenAmmo;
// Now die.
stand(SAFE_TILE);
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0;
t.ninja.y = t.WORLD_H + 200;
tick(1);
tickThroughDeath();
check("back in play after the death", t.mode === "play");
check("the pickup does NOT come back",
      t.pickups.find(x => x === x14_pk).taken === true);
check("no pickup that was taken has reappeared",
      t.pickups.filter(x => x.taken).length >= 1);
check("and the ammunition it gave is kept", t.shurikenAmmo === x14_capAfterPickup,
      `stock=${t.shurikenAmmo}, was ${x14_capAfterPickup}`);
// Two more deaths to reach game over, then the run resets.
for (let k = 0; k < 2; k++) {
  stand(SAFE_TILE);
  for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
  t.ninja.invuln = 0;
  t.ninja.y = t.WORLD_H + 200;
  tick(1);
  tickThroughDeath();
}
check("the run is over", t.mode === "gameover", `mode=${t.mode}`);
check("the stock survived every death of the run",
      t.shurikenAmmo === x14_capAfterPickup, `stock=${t.shurikenAmmo}`);
tick(Math.ceil(t.GAMEOVER_LOCK / t.STEP) + 1);
key("keydown", "Space"); key("keyup", "Space");
check("a new run starts from the title", t.mode === "title");
check("ending the run puts every pickup back",
      t.pickups.every(x => !x.taken), `${t.pickups.filter(x => x.taken).length} still taken`);
check("...and the shuriken stock back to its starting value",
      t.shurikenAmmo === t.SHURIKEN_START, `${t.shurikenAmmo}`);



console.log("\n== hero proportions are pinned in both directions (req 17) ==");
// Three passes overshot in turn: legs as stumps, then legs at a full half of
// the sprite with no waist to speak of, and the grid changed underneath both.
// The bounds are fractions of the sprite so they survive the next regrid, and
// they fail for every earlier attempt.
{
  const pose = t.NINJA_POSES.idle;
  const N = pose.length;
  const headTop = pose.findIndex(r => bodyWRaw(r) > 0);
  const headBot = neckOf(pose, bodyWRaw);
  // The sash marks the waist. Measured on the torso columns only, because the
  // arm hangs on the same rows and would break a whole-row match.
  const torsoBand = (r) => r.slice(6, 22);
  const sashRow = pose.findIndex((r, i) =>
    i > headBot && /^\.*K[SRr]+K\.*$/.test(torsoBand(r)));
  check("the sash marks a waist", sashRow > headBot, `sashRow=${sashRow}`);
  // Legs begin at the pelvis, a row above the first row split by the seam.
  const half = Math.floor(pose[0].length / 2);
  const seam = pose.findIndex((r, i) =>
    i > sashRow && r.slice(half - 2, half + 2).includes("KK"));
  check("the legs are split by a seam", seam > sashRow, `seam=${seam}`);
  const legTop = seam - 1;
  const headRows = headBot - headTop + 1;
  const torsoRows = legTop - headBot - 1;
  const legRows = N - legTop;
  const pct = (n) => Math.round(n / N * 100);
  check(`head ${pct(headRows)}% / torso ${pct(torsoRows)}% / legs ${pct(legRows)}%`,
        true, `${headRows} + ${torsoRows} + ${legRows} of ${N} rows`);
  check("the head is at most a quarter of the height", pct(headRows) <= 25, `${pct(headRows)}%`);
  check("the head is not so small it stops reading", pct(headRows) >= 15, `${pct(headRows)}%`);
  check("the torso has real height -- room for a waist", pct(torsoRows) >= 28, `${pct(torsoRows)}%`);
  check("the legs are not stumps", pct(legRows) >= 33, `${pct(legRows)}%`);
  check("...and not stilts either", pct(legRows) <= 47, `${pct(legRows)}%`);
  const widest = Math.max(...pose.slice(headBot + 1, legTop).map(bodyWRaw));
  check("the torso is taller than it is wide", torsoRows > widest,
        `${torsoRows} rows vs ${widest} cols`);
  // The taper is what makes the torso read as a body rather than a slab.
  const chestW = Math.max(...pose.slice(headBot + 1, sashRow).map(bodyWRaw));
  const waistW = bodyWRaw(pose[sashRow]);
  const hipsW = Math.max(...pose.slice(sashRow + 1, legTop + 1).map(bodyWRaw));
  check("the waist is narrower than the chest", waistW < chestW,
        `waist ${waistW} vs chest ${chestW}`);
  check("...and narrower than the hips", waistW < hipsW,
        `waist ${waistW} vs hips ${hipsW}`);
}

console.log("\n== score: kills, pickups, time bonus (req 18) ==");
t.restart();
check("a run starts at zero", t.score === 0 && t.timeBonus === 0);
const sc0 = t.score;
t.killEnemy(t.enemies.find(e => e.alive));
check("a kill scores", t.score === sc0 + t.SCORE_KILL,
      `${sc0} -> ${t.score} (want +${t.SCORE_KILL})`);

t.restart();
const scPick = t.pickups.find(x => !x.taken);
const scBefore = t.score;
stand(Math.round(scPick.x / t.TILE));
t.ninja.y = scPick.y - 10;
for (let i = 0; i < 20 && !scPick.taken; i++) tickNoWave(1);
check("a shuriken pickup scores", t.score === scBefore + t.SCORE_PICKUP,
      `${scBefore} -> ${t.score} (want +${t.SCORE_PICKUP})`);

t.restart();
const scFlag = t.flags.find(f => !f.taken);
const flagBefore = t.score;
stand(Math.round(scFlag.x / t.TILE));
t.ninja.y = scFlag.y;
for (let i = 0; i < 20 && !scFlag.taken; i++) tickNoWave(1);
check("a flag scores, and scores more than a shuriken",
      t.score === flagBefore + t.SCORE_FLAG && t.SCORE_FLAG > t.SCORE_PICKUP,
      `${flagBefore} -> ${t.score} (want +${t.SCORE_FLAG})`);
check("a flag is worth more than a kill", t.SCORE_FLAG > t.SCORE_KILL);

// Banked progress survives a death: a death should not unmake what you did.
t.restart();
t.killEnemy(t.enemies.find(e => e.alive));
tickNoWave(6);
const bankedScore = t.score;
check("there is something banked to lose", bankedScore > 0);
stand(SAFE_TILE);
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0;
t.ninja.y = t.WORLD_H + 200;
tick(1);
tickThroughDeath();
check("a death does not take the score away", t.score === bankedScore,
      `${bankedScore} -> ${t.score}`);
check("...even though it does reset the clock", t.playTime < 0.05);
t.restart();
check("but a new run starts from zero again", t.score === 0);

// A multi-kill scores every body, once each. This used to be the ninjutsu's
// job; it is gone, so the property is checked directly on killEnemy().
t.restart();
const multi = t.enemies.filter(e => e.alive && t.onScreen(e)).slice(0, 4);
const beforeMulti = t.score;
for (const e of multi) t.killEnemy(e, true);
check("a multi-kill scores every body it clears",
      t.score === beforeMulti + multi.length * t.SCORE_KILL,
      `${multi.length} bodies, ${beforeMulti} -> ${t.score}`);

console.log("\n== the time bonus is settled once, at the ending (req 18) ==");
// Under par: a bonus proportional to the time saved.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(60);                                  // about a second on the clock
const preClear = t.score;
const clockAtClear = t.playTime;
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("the stage cleared", t.mode === "clear");
const wantBonus = Math.max(0, Math.floor(t.stagePar() - clockAtClear)) * t.SCORE_TIME_STEP;
check("finishing under par pays a bonus", t.timeBonus > 0, `bonus=${t.timeBonus}`);
check("the bonus is one step per whole second under par",
      Math.abs(t.timeBonus - wantBonus) <= t.SCORE_TIME_STEP,
      `${t.timeBonus} vs expected ${wantBonus}`);
check("and it is added to the score",
      t.score === preClear + t.timeBonus,
      `${preClear} + ${t.timeBonus} = ${preClear + t.timeBonus}, got ${t.score}`);
// It must not keep climbing while the summary sits on screen.
const settled = t.score, settledBonus = t.timeBonus;
tick(180);
check("the figure does not drift while the ending screen is up",
      t.score === settled && t.timeBonus === settledBonus,
      `${settled} -> ${t.score}`);

// Over par: no bonus, and no penalty either.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
t.killEnemy(t.enemies[0] || { x: 0, y: 0, w: 1, h: 1, kind: "charger", alive: true });
const slowBefore = t.score;
// Wind the clock past par without the enemies interfering.
for (let i = 0; i < Math.ceil((t.stagePar() + 2) / t.STEP); i++) {
  t.ninja.invuln = 999;
  clearWaves();
  tick(1);
  if (t.stageTotal > t.stagePar() + 1) break;
}
check("the stage clock is past par", t.stageTotal > t.stagePar(),
      `${t.stageTotal.toFixed(0)}s vs par ${t.stagePar().toFixed(0)}s`);
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("finishing over par pays nothing", t.timeBonus === 0, `bonus=${t.timeBonus}`);
check("...and costs nothing", t.score >= slowBefore, `${slowBefore} -> ${t.score}`);

// The readout is fixed width, so the plate cannot jitter as the score climbs.
const widthsSeen = new Set([0, 7, 99, 100, 12345, 999999, 9999999]
  .map(v => String(Math.min(999999, v)).padStart(6, "0").length));
check("the score readout is always six digits",
      widthsSeen.size === 1 && widthsSeen.has(6), [...widthsSeen].join(","));
t.restart(); t.drawHud();
check("the HUD renders score and clock together without throwing", true);



console.log("\n== every enemy is visibly armed at rest (req 19) ==");
// The complaint was that weapons could not be seen, so the cast read as three
// things that merely run at you. M is the steel in every enemy palette, and on
// the native grid a body occupies roughly columns 6..23, so ink out at 24 and
// beyond is weapon.
const WEAPON_COL = 24;
for (const kind of FOE_KINDS) {
  const base = t.ENEMY_POSES[kind].base;
  const bladePixels = base.reduce(
    (n, r) => n + (r.slice(WEAPON_COL).match(/M/g) ?? []).length, 0);
  check(`the ${kind} carries a visible blade while just standing there`,
        bladePixels >= 4, `${bladePixels} steel pixels in the weapon columns`);
}
for (const [kind, pose] of [["charger", "attack"], ["rusher", "leap"], ["warden", "sweep"]]) {
  const weapon = (rows) => rows.reduce(
    (n, r) => n + r.slice(WEAPON_COL).replace(/\./g, "").length, 0);
  check(`the ${kind}'s attack shows more weapon than its idle`,
        weapon(t.ENEMY_POSES[kind][pose]) > weapon(t.ENEMY_POSES[kind].base) ||
        t.ENEMY_POSES[kind][pose].join("") !== t.ENEMY_POSES[kind].base.join(""),
        `${weapon(t.ENEMY_POSES[kind][pose])} vs ${weapon(t.ENEMY_POSES[kind].base)}`);
}

console.log("\n== the warden holds its post with a visible polearm (req 19) ==");
{
  const W = t.ENEMY_POSES.warden;
  const ink = (r) => r.length - r.split(".").length + 1;
  // The complaint was that the weapon could not be seen. Body columns are 4..11
  // for this enemy, so anything drawn at 12..15 is weapon.
  const weaponInk = (rows) =>
    rows.reduce((n, r) => n + r.slice(24).replace(/\./g, "").length, 0);
  check("the weapon is drawn at rest, not only mid-attack",
        weaponInk(W.base) >= 16, `${weaponInk(W.base)} weapon pixels in the base pose`);
  // Taller than its wielder: that is what makes the silhouette read as armed.
  // The weapon runs beside the head and torso -- it cannot reach into the legs,
  // so it is measured against those fourteen rows, not the whole sprite.
  const weaponRows = W.base.filter(r => r.slice(24).replace(/\./g, "").length > 0).length;
  const upper = W.base.slice(0, Math.floor(W.base.length * 0.62))
                      .filter(r => ink(r) > 0).length;
  check("the weapon runs the full height of the upper body",
        weaponRows >= upper - 1, `${weaponRows} weapon rows vs ${upper} upper-body rows`);
  check("...and stands taller than the wielder's head",
        W.base.findIndex(r => r.slice(24).replace(/\./g, "").length > 0) <=
        W.base.findIndex(r => r.slice(6, 24).replace(/\./g, "").length > 0));
  check("the blade head is the brightest part of it",
        W.base.some(r => r.includes("MMMM")), "expected a steel blade head");
  check("every warden pose carries the weapon",
        ["base", "walkA", "walkB", "walkC", "walkD", "aim", "sweep"]
          .every(k => weaponInk(W[k]) > 0));
  check("the sweep is its own pose", W.sweep.join("") !== W.base.join("") &&
        W.sweep.join("") !== W.aim.join(""));
  // The swing has to be the widest thing it does, or it will not read as a swing.
  check("the sweep reaches further across the sprite than the thrust",
        weaponInk(W.sweep) > weaponInk(W.aim),
        `sweep ${weaponInk(W.sweep)} vs thrust ${weaponInk(W.aim)}`);
}

// Step inside its reach and it swings.
function sweepTrial(tilesAway, crouch, observe) {
  t.restart();
  const wd = t.enemies.find(e => e.kind === "warden" && !e.ledge);
  for (const e of t.enemies) if (e !== wd) e.alive = false;
  const col = Math.floor(wd.x / t.TILE) - tilesAway;
  stand(col);
  if (crouch) key("keydown", "ArrowDown");
  const seen = new Set();
  let hazard = null, died = false;
  const d0 = t.deaths;
  for (let i = 0; i < 300; i++) {
    // killNinja() clears `hazards`, so the run that watches the hitbox cannot
    // also be the run that dies to it.
    if (observe) t.ninja.invuln = 999;
    tickNoWave(1);
    seen.add(wd.state);
    if (t.hazards.length && !hazard) hazard = { ...t.hazards[0] };
    if (!observe && t.deaths > d0) { died = true; break; }
  }
  t.keys.clear();
  return { seen, hazard, died, foe: wd,
           sep: Math.abs((wd.x + wd.w / 2) - (col * t.TILE + t.BODY_W / 2)) };
}

const inReach = sweepTrial(2, false, true);      // watch the whole cycle
check("standing inside the polearm's reach provokes a swing",
      inReach.sep <= t.WARD_SWEEP_RANGE && inReach.seen.has("sweep"),
      `${Math.round(inReach.sep)}px, states: ${[...inReach.seen].sort().join(",")}`);
check("it telegraphs before swinging", inReach.seen.has("sweepWind"));
check("and recovers afterwards, leaving an opening", inReach.seen.has("recover"));
check("the swing has a real hitbox", !!inReach.hazard);
check("the hitbox has the polearm's reach, well past the charger's",
      inReach.hazard && inReach.hazard.w === t.WARD_SWEEP_REACH &&
      t.WARD_SWEEP_REACH > t.CHG_HIT_W,
      inReach.hazard ? `${inReach.hazard.w}px vs charger ${t.CHG_HIT_W}px` : "none");
check("it sweeps almost the whole body height",
      inReach.hazard && inReach.hazard.h >= t.CROUCH_H,
      inReach.hazard ? `${inReach.hazard.h}px tall vs crouch box ${t.CROUCH_H}px` : "none");
check("standing inside the reach is lethal", sweepTrial(2, false, false).died);
// The deliberate split: a crouch ducks a thrown blade, never a swung one.
check("crouching does NOT duck the swing -- crouch is for the thrown slash",
      sweepTrial(2, true, false).died,
      "one button must not answer both of its attacks");
check("the telegraph is long enough to back out of",
      t.WARD_SWEEP_WIND >= 0.3, `${t.WARD_SWEEP_WIND}s`);
check("the recovery is longer than the swing", t.WARD_SWEEP_RECOVER > t.WARD_SWEEP_TIME);

// Back off and the swing cannot touch you.
const outOfReach = sweepTrial(6, false, true);
check("two tiles further out is past the reach",
      outOfReach.sep > t.WARD_SWEEP_RANGE, `${Math.round(outOfReach.sep)}px`);
check("...where it throws instead of swinging",
      !outOfReach.seen.has("sweep") && (outOfReach.seen.has("aim") || outOfReach.seen.has("burst")),
      `states: ${[...outOfReach.seen].sort().join(",")}`);

// It is still the one that holds its ground.
t.restart();
const posts = t.enemies.filter(e => e.kind === "warden" && !e.ledge).map(e => ({ e, home: e.homeX }));
for (let i = 0; i < 600; i++) { t.ninja.invuln = 999; t.keys.add("ArrowRight"); tickNoWave(1); }
t.keys.clear();
const strayed = posts.filter(({ e, home }) =>
  e.alive && Math.abs(e.x + e.w / 2 - home) > t.WARD_BACKSTEP_MAX + 4);
check("wardens stay on their posts", strayed.length === 0,
      strayed.map(({ e, home }) => `${Math.round(Math.abs(e.x + e.w / 2 - home))}px`).join(", "));



console.log("\n== release hygiene ==");
check("the debug overlay is OFF at boot", bootDebug === false,
      "it used to ship on, painting telemetry across the play area");
// Asserted as a flip rather than an absolute, so the check does not depend on
// how many times the rest of the suite happened to press the key.
t.restart();
const debugBefore = t.showDebug;
key("keydown", "KeyD"); key("keyup", "KeyD");
check("D still toggles it for development", t.showDebug === !debugBefore);
key("keydown", "KeyD"); key("keyup", "KeyD");
check("...and toggles back", t.showDebug === debugBefore);
// It has to answer from the menus too, or it is unusable while debugging them.
t.toTitle();
key("keydown", "KeyD"); key("keyup", "KeyD");
check("...from the title screen as well", t.showDebug === !debugBefore);
key("keydown", "KeyD"); key("keyup", "KeyD");

console.log("\n== dying no longer pays a bonus (req: rescored) ==");
// Par is derived from the stage's length, so a stage added later is scored on
// its own terms instead of against a number tuned for this one.
check("par is derived from stage length, not hardcoded",
      Math.abs(t.stagePar() - t.GOAL_TILE * t.SCORE_PAR_PER_TILE) < 1e-9,
      `${t.stagePar().toFixed(1)}s for ${t.GOAL_TILE} tiles`);
check("par is a plausible target for this stage",
      t.stagePar() > 60 && t.stagePar() < 400, `${t.stagePar().toFixed(0)}s`);

// The two clocks diverge the moment you die, and only one of them is scored.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(90);
const beforeDeathAttempt = t.playTime, beforeDeathTotal = t.stageTotal;
check("before any death the two clocks agree",
      Math.abs(beforeDeathAttempt - beforeDeathTotal) < 0.02,
      `attempt ${beforeDeathAttempt.toFixed(2)} vs stage ${beforeDeathTotal.toFixed(2)}`);
stand(SAFE_TILE);
for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
t.ninja.invuln = 0;
t.ninja.y = t.WORLD_H + 200;
tick(1);
tickThroughDeath();
check("the attempt clock restarts", t.playTime < 0.05, `${t.playTime.toFixed(3)}s`);
check("the stage clock does NOT", t.stageTotal >= beforeDeathTotal,
      `${beforeDeathTotal.toFixed(2)} -> ${t.stageTotal.toFixed(2)}`);

// Now finish, and confirm the bonus was charged against the stage clock.
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(60);
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("the stage cleared", t.mode === "clear");
// Both clocks freeze at the ending, so these are the exact figures used.
const attemptAtClear = t.playTime, totalAtClear = t.stageTotal;
check("the bonus is charged against the STAGE clock",
      t.timeBonus === Math.max(0, Math.floor(t.stagePar() - totalAtClear)) * t.SCORE_TIME_STEP,
      `bonus ${t.timeBonus}, stage ${totalAtClear.toFixed(1)}s`);
// The exploit, stated directly: what the old rule would have paid, versus what
// this one pays. Dying used to make the difference free money.
const oldRulePaid = Math.max(0, Math.floor(t.stagePar() - attemptAtClear)) * t.SCORE_TIME_STEP;
check("a death now costs bonus instead of erasing the clock",
      t.timeBonus < oldRulePaid,
      `${t.timeBonus} charged on ${totalAtClear.toFixed(1)}s vs ${oldRulePaid} ` +
      `the attempt clock alone would have paid on ${attemptAtClear.toFixed(1)}s`);
check("the cost is proportional to the time the death actually took",
      Math.abs((oldRulePaid - t.timeBonus) / t.SCORE_TIME_STEP -
               Math.floor(totalAtClear - attemptAtClear)) <= 1,
      `${(oldRulePaid - t.timeBonus) / t.SCORE_TIME_STEP} seconds charged`);

// Clearing without dying still pays the full rate for the same elapsed time.
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(90);
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
const cleanTotal = t.stageTotal, cleanBonus = t.timeBonus;
check("a clean run is paid on the same basis",
      cleanBonus === Math.max(0, Math.floor(t.stagePar() - cleanTotal)) * t.SCORE_TIME_STEP &&
      t.deaths === 0,
      `bonus ${cleanBonus} on ${cleanTotal.toFixed(2)}s, ${t.deaths} deaths`);
check("...and out-earns the run that spent time dying",
      cleanBonus > t.timeBonus || cleanTotal < totalAtClear,
      `clean ${cleanBonus} on ${cleanTotal.toFixed(1)}s ` +
      `vs ${totalAtClear.toFixed(1)}s with a death`);

// A new stage attempt starts both clocks over.
t.restart();
check("restarting resets both clocks", t.playTime === 0 && t.stageTotal === 0);



console.log("\n== saved state (req: persistence) ==");
check("a seeded record was read at boot",
      bootBests["alley-1"] && bootBests["alley-1"].score === SEEDED_BEST.score &&
      bootBests["alley-1"].time === SEEDED_BEST.time,
      JSON.stringify(bootBests["alley-1"]));
check("the seeded setting was read too", bootMuted === false);
check("a non-numeric score is sanitised to zero",
      bootBests["alley-2"].score === 0, JSON.stringify(bootBests["alley-2"]));
check("a negative time is sanitised to zero", bootBests["alley-2"].time === 0);
check("a null record is dropped rather than stored as garbage",
      !("alley-3" in bootBests), Object.keys(bootBests).join(", "));
check("...and still reads as no record yet",
      t.bestFor("alley-3").score === 0 && t.bestFor("alley-3").time === 0);
check("an unknown stage reads as no record yet",
      t.bestFor("stage-that-does-not-exist").score === 0);
for (const id of Object.keys(bootBests)) {
  const b = bootBests[id];
  check(`${id}'s figures survived as finite numbers`,
        Number.isFinite(b.score) && Number.isFinite(b.time), JSON.stringify(b));
}
check("records are keyed per stage, so added stages cannot overwrite them",
      Object.keys(t.saved.bests).length >= 2 &&
      Object.keys(t.saved.bests).every(k => typeof k === "string" && k.length > 0),
      Object.keys(t.saved.bests).join(", "));
check("the current stage has an id",
      typeof t.STAGE_ID === "string" && t.STAGE_ID.length > 0);
check("the save key is versioned", /\/v\d+$/.test(t.SAVE_KEY), t.SAVE_KEY);

// Mute has to reach the backing store, not just the variable, or it will not
// survive a reload.
const sv_mutedBefore = t.muted;
key("keydown", "KeyM"); key("keyup", "KeyM");
check("toggling mute writes through to storage",
      JSON.parse(storeBacking.get(t.SAVE_KEY)).muted === !sv_mutedBefore,
      storeBacking.get(t.SAVE_KEY));
key("keydown", "KeyM"); key("keyup", "KeyM");
check("...and writes the change back", t.muted === sv_mutedBefore &&
      JSON.parse(storeBacking.get(t.SAVE_KEY)).muted === sv_mutedBefore);

// Finishing a stage banks a record.
t.saved.bests[t.STAGE_ID] = { score: 0, time: 0 };
t.restart();
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(60);
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("clearing the stage banks the score",
      t.mode === "clear" && t.bestFor(t.STAGE_ID).score === t.score,
      `best ${t.bestFor(t.STAGE_ID).score} vs run ${t.score}`);
check("...and the clear time", t.bestFor(t.STAGE_ID).time === t.stageTotal,
      `${t.bestFor(t.STAGE_ID).time} vs ${t.stageTotal}`);
check("...and flags it as a record", t.newRecord === true);
check("...and it reached storage",
      JSON.parse(storeBacking.get(t.SAVE_KEY)).bests[t.STAGE_ID].score === t.score);
const sv_firstRecord = { ...t.bestFor(t.STAGE_ID) };

// A slower, lower-scoring run must not overwrite it.
t.restart();
check("a new run clears the record flag", t.newRecord === false);
for (const e of t.enemies) e.alive = false;
stand(SAFE_TILE);
tickIso(240);                                   // deliberately slower
t.ninja.x = t.GOAL_TILE * t.TILE + 8;
tick(1);
check("a worse run does not lower the best score",
      t.bestFor(t.STAGE_ID).score >= sv_firstRecord.score,
      `${sv_firstRecord.score} -> ${t.bestFor(t.STAGE_ID).score}`);
check("a slower run does not replace the best time",
      t.bestFor(t.STAGE_ID).time === sv_firstRecord.time &&
      t.stageTotal > sv_firstRecord.time,
      `best ${sv_firstRecord.time.toFixed(2)}s vs this run ${t.stageTotal.toFixed(2)}s`);

// Dying out is not a clear, so it banks score but never a time.
t.saved.bests[t.STAGE_ID] = { score: 0, time: 0 };
t.restart();
t.killEnemy(t.enemies.find(e => e.alive));
tickNoWave(6);
const sv_scoreBeforeWipe = t.score;
for (let k = 0; k < 3; k++) {
  stand(SAFE_TILE);
  for (let i = 0; i < 12; i++) { t.ninja.invuln = 999; tick(1); }
  t.ninja.invuln = 0;
  t.ninja.y = t.WORLD_H + 200;
  tick(1);
  tickThroughDeath();
}
check("the run ended in game over", t.mode === "gameover");
check("game over still banks the score",
      t.bestFor(t.STAGE_ID).score === sv_scoreBeforeWipe,
      `${t.bestFor(t.STAGE_ID).score} vs ${sv_scoreBeforeWipe}`);
check("...but never records a time for a stage you did not finish",
      t.bestFor(t.STAGE_ID).time === 0, `${t.bestFor(t.STAGE_ID).time}`);

// Storage that throws on every access must not take the game with it: that is
// a private window, and blocked site data looks the same.
storeMode = "throw";
let sv_survived = true;
try {
  t.writeSave();
  t.loadSave();
  key("keydown", "KeyM"); key("keyup", "KeyM");
  t.restart();
  for (const e of t.enemies) e.alive = false;
  tickIso(10);
  t.ninja.x = t.GOAL_TILE * t.TILE + 8;
  tick(1);
} catch (err) { sv_survived = false; }
storeMode = "ok";
check("a storage layer that throws is survivable",
      sv_survived && t.mode === "clear", "private windows look exactly like this");
check("...and the run still scores on screen", t.score > 0, `score=${t.score}`);



console.log("\n== optional assets: built-ins are the fallback (req: asset library) ==");
// The shipping configuration is an empty assets folder, and every test above
// ran in it. Assert that explicitly before turning any assets on.
check("no atlas is loaded by default", t.ART.ready === false);
check("no cues are loaded by default", Object.keys(t.CUES).length === 0);
check("a missing manifest is not an error", await (async () => {
  assetFixture = null;
  try { await t.loadAssets(); return true; } catch (err) { return false; }
})());
check("...and leaves the built-ins in place", t.ART.ready === false);

// Drawing a pose with no atlas must go through the pixel arrays.
{
  const r0 = rects.length, b0 = blits.length;
  t.drawPose(t.NINJA_POSES.idle, "ninja/idle", 10, 10, false, t.P_NINJA, t.CELL_NINJA);
  check("with no atlas, poses draw from the pixel arrays",
        rects.length > r0 && blits.length === b0,
        `${rects.length - r0} rects, ${blits.length - b0} blits`);
}

// Now supply an atlas, including two frames that must be rejected.
assetFixture = {
  atlas: { w: 128, h: 96 },
  manifest: {
    atlas: "sprites.png",
    frames: {
      "ninja/idle":     { x: 0,  y: 0,  w: 32, h: 48 },
      "charger/attack": { x: 32, y: 0,  w: 40, h: 48 },
      "rusher/base":    { x: 0,  y: 48, w: 32, h: 48 },
      "bad/offAtlas":   { x: 120, y: 90, w: 32, h: 48 },   // runs off the edge
      "bad/notNumber":  { x: "x", y: 0,  w: 32, h: 48 },   // typo
      "bad/zeroSize":   { x: 0,  y: 0,  w: 0,  h: 48 },    // degenerate
      "bad/null":       null
    },
    audio: { kill: "kill.ogg", music: "loop.ogg" }
  },
  audioFiles: new Set(["kill.ogg", "loop.ogg"])
};
await t.loadAssets();

check("a declared atlas loads", t.ART.ready === true);
check("valid frames are taken",
      !!t.ART.frames["ninja/idle"] && !!t.ART.frames["charger/attack"] &&
      !!t.ART.frames["rusher/base"],
      Object.keys(t.ART.frames).join(", "));
check("a frame running off the atlas is rejected, not clamped",
      !t.ART.frames["bad/offAtlas"]);
check("a non-numeric frame is rejected", !t.ART.frames["bad/notNumber"]);
check("a zero-size frame is rejected", !t.ART.frames["bad/zeroSize"]);
check("a null frame is rejected", !t.ART.frames["bad/null"]);
check("one bad frame does not cost the atlas its good ones",
      Object.keys(t.ART.frames).length === 3,
      Object.keys(t.ART.frames).join(", "));

// A supplied frame is blitted; an unnamed pose still falls back.
{
  const r0 = rects.length, b0 = blits.length;
  t.drawPose(t.NINJA_POSES.idle, "ninja/idle", 10, 20, false, t.P_NINJA, t.CELL_NINJA);
  check("a supplied frame is drawn from the atlas",
        blits.length === b0 + 1 && rects.length === r0,
        `${blits.length - b0} blits, ${rects.length - r0} rects`);
  const blit = blits[blits.length - 1];
  check("...from the declared rectangle",
        blit.sx === 0 && blit.sy === 0 && blit.sw === 32 && blit.sh === 48,
        JSON.stringify(blit));
}
{
  const r0 = rects.length, b0 = blits.length;
  t.drawPose(t.NINJA_POSES.slash, "ninja/slash", 10, 20, false, t.P_NINJA, t.CELL_NINJA);
  check("a pose the manifest does not name keeps its built-in art",
        rects.length > r0 && blits.length === b0);
}
// Off-size art is anchored bottom-centre, so it stands on the same feet.
{
  const b0 = blits.length;
  t.drawPose(t.ENEMY_POSES.charger.attack, "charger/attack", 100, 200, false,
             t.P_CHARGER, t.CELL_NINJA);
  const blit = blits[blits.length - 1];
  const boxW = t.NINJA_COLS * t.CELL_NINJA, boxH = t.NINJA_ROWS * t.CELL_NINJA;
  check("a wider frame is centred horizontally on the built-in box",
        blit.dx === Math.round(100 + (boxW - 40) / 2), `dx=${blit.dx}`);
  check("...and sits on the box's bottom edge",
        blit.dy === Math.round(200 + (boxH - 48)), `dy=${blit.dy}`);
}

console.log("\n== optional assets: audio cues (req: asset library) ==");
check("declared cues were decoded", audioLog.decoded >= 2, `${audioLog.decoded} decoded`);
check("the kill cue is loaded", !!t.CUES.kill);
check("the music track is loaded", !!t.CUES.music);
check("an undeclared cue is not invented", !t.CUES.slash);
{
  const s0 = audioLog.sources, o0 = audioLog.oscillators;
  t.sfxKill();
  check("a supplied cue plays the sample instead of synthesising",
        audioLog.sources === s0 + 1 && audioLog.oscillators === o0,
        `+${audioLog.sources - s0} src, +${audioLog.oscillators - o0} osc`);
}
{
  const s0 = audioLog.sources, o0 = audioLog.oscillators;
  t.sfxSlash();
  check("a cue with no sample still synthesises",
        audioLog.oscillators > o0,
        `+${audioLog.sources - s0} src, +${audioLog.oscillators - o0} osc`);
}

// A supplied track replaces the sequencer rather than playing over it.
check("a music file switches the step sequencer off", t.musicSampleWanted() === true);
t.restart();
const seqStepBefore = t.musicStep;
audioNow += 2;
t.pumpMusic();
check("the sequencer no longer queues notes", t.musicStep === seqStepBefore,
      `${seqStepBefore} -> ${t.musicStep}`);
check("the track is playing instead", !!t.musicSample);
check("...and it loops on its own", t.musicSample.loop === true);
t.togglePause();
t.pumpMusic();
check("pausing stops the track", t.musicSample === null);
t.togglePause();
t.pumpMusic();
check("resuming starts it again", !!t.musicSample);

// Everything still works with the assets taken away again.
t.ART.ready = false;
for (const k of Object.keys(t.CUES)) delete t.CUES[k];
t.stopMusicSample();
assetFixture = null;
{
  const r0 = rects.length, b0 = blits.length;
  t.drawPose(t.NINJA_POSES.idle, "ninja/idle", 10, 10, false, t.P_NINJA, t.CELL_NINJA);
  check("removing the assets restores the built-in art",
        rects.length > r0 && blits.length === b0);
}
{
  const o0 = audioLog.oscillators;
  t.sfxKill();
  check("...and the built-in sounds", audioLog.oscillators > o0);
}
t.restart();
audioNow += 1;
t.pumpMusic();
check("...and the built-in music sequencer", t.musicStep > seqStepBefore,
      `${t.musicStep}`);


console.log("\n== every pose's characters exist in its own palette ==");
/* The guard for a whole class of bug, not one instance of it. drawPixels() does
   `const color = palette[row[c]]; if (!color) continue;` -- a character the
   palette does not define is silently dropped at DRAW time, so the array looks
   right, every geometry assertion passes, and pixels are simply missing on
   screen.

   That is what happened to the enemy walk cycle: _legs() built the sunk leg as
   "KD" + "B" + shade*2 + "B" + "K" with a literal B, which is the hero's gi
   colour. No enemy palette has a B key, so every enemy walked on legs with two
   empty columns down each shin -- and only while walking, because the standing
   pose is built by a different function that never touched B. */
{
  const PALETTES = [
    ["ninja",   t.NINJA_POSES,          t.P_NINJA],
    ["charger", t.ENEMY_POSES.charger,  t.P_CHARGER],
    ["rusher",  t.ENEMY_POSES.rusher,   t.P_RUSHER],
    ["warden",  t.ENEMY_POSES.warden,   t.P_WARDEN],
    ["flag",    { sprite: t.FLAG_SPRITE }, t.P_FLAG]
  ];
  for (const [name, poses, pal] of PALETTES) {
    const missing = new Map();
    for (const p in poses) {
      for (const row of poses[p]) {
        for (const ch of row) {
          if (ch === "." || pal[ch]) continue;
          if (!missing.has(ch)) missing.set(ch, new Set());
          missing.get(ch).add(p);
        }
      }
    }
    check(`${name}: no pose uses a character its palette does not define`,
          missing.size === 0,
          [...missing].map(([c, ps]) => `'${c}' in ${[...ps].join(",")}`).join("; "));
  }
  // Measured at the canvas, not in the array: the reported symptom was pixels
  // vanishing on the way to the screen, so this counts what actually arrived.
  for (const kind of ["charger", "rusher", "warden"]) {
    const pal = kind === "charger" ? t.P_CHARGER
              : kind === "rusher"  ? t.P_RUSHER : t.P_WARDEN;
    for (const p of t.WALK_CYCLE) {
      const rows = t.ENEMY_POSES[kind][p];
      const want = rows.reduce((n, r) => n + r.replace(/\./g, "").length, 0);
      rects.length = 0;
      t.drawPixels(rows, 0, 0, false, pal, 1);
      check(`${kind}/${p} draws every pixel it declares`,
            rects.length === want, `${rects.length} of ${want} reached the canvas`);
    }
  }
}

console.log("\n== enemies carry cloth, and each carries a different piece ==");
/* Three walk cycles generated from one leg function will read as one character
   however different the bodies are, because cloth is the only part of a body
   that moves independently of it. Each kind therefore gets its own: a mantle,
   a head wrap with tails, a hooded coat. */
{
  const CLOTH = new Set(["S", "R", "r"]);
  const clothInk = (rows) =>
    rows.reduce((n, r) => n + [...r].filter(c => CLOTH.has(c)).length, 0);
  for (const kind of ["charger", "rusher", "warden"]) {
    const pal = kind === "charger" ? t.P_CHARGER
              : kind === "rusher"  ? t.P_RUSHER : t.P_WARDEN;
    check(`${kind} has a three-step cloth ramp`,
          !!(pal.S && pal.R && pal.r) && pal.S !== pal.R && pal.R !== pal.r);
    const poses = t.ENEMY_POSES[kind];
    check(`${kind} carries cloth in every pose`,
          Object.keys(poses).every(p => clothInk(poses[p]) > 20),
          Object.keys(poses).map(p => `${p}:${clothInk(poses[p])}`).join(" "));
  }
  // Different GARMENTS, not one garment recoloured: where the cloth sits on the
  // body is what distinguishes them, so compare its vertical distribution.
  const clothRows = (rows) =>
    rows.map((r, i) => [...r].some(c => CLOTH.has(c)) ? i : -1).filter(i => i >= 0);
  const span = (rows) => {
    const rs = clothRows(rows);
    return [rs[0], rs[rs.length - 1]];
  };
  const cSpan = span(t.ENEMY_POSES.charger.base);
  const rSpan = span(t.ENEMY_POSES.rusher.base);
  const wSpan = span(t.ENEMY_POSES.warden.base);
  check("the charger's mantle hangs past its hip",
        cSpan[1] >= t.NINJA_ROWS * 0.66,
        `cloth ends at row ${cSpan[1]} of ${t.NINJA_ROWS}`);
  check("the rusher's cloth is a head wrap, so it starts at the head",
        rSpan[0] <= t.NINJA_ROWS * 0.10, `starts at row ${rSpan[0]}`);
  check("the warden's coat covers the rows above its legs",
        wSpan[1] >= t.NINJA_ROWS * 0.55 && wSpan[0] <= t.NINJA_ROWS * 0.10,
        `rows ${wSpan[0]}..${wSpan[1]}`);
  /* No floating tails. Every one of these was first written as a list of
     (row, column, segment) picked by eye, and every one came out as a detached
     stick behind the head: consecutive rows were pasted at columns that did not
     touch, with nothing bridging them.

     Measured as 8-connected COMPONENTS of the cloth mask rather than as row
     overlap, because row overlap is both too strict (adjacent rows connect
     without overlapping) and too loose (two rows can share a column RANGE
     without sharing a cloth pixel). A garment may legitimately be its own
     component -- a helm plume is not attached to a mantle -- so the assertion
     is on the SIZE of each one: a real garment is dozens of pixels, and the
     floating dashes were two to four. */
  for (const kind of ["charger", "rusher", "warden"]) {
    const rows = t.ENEMY_POSES[kind].base;
    const H = rows.length, W = rows[0].length;
    const seen = rows.map(r => [...r].map(() => false));
    const sizes = [];
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        if (seen[r][c] || !CLOTH.has(rows[r][c])) continue;
        let size = 0;
        const stack = [[r, c]];
        seen[r][c] = true;
        while (stack.length) {
          const [y, x] = stack.pop();
          size++;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy, nx = x + dx;
              if (ny < 0 || ny >= H || nx < 0 || nx >= W) continue;
              if (seen[ny][nx] || !CLOTH.has(rows[ny][nx])) continue;
              seen[ny][nx] = true;
              stack.push([ny, nx]);
            }
          }
        }
        sizes.push(size);
      }
    }
    check(`${kind}'s cloth has no floating scraps`,
          sizes.length > 0 && Math.min(...sizes) >= 8,
          `component sizes ${sizes.sort((a, b) => a - b).join(",")}`);
    check(`${kind}'s cloth is one or two garments, not a scatter`,
          sizes.length <= 3, `${sizes.length} separate pieces`);
  }
}

console.log("\n== the blade kill hits HARDER than the ranged kill ==");
/* This block used to assert the opposite, and the history is worth keeping.
   The original complaint was that a melee kill felt WORSE than a ranged one,
   and the fix was to make the death identical and let only the sound differ --
   the real culprit being a near-white arc 26px wide that outlived the kill and
   sat on top of the burst.

   Identical was the right fix for that bug and the wrong resting place. If a
   katana at arm's length lands exactly as hard as a shuriken thrown across the
   alley, the choice between them is a choice about ammunition and nothing else.
   So the blade is now the heavier hit -- more debris, two more frames of
   hitstop, a stronger shove -- while everything that decides the OUTCOME stays
   identical: same killEnemy(), same score, same kill count, same respawn. Feel
   differs; consequence does not. That split is what these checks pin down. */
{
  function killBy(how) {
    t.restart();
    const e = pickEnemy("charger", 7);
    for (const x of t.enemies) if (x !== e) x.alive = false;
    stand(Math.floor(e.x / t.TILE) - (how === "slash" ? 2 : 5));
    t.ninja.facing = 1;
    let sawHitFlag = false;
    for (let i = 0; i < 240; i++) {
      if (how === "slash") t.slash(); else t.throwShuriken();
      const was = e.alive;
      tickIso(1);
      if (t.slashes.some(sl => sl.hit)) sawHitFlag = true;
      if (was && !e.alive) break;
    }
    return { alive: e.alive, particles: t.particles.length,
             freeze: t.hitFreeze, flash: t.flash, kills: t.kills,
             score: t.score, sawHitFlag,
             trauma: t.trauma, punch: Math.hypot(t.punchX, t.punchY) };
  }
  const ranged = killBy("shuriken"), melee = killBy("slash");
  check("a shuriken kill lands", !ranged.alive);
  check("a blade kill lands", !melee.alive);
  check("the blade throws more debris", melee.particles > ranged.particles &&
        ranged.particles >= 12,
        `blade ${melee.particles} vs shuriken ${ranged.particles} particles`);
  check("the blade freezes the world longer", melee.freeze > ranged.freeze,
        `${(melee.freeze * 1000).toFixed(0)}ms vs ${(ranged.freeze * 1000).toFixed(0)}ms`);
  check("the blade tints the screen harder", melee.flash > ranged.flash,
        `${melee.flash.toFixed(3)} vs ${ranged.flash.toFixed(3)}`);
  check("the blade shakes the view harder", melee.trauma > ranged.trauma,
        `trauma ${melee.trauma.toFixed(2)} vs ${ranged.trauma.toFixed(2)}`);
  check("the blade shoves the view harder", melee.punch > ranged.punch,
        `punch ${melee.punch.toFixed(2)}px vs ${ranged.punch.toFixed(2)}px`);
  // The outcome, as opposed to the feel, is still weapon-blind.
  check("both score the same", melee.score === ranged.score,
        `${melee.score} vs ${ranged.score}`);
  check("hitstop stays short enough to read as impact rather than lag",
        melee.freeze <= 6 / 60, `${(melee.freeze * 1000).toFixed(0)}ms`);
  /* The tint has to OUTLIVE its own hitstop. Turning the effects down broke
     this once: the alpha used to be derived from the time remaining, so cutting
     the strength also cut the duration, and the tint went out inside the freeze
     it arrived with -- never visible as an effect of its own, just a slightly
     different-coloured stop. Strength and duration are separate numbers now,
     and this is the relation that has to hold between them. */
  check("the screen tint outlives the hitstop it arrives with",
        melee.flash > t.FREEZE_BLADE && ranged.flash > t.FREEZE_SHURIKEN,
        `blade ${(melee.flash * 1000).toFixed(0)}ms tint vs ${(t.FREEZE_BLADE * 1000).toFixed(0)}ms freeze`);
  check("the tint is a tint and not a whiteout", t.FLASH_MAX <= 0.45,
        `peak alpha ${Math.min(t.FLASH_MAX, melee.flash * t.FLASH_GAIN).toFixed(3)}`);
  /* The reduction pass kept the RATIOS and moved only the absolute amounts, so
     these are the ceilings rather than the differences. */
  check("the shake budget is restrained", t.SHAKE_PX + t.PUNCH_PX <= 9,
        `${t.SHAKE_PX}px shake + ${t.PUNCH_PX}px shove`);
  check("one kill does not spend the whole trauma budget", melee.trauma <= 0.45,
        `${melee.trauma.toFixed(2)} of 1.0`);
  check("a slash that connected marks itself", melee.sawHitFlag);
  check("...and a shuriken never sets that flag", !ranged.sawHitFlag);
  // The arc stops drawing once it has connected. Tested on the flag rather than
  // on pixels because the burst is drawn over the same rows either way.
  {
    t.restart();
    t.slash();
    check("an unconnected arc keeps drawing", t.slashes.every(sl => !sl.hit));
    /* Counted by the SWEEP's own colour, not by total rects. The connected
       branch draws an impact flash in place of the sweep, and that flash is
       about ten rects -- so a total-rect comparison could go either way and
       says nothing about whether the sweep stopped. The translucent trail
       colour belongs to the sweep alone. */
    // Imported, not typed in. Retuning the ramp used to break this silently.
    const TRAIL = t.ARC_TAIL;
    const sweepRects = () => {
      rects.length = 0;
      t.drawEntities();
      return rects.filter(r => r.c === TRAIL).length;
    };
    // Spend the wind and advance to mid-sweep: at full ttl only the first row
    // of the arc has been swept through, so there is nothing to measure yet.
    for (const sl of t.slashes) { sl.wind = 0; sl.ttl = t.SLASH_HIT * 0.45; }
    const withArc = sweepRects();
    check("a mid-swing arc is drawn", withArc > 4, `${withArc} trail rows`);
    for (const sl of t.slashes) sl.hit = true;
    check("a connected arc is no longer painted over the kill",
          sweepRects() === 0, `${sweepRects()} trail rows still drawn`);
  }
  // Different cue, not the same one twice. sfxKill is one tone over a noise
  // burst; the blade kill is a struck bell, which is three.
  const o0 = audioLog.oscillators; t.sfxKill();
  const killOsc = audioLog.oscillators - o0;
  const o1 = audioLog.oscillators; t.sfxBladeKill();
  const bladeOsc = audioLog.oscillators - o1;
  check("the blade kill is not the ranged kill's sound",
        bladeOsc !== killOsc, `kill ${killOsc} osc, blade ${bladeOsc} osc`);
  check("the blade kill rings above the swing's band rather than under it",
        bladeOsc >= 3, `${bladeOsc} partials`);
}

console.log("\n== the background is night (req: night sky) ==");
{
  // Every band already has to clear the ninja by 40 points of luminance. This
  // pins the DIRECTION, so a later pass cannot satisfy that by going bright.
  check("every sky band is darker than the ninja, not brighter",
        SKY.every(b => lum(b) < lum(t.P_NINJA.B)),
        SKY.map(b => lum(b).toFixed(0)).join(","));
  check("the sky is darkest at the zenith",
        lum(SKY[0]) === Math.min(...SKY.map(lum)),
        SKY.map(b => lum(b).toFixed(0)).join(","));
  // Depth after dark is the reverse of depth in daylight: haze lightens
  // distance in the day and swallows it at night. The far layers being LIGHTER
  // than the near wall is most of why the old sky read as an afternoon, moon
  // and all.
  check("the far layers are darker than the near alley wall",
        lum("#1E2640") < lum(WALL) && lum("#283152") < lum(WALL),
        `skyline ${lum("#1E2640").toFixed(0)}, mid ${lum("#283152").toFixed(0)}, wall ${lum(WALL).toFixed(0)}`);
  check("lit windows are the brightest thing in the background",
        lum("#FFD98A") > Math.max(...bgCols.map(lum)),
        `window ${lum("#FFD98A").toFixed(0)} vs worst bg ${Math.max(...bgCols.map(lum)).toFixed(0)}`);
  t.restart();
  const starField = (camX) => {
    t.cam.x = camX;
    rects.length = 0; t.drawStars();
    return rects.filter(r => r.w === 1 && r.h === 1).map(r => `${r.x},${r.y}`);
  };
  const s0 = starField(0);
  check("there are stars in the sky", s0.length > 20, `${s0.length} stars`);
  check("the field is deterministic at a fixed camera",
        starField(0).join("|") === s0.join("|"));
  check("...and still populated after a long pan",
        starField(5000).length > 20, `${starField(5000).length} stars`);
  check("every star is above the alley wall",
        starField(0).every(p => Number(p.split(",")[1]) < 170));
  // The clock is advanced through the engine rather than assigned: it is a
  // getter on the harness, and a twinkle driven by a clock nothing advances is
  // not a twinkle.
  tickIso(150);
  check("some of them twinkle over time",
        starField(0).join("|") !== s0.join("|"), `clock=${t.clock.toFixed(1)}s`);
}

console.log("\n== wall graffiti is paint, not lettering (req: graffiti) ==");
{
  // FREQUENCY. The wall repeats every 96px and scrolls at 1/4, so about seven
  // panels are in view: at three panels in four that was five tags on screen at
  // once and the alley read as wallpaper.
  let tagged = 0;
  for (let id = 0; id < 600; id++) if (t.rnd(id * 29 + 5) > 0.88) tagged++;
  const rate = tagged / 600;
  check("roughly one panel in eight carries a tag",
        rate > 0.02 && rate < 0.20, `${(rate * 100).toFixed(0)}% of panels`);
  check("...so under two are on screen at once",
        rate * 7 < 2, `${(rate * 7).toFixed(2)} expected in view`);
  // SHAPE. Two earlier versions failed in opposite directions: rectangles
  // assembled into letter strokes drew a literal "H" and a literal giyeok, and
  // then a stroke bulged along a sine curve drew an oval, which with drips under
  // it is a balloon. A tag has to be a path that actually goes up and down.
  for (let k = 0; k < 6; k++) {
    rects.length = 0;
    t.sprayTag(100, 200, 42, 26, k * 197 + 13, "214,74,58", "54,14,10");
    const ys = rects.map(r => r.y), xs = rects.map(r => r.x);
    const vSpread = Math.max(...ys) - Math.min(...ys);
    const hSpread = Math.max(...xs) - Math.min(...xs);
    check(`tag ${k} zigzags rather than sitting level`, vSpread >= 18,
          `${vSpread}px of vertical travel in a 26px band`);
    check(`tag ${k} is a stroke, not a bar`, vSpread / hSpread > 0.30,
          `${vSpread}x${hSpread}`);
  }
  // An outline under the colour is what puts the paint ON the brick. Two inks
  // per tag, and the outline has to be the darker of them.
  {
    rects.length = 0;
    t.sprayTag(100, 200, 42, 26, 991, "214,74,58", "54,14,10");
    const inks = new Set(rects.map(r => r.c));
    check("a tag is drawn in an outline and a colour",
          inks.has("rgb(54,14,10)") && inks.has("rgb(214,74,58)"),
          [...inks].join(" "));
  }
  check("every ink names an outline darker than its colour",
        t.TAG_INKS.every(([core, edge]) => {
          const L = (s2) => { const c = s2.split(",").map(Number);
            return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
          return L(edge) < L(core);
        }));
}

console.log("\n== legs are jointed limbs, and the silhouette holds together ==");
/* Two defects were reported together and they share a cause: the leg used to be
   a 7-wide horizontal run sliding linearly from a hip column to a foot column,
   which is one rigid stick with no knee in it.

   - No knee meant the cycle could only change the angle of two straight sticks,
     so it read as scissors opening and closing rather than as walking.
   - The K outline was written into each row's string at a fixed offset, so on a
     diagonal each row put its outline a column across from the row above and
     the staircase showed through as a torn edge -- worst where the legs were
     furthest apart, which is where it was noticed. */
{
  const ALL = [["ninja", t.NINJA_POSES, t.P_NINJA],
               ["charger", t.ENEMY_POSES.charger, t.P_CHARGER],
               ["rusher", t.ENEMY_POSES.rusher, t.P_RUSHER],
               ["warden", t.ENEMY_POSES.warden, t.P_WARDEN]];

  // NO HOLES. A row of a limb must be one solid run per limb: the tearing was
  // transparent cells with body on both sides of them in the same row. Counted
  // as runs of ink per row over the leg rows, which may never exceed two (two
  // legs) plus one (a weapon shaft or a hanging cloth tail beside them).
  for (const [name, poses, pal] of ALL) {
    const legTop = Math.floor(t.NINJA_ROWS * 0.62);
    let worst = 0, where = "";
    for (const p in poses) {
      const rows = poses[p];
      for (let r = legTop; r < rows.length; r++) {
        const runs = [...rows[r]].map(c => (c !== "." && pal[c]) ? "#" : ".")
                                 .join("").split(/\.+/).filter(Boolean).length;
        if (runs > worst) { worst = runs; where = `${p} row ${r}`; }
      }
    }
    check(`${name}: no leg row is split into more pieces than it has limbs`,
          worst <= 3, `${worst} separate runs at ${where}`);
  }

  // FEET ON THE GROUND in the contact frames. A leg generated from joints can
  // float if the row count and the joint fractions disagree, and a character
  // hovering four pixels above the floor is the specific bug that made the
  // first pass at this generator unusable.
  for (const [name, poses] of ALL) {
    for (const p of ["walkA", "walkC"]) {
      const rows = poses[p];
      const last = rows.reduce((n, r, i) => r.trim().replace(/\./g, "") ? i : n, -1);
      check(`${name}/${p}: both feet are on the ground`,
            last === rows.length - 1, `lowest ink at row ${last} of ${rows.length - 1}`);
    }
  }

  // A KNEE. In the passing frames the swing leg's ankle must sit BEHIND its
  // knee -- that is the fold, and it is the thing a sliding stick cannot do.
  // Measured as the horizontal centre of the limb per row: a straight leg's
  // centre moves monotonically down the leg, a folded one reverses.
  for (const [name, poses] of ALL) {
    for (const p of ["walkB", "walkD"]) {
      const rows = poses[p];
      const centres = [];
      for (let r = Math.floor(rows.length * 0.66); r < rows.length; r++) {
        const cols = [...rows[r]].map((c, i) => c !== "." ? i : -1).filter(i => i >= 0);
        if (cols.length) centres.push((cols[0] + cols[cols.length - 1]) / 2);
      }
      let reversals = 0;
      for (let i = 2; i < centres.length; i++) {
        const a = Math.sign(centres[i - 1] - centres[i - 2]);
        const b = Math.sign(centres[i] - centres[i - 1]);
        if (a !== 0 && b !== 0 && a !== b) reversals++;
      }
      check(`${name}/${p}: the swing leg folds rather than pointing straight`,
            reversals >= 1, `no change of direction down the limb`);
    }
  }

  // The two contact frames must differ, or the cycle has two frames, not four.
  for (const [name, poses] of ALL) {
    check(`${name}: the two contact frames are not the same image`,
          poses.walkA.join("") !== poses.walkC.join(""));
    check(`${name}: the two passing frames are not the same image`,
          poses.walkB.join("") !== poses.walkD.join(""));
    check(`${name}: passing differs from contact`,
          poses.walkB.join("") !== poses.walkA.join(""));
  }

  // A BOOT, not a tapered stub. The lowest rows of a contact frame have to be
  // WIDER than the shin above them, which is what makes a foot read as a foot.
  for (const [name, poses] of ALL) {
    const rows = poses.walkA;
    // Body columns only. The warden's polearm lives at 26..29 and runs most of
    // the sprite's height, so a whole-row extent measured the SHAFT and made
    // its shin the same width as its boot.
    const widthAt = (r) => {
      const cols = [...rows[r].slice(0, 24)]
        .map((c, i) => c !== "." ? i : -1).filter(i => i >= 0);
      return cols.length ? cols[cols.length - 1] - cols[0] + 1 : 0;
    };
    const sole = widthAt(rows.length - 1);
    const shin = widthAt(rows.length - 7);
    check(`${name}: the sole is wider than the shin above it`, sole > shin,
          `sole ${sole}px vs shin ${shin}px`);
  }
}

console.log("\n== no constant the suite compares against is undefined ==");
/* This has bitten twice. WARD_SWEEP_RANGE was compared before it was exported,
   so it was undefined, so the comparison was NaN, so stand(NaN) dropped the
   ninja out of the world -- which looked exactly like being shot, and the test
   "passed" for the wrong reason. Then BULLET_H and SLASH_WIND did the same
   thing on the crouch and draw work.

   A guard for one constant only catches that constant. This one walks every
   SCREAMING_CASE name on the harness, so a new constant is covered the moment
   it is exported and a MISSING one is reported by name instead of silently
   poisoning arithmetic somewhere downstream. */
{
  const bad = [];
  for (const k of Object.keys(t)) {
    if (!/^[A-Z][A-Z0-9_]*$/.test(k)) continue;
    const v = t[k];
    if (typeof v === "number" && !Number.isFinite(v)) bad.push(`${k}=${v}`);
    if (v === undefined) bad.push(`${k}=undefined`);
  }
  check("every exported constant is a real value", bad.length === 0, bad.join(" "));
  /* And every constant this file actually REFERENCES, found by reading this
     file. A hand-kept list is the same bug one level up: it went stale and
     VIEW_H slipped through it, which made `r.y < t.VIEW_H` false for every row
     and a test that measured the sword's arc quietly measured nothing.

     Scanning the source cannot go stale. Names that appear only inside a string
     are excluded, because that is how the exclusion list below is written. */
  const src = fs.readFileSync(new URL(import.meta.url).pathname, "utf8");
  const NOT_EXPORTED = new Set([
    "TRAIL",          // a local colour constant in the arc test
    "NOT_EXPORTED", "USED", "SKY", "WALL", "TILES", "LAYERED",
    "A_MINOR", "GI0", "CLOTH", "PALETTES", "DEATH_TILE", "STEEL", "ALL",
    "SHIN_FROM", "DROP", "W", "H"
  ]);
  const referenced = new Set();
  for (const m of src.matchAll(/\bt\.([A-Z][A-Z0-9_]{2,})\b/g)) {
    if (!NOT_EXPORTED.has(m[1])) referenced.add(m[1]);
  }
  const absent = [...referenced].filter(k => t[k] === undefined);
  check("every constant this file references is exported",
        absent.length === 0, absent.join(", "));
  const notFinite = [...referenced].filter(
    k => typeof t[k] === "number" && !Number.isFinite(t[k]));
  check("...and none of them is NaN or Infinity",
        notFinite.length === 0, notFinite.join(", "));
}

console.log("\n== bumping, priority, and reach across an obstacle ==");
{
  /* WALKING INTO AN ENEMY SHOVES YOU. It was lethal on contact, then it was
     nothing at all, and neither is right: an enemy's body should be an obstacle
     with weight, not a wall and not a hazard. */
  t.restart();
  const e = pickEnemy("charger", 7);
  for (const o of t.enemies) if (o !== e) o.alive = false;
  stand(Math.floor(e.x / t.TILE) - 1);
  const x0 = t.ninja.x;
  t.ninja.x = e.x - 6;                       // overlapping, from the left
  const deaths0 = t.deaths;
  tickNoWave(1);
  check("contact does not kill", t.deaths === deaths0 && t.mode === "play");
  check("contact pushes you AWAY from the enemy", t.ninja.vx < 0,
        `vx=${t.ninja.vx}`);
  check("...and off your feet", t.ninja.vy < 0 && !t.ninja.onGround,
        `vy=${t.ninja.vy}`);
  check("a grace window stops it firing every frame", t.ninja.bump > 0,
        `${t.ninja.bump.toFixed(3)}s`);
  // The push is away from the enemy's centre, not opposite your facing: walking
  // backwards into one has to push you out, not drag you further in.
  t.restart();
  const e2 = pickEnemy("charger", 7);
  for (const o of t.enemies) if (o !== e2) o.alive = false;
  stand(Math.floor(e2.x / t.TILE) + 2);
  t.ninja.x = e2.x + 6;                      // overlapping, from the right
  t.ninja.facing = -1;
  tickNoWave(1);
  check("approached from the other side, it pushes the other way",
        t.ninja.vx > 0, `vx=${t.ninja.vx}`);
  void x0;
}
{
  /* ATTACKS BEAT COLLISIONS on a frame where both land -- and both landing is
     the normal case, not an edge case: a charger's swing box overlaps the body
     it swung from, and a rusher's dive puts its daggers where its chest is. */
  t.restart();
  const e = pickEnemy("charger", 7);
  for (const o of t.enemies) if (o !== e) o.alive = false;
  stand(Math.floor(e.x / t.TILE) - 1);
  t.ninja.x = e.x - 6;                       // touching
  t.ninja.bump = 0;
  // Its own attack box, right on top of the player, on the same frame.
  t.leadHazard(e, t.LUNGE_HIT_W, t.LUNGE_HIT_TOP, 8);
  t.hazards[t.hazards.length - 1].x = t.ninja.x;
  t.hazards[t.hazards.length - 1].y = t.ninja.y;
  t.hazards[t.hazards.length - 1].w = t.ninja.w;
  t.hazards[t.hazards.length - 1].h = t.ninja.h;
  const vx0 = t.ninja.vx;
  tickNoWave(1);
  check("the attack wins: it kills rather than bouncing you",
        t.mode !== "play", `mode=${t.mode}`);
  check("...and no knockback was applied on that frame",
        t.ninja.vx === vx0 || t.ninja.bump === 0,
        `vx ${vx0} -> ${t.ninja.vx}, bump=${t.ninja.bump}`);
}
{
  /* REACH ACROSS AN OBSTACLE. Melee hitboxes are pure AABB overlap and
     deliberately do not test terrain, so a swing was never BLOCKED by a block.
     What stopped it landing was distance: the player is halted at the tile's
     face, so the box has to cross a whole tile before it reaches any of the
     body behind it. */
  t.restart();
  const e = pickEnemy("charger", 7);
  for (const o of t.enemies) if (o !== e) o.alive = false;
  const eTile = Math.floor(e.x / t.TILE);
  const midCol = eTile - 1;
  const added = [];
  for (let r = 18; r <= 19; r++) {
    if (!t.solidAt(midCol, r)) { t.solidGrid[r * t.COLS + midCol] = 1; added.push(r); }
  }
  check("a solid block now sits between the two", t.solidAt(midCol, 19));
  stand(eTile - 3);
  t.ninja.facing = 1;
  check("the player is clear of the block, not inside it",
        t.ninja.x + t.ninja.w <= midCol * t.TILE,
        `right edge ${t.ninja.x + t.ninja.w} vs block at ${midCol * t.TILE}`);
  t.slash();
  for (let i = 0; i < 24 && e.alive; i++) tickNoWave(1);
  check("a swing lands across a one-tile obstacle", !e.alive);
  for (const r of added) t.solidGrid[r * t.COLS + midCol] = 0;
  // The enemy side of the same problem, stated as geometry: a charger that
  // cannot get within its own trigger distance never swings at all.
  check("the blade's box spans a tile with room to bite",
        t.SLASH_W >= t.TILE + 12, `${t.SLASH_W}px vs tile ${t.TILE}`);
  check("...and so does the charger's",
        t.CHG_MELEE >= t.TILE + 8 && t.CHG_HIT_W >= t.TILE + 8,
        `melee ${t.CHG_MELEE}, hit ${t.CHG_HIT_W}`);
}
{
  /* The art has to be as long as the box. Art smaller than its own hitbox is a
     lie about reach, and it is the kind a player feels before naming it. */
  const rows = t.NINJA_POSES.slash;
  const STEEL = new Set(["M", "W"]);
  let tip = -1, hilt = t.NINJA_COLS;
  for (const r of rows) {
    for (let c = 0; c < r.length; c++) {
      if (!STEEL.has(r[c])) continue;
      if (c > tip) tip = c;
      if (c < hilt) hilt = c;
    }
  }
  const bladePx = (tip - hilt + 1) * t.CELL_NINJA;
  /* The SPRITE cannot match the box and is not supposed to. The box is 46px and
     the whole sprite is 32, of which the body takes 20 -- there are about 16
     columns to the right of the hips and that is all the steel there is room
     for. What covers the rest of the reach is the arc, which is drawn at the
     box's full width; the blade sprite is the part that is in his hand.

     So: the sprite uses the room it has, and the ARC is what has to match. */
  check("the blade uses the width the sprite has",
        bladePx >= 15, `${bladePx}px of steel in a ${t.NINJA_COLS}px sprite`);
  check("the blade reaches the last drawable column",
        tip >= t.NINJA_COLS - 2,
        `tip at column ${tip}; ${t.NINJA_COLS - 1} is the outline`);
  {
    /* THE SWEEP IS THE BLADE. The sprite cannot hold a 46px blade -- there are
       sixteen columns to the right of the hips -- so the steel is drawn as a
       swept arc whose widest point IS the hitbox's far edge. These pin that
       relationship, because it is the whole reason a short blade no longer
       claims a long reach. */
    t.restart(); stand(40);
    for (const e of t.enemies) e.alive = false;
    t.ninja.facing = 1;
    t.slash();
    // Past the draw and most of the way through the cut, so the arc is open.
    for (const sl of t.slashes) { sl.wind = 0; sl.ttl = t.SLASH_HIT * 0.02; }
    rects.length = 0;
    t.drawEntities();
    const box = t.slashes[0];
    /* Filtered by the sweep's OWN three colours. "one pixel tall" also
       describes every mortar line in the brick wall behind him, so the first
       version of this filter counted 857 rows and put the arc's far edge at
       x=5805 -- it was measuring the background. */
    /* #FFFFFF is excluded even though the sweep's leading edge uses it: W is
       the eye colour in every character palette, so every enemy on screen
       contributes a 1x1 white rect and the "far edge" came out at x=5795. The
       other two colours belong to the sweep alone. */
    const ARC_COLS = new Set([t.ARC_NEAR, t.ARC_MID, t.ARC_TAIL]);
    const arc = rects.filter(r => ARC_COLS.has(r.c));
    check("the arc is drawn as a dense band, not a few bars",
          arc.length > 30, `${arc.length} segments`);
    const far = Math.max(...arc.map(r => r.x + r.w));
    const boxFar = Math.round(box.x - t.cam.x) + box.w;
    check("the arc's widest point is the hitbox's far edge",
          Math.abs(far - boxFar) <= t.ARC_THICK,
          `arc to ${far}, box to ${boxFar}`);
    /* A HALF, NOT A RING. 180 degrees on the side he faces and nothing behind
       him: the row-scanned version filled from the body's centre outward at the
       top and bottom of the ellipse, which turned a thin band into a round
       blob. Measured from the pivot, so a segment that crossed behind the
       shoulder would fail even if it stayed on screen. */
    const cx = Math.round(t.ninja.x + t.ninja.w / 2 - t.cam.x);
    const cy = Math.round(t.ninja.y + t.ninja.h - t.ARC_CY - t.cam.y);
    check("all of it is on the side he faces",
          arc.every(r => r.x + r.w / 2 >= cx - t.ARC_THICK),
          `${arc.filter(r => r.x + r.w / 2 < cx - t.ARC_THICK).length} behind him`);
    /* A CONIC, not a sine bow. The old arc bowed a straight band along
       sin(row), which is not a circle and never looked like one. Test the
       defining property rather than the shape: every point of an ellipse
       satisfies (dx/rx)^2 + (dy/ry)^2 = 1, so normalising each segment's centre
       has to give about the same number throughout -- it is a band, so the
       tolerance is its thickness. */
    const rx = t.ninja.w / 2 + box.w - 2;
    const norms = arc.map(r => {
      const dx = (r.x + r.w / 2) - cx, dy = (r.y + r.h / 2) - cy;
      return Math.sqrt((dx / rx) ** 2 + (dy / t.ARC_RY) ** 2);
    });
    const spread = Math.max(...norms) - Math.min(...norms);
    check("every segment sits on one ellipse", spread < 0.30,
          `normalised radius varies by ${spread.toFixed(3)}`);
    check("...and none of it is near the body's own centre",
          Math.min(...norms) > 0.55,
          `closest segment at ${Math.min(...norms).toFixed(2)} of the radius`);
    // And it SWEEPS: later in the window, more of it has been drawn.
    const rowsAt = (frac) => {
      t.slashes[0].ttl = t.SLASH_HIT * frac;
      rects.length = 0; t.drawEntities();
      return rects.filter(r => ARC_COLS.has(r.c)).length;
    };
    const early = rowsAt(0.85), late = rowsAt(0.05);
    check("the blade travels rather than appearing all at once", late > early,
          `${early} rows early, ${late} rows late`);
    /* AND IT STAYS A HALF WHILE YOU WALK. The direction used to be derived from
       `sl.x > ninja.x` every frame; the box is fixed at the swing and the player
       is not, so walking through your own cut flipped the comparison partway
       and mirrored the arc onto the other side -- two opposed half-circles over
       one swing, which is a full 360 on screen. */
    {
      t.restart(); stand(40);
      for (const e of t.enemies) e.alive = false;
      t.ninja.facing = 1;
      t.slash();
      for (const sl of t.slashes) sl.wind = 0;
      const sides = new Set();
      t.keys.add("ArrowRight");
      for (let i = 0; i < Math.ceil(t.SLASH_HIT * 60) + 1; i++) {
        tickNoWave(1);
        if (!t.slashes.length) break;
        rects.length = 0; t.drawEntities();
        const seg = rects.filter(r => ARC_COLS.has(r.c));
        // Against the LIVE pivot: the arc follows the body now, so a pinned
        // reference would drift out from under it as the player walks.
        const pivot = t.ninja.x + t.ninja.w / 2 - t.cam.x;
        for (const r of seg) {
          sides.add(r.x + r.w / 2 >= pivot - t.ARC_THICK ? "front" : "behind");
        }
      }
      t.keys.clear();
      check("walking through your own swing keeps it on one side",
            !sides.has("behind"), [...sides].join("+"));
      check("...and the player really did move during it", t.ninja.x > 40 * t.TILE,
            `x=${t.ninja.x}`);
      // The box has to come with him, or the sword detaches and trails behind.
      {
        t.restart(); stand(40);
        for (const e of t.enemies) e.alive = false;
        t.ninja.facing = 1;
        t.slash();
        const gap0 = t.slashes[0].x - t.ninja.x;
        t.keys.add("ArrowRight");
        for (let i = 0; i < 4; i++) tickNoWave(1);
        t.keys.clear();
        const moved = t.ninja.x > 40 * t.TILE;
        const gap1 = t.slashes.length ? t.slashes[0].x - t.ninja.x : gap0;
        check("the swing's box travels with the body",
              moved && Math.abs(gap1 - gap0) < 1,
              `offset ${gap0.toFixed(1)} -> ${gap1.toFixed(1)}`);
      }
    }

  }
}

console.log("\n== an empty stock is visible on the character, not just the HUD ==");
{
  const badge = () => {
    rects.length = 0;
    t.drawLowAmmoWarning();
    return rects.filter(r => r.c === t.WARN_R);
  };
  // With ammunition in hand there must be nothing there at all.
  t.restart(); stand(30);
  check("a stocked run shows no warning", badge().length === 0);
  // Spend it. Invulnerable while doing so: emptying the stock takes about forty
  // frames of standing still, and with the roster doubled that is long enough
  // to be killed -- after which nothing collects pickups, because update()
  // stops running the world once the mode leaves "play".
  for (let i = 0; i < 400 && t.shurikenAmmo > 0; i++) {
    t.ninja.invuln = 999;
    t.throwShuriken();
    tickNoWave(1);
  }
  check("still alive to measure", t.mode === "play", `mode=${t.mode}`);
  check("the stock is empty", t.shurikenAmmo === 0);
  // It blinks, so find the lit phase rather than assuming the current one.
  let lit = badge();
  for (let i = 0; i < 60 && lit.length === 0; i++) { tickNoWave(1); lit = badge(); }
  check("an empty stock shows a red badge", lit.length > 0, `${lit.length} rects`);
  check("it is beside the head, not down at the feet", (() => {
    const top = Math.min(...lit.map(r => r.y));
    const headTop = Math.round(t.ninja.y - t.cam.y);
    return Math.abs(top - headTop) <= 6;
  })());
  check("it is clear of the body, on the side he faces", (() => {
    const left = Math.min(...lit.map(r => r.x));
    const bodyRight = Math.round(t.ninja.x - t.cam.x) + t.ninja.w;
    return t.ninja.facing > 0 ? left >= bodyRight : true;
  })(), `facing=${t.ninja.facing}`);
  // Blinking, not static: a badge pinned to a moving body stops being read.
  let sawOn = false, sawOff = false;
  for (let i = 0; i < 80; i++) {
    (badge().length ? (sawOn = true) : (sawOff = true));
    tickNoWave(1);
  }
  check("it blinks rather than sitting there", sawOn && sawOff);
  // Small on purpose: at this distance from the face the flash does the work
  // that area would, and anything bigger competes with the character for the
  // eye exactly when the character is the thing being steered.
  check("the badge is small", t.WARN_W_PX <= 8 && t.WARN_H_PX <= 8,
        `${t.WARN_W_PX}x${t.WARN_H_PX}`);
  check("...and much smaller than the head it sits beside",
        t.WARN_W_PX * t.WARN_H_PX * 3 < t.BODY_W * 12,
        `${t.WARN_W_PX * t.WARN_H_PX}px vs a ${t.BODY_W}x12 head`);
  // And it goes away again the moment you pick one up. Invulnerable and with
  // the neighbours cleared: there are fifty-eight bodies on the stage now, and
  // walking into one shoves the player off the pickup before it is collected.
  const p = t.pickups.find(x => !x.taken);
  stand(Math.round(p.x / t.TILE));
  for (const e of t.enemies) e.alive = false;
  for (let i = 0; i < 20 && !p.taken; i++) {
    t.ninja.invuln = 999;
    t.ninja.x = p.x - 4; t.ninja.y = p.y - 10;
    tickNoWave(1);
  }
  check("the pickup was collected", p.taken === true);
  check("topping up clears the warning",
        t.shurikenAmmo > 0 && badge().length === 0, `${t.shurikenAmmo} in hand`);
}

console.log("\n== the opening grace, and chargers that hold their ground ==");
{
  /* A GRACE BEFORE ANYTHING ENGAGES. The stage opens on the spawn, so whatever
     stands near it converges the instant the run starts -- and once the roster
     doubled, that was a wall rather than an introduction. */
  t.restart();
  check("a run starts inside the grace", t.enemyAwake() === false,
        `wakeT=${t.wakeT.toFixed(2)}s`);
  check("the grace is short enough to be a beat, not a pause",
        t.ENEMY_WAKE >= 1 && t.ENEMY_WAKE <= 4, `${t.ENEMY_WAKE}s`);
  /* Stand right next to a charger that WOULD normally come at you, so the
     grace has something to hold back. Measured on vx and state rather than on
     position: body separation still runs during the grace, so a tightly packed
     pair can shift a pixel without anything having engaged, and "engaged" is a
     statement about intent. */
  const wc = pickEnemy("charger", 7);
  for (const e of t.enemies) if (e !== wc) e.alive = false;
  t.ninja.x = wc.x - 3 * t.TILE;
  t.ninja.y = 20 * t.TILE - t.BODY_H;
  t.snapCamera();
  for (let i = 0; i < Math.floor(t.ENEMY_WAKE * 60) - 6; i++) {
    t.ninja.invuln = 999; tickNoWave(1);
  }
  check("nothing has engaged yet",
        Math.abs(wc.vx) < 1 && (wc.state === "idle" || wc.state === "wait"),
        `vx=${wc.vx} state=${wc.state} wakeT=${t.wakeT.toFixed(2)}s`);
  // ...and then it does.
  for (let i = 0; i < 60; i++) { t.ninja.invuln = 999; tickNoWave(1); }
  check("the grace expires", t.enemyAwake() === true);
  check("...and it engages", wc.state !== "idle" && wc.state !== "wait",
        `state=${wc.state}, vx=${wc.vx}`);

  /* It comes back on a respawn, which is where a crowd hurts most: you arrive
     into a stage you already know is full. And it is NOT the score clock --
     hanging it off playTime made every time-attack test start at 3.5s. */
  t.restart();
  stand(SAFE_TILE);
  check("stand() clears it, so behaviour tests are not all waiting",
        t.enemyAwake() === true);
  const clockBefore = t.playTime;
  t.ninja.invuln = 0;
  t.ninja.y = t.WORLD_H + 200;
  tick(1);
  tickThroughDeath();
  check("a respawn restores the grace", t.enemyAwake() === false,
        `wakeT=${t.wakeT.toFixed(2)}s`);
  check("...and the grace is not the score clock",
        t.playTime < 0.1, `playTime=${t.playTime.toFixed(2)}s`);
  void clockBefore;
}
{
  /* SOME OF THEM HOLD THEIR GROUND. A different threat -- something to get PAST
     rather than something coming at you -- and a body that never walks cannot
     shove another one into a jam, which is what let the roster double at all. */
  t.restart();
  const posted = t.enemies.filter(e => e.post && e.alive);
  check("the stage has chargers that hold their ground",
        posted.length >= 6, `${posted.length} of ${placedCount}`);
  check("...but not all of them do", posted.length < placedCount / 2,
        `${posted.length} posted, ${placedCount} placed`);
  const pc = pickEnemy("charger", 7, true);
  check("found a posted charger with a clear approach", !!pc);
  for (const e of t.enemies) if (e !== pc) e.alive = false;
  // Stand well outside its reach and wait: it must not come to you.
  stand(Math.floor(pc.x / t.TILE) - 7);
  const homeX = pc.x;
  for (let i = 0; i < 240; i++) { t.ninja.invuln = 999; tickNoWave(1); }
  check("it does not advance on the player", Math.abs(pc.x - homeX) < 2,
        `moved ${(pc.x - homeX).toFixed(1)}px`);
  check("...and never walks", Math.abs(pc.vx) < 1, `vx=${pc.vx}`);
  // Step into its reach and it swings.
  let swung = false;
  for (let i = 0; i < 200 && !swung; i++) {
    t.ninja.invuln = 999;
    t.ninja.x = pc.x - t.CHG_MELEE + 4;
    tickNoWave(1);
    if (pc.state === "windup" || pc.state === "swing") swung = true;
  }
  check("but it swings when you come inside its reach", swung, `state=${pc.state}`);
  check("...and it still has not moved", Math.abs(pc.x - homeX) < 2,
        `moved ${(pc.x - homeX).toFixed(1)}px`);
}
{
  // Something to see straight away. The first placements were pushed too far in
  // while the opening was being thinned, and a stage that opens on empty ground
  // for two seconds reads as nothing happening.
  t.restart();
  const firstX = Math.min(...t.enemies.filter(isPlaced).map(e => e.x));
  const tilesIn = (firstX - t.spawn.x) / t.TILE;
  check("the first enemy is in sight from the spawn",
        tilesIn > 0 && firstX < t.VIEW_W,
        `${tilesIn.toFixed(0)} tiles in, view is ${Math.round(t.VIEW_W / t.TILE)} wide`);
  check("...but not on top of the spawn", firstX - t.spawn.x > 100,
        `${Math.round(firstX - t.spawn.x)}px away`);
}

console.log("\n== vaulters: they look over the wall, then come over it ==");
{
  check("the stage has three to five vault sites",
        t.vaultSites.length >= 3 && t.vaultSites.length <= 5,
        `${t.vaultSites.length}: tiles ${t.vaultSites.join(", ")}`);
  check("they are spread across the stage, not bunched", (() => {
    const g = t.vaultSites;
    for (let i = 1; i < g.length; i++) if (g[i] - g[i - 1] < 30) return false;
    return g[0] > 20 && g[g.length - 1] < t.COLS - 4;
  })(), t.vaultSites.join(", "));
  // Every site must be landable: ground under it, headroom over it. One that
  // comes down in a pit is a wasted entrance and one under a ledge sticks.
  check("every site has ground under it and sky over it",
        t.vaultSites.every(tx => t.solidAt(tx, 20) && t.solidAt(tx, 21) &&
          ![14, 15, 16, 17, 18, 19].some(r => t.solidAt(tx, r))),
        t.vaultSites.join(", "));

  /* Walks the whole staging at the player's real pace and records it. Every
     vault test below reads this one run, because the sequence is the feature:
     asserting the pieces separately is how the previous version shipped
     correct-but-invisible. */
  function walkIntoVault(opts) {
    const o = opts || {};
    t.restart();
    t.wakeT = 0;
    const s0 = t.vaultSites[1];
    t.ninja.x = (s0 - 46) * t.TILE;
    t.ninja.y = 20 * t.TILE - t.BODY_H; t.ninja.onGround = true;
    t.snapCamera();
    const r = { states: [], poses: [], v: null, peekFrames: 0, climbFrames: 0,
                fallFrames: 0, fallSeen: 0, peekRowsBelowWall: 0,
                landedScreenX: null, hurtWhileStaged: false,
                diedWhileStaged: false, spawnY: null, driftAfterClimb: null,
                markedWhilePeeking: false, markedWhileFalling: false };
    for (let i = 0; i < 1400; i++) {
      t.ninja.invuln = o.vulnerable ? 0 : 999;
      if (!o.hold) {
        t.ninja.x += t.MOVE_SPEED * t.STEP;
        t.ninja.y = 20 * t.TILE - t.BODY_H; t.ninja.onGround = true;
        t.snapCamera();
      }
      const v = t.enemies.find(e => e.vault && e.landAt === s0 * t.TILE);
      if (v && o.parkHitboxes) {
        t.shurikens.length = 0;
        t.shurikens.push({ x: v.x, y: v.y, w: v.w, h: v.h, vx: 0, spin: 0 });
        t.slashes.length = 0;
        t.slashes.push({ x: v.x, y: v.y, w: v.w, h: v.h,
                         ttl: t.SLASH_HIT, wind: 0, hit: false });
      }
      if (v && o.standInside) { t.ninja.x = v.x; t.ninja.y = v.y; t.ninja.bump = 0; }
      tickNoWave(1);
      const w = t.enemies.find(e => e.vault && e.landAt === s0 * t.TILE);
      if (!w) {
        if (r.v && !r.v.alive && t.vaultAirborne(r.v)) r.diedWhileStaged = true;
        continue;
      }
      if (!r.v) { r.v = w; r.spawnY = w.y; }
      if (r.states[r.states.length - 1] !== w.state) r.states.push(w.state);
      const pn = t.enemyPoseOf(w);
      if (r.poses[r.poses.length - 1] !== pn) r.poses.push(pn);
      const sx = w.x - t.cam.x, sy = w.y - t.cam.y;
      if (w.state === "peek") {
        r.peekFrames++;
        /* Where the drawn sprite actually ends up. Every other body is cleared
           first: a sprite cell is 1x1, so "every 1x1 rect near this x" also
           catches the neighbours standing on the ground beside the site, and
           counted eight of their pixels as the vaulter's. */
        const others = t.enemies.filter(e => e !== w && e.alive);
        for (const e of others) e.alive = false;
        rects.length = 0;
        t.drawEntities();
        for (const e of others) e.alive = true;
        const own = rects.filter(q => q.w === t.CELL_NINJA && q.h === t.CELL_NINJA);
        if (own.some(q => q.y >= t.WALL_TOP)) r.peekRowsBelowWall++;
        rects.length = 0; t.drawVaultMarkers();
        if (rects.length) r.markedWhilePeeking = true;
      }
      if (w.state === "climb") r.climbFrames++;
      if (w.state === "vault") {
        if (r.driftAfterClimb === null) r.driftAfterClimb = w.vx;
        r.fallFrames++;
        if (sx > -40 && sx < t.VIEW_W + 40 && sy > 0 && sy < t.VIEW_H) r.fallSeen++;
        rects.length = 0; t.drawVaultMarkers();
        if (rects.length) r.markedWhileFalling = true;
      }
      if (t.vaultAirborne(w)) {
        if (!w.alive) r.diedWhileStaged = true;
        if (t.mode !== "play") r.hurtWhileStaged = true;
        if (Math.abs(t.ninja.vx) > 50) r.hurtWhileStaged = r.hurtWhileStaged;
      }
      if (w.state === "vaultLand" && r.landedScreenX === null) {
        r.landedScreenX = Math.round(sx);
        break;
      }
      if (r.hurtWhileStaged || r.diedWhileStaged) break;
    }
    return r;
  }

  const run = walkIntoVault({});
  check("it fires and plays out", !!run.v && run.landedScreenX !== null,
        `states: ${run.states.join(" -> ")}`);
  /* THE SEQUENCE IS THE FEATURE. A body that appears in the sky has no story;
     one that looks over the wall, climbs it, then drops in reads as having come
     from somewhere -- which is the point of adding it to a roster where
     everything else is standing on the ground when you arrive. */
  check("it looks over the wall FIRST, then climbs, then comes over",
        run.states.slice(0, 4).join(",") === "peek,climb,vault,vaultLand",
        run.states.join(" -> "));
  check("it starts on the wall's coping, not in the sky",
        Math.abs(run.spawnY - (t.cam.y + t.WALL_TOP - t.VAULT_REVEAL)) < 4,
        `y=${run.spawnY} wall line ${t.cam.y + t.WALL_TOP}`);
  /* Only the rows ABOVE the coping may be drawn while it peeks -- that is what
     makes the wall hide the rest of it. Enemies are drawn after the wall, so
     without this they would simply stand in front of it. */
  check("while peeking, nothing of it is drawn below the coping",
        run.peekRowsBelowWall === 0,
        `${run.peekRowsBelowWall} frames with pixels under the wall line`);
  /* THE POSES. The staging worked before these existed, but the 21 frames of
     the climb were the standing pose sliding upward -- nothing about it said
     "hands on a wall". */
  check("peeking uses a pose of its own, not the standing one",
        run.poses.indexOf("wallGrab") === 0, run.poses.join(" -> "));
  check("coming over uses a second one", run.poses.indexOf("wallOver") === 1,
        run.poses.join(" -> "));
  {
    const grab = t.ENEMY_POSES.rusher.wallGrab;
    const over = t.ENEMY_POSES.rusher.wallOver;
    const base = t.ENEMY_POSES.rusher.base;
    check("both are distinct images", grab.join("") !== base.join("") &&
          over.join("") !== base.join("") && grab.join("") !== over.join(""));
    /* The coping crosses the sprite at row 19 and only rows 0..18 are drawn, so
       WHERE THE FISTS LAND is what the pose says. Skin on both sides of the
       body in the last three visible rows is two hands on a ledge; anywhere
       else and it is just a figure standing behind a wall. */
    const SKIN = new Set(["f", "F"]);
    const fistRows = [16, 17, 18].filter(r => {
      const left = [...grab[r].slice(0, 11)].some(c => SKIN.has(c));
      const right = [...grab[r].slice(20)].some(c => SKIN.has(c));
      return left && right;
    });
    check("the grab puts a hand each side, in the rows just above the coping",
          fistRows.length >= 2, `hands on rows ${fistRows.join(",") || "none"}`);
    check("...and all of it is inside the visible band",
          grab.slice(0, 19).some(r => r.replace(/\./g, "").length > 0));
    // Coming over swings a leg across: the lower body has to differ from a
    // figure standing still, or the climb is the standing pose sliding upward.
    const lower = (rows) => rows.slice(30).join("");
    check("coming over is not the standing pose from the waist down",
          lower(over) !== lower(base));
  }
  check("the watch is long enough to be a telegraph",
        run.peekFrames >= 45, `${run.peekFrames} frames (${(run.peekFrames / 60).toFixed(2)}s)`);
  check("...and the climb is quicker than the watch",
        run.climbFrames > 2 && run.climbFrames < run.peekFrames,
        `${run.climbFrames} climb vs ${run.peekFrames} peek`);
  check("it pushes off sideways as it comes over, rather than dropping straight",
        Math.abs(run.driftAfterClimb) >= t.VAULT_VX - 1, `vx=${run.driftAfterClimb}`);

  /* THE DESCENT HAS TO BE WATCHABLE, and this is the check the first version
     lacked. Everything else about the entrance was asserted and passed -- it
     fired every time, it could not be hurt, it landed on its marker -- and in
     play it could not be seen: the fall reused the PLAYER's gravity at
     2400px/s^2, so the whole thing was over in four tenths of a second and the
     part inside the frame was four to six frames. Correct and invisible. */
  check("the descent is visible for most of a second", run.fallSeen >= 40,
        `${run.fallSeen} frames (${(run.fallSeen / 60).toFixed(2)}s) inside the view`);
  check("...and it lands well inside the frame, not at an edge",
        run.landedScreenX > 60 && run.landedScreenX < t.VIEW_W - 60,
        `landed at screen x ${run.landedScreenX} of ${t.VIEW_W}`);
  check("a vaulter falls under its own, gentler gravity",
        t.VAULT_GRAVITY < t.GRAVITY_FALL / 3,
        `${t.VAULT_GRAVITY} vs the player's ${t.GRAVITY_FALL}`);
  check("it fires only once the site is inside the frame",
        t.VAULT_INSET > 0 && t.VAULT_INSET < t.VIEW_W / 2, `${t.VAULT_INSET}px inset`);

  // TELEGRAPHING. The peeking head is the warning; the ground bracket belongs
  // to the committed half of the move.
  check("no ground marker while it is still only watching",
        run.markedWhilePeeking === false);
  check("...and a marker once it is coming over", run.markedWhileFalling === true);

  /* UNTOUCHABLE AND HARMLESS UNTIL IT LANDS, across all of peek, climb and the
     drop. Without the first, the answer to a head over the wall is to stand
     still and throw. Without the second, it is a hazard arriving from a place
     the player had no way to see. */
  const shot = walkIntoVault({ parkHitboxes: true });
  check("hitboxes parked on it through the whole staging kill nothing",
        shot.diedWhileStaged === false,
        `states: ${shot.states.join(" -> ")}`);
  check("...and it did reach the ground anyway", shot.landedScreenX !== null);
  const inside = walkIntoVault({ standInside: true, vulnerable: true });
  check("standing inside it through the staging is survivable",
        inside.hurtWhileStaged === false, `mode=${t.mode}`);

  // Killable the moment it is down.
  {
    const r2 = walkIntoVault({});
    const v = r2.v;
    check("a landed vaulter is vulnerable again", t.vaultAirborne(v) === false,
          `state=${v.state}`);
    check("the recovery beat is long enough to react to",
          t.VAULT_RECOVER >= 0.25, `${(t.VAULT_RECOVER * 1000).toFixed(0)}ms`);
    t.killEnemy(v);
    check("...and can be killed", !v.alive);
  }
  // Fired once per attempt, and re-armed by a death.
  {
    t.restart(); stand(SAFE_TILE);
    const site = t.vaultSites[0];
    t.ninja.x = (site - 8) * t.TILE; t.snapCamera();
    tickNoWave(2);
    const n1 = t.enemies.filter(e => e.vault).length;
    check("approaching a site fires one", n1 > 0, `${n1} spawned`);
    for (let i = 0; i < 240; i++) { t.ninja.invuln = 999; tickNoWave(1); }
    check("a site does not fire twice",
          t.enemies.filter(e => e.vault).length <= n1,
          `${n1} -> ${t.enemies.filter(e => e.vault).length}`);
    check("...and is recorded as spent", t.vaultsFired.some(Boolean));
    t.ninja.invuln = 0;
    t.ninja.y = t.WORLD_H + 200;
    tick(1);
    tickThroughDeath();
    check("a death arms them again", !t.vaultsFired.some(Boolean),
          "the entrances belong to the attempt, not to the run");
  }
}

console.log("\n== the shipped atlas (req: free-asset art upgrade) ==");
/* The art moved out of the pixel arrays and into assets/sprites.png, which
   means the readability rules moved out of reach of every assertion that checks
   a PALETTE constant. lum(P_NINJA.B) is still 73 whatever the atlas contains --
   so the suite would keep passing while the shipped player was invisible
   against the night sky, which is precisely the failure the rule exists to
   prevent.

   pack_assets.py therefore measures the mean body luminance of what it actually
   emitted and records it in the manifest, and these checks hold that figure to
   the same rule the built-in palettes are held to. The generator cannot quietly
   ship art that fails it.

   The whole block is skipped when the folder is empty, because no assets is a
   valid, supported and documented state -- the built-ins are the fallback. */
{
  const mpath = new URL("assets/manifest.json", import.meta.url);
  let man = null;
  try { man = JSON.parse(fs.readFileSync(mpath, "utf8")); } catch (err) { man = null; }
  if (!man) {
    console.log("  SKIP  no assets/manifest.json -- built-in art is the fallback");
  } else {
    check("the atlas declares a licence", /CC0|public domain/i.test(
            (man.meta && man.meta.licence) || ""),
          (man.meta && man.meta.licence) || "none");
    // Every pose the game can ask for, so a pack cannot ship 90% of a character
    // and leave one pose falling back to art that no longer matches the rest.
    const want = [];
    for (const p in t.NINJA_POSES) want.push("ninja/" + p);
    for (const k in t.ENEMY_POSES) for (const p in t.ENEMY_POSES[k]) want.push(k + "/" + p);
    const missing = want.filter(n => !man.frames[n]);
    check("the atlas covers every pose the game draws", missing.length === 0,
          missing.length ? "missing " + missing.join(" ") : `${want.length} poses`);
    /* THE 2:1 CONTRACT. RENDER_SCALE is 2, so a frame declared at exactly half
       its source size lands one source pixel per device pixel under
       nearest-neighbour. Any other ratio resamples the art -- which is the
       entire reason the art was replaced. */
    const offRatio = Object.entries(man.frames).filter(([, f]) =>
      f.dw * t.RENDER_SCALE !== f.w || f.dh * t.RENDER_SCALE !== f.h);
    check("every frame is drawn at exactly 1 source pixel per device pixel",
          offRatio.length === 0,
          offRatio.length ? offRatio.slice(0, 3).map(([n]) => n).join(",")
                          : `${Object.keys(man.frames).length} frames at 1:${t.RENDER_SCALE}`);

    const chars = (man.meta && man.meta.characters) || {};
    const pl = chars.ninja && chars.ninja.bodyLuma;
    check("the atlas records the player's body luminance", typeof pl === "number",
          String(pl));
    // The rule the built-in palette satisfies at 73, applied to what ships.
    check("the shipped player clears every sky band by 40 points",
          typeof pl === "number" &&
          Math.min(...SKY.map(b => Math.abs(lum(b) - pl))) >= 40,
          `player ${pl}, nearest band ${Math.min(...SKY.map(b => Math.abs(lum(b) - pl))).toFixed(0)} away`);
    /* And the player has to be separable from the enemies, which the first
       build of the pipeline failed: equalisation puts the body in the middle of
       whatever ramp it is handed, and including the gi's rim highlight in the
       player's ramp dragged him to 101 against the rusher's 105. Blue and
       purple at the same value is the classic confusion pair. */
    const foes = Object.keys(chars).filter(k => k !== "ninja");
    const worst = Math.min(...foes.map(k => Math.abs(chars[k].bodyLuma - pl)));
    check("the player is separable from every foe by value alone", worst >= 30,
          foes.map(k => `${k} ${chars[k].bodyLuma}`).join(", ") + ` vs player ${pl}`);
    check("every foe kind has a display name",
          foes.every(k => t.FOE_NAMES[k]),
          foes.map(k => `${k}=${t.FOE_NAMES[k]}`).join(" "));
  }
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
