// Replays the game's fillRect calls into an RGB buffer and writes a real PNG,
// so the sprites can actually be looked at without a browser.
import fs from "node:fs";
import zlib from "node:zlib";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

// Resolved against this script, not the cwd, so the shots render from anywhere.
const FILE = fileURLToPath(new URL("index.html", import.meta.url));
const src = fs.readFileSync(FILE, "utf8").match(/<script>([\s\S]*?)<\/script>/)[1] + `
globalThis.__t = { ninja, cam, render, update, updateCamera, snapCamera, spawn,
  TILE, BODY_H, VIEW_W, VIEW_H, STEP, keys, restart, poseNameOf, walkFrame,
  NINJA_POSES, ENEMY_POSES, P_NINJA, P_CHARGER, P_RUSHER, P_WARDEN, CELL_PROP,
  drawPixels, CELL_NINJA, SPRITE_W, isWalking, startGame, toTitle, togglePause,
  get mode() { return mode; }, set mode(v) { mode = v; },
  get flags() { return flags; }, get enemies() { return enemies; },
  get clock() { return clock; }, set clock(v) { clock = v; },
  get playTime() { return playTime; }, set playTime(v) { playTime = v; },
  get score() { return score; }, set score(v) { score = v; },
  get stageTotal() { return stageTotal; }, set stageTotal(v) { stageTotal = v; },
  get deaths() { return deaths; }, set deaths(v) { deaths = v; },
  saved, STAGE_ID, timeText,
  slash, drawEntities, drawNinja, SLASH_HIT, SLASH_WIND, vaultSites,
  update, STEP, MOVE_SPEED, WALL_TOP, vaultAirborne,
  set wakeT(v) { wakeT = v; },
  get slashes() { return slashes; } };`;

const rects = [];
const ctx = {
  fillStyle: "#000", font: "", textBaseline: "", imageSmoothingEnabled: true,
  fillRect(x, y, w, h) { rects.push({ x, y, w, h, c: this.fillStyle }); },
  fillText() {}
};
const sandbox = {
  document: { getElementById: () => ({ getContext: () => ctx, style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 640, height: 360 }),
    addEventListener() {} }) },
  addEventListener() {}, requestAnimationFrame() {},
  performance: { now: () => 0 }, console
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: "game" });
const t = sandbox.__t;

function parseColor(c) {
  if (c[0] === "#") {
    const h = c.slice(1);
    const n = h.length === 3
      ? h.split("").map(x => parseInt(x + x, 16))
      : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    return [n[0], n[1], n[2], 1];
  }
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return [255, 0, 255, 1];
  const p = m[1].split(",").map(Number);
  return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
}

function raster(W, H, list) {
  const buf = new Uint8Array(W * H * 3);
  for (const r of list) {
    const [cr, cg, cb, ca] = parseColor(r.c);
    const x0 = Math.max(0, Math.round(r.x)), y0 = Math.max(0, Math.round(r.y));
    const x1 = Math.min(W, Math.round(r.x + r.w)), y1 = Math.min(H, Math.round(r.y + r.h));
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const i = (y * W + x) * 3;
      if (ca >= 1) { buf[i] = cr; buf[i + 1] = cg; buf[i + 2] = cb; }
      else {
        buf[i]     = buf[i]     * (1 - ca) + cr * ca;
        buf[i + 1] = buf[i + 1] * (1 - ca) + cg * ca;
        buf[i + 2] = buf[i + 2] * (1 - ca) + cb * ca;
      }
    }
  }
  return buf;
}

function scale(buf, W, H, k) {
  const out = new Uint8Array(W * k * H * k * 3);
  for (let y = 0; y < H * k; y++) for (let x = 0; x < W * k; x++) {
    const si = ((y / k | 0) * W + (x / k | 0)) * 3, di = (y * W * k + x) * 3;
    out[di] = buf[si]; out[di + 1] = buf[si + 1]; out[di + 2] = buf[si + 2];
  }
  return out;
}

const crcTable = (() => {
  const tb = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    tb[n] = c;
  }
  return tb;
})();
const crc32 = (b) => {
  let c = -1;
  for (const x of b) c = crcTable[(c ^ x) & 0xFF] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function writePNG(path, buf, W, H) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc(H * (W * 3 + 1));
  for (let y = 0; y < H; y++) {
    raw[y * (W * 3 + 1)] = 0;
    Buffer.from(buf.buffer, y * W * 3, W * 3).copy(raw, y * (W * 3 + 1) + 1);
  }
  fs.writeFileSync(path, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))
  ]));
}

function shoot(name, setup, k = 2) {
  rects.length = 0;
  setup();
  t.render();
  const W = t.VIEW_W, H = t.VIEW_H;
  writePNG(name, scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log(`wrote ${name} (${rects.length} rects)`);
}

// --- 1. title screen -------------------------------------------------------
shoot("shot-title.png", () => {
  t.restart(); t.mode = "title"; t.clock = 1.1;
  t.saved.bests[t.STAGE_ID] = { score: 31480, time: 104.2 };   // a record to beat
});

// --- 2. gameplay, mid-walk -------------------------------------------------
shoot("shot-play.png", () => {
  t.restart();
  t.ninja.x = 27 * t.TILE; t.ninja.y = 20 * t.TILE - t.BODY_H;
  t.ninja.onGround = true; t.ninja.facing = 1; t.ninja.invuln = 0;
  t.snapCamera();
  t.keys.add("ArrowRight");
  for (let i = 0; i < 26; i++) { t.ninja.invuln = 999; t.update(t.STEP); t.updateCamera(); }
  t.keys.clear();
  t.ninja.invuln = 0;
  t.playTime = 83;            // a plausible mid-run clock, so the HUD shows 01:23
  t.score = 14250;            // ...and a plausible score beside it
  t.deaths = 1;               // so the HUD shows the figure the bonus is charged on
  t.stageTotal = 131;
  console.log(`   pose=${t.poseNameOf(t.ninja)} walking=${t.isWalking(t.ninja)}`);
});

// --- 3. the walk cycle, laid out as a strip -------------------------------
{
  const W = 350, H = 60, k = 3;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  // A ground line, so a pose that floats or loses its legs is obvious.
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, 54, W, 1);
  const order = ["idle", "walkA", "walkB", "walkC", "walkD", "crouch", "draw", "slash", "jump"];
  order.forEach((p, i) => {
    t.drawPixels(t.NINJA_POSES[p], 6 + i * 38, 6, false, t.P_NINJA, t.CELL_NINJA);
  });
  writePNG("shot-cycle.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log(`wrote shot-cycle.png  (${order.join(" ")})`);
}

// --- 4. the three enemy bodies, each with its attack pose -----------------
{
  const W = 250, H = 62, k = 4;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  const line = [
    ["charger", "base", t.P_CHARGER], ["charger", "attack", t.P_CHARGER],
    ["rusher", "base", t.P_RUSHER],   ["rusher", "leap", t.P_RUSHER],
    ["warden", "base", t.P_WARDEN],   ["warden", "aim", t.P_WARDEN],
  ];
  line.forEach(([kind, pose, pal], i) => {
    t.drawPixels(t.ENEMY_POSES[kind][pose], 4 + i * 38, 6, true, pal, t.CELL_NINJA);
  });
  writePNG("shot-enemy.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-enemy.png  (charger/rusher/warden, base + attack)");
}

// --- 5. every enemy's full walk cycle, with a ground line ----------------
// The reported breakage was in the WALK frames, and the lineup above only ever
// showed the standing and attack poses -- which is exactly why it shipped.
{
  const W = 560, H = 62, k = 3;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  const pals = { charger: t.P_CHARGER, rusher: t.P_RUSHER, warden: t.P_WARDEN };
  let i = 0;
  for (const kind of ["charger", "rusher", "warden"]) {
    for (const pose of ["base", "walkA", "walkB", "walkC", "walkD"]) {
      t.drawPixels(t.ENEMY_POSES[kind][pose], 4 + i * 36, 6, true,
                   pals[kind], t.CELL_NINJA);
      i++;
    }
    i += 0.6;
  }
  ctx.fillStyle = "#4A5060"; ctx.fillRect(0, 54, W, 1);
  writePNG("shot-foewalk.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-foewalk.png (three kinds x base + four walk phases)");
}

// --- 7. the wall vault, stage by stage -----------------------------------
// The sequence IS the feature, so the picture has to be of the sequence. Each
// shot stops at a frame COUNT INSIDE its own stage; asking for frame 40 of a
// twenty-one-frame climb is how the first attempt ran the player off the map.
{
  const k = 1;
  const want = [["peek", 8], ["peek", 48], ["climb", 14],
                ["vault", 12], ["vault", 46]];
  want.forEach(([target, atFrame], idx) => {
    t.restart(); t.wakeT = 0;
    const site = t.vaultSites[1];
    t.ninja.x = (site - 46) * t.TILE;
    t.ninja.y = 20 * t.TILE - t.BODY_H; t.ninja.onGround = true;
    t.snapCamera();
    let hit = 0, past = false;
    for (let i = 0; i < 600 && !past; i++) {
      t.ninja.invuln = 999;
      t.ninja.x += t.MOVE_SPEED * t.STEP;
      t.ninja.y = 20 * t.TILE - t.BODY_H; t.ninja.onGround = true;
      t.snapCamera();
      t.update(t.STEP);
      const v = t.enemies.find(e => e.vault);
      if (!v) continue;
      if (v.state === target) { if (++hit >= atFrame) break; }
      else if (hit > 0) past = true;        // the stage is over; take what we have
    }
    rects.length = 0;
    t.render();
    writePNG("shot-wall" + (idx + 1) + ".png",
             scale(raster(640, 360, rects), 640, 360, k), 640 * k, 360 * k);
  });
  console.log("wrote shot-wall1..5.png (" + want.map(w => w[0] + "@" + w[1]).join(", ") + ")");
}

// --- 8. the cut WHILE WALKING, at four points -----------------------------
// Walking through the swing is where the arc used to mirror onto the other side
// and read as a full circle, so that is the case worth a picture.
{
  const W = 520, H = 120, k = 2;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  [0.80, 0.55, 0.30, 0.05].forEach((f, i) => {
    t.restart(); t.wakeT = 0;
    for (const e of t.enemies) e.alive = false;
    t.ninja.x = 40 * t.TILE; t.ninja.y = 20 * t.TILE - t.BODY_H;
    t.ninja.onGround = true; t.ninja.facing = 1;
    t.slash();
    t.keys.add("ArrowRight");
    for (let n = 0; n < Math.round((1 - f) * t.SLASH_HIT * 60); n++) {
      t.ninja.invuln = 999; t.update(t.STEP);
    }
    t.keys.clear();
    t.cam.x = 40 * t.TILE - 34 - i * 128;
    t.cam.y = 20 * t.TILE - 96;
    if (t.slashes.length) { t.drawEntities(); t.drawNinja(); }
  });
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, 96, W, 1);
  writePNG("shot-arc.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-arc.png  (the cut while walking)");
}
