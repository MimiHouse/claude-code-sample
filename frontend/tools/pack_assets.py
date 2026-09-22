#!/usr/bin/env python3
"""Build frontend/assets/ from free CC0 sprite packs.

WHY THIS EXISTS
    The characters were pixel arrays written by hand inside index.html: 32x48,
    one array cell per screen pixel. That was the right call when the buffer was
    640x360 and there was nothing else in the file, and it is the ceiling of what
    hand-authoring in a source file can carry -- 1,536 cells per pose, and a pose
    costs an afternoon.

    The render buffer is 1280x720 now, so a 32x48 sprite has four device pixels
    per art pixel and looks it. This fetches CC0 art at ~450px tall, brings it
    down to 72x104 -- drawn at 36x52 world units, so exactly 2:1 against the
    buffer and pixel-exact under nearest-neighbour -- and recolours it into the
    game's own palettes.

SOURCES  (all CC0 / public domain, commercial use, no attribution required;
          gameart2d.com/license.html: "Assets in the Freebies section are
          licensed under Creative Commons Zero (CC0) / Public Domain")
    ninjaadventurenew  Ninja Adventure  -> the player, and the warden
    ninjagirlnew       Ninja Girl       -> the rusher
    freeknight         The Knight       -> the charger

    One CC0 candidate was rejected on inspection rather than on licence:
    OpenGameArt's `ninja-black-32x32.png` (CC0, Morgan McGuire / DezrasDragons)
    is a four-direction RPG character drawn front-on. It is good art and it is
    useless here -- a side-scroller needs a profile, and only one of its seven
    columns is one.

WHY RECOLOUR AT ALL
    Two reasons, and the first is not taste. The source ninja's gi is #320636,
    luminance 19. Every sky band in this game sits under luminance 33 and the
    readability rule demands a 40-point gap from the body that jumps into open
    sky -- so the art as shipped would make the player invisible at the top of
    every jump. The palettes in index.html already encode the answer.

    The second is coherence: four characters from three artists share nothing.
    Mapped through the game's own ramps they read as one cast.

    The mapping is HISTOGRAM EQUALISATION, not a linear stretch. A linear map
    sends the source's dominant tone -- which is its DARKEST body tone, 23% of
    the pixels -- to the bottom of the ramp, and the character comes out as
    black with a rim light. Equalising sends the biggest bucket to the middle of
    the ramp, which is where a base colour belongs.

    FIVE steps per ramp, not three. Three held the means where the value plan
    wanted them and gave every character three flat colours, which on a 39px
    figure is a silhouette with a stripe in it. Five spans luminance 30 to 241
    and still lands each mean where it belongs, because equalisation uses the
    whole ramp evenly whatever its length -- so contrast is nearly free, and
    only the ramp's SPAN has to be chosen with the mean in mind.

    Colours are QUANTISED to the ramp rather than interpolated along it. The
    rest of the game is flat-shaded, and a smooth gradient next to it reads as a
    photograph someone pasted in.

    Order matters: downscale FIRST, then recolour. Quantising before the box
    filter leaves the filter averaging palette entries into colours that are not
    in the palette.

USAGE
    python3 frontend/tools/pack_assets.py            # fetch, build, report
    python3 frontend/tools/pack_assets.py --clean    # remove the built assets
    node frontend/shot.mjs                           # then LOOK at it
"""

import os, sys, zlib, struct, json, urllib.request, zipfile, re, hashlib

HERE = os.path.dirname(os.path.abspath(__file__))
FRONTEND = os.path.dirname(HERE)
ASSETS = os.path.join(FRONTEND, "assets")
CACHE = os.path.join(HERE, ".cache")

BASE = "https://www.gameart2d.com/uploads/3/0/9/1/30917885/"
PACKS = {
    "ninjaadventurenew": BASE + "ninjaadventurenew.zip",
    "ninjagirlnew":      BASE + "ninjagirlnew.zip",
    # 46MB, and worth it: one archive holds three separate side-view bodies --
    # Ninja, SamuraiHeavy and SamuraiLight -- which is what finally retired the
    # European knight that used to stand in for the heavy.
    "fh-samurai":        "https://opengameart.org/sites/default/files/Samurai_1.zip",
    "kenney-rpg": "https://kenney.nl/media/pages/assets/rpg-audio/"
                  "8e99002d76-1677590336/kenney_rpg-audio.zip",
    "kenney-impact": "https://kenney.nl/media/pages/assets/impact-sounds/"
                     "87b4ddecda-1677589768/kenney_impact-sounds.zip",
    "kenney-interface": "https://kenney.nl/media/pages/assets/interface-sounds/"
                        "fa43c1dd4d-1677589452/kenney_interface-sounds.zip",
}

# THE SOUND EFFECTS.
# One file per cue, picked from Kenney's CC0 packs against the descriptions in
# assets/README.md rather than by browsing -- that file says what each cue has
# to BE, and several of the choices fall straight out of it:
#
#   bladeKill   "the built-in is a struck bell against the swing's noise", so a
#               struck bell is the literal answer
#   bump        "a dull body thud; it must never sound like taking damage"
#   dryFire     "keep it tiny and unpitched, or it reads as an action"
#   dash        cloth and air, no pitch -- it fires on a key that may be held
#               down through a whole alley
#
# Two cues carry hard DURATION contracts from the same file, and build() checks
# them rather than trusting this table: `death` must stay under ~0.35s or it
# drones under the freeze frame, and `deathSting` has to resolve inside the
# ~1.05s freeze because the music is cut dead and it is alone in the mix.
#
# NOT AUDITIONED. There is no audio device on the machine this was built on, so
# these are chosen by name, by pack and by measured length. The lengths are
# verified; the timbres are the packs' own descriptions taken on trust.
SFX = {
    "slash":      ("kenney-rpg",       "Audio/knifeSlice.ogg"),
    "throw":      ("kenney-rpg",       "Audio/drawKnife1.ogg"),
    "dash":       ("kenney-rpg",       "Audio/cloth2.ogg"),
    "pickup":     ("kenney-rpg",       "Audio/metalClick.ogg"),
    "kill":       ("kenney-impact",    "Audio/impactPunch_medium_000.ogg"),
    "bladeKill":  ("kenney-impact",    "Audio/impactBell_heavy_000.ogg"),
    "bump":       ("kenney-impact",    "Audio/impactSoft_medium_000.ogg"),
    "death":      ("kenney-impact",    "Audio/impactMetal_heavy_000.ogg"),
    "dryFire":    ("kenney-interface", "Audio/click_001.ogg"),
    "flag":       ("kenney-interface", "Audio/confirmation_001.ogg"),
    "deathSting": ("kenney-interface", "Audio/glass_004.ogg"),
}

# The contracts from assets/README.md, enforced instead of remembered.
SFX_MAX = {"death": 0.35, "deathSting": 1.05}

# Per pack: the licence that travels with it, and whether that licence obliges
# the GAME to carry a credit. CC-BY does; CC0 does not. CREDITS_REQUIRED is read
# by the manifest and asserted against the in-game credits screen, so a CC-BY
# pack cannot be added without the credit appearing where a player can see it.
# THE MUSIC.
# The built-in loop is synthesised -- 148bpm, an eighth-note bass ostinato and a
# kit -- and it stays as the fallback, because it is what works from file:// with
# nothing downloaded. This is the track that plays once the assets folder is
# populated: a genuine C64 chiptune, which is the timbre the synth was reaching
# for and cannot actually reach.
#
# Supplying `music` switches the step scheduler off ENTIRELY rather than playing
# over it. That contract is in assets/README.md and predates this.
MUSIC = dict(
    file="music.ogg",
    url="https://opengameart.org/sites/default/files/c64_uptempo_chiptune.ogg",
    title="C64 Uptempo Chiptune",
    author="Skrjablin",
    licence="CC0 / public domain",
    page="https://opengameart.org/content/"
         "6-genuinely-c64-soundtracks-released-as-public-domain-may-2017",
    # The author: "Released as public domain, but I still appreciate if you want
    # to credit me, 'Skrjablin'." CC0 obliges nothing; crediting costs nothing.
    credit=False,
)

LICENCES = {
    "kenney-rpg":       dict(name="CC0 / public domain", author="Kenney",
                             url="https://kenney.nl/assets/rpg-audio", credit=False),
    "kenney-impact":    dict(name="CC0 / public domain", author="Kenney",
                             url="https://kenney.nl/assets/impact-sounds", credit=False),
    "kenney-interface": dict(name="CC0 / public domain", author="Kenney",
                             url="https://kenney.nl/assets/interface-sounds", credit=False),
    "ninjaadventurenew": dict(name="CC0 / public domain", author="gameart2d.com",
                              url="https://www.gameart2d.com/license.html", credit=False),
    "ninjagirlnew":      dict(name="CC0 / public domain", author="gameart2d.com",
                              url="https://www.gameart2d.com/license.html", credit=False),
    "fh-samurai":        dict(name="CC-BY 3.0", author="Ragewortt",
                              url="https://opengameart.org/content/fantasy-heroes-samurai-sprite-sheet",
                              credit=True),
}

# The body height, in destination pixels, that a character's REFERENCE pose is
# scaled to. Everything else about the frame box is measured, not chosen.
BODY_PX = 96

# The frame box is computed per character in two passes, because guessing it
# does not work. The first build fixed it at 72x104 and clipped 27 of 39 frames:
# a slide is a long low body, an overhead swing reaches above the head, and a
# knight is half again as wide as a ninja. Pass one measures every pose's extent
# either side of the foot centre and above the feet; pass two places the art
# into a box big enough for the worst of them.
#
# The box is symmetric about the foot centre because the loader centres frames
# horizontally -- an off-centre box would slide the body sideways. Both
# dimensions are kept EVEN so that the 2:1 draw size stays a whole number:
# RENDER_SCALE is 2, and a half-unit draw size would resample the art it exists
# to keep pixel-exact.
EDGE_MARGIN = 2

ALPHA_CUT = 110          # hard edges: pixel art has no 40%-opaque outline


# --------------------------------------------------------------- PNG in/out
def decode(path):
    d = open(path, "rb").read()
    assert d[:8] == b"\x89PNG\r\n\x1a\n", path
    p, W, H, depth, ctype = 8, 0, 0, 0, 0
    idat, plte, trns = b"", None, None
    while p + 8 <= len(d):
        ln = struct.unpack(">I", d[p:p + 4])[0]
        t, dat = d[p + 4:p + 8], d[p + 8:p + 8 + ln]
        if t == b"IHDR":
            W, H, depth, ctype = struct.unpack(">IIBB", dat[:10])
        elif t == b"IDAT": idat += dat
        elif t == b"PLTE": plte = dat
        elif t == b"tRNS": trns = dat
        elif t == b"IEND": break
        p += 12 + ln
    assert depth == 8, "%s: bit depth %d" % (path, depth)
    CH = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[ctype]
    raw, st = zlib.decompress(idat), W * CH
    lines, rp = bytearray(H * st), 0
    for y in range(H):
        f = raw[rp]; rp += 1
        cur = bytearray(raw[rp:rp + st]); rp += st
        prev = lines[(y - 1) * st:y * st] if y else bytes(st)
        if f:
            for i in range(st):
                a = cur[i - CH] if i >= CH else 0
                b = prev[i]
                c = prev[i - CH] if i >= CH else 0
                if f == 1: cur[i] = (cur[i] + a) & 255
                elif f == 2: cur[i] = (cur[i] + b) & 255
                elif f == 3: cur[i] = (cur[i] + ((a + b) >> 1)) & 255
                else:
                    q = a + b - c
                    pa, pb, pc = abs(q - a), abs(q - b), abs(q - c)
                    cur[i] = (cur[i] + (a if pa <= pb and pa <= pc else
                                        b if pb <= pc else c)) & 255
        lines[y * st:(y + 1) * st] = cur
    px = [[(0, 0, 0, 0)] * W for _ in range(H)]
    for y in range(H):
        row = px[y]
        for x in range(W):
            s = y * st + x * CH
            if ctype == 6: row[x] = (lines[s], lines[s+1], lines[s+2], lines[s+3])
            elif ctype == 2: row[x] = (lines[s], lines[s+1], lines[s+2], 255)
            elif ctype == 0: row[x] = (lines[s],) * 3 + (255,)
            elif ctype == 4: row[x] = (lines[s],) * 3 + (lines[s+1],)
            else:
                i = lines[s]; k = i * 3
                a = trns[i] if trns and i < len(trns) else 255
                row[x] = (plte[k], plte[k+1], plte[k+2], a)
    return W, H, px


def encode(path, W, H, px):
    raw = b"".join(b"\x00" + bytes(v for p in row for v in p) for row in px)
    def ch(t, dd):
        c = struct.pack(">I", len(dd)) + t + dd
        return c + struct.pack(">I", zlib.crc32(t + dd) & 0xffffffff)
    open(path, "wb").write(
        b"\x89PNG\r\n\x1a\n"
        + ch(b"IHDR", struct.pack(">IIBBBBB", W, H, 8, 6, 0, 0, 0))
        + ch(b"IDAT", zlib.compress(raw, 9)) + ch(b"IEND", b""))


# --------------------------------------------------------------- geometry
def lum(r, g, b):
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def bbox(W, H, px, thr=8):
    x0, y0, x1, y1 = W, H, -1, -1
    for y in range(H):
        row = px[y]
        for x in range(W):
            if row[x][3] > thr:
                if x < x0: x0 = x
                if x > x1: x1 = x
                if y < y0: y0 = y
                if y > y1: y1 = y
    assert x1 >= 0, "frame is empty"
    return x0, y0, x1, y1


def foot_centre(px, b, thr=8):
    """Horizontal centroid of the bottom 14% of the content.

    The content centre is the obvious choice and it is wrong: it swings with the
    arms and the sword, so a walk cycle registered on it slides the body sideways
    between frames. The feet are the one part of a walk that does not swing."""
    x0, y0, x1, y1 = b
    band = max(1, int((y1 - y0 + 1) * 0.14))
    tot = n = 0
    for y in range(y1 - band + 1, y1 + 1):
        for x in range(x0, x1 + 1):
            if px[y][x][3] > thr:
                tot += x; n += 1
    return (tot / n) if n else (x0 + x1) / 2.0


def body_scale(path, body_px=BODY_PX):
    """Source pixels per destination pixel, from ONE reference frame.

    Taken per frame instead, a raised sword counts as body height and the
    character shrinks for exactly the poses meant to read as the biggest."""
    W, H, px = decode(path)
    b = bbox(W, H, px)
    return (b[3] - b[1] + 1) / float(body_px)


def extent(path, scale):
    """How much room this pose needs, in destination pixels: left of the foot
    centre, right of it, and above the feet."""
    W, H, px = decode(path)
    b = bbox(W, H, px)
    fc = foot_centre(px, b)
    return ((fc - b[0]) / scale, (b[2] - fc) / scale, (b[3] - b[1] + 1) / scale)


def frame_box(paths, scale):
    import math
    l = r = h = 0.0
    for p in paths:
        a, bb, c = extent(p, scale)
        l, r, h = max(l, a), max(r, bb), max(h, c)
    half = int(math.ceil(max(l, r))) + EDGE_MARGIN
    fw = half * 2
    fh = int(math.ceil(h)) + EDGE_MARGIN
    if fw % 2: fw += 1
    if fh % 2: fh += 1
    return fw, fh


def place(path, scale, fw, fh):
    """Box-filter one source frame into an fw x fh canvas: feet on the bottom
    row, foot centre on the middle column. Colour is averaged weighted by alpha,
    or transparent pixels drag every edge toward black."""
    W, H, px = decode(path)
    b = bbox(W, H, px)
    fc = foot_centre(px, b)
    k = max(1, int(round(scale)))
    out = [[(0, 0, 0, 0)] * fw for _ in range(fh)]
    for oy in range(fh):
        sy0 = int(b[3] - (fh - 1 - oy) * scale) - k + 1
        orow = out[oy]
        for ox in range(fw):
            sx0 = int(fc + (ox - fw / 2.0) * scale)
            ar = ag = ab = aa = 0.0
            cnt = 0
            for y in range(sy0, sy0 + k):
                if y < 0 or y >= H: continue
                prow = px[y]
                for x in range(sx0, sx0 + k):
                    if x < 0 or x >= W: continue
                    r, g, bb, a = prow[x]
                    w = a / 255.0
                    ar += r * w; ag += g * w; ab += bb * w; aa += a
                    cnt += 1
            if cnt and aa > 0:
                ws = aa / 255.0
                orow[ox] = (int(ar / ws), int(ag / ws), int(ab / ws), int(aa / cnt))
    return out


# --------------------------------------------------------------- recolour
def ramp_of(*hexes):
    out = []
    for h in hexes:
        h = h.lstrip("#")
        out.append((int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)))
    return out


def build_cdf(frames):
    """Luminance CDF over the body pixels of the reference frames.

    Built once per character and shared by every frame, so the colours cannot
    drift between poses -- built per frame, the same gi is a different blue in
    idle and in the slash."""
    hist = [0] * 256
    for f in frames:
        for row in f:
            for r, g, b, a in row:
                if a < ALPHA_CUT: continue
                v = int(lum(r, g, b))
                if v < 8 or v > 247: continue        # outline and eye-white
                hist[v] += 1
    tot = sum(hist)
    assert tot, "no body pixels"
    cdf, run = [0.0] * 256, 0
    for v in range(256):
        run += hist[v]
        cdf[v] = run / tot
    return cdf


def saturation(r, g, b):
    mx, mn = max(r, g, b), min(r, g, b)
    return 0.0 if mx == 0 else (mx - mn) / float(mx)


def is_warm(r, g, b, sat_min):
    """A warm, saturated source pixel -- a sash, a scarf, a plume, gold trim.
    Routed to the character's accent ramp so the art keeps an accent instead of
    collapsing into a single hue.

    The threshold is per character and has to be, which the first build found
    the hard way. Ninja Girl's BODY is dark maroon (#4A2323, saturation 0.53),
    so a universal 0.34 classified the whole figure as accent and she came out
    teal -- the colour meant for her scarf -- at luminance 107, which is also
    the luminance of the alley wall she stands against. Her accent is the bright
    red at saturation 1.0, so her threshold sits above her own body."""
    return r > g and r >= b and saturation(r, g, b) > sat_min


def recolour(frame, cdf, body, accent, outline, white, sat_min):
    fh, fw = len(frame), len(frame[0])
    out = [[(0, 0, 0, 0)] * fw for _ in range(fh)]
    for y in range(fh):
        src, dst = frame[y], out[y]
        for x in range(fw):
            r, g, b, a = src[x]
            if a < ALPHA_CUT: continue
            v = lum(r, g, b)
            if v < 8:                               # the drawn outline
                dst[x] = outline + (255,); continue
            if v > 247 and saturation(r, g, b) < 0.15:
                dst[x] = white + (255,); continue   # eye, glint
            t = cdf[min(255, max(0, int(v)))]
            pal = accent if is_warm(r, g, b, sat_min) else body
            dst[x] = pal[min(len(pal) - 1, int(t * len(pal)))] + (255,)
    return out


def body_luma(frame, outline, white):
    """Mean luminance of the recoloured body, which is the figure the sky-band
    readability rule is actually about. Reported into the manifest so the suite
    can hold shipped art to the same rule as the built-in arrays."""
    tot = n = 0
    for row in frame:
        for r, g, b, a in row:
            if a < ALPHA_CUT: continue
            if (r, g, b) == outline or (r, g, b) == white: continue
            tot += lum(r, g, b); n += 1
    return (tot / n) if n else 0.0


# --------------------------------------------------------------- the cast
# Walk phases are chosen by MEASUREMENT, not by eye: a contact frame is the
# widest foot spread in the cycle and a passing frame the narrowest. The engine
# drives A->B->C->D by distance travelled, so A and C must be the two contacts.
def seq(ch, stem, idx):
    """Source file for one frame. Every pack names its frames differently, so the
    pattern travels with the character rather than being guessed from the pack:
      gameart2d   png/Idle__000.png        -> "{stem}{idx:03}.png"
      FH samurai  SamuraiHeavy/Walk/3.png  -> "{stem}/{idx}.png"
    """
    return os.path.join(CACHE, ch["pack"], ch["dir"],
                        ch["fmt"].replace("{stem}", stem).replace("{idx}", str(idx))
                                 .replace("{idx3}", str(idx).zfill(3)))


CAST = [
    dict(kind="ninja", pack="ninjaadventurenew", dir="png",
         fmt="{stem}{idx3}.png", ref=("Idle__", 0), body_px=96,
         # RAMP LENGTH SETS THE MEAN, WHICH IS THE READABILITY BUDGET.
         # Equalisation puts the bulk of the body in the middle of whatever
         # ramp it is given, so the ramp's own span decides where the character
         # sits in value -- and the first build included the gi's rim highlight
         # (#8FAEEE, luminance 177) in the player's ramp, which dragged his
         # mean to 101 while the rusher landed at 105. Blue and purple at the
         # same value is the classic confusion pair, and the original palettes
         # had deliberately put them 73 apart.

         # So the player's ramp stops at the lit edge. Mean 73 -- exactly the
         # figure the sky bands are pinned 40 points below -- and every enemy
         # ramp starts above it. 
         # The top step is the gi's LIT edge, not its rim highlight. #8FAEEE
         # (luminance 172) pulled the player's mean to 94 against the IRONCLAD's
         # 119 -- a 25-point gap where the suite asks for 30. #6E92D8 keeps the
         # five steps and the contrast and puts the mean back on 80.
         body=ramp_of("#141E3A", "#1B2A50", "#2E4A8C", "#4E72C4", "#6E92D8"),
         accent=ramp_of("#A8302A", "#E8563F", "#FF9377"),
         outline="#0E0B12", white="#FFFFFF",
         poses={
             "idle":        ("Idle__", 0),
             "idleB":       ("Idle__", 5),
             "walkA":       ("Run__", 3),      # contact, widest stance
             "walkB":       ("Run__", 6),      # passing, narrowest
             "walkC":       ("Run__", 8),      # contact
             "walkD":       ("Run__", 0),      # passing
             "jump":        ("Jump__", 4),
             "land":        ("Jump__", 9),
             # draw and slash are one move in two halves and the hitbox does not
             # exist during draw, so draw must show the blade LEAVING the
             # scabbard -- a draw frame with the sword already swung reads as a
             # hit that does not land.
             "draw":        ("Attack__", 2),
             "slash":       ("Attack__", 6),
             "throw":       ("Throw__", 5),
             "crouch":      ("Slide__", 2),
             "crouchThrow": ("Jump_Throw__", 5),
         }),
    dict(kind="rusher", pack="ninjagirlnew", dir="png",
         fmt="{stem}{idx3}.png", ref=("Idle__", 0), body_px=92,
         # Her body is dark maroon; only the bright red is an accent.
         accent_sat=0.86,
         body=ramp_of("#3A2050", "#7A3FA0", "#B57FE8", "#D2ABF5", "#EDDCFA"),
         accent=ramp_of("#0F3A46", "#1F7183", "#46B8C8"),
         outline="#17121C", white="#FFFFFF",
         poses={
             "base":     ("Idle__", 0),
             # A real second idle frame, so a standing enemy breathes on the
             # artist's own animation rather than on a generated pixel shift.
             "idleB":    ("Idle__", 5),
             "walkA":    ("Run__", 3), "walkB": ("Run__", 6),
             "walkC":    ("Run__", 8), "walkD": ("Run__", 0),
             "leap":     ("Jump__", 4),
             "wallGrab": ("Climb_", 3),
             "wallOver": ("Climb_", 6),
             "coil":     ("Slide__", 2),
             # The corpse. `coil` used to stand in for it and it is a CROUCH at
             # best -- on the samurai packs it is a braced combat stance, so a
             # collapsing body looked like a body standing up. Each pack has its
             # own death animation; this is a frame from late in it, when the
             # body is down.
             # Two frames of it, not one. Snapping straight to the final frame
             # put a body flat on the ground two frames after the hit, which is
             # a corpse appearing rather than a body falling.
             # CHOSEN BY ASPECT RATIO, not by eye. A body on the ground is
             # WIDE and SHORT; a body still falling is not. The death
             # animations run a full ten frames each and the content aspect
             # reports exactly where the body lands:
             #   SamuraiHeavy  0.90 .. 0.58 .. 1.61   -> down at 9
             #   SamuraiLight  0.75 .. 0.66 .. 1.74   -> down at 8
             #   Ninja Girl    0.59 .. 1.51 (settles) -> down at 5
             # The first pass used frame 6 for both samurai, which is 0.79 and
             # 1.12 -- barely tipped over -- so the corpse read as standing.
             "falling":  ("Dead__", 2),
             "down":     ("Dead__", 5),
         }),
    # IRONCLAD: the heavy, and the reason a fourth pack was worth 46MB.
    # It used to be gameart2d's Knight -- plumed helm, round shield,
    # unmistakably European -- which was the right SHAPE for the heavy and the
    # wrong costume for a game whose other three are shinobi. This is an
    # armoured samurai with a two-handed blade: the widest silhouette in the
    # cast (content 210px wide against the light samurai's 167) and in the
    # right tradition.
    #
    # The trade is real and it is in the walk. The gameart2d cycles are ten
    # frames covering two full steps, foot spread swinging 0.14 to 0.76. These
    # are ten files holding FIVE unique frames ping-ponged, so they are a single
    # low-amplitude step and there is no second contact to find. The four phases
    # below are the four most distinct frames available, taken from Run rather
    # than Walk because Run has the wider spread, and they read as a gait rather
    # than as a true two-step cycle. Style won that argument; the PLAYER keeps a
    # real four-phase cycle because the player keeps the gameart2d body.
    dict(kind="charger", pack="fh-samurai", dir="SamuraiHeavy",
         fmt="{stem}/{idx}.png", ref=("Stand", 0), body_px=98,
         # ACCENT ROUTING OFF. Both samurai have a saturated warm BODY -- the
         # heavy's armour is #802A22 at hue 5 and saturation 0.58, and the
         # light's largest single colour is skin at #E6AB6C, hue 31, 18.6% of
         # the figure. Any warm-accent test wide enough to catch a sash catches
         # the whole character, which is what dropped the IRONCLAD to luminance
         # 88 against the player's 80 on the first build of this pack.
         #
         # Turned off, plain luminance does the right thing by itself: the skin
         # is the brightest thing on the figure and lands at the top of the
         # ramp, the armour is mid, the underlayer is low. The ninja packs still
         # need the routing, because on them the warm colour really is a scarf.
         accent_sat=0.95,

         # The heavy reads darker, which is both a design cue and the only
         # room left on the value axis. With the player pinned at 80 by the sky
         # rule and the warden wanting the top of the range, three enemies have
         # to fit above 80 without crowding: the first build of this pack put
         # the IRONCLAD at 155 and the GLAIVE at 160, five apart, which is not
         # a difference anyone can see mid-fight. 115 / 139 / 177 now. 
         # Nudged up a step. Adding the two death frames shifted the measured
         # mean to 117 against the player's 88 -- a 29-point gap where the suite
         # asks for 30, which is the assertion doing its job on a change that
         # had nothing to do with colour. The span is unchanged; it just sits
         # slightly higher.
         body=ramp_of("#4A2C16", "#7A4824", "#B07C44", "#DCA46C", "#F2D4B0"),
         accent=ramp_of("#5E1410", "#9E2418", "#CE4A32"),
         outline="#2A1710", white="#FFFFFF",
         poses={
             "base":  ("Stand", 0),
             "idleB": ("Stand", 4),
             "walkA": ("Run", 2), "walkB": ("Run", 0),
             "walkC": ("Run", 4), "walkD": ("Run", 1),
             "attack": ("Attack2H", 5),
             "lunge":  ("Attack2H", 2),
             "coil":   ("Alert2H", 0),
             "falling": ("Die", 5),      # aspect 0.70, mid-fall
             "down":   ("Die", 9),        # aspect 1.61, on the ground
         }),
    # GLAIVE: the thrower. It used to share the PLAYER's body -- three packs for
    # four characters -- separated only by colour, height and the fact that
    # enemies are mirrored. Same body as the hero is the one thing a player
    # should never have to squint at, so it is its own figure now: the light
    # samurai, slimmer than the IRONCLAD and taller than it looks, which is the
    # low-centre-of-gravity read its design note always wanted.
    #
    # Its `aim` and `sweep` are stances rather than attack frames, and that is
    # fine here: drawEnemyWeapon() draws the levelled polearm, the sight line and
    # the low arc in CODE, over whatever pose is underneath. The pose only has to
    # look committed.
    dict(kind="warden", pack="fh-samurai", dir="SamuraiLight",
         fmt="{stem}/{idx}.png", ref=("Stand", 0), body_px=88,
         accent_sat=0.95,     # see the IRONCLAD note above

         body=ramp_of("#31491F", "#5E8A3C", "#8FC45E", "#C4E49A", "#E8F6D4"),
         accent=ramp_of("#3A3226", "#6B5E45", "#9A8A68"),
         outline="#16220F", white="#FFFFFF",
         poses={
             "base":  ("Stand", 0),
             "idleB": ("Stand", 4),
             "walkA": ("Run", 2), "walkB": ("Run", 0),
             "walkC": ("Run", 4), "walkD": ("Run", 1),
             "aim":   ("Alert1H", 0),
             "sweep": ("Attack1H", 5),
             "duck":  ("Alert1H", 3),
             "coil":  ("Attack1H", 1),
             "falling": ("Die", 4),      # aspect 0.84, mid-fall
             "down":  ("Die", 8),         # aspect 1.74, on the ground
         }),
]


# --------------------------------------------------------------- fetch
def fetch_music():
    """Straight download, no archive. Written into assets/ rather than the cache
    because it IS the shipped artefact -- there is nothing to repack."""
    os.makedirs(ASSETS, exist_ok=True)
    dest = os.path.join(ASSETS, MUSIC["file"])
    if os.path.exists(dest):
        return dest
    sys.stderr.write("fetching music ...\n")
    req = urllib.request.Request(MUSIC["url"],
                                 headers={"User-Agent": "clawd-jump/pack"})
    with urllib.request.urlopen(req, timeout=300) as r, open(dest, "wb") as f:
        f.write(r.read())
    # A truncated download is worse than none: the loader would fail to decode
    # it and fall back silently, which looks like the manifest being ignored.
    head = open(dest, "rb").read(4)
    if head != b"OggS":
        os.remove(dest)
        raise SystemExit("music download is not an Ogg stream")
    return dest


def fetch():
    os.makedirs(CACHE, exist_ok=True)
    for name, url in PACKS.items():
        out = os.path.join(CACHE, name)
        if os.path.isdir(out):
            continue
        zp = out + ".zip"
        if not os.path.exists(zp):
            sys.stderr.write("fetching %s ...\n" % name)
            req = urllib.request.Request(url, headers={"User-Agent": "clawd-jump/pack"})
            with urllib.request.urlopen(req, timeout=180) as r, open(zp, "wb") as f:
                f.write(r.read())
        unpack(zp, out)
        sys.stderr.write("  unpacked %s\n" % name)


def ogg_seconds(path):
    """Duration of an Ogg Vorbis file, from the identification header's sample
    rate and the last page's granule position. Enough to hold a cue to a
    contract without decoding a single sample."""
    d = open(path, "rb").read()
    if d[:4] != b"OggS":
        raise SystemExit("%s is not an Ogg stream" % path)
    i = d.index(b"\x01vorbis")
    rate = struct.unpack("<I", d[i + 12:i + 16])[0]
    j = d.rindex(b"OggS")
    gran = struct.unpack("<Q", d[j + 6:j + 14])[0]
    return gran / float(rate)


def build_sfx():
    """Copy each chosen cue out of its pack and into assets/, named by cue.

    Named by CUE and not by source file on purpose: the manifest maps cue to
    filename, and a filename that says what the sound IS survives swapping the
    pack it came from."""
    out = {}
    for cue, (pack, rel) in sorted(SFX.items()):
        src = os.path.join(CACHE, pack, rel)
        if not os.path.exists(src):
            raise SystemExit("missing sound %s" % src)
        secs = ogg_seconds(src)
        cap = SFX_MAX.get(cue)
        if cap and secs > cap:
            raise SystemExit(
                "cue '%s' is %.3fs; assets/README.md caps it at %.2fs (%s)"
                % (cue, secs, cap, rel))
        name = "sfx-%s.ogg" % cue
        with open(src, "rb") as f, open(os.path.join(ASSETS, name), "wb") as g:
            g.write(f.read())
        out[cue] = (name, secs, pack, rel)
    return out


def unpack(zp, out):
    """Extract a downloaded zip, refusing any member that would land outside the
    destination.

    zipfile.extractall() honours whatever paths are inside the archive, so an
    entry named `../../../.ssh/authorized_keys` writes there. The archives this
    fetches are fine today and come from a URL in this file, but "the remote
    file is currently benign" is not a property the script can check, and it
    re-downloads on demand -- so the check belongs here rather than in a note.
    Python 3.12's `filter="data"` does the same thing; this works on 3.9, which
    is what the box has."""
    root = os.path.realpath(out)
    with zipfile.ZipFile(zp) as z:
        for m in z.infolist():
            dest = os.path.realpath(os.path.join(out, m.filename))
            if dest != root and not dest.startswith(root + os.sep):
                raise SystemExit("refusing zip member outside the destination: %s"
                                 % m.filename)
        z.extractall(out)


# --------------------------------------------------------------- build
def build():
    fetch()
    fetch_music()
    sfx = build_sfx()
    for cue in sorted(sfx):
        name, secs, pack, rel = sfx[cue]
        sys.stderr.write("  %-11s %-34s %5.3fs\n" % (cue, rel.split("/")[-1], secs))
    os.makedirs(ASSETS, exist_ok=True)
    frames, meta = {}, {}
    for ch in CAST:
        refp = seq(ch, *ch["ref"])
        if not os.path.exists(refp):
            raise SystemExit("missing reference frame %s" % refp)
        scale = body_scale(refp, ch["body_px"])
        outline = ramp_of(ch["outline"])[0]
        white = ramp_of(ch["white"])[0]
        paths = {}
        for pose, (stem, idx) in sorted(ch["poses"].items()):
            p = seq(ch, stem, idx)
            if not os.path.exists(p):
                raise SystemExit("missing source frame %s" % p)
            paths[pose] = p
        fw, fh = frame_box(paths.values(), scale)
        ch["_box"] = (fw, fh)
        placed = {pose: place(p, scale, fw, fh) for pose, p in paths.items()}
        cdf = build_cdf([placed[k] for k in sorted(placed)][:3])
        lumas = []
        for pose, f in placed.items():
            rc = recolour(f, cdf, ch["body"], ch["accent"], outline, white,
                          ch.get("accent_sat", 0.34))
            frames["%s/%s" % (ch["kind"], pose)] = rc
            lumas.append(body_luma(rc, outline, white))
        lic = LICENCES[ch["pack"]]
        meta[ch["kind"]] = {
            "pack": ch["pack"],
            "licence": lic["name"],
            "author": lic["author"],
            "creditRequired": lic["credit"],
            "bodyLuma": round(sum(lumas) / len(lumas), 1),
            "poses": len(placed),
        }
        meta[ch["kind"]]["frame"] = {"w": fw, "h": fh, "dw": fw // 2, "dh": fh // 2}
        sys.stderr.write("  %-8s %2d poses  scale %.2f  box %dx%d -> %dx%d world"
                         "  body luminance %.0f\n" %
                         (ch["kind"], len(placed), scale, fw, fh, fw // 2, fh // 2,
                          meta[ch["kind"]]["bodyLuma"]))

    # Atlas: a shelf packer. Frame sizes differ per character now, so rows
    # are grouped by frame height and each shelf is as tall as its own
    # frames. A fancier packer would save a few kilobytes of transparent
    # padding and cost the ability to read the sheet by eye, which is worth
    # more here -- that sheet is how clipping gets noticed.
    names = sorted(frames)
    cols = 8
    shelves, cur = [], []
    for n in names:
        if cur and (len(cur) >= cols or
                    len(frames[cur[0]]) != len(frames[n])):
            shelves.append(cur); cur = []
        cur.append(n)
    if cur: shelves.append(cur)
    AW = max(sum(len(frames[n][0]) for n in sh) for sh in shelves)
    AH = sum(len(frames[sh[0]]) for sh in shelves)
    atlas = [[(0, 0, 0, 0)] * AW for _ in range(AH)]
    table = {}
    oy = 0
    for sh in shelves:
        ox = 0
        sh_h = len(frames[sh[0]])
        for n in sh:
            f = frames[n]
            fh2, fw2 = len(f), len(f[0])
            for y in range(fh2):
                arow, frow = atlas[oy + y], f[y]
                for x in range(fw2):
                    arow[ox + x] = frow[x]
            table[n] = {"x": ox, "y": oy, "w": fw2, "h": fh2,
                        "dw": fw2 // 2, "dh": fh2 // 2}
            ox += fw2
        oy += sh_h
    encode(os.path.join(ASSETS, "sprites.png"), AW, AH, atlas)

    # A CONTENT VERSION, for cache busting.
    # manifest.json is fetched no-cache, but the atlas is loaded through an
    # Image whose src the browser caches like any other picture -- so a rebuild
    # served a FRESH manifest against a STALE sprites.png, and the title screen
    # came back with the previous cast on it after a refresh. The loader appends
    # this to the atlas and audio URLs.

    # A content hash rather than a timestamp: it changes when the bytes change
    # and not when the script is merely re-run, so a rebuild that produces
    # identical art keeps the cached copy. 
    ver = hashlib.sha1()
    for f in ["sprites.png", MUSIC["file"]] + ["sfx-%s.ogg" % c for c in sorted(SFX)]:
        p = os.path.join(ASSETS, f)
        if os.path.exists(p):
            ver.update(open(p, "rb").read())

    manifest = {
        "atlas": "sprites.png",
        "version": ver.hexdigest()[:12],
        "audio": dict({c: sfx[c][0] for c in sfx}, music=MUSIC["file"]),
        "frames": table,
        "meta": {
            "generator": "frontend/tools/pack_assets.py",
            "licence": "mixed: CC0 and CC-BY 3.0; see characters[].licence",
            "sources": sorted({c["pack"] for c in CAST}),
            # The packs whose licence obliges the GAME to carry a credit. The
            # suite reads this and fails if a name here is missing from the
            # in-game credits screen, so art cannot be added on a CC-BY licence
            # without the attribution arriving with it. 
            "creditRequired": sorted({LICENCES[c["pack"]]["author"] for c in CAST
                                      if LICENCES[c["pack"]]["credit"]}),
            "packLicences": {p: LICENCES[p] for p in sorted({c["pack"] for c in CAST})},
            "bodyPx": BODY_PX,
            "music": {k: MUSIC[k] for k in
                      ("file", "title", "author", "licence", "page")},
            "sfx": {c: {"file": sfx[c][0], "seconds": round(sfx[c][1], 3),
                        "source": sfx[c][3], "pack": sfx[c][2]}
                    for c in sorted(sfx)},
            "characters": meta,
        },
    }
    with open(os.path.join(ASSETS, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1, sort_keys=True)
    sys.stderr.write("wrote assets/sprites.png %dx%d (%d frames) and manifest.json\n"
                     % (AW, AH, len(names)))


def clean():
    for f in (["sprites.png", "manifest.json", MUSIC["file"]]
              + ["sfx-%s.ogg" % c for c in SFX]):
        p = os.path.join(ASSETS, f)
        if os.path.exists(p):
            os.remove(p); sys.stderr.write("removed assets/%s\n" % f)


if __name__ == "__main__":
    if "--clean" in sys.argv: clean()
    else: build()
