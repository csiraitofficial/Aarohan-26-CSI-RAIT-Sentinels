Here's your precise modification prompt:

🛡️ Sentinel — Orbital Hover Rework Prompt
STRICT RULE: Change ONLY what is listed below. Every other section, animation, color, font, layout, and interaction remains 100% identical. Only the orbital node hover behavior and node labels are modified.

1. RENAME THE THREE ORBITAL NODES
Update the label text on each node as follows. Do not change position, font, size, color, or any other property — only the text content:

Top node (currently UPLOAD SHIELD) → UPLOAD
Bottom-right node (currently ENCRYPT LAYER) → GET PROTECTED
Bottom-left node (currently SAFE DEPLOY) → DOWNLOAD


2. HOVER EFFECT ON NODE CIRCLES — Highlight + Zoom + Glow
When the user hovers over any of the three node circles, apply all three of these simultaneously with transition: all 0.25s ease:

Scale up slightly: transform: scale(1.15) on the node circle inner div. Not more — just a subtle tactical lock-on feel.
Border glow intensifies: box-shadow goes from 0 0 15px rgba(0,212,255,0.6) → 0 0 35px rgba(0,212,255,1), 0 0 60px rgba(0,212,255,0.4). The circle should look like it's been activated.
Border color brightens: border stays #00d4ff but the glow makes it appear to pulse brighter. Additionally set border-width: 3px on hover (from 2px).

On mouse-leave, reverse all three back to default over 0.25s ease.
The node label text below the circle fades to full white (color: #ffffff) on hover and back to #00d4ff on leave, transition: color 0.25s.

3. HOVER TOOLTIP — Arrow + Description Box
When hovering on each node, show a connected description box with a small angled arrow line. The arrow originates from the edge of the node circle and points to a floating rectangular description card. Here is the exact behavior per node:

TOP NODE — "UPLOAD"
Arrow direction: Starts from the right edge of the circle, angles slightly upward (~15° upward tilt), and connects to the left edge of the description box.
Arrow style:

A thin SVG line, stroke: #00d4ff, stroke-width: 1.5, length ~50–60px
No arrowhead marker needed — the connection to the box is enough
The line should be position: absolute, drawn with SVG overlay on the node container

Description box position: To the right of the circle, vertically slightly above center of the node (matching the arrow's upward tilt).
Description content:

UPLOAD
Drop your photo into Sentinel's encrypted pipeline. Your original file never leaves the secure environment unprotected.


BOTTOM-RIGHT NODE — "GET PROTECTED"
Arrow direction: Starts from the right edge of the circle, angles slightly upward (~15° upward tilt), connects to the left edge of the description box.
Arrow style: Same as above — thin #00d4ff SVG line, ~50–60px.
Description box position: To the right of the circle, slightly above center.
Description content:

GET PROTECTED
Sentinel injects invisible adversarial noise using the FGSM algorithm — imperceptible to humans, catastrophic to deepfake AI models.


BOTTOM-LEFT NODE — "DOWNLOAD"
Arrow direction: Starts from the left edge of the circle, angles slightly upward (~15° upward tilt), connects to the right edge of the description box — so the box sits to the LEFT of the circle.
Arrow style: Same thin #00d4ff SVG line, mirrored direction.
Description box position: To the left of the circle, slightly above center.
Description content:

DOWNLOAD
Retrieve your shielded image. Visually identical to the original — but any AI that tries to clone your face will produce distorted, unusable output.


4. DESCRIPTION BOX STYLING (same for all three)
background: rgba(5, 10, 15, 0.92)
border: 1px solid rgba(0, 212, 255, 0.25)
backdrop-filter: blur(14px)
box-shadow: 0 0 24px rgba(0, 212, 255, 0.15), inset 0 0 0 1px rgba(0,212,255,0.05)
border-radius: 6px
padding: 14px 18px
max-width: 220px
min-width: 180px
pointer-events: none
position: absolute
z-index: 50
Typography inside the box:

Title line: font-family: Orbitron, font-weight: 700, font-size: 0.65rem, letter-spacing: 0.12em, color: #00d4ff, text-transform: uppercase, margin-bottom: 8px
Description: font-family: Inter, font-size: 0.78rem, line-height: 1.6, color: rgba(255,255,255,0.75)


5. TOOLTIP ENTRANCE ANIMATION
On hover-enter, the description box and arrow animate in together:
css/* Initial state (hidden) */
opacity: 0;
transform: translateX(-8px);   /* for right-side boxes */
transform: translateX(8px);    /* for left-side box (DOWNLOAD) */

/* Animated to */
opacity: 1;
transform: translateX(0);

transition: opacity 0.25s ease, transform 0.25s ease;
The SVG arrow line animates using stroke-dasharray + stroke-dashoffset: starts fully hidden (dashoffset = full length) and draws itself in over 0.3s ease as the tooltip appears. On mouse-leave, reverse: box fades out, arrow undraws itself.

6. OVERFLOW & Z-INDEX

Set overflow: visible on .orbital-wrap and any parent container that clips the node areas, so description boxes can extend outside the orbital diagram bounds without being cut off.
All three tooltip containers must be z-index: 50 or higher so they render above connecting lines and the radar canvas.
On mobile (max-width: 768px): disable hover tooltips entirely. Tap on a node toggles the tooltip. Tap anywhere else closes it.


✅ Verification Checklist

Top node label reads UPLOAD, bottom-right reads GET PROTECTED, bottom-left reads DOWNLOAD
Hovering any node triggers scale(1.15) + intensified glow + brighter border simultaneously
Top and bottom-right nodes show description box to the right with arrow angling slightly upward from right edge of circle
Bottom-left (DOWNLOAD) node shows description box to the left with arrow from left edge
Arrow draws itself in via stroke-dashoffset animation on hover
Description box slides in from slight offset and fades in
All three boxes use identical glassmorphism styling
No layout shift, no clipping, no z-index conflicts
Mobile tap-toggle works correctly
Nothing else on the page is changed