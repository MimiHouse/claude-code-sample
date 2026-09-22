# The three enemies at native resolution, on the same 32x48 grid as the hero and
# with the same leg machinery, so their strides read as the same kind of motion.
# Each keeps the silhouette it earned when they stopped being one recoloured
# sprite: the charger broad and horned, the rusher lean and hunched, the warden
# tall behind a polearm taller than itself.
import sys
sys.path.insert(0, ".")
from hero_sprites import row, paste, chk, leg_pair, COLS, ROWS, BLANK

def cloth_tail(rows_, plan):
    """A streaming cloth tail, as one connected ribbon.

    Each of these was first written as a list of (row, col, segment) picked by
    eye, and every one of them came out as a detached stick floating behind the
    head: consecutive rows were pasted at columns that did not touch, so there
    was nothing bridging them. The rule here is that every link OVERLAPS the
    one above it by at least two columns, which is what makes five rows of
    pixels read as a single piece of cloth rather than five dashes."""
    prev = None
    for r, c, seg in plan:
        lo, hi = c, c + len(seg) - 1
        if prev is not None:
            p_lo, p_hi = prev
            assert min(hi, p_hi) - max(lo, p_lo) + 1 >= 2, \
                "tail row %d (%d..%d) does not overlap %d..%d" % (r, lo, hi, p_lo, p_hi)
        paste(rows_, r, c, seg)
        prev = (lo, hi)
    return rows_

# ------------------------------------------------------------------ CHARGER
# Heavy: horned helm, armoured shoulders, a greatsword carried upright.
def charger_head():
    h = [
        row(10, "K.........K"),
        row(10, "KK.......KK"),
        row( 9, ".KK.KKKKK.KK"),
        row( 9, "KHHHHHHHHhK"),
        row( 9, "KHHHHHHHhhK"),
        row( 9, "KHHHHHffffK"),
        row( 9, "KHHHHfWWKfK"),
        row( 9, "KHHHHffffFK"),
        row( 9, "KKHHHffffFK"),
        row(10, "KKHHHfffFK"),
        row(11, "KKHHffFK"),
        row(12, "KKGGGKK"),
    ]
    chk(h, 12)
    # Helm plume, streaming back off the crest. The horns already say heavy;
    # this says the helm belongs to somebody rather than being a bucket.
    cloth_tail(h, [(3, 5, "SSRr"), (4, 3, "SSRr"), (5, 2, "SSRr"),
                   (6, 2, "SRr"), (7, 3, "SR")])
    return chk(h, 12)

def charger_torso(pose):
    t = [
        row( 7, "KDDGGGGGGGGGGLLK"),
        row( 6, "KDDDGGGGGGGGGGLLLK"),
        row( 6, "KDDDGGGGGGGGGGLLLK"),
        row( 6, "KDDgggggggggggggK"),      # pauldron seam
        row( 6, "KDDDGGGGGGGGGGLLLK"),
        row( 6, "KDDDGGGGGGGGGGLLLK"),
        row( 6, "KDDDGGGGGGGGGGLLLK"),
        row( 7, "KDDGGGGGGGGGGLLK"),
        row( 7, "KDDgggggggggggK"),        # belt
        row( 7, "KDDGGGGGGGGGGLLK"),
        row( 7, "KDDGGGGGGGGGGLLK"),
        row( 7, "KDDGGGGGGGGGGLLK"),
        row( 8, "KDDGGGGGGGGLLK"),
        row( 8, "KDDGGGGGGGGLLK"),
        row( 8, "KDDGGGGGGGGLLK"),
        row( 8, "KDDGGGGGGGGLLK"),
        row( 8, "KDDGGGGGGGGLLK"),
    ]
    chk(t, 17)
    # (The mantle is NOT drawn here -- see charger_cloak.)
    # Arms, hanging either side of that slab of a chest.
    for i, seg in enumerate(["LLLK", "BLLK", "KGLK", "KGLK", "KgLK",
                             "KGLK", "KGLK", "KGgK", "KffK", "KKK"]):
        paste(t, 1 + i, 22 if i > 1 else 21, seg.replace("B", "G"))
    if pose == "base":
        # Greatsword upright: blade above the shoulder, hilt at the hand.
        for r in range(0, 3): paste(t, r, 26, "KMMK")
        paste(t, 3, 26, "KMMK")
        for r in range(4, 8): paste(t, r, 26, "KMMK")
        paste(t, 8, 26, "KggK")
        paste(t, 9, 26, "KgGK")
        paste(t, 10, 26, "KKKK")
    elif pose == "attack":
        # Brought down in front as a broad mass.
        paste(t, 1, 22, "LLLLMMMMMM")
        paste(t, 2, 22, "GLLKMMMMMM")
        paste(t, 3, 22, "KGgKMMMMM")
        paste(t, 4, 22, "KffKMMMM")
        paste(t, 5, 23, "KKK")
    elif pose == "lunge":
        # Levelled ahead of the dash.
        paste(t, 2, 22, "LLLLLMMMMM")
        paste(t, 3, 22, "GLLgGMMMMM")
        paste(t, 4, 22, "KKffKMMMM")
        paste(t, 5, 24, "KKK")
    return chk(t, 17)

def charger_cloak(rows_, top):
    """The war mantle, painted onto the COMPOSED sprite rather than inside the
    torso block. The torso is 17 rows, so a cape drawn there stops at the waist
    -- and a cape that stops at the waist is a shoulder pad. This one hangs past
    the hip and over the far leg, which is where the weight of it reads.

    `top` is the torso's first row, so the fall is measured from the pauldron.

    The columns are not a flat fill: K, two of shadow, base, a single shadow
    column as a FOLD, two more of base, then the lit edge nearest the body.
    Eight columns of one colour is a slab, and a slab is what makes cloth look
    like moulded plastic. The lit edge faces the body because the light is from
    the upper right and the cape trails to the left -- the same rule the hero's
    limbs follow."""
    plan = [( 0, 4, "KSSr"),     ( 1, 3, "KSSRr"),    ( 2, 3, "KSSRr"),
            ( 3, 2, "KSSRSr"),   ( 4, 2, "KSSRSr"),   ( 5, 2, "KSSRSRr"),
            ( 6, 2, "KSSRSRr"),  ( 7, 1, "KSSRSRRr"), ( 8, 1, "KSSRSRRr"),
            ( 9, 1, "KSSRSRRr"), (10, 1, "KSSRSRRr"), (11, 1, "KSSRSRRr"),
            (12, 1, "KSSRSRRr"), (13, 1, "KSSRSRRr"), (14, 1, "KSSRSRRr"),
            (15, 1, "KSSRSRRr"), (16, 1, "KSSRSRRr"), (17, 1, "KSSRSRRr"),
            (18, 1, "KSKRSKRr"),                      # the hem tears
            (19, 1, "KSKRSKKr"), (20, 1, "KKKRSK"),   (21, 3, "KKSK")]
    for dr, c, seg in plan:
        paste(rows_, top + dr, c, seg)
    return rows_

# ------------------------------------------------------------------- RUSHER
# Lean and hunched, leaning into the run, a dagger in each hand.
def rusher_head():
    h = [
        BLANK,
        row(12, "KKKKKK"),
        row(11, "KSSRRRrK"),
        row(11, "KSRRRRrK"),
        row(11, "KSRRffffK"),
        row(11, "KHHfWWKfK"),
        row(11, "KHHffffFK"),
        row(12, "KHHfffFK"),
        row(12, "KKHffFK"),
        row(13, "KKHffK"),
        row(13, "KKGGKK"),
    ]
    chk(h, 11)
    # Head wrap, knotted at the back with two tails let long. The tails are the
    # only thing on this body that trails BEHIND the run, which is what sells
    # the rusher as the fast one before it has moved a pixel.
    cloth_tail(h, [(3, 8, "SRr"), (4, 6, "SSRr"), (5, 4, "SSRr"),
                   (6, 3, "SRr"), (7, 3, "SR")])
    return chk(h, 11)

def rusher_torso(pose):
    # Narrow on purpose: this is the lean one, and it has to read as lean beside
    # the charger's slab of a chest rather than merely shorter.
    t = [
        row(12, "KDGGGGLLK"),
        row(11, "KDDGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDgggggggggK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KSSRRSRRRrrK"),       # waist sash; the lone S is a fold
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
        row(10, "KDDGGGGGGLLK"),
    ]
    chk(t, 18)
    # Sash tail, hanging off the knot at the back.
    cloth_tail(t, [(8, 8, "SRr"), (9, 6, "SSRr"), (10, 6, "SRr"),
                   (11, 7, "SR")])
    # The leap EXTENDS the blade rather than moving it outward: shifting it two
    # columns ran the tip past column 31 and off the sprite.
    if pose in ("wallGrab", "wallOver"):
        """THE WALL POSES.

        Only rows 0..18 of the sprite are drawn while it peeks -- the coping
        crosses at row 19 -- so where the fists land decides what the pose
        says. `wallGrab` puts them at torso rows 5..7, which is absolute 16..18:
        the last three rows anybody sees, so they read as two hands resting on
        top of the wall with a head watching over it.

        `wallOver` brings the arms down and back: it has pushed off the coping
        and is coming across. By then the clip has opened and the whole body is
        visible, so this one is judged as a whole figure.
        """
        if pose == "wallGrab":
            # Shoulders hunched up toward the ears -- a body leaning on a ledge
            # does that, and it also clears room for the arms to reach outward.
            paste(t, 0, 11, "KGGGGGGGGK")
            for side, x0 in (("l", 6), ("r", 21)):
                # shoulder -> upper arm -> elbow -> forearm, reaching outward
                paste(t, 1, 10 if side == "l" else 20, "KLLK")
                paste(t, 2, 8 if side == "l" else 21, "KGLLK")
                paste(t, 3, 7 if side == "l" else 22, "KgLK")
                paste(t, 4, x0, "KGLK")
                # the fist, closed over the coping
                paste(t, 5, x0 - 1, "KffffK")
                paste(t, 6, x0 - 1, "KffffK")
                paste(t, 7, x0 - 1, "KKKKKK")
        else:
            # Pressed down at the sides, having pushed off.
            paste(t, 2, 20, "LLLK")
            paste(t, 3, 21, "KGLK")
            paste(t, 4, 21, "KgLK")
            paste(t, 5, 21, "KGLK")
            paste(t, 6, 21, "KffK")
            paste(t, 7, 22, "KKK")
            paste(t, 2, 9, "KLLL")
            paste(t, 3, 8, "KGLK")
            paste(t, 4, 8, "KgLK")
            paste(t, 5, 8, "KGLK")
            paste(t, 6, 8, "KffK")
            paste(t, 7, 9, "KKK")
            # One dagger still in the near hand, held clear of the wall.
            paste(t, 6, 25, "KMMMK")
            paste(t, 7, 26, "KMMK")
        return chk(t, 18)
    reach = 1 if pose == "leap" else 0
    # ARMS WITH LENGTH IN THEM. Both of these were four-row stubs hanging off
    # the shoulder with a blade floating near the end, which reads as a body
    # with knives beside it rather than a body holding knives. Built the way the
    # hero's arm is: the shoulder rows OVERWRITE the torso outline so the two
    # share one silhouette, then a 4-wide upper arm, an elbow band, a 3-wide
    # forearm, and a fist the steel actually comes out of.
    paste(t, 1, 20, "LLLK")
    paste(t, 2, 20, "LLLLK")
    paste(t, 3, 21, "KGLLK")
    paste(t, 4, 22, "KgLK")               # elbow
    paste(t, 5, 22, "KGLK")
    paste(t, 6, 22, "KffK")               # fist
    paste(t, 7, 23, "KKK")
    # Lead dagger, straight out of that fist with no gap to cross.
    paste(t, 5, 25, "KMMMM" + "M" * reach + "K")
    paste(t, 6, 25, "KMMM" + "M" * reach + "K")
    # Trailing arm, swung behind, blade reversed back along the forearm.
    paste(t, 1, 9, "KLLL")
    paste(t, 2, 7, "KLLLL")
    paste(t, 3, 6, "KGLLK")
    paste(t, 4, 5, "KgLK")                # elbow
    paste(t, 5, 5, "KGLK")
    paste(t, 6, 5, "KffK")                # fist
    paste(t, 7, 6, "KKK")
    paste(t, 5, 1, "KMMMK")
    paste(t, 6, 2, "KMMK")
    return chk(t, 18)

# ------------------------------------------------------------------- WARDEN
# Tall and thin behind a polearm taller than itself.
def warden_head():
    # A hood, not a cap: the brim is cloth and it comes down past the cheek, so
    # the face is framed rather than perched under a lid.
    h = [
        row(13, "KSRK"),               # crown of the hood
        row(11, "KSSRRRrK"),
        row(10, "KSSRRRRRrK"),
        row( 9, "KSSRRRRRRrKK"),       # hood brim, wider than the skull
        row(10, "KSRRffffK"),
        row(10, "KSRfWWKfK"),
        row(10, "KSRffffFK"),
        row(11, "KSRfffFK"),
        row(11, "KKRffFK"),
        row(12, "KKHffK"),
        row(12, "KKGGKK"),
    ]
    chk(h, 11)
    # Hood point, folded back over the shoulder.
    cloth_tail(h, [(3, 7, "SRr"), (4, 5, "SSRr"), (5, 4, "SRr"),
                   (6, 4, "SR")])
    return chk(h, 11)

def warden_torso(pose):
    t = [
        row(11, "KDGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDgggggggggK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDgggggggggK"),
        row(10, "KDDGGGGGGGLLK"),
        row(10, "KDDGGGGGGGLLK"),
        row(11, "KDDgggggggK"),        # belt, cinching the coat
        # Long coat, flaring to the hem. It stops at column 22 on purpose: the
        # weapon metric counts everything from column 24 out, so a skirt that
        # reached the shaft would score as polearm.
        # Two fold columns run the fall of the coat, and they DRIFT apart a
        # column as it widens -- folds in a flaring skirt diverge, and holding
        # them at fixed columns is what made the first pass read as corrugated
        # sheet rather than cloth.
        row(10, "KSSRSRRSRrrK"),
        row( 9, "KSSRSRRRSRrrK"),
        row( 9, "KSSRSRRRSRrrK"),
        row( 8, "KSSRRSRRRRSRrrK"),
        row( 8, "KSSRRSRRRRSRrrK"),
        row( 8, "KSSRRSRRRRSRrrK"),
        row( 8, "KSRKRRKRRKRrK"),      # torn hem; the legs come out below
    ]
    chk(t, 18)
    if pose in ("base", "duck"):
        pass            # arms and shaft are drawn by the caller, in that order
    elif pose == "aim":
        paste(t, 1, 22, "LLLLLLK")
        paste(t, 2, 22, "GLLgGMMMMM")
        paste(t, 3, 22, "KKffKMMMMM")
        paste(t, 4, 24, "KKK")
    elif pose == "sweep":
        paste(t, 0, 24, "MMMMMM")
        paste(t, 1, 22, "LLLKMMMMMM")
        paste(t, 2, 22, "GLgKMMMMM")
        paste(t, 3, 22, "KffKMMM")
        paste(t, 4, 23, "KKK")
    return chk(t, 18)

def warden_grip(rows_, top):
    """BOTH HANDS ON THE SHAFT, one high and one at the waist.

    A polearm held in a single four-row stub of an arm reads as a man standing
    next to a pole. Two hands on it, an elbow's worth of arm apart, is the only
    thing that reads as holding it -- and it is how a polearm is actually held.

    Painted AFTER warden_shaft(): the shaft is drawn last of all and would
    otherwise cover both fists."""
    # Upper arm: shoulder out to a fist wrapped round the shaft.
    paste(rows_, top + 0, 20, "LLLK")
    paste(rows_, top + 1, 20, "LLLLK")
    paste(rows_, top + 2, 21, "KGLLK")
    paste(rows_, top + 3, 22, "KgLLK")         # elbow
    paste(rows_, top + 4, 23, "KfffffK")       # fist, closed over the shaft
    paste(rows_, top + 5, 24, "KKKKKK")
    # Lower arm: from the waist, down and out to the second fist.
    paste(rows_, top + 8, 21, "KGLLK")
    paste(rows_, top + 9, 22, "KgLLK")         # elbow
    paste(rows_, top + 10, 23, "KfffffK")
    paste(rows_, top + 11, 24, "KKKKKK")
    return rows_

def warden_shaft(rows_, top, bottom):
    """A full-height polearm at columns 26..29, blade above the head."""
    paste(rows_, top, 26, "MMMM")
    paste(rows_, top + 1, 26, "KMMK")
    paste(rows_, top + 2, 26, "KMMK")
    # Wood, on its own palette keys. The shaft used to be drawn in `g`, the
    # leather slot, and the warden's leather is a dark OLIVE -- so its polearm
    # rendered as a green bar beside a green body and disappeared into it. A
    # dedicated pair costs two palette entries and cannot be changed out from
    # under the weapon by a leather tweak.
    for r in range(top + 3, bottom):
        paste(rows_, r, 26, "KPpK")
    return rows_

FOE_LEGS_SPAN = 19

def foe_legs_over(fill):
    """Legs for coming over a wall: the leading one swung ACROSS with its knee
    well out in front, the trailing one angled back.

    Two things make it read, and both were learned on the hero's crouch.

    The thigh is HORIZONTAL, so its top surface faces the light and is drawn in
    the lit shade across its whole width with the underside in shadow -- a limb
    picked out by its own lighting needs no outline to separate it from the body
    it belongs to. And the knee JUTS PAST the torso: three columns clear was not
    enough and the pose came out as a body with two stumps under it, so the
    knee now reaches column 28 while the torso ends at 22, and the trailing leg
    goes back to column 6. The silhouette is a wide lambda, which is what
    somebody swinging a leg over a wall looks like from the side.

    Hand-drawn rather than generated: leg_pair() walks both limbs downward from
    the pelvis and a knee lifted out to the side is not something it expresses."""
    g = fill
    L = [row(9, "KDD" + g * 8 + "LLK"),
         row(9, "KDD" + g * 8 + "LLK"),
         row(8, "K" + "L" * 20 + "K"),          # thigh, all the way out, lit on top
         row(8, "KD" + g * 16 + "gggK"),        # knee wrap at the far end
         row(8, "KD" + g * 16 + "gggK"),
         row(8, "K" + "D" * 20 + "K")]          # under-thigh, in shadow
    # The trailing leg, stepping BACK: it slides left a column every other row.
    for i in range(6, 19):
        pad = 9 - min(3, (i - 6) // 3)
        near = ("KGgggLK" if i == 15
                else "KGGGGGK" if i in (16, 17)
                else "KKKKKKK" if i == 18
                else "KDgggLK" if i == 11
                else "KD" + g * 3 + "LK")
        L.append(row(pad, near))
    chk(L, FOE_LEGS_SPAN)
    # The leading shin hangs from the knee at columns 22..28 and stops short of
    # the ground: that foot is over the wall, not standing on anything.
    for i, seg in ((6, "KD" + g * 3 + "LK"), (7, "KD" + g * 3 + "LK"),
                   (8, "KDgggLK"), (9, "KD" + g * 3 + "LK"),
                   (10, "KD" + g * 3 + "LK"), (11, "KGgggLK"),
                   (12, "KGGGGGK"), (13, "KGGGGGGK"), (14, "KKKKKKKK")):
        paste(L, i, 22, seg)
    return chk(L, FOE_LEGS_SPAN)

def foe_legs_idle(fill):
    L = ([row(9, "KDD" + fill * 8 + "LLK"), row(9, "KDD" + fill * 8 + "LLK")]
         + [row(9, "KD" + fill * 3 + "LKKD" + fill * 3 + "LK")] * 6
         + [row(9, "KDgggLKKDgggLK")] * 2
         + [row(9, "KD" + fill * 3 + "LKKD" + fill * 3 + "LK")] * 5
         + [row(9, "KGgggLKKGgggLK"),
            row(9, "KGGGGGKKGGGGGK"),
            row(8, "KGGGGGGKKGGGGGGgK"),
            row(8, "KKKKKKK.KKKKKKKKK")])
    return chk(L, FOE_LEGS_SPAN)

def build(head, torso, legs, shift, fixups=None):
    out = [BLANK] * shift + head + torso + legs
    chk(out, ROWS)
    if fixups:
        fixups(out)
    return chk(out, ROWS)

def kind(head_fn, torso_fn, extra, fill, shaft=None, cloak=None):
    out = {}
    def mk(pose, legs, shift):
        rows = build(head_fn(), torso_fn(pose), legs, shift)
        # The cape goes on after the legs, so it hangs IN FRONT of the far leg
        # -- which is the whole point of drawing it out here.
        if cloak:
            cloak(rows, shift + 12)          # 12 = the head block's height
        if shaft and pose in ("base", "walkA", "walkB", "walkC", "walkD"):
            warden_shaft(rows, shift, ROWS - 6)
            warden_grip(rows, shift + 12)      # hands last, over the shaft
        return rows
    # The same joint-driven generator the hero uses, so the strides read as the
    # same kind of motion -- but a longer reach and a higher swing foot, because
    # these move in short bursts rather than at a settled walking pace.
    #
    # base=fill, never the hero's default "B": these palettes have no B key at
    # all, and drawPixels() silently drops characters a palette does not define.
    def contact(near_lit, far_lit):
        return leg_pair(17,
                        front=(18, 22, 23, 0.50, 0, near_lit, None),
                        back=(13, 10,  8, 0.50, 0, far_lit, None), base=fill)
    def passing(plant_lit, swing_lit):
        return leg_pair(18,
                        front=(18, 22, 20, 0.46, 3, swing_lit, None),
                        back=(14, 13, 13, 0.50, 0, plant_lit, None), base=fill)
    out["base"] = mk("base", foe_legs_idle(fill), 0)
    out["walkA"] = mk("base", contact(True, False), 1)
    out["walkB"] = mk("base", passing(True, False), 0)
    out["walkC"] = mk("base", contact(False, True), 1)
    out["walkD"] = mk("base", passing(False, True), 0)
    for pose in extra:
        out[pose] = mk(pose, foe_legs_idle(fill), 0)
    return out

def wall_poses(head_fn, torso_fn, fill):
    """The two-stage wall entrance. `wallGrab` hangs on the coping with its legs
    straight down -- it has not committed yet -- and `wallOver` swings one leg
    across."""
    return {
        "wallGrab": build(head_fn(), torso_fn("wallGrab"), foe_legs_idle(fill), 0),
        "wallOver": build(head_fn(), torso_fn("wallOver"), foe_legs_over(fill), 0),
    }

def duck_from(rows_):
    """Ducking behind cover. Built by folding the SHIN rows out, the way the
    hero's landing pose is, rather than by squat()'s truncation -- truncation
    keeps the top of the body and the last two rows and drops everything
    between, which is why a derived crouch has no legs."""
    SHIN_FROM, DROP = 38, 6
    return chk([BLANK] * DROP + rows_[:SHIN_FROM] + rows_[SHIN_FROM + DROP:], ROWS)

CHARGER = kind(charger_head, charger_torso, ["attack", "lunge"], "G",
               cloak=charger_cloak)
RUSHER  = kind(rusher_head, rusher_torso, ["leap"], "G")
RUSHER.update(wall_poses(rusher_head, rusher_torso, "G"))
WARDEN  = kind(warden_head, warden_torso, ["aim", "sweep"], "G", shaft=True)

WARDEN["duck"] = duck_from(WARDEN["base"])

FOES = {"charger": CHARGER, "rusher": RUSHER, "warden": WARDEN}
for k, d in FOES.items():
    for pose, rows in d.items():
        chk(rows, ROWS)

if __name__ == "__main__":
    import sys
    print("poses:", {k: sorted(v) for k, v in FOES.items()})
    if "--show" in sys.argv:
        for spec in sys.argv[2:]:
            k, pose = spec.split("/")
            print("\n" + spec)
            for i, r in enumerate(FOES[k][pose]):
                print("%2d %s" % (i, r.replace(".", " ")))
    print("all validated at %dx%d" % (COLS, ROWS))
