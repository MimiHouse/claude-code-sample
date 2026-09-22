// Replays the game's draw calls into an RGBA buffer and writes a real PNG, so
// the sprites can actually be looked at without a browser.
//
// This started as a fillRect recorder. It is now a small rasteriser, because
// the art moved out of the pixel arrays and into an atlas: a recorder that
// only understands fillRect goes blind the moment a sprite becomes a blit, and
// on this box it is the only pair of eyes there is. It therefore supports
//   fillRect, drawImage (3/5/9-arg), save/restore, translate/scale,
//   globalAlpha, and globalCompositeOperation = "lighter"
// which between them cover every drawing primitive the game uses. Assets are
// served off disk through a fake fetch/Image so a shot shows what a browser
// would show, atlas and all.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

// Resolved against this script, not the cwd, so the shots render from anywhere.
const FILE = fileURLToPath(new URL("index.html", import.meta.url));
const ASSET_DIR = fileURLToPath(new URL("assets/", import.meta.url));

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
  get slashes() { return slashes; }, loadAssets,
  startDash, drawEnemyWeapon, drawGhosts, get ghosts() { return ghosts; },
  DASH_TIME, CHG_WINDUP, CHG_SWING, CHG_LUNGE_WIND, WARD_SWEEP_WIND,
  WARD_SWEEP_TIME, WARD_AIM, ENEMY_H, ENEMY_W, ROWS,
  PERCH_WIND, PERCH_LAND, PERCH_SCAN, enemyPoseOf, solidAt, COLS, CAM_Y,
  enemyGait, IDLE_FPS,
  drawHazardZones, sightReach, WARD_RANGE, BULLET_Y_OFF, CHG_HIT_W, CHG_HIT_TOP,
  CHG_HIT_BOT, WARD_SWEEP_REACH, WARD_SWEEP_TOP, WARD_SWEEP_BOT,
  ENEMY_WAKE, get hazards() { return hazards; },
  RENDER_SCALE, drawTextHD, textWidthHD, FONT_HD, FONT_HD_W, FONT_HD_H,
  drawPose, ART, ENEMY_POSES,
  CREDITS, drawCredits,
  slash, get hitFreeze() { return hitFreeze; }, get trauma() { return trauma; },
  get punchX() { return punchX; }, shakeOffsetX, shakeOffsetY, killEnemy,
  get particles() { return particles; }, TILE, BODY_W };`;

/* --- PNG decode ----------------------------------------------------------- */
/* Enough of the spec for what our own pipeline emits and for anything a normal
   exporter produces: 8-bit greyscale, RGB, palette and RGBA, all five filter
   types. Interlaced and 16-bit files are rejected loudly rather than silently
   producing garbage -- a silently wrong atlas is worse than no atlas. */
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504E47) throw new Error("not a PNG");
  let p = 8, W = 0, H = 0, depth = 8, ctype = 6, inter = 0;
  const idat = [];
  let plte = null, trns = null;
  while (p + 8 <= buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    const data = buf.subarray(p + 8, p + 8 + len);
    if (type === "IHDR") {
      W = data.readUInt32BE(0); H = data.readUInt32BE(4);
      depth = data[8]; ctype = data[9]; inter = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "PLTE") plte = data;
    else if (type === "tRNS") trns = data;
    else if (type === "IEND") break;
    p += 12 + len;
  }
  if (depth !== 8) throw new Error("PNG bit depth " + depth + " unsupported");
  if (inter) throw new Error("interlaced PNG unsupported");
  const CH = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ctype];
  if (!CH) throw new Error("PNG colour type " + ctype + " unsupported");

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = W * CH;
  const lines = Buffer.alloc(H * stride);
  let rp = 0;
  for (let y = 0; y < H; y++) {
    const f = raw[rp++];
    const cur = lines.subarray(y * stride, y * stride + stride);
    raw.copy(cur, 0, rp, rp + stride);
    rp += stride;
    const prev = y > 0 ? lines.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= CH ? cur[i - CH] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= CH ? prev[i - CH] : 0;
      if (f === 1) cur[i] = (cur[i] + a) & 0xFF;
      else if (f === 2) cur[i] = (cur[i] + b) & 0xFF;
      else if (f === 3) cur[i] = (cur[i] + ((a + b) >> 1)) & 0xFF;
      else if (f === 4) {
        const q = a + b - c;
        const pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c);
        cur[i] = (cur[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xFF;
      }
    }
  }

  // Everything becomes RGBA, so the rasteriser has exactly one layout to read.
  const out = new Uint8Array(W * H * 4);
  for (let i = 0, n = W * H; i < n; i++) {
    const s = i * CH, d = i * 4;
    if (ctype === 6) { out[d] = lines[s]; out[d+1] = lines[s+1]; out[d+2] = lines[s+2]; out[d+3] = lines[s+3]; }
    else if (ctype === 2) { out[d] = lines[s]; out[d+1] = lines[s+1]; out[d+2] = lines[s+2]; out[d+3] = 255; }
    else if (ctype === 0) { out[d] = out[d+1] = out[d+2] = lines[s]; out[d+3] = 255; }
    else if (ctype === 4) { out[d] = out[d+1] = out[d+2] = lines[s]; out[d+3] = lines[s+1]; }
    else {                                     // palette
      const k = lines[s] * 3;
      out[d] = plte ? plte[k] : 0; out[d+1] = plte ? plte[k+1] : 0; out[d+2] = plte ? plte[k+2] : 0;
      out[d+3] = trns && lines[s] < trns.length ? trns[lines[s]] : 255;
    }
  }
  return { width: W, height: H, data: out };
}

/* --- the recording context ------------------------------------------------ */
/* Ops are kept in call order and composited in that order, because a blit over
   a rect and a rect over a blit are different pictures. The transform is
   flattened at record time: the only transforms the game uses are the
   translate+scale(-1,1) pair that mirrors a sprite, so a full matrix would be
   machinery for a case that never arrives. A negative width is the mirror, and
   the rasteriser normalises it. */
const rects = [];
let xf = { tx: 0, ty: 0, sx: 1, sy: 1 };
const xfStack = [];

const ctx = {
  fillStyle: "#000", font: "", textBaseline: "", imageSmoothingEnabled: true,
  globalAlpha: 1, globalCompositeOperation: "source-over",
  fillRect(x, y, w, h) {
    rects.push({ blit: null, x: xf.tx + x * xf.sx, y: xf.ty + y * xf.sy,
                 w: w * xf.sx, h: h * xf.sy, c: this.fillStyle,
                 ga: this.globalAlpha, add: this.globalCompositeOperation === "lighter" });
  },
  fillText() {},
  save() { xfStack.push({ tx: xf.tx, ty: xf.ty, sx: xf.sx, sy: xf.sy }); },
  restore() { if (xfStack.length) xf = xfStack.pop(); },
  translate(x, y) { xf.tx += x * xf.sx; xf.ty += y * xf.sy; },
  scale(x, y) { xf.sx *= x; xf.sy *= y; },
  drawImage(img, a, b, c, d, e, f, g, h) {
    let sx = 0, sy = 0, sw = img.width, sh = img.height, dx, dy, dw, dh;
    if (e === undefined) { dx = a; dy = b; dw = c === undefined ? sw : c; dh = d === undefined ? sh : d; }
    else { sx = a; sy = b; sw = c; sh = d; dx = e; dy = f; dw = g === undefined ? sw : g; dh = h === undefined ? sh : h; }
    rects.push({ blit: img, sx, sy, sw, sh,
                 x: xf.tx + dx * xf.sx, y: xf.ty + dy * xf.sy,
                 w: dw * xf.sx, h: dh * xf.sy,
                 ga: this.globalAlpha, add: this.globalCompositeOperation === "lighter" });
  }
};

/* --- asset plumbing ------------------------------------------------------- */
/* The game loads assets over fetch and Image. Both are real here, backed by
   the assets folder on disk, so a shot proves the atlas path rather than only
   the built-in fallback. A missing folder is the normal, valid state and leaves
   the built-ins in place -- exactly as it does in a browser on file://. */
let assetReads = 0;
function assetPath(url) {
  /* The query has to go. The loader appends the manifest's content version --
     "sprites.png?v=abc123" -- to bust the browser cache, and joining that onto
     a directory asks the filesystem for a file whose name ends in "?v=abc123".
     It does not exist, Image fires onerror, ART never becomes ready, and every
     shot silently renders the BUILT-IN art while the atlas sits on disk beside
     it. That is the worst possible failure for this tool: it does not error, it
     photographs the fallback. */
  const clean = String(url).split("?")[0];
  return path.join(ASSET_DIR, clean.replace(/^assets\//, ""));
}

class FakeImage {
  constructor() { this.width = 0; this.height = 0; this.data = null; }
  set src(v) {
    this._src = v;
    try {
      const img = decodePNG(fs.readFileSync(assetPath(v)));
      this.width = img.width; this.height = img.height; this.data = img.data;
      assetReads++;
      if (this.onload) this.onload();
    } catch (err) {
      if (this.onerror) this.onerror();
    }
  }
  get src() { return this._src; }
}

async function fakeFetch(url) {
  const f = assetPath(url);
  if (!fs.existsSync(f)) return { ok: false, status: 404 };
  const b = fs.readFileSync(f);
  assetReads++;
  return {
    ok: true, status: 200,
    async json() { return JSON.parse(b.toString("utf8")); },
    async text() { return b.toString("utf8"); },
    async arrayBuffer() { return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength); }
  };
}

const sandbox = {
  document: { getElementById: () => ({ getContext: () => ctx, style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 640, height: 360 }),
    addEventListener() {} }) },
  addEventListener() {}, requestAnimationFrame() {},
  performance: { now: () => 0 }, console,
  Image: FakeImage, fetch: fakeFetch,
  Math, JSON, Date, Object, Array, String, Number, Boolean, Set, Map,
  Uint8Array, Float32Array, Promise, isNaN, isFinite, parseInt, parseFloat
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: "game" });
const t = sandbox.__t;

// Assets are fired-and-forgotten in the browser; here the shots must wait for
// them, or every picture is of the fallback.
const ART_STATE = () => t.ART && t.ART.ready
  ? `READY (${Object.keys(t.ART.frames).length} frames)`
  : "NOT LOADED -- shots will show the built-in art";
if (t.loadAssets) {
  await t.loadAssets();
  console.log(assetReads
    ? `assets: ${assetReads} file(s) read, atlas ${ART_STATE()}`
    : "assets: none (built-in art and synth)");
}

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
    // A mirrored blit arrives with a negative width; normalise the rectangle
    // and remember that the source has to be read backwards.
    const flipX = r.w < 0, flipY = r.h < 0;
    const rw = Math.abs(r.w), rh = Math.abs(r.h);
    const rx = flipX ? r.x - rw : r.x, ry = flipY ? r.y - rh : r.y;
    const x0 = Math.max(0, Math.round(rx)), y0 = Math.max(0, Math.round(ry));
    const x1 = Math.min(W, Math.round(rx + rw)), y1 = Math.min(H, Math.round(ry + rh));
    if (x1 <= x0 || y1 <= y0) continue;
    const ga = r.ga === undefined ? 1 : r.ga;

    if (!r.blit) {
      const [cr, cg, cb, ca] = parseColor(r.c);
      const al = ca * ga;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 3;
        put(buf, i, cr, cg, cb, al, r.add);
      }
      continue;
    }

    const img = r.blit;
    if (!img || !img.data) continue;
    // Nearest neighbour, to match image-rendering: pixelated in the browser.
    for (let y = y0; y < y1; y++) {
      const v = (y - ry) / rh;
      const syy = Math.min(img.height - 1,
        (r.sy + (flipY ? 1 - v : v) * r.sh) | 0);
      for (let x = x0; x < x1; x++) {
        const u = (x - rx) / rw;
        const sxx = Math.min(img.width - 1,
          (r.sx + (flipX ? 1 - u : u) * r.sw) | 0);
        const s = (syy * img.width + sxx) * 4;
        const al = (img.data[s + 3] / 255) * ga;
        if (al <= 0) continue;
        put(buf, (y * W + x) * 3, img.data[s], img.data[s + 1], img.data[s + 2], al, r.add);
      }
    }
  }
  return buf;
}

function put(buf, i, cr, cg, cb, al, add) {
  if (add) {
    buf[i]     = Math.min(255, buf[i]     + cr * al);
    buf[i + 1] = Math.min(255, buf[i + 1] + cg * al);
    buf[i + 2] = Math.min(255, buf[i + 2] + cb * al);
  } else if (al >= 1) {
    buf[i] = cr; buf[i + 1] = cg; buf[i + 2] = cb;
  } else {
    buf[i]     = buf[i]     * (1 - al) + cr * al;
    buf[i + 1] = buf[i + 1] * (1 - al) + cg * al;
    buf[i + 2] = buf[i + 2] * (1 - al) + cb * al;
  }
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

/* render() now paints into a buffer RENDER_SCALE times the world size, and the
   recording context flattens that transform -- so the raster has to be the size
   of the real buffer, not the size of the world. The nearest-neighbour blow-up
   afterwards drops by the same factor, which keeps every shot the same number
   of output pixels it was before while those pixels now carry real detail
   instead of repeats. */
function shoot(name, setup, k = 2) {
  rects.length = 0;
  setup();
  t.render();
  const RS = t.RENDER_SCALE || 1;
  const W = t.VIEW_W * RS, H = t.VIEW_H * RS;
  const kk = Math.max(1, Math.round(k / RS));
  writePNG(name, scale(raster(W, H, rects), W, H, kk), W * kk, H * kk);
  console.log(`wrote ${name} (${rects.length} rects, ${W}x${H} buffer)`);
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
  const W = 700, H = 72, k = 2;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  // A ground line, so a pose that floats or loses its legs is obvious.
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, 62, W, 1);
  const order = ["idle", "walkA", "walkB", "walkC", "walkD", "crouch", "draw", "slash", "jump"];
  order.forEach((p, i) => {
    // drawPose, not drawPixels: with an atlas present these strips are the only
    // place every replacement frame is looked at side by side, and drawPixels
    // would keep showing the built-in arrays the atlas has replaced.
    t.drawPose(t.NINJA_POSES[p], "ninja/" + p, 10 + i * 76, 10, false,
               t.P_NINJA, t.CELL_NINJA);
  });
  writePNG("shot-cycle.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log(`wrote shot-cycle.png  (${order.join(" ")})`);
}

// --- 4. the three enemy bodies, each with its attack pose -----------------
{
  const W = 420, H = 72, k = 3;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  const line = [
    ["charger", "base", t.P_CHARGER], ["charger", "attack", t.P_CHARGER],
    ["rusher", "base", t.P_RUSHER],   ["rusher", "leap", t.P_RUSHER],
    ["warden", "base", t.P_WARDEN],   ["warden", "aim", t.P_WARDEN],
  ];
  line.forEach(([kind, pose, pal], i) => {
    t.drawPose(t.ENEMY_POSES[kind][pose], kind + "/" + pose,
               8 + i * 68, 10, true, pal, t.CELL_NINJA);
  });
  writePNG("shot-enemy.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-enemy.png  (charger/rusher/warden, base + attack)");
}

// --- 5. every enemy's full walk cycle, with a ground line ----------------
// The reported breakage was in the WALK frames, and the lineup above only ever
// showed the standing and attack poses -- which is exactly why it shipped.
{
  const W = 680, H = 72, k = 2;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  const pals = { charger: t.P_CHARGER, rusher: t.P_RUSHER, warden: t.P_WARDEN };
  let i = 0;
  for (const kind of ["charger", "rusher", "warden"]) {
    for (const pose of ["base", "walkA", "walkB", "walkC", "walkD"]) {
      t.drawPose(t.ENEMY_POSES[kind][pose], kind + "/" + pose,
                 8 + i * 44, 10, true, pals[kind], t.CELL_NINJA);
      i++;
    }
    i += 0.6;
  }
  ctx.fillStyle = "#4A5060"; ctx.fillRect(0, 62, W, 1);
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

// --- 9. the dash, mid-flight with its trail -------------------------------
// The trail is the whole point of the move on screen, and it only exists for
// ten frames, so it needs a picture of its own or nobody ever looks at it.
shoot("shot-dash.png", () => {
  t.restart();
  t.ninja.x = 27 * t.TILE; t.ninja.y = 20 * t.TILE - t.BODY_H;
  t.ninja.onGround = true; t.ninja.facing = 1; t.ninja.invuln = 999;
  t.snapCamera();
  for (let i = 0; i < 4; i++) { t.ninja.invuln = 999; t.update(t.STEP); }
  t.startDash();
  // Seven of the ten frames in: enough trail behind the body to read as one.
  for (let i = 0; i < 7; i++) { t.ninja.invuln = 999; t.update(t.STEP); }
  t.playTime = 12; t.score = 900;
  console.log(`   dash ghosts on screen: ${t.ghosts.length}`);
});

// --- 10. every enemy attack motion, held at its readable frame ------------
// Each enemy's weapon used to be invisible: a hitbox, a one-frame pose and a
// tick over the head. These are the swings that replaced that, held at the
// frame where the steel is furthest from the body.
{
  const W = 600, H = 96, k = 3;
  const cases = [
    ["charger", "windup",    t.CHG_WINDUP * 0.15],
    ["charger", "swing",     t.CHG_SWING * 0.35],
    ["charger", "lunge",     0.1],
    ["warden",  "sweepWind", t.WARD_SWEEP_WIND * 0.15],
    ["warden",  "sweep",     t.WARD_SWEEP_TIME * 0.4],
    ["warden",  "aim",       t.WARD_AIM * 0.2],
    ["rusher",  "leap",      0.1]
  ];
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, 84, W, 1);
  t.restart();
  // One body per case, parked on the shot's own ground line, each in the state
  // being photographed. The camera is pinned so screen x is world x.
  t.cam.x = 0; t.cam.y = 20 * t.TILE - 84;   // feet land on the shot's ground line
  for (const e of t.enemies) e.alive = false;
  cases.forEach(([kind, state, timer], i) => {
    const e = t.enemies.find(en => en.kind === kind && !en.alive);
    if (!e) return;
    e.alive = true; e.dying = 0;
    e.x = 40 + i * 84; e.y = 20 * t.TILE - t.ENEMY_H;
    e.facing = 1; e.state = state; e.timer = timer;
  });
  t.drawEntities();
  writePNG("shot-foeattack.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-foeattack.png (" + cases.map(c => c[0][0] + ":" + c[1]).join(" ") + ")");
}

// --- 11. the ledge sentry, start to finish -------------------------------
// Height used to be decoration -- a warden on a roof fired over your head and
// could not be reached. This is the sequence that replaced that: perch, crouch
// (the only warning, with the drop shaft and landing pad painted for the player
// on the floor), the drop with the weapon leading, then the landing beat.
{
  const W = 520, H = 150, k = 3;
  const cases = [
    ["perch",     0],
    ["perchWind", t.PERCH_WIND * 0.55],
    ["perchWind", t.PERCH_WIND * 0.08],
    ["dive",      0],
    ["perchLand", t.PERCH_LAND * 0.5]
  ];
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  t.restart();
  // A ledge 64px up, and the alley floor under it, drawn for each case so the
  // drop has somewhere visible to go.
  const GY = 132, LEDGE = GY - 64;
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, GY, W, 2);
  for (let i = 0; i < cases.length; i++) {
    ctx.fillStyle = "#4A4034";
    ctx.fillRect(14 + i * 104, LEDGE, 56, 10);
  }
  t.cam.x = 0; t.cam.y = 20 * t.TILE - GY;
  for (const e of t.enemies) e.alive = false;
  cases.forEach(([state, timer], i) => {
    const e = t.enemies.find(en => en.kind === "rusher" && !en.alive);
    if (!e) return;
    e.alive = true; e.dying = 0; e.ledge = true;
    e.x = 24 + i * 104;
    // perch and the crouch stand ON the ledge; the dive is caught mid-fall and
    // the landing is on the floor.
    const feet = state === "dive" ? GY - 26 : state === "perchLand" ? GY : LEDGE;
    e.y = (20 * t.TILE - GY) + feet - t.ENEMY_H;
    e.facing = 1; e.diveDir = 1; e.state = state; e.timer = timer;
    e.vy = state === "dive" ? 200 : 0;
  });
  t.drawEntities();
  writePNG("shot-sentry.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-sentry.png (" +
              cases.map((c, i) => c[0]).join(" -> ") + ")");
}

// --- 12. a real sentry, in the real alley --------------------------------
// The strip above is staged on a drawn ledge. This is the same thing happening
// in the actual stage, with the real camera, the real cover block and the real
// ground under it -- which is the only version that proves the drop shaft and
// the landing pad land where the player would see them.
["perchWind", "dive"].forEach((want, idx) => {
  shoot("shot-sentry-live" + (idx + 1) + ".png", () => {
    t.restart(); t.wakeT = 0;
    // restart() resets cam.x and NOT cam.y, so the staged strips above leak
    // their vertical camera into every later shot. Put it back.
    t.cam.y = t.CAM_Y;
    t.ninja.y = 20 * t.TILE - t.BODY_H; t.ninja.onGround = true; t.ninja.facing = 1;
    /* Far enough back that the sentry is still perched, then walk into its
       strip. Tile 17, not 14: segment 1 has a pit at columns 14-15, and
       starting on its lip meant every run of this shot fell in, died, and
       photographed an empty alley. */
    t.ninja.x = 17 * t.TILE;
    t.snapCamera();
    let seen = 0;
    for (let i = 0; i < 900; i++) {
      t.ninja.invuln = 999;
      t.keys.add("ArrowRight");
      t.update(t.STEP);
      t.updateCamera();
      const s = t.enemies.find(e => e.ledge && e.state === want);
      // A couple of frames INTO the state, so the crouch has visibly deepened
      // and the dive has left the ledge.
      if (s && ++seen >= (want === "dive" ? 9 : 4)) break;
    }
    t.keys.clear();
    t.ninja.invuln = 0;
    t.playTime = 9; t.score = 400;
    // The sentry ON SCREEN, not merely the first one in the array -- the array
    // is ordered by map row, so `find` hands back one three segments away.
    const s = t.enemies.find(e => e.ledge && e.x > t.cam.x && e.x < t.cam.x + t.VIEW_W);
    console.log(`   sentry: state=${s && s.state} pose=${s && t.enemyPoseOf(s)}` +
                ` feet=${s && (s.y + s.h).toFixed(0)}` +
                ` dx=${s && (t.ninja.x - s.x).toFixed(0)} ninja=${t.ninja.x.toFixed(0)}` +
                ` hazards=${t.hazards.length}`);
  });
});

// --- 13. the frame a blade kill lands on ---------------------------------
// The impact frame, the shove and the debris all live for two to five frames,
// which is exactly why they need a picture: they are invisible to anything but
// a still. The body is flat white, the action layer is shoved away from the
// player, and the background is NOT -- a shaken sky would read as the camera
// being hit rather than the enemy.
shoot("shot-impact.png", () => {
  t.restart(); t.wakeT = 0;
  t.cam.y = t.CAM_Y;
  // One enemy, on flat ground, close enough to cut.
  let victim = null;
  for (const e of t.enemies) {
    if (!victim && e.kind === "charger" && !e.ledge && !e.post &&
        e.x > 30 * t.TILE && e.x < 120 * t.TILE) { victim = e; continue; }
    e.alive = false;
  }
  t.ninja.x = victim.x - 34; t.ninja.y = 20 * t.TILE - t.BODY_H;
  t.ninja.onGround = true; t.ninja.facing = 1; t.ninja.invuln = 999;
  t.snapCamera();
  t.slash();
  for (let i = 0; i < 40 && victim.alive; i++) { t.ninja.invuln = 999; t.update(t.STEP); }
  t.playTime = 31; t.score = 5200;
  console.log(`   impact=${(victim.impact * 1000).toFixed(0)}ms` +
              ` freeze=${(t.hitFreeze * 1000).toFixed(0)}ms` +
              ` trauma=${t.trauma.toFixed(2)}` +
              ` shove=(${t.shakeOffsetX()},${t.shakeOffsetY()})px` +
              ` debris=${t.particles.length}`);
});

// --- 14. the credits screen ----------------------------------------------
// It exists because two of the four character packs are CC-BY, which asks for
// attribution IN THE WORK. A licence obligation that only a still can confirm
// needs a still.
shoot("shot-credits.png", () => {
  t.restart(); t.cam.y = t.CAM_Y; t.mode = "credits"; t.clock = 1.0;
  console.log(`   ${t.CREDITS.length} credit lines`);
});

// --- 15. attack range: armed, and live -----------------------------------
// The windup was previewed and the live frames showed only a weapon arc, so the
// one moment the range mattered was the one moment nothing marked it. Left pair
// is armed (extent bracketed from the first frame, fill as the clock); right
// pair is the box actually in `hazards`, read straight out of the array.
{
  const W = 560, H = 120, k = 2;
  const cases = [
    ["charger", "windup",    t.CHG_WINDUP * 0.55],
    ["charger", "swing",     t.CHG_SWING * 0.6],
    ["warden",  "sweepWind", t.WARD_SWEEP_WIND * 0.5],
    ["warden",  "sweep",     t.WARD_SWEEP_TIME * 0.6]
  ];
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, 100, W, 1);
  t.restart(); t.wakeT = 0;
  t.cam.x = 0; t.cam.y = 20 * t.TILE - 100;
  for (const e of t.enemies) e.alive = false;
  t.hazards.length = 0;
  cases.forEach(([kind, state, timer], i) => {
    const e = t.enemies.find(en => en.kind === kind && !en.alive);
    if (!e) return;
    e.alive = true; e.dying = 0; e.ledge = false;
    e.x = 26 + i * 138; e.y = 20 * t.TILE - t.ENEMY_H;
    e.facing = 1; e.state = state; e.timer = timer;
    // The live cases get the real box, built the way the AI builds it.
    const feet = e.y + e.h;
    if (state === "swing") {
      t.hazards.push({ x: e.x + e.w, y: feet - t.CHG_HIT_TOP, w: t.CHG_HIT_W,
                       h: t.CHG_HIT_TOP - t.CHG_HIT_BOT, ttl: timer });
    } else if (state === "sweep") {
      t.hazards.push({ x: e.x + e.w, y: feet - t.WARD_SWEEP_TOP,
                       w: t.WARD_SWEEP_REACH,
                       h: t.WARD_SWEEP_TOP - t.WARD_SWEEP_BOT, ttl: timer });
    }
  });
  t.drawHazardZones();
  t.drawEntities();
  writePNG("shot-range.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-range.png (" + cases.map(c => c[1]).join(" ") +
              ", " + t.hazards.length + " live boxes)");
}

// --- 16. the upper storey ------------------------------------------------
// Row 16 used to hold the odd four-tile stepping stone. It now carries
// walkways long enough to fight on, 64px up -- inside the 78px apex, so they
// are reached from the floor without a step -- with the alley still running
// underneath and a sentry posted up there.
["floor", "up"].forEach((where, idx) => {
  shoot("shot-upper" + (idx + 1) + ".png", () => {
    t.restart(); t.wakeT = 0; t.cam.y = t.CAM_Y;
    // Find the first long run on row 16 and stand at its left end.
    let a = -1, run = null;
    for (let c = 0; c <= t.COLS && !run; c++) {
      const solid = c < t.COLS && t.solidAt(c, 16);
      if (solid && a < 0) a = c;
      else if (!solid && a >= 0) { if (c - a >= 9) run = [a, c - 1]; a = -1; }
    }
    const [x0, x1] = run;
    const mid = Math.floor((x0 + x1) / 2);
    if (where === "floor") {
      t.ninja.x = (x0 + 2) * t.TILE; t.ninja.y = 20 * t.TILE - t.BODY_H;
    } else {
      t.ninja.x = mid * t.TILE; t.ninja.y = 16 * t.TILE - t.BODY_H;
    }
    t.ninja.onGround = true; t.ninja.facing = 1; t.ninja.invuln = 999;
    t.snapCamera();
    for (let i = 0; i < 3; i++) { t.ninja.invuln = 999; t.update(t.STEP); }
    t.playTime = 22; t.score = 3100;
    console.log(`   walkway tiles ${x0}..${x1} (${x1 - x0 + 1} wide), ninja ${where}`);
  });
});

// --- 17. standing guard --------------------------------------------------
// A posted enemy used to hold one pixel-identical pose with empty hands, which
// for a guard is its entire screen time. Each kind is shown at two points of
// its own rest cycle: the body on idle/idleB, and the weapon lifting.
{
  const W = 520, H = 80, k = 3;
  rects.length = 0;
  ctx.fillStyle = "#20242E"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#3A4152"; ctx.fillRect(0, 66, W, 1);
  t.restart(); t.wakeT = 0;
  t.cam.x = 0; t.cam.y = 20 * t.TILE - 66;
  for (const e of t.enemies) e.alive = false;
  t.hazards.length = 0;
  let i = 0;
  for (const kind of ["charger", "rusher", "warden"]) {
    // Two phases half a rest cycle apart: weapon down, weapon up.
    for (const phase of [0, 1]) {
      const e = t.enemies.find(en => en.kind === kind && !en.alive);
      if (!e) continue;
      e.alive = true; e.dying = 0; e.ledge = false;
      e.x = 30 + i * 82; e.y = 20 * t.TILE - t.ENEMY_H;
      e.facing = 1; e.state = kind === "rusher" ? "wait" : "idle";
      e.vx = 0; e.walkRate = 0;
      // One figure on `base`, the next on `idleB`. The alternation IS the idle
      // motion now, so the picture has to show both frames side by side.
      e.animTime = phase ? 1 / t.IDLE_FPS : 0;
      i++;
    }
  }
  console.log(`   ART.ready=${t.ART && t.ART.ready} frames=${t.ART ? Object.keys(t.ART.frames).length : 0}`);
  console.log("   poses: " + t.enemies.filter(e => e.alive)
    .map(e => e.kind + "/" + t.enemyPoseOf(e)).join(" "));
  t.drawEntities();
  writePNG("shot-rest.png", scale(raster(W, H, rects), W, H, k), W * k, H * k);
  console.log("wrote shot-rest.png (" + i + " figures, base and idleB)");
}
