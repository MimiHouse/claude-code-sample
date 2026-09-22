# Optional assets

The game ships complete with **no files in this folder**. Every sprite is a
pixel array in `index.html` and every sound is synthesised at runtime from
oscillators and one shared noise buffer. That is the fallback, and it is why the
build runs from `file://`, works offline, has nothing to download and carries no
licence to audit.

Anything you put here **replaces** a built-in. Nothing here is required, nothing
blocks the boot, and a file that is missing or malformed leaves the built-in
version in place — so a half-populated folder is a valid state, not a bug. You
can replace one sound, or one sprite, and leave the rest alone.

Assets are loaded over `fetch`, so they need the page **served over http**. On
`file://` the loader gives up silently and the built-ins stay.

```bash
python3 -m http.server -d frontend 8000   # then open http://localhost:8000/
```

**The atlas path is verified headlessly.** `shot.mjs` decodes PNGs and honours
`drawImage`, and it backs `fetch`/`Image` with this folder on disk -- so a shot
shows the atlas rather than only the fallback, and a frame that is missing,
mis-sized or mis-addressed is visible in a picture before anybody opens a
browser. Drop your files in, run `node frontend/shot.mjs`, and look.

## `manifest.json`

The only entry point. No manifest means no assets.

```json
{
  "atlas": "sprites.png",
  "frames": {
    "ninja/idle":     { "x": 0,  "y": 0, "w": 32, "h": 48 },
    "ninja/walkA":    { "x": 32, "y": 0, "w": 32, "h": 48 },
    "charger/attack": { "x": 0,  "y": 48, "w": 40, "h": 48 }
  },
  "audio": {
    "kill":  "kill.ogg",
    "music": "alley-loop.ogg"
  }
}
```

Every frame is validated on its own: a bad `x`/`y`/`w`/`h`, or a rectangle that
falls outside the atlas, costs **that one pose** its replacement rather than
taking the atlas down with it.

### Frame names

`<kind>/<pose>`. Any subset is fine — unnamed poses keep their built-in art.

| Kind | Poses |
| --- | --- |
| `ninja` | `idle` `idleB` `jump` `walkA` `walkB` `walkC` `walkD` `throw` `draw` `slash` `land` `crouch` `crouchThrow` |
| `charger` | `base` `walkA` `walkB` `walkC` `walkD` `attack` `lunge` `coil` |
| `rusher` | `base` `walkA` `walkB` `walkC` `walkD` `leap` `wallGrab` `wallOver` `coil` |
| `warden` | `base` `walkA` `walkB` `walkC` `walkD` `aim` `sweep` `duck` `coil` |

`coil` is the crouch a LEDGE SENTRY makes before it drops on you and the crouch
it absorbs the landing with. The built-in is **generated**, not drawn -- it is
`base` put through `squat()`, which brings the torso down nine rows and leaves
the feet where they were. Supply your own only if you want the sentry to read
differently from a crouched version of the same enemy; leaving it out keeps the
generated one, which already matches whichever kind is on the roof.

That crouch is the ONLY warning a drop gets, so a replacement has to be
unmistakably shorter than `base`. A `coil` frame that stands as tall as the
standing pose removes the tell and leaves the dive unannounced.

`wallGrab` and `wallOver` are the wall entrance, and they have a constraint the
other poses do not: **while a vaulter peeks, only the sprite rows above the
wall's coping are drawn** — the coping crosses the sprite at row 19 of 48, so
rows 0–18 are all anyone sees. Put the hands in rows 16–18, one each side of the
body, or the pose reads as a figure standing behind a wall rather than leaning on
it. `wallOver` is seen in full, through both the climb and the drop, so it is
judged as a whole figure; its leading knee wants to jut clear of the torso or the
swung leg disappears into the body.

The clipping is done by shortening the row array, so it works on built-in art
only. A replacement frame supplied through the atlas is drawn whole — the peek
will show the entire body in front of the wall. Supply `wallGrab` as art that
already reads correctly unclipped, or leave it out and keep the built-in.

`draw` and `slash` are one move in two halves: `draw` is the blade leaving the
scabbard and holds for three frames, then `slash` is the cut. The hitbox does
not exist during `draw`, so a `draw` frame with the sword already swung reads
as a hit that does not land.

The walk cycle is four phases: `walkA` and `walkC` are the **contact** frames
(both feet down, body at its lowest), `walkB` and `walkD` are the **passing**
frames (one leg straight under the body, the other reaching, body at its
highest). It is driven by distance travelled, not by a timer, so the feet stay
planted at any speed — keep the contact frames' feet where the ground is.

### Sizing

The built-in box is **32 × 48** at a 16px tile, for the player *and* all three
enemies — they used to be 16 × 24 painted at 2×, and they are not any more.
Frames of other sizes are accepted and anchored **bottom-centre** on that box,
so taller or wider art still stands on the same feet. The collision body is
unchanged either way — 20 × 48 for the player, 22 × 44 for enemies — so art
much larger than the box will overhang its own hitbox.

One deliberate exception: the player's `slash` pose draws a blade that is
*shorter* than the hitbox it swings. The box is 46px and the whole sprite is 32,
so there is no room for art that long; the reach beyond the sprite is covered by
the arc effect, which is drawn at the box's full width. Replacement art does not
need to make up that difference.

Keep the art aligned left-facing-**right**. Enemies are drawn mirrored.

## Audio cues

One file per cue, any format the browser decodes (`.ogg` is the safe default;
add an `.m4a` fallback if you care about older Safari).

| Cue | Replaces |
| --- | --- |
| `throw` | shuriken leaving the hand |
| `slash` | katana swing — plays on every swing, hit or miss |
| `kill` | an enemy going down to a shuriken |
| `bladeKill` | an enemy going down to the blade — plays *over* `slash`, so keep it out of the same band: the built-in is a struck bell against the swing's noise |
| `dryFire` | pressing C with no shuriken left — keep it tiny and unpitched, or it reads as an action |
| `bump` | walking into an enemy — a dull body thud; it must never sound like taking damage |
| `death` | the impact of the player's death — keep it **short**, under ~0.35s |
| `deathSting` | the phrase that plays *after* it, filling the silence the music leaves. The built-in loop is cut dead on death, held voices and all, so this one is alone in the mix; it has to resolve inside the freeze (~1.05s) |
| `flag` | flag collected |
| `pickup` | shuriken ammunition picked up |
| `dash` | the dash. It fires on a key the player may hold down through a whole alley, so it has to sit UNDER everything -- keep it unpitched cloth-and-air, or at this rate of repetition it is the sound people mute the game over |
| `music` | the background loop |

There is no `ninjutsu` cue any more. The screen-clearing strike it belonged to
was removed: five seconds of invulnerability is an off switch, not a difficulty
setting. If you have a file named `ninjutsu` it will simply never be played.

`music` is special: a supplied track loops on its own and **switches the
built-in step sequencer off entirely** rather than playing over it. It starts and
stops with the title and play screens, and stops on pause, death and game over.

On a death it is cut immediately rather than left to fade. Stopping the
scheduler is not enough on its own — it runs half a second ahead of the audio
clock, so that much music is already committed and would play on over the freeze
frame. The built-in loop holds its voices so it can stop them; a supplied track
is stopped at the source.

## Licences

The zero-asset default means there is currently nothing to audit, and that is
worth protecting. If you add files here:

- Prefer **CC0 / public domain**. It needs no attribution and no licence file
  shipped with the build, which keeps the deployment a single static folder.
- **CC-BY is fine but is a commitment** — the credit has to appear in the game,
  not just in this file. There is no credits screen yet; add one before adding
  CC-BY assets.
- **Never** add anything with a non-commercial (`NC`) or no-derivatives (`ND`)
  clause. Both are incompatible with shipping this commercially, and `NC` in
  particular is a trap because it looks free.
- Record every file below as you add it. A file in this folder with no row in
  this table should be treated as unlicensed and removed.

Reliable CC0 sources for this art style and scale:

| Source | Good for |
| --- | --- |
| [Kenney](https://kenney.nl/assets) | CC0 pixel platformer art, UI, and SFX packs; consistent sizing |
| [OpenGameArt](https://opengameart.org/) — filter to CC0 | sprites and loops; check each file's own licence, the site mixes them |
| [Freesound](https://freesound.org/) — filter to CC0 | one-shot effects; most uploads are CC-BY, so the filter matters |
| [Sonniss GDC bundles](https://sonniss.com/gameaudiogdc) | royalty-free SFX libraries, commercial use permitted |

### Inventory

| File | Source | Licence | Added |
| --- | --- | --- | --- |
| _(none yet)_ | | | |
