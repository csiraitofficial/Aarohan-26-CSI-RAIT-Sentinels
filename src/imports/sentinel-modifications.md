 Sentinel — Targeted Modification Prompt
STRICT RULE: Change ONLY what is listed below. Every section — Hero, The Threat, Technical Approach, Impact & Feasibility, Footer, fonts, colors, particle background, sonar rings, all animations — remains 100% identical. Do not touch any section outside what is explicitly listed.

1. NAVBAR — Remove "GET PROTECTED" button, Add "Home"
Remove the cyan GET PROTECTED button and its clipped-corner box entirely from both the desktop navbar and the mobile drawer.
In its place, add a Home nav link styled identically to the existing Problem, Solution, and How It Works links — same font (Inter), same color (rgba(255,255,255,0.8)), same hover color (#00d4ff), same font size, no border, no background, plain text button.
Place Home as the first item in the nav link list, before Problem.
Sentinel logo as Home button: The logo group (shield SVG + "SENTINEL" text) on the left side of the navbar must also act as a home button. Wrap it in a clickable element. On click, smoothly scroll to the very top of the page (window.scrollTo({ top: 0, behavior: 'smooth' })). Add cursor: pointer to it. No visual change to the logo itself — no underline, no border, no color change on hover.
Same behavior for the Home nav link — clicking it scrolls to top of page.
In the mobile drawer, also replace the GET PROTECTED button with a Home link (same plain style as the others), placed first.

2. ORBITAL SECTION — Nodes burst animation on scroll-enter
Current behavior: The three orbital nodes fade in with opacity 0→1 + scale 0.5→1 when the section enters the viewport via IntersectionObserver.
New behavior: When the section enters the viewport, the three nodes must animate outward from the center shield to their final positions — as if they are being launched from the core.
Implementation:

Before the animation triggers, all three nodes start at position: absolute, centered exactly on the shield (i.e., top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0)), with opacity: 0.
When IntersectionObserver fires, each node transitions to its correct final position with opacity: 1 and scale: 1, using transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease.
Stagger the three nodes: Node 1 (top) starts at delay: 0ms, Node 2 (bottom-right) at delay: 150ms, Node 3 (bottom-left) at delay: 300ms.
The cubic-bezier (0.34, 1.56, 0.64, 1) gives a slight overshoot/spring bounce as each node "locks into" its orbit position — this feels tactical and deliberate, not generic.
The node labels (UPLOAD SHIELD, ENCRYPT LAYER, SAFE DEPLOY) should fade in separately after the node reaches its position, with an additional 0.2s delay on top of the node's own delay.
The dashed connecting SVG lines from center to each node should also start invisible (opacity: 0) and fade in after their respective node has arrived (delay: node_delay + 0.5s).
The radar sweep and the center shield's rotating ring must already be running before the nodes animate in — they are not affected by this change.


3. ORBITAL SECTION — Remove stat bars, Add hover tooltips on nodes
Remove entirely: The three .stat-bar rows below the orbital diagram (UPLOAD SHIELD | ..., ENCRYPT LAYER | ..., SAFE DEPLOY | ...). Delete the .stat-bars container and all its children. Delete the associated CSS.
Add hover tooltip on each orbital node:
When the user hovers over any of the three orbital node circles, display a tooltip that shows the node's description text. The tooltip must:

Appear as a small floating panel — glassmorphism style: background: rgba(5,10,15,0.9), border: 1px solid rgba(0,212,255,0.25), backdrop-filter: blur(12px), box-shadow: 0 0 20px rgba(0,212,255,0.2), border-radius: 6px, padding 12px 16px.
Content: bold node title in Orbitron (e.g. UPLOAD SHIELD) in #00d4ff, small size 0.65rem, letter-spacing: 0.1em — then one line break — description text in Inter, 0.8rem, rgba(255,255,255,0.75), max-width 200px.
Position: centered above the node circle. Use position: absolute + bottom: calc(100% + 12px) + left: 50% + transform: translateX(-50%) so it floats above without shifting layout.
Animation: opacity 0 → 1 + translateY(6px) → translateY(0) over 0.25s ease. Reverse on mouse-leave.
The node's circle border glow intensifies on hover: box-shadow increases from 0 0 15px rgba(0,212,255,0.6) to 0 0 30px rgba(0,212,255,1), transition 0.25s.
Tooltip must not get clipped — ensure overflow: visible on all parent containers of the orbital nodes.
On mobile (touch devices, max-width: 768px): tapping a node toggles the tooltip. Tapping anywhere else closes it.

Tooltip content per node:

UPLOAD SHIELD: "Your image enters an encrypted pipeline. Zero data retention."
ENCRYPT LAYER: "Invisible adversarial perturbations embedded via FGSM algorithm."
SAFE DEPLOY: "Protected image returned. Deepfake AI encounters only noise."


4. Layout cleanup after stat bar removal
After removing the stat bars, add padding-bottom: 0 to the orbital section if there is excess whitespace. The next section (Technical Approach) should follow at normal section spacing. No orphaned gaps.

✅ Verification checklist

Home link appears first in navbar, plain style matching existing links
Clicking SENTINEL logo scrolls to top smoothly
GET PROTECTED button is fully gone from navbar and mobile drawer
Nodes animate outward from center on scroll-enter with spring bounce
Node labels and connecting lines fade in after nodes settle
Stat bars are completely removed, no whitespace remnant
Hover on each node shows correct glassmorphism tooltip above it
Mobile: tap-to-toggle tooltip works
All other sections, animations, colors unchanged