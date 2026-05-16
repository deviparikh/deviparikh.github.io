// Rangoli — Create Your Own
// Type a word. Watch a mandala bloom.

// ===== Feature flag for click-to-reroll =====
// Flip to false to disable the click-on-a-ring-to-reroll behavior entirely.
// All code gated by this flag is grouped at the bottom of the file under
// the "Ring click reroll" section, plus a couple of small hooks inline.
const ENABLE_RING_CLICK = true;
// ============================================

let canvasSize;       // width of the mandala square
let captionStripH;    // extra height below the square, reserved for caption
let recipe = null;
let ringOverrides = {};  // map: ringIndex -> click count (used only if ENABLE_RING_CLICK)
let animStart = 0;
let bloomDuration = 2000;
let holdDuration = 600;
let totalDuration = bloomDuration + holdDuration;
let captionText = "";
let variationIdx = 0;
let isRecording = false;
let mediaRecorder = null;
let recordedChunks = [];
let recordStartedAt = 0;

// ---------- Palettes ----------
// Reusing colors from Devi's other CYO tools for visual continuity.
let palettes = [
    // 0: classic rangoli — pink/green/blue/teal
    ['#E83E8C', '#F4D03F', '#27AE60', '#2E86C1', '#1B4F72', '#FFFFFF'],
    // 1: warm sunset
    ['#D7320F', '#E97219', '#DBC43B', '#A55523', '#343434', '#F8F5EE'],
    // 2: cool jewel tones
    ['#0E2E7C', '#0B8989', '#8F7092', '#3F6083', '#49A64C', '#F2E8D2'],
    // 3: pastel modern
    ['#7CCBB5', '#F1BC52', '#6CB6C8', '#FE7453', '#BAB7AF', '#FFFFFF'],
    // 4: monochrome ink
    ['#1A1A1A', '#3C3C3C', '#6E6E6E', '#A0A0A0', '#D0D0D0', '#FFFFFF'],
    // 5: neon pop
    ['#FB0574', '#F7E40D', '#330CD4', '#9E90DC', '#05AC9C', '#FBFBFB'],
    // 6: earthen
    ['#B65230', '#0B203B', '#D4A574', '#5A7F4A', '#E8DCC4', '#2C2C2C'],
];

let backgroundColor = '#FBF8F1'; // warm off-white
let outlineColor = '#1B1B1B';

// ---------- Hash text → seed ----------
function hashText(s) {
    if (!s || s.length === 0) {
        // fallback to today's date so we never have an unseeded canvas
        let d = new Date();
        s = d.toISOString().slice(0, 10);
    }
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = (h * 16777619) >>> 0;
    }
    return h.toString();
}

// Approximate luminance check — used to force outlines on near-bg colors
// so a white/cream fill doesn't disappear against the warm canvas background.
function isLightColor(hex) {
    if (typeof hex !== 'string' || !hex.startsWith('#') || hex.length !== 7) return false;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return (r + g + b) / 3 > 215;
}

// ---------- Recipe generation ----------
let motifTypes = [
    'petal', 'scallop', 'spike', 'dotring', 'bigcircle', 'wavy', 'diamond', 'leaf', 'comb',
    'chevron', 'bead', 'star', 'doubledot', 'flame'
];

function generateRecipe(seedStr, fold, complexity, paletteIdx) {
    Math.seedrandom(seedStr);
    const r = Math.random; // shorthand

    const palette = palettes[paletteIdx % palettes.length].slice();
    // shuffle a copy so different seeds use different color orders
    for (let i = palette.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [palette[i], palette[j]] = [palette[j], palette[i]];
    }

    // Slider value is the ring count directly (3-8). Tiny shim: legacy URLs
    // had complexity as 0.1-1.0; map those into the new integer range.
    const numMajorRings = complexity <= 1
        ? Math.floor(3 + complexity * 5)
        : Math.max(3, Math.min(8, Math.floor(complexity)));
    const rings = [];

    const centerR = canvasSize * 0.025;
    const maxR = canvasSize * 0.42;
    let prevR = centerR;
    const remaining = maxR - prevR;

    // give each ring a weight so radial bands are uneven (more natural)
    const weights = [];
    for (let i = 0; i < numMajorRings; i++) {
        weights.push(0.5 + r() * 1.2);
    }
    const totalW = weights.reduce((a, b) => a + b, 0);

    let lastMotif = null;
    let lastColor = null;
    for (let i = 0; i < numMajorRings; i++) {
        const thickness = (weights[i] / totalW) * remaining;
        let motif;
        do { motif = motifTypes[Math.floor(r() * motifTypes.length)]; }
        while (motif === lastMotif && r() < 0.8);
        lastMotif = motif;

        let color;
        do { color = palette[Math.floor(r() * palette.length)]; }
        while (color === lastColor && r() < 0.85);
        lastColor = color;

        // Force outline + filled mode when the color is near-bg (white/cream),
        // otherwise the motif disappears against the warm canvas background.
        const colorIsLight = isLightColor(color);
        const hasOutline = colorIsLight ? true : (r() < 0.65);
        const fillType = colorIsLight ? 'fill' : (r() < 0.85 ? 'fill' : 'stroke-only');
        // sometimes a thin band is a pure dot row
        const isThinDotBand = thickness < canvasSize * 0.03 && r() < 0.5;
        const useMotif = isThinDotBand ? 'dotring' : motif;

        rings.push({
            type: useMotif,
            originalType: useMotif,   // preserved so Original action knows what to revert to
            color,
            outline: hasOutline,
            fillType,
            rIn: prevR,
            rOut: prevR + thickness,
            // motif-specific knobs
            jitter: r(),
            subCount: 1 + Math.floor(r() * 2), // 1 or 2 motifs per fold-slice
            phase: r(),
            curl: 0.4 + r() * 0.6,
        });
        prevR += thickness;
    }

    // optional halo of scattered dots beyond the rim
    if (r() < 0.65) {
        rings.push({
            type: 'halo',
            originalType: 'halo',
            color: palette[Math.floor(r() * palette.length)],
            rIn: maxR + canvasSize * 0.005,
            rOut: maxR + canvasSize * 0.06,
            jitter: r(),
            density: 2 + Math.floor(r() * 3), // halo dots per fold
        });
    }

    return {
        fold,
        palette,
        paletteIdx,
        rings,
        centerR,
        centerColor: palette[Math.floor(r() * palette.length)],
        seedStr,
    };
}

// ---------- p5 setup ----------
function computeCanvasSize() {
    // Size canvas to the width of its parent column (the canvas card). We
    // intentionally don't cap by viewport height — vertical overflow is fine,
    // the user can scroll. Capping by height caused asymmetric side margins
    // inside the card whenever the viewport was shorter than the card was wide.
    const parent = document.getElementById('sketch-holder');
    const parentW = parent && parent.offsetWidth ? parent.offsetWidth : (windowWidth - 40);
    let s = Math.min(720, parentW);
    if (s < 280) s = 280;
    return s;
}

function setup() {
    canvasSize = computeCanvasSize();
    captionStripH = Math.round(canvasSize * 0.12);
    let cnv = createCanvas(canvasSize, canvasSize + captionStripH);
    cnv.id('mycanvas');
    cnv.parent('sketch-holder');
    // Scale pixelDensity so the canvas backs to a consistent internal
    // resolution (~1440 px) regardless of viewport size. This keeps recorded
    // video quality high on phones, where the displayed canvas is smaller.
    const targetInternal = 1440;
    const density = Math.max(1, Math.min(4, targetInternal / canvasSize));
    pixelDensity(density);
    angleMode(RADIANS);
    smooth();
    rebuildFromControls();
    animStart = millis();
}

function rebuildFromControls() {
    const input = document.getElementById('rangoliText');
    const userText = (input.value || "").trim();
    const placeholderText = (input.placeholder || "").trim();
    // Empty input falls back to the placeholder for both seed and caption,
    // so the page never loads as a captionless rangoli.
    captionText = userText || placeholderText;

    const fold = Number(document.getElementById('foldSlider').value);
    const complexity = Number(document.getElementById('complexitySlider').value);
    const paletteIdx = Number($("input[name='palette']:checked").val() || 0);

    // Seed combines text + variation index, so the Variation button gives a new
    // recipe for the same input without changing what the user typed.
    const seedStr = hashText(captionText + '|v' + variationIdx);
    recipe = generateRecipe(seedStr, fold, complexity, paletteIdx);
    if (ENABLE_RING_CLICK) applyRingOverrides(recipe, seedStr);

    // Sync the live state into the URL, including the default state, so
    // a fresh visit immediately produces a shareable permalink.
    const url = new URL(window.location.href);
    if (userText) {
        url.searchParams.set('t', userText);
    } else {
        url.searchParams.delete('t');
    }
    url.searchParams.set('f', fold);
    url.searchParams.set('c', complexity);
    url.searchParams.set('p', paletteIdx);
    if (variationIdx > 0) {
        url.searchParams.set('v', variationIdx);
    } else {
        url.searchParams.delete('v');
    }
    if (ENABLE_RING_CLICK) {
        const ovStr = stringifyOverrides();
        if (ovStr) {
            url.searchParams.set('o', ovStr);
        } else {
            url.searchParams.delete('o');
        }
    }
    window.history.replaceState("", "", url.href);
    if (ENABLE_RING_CLICK) updateOverrideButton();
}

function nextVariation() {
    variationIdx = (variationIdx + 1) % 1000;
    rebuildFromControls();
    snapToFinal();
}

function restartBloom() {
    animStart = millis();
}

// Jump straight to the held final state, no animation.
function snapToFinal() {
    animStart = millis() - totalDuration - 1;
}

// ---------- Per-ring reveal timing ----------
function ringProgress(ringIdx, numRings, tMs) {
    // Each ring gets a window; windows overlap so the bloom feels continuous
    const windowSize = bloomDuration / Math.max(1, numRings - 0.3);
    const overlap = 0.45;
    const start = ringIdx * windowSize * (1 - overlap);
    const end = start + windowSize;
    if (tMs < start) return 0;
    if (tMs >= end) return 1;
    const u = (tMs - start) / (end - start);
    // ease-out
    return 1 - Math.pow(1 - u, 2.2);
}

// ---------- Drawing ----------
function draw() {
    if (!recipe) return;

    background(backgroundColor);
    const t = millis() - animStart;
    // Play the bloom once, then hold the final state. No loop.
    const tBloom = Math.min(t, totalDuration);

    push();
    translate(width / 2, canvasSize / 2);

    // center seed
    const centerProg = ringProgress(-1, recipe.rings.length, tBloom);
    drawCenter(centerProg);

    for (let i = 0; i < recipe.rings.length; i++) {
        const ring = recipe.rings[i];
        const prog = ringProgress(i, recipe.rings.length, tBloom);
        if (prog <= 0) continue;
        drawRing(ring, prog);
    }
    pop();

    drawCaption(tBloom);

    // stop the recorder when we've captured the full sequence
    if (isRecording && millis() - recordStartedAt >= bloomDuration) {
        stopRecording();
    }
}

function drawCenter(prog) {
    const r = recipe.centerR * prog;
    if (r < 0.5) return;
    fill(recipe.centerColor);
    noStroke();
    circle(0, 0, r * 2);
    if (r > 2) {
        stroke(outlineColor);
        strokeWeight(1);
        noFill();
        circle(0, 0, r * 2);
    }
}

function drawRing(ring, prog) {
    const N = recipe.fold;
    const visibleCopies = N * prog;

    for (let k = 0; k < N; k++) {
        const reveal = constrain(visibleCopies - k, 0, 1);
        if (reveal <= 0) break;
        push();
        rotate((k / N) * TWO_PI);
        // small grow-in on the last revealing copy
        if (reveal < 1) scale(0.6 + 0.4 * reveal, 0.6 + 0.4 * reveal);
        drawMotif(ring, N, reveal);
        pop();
    }
}

function drawMotif(ring, N, reveal) {
    const angularWidth = TWO_PI / N;
    const rIn = ring.rIn;
    const rOut = ring.rOut;
    const thickness = rOut - rIn;
    const cx = (rIn + rOut) / 2;
    const sub = ring.subCount || 1;

    fill(ring.color);
    if (ring.outline) {
        stroke(outlineColor);
        strokeWeight(1.2);
    } else {
        noStroke();
    }
    if (ring.fillType === 'stroke-only') {
        noFill();
        stroke(ring.color);
        strokeWeight(2);
    }

    switch (ring.type) {
        case 'petal':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawPetal(ang, rIn, rOut, angularWidth / sub * 0.85);
            }
            break;
        case 'scallop':
            drawScallop(angularWidth, rIn, rOut);
            break;
        case 'spike':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawSpike(ang, rIn, rOut, angularWidth / sub * 0.75);
            }
            break;
        case 'dotring':
            for (let s = 0; s < sub + 1; s++) {
                const ang = (s + 0.5) / (sub + 1) * angularWidth - angularWidth / 2;
                drawDot(ang, cx, thickness * 0.35);
            }
            break;
        case 'bigcircle':
            drawBigCircle(0, cx, thickness * 0.45);
            break;
        case 'wavy':
            drawWavyBand(angularWidth, rIn, rOut, ring.curl);
            break;
        case 'diamond':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawDiamond(ang, rIn, rOut, angularWidth / sub * 0.7);
            }
            break;
        case 'leaf':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawLeaf(ang, rIn, rOut, angularWidth / sub * 0.85);
            }
            break;
        case 'comb':
            drawComb(angularWidth, rIn, rOut);
            break;
        case 'chevron':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawChevron(ang, rIn, rOut, angularWidth / sub * 0.8);
            }
            break;
        case 'bead':
            for (let s = 0; s < (sub + 2); s++) {
                const ang = (s + 0.5) / (sub + 2) * angularWidth - angularWidth / 2;
                drawDot(ang, cx, thickness * 0.2);
            }
            break;
        case 'star':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawStar(ang, rIn, rOut, angularWidth / sub * 0.7);
            }
            break;
        case 'doubledot':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawDot(ang, rIn + thickness * 0.3, thickness * 0.28);
                drawDot(ang, rIn + thickness * 0.7, thickness * 0.28);
            }
            break;
        case 'flame':
            for (let s = 0; s < sub; s++) {
                const ang = (s + 0.5) / sub * angularWidth - angularWidth / 2;
                drawFlame(ang, rIn, rOut, angularWidth / sub * 0.85);
            }
            break;
        case 'halo':
            drawHaloDots(angularWidth, rIn, rOut, ring.density || 3, ring.jitter || 0);
            break;
    }
}

// ---------- Motif primitives ----------
// All motifs are drawn within a single angular slice of width angularWidth,
// centered on angle 0. We rotate the slice externally to tile around the center.

function drawPetal(angOffset, rIn, rOut, halfAngle) {
    // teardrop pointing outward
    const tipX = rOut * Math.cos(angOffset);
    const tipY = rOut * Math.sin(angOffset);
    const baseX = rIn * Math.cos(angOffset);
    const baseY = rIn * Math.sin(angOffset);
    const ctrl1X = (rOut * 0.85) * Math.cos(angOffset + halfAngle * 0.45);
    const ctrl1Y = (rOut * 0.85) * Math.sin(angOffset + halfAngle * 0.45);
    const ctrl2X = (rOut * 0.85) * Math.cos(angOffset - halfAngle * 0.45);
    const ctrl2Y = (rOut * 0.85) * Math.sin(angOffset - halfAngle * 0.45);
    const side1X = (rIn + (rOut - rIn) * 0.35) * Math.cos(angOffset + halfAngle * 0.5);
    const side1Y = (rIn + (rOut - rIn) * 0.35) * Math.sin(angOffset + halfAngle * 0.5);
    const side2X = (rIn + (rOut - rIn) * 0.35) * Math.cos(angOffset - halfAngle * 0.5);
    const side2Y = (rIn + (rOut - rIn) * 0.35) * Math.sin(angOffset - halfAngle * 0.5);

    beginShape();
    vertex(baseX, baseY);
    bezierVertex(side1X, side1Y, ctrl1X, ctrl1Y, tipX, tipY);
    bezierVertex(ctrl2X, ctrl2Y, side2X, side2Y, baseX, baseY);
    endShape(CLOSE);
}

function drawScallop(angularWidth, rIn, rOut) {
    // a bulging arc band, outer edge bulges outward
    const steps = 24;
    const half = angularWidth / 2;
    beginShape();
    for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const a = -half + u * angularWidth;
        const bulge = Math.sin(u * Math.PI);
        const r = rOut - (rOut - rIn) * 0.15 + bulge * (rOut - rIn) * 0.2;
        vertex(r * Math.cos(a), r * Math.sin(a));
    }
    for (let i = steps; i >= 0; i--) {
        const u = i / steps;
        const a = -half + u * angularWidth;
        const r = rIn;
        vertex(r * Math.cos(a), r * Math.sin(a));
    }
    endShape(CLOSE);
}

function drawSpike(angOffset, rIn, rOut, halfAngle) {
    const tipX = rOut * Math.cos(angOffset);
    const tipY = rOut * Math.sin(angOffset);
    const b1X = rIn * Math.cos(angOffset + halfAngle * 0.5);
    const b1Y = rIn * Math.sin(angOffset + halfAngle * 0.5);
    const b2X = rIn * Math.cos(angOffset - halfAngle * 0.5);
    const b2Y = rIn * Math.sin(angOffset - halfAngle * 0.5);
    triangle(tipX, tipY, b1X, b1Y, b2X, b2Y);
}

function drawDot(angOffset, r, size) {
    const x = r * Math.cos(angOffset);
    const y = r * Math.sin(angOffset);
    circle(x, y, size);
}

function drawBigCircle(angOffset, r, size) {
    const x = r * Math.cos(angOffset);
    const y = r * Math.sin(angOffset);
    circle(x, y, size * 1.4);
}

function drawWavyBand(angularWidth, rIn, rOut, curl) {
    const steps = 28;
    const half = angularWidth / 2;
    const mid = (rIn + rOut) / 2;
    const amp = (rOut - rIn) * 0.45 * curl;
    beginShape();
    for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const a = -half + u * angularWidth;
        const r = mid + amp * Math.sin(u * Math.PI * 3);
        vertex(r * Math.cos(a), r * Math.sin(a));
    }
    for (let i = steps; i >= 0; i--) {
        const u = i / steps;
        const a = -half + u * angularWidth;
        const r = rIn;
        vertex(r * Math.cos(a), r * Math.sin(a));
    }
    endShape(CLOSE);
}

function drawDiamond(angOffset, rIn, rOut, halfAngle) {
    const cx = (rIn + rOut) / 2;
    const ox = cx * Math.cos(angOffset);
    const oy = cx * Math.sin(angOffset);
    const dx = (rOut - cx) * Math.cos(angOffset);
    const dy = (rOut - cx) * Math.sin(angOffset);
    const px = -Math.sin(angOffset) * (cx * Math.tan(halfAngle));
    const py = Math.cos(angOffset) * (cx * Math.tan(halfAngle));
    quad(ox + dx, oy + dy, ox + px, oy + py, ox - dx, oy - dy, ox - px, oy - py);
}

function drawLeaf(angOffset, rIn, rOut, halfAngle) {
    // Almond / lance-shaped leaf — pointed at base AND tip, lobes on the
    // sides. Distinct from petal (rounded base) and from spike (sharp).
    const tipX = rOut * Math.cos(angOffset);
    const tipY = rOut * Math.sin(angOffset);
    const baseX = rIn * Math.cos(angOffset);
    const baseY = rIn * Math.sin(angOffset);

    // Left and right side lobes at the mid-radius, on opposite sides of the
    // spine so the two bezier edges trace different paths (not collapsed).
    const midR = (rIn + rOut) / 2;
    const wL = halfAngle * 0.55;
    const wR = halfAngle * 0.45;  // slight asymmetry for a more leaf-like silhouette
    const lobeLX = midR * Math.cos(angOffset + wL);
    const lobeLY = midR * Math.sin(angOffset + wL);
    const lobeRX = midR * Math.cos(angOffset - wR);
    const lobeRY = midR * Math.sin(angOffset - wR);

    beginShape();
    vertex(baseX, baseY);
    bezierVertex(lobeLX, lobeLY, lobeLX, lobeLY, tipX, tipY);  // base → tip (left side)
    bezierVertex(lobeRX, lobeRY, lobeRX, lobeRY, baseX, baseY); // tip → base (right side)
    endShape(CLOSE);
}

function drawComb(angularWidth, rIn, rOut) {
    const teeth = 4;
    const gap = angularWidth / (teeth * 2 + 1);
    for (let i = 0; i < teeth; i++) {
        const a = -angularWidth / 2 + gap + (i * 2) * gap + gap * 0.5;
        const w = gap * 0.85;
        const x1 = rIn * Math.cos(a - w / 2);
        const y1 = rIn * Math.sin(a - w / 2);
        const x2 = rIn * Math.cos(a + w / 2);
        const y2 = rIn * Math.sin(a + w / 2);
        const x3 = rOut * Math.cos(a + w / 2);
        const y3 = rOut * Math.sin(a + w / 2);
        const x4 = rOut * Math.cos(a - w / 2);
        const y4 = rOut * Math.sin(a - w / 2);
        quad(x1, y1, x2, y2, x3, y3, x4, y4);
    }
}

function drawChevron(angOffset, rIn, rOut, halfAngle) {
    // V-shape pointing outward (filled).
    const tipX = rOut * Math.cos(angOffset);
    const tipY = rOut * Math.sin(angOffset);
    const innerX = rIn * Math.cos(angOffset);
    const innerY = rIn * Math.sin(angOffset);
    const wing = rOut * 0.75;
    const wingL_X = wing * Math.cos(angOffset + halfAngle * 0.45);
    const wingL_Y = wing * Math.sin(angOffset + halfAngle * 0.45);
    const wingR_X = wing * Math.cos(angOffset - halfAngle * 0.45);
    const wingR_Y = wing * Math.sin(angOffset - halfAngle * 0.45);
    quad(tipX, tipY, wingL_X, wingL_Y, innerX, innerY, wingR_X, wingR_Y);
}

function drawStar(angOffset, rIn, rOut, halfAngle) {
    // Small 5-pointed star sitting in the ring, one tip pointing outward.
    const cx = (rIn + rOut) / 2;
    const ox = cx * Math.cos(angOffset);
    const oy = cx * Math.sin(angOffset);
    const radOuter = Math.min((rOut - rIn) * 0.5, cx * Math.tan(halfAngle) * 0.95);
    const radInner = radOuter * 0.42;
    const points = 5;

    push();
    translate(ox, oy);
    rotate(angOffset - Math.PI / 2);
    beginShape();
    for (let i = 0; i < points * 2; i++) {
        const r = (i % 2 === 0) ? radOuter : radInner;
        const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
        vertex(r * Math.cos(a), r * Math.sin(a));
    }
    endShape(CLOSE);
    pop();
}

function drawFlame(angOffset, rIn, rOut, halfAngle) {
    // Flame-like teardrop with a slight curl, tip pointing outward.
    const tipR = rOut * 0.95;
    const baseR = rIn;
    const curlA = angOffset + halfAngle * 0.12;
    const aL = angOffset - halfAngle * 0.45;
    const aR = angOffset + halfAngle * 0.45;
    const midR = (rIn + rOut) / 2;

    beginShape();
    vertex(baseR * Math.cos(aL), baseR * Math.sin(aL));
    bezierVertex(
        midR * Math.cos(angOffset - halfAngle * 0.35), midR * Math.sin(angOffset - halfAngle * 0.35),
        tipR * Math.cos(curlA - halfAngle * 0.08), tipR * Math.sin(curlA - halfAngle * 0.08),
        tipR * Math.cos(curlA), tipR * Math.sin(curlA)
    );
    bezierVertex(
        tipR * Math.cos(curlA + halfAngle * 0.08), tipR * Math.sin(curlA + halfAngle * 0.08),
        midR * Math.cos(angOffset + halfAngle * 0.35), midR * Math.sin(angOffset + halfAngle * 0.35),
        baseR * Math.cos(aR), baseR * Math.sin(aR)
    );
    endShape(CLOSE);
}

function drawHaloDots(angularWidth, rIn, rOut, density, jitter) {
    for (let i = 0; i < density; i++) {
        const u = (i + 0.5) / density;
        const a = -angularWidth / 2 + u * angularWidth + (jitter - 0.5) * angularWidth * 0.2;
        const r = rIn + (rOut - rIn) * (0.3 + ((jitter * 7 + i * 1.3) % 1) * 0.6);
        const size = (rOut - rIn) * 0.35;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        noStroke();
        circle(x, y, size);
    }
}

// ---------- Caption ----------
function drawCaption(tBloom) {
    if (!captionText) return;
    // fade in caption near end of bloom
    const fadeStart = bloomDuration - 500;
    const fadeEnd = bloomDuration;
    let alpha = 0;
    if (tBloom >= fadeStart) {
        alpha = constrain((tBloom - fadeStart) / (fadeEnd - fadeStart), 0, 1);
    }
    if (alpha <= 0) return;

    push();
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    const size = Math.max(15, captionStripH * 0.42);
    textSize(size);
    fill(28, 28, 28, 255 * alpha);
    noStroke();
    // Caption lives in the strip below the mandala square, never overlapping the halo.
    text(captionText, width / 2, canvasSize + captionStripH / 2);
    pop();
}

// ---------- Recording ----------
let recordedExt = 'mp4';
let recordedMime = 'video/mp4';

function startRecording() {
    if (isRecording) return;
    const canvasEl = document.getElementById('mycanvas');
    if (!canvasEl || !canvasEl.captureStream) {
        alert("Your browser doesn't support canvas video capture. Try Chrome, Edge, Safari, or Firefox.");
        return;
    }
    const stream = canvasEl.captureStream(30);

    // Prefer MP4 (Twitter-ready). Fall back to WebM if the browser can't do MP4.
    const candidates = [
        { mime: 'video/mp4;codecs=h264',           ext: 'mp4'  },
        { mime: 'video/mp4;codecs="avc1.42E01E"',  ext: 'mp4'  },
        { mime: 'video/mp4',                       ext: 'mp4'  },
        { mime: 'video/webm;codecs=vp9',           ext: 'webm' },
        { mime: 'video/webm;codecs=vp8',           ext: 'webm' },
        { mime: 'video/webm',                      ext: 'webm' }
    ];
    let options = { videoBitsPerSecond: 6_000_000 };  // ~6 Mbps for clean detail
    recordedExt = 'webm';
    recordedMime = 'video/webm';
    for (const c of candidates) {
        if (window.MediaRecorder && MediaRecorder.isTypeSupported(c.mime)) {
            options.mimeType = c.mime;
            recordedExt = c.ext;
            recordedMime = c.mime.split(';')[0];
            break;
        }
    }

    try {
        mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
        alert("Couldn't start recording: " + e.message);
        return;
    }
    recordedChunks = [];
    mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: recordedMime });
        const url = URL.createObjectURL(blob);
        const fname = makeFilename('rangoli', recordedExt);
        const a = document.createElement('a');
        a.href = url;
        a.download = fname;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        const indicator = document.getElementById('recIndicator');
        if (indicator) indicator.style.display = 'none';
    };

    // Start a clean bloom for recording.
    // Force one draw() at t=0 BEFORE starting the recorder so the first captured
    // frame is the empty initial state, not the previously held final state.
    animStart = millis();
    redraw();
    recordStartedAt = millis();
    isRecording = true;
    mediaRecorder.start();
    const indicator = document.getElementById('recIndicator');
    if (indicator) indicator.style.display = 'inline-block';
}

function stopRecording() {
    if (!isRecording) return;
    isRecording = false;
    try { mediaRecorder.stop(); } catch (e) {}
}

function makeFilename(prefix, ext) {
    let safe = (captionText || 'rangoli').toLowerCase()
        .replace(/[^a-z0-9\-_]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 30);
    if (!safe) safe = 'rangoli';
    return `${prefix}-${safe}.${ext}`;
}

function downloadPNG() {
    const canvasEl = document.getElementById('mycanvas');
    const dataURL = canvasEl.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = makeFilename('rangoli', 'png');
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 100);
}

function postOnX() {
    const here = encodeURIComponent(window.location.href);
    const txt = `I made this with @deviparikh's Rangoli tool — try making one yourself`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${here}`;
    window.open(url, '_blank');
}

// ========================================================
// Ring click reroll  (gated by ENABLE_RING_CLICK)
// Click a ring of the rangoli to re-roll just that ring's
// motif + color, keeping its position and the rest of the
// mandala stable. URL param 'o' captures the overrides so
// the result is shareable.
//
// To remove this feature entirely:
//   1) set ENABLE_RING_CLICK = false at the top of this file,
//      OR
//   2) delete this whole block and the small inline hooks
//      tagged with `ENABLE_RING_CLICK` elsewhere, plus the
//      "Reset rings" button + 'o' hydration in rangoli.html.
// ========================================================
function applyRingOverrides(recipe, masterSeedStr) {
    if (!recipe || !ringOverrides) return;
    for (let i = 0; i < recipe.rings.length; i++) {
        const ov = ringOverrides[i];
        if (!ov || !ov.motif) continue;
        const ring = recipe.rings[i];
        // Don't override the halo; halo is its own thing.
        if (ring.type === 'halo') continue;
        ring.type = ov.motif;
    }
}

function parseOverrides(s) {
    const result = {};
    if (!s) return result;
    s.split(',').forEach(pair => {
        const parts = pair.split(':');
        if (parts.length === 2) {
            const idx = Number(parts[0]);
            const motif = parts[1];
            if (!isNaN(idx) && motifTypes.indexOf(motif) >= 0) {
                result[idx] = { motif };
            }
        }
    });
    return result;
}

function stringifyOverrides() {
    return Object.keys(ringOverrides)
        .filter(k => ringOverrides[k] && ringOverrides[k].motif)
        .map(k => `${k}:${ringOverrides[k].motif}`)
        .join(',');
}

function pickUiRandom(list) {
    if (!Array.isArray(list) || list.length === 0) return null;
    if (window.crypto && window.crypto.getRandomValues) {
        const buf = new Uint32Array(1);
        window.crypto.getRandomValues(buf);
        return list[buf[0] % list.length];
    }
    return list[Math.floor(Math.random() * list.length)];
}

// Picker state — visible only while a ring is being interactively re-chosen.
let pickerActive = false;
let pickingRingIdx = -1;
let snapshotRingType = null;        // motif the ring had when picker opened
let sessionRandomMotif = null;      // pre-picked random for this picker session (preview matches commit)

// Long-press detection: quick click = random reroll, long press = open picker.
let pressTimer = null;
let pressedRingIdx = -1;
let pressedDownAt = 0;
const LONG_PRESS_MS = 350;
let lastTouchAt = 0;                // dedup touch → mouse emulation

function hitTestRing(mx, my) {
    if (!recipe) return -1;
    if (my > canvasSize || my < 0) return -1;
    if (mx < 0 || mx > width) return -1;
    const dx = mx - width / 2;
    const dy = my - canvasSize / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);
    for (let i = recipe.rings.length - 1; i >= 0; i--) {
        const ring = recipe.rings[i];
        if (ring.type === 'halo') continue;  // halo is decorative; don't pick it
        if (dist >= ring.rIn && dist <= ring.rOut) return i;
    }
    return -1;
}

// Single entry point used by both mousePressed and touchStarted.
function startRingPress(canvasX, canvasY) {
    if (!ENABLE_RING_CLICK) return false;
    if (pickerActive) return false;
    const idx = hitTestRing(canvasX, canvasY);
    if (idx < 0) return false;
    pressedRingIdx = idx;
    pressedDownAt = Date.now();
    if (pressTimer !== null) clearTimeout(pressTimer);
    const captureX = canvasX;
    const captureY = canvasY;
    pressTimer = setTimeout(() => {
        pressTimer = null;
        if (pressedRingIdx >= 0) {
            openPicker(pressedRingIdx, captureX, captureY);
        }
    }, LONG_PRESS_MS);
    return true;
}

function endRingPress() {
    if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
        // Quick release before long-press fired → random reroll of the pressed ring.
        if (pressedRingIdx >= 0 && !pickerActive) {
            rerollRingRandom(pressedRingIdx);
        }
    }
    pressedRingIdx = -1;
}

function rerollRingRandom(ringIdx) {
    if (!recipe) return;
    const ring = recipe.rings[ringIdx];
    if (!ring || ring.type === 'halo') return;
    const currentMotif = ring.type;
    const others = motifTypes.filter(m => m !== currentMotif);
    if (others.length === 0) return;
    const pick = pickUiRandom(others);
    ringOverrides[ringIdx] = { motif: pick };
    rebuildFromControls();
    snapToFinal();
}

function mousePressed() {
    // Dedup: if a touch event fired within the last 500ms, the browser is
    // emulating a mousedown — skip to avoid double-handling.
    if (Date.now() - lastTouchAt < 500) return;
    startRingPress(mouseX, mouseY);
}

function mouseReleased() {
    if (Date.now() - lastTouchAt < 500) return;
    endRingPress();
}

function touchStarted() {
    lastTouchAt = Date.now();
    const handled = startRingPress(mouseX, mouseY);
    if (handled) return false;  // suppress page scroll when pressing on a ring
}

function touchEnded() {
    lastTouchAt = Date.now();
    endRingPress();
}

function openPicker(ringIdx, canvasX, canvasY) {
    pickerActive = true;
    pickingRingIdx = ringIdx;
    snapshotRingType = recipe.rings[ringIdx].type;
    // Pre-pick the random motif for this picker session so the hover preview
    // matches what gets committed if the user releases on "random".
    const others = motifTypes.filter(m => m !== snapshotRingType);
    sessionRandomMotif = others.length > 0
        ? pickUiRandom(others)
        : snapshotRingType;
    const pickerEl = document.getElementById('motifPicker');
    if (!pickerEl) return;
    pickerEl.style.display = 'grid';
    // Position near the cursor, in viewport coords, kept on screen.
    const canvas = document.getElementById('mycanvas');
    const rect = canvas.getBoundingClientRect();
    const viewportX = rect.left + canvasX;
    const viewportY = rect.top + canvasY;
    // Defer to next tick so the grid has measurable dimensions.
    requestAnimationFrame(() => {
        const pw = pickerEl.offsetWidth;
        const ph = pickerEl.offsetHeight;
        let left = viewportX + 10;
        let top = viewportY + 10;
        if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
        if (top + ph > window.innerHeight - 8) top = viewportY - ph - 10;
        if (left < 8) left = 8;
        if (top < 8) top = 8;
        pickerEl.style.left = left + 'px';
        pickerEl.style.top = top + 'px';
    });
}

function closePicker(commitMotifName, actionKind) {
    if (!pickerActive) return;
    const ringIdx = pickingRingIdx;
    pickerActive = false;
    pickingRingIdx = -1;
    const pickerEl = document.getElementById('motifPicker');
    if (pickerEl) {
        pickerEl.style.display = 'none';
        pickerEl.querySelectorAll('.motifOption.hovered').forEach(el => el.classList.remove('hovered'));
    }
    if (actionKind === 'original') {
        delete ringOverrides[ringIdx];
    } else if (actionKind === 'random') {
        if (sessionRandomMotif) {
            ringOverrides[ringIdx] = { motif: sessionRandomMotif };
        }
    } else if (commitMotifName && motifTypes.indexOf(commitMotifName) >= 0) {
        ringOverrides[ringIdx] = { motif: commitMotifName };
    }
    // Always rebuild — either we committed a change or we need to revert the preview.
    rebuildFromControls();
    snapToFinal();
    snapshotRingType = null;
    sessionRandomMotif = null;
}

function previewMotifLive(motifName) {
    if (!pickerActive || pickingRingIdx < 0 || !recipe) return;
    if (motifName === null) {
        if (snapshotRingType) recipe.rings[pickingRingIdx].type = snapshotRingType;
    } else if (motifTypes.indexOf(motifName) >= 0) {
        recipe.rings[pickingRingIdx].type = motifName;
    }
    snapToFinal();
}

function resetOverrides() {
    ringOverrides = {};
    const url = new URL(window.location.href);
    url.searchParams.delete('o');
    window.history.replaceState("", "", url.href);
    rebuildFromControls();
    snapToFinal();
}

function updateOverrideButton() {
    const btn = document.getElementById('resetOverridesBtn');
    if (!btn) return;
    const count = ENABLE_RING_CLICK
        ? Object.keys(ringOverrides).filter(k => ringOverrides[k] && ringOverrides[k].motif).length
        : 0;
    btn.style.display = count > 0 ? 'inline-block' : 'none';
    btn.textContent = count > 0 ? `Restore rings (${count})` : 'Restore rings';
}
// ========================================================
// End of "Ring click reroll" section
// ========================================================

// ---------- Window resize ----------
function windowResized() {
    canvasSize = computeCanvasSize();
    captionStripH = Math.round(canvasSize * 0.12);
    const targetInternal = 1440;
    const density = Math.max(1, Math.min(4, targetInternal / canvasSize));
    pixelDensity(density);
    resizeCanvas(canvasSize, canvasSize + captionStripH);
    rebuildFromControls();
    snapToFinal();
}
