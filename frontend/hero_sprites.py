# The hero at NATIVE resolution: 32x48, one array cell per screen pixel.
# The old sprite was 16x24 painted at 2x -- 384 pixels for a whole character,
# with a head seven blocks across. This has 1536 and a real shading ramp.
#
# Light comes from the upper right, the way he faces: L catches the leading
# edge of every limb, D trails it. Structure is carried by bands rather than by
# outline changes -- knee wrap, ankle wrap, boot -- because at seven pixels of
# leg width an outline taper reads as noise.
COLS, ROWS = 32, 48
BLANK = "." * COLS

def row(pad, body):
    assert pad >= 0 and pad + len(body) <= COLS, (pad, len(body), body)
    return "." * pad + body + "." * (COLS - pad - len(body))

def paste(rows, r, c, s):
    line = list(rows[r])
    for i, ch in enumerate(s):
        if ch == "~":
            continue
        assert 0 <= c + i < COLS, (r, c, s)
        line[c + i] = ch
    rows[r] = "".join(line)

def chk(rows, want):
    assert len(rows) == want, "%d rows, want %d" % (len(rows), want)
    for i, r in enumerate(rows):
        assert len(r) == COLS, "row %d is %d cols: %r" % (i, len(r), r)
    return rows

# ---------------------------------------------------------------- HEAD 0..10
def head():
    h = [
        BLANK,
        row(11, "KKKKKKK"),
        row(10, "KDDBBBBLK"),
        row( 9, "KDDBBBBBLK"),
        row( 9, "KDDBBBBBLKK"),
        row( 9, "KDDBBBBLffK"),
        row( 9, "KDDBBBBLfWKfK"),
        row( 9, "KDDBBBBLffffK"),
        row( 9, "KKDDBBBLfffK"),
        row(10, "KKDBBBBLffK"),
        row(11, "KKDBBBLfK"),
    ]
    chk(h, 11)
    # Hood ties trailing behind the head, picked up again by the scarf below.
    paste(h, 5, 7, "SR")
    paste(h, 6, 6, "SRr")
    paste(h, 7, 5, "SSRr")
    paste(h, 8, 5, "SRr")
    paste(h, 9, 6, "SR")
    return chk(h, 11)

# ------------------------------------------------------------- TORSO 11..28
def torso(arm):
    t = [
        row(12, "KKBBBKK"),
        row(10, "KKDBBBBBLKK"),
        row( 8, "KDDBBBBBBBLLK"),
        row( 7, "KDDDBBBBBBBBLLK"),
        row( 7, "KDDDBBBBBBBBLLK"),
        row( 7, "KDDDGBBBBBBBLLK"),
        row( 7, "KDDBGgBBBBBBLLK"),
        row( 7, "KDDBBGgBBBBBLLK"),
        row( 7, "KDDBBBGgBBBBLLK"),
        row( 7, "KDDBBBBGgBBBLLK"),
        row( 8, "KDDBBBBGgBLLK"),
        row( 8, "KSSRRRRRRRrrK"),
        row( 8, "KSSRRRKRRRrrK"),
        row( 8, "KSRRRRRRRRrrK"),
        row( 7, "KDDBBBBBBBBBLLK"),
        row( 7, "KDDBBBBBBBBBLLK"),
        row( 7, "KDDBBBBBBBBBLLK"),
        row( 8, "KDDBBBBBBBBLLK"),
    ]
    chk(t, 18)
    # Scarf tail, streaming behind the shoulder.
    paste(t, 0, 8, "SR")
    paste(t, 1, 7, "SRr")
    paste(t, 2, 5, "SSRr")
    paste(t, 3, 4, "SRr")
    # The near arm. Stamped, so each pose puts it where the stride wants it.
    #
    # Two things were wrong when this was a 4-wide bar: it started at column 22
    # while the torso's outline ended at 21, so two outlines sat side by side
    # and read as a gap -- the arm looked like luggage. And it had no joint, so
    # ten identical rows read as a plank. The shoulder rows now OVERWRITE the
    # torso edge so the two share a silhouette, and the limb steps down from a
    # 4-wide upper arm through an elbow band to a 3-wide forearm and a hand.
    def stamp_arm(col, rows_):
        for dr, c_off, seg in rows_:
            paste(t, dr, col + c_off, seg)

    # (local row, column offset, segment). Row 3 is the shoulder.
    ARM_DOWN = [(3, -1, "LLLK"), (4, -1, "BLLK"),       # merges into the torso
                (5,  0, "KBLK"), (6, 0, "KBLK"),
                (7,  0, "KgLK"),                        # elbow band
                (8,  0, "KBLK"), (9, 0, "KBLK"),
                (10, 0, "KGgK"), (11, 0, "KffK"), (12, 0, "KKK")]
    # Explicit columns: the shoulder rows reach right to column 7 so they merge
    # with the torso edge, and the limb itself hangs at 3..6, clear of it.
    ARM_BACK_ABS = [(3, 5, "LLLL"), (4, 5, "KLLL"),
                    (5, 4, "KBLK"), (6, 4, "KgLK"),
                    (7, 4, "KBLK"), (8, 4, "KGgK"),
                    (9, 4, "KffK"), (10, 4, "KKK")]
    ARM_FWD  = [(3, -1, "LLLK"), (4, -1, "BLLK"),
                (5,  0, "KBLK"), (6, 0, "KgLK"),
                (7,  0, "KBLK"), (8, 0, "KGgK"),
                (9,  0, "KffK"), (10, 0, "KKK")]
    if arm == "down":
        stamp_arm(21, ARM_DOWN)
    elif arm == "back":
        for dr, c, seg in ARM_BACK_ABS:
            paste(t, dr, c, seg)
    elif arm == "fwd":
        stamp_arm(22, ARM_FWD)
    elif arm == "throw":                      # extended at shoulder height
        paste(t, 3, 20, "LLLLLLLK")
        paste(t, 4, 20, "LBLgGffK")
        paste(t, 5, 20, "KKKKKffK")
        paste(t, 6, 25, "KKK")
    elif arm == "draw":
        # Sword arm raised and pulled back; the BLADE is painted after the
        # sprite is composed, by draw_pose(), because it has to run up past the
        # head and the torso block cannot reach there. Held at the hip instead
        # it was seven pixels of white behind a torso and read as a scrap of
        # cloth rather than as a sword.
        paste(t, 2, 4, "LLLK")                # shoulder, drawn back
        paste(t, 3, 4, "KBLK")
        paste(t, 4, 4, "KgLK")                # elbow
        paste(t, 5, 5, "KffK")                # the grip
        paste(t, 6, 6, "KKK")
        paste(t, 3, 21, "LLLK")               # free arm, forward and across
        paste(t, 4, 22, "KBLK")
        paste(t, 5, 22, "KffK")
        paste(t, 6, 22, "KKK")
    elif arm == "slash":
        """THE CUT. The blade now runs the full width the sprite has left: the
        arm starts at the shoulder on column 16 and the tip is on column 31, so
        the steel itself is eighteen columns and four rows thick, with a white
        lit edge along the top.

        Three versions. Six columns of flat grey jammed against the right edge
        was a spark, not a sword, and the melee read as a shove. Fourteen columns
        was a sword but a short one, and the hitbox went to 46px with the reach,
        which a fourteen-column blade underdraws -- art smaller than its own
        hitbox is a lie about reach, and it is the kind a player feels before
        they can name it."""
        # The blade sweeps ACROSS the chest and out. Holding the hilt at the
        # body's right edge caps the steel at about twelve columns, because the
        # tip cannot pass column 30; carrying the hands over to the far hip -- a
        # follow-through, which is the half of a cut that is actually visible --
        # buys four more and reads as a swing rather than a pose.
        paste(t, 0, 20, "KWWWWWWWWWWK")
        paste(t, 1, 17, "KKMWWWWWWWWWWWK")
        paste(t, 2, 14, "KLMMMMMMMMMMMMMMMK")
        paste(t, 3, 12, "KLgGMMMMMMMMMMMMMMK")   # hand, guard, blade
        paste(t, 4, 12, "KffKMMMMMMMMMK")
        paste(t, 5, 12, "KffK")
        paste(t, 6, 13, "KKK")
    return chk(t, 18)

# --------------------------------------------------------------- LEGS 29..47
# 7 columns per leg: outline, shadow, three of base, light, outline. Bands at
# knee, ankle and boot give the leg its joints.
STAND = "KDBBBLK" + "KDBBBLK"          # 14 wide, seam at the middle
KNEE  = "KDgggLK" + "KDgggLK"
ANKLE = "KGgggLK" + "KGgggLK"

def legs_idle(near, far):
    L = ([row(9, "KDDBBBBBBBBLLK"), row(9, "KDDBBBBBBBBLLK")]
         + [row(9, STAND)] * 6
         + [row(9, KNEE)] * 2
         + [row(9, STAND)] * 5
         + [row(9, ANKLE)]
         + [row(9, "KGGGGGKKGGGGGK"),
            row(8, "KGGGGGGKKGGGGGGgK"),
            row(8, "KKKKKKK.KKKKKKKKK")])
    return chk(L, 19)

# A leg is a THREE-POINT limb: hip, knee, ankle. Everything else is generated
# from those three numbers.
#
# It used to be a 7-wide horizontal run sliding linearly from a hip column to a
# foot column: one rigid stick per leg, with no knee anywhere in it. Two things
# followed, and both were reported.
#
#  - With no knee, the only thing a cycle could vary was the ANGLE of two
#    straight sticks, so it read as a pair of scissors opening and closing
#    rather than as walking. Real walking is carried almost entirely by the
#    knee: the stance leg straightens to hold the weight while the swing leg
#    folds to get its foot past the ground, and a straight stick can do neither.
#  - The K outline was written into each row's string at a fixed offset, so on
#    a diagonal each row placed its outline one column across from the row
#    above and the staircase showed through as a torn edge. It was worst exactly
#    where the legs were furthest apart, which is where it was noticed.
#
# The outline here is DERIVED from the filled mask once both legs and the
# pelvis are painted: any empty cell touching a filled one becomes K. That is
# correct at any slope, it cannot drift out of step with the fill, and it closes
# the seam between the two legs into a single silhouette.

# Widths are picked from a table by band, NOT interpolated. A float taper
# rounded to pixels wobbles between 4 and 6 from one row to the next, and a leg
# whose width flickers row by row reads as a tear rather than as a taper.
W_THIGH, W_SHIN, W_BOOT = 6, 5, 6
F_THIGH, F_BOOT = 0.30, 0.80        # where the thigh ends and the boot begins

def _lerp(a, b, u):
    return a + (b - a) * u

def _paint_leg(grid, top, nrows, fill, lit, hip, knee, ankle, knee_at, stop,
               toe=1):
    """Paint one leg into `grid`. `knee_at` is how far down the leg the knee
    sits, as a fraction, so a bend is a real change of direction rather than a
    wider stripe. Rows past `live` are the foot held clear of the ground."""
    live = nrows - stop
    for i in range(live):
        f = i / max(1, live - 1)
        if f <= knee_at:
            u = f / knee_at if knee_at > 0 else 1.0
            cx = _lerp(hip, knee, u)
        else:
            u = (f - knee_at) / max(1e-6, 1.0 - knee_at)
            cx = _lerp(knee, ankle, u)
        rem = live - 1 - i
        # The foot does not slide. Below the ankle the centre is FROZEN at the
        # ankle column: interpolating on through the boot made the sole step
        # sideways a pixel per row, so the foot arrived looking chewed.
        if rem <= 3:
            cx = ankle
        w = W_THIGH if f <= F_THIGH else (W_BOOT if f > F_BOOT else W_SHIN)
        x0 = int(round(cx - w / 2.0))
        if rem <= 1:
            # A FOOT, not the end of the shin. The old leg simply narrowed to a
            # stub, which is why the feet read as points; a sole is flat, wider
            # than the ankle, and set forward of it.
            x0 += 1 if toe > 0 else -2
            seg = ["G"] * 6 + ["g"] if rem == 1 else ["G"] * 7
        elif rem <= 3:
            seg = ["G"] * (w - 1) + ["g"]                    # boot
        elif rem <= 5:
            seg = ["G"] + ["g"] * (w - 2) + ["L"]            # ankle wrap
        elif abs(f - knee_at) <= 0.055:
            seg = ["D"] + ["g"] * (w - 2) + ["L"]            # knee wrap
        elif lit:
            seg = ["D"] + [fill] * (w - 2) + ["L"]
        else:
            # The far leg keeps its interior shade -- filling it flat with D
            # made it a black slab with no form in it -- but loses the lit
            # edge and takes shadow on BOTH sides. That is the depth cue that
            # separates the two contact frames, whose silhouettes are identical.
            seg = ["D"] + [fill] * (w - 2) + ["D"]
        for k, ch in enumerate(seg):
            c = x0 + k
            if 0 <= c < COLS:
                grid[top + i][c] = ch

def _outline(grid):
    """A 1px border around everything painted. Nothing is written above row 0,
    so the seam where the pelvis meets the torso stays open -- a K across it
    would cut the body in half."""
    h = len(grid)
    solid = [[grid[r][c] != "." for c in range(COLS)] for r in range(h)]
    for r in range(h):
        for c in range(COLS):
            if solid[r][c]:
                continue
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                rr, cc = r + dr, c + dc
                if 0 <= rr < h and 0 <= cc < COLS and solid[rr][cc]:
                    grid[r][c] = "K"
                    break
    return grid

def _leg_grid(nrows, spec, base):
    g = [["."] * COLS for _ in range(nrows)]
    hip, knee, ankle, knee_at, stop, lit, fill = spec
    _paint_leg(g, 0, nrows, fill or base, lit, hip, knee, ankle, knee_at, stop)
    return g

def leg_pair(nrows, front, back, base):
    """One pelvis row plus `nrows` of leg, as a finished block. front/back are
    (hip, knee, ankle, knee_at, stop, lit, fill); fill None means `base`."""
    grid = [["."] * COLS for _ in range(nrows + 1)]
    for k, ch in enumerate("DD" + base * 8 + "LL"):
        grid[0][10 + k] = ch
    gb, gf = _leg_grid(nrows, back, base), _leg_grid(nrows, front, base)
    for r in range(nrows):
        for c in range(COLS):
            if gb[r][c] != ".":
                grid[1 + r][c] = gb[r][c]
    # The FRONT leg's own outline, but ONLY where it actually overlaps the back
    # leg. The derived outline fills empty cells, so on its own it cannot
    # separate an overlap -- and in the passing frames one leg genuinely does
    # pass in front of the other, which is how the two merged into one wide
    # mass with a stripe down it. Stamping the whole dilation instead of just
    # the overlap put a K crust two and three columns deep down the outside of
    # the front leg, because _outline() then drew its own border around that.
    for r in range(nrows):
        for c in range(COLS):
            if gf[r][c] == ".":
                continue
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    rr, cc = r + dr, c + dc
                    if not (0 <= rr < nrows and 0 <= cc < COLS):
                        continue
                    if gf[rr][cc] == "." and gb[rr][cc] != ".":
                        grid[1 + rr][cc] = "K"
    for r in range(nrows):
        for c in range(COLS):
            if gf[r][c] != ".":
                grid[1 + r][c] = gf[r][c]
    _outline(grid)
    return chk(["".join(r) for r in grid], nrows + 1)

# The cycle, in the four phases a walk actually has. Columns are limb CENTRES;
# the hips sit under the pelvis at 13 and 18.
#
# CONTACT. Both feet on the ground, the body at its lowest. The front leg
# reaches out with its knee slightly AHEAD of the hip-to-ankle line and the back
# leg trails with its knee slightly BEHIND it, so even here neither leg is
# straight. That small opposed bend is most of what stops the pose reading as a
# pair of compasses.
def legs_contact(near, far):
    lit_n, lit_f = near == "B", far == "B"
    return leg_pair(17,
                    front=(18, 21, 22, 0.50, 0, lit_n, None),
                    back=(13, 11,  9, 0.50, 0, lit_f, None),
                    base="B")

# PASSING. The stance leg is straight and vertical under the body carrying the
# weight; the swing leg's knee is lifted FORWARD with the shin hanging back
# beneath it, so its ankle is BEHIND its knee. That fold is the phase the old
# cycle did not have at all -- both of its legs were straight in every frame,
# which is why the motion read as folding and unfolding rather than as stepping.
# The swing foot stops two rows short: it skims the ground instead of being
# picked up, which is what keeps this gait heavy rather than trotting.
def legs_pass(plant, swing):
    lit_p, lit_s = plant == "B", swing == "B"
    return leg_pair(18,
                    front=(18, 21, 19, 0.46, 2, lit_s, None),
                    back=(14, 13, 13, 0.50, 0, lit_p, None),
                    base="B")

def legs_jump():
    L = [row(9, "KDDBBBBBBBBLLK"),
         row(9, "KDBBBLKKDBBBLK"),
         row(8, "KDBBBLK.KDBBBLK"),
         row(7, "KDgggLK..KDBBBLK"),
         row(6, "KDBBBLK...KDgggLK"),
         row(5, "KGgggLK....KDBBBLK"),
         row(5, "KGGGGGK....KDBBBLK"),
         row(5, "KKKKKKK....KDBBBLK"),
         row(15, "KDgggLK"),
         row(15, "KDBBBLK"),
         row(15, "KDBBBLK"),
         row(15, "KGgggLK"),
         row(15, "KGGGGGK"),
         row(14, "KGGGGGGK"),
         row(14, "KKKKKKKK"),
         BLANK, BLANK, BLANK, BLANK]
    return chk(L, 19)

def crouch():
    """A squat, 27 rows tall.

    Four versions. squat() derived it by TRUNCATING the standing pose, keeping
    the top rows and the last two, so the lower body genuinely vanished. The
    first hand-drawn one was 24 rows -- half the body -- which reads as sitting
    on the floor. The 27-row one after that tucked the shin under the HIP, which
    is kneeling, not squatting, and came out as an L. The third drew the thigh
    at the same width and colour as the torso, so there was no joint anywhere in
    the silhouette and the whole pose fused into one blue mass.

    What makes a side-view squat read is that THE KNEE JUTS PAST THE CHEST.
    Hip low and back, knee high and forward of the torso's own front edge, shin
    vertical at the front, foot under the knee. If the thigh is no wider than
    the body above it, none of that is visible however many rows it gets.

    27 is a ceiling, not a preference. CROUCH_H has to stay below BULLET_Y_OFF
    by at least the bullet's own height so a warden's thrown slash clears a
    ducking head, and BULLET_Y_OFF has to stay below COVER_H -- 32px, two tiles,
    what every ground block in the stage is built from -- so cover still stops
    the same throw. 27 < 31 < 32 is as far as that ordering stretches."""
    c = [
        # head, 8
        row(11, "KKKKKK"),
        row(10, "KDDBBBBLK"),
        row(10, "KDDBBBBBLK"),
        row(10, "KDDBBBBLffK"),
        row(10, "KDDBBBBLfWKfK"),
        row(10, "KDDBBBBLffffK"),
        row(11, "KKDBBBLfffK"),
        row(12, "KKDBBBLfK"),
        # torso, 10. Leaning forward over the knees: the shoulders sit a column
        # ahead of the hips rather than square above them.
        row(11, "KKBBBKK"),
        row( 9, "KDDBBBBBBBBLLK"),
        row( 9, "KDDDBBBBBBBBLLK"),
        row( 9, "KDDBGgBBBBBBBLK"),
        row( 8, "KDDBBGgBBBBBBLK"),
        row( 8, "KSSRRRRRRRRRrrK"),
        row( 8, "KSRRRRRRRRRRrrK"),
        row( 8, "KDDBBBBBBBBBBLK"),
        row( 8, "KDDBBBBBBBBBBLK"),
        row( 8, "KDDDDDDDDDDDDDK"),     # the hip crease, in shadow
        # Thigh, 5, running forward from the hip to a knee at column 26 -- four
        # columns PAST the torso's front edge.
        #
        # The overhang is only half of it. The other half is that this thigh is
        # HORIZONTAL, so its top surface faces the light and is drawn in the lit
        # shade across its whole width, while the torso above it is vertical and
        # drawn in the base shade. A dark hip crease between a base-shaded torso
        # and a lit thigh top is a joint you can see; two base-shaded blocks of
        # the same width, which is what was here, fuse into one blue mass no
        # matter how many rows they get.
        row( 7, "KLLLLLLLLLLLLLLLLLK"),
        row( 7, "KDBBBBBBBBBBBBBBLLK"),
        row( 7, "KDBBBBBBBBBBBBBgggK"),
        row( 7, "KDBBBBBBBBBBBBBgggK"),
        row( 7, "KKDDDDDDDDDDDDDDDLK"),  # under-thigh, in shadow
        # Shin, 3, dropping from the FRONT of the thigh, and a foot under it.
        row(20, "KDBBBLK"),
        row(20, "KDBBBLK"),
        row(20, "KGgggLK"),
        row(18, "KGGGGGGGGK"),
    ]
    chk(c, 27)
    # Arm hanging from the shoulder to the knee it is braced on. Built the way
    # the standing arm is -- shoulder rows overwriting the torso edge, then a
    # 4-wide upper arm, an elbow band, a 3-wide forearm and a hand -- rather
    # than as a four-row stub, which is what it was.
    paste(c, 10, 22, "LLLK")
    paste(c, 11, 22, "LBLLK")
    paste(c, 12, 23, "KBLK")
    paste(c, 13, 23, "KgLK")               # elbow
    paste(c, 14, 24, "KBLK")
    paste(c, 15, 24, "KGgK")
    paste(c, 16, 24, "KffK")                # hand, resting on the knee
    paste(c, 17, 24, "KKK")
    # Scarf, shortened and hanging.
    paste(c, 3, 7, "SR")
    paste(c, 4, 6, "SRr")
    paste(c, 5, 6, "SRr")
    paste(c, 6, 7, "SR")
    return chk([BLANK] * (ROWS - 27) + c, ROWS)

def crouch_throw():
    """The squat with the arm thrown out instead of braced on the knee."""
    c = crouch()
    base = ROWS - 27
    for dr in range(10, 17):                 # clear the braced arm
        paste(c, base + dr, 21, "." * 5)
    paste(c, base + 10, 21, "LLLLLLK")
    paste(c, base + 11, 21, "LBLgGffK")
    paste(c, base + 12, 21, "KKKKKffK")
    paste(c, base + 13, 26, "KKK")
    return chk(c, ROWS)

def land():
    """Absorbing a landing: the knees fold, so the SHIN rows come out and the
    boots stay on the ground. squat() would have clipped the feet off instead,
    which is the same truncation that made the crouch a floating torso."""
    base = HERO_IDLE_ROWS
    SHIN_FROM, DROP = 39, 6
    out = ([BLANK] * DROP + base[:SHIN_FROM] + base[SHIN_FROM + DROP:])
    return chk(out, ROWS)

def draw_pose():
    """The wind, composed and then overpainted: a near-vertical blade beside the
    head, tip up. A raised sword is the clearest 'about to strike' silhouette
    there is, and above the shoulder is the only place on this sprite where
    nothing occludes it."""
    rows = build(torso("draw"), legs_idle("B", "D"), 0)
    blade = [(2, 1, "KWWK"), (3, 1, "KMWK"), (4, 1, "KMWK"), (5, 1, "KMWK"),
             (6, 2, "KMWK"), (7, 2, "KMWK"), (8, 2, "KMWK"), (9, 2, "KMWK"),
             (10, 3, "KMWK"), (11, 3, "KMWK"), (12, 3, "KMWK"),
             (13, 3, "KMWK"), (14, 4, "KggK"), (15, 4, "KgK")]
    for r, c, seg in blade:
        paste(rows, r, c, seg)
    return chk(rows, ROWS)

def build(torso_rows, leg_rows, shift):
    return chk([BLANK] * shift + head() + torso_rows + leg_rows, ROWS)

def idle_b():
    """Breathing: the scarf drifts a pixel, the shoulders settle. Generated as a
    whole pose rather than as row overrides, because at 48 rows a hand-indexed
    override list is the easiest thing in this file to get wrong."""
    h, t = head(), torso("down")
    for r in range(5, 10):                  # scarf tail lifts one column
        h[r] = h[r][1:] + "."
    paste(t, 0, 12, "KKBBBK")               # shoulders drop a pixel
    return chk([BLANK] + h[1:] + t + legs_idle("B", "D"), ROWS)

HERO_IDLE_ROWS = build(torso("down"), legs_idle("B", "D"), 0)

HERO = {
    "NINJA_IDLE":   HERO_IDLE_ROWS,
    "NINJA_IDLE_B": idle_b(),
    "NINJA_JUMP":   build(torso("fwd"),   legs_jump(), 0),
    "NINJA_WALK_A": build(torso("back"),  legs_contact("B", "D"), 1),
    "NINJA_WALK_B": build(torso("down"),  legs_pass("B", "D"), 0),
    "NINJA_WALK_C": build(torso("fwd"),   legs_contact("D", "B"), 1),
    "NINJA_WALK_D": build(torso("down"),  legs_pass("D", "B"), 0),
    "NINJA_THROW":  build(torso("throw"), legs_idle("B", "D"), 0),
    "NINJA_DRAW":   draw_pose(),
    "NINJA_SLASH":  build(torso("slash"), legs_idle("B", "D"), 0),
    "NINJA_CROUCH": crouch(),
    "NINJA_CROUCH_THROW": crouch_throw(),
    "NINJA_LAND": land(),
}

if __name__ == "__main__":
    import sys
    idle = HERO["NINJA_IDLE"]
    # The head is the block above the shoulders, not "every row with skin" --
    # the hand is skin too.
    print("head rows 1..10 = %d%%  torso 11..28 = %d%%  legs 29..47 = %d%%" %
          (round(10 / ROWS * 100), round(18 / ROWS * 100), round(19 / ROWS * 100)))
    used = sorted(set("".join("".join(v) for v in HERO.values())) - {"."})
    print("palette chars:", "".join(used))
    if "--show" in sys.argv:
        for name in sys.argv[2:] or ["NINJA_IDLE"]:
            print("\n" + name)
            for i, r in enumerate(HERO[name]):
                print("%2d %s" % (i, r.replace(".", " ")))
    print("all %d poses validated at %dx%d" % (len(HERO), COLS, ROWS))
