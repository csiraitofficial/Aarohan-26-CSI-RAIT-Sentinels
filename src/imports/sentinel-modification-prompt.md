Sentinel — Modification Prompt
STRICT RULE: Change ONLY what is listed below. Every other section — Hero, The Threat stats/text, Technical Approach stepper, Impact & Feasibility, navbar, footer, fonts, colors, animations, particle background — must remain 100% identical to the current implementation.

❌ REMOVE COMPLETELY (delete the entire sections, no placeholders)

The "BUILT WITH" section (hexagonal tech stack grid)
The "LIMITATIONS & FUTURE SCOPE" section (the split red/green cards)
The "TEAM SENTINELS" section (the four member cards)


✏️ MODIFY — "THE THREAT" Section
Keep everything exactly as-is except: remove the < 30 seconds to generate a deepfake stat block entirely (the < 30 number and its label). The 1 Photo is all it takes stat and the 129,859 AI deepfakes created today counter stay untouched.

➕ ADD — Image Protection Visualizer (inside "THE THREAT" section)
Place this below the existing threat text and the red quote block, as a new sub-block within the same section. It should feel like an embedded terminal/scanner panel, not a new section.
Layout: Three panels side-by-side connected by animated arrows, inside a dark glassmorphism container (background: rgba(0,212,255,0.03), border: 1px solid rgba(0,212,255,0.12), slight cyan glow).
Panel 1 — Original Photo (AI POV)

Label at top in small Orbitron caps, red tint: AI SEES: VULNERABLE
A square image-placeholder box with a CSS-generated face-like grid overlay (use CSS repeating-linear-gradient crosshatch at low opacity in red to simulate AI scan lines)
Below it: small tag chips in red — [ Face Detected ] [ Identity Mapped ] [ Exploitable ]
Subtle animation: red scanline sweeping top-to-bottom on a 3s loop (@keyframes scanline — a thin 1px red line moving with translateY)

Arrow between Panel 1 → 2:

Animated SVG arrow, cyan colored, with a flowing dash animation (stroke-dashoffset moving left to right, 1.5s loop)
Label above arrow: SENTINEL APPLIED in tiny Orbitron

Panel 2 — Protection Applied (AI POV)

Label at top in cyan Orbitron: PROCESSING: SHIELDING
Same square placeholder but now overlaid with a CSS noise/perturbation pattern — use a radial + linear gradient layered at low opacity to look like pixel static being embedded
A circular progress ring that pulses (CSS @keyframes scale pulse, 2s loop on the ring border)
Below it: tag chips in cyan — [ Perturbation Injected ] [ FGSM Active ] [ Layer Encrypted ]

Arrow between Panel 2 → 3:

Same animated SVG arrow, green colored
Label above: PROTECTION COMPLETE

Panel 3 — Protected Image (AI POV)

Label at top in green Orbitron: AI SEES: CORRUPTED
Same square placeholder but with a CSS glitch effect — use @keyframes glitch with clip-path slices shifting horizontally by 4–6px at random intervals (low intensity, 4s loop, mostly idle)
Below it: tag chips in green — [ Deepfake Failed ] [ Output Distorted ] [ Identity Safe ]

Below the 3 panels: A single line in small Inter italic, muted white: "To human eyes, all three images look identical. Only AI models are disrupted."

🔄 REPLACE — "HOW SENTINEL PROTECTS YOU" Section
Remove the current 3-card (Upload / Protect / Share Safely) layout entirely. Replace with the following unique design — keep the section ID, keep the section heading style (same font, same cyan highlight on "PROTECTS YOU").
New concept: Orbital Defense Ring UI
Instead of cards in a row, render a central shield node with orbiting capability rings — like a radar/HUD display. This is pure CSS + JS, no external libraries.
Structure:
A large circular "command center" diagram, centered on the page:

Center: A glowing shield SVG icon, ~100px, with a slow continuous rotation of an outer ring around it (@keyframes orbit-ring rotating 360° over 8s, linear, infinite). The shield itself does NOT rotate — only the outer decorative ring does.
3 Orbiting Nodes positioned at 120° intervals around the center (use position: absolute + transform: rotate(Xdeg) translateX(180px) rotate(-Xdeg) pattern to keep labels upright):

Node 1 — UPLOAD SHIELD (top, ~12 o'clock)
Node 2 — ENCRYPT LAYER (bottom-right, ~4 o'clock)
Node 3 — SAFE DEPLOY (bottom-left, ~8 o'clock)


Each node: a small glowing circle (~50px) with a relevant SVG icon inside, cyan border with box-shadow: 0 0 15px #00d4ff. On page scroll-in, nodes animate in one by one with a 0.3s stagger (opacity 0 → 1, scale 0.5 → 1).
Connecting dashed lines from each node to the center shield: SVG lines with stroke-dasharray and animated stroke-dashoffset flowing inward toward the shield (like data streaming into the core), cyan color, low opacity (~0.4).
Outer radar sweep: A CSS conic-gradient that rotates (@keyframes radar-sweep — background: conic-gradient(from Xdeg, transparent 340deg, rgba(0,212,255,0.08) 360deg) — rotate the from value via a CSS custom property updated by JS requestAnimationFrame). Covers the whole circular diagram area. Very subtle — just enough to feel like an active radar without being distracting.

Below the diagram: Three horizontal "stat bars" (not cards), one per node, laid out in a row:
Each stat bar: border-left: 2px solid #00d4ff | icon | bold heading | one-sentence description — all in a single horizontal line. Like a HUD readout.
[↑ icon]  UPLOAD SHIELD     |  Your image enters an encrypted pipeline. Zero data retention.
[🔒 icon] ENCRYPT LAYER     |  Invisible adversarial perturbations embedded via FGSM algorithm.
[✓ icon]  SAFE DEPLOY       |  Protected image returned. Deepfake AI encounters only noise.
Use font-family: 'Inter' for descriptions, 'Orbitron' for the bold headings. Subtle hover on each bar: left border glows brighter, translateX(4px) shift.

📐 Layout Continuity Rules

After removing the 3 sections, ensure there is no orphaned whitespace — the Impact & Feasibility section should flow directly after the modified "How Sentinel Protects You" section
All scroll-behavior, IntersectionObserver entrance animations, and the side cyan scroll-progress bar must continue to work correctly after the DOM changes
Re-check that navbar anchor links still point to valid section IDs after removals