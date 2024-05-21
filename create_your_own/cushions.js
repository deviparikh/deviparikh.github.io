function genTokenData(projectNum) {
    let data = {};
    let hash = "0x";
    for (var i = 0; i < 64; i++) {
        hash += Math.floor(Math.random() * 16).toString(16);
    }
    data.hash = hash;
    data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
    return data;
}
let tokenData = genTokenData(123);
// let tokenData = {"hash":"0x6ddb3f486802f8a5c396dfa405fc524b1d4b787f90d91d5e5a528245a56216c4","tokenId":"123000456"}
// tokenData.hash = '0xe160a725f9ec837afe46cdef8cfc285913fa17837addbd185ab8f7a33824c6fa';
// tokenData.hash = '0xff24aa2cb7d77e7e5f603551e5a676cab087dff6eab93bf434b5175b9c73b820';
// tokenData.hash = '0xf147a843ed83a733f7e6d3794d306755b9516249bce0f5a201522d91d0803d52';
console.log(tokenData.hash)
let rawParams = setupParametersFromTokenData(tokenData)
let seed = generateSeedFromTokenData(tokenData)
let tokenId = parseInt(tokenData.tokenId.substring(2))

class Random {
    constructor() {
        this.useA = false;
        let sfc32 = function(uint128Hex) {
            let a = parseInt(uint128Hex.substr(0, 8), 16);
            let b = parseInt(uint128Hex.substr(8, 8), 16);
            let c = parseInt(uint128Hex.substr(16, 8), 16);
            let d = parseInt(uint128Hex.substr(24, 8), 16);
            return function() {
                a |= 0;
                b |= 0;
                c |= 0;
                d |= 0;
                let t = (((a + b) | 0) + d) | 0;
                d = (d + 1) | 0;
                a = b ^ (b >>> 9);
                b = (c + (c << 3)) | 0;
                c = (c << 21) | (c >>> 11);
                c = (c + t) | 0;
                return (t >>> 0) / 4294967296;
            };
        };
        this.prngA = new sfc32(tokenData.hash.substr(2, 32));
        this.prngB = new sfc32(tokenData.hash.substr(34, 32));
        for (let i = 0; i < 1e6; i += 2) {
            this.prngA();
            this.prngB();
        }
    }
    random_dec() {
        this.useA = !this.useA;
        return this.useA ? this.prngA() : this.prngB();
    }
    random_num(a, b) {
        return a + (b - a) * this.random_dec();
    }
    random_int(a, b) {
        return Math.floor(this.random_num(a, b + 1));
    }
    random_bool(p) {
        return this.random_dec() < p;
    }
}
rnd = new Random(seed)


let palettes = [
    ['#FFD4B5','#AA9CFF','#D1FFCF','#32BFD1'], //0 pastel
    ['#FF67E7','#FFF338','#9A5AFF','#0CECDD'], //1 neon
    ['#FFBCBC','#F38BA0','#EDF6E5','#B5EAEA'], // 2 dreams https://colorhunt.co/palette/b5eaeaedf6e5ffbcbcf38ba0
    ['#F9F9F9','#F7DBF0','#BEAEE2','#CDF0EA'], //3 marshmallow https://colorhunt.co/palette/cdf0eaf9f9f9f7dbf0beaee2
    ['#FFC074','#FAF1E6','#B6C867','#01937C'], //4 meadows https://colorhunt.co/palette/faf1e6ffc074b6c86701937c
    ['#BB371A','#EBA83A','#FFF8D9','#D5DBB3'], //5 ethnic https://colorhunt.co/palette/eba83abb371afff8d9d5dbb3
    ['#FFCEAD','#FFF5AB','#C449C2','#867AE9'], //6 cake https://colorhunt.co/palette/867ae9fff5abffceadc449c2
    ['#FFAAA7','#FFD3B4','#D5ECC2','#98DDCA'], //7 baby https://colorhunt.co/palette/98ddcad5ecc2ffd3b4ffaaa7
    ['#BE0000','#E48900','#F7EA00','#9EDE73'], //8 bright https://colorhunt.co/palette/9ede73f7ea00e48900be0000
    ['#FFCB91','#FFEFA1','#94EBCD','#6DDCCF'], //9 beach https://colorhunt.co/palette/ffcb91ffefa194ebcd6ddccf
    ['#AA2B1D','#CC561E','#EF8D32','#BECA5C'], //10 gradient https://colorhunt.co/palette/aa2b1dcc561eef8d32beca5c
    ['#FF75A0','#FCE38A','#EAFFD0','#95E1D3'], //11 cotton candy https://colorhunt.co/palette/ff75a0fce38aeaffd095e1d3
    ['#FFE6E6','#FFABE1','#A685E2','#6155A6'], //12 journal https://colorhunt.co/palette/ffe6e6ffabe1a685e26155a6
    ['#EF4F4F','#EE9595','#FFCDA3','#74C7B8'], //13 authentic https://colorhunt.co/palette/ef4f4fee9595ffcda374c7b8
    ['#FF577F','#FF884B','#FFC764','#CDFFFC'], //14 cartoons https://colorhunt.co/palette/ff577fff884bffc764cdfffc
    ['#FF449F','#FFF5B7','#005F99','#00EAD3'], //15 statement https://colorhunt.co/palette/00ead3fff5b7ff449f005f99
    ['#FF94CC','#F0D9E7','#A239EA','#5C33F6'], //16 business https://colorhunt.co/palette/f0d9e7ff94cca239ea5c33f6
    ['#FBC7F7','#D62AD0','#FB7AFC','#78DEC7'], //17 salient https://colorhunt.co/palette/78dec7d62ad0fb7afcfbc7f7
    ['#ff3333','#dcd427','#779933','#0092cc'], //18 primary
    ['#c0392b','#e67e22','#27ae60','#2980b9'], //19 home
    ['#fab1a0','#fd79a8','#a29bfe','#81ecec'], //20 icing
    ['#ff7675','#ffeaa7','#74b9ff','#55efc4'], //21 birthday
    ['#e17055','#e84393','#6c5ce7','#00cec9'], //22 grown up
    ['#d63031','#fdcb6e','#0984e3','#00b894'], //23 core
    ['#DB162F','#DFD630','#09588E','#04A5AA'], // 24 scheme 
    ['#F56A0F','#CCED32','#7ED615','#1F37AD'], // 25 activity
    ['#FE0879','#FF82E2','#FED715','#0037B3'], // 26 pop
    ['#943038','#945E46','#B68264','#EAD6B9'], // 27 wood
    ['#FFFFFF','#C74BA3','#FFC618','#3E45AA'], // 28 mighty
    ['#E53A3B','#FAEFCF','#FAC80E','#589F7F'], // 29 iconic
    ['#FD9CAC','#FB934E','#FABE51','#1BAC6C'], // 30 potential
    ['#FCA202','#521AA8','#2336D8','#028224'], // 31 gold
    ['#F24976','#F29F05','#553967','#0FA619'], // 32 insomnia
    ['#F29BAB','#F26A4B','#F2CA52','#1BA665'], // 33 safe
    ['#794F6B','#F280D4','#9678BF','#8FD9BE'], // 34 surprise
    ['#F2766B','#F22233','#F2A2A9','#F2BB13'], // 35 love
    ['#BF610F','#73024B','#165927','#037F8C'], // 36 deep
    ['#C11432','#FDD10A','#66A64F','#009ADA'], // 37 basquiat
    ['#8C5E35','#594F32','#BFAF80','#427F8C'], // 38 dali
    ['#E17976','#DF5D23','#E2CE19','#89AD03'], // 39 gauguin
    ['#BC000D','#E7CFB7','#FFEC00','#3229AD'], // 40 lichtenstein
    ['#9F4740','#B985BA','#7EA860','#4885A4'], // 41 monet
    ['#E4502E','#E69252','#ECB931','#43789F'], // 42 munch
    ['#D95032','#D95D30','#D98014','#D99311'], // 43 rothko
    ['#C7AD24','#CBC776','#2C41A7','#6284C8'], // 44 gogh
    ['#FD814E','#F588AF','#FCBC54','#A4D984'], // 45 warhol
    ['#EC0002','#E60400','#FEE454','#004895'], // 46 mondrian
    ['#D91A1A','#F26716','#F28B0C','#A8B2E2'], // 47 canna
    ['#EED09E','#B2C244','#827F88','#B2CFD4'], // 48 magritte
    ['#c35b48','#e5c027','#458962','#125592'], // 49 truth
    ];

// dropped
// ['#028224', '#FCC902', '#E30303', '#2336D8'], // 33 first
// ['#867AE9', '#FFF5AB', '#7DF0FA', '#C449C2'], //1 design

// features = [];
let features = {};
filename = [];

// ----
density_param = Math.min(parseInt(mapParam(rawParams[0], 0, 15)), 14);
densities = [4, 5, 6, 7, 8, 9, 10, 13, 16, 20, 25, 30, 40, 50, 60];
density_names = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
num_grid = densities[density_param];


// features.push("Scale: " + density_names[density_param])
// features.push({Scale: density_names[density_param]})
features.Scale = density_names[density_param];
filename = filename + "Scale: " + density_names[density_param];
// ----


if (num_grid > 20) {
    climit = 21; // 0 to 2 in increments of 0.1; 2.1 is very unlikely to get sampled, because only 255 will get mapped to 21
} else {
    climit = 31; // 0 to 3 in increments of 0.1; 3.1 is very unlikely to get sampled, because only 255 will get mapped to 31
}
curvy = parseInt(mapParam(rawParams[1], 0, climit)) / 10;

if (curvy < 0.2) {
    curvy_name = 'Straight'
} else {
    if (curvy < 1) {
        curvy_name = 'Wavy'
    } else {
        if (curvy < 2) {
            curvy_name = 'Curly'
        } else {
            curvy_name = 'Coily'
        }
    }
}
// features.push({Texture: curvy_name})
features.Texture = curvy_name;
filename = filename + '-' + ("Texture: " + curvy_name);

// ----

var rth = parseInt(mapParam(rawParams[2], 0, 1001)) / 1000 // 1001 is very unlikely to get sampled. Only if param was 255. Even then, code will be fine if rth = 1.01
if (rth < 0.2) {
    balance_name = 'Left';
} else {
    if (rth < 0.4) {
        balance_name = 'Left-tilt';
    } else {
        if (rth < 0.6) {
            balance_name = 'Balanced';
        } else {
            if (rth < 0.8) {
                balance_name = 'Right-tilt';
            } else {
                balance_name = 'Right';
            }
        }
    }
}
// features.push("Balance: " + balance_name)
features.Balance = balance_name
filename = filename + '-' + ("Balance: " + balance_name);

// ---

if (num_grid > 20) {
    if (num_grid > 40) {
        var swlimit = 4; // 4 is very unlikely to get picked, only if param is 255
    } else {
        var swlimit = 5; // 5 is very unlikely to get picked, only if param is 255
    }
} else {
    var sw = swlimit = 8; // 8 is very unlikely to get picked, only if param is 255. In case it does, checking for it below and mapping back to 7
}
var sw = parseInt(mapParam(rawParams[3], 2, swlimit));
if (num_grid < 6) {
    var sw = 7;
};
sw = Math.min(sw, 7);
thickness_names = ['Fine', 'Thin', 'Solid', 'Thick', 'Chunky', 'Heavy']
// features.push("Strokes: " + thickness_names[sw - 2]);
features.Strokes = thickness_names[sw - 2];
filename = filename + '-' + ("Strokes: " + thickness_names[sw - 2]);;

// ---

if ((num_grid < 20) && (sw > 2)) {
    var ornamented = rawParams[9] < 127;
} else {
    var ornamented = 0;
}
if (ornamented) {
    sw = 2 * sw;
}
if (ornamented == 1) {
    // features.push("Style: Ornamented");
    features.Style = "Ornamented";
    filename = filename + '-' + ("Style: Ornamented");
} else {
    // features.push("Style: Neutral");
    features.Style = "Neutral";
    filename = filename + '-' + ("Style: Neutral");
}

//

var pid = parseInt(mapParam(rawParams[5], 0, palettes.length)) // palettes.length very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
if (pid == palettes.length) {
    pid = pid - 1;
}
palette_names = ['Pastel', 'Neon', 'Dream', 'Marshmallow', 'Meadow', 'Ethnic', 'Cake', 'Baby', 'Bright', 'Beach', 'Gradient', 'Cotton Candy', 'Journal', 'Authentic', 'Cartoon', 'Statement', 'Business', 'Salient', 'Primary', 'Home', 'Icing', 'Birthday', 'Grown Up', 'Core', 'Scheme', 'Activity', 'Pop', 'Wood', 'Mighty', 'Iconic', 'Potential', 'Gold', 'Insomnia', 'Safe', 'Surprise', 'Love', 'Deep', 'Basquiat', 'Dali', 'Gauguin', 'Lichtenstein', 'Monet', 'Munch', 'Rothko', 'Gogh', 'Warhol', 'Mondrian', 'Canna', 'Magritte','Truth'];
// features.push("Palette: " + palette_names[pid]);
features.Palette = palette_names[pid];
filename = filename + '-' + ("Palette: " + palette_names[pid]);

// ---

// Don't want 50% to be full. Because more interesting when there are voids. So 
// Putting this here because num_colors needs access to it. But don't want to push it to features yet because want features to be in a specific order.
var dl = rawParams[4] > 63; //127;

// ----


// If there will be a void, okay to use just 1 color. Otherwise should have at least 2 colors.

if (dl == 0) {
    var nclimit = 2; // palettes[pid].length+1 is very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
} else {
    var nclimit = 1; // palettes[pid].length+1 is very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
}

var num_colors = parseInt(mapParam(rawParams[6], nclimit, palettes[pid].length + 1))

num_colors = Math.min(num_colors, palettes[pid].length)

// numColors_names = ['i', 'ii', 'iii', 'iiii'];
numColors_names = ['Mono', 'Di', 'Tri', 'Tetra'];
// numColors_names = [1,2,3,4];
// features.push("Colorful: " + numColors_names[num_colors - 1]);
features.Colorful = numColors_names[num_colors - 1];
filename = filename + '-' + ("Colorful: " + numColors_names[num_colors - 1]);

//

// param 10 was being used for matte vs. glossy feature below (paint). Dropped that feature. So using param 10 here for picking which colors will use
var pick_colors = [];
if (num_colors == 1) {
    var subset_colors = Math.min(parseInt(mapParam(rawParams[10], 1, 5)), 4) // 5 is unlikely. If happens, make it 4. There are 4 ways to pick 1 color from 4.
    if (subset_colors == 1) {
        pick_colors = [1];
        // features.push("Colors: "  + 'Reddest');
        features.Colors = 'Reddest';
        filename = filename + '-' + ("Colors: "  + 'Reddest');
    }
    if (subset_colors == 2) {
        pick_colors = [2];
        // features.push("Colors: "  + '2ndReddest');
        features.Colors = '2ndReddest';
        filename = filename + '-' + ("Colors: "  + '2ndReddest');
    }
    if (subset_colors == 3) {
        pick_colors = [3];
        // features.push("Colors: "  + '2ndCyanest');
        features.Colors = '2ndCyanest';
        filename = filename + '-' + ("Colors: "  + '2ndCyanest');
    }
    if (subset_colors == 4) {
        pick_colors = [4];
        // features.push("Colors: "  + 'Cyanest');
        features.Colors = 'Cyanest';
        filename = filename + '-' + ("Colors: "  + 'Cyanest');
    }
}
if (num_colors == 2) {
    var subset_colors = Math.min(parseInt(mapParam(rawParams[10], 1, 7)), 6) // 7 is unlikely. If happens, make it 6. There are 6 ways to pick 2 colors from 4.
    if (subset_colors == 1) {
        pick_colors = [1, 2];
        // features.push("Colors: "  + 'Reddest+2ndReddest');
        features.Colors = 'Reddest+2ndReddest';
        filename = filename + '-' + ("Colors: "  + 'Reddest+2ndReddest');
    }
    if (subset_colors == 2) {
        pick_colors = [1, 3];
        // features.push("Colors: "  + 'Reddest+2ndCyanest');
        features.Colors = 'Reddest+2ndCyanest';
        filename = filename + '-' + ("Colors: "  + 'Reddest+2ndCyanest');
    }
    if (subset_colors == 3) {
        pick_colors = [1, 4];
        // features.push("Colors: "  + 'Reddest+Cyanest');
        features.Colors = 'Reddest+Cyanest';
        filename = filename + '-' + ("Colors: "  + 'Reddest+Cyanest');
    }
    if (subset_colors == 4) {
        pick_colors = [2, 3];
        // features.push("Colors: "  + '2ndReddest+2ndCyanest');
        features.Colors = '2ndReddest+2ndCyanest';
        filename = filename + '-' + ("Colors: "  + '2ndReddest+2ndCyanest');
    }
    if (subset_colors == 5) {
        pick_colors = [2, 4];
        // features.push("Colors: "  + '2ndReddest+Cyanest');
        features.Colors = '2ndReddest+Cyanest';
        filename = filename + '-' + ("Colors: "  + '2ndReddest+Cyanest');
    }
    if (subset_colors == 6) {
        pick_colors = [3, 4];
        // features.push("Colors: "  + '2ndCyanest+Cyanest');
        features.Colors = '2ndCyanest+Cyanest';
        filename = filename + '-' + ("Colors: "  + '2ndCyanest+Cyanest');
    }
}
if (num_colors == 3) {
    var subset_colors = Math.min(parseInt(mapParam(rawParams[10], 1, 5)), 4) // 5 is unlikely. If happens, make it 4. There are 4 ways to pick 3 colors from 4.
    if (subset_colors == 1) {
        pick_colors = [1, 2, 3];
        // features.push("Colors: "  + 'Reddest+2ndReddest+2ndCyanest');
        features.Colors = 'Reddest+2ndReddest+2ndCyanest';
        filename = filename + '-' + ("Colors: "  + 'Reddest+2ndReddest+2ndCyanest');
    }
    if (subset_colors == 2) {
        pick_colors = [1, 2, 4];
        // features.push("Colors: "  + 'Reddest+2ndReddest+Cyanest');
        features.Colors = 'Reddest+2ndReddest+Cyanest';
        filename = filename + '-' + ("Colors: "  + 'Reddest+2ndReddest+Cyanest');
    }
    if (subset_colors == 3) {
        pick_colors = [1, 3, 4];
        // features.push("Colors: "  + 'Reddest+2ndCyanest+Cyanest');
        features.Colors = 'Reddest+2ndCyanest+Cyanest';
        filename = filename + '-' + ("Colors: "  + 'Reddest+2ndCyanest+Cyanest');
    }
    if (subset_colors == 4) {
        pick_colors = [2, 3, 4];
        // features.push("Colors: "  + '2ndReddest+2ndCyanest+Cyanest');
        features.Colors = '2ndReddest+2ndCyanest+Cyanest';
        filename = filename + '-' + ("Colors: "  + '2ndReddest+2ndCyanest+Cyanest');
    }
}
if (num_colors == 4) {
    pick_colors = [1, 2, 3, 4];
    // features.push("Colors: "  + 'All');
    features.Colors = 'All';
    filename = filename + '-' + ("Colors: "  + 'All');
}

// ---

var dark_mode = rawParams[7] < 127;
if (dark_mode == 1) {
    // features.push("Contrast: " + 'Dark');
    features.Contrast = 'Dark';
    filename = filename + '-' + ("Contrast: " + 'Dark');
} else {
    // features.push("Contrast: " + 'Black');
    features.Contrast = 'Black';
    filename = filename + '-' + ("Contrast: " + 'Black');
}

// ---

if (dl == 1) {
    // features.push("Composition: " + 'Organic');
    features.Composition = 'Organic';
    filename = filename + '-' + ("Composition: " + 'Organic');
} else {
    // features.push("Composition: " + 'Full');
    features.Composition = 'Full';
    filename = filename + '-' + ("Composition: " + 'Full');
}

// ---

pattern_names = ['Flat', 'Polka', 'Venn', 'Curtains', 'Bracelets', 'Plaid', 'Sparkles', 'Squares', 'Twirls', 'Flowers', 'Streams', 'Ribbons', 'Puzzle', 'Hills'];
var pattern = Math.min(parseInt(mapParam(rawParams[8], 0, pattern_names.length)), pattern_names.length - 1) // pattern_names.length is very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
if (num_grid > 20) {
    if (pattern == 1) {
        pattern = 0;
    }
    if (pattern == 2) {
        pattern = 5;
    }
    if (pattern == 3) {
        pattern = 6;
    }
    if (pattern == 4) {
        pattern = 7;
    }
    if (pattern == 9) {
        pattern = 8;
    }
}

if (dl == 0) {
    // features.push("Accent: " + 'None');
    features.Accent = 'None';
    filename = filename + '-' + ("Accent: " + 'None');
} else {
    // features.push("Accent: " + pattern_names[pattern]);
    features.Accent = pattern_names[pattern];
    filename = filename + '-' + ("Accent: " + pattern_names[pattern]);
}

// ---

VoidSizes = [0.1, 0.2, 0.3];
VoidSize_names = ['V', 'V+', 'V++'];
var vs_param = Math.min(parseInt(mapParam(rawParams[11], 0, VoidSizes.length)), VoidSizes.length - 1) // VoidSizes.length is very unlikely to get sampled. If it does happen, map it back.
VoidSize = VoidSizes[vs_param];

if (dl == 0) {
    // features.push("Voidness: " + "V-");
    features.Voidness = "V-";
    filename = filename + '-' + ("Voidness: " + "V-");
} else {
    // features.push("Voidness: " + VoidSize_names[vs_param]);
    features.Voidness = VoidSize_names[vs_param];
    filename = filename + '-' + ("Voidness: " + VoidSize_names[vs_param]);
}

// --

if ((num_grid < 13) && (ornamented == 1) && (dl == 1)) {
    cut_void = 1;
    // features.push("CutAcross: " + "Yes");
    features.CutAcross = "Yes";
    filename = filename + '-' + ("CutAcross: " + "Yes");
} else {
    cut_void = 0;
    // features.push("CutAcross: " + "No");
    features.CutAcross = "No";
    filename = filename + '-' + ("CutAcross: " + "No");
}


filename = filename + '-' + tokenData.hash;

// Only randomness left is choice of colors (for each region, and dots when applicable), and which individual strokes go left vs. right. Rest is all captured in features.

console.log(features)


// -- * -- 

let palette_to_use = [];
for (var j = 0; j < pick_colors.length; j++) {
    dummy = hexToRgb(palettes[pid][pick_colors[j] - 1]) // pick_colors stored indices counting from 1.
    palette_to_use[j] = [dummy.r, dummy.g, dummy.b]
}

pieceSize = 2400;

// let s = Math.max(minCanvasSize,Math.min(window.innerWidth, window.innerHeight));
s = Math.min(window.innerWidth, window.innerHeight);
// s = 1500;
// s = 980;

// Hack because for some rare canvas sizes, setting pixelDentiy to 2400/s results in an image that is 2399. Found that this happens when 2400/s*s is 23.99999...5 (not 2400 exactly). So adjusting s a bit. Empirically found that till 100k, don't need to reduce s by more than 5 to find one that matches 2400 fine. 
let not_done_yet = 1;
if (!(pieceSize / s * s == pieceSize)) {
    for (var t = 0; t < 5; t++) {
        if (not_done_yet) {
            s = s - 1;
            if (!(pieceSize / s * s == pieceSize)) {
                not_done_yet = 1;
            } else {
                not_done_yet = 0;
            }
        }
    }
}

let D = 800;
sw = sw * s / D; // get thickness to scale by canvas size

function setup() {
    createCanvas(s, s)
    noLoop();
}

function draw() {

    cid = rnd.random_int(0, num_colors - 1);

    white = [236, 240, 241];
    if (dark_mode == 0) {
        black = [26, 27, 29];
    } else {
        var black = [];
        var alpha = 0.80;
        for (var j = 0; j < 3; j++) {
            black[j] = (1 - alpha) * palette_to_use[cid][j] + alpha * 0.
        }
    }

    if (s < 2401) {
        pixelDensity(pieceSize / s)
    } else(pixelDensity(1))
    // pixelDensity(pieceSize / s)    

    th = s / num_grid;
    nu = curvy * th / 3;

    st = 0;
    en = s;

    noFill();

    strokeWeight(s / 400) // scaling stroke width by canvas size. without this the number of pixels used up by these strokes changes for different canvas sizes, and so sizes of other clusters was changing too.
    stroke(black);

    let vxs = [],
        vys = [],
        cpxs = [],
        cpys = [],
        p2xs = [],
        p2ys = [],
        went_bottom_right = [];

    x = st, y = st;
    for (var xi = 0; xi < num_grid; xi++) {
        y = st;

        for (var yi = 0; yi < num_grid; yi++) {

            if (rnd.random_dec() > rth) {
                p1 = [x, y];
                p2 = [x + th, y + th];
                if (rnd.random_dec() > 0.5) {
                    cp = [(p1[0] + p2[0] - nu) / 2, (p1[1] + p2[1] + nu) / 2];
                } else {
                    cp = [(p1[0] + p2[0] + nu) / 2, (p1[1] + p2[1] - nu) / 2];
                }
                went_bottom_right.push(1);
            } else {
                p1 = [x, y + th];
                p2 = [x + th, y];
                if (rnd.random_dec() > 0.5) {
                    cp = [(p1[0] + p2[0] - nu) / 2, (p1[1] + p2[1] - nu) / 2];
                } else {
                    cp = [(p1[0] + p2[0] + nu) / 2, (p1[1] + p2[1] + nu) / 2];
                }
                went_bottom_right.push(0)
            }
            beginShape();
            vertex(p1[0], p1[1]);
            quadraticVertex(cp[0], cp[1], p2[0], p2[1]);
            endShape();

            vxs.push(p1[0]), vys.push(p1[1]), cpxs.push(cp[0]), cpys.push(cp[1]), p2xs.push(p2[0]), p2ys.push(p2[1]);

            y = y + th;
        }
        x = x + th;
    }

    T = 10;
    colors_template = [];
    for (var r = 0; r <= T; r++) {
        colors_template[r] = [];
        for (var c = 0; c <= T; c++) {
            cid = rnd.random_int(0, num_colors - 1);
            colors_template[r][c] = palette_to_use[cid];
        }
    }

    loadPixels();

    let d = pixelDensity();

    let fullImage = 4 * (width * d) * (height / 1 * d);
    let n = 0;
    let pic = [];
    for (let i = 0; i < fullImage; i += 4) {
        pic[n] = pixels[i + 3];
        // if (((pixels[i + 3] > 128))) {
        //     pic[n] = 255;
        // } else {
        //     pic[n] = 0;
        // };
        n = n + 1;
    };

    // cclabels1d = BlobExtraction(pic, (s * d), (s * d));
    cclabels1d = BlobExtraction(pic, Math.round(s * d), Math.round(s * d)); // adding Math.round does strange things
    // Based on constants set in BlobExtraction, label of -1 means it is the marked area, and of 0 means the pixels were unset

    let csize = [],
        rpos = [],
        cpos = [],
        cclabels2d = [],
        M = 0;
    // // Store the center of each cluster. So loop through grid, and every time the point on the grid is in a certain cluster, store that location in rpos and cpos for that cluster (in an averaged form)

    var i = 0;
    for (var r = 0; r < s * d; r++) {
        cclabels2d[r] = [];
        for (var c = 0; c < s * d; c++) {
            M = Math.max(M, cclabels1d[i]);
            if (cclabels1d[i] > -1) {
                if (isNaN(csize[cclabels1d[i]])) {
                    csize[cclabels1d[i]] = 1;
                    rpos[cclabels1d[i]] = 0;
                    cpos[cclabels1d[i]] = 0;
                } else {
                    csize[cclabels1d[i]]++; // = csize[cclabels1d[i]] + 1;
                    rpos[cclabels1d[i]] = rpos[cclabels1d[i]] + r / d;
                    cpos[cclabels1d[i]] = cpos[cclabels1d[i]] + c / d;
                    cclabels2d[r][c] = cclabels1d[i];
                }
            };
            if (cclabels1d[i] < 0) {
                cclabels2d[r][c] = cclabels2d[r][c - 1];
            }
            i++;
        }
    }

    for (var i = 0; i < cpos.length; i++) {
        cpos[i] = cpos[i] / (csize[i]);
        rpos[i] = rpos[i] / (csize[i]);
    }

    if (dl == 1) {
        let sorted_csize = sort(csize, csize.length);

        let totalCaptured = 0;
        let dont_add_more = 0;
        LindList = [];
        for (let j = 0; j < sorted_csize.length; j++) {
            if (dont_add_more == 0) {
                let check = sorted_csize[csize.length - j - 1];
                ind = csize.indexOf(check);
                if (ind!=0) {
                    if (totalCaptured == 0) {
                        totalCaptured = totalCaptured + csize[ind];
                        LindList.push(ind);
                    } else {
                        if ((totalCaptured + csize[ind]) / (s * d * s * d) < VoidSize) {
                            totalCaptured = totalCaptured + csize[ind];
                            LindList.push(ind);
                        } else {
                            dont_add_more = 1;
                        }
                    }
                }
            }
        }

    } else {
        LindList = []
    }


    colorsToUse = [];
    cluster_loc_id = [];
    for (let c = 0; c <= M; c += 1) {
        cuse = Math.round(cpos[c] / (s) * T);
        ruse = Math.round(rpos[c] / (s) * T)
        colorsToUse[c] = colors_template[cuse][ruse];
        cluster_loc_id[c] = parseInt(cuse.toString() + ruse.toString())
        if (LindList.includes(c)) {
            if (dl == 1) {
                colorsToUse[c] = black;
            };
        };
    }
    if (num_grid < 16) { // if grid is large enough, all colors will get sampled anyway. So forcefully insert colors only when grid is smaller. For smaller grids, locations of clusters are more stable, so doing this only for small grids is better from that perspective too.
        // sort these locations. This should be consistent across different pixel densities, etc.
        var sorted_cluster_loc_id = cluster_loc_id.slice().sort(function(a, b) {
            return b - a
        })
        var ranked_cluster_loc_id = cluster_loc_id.map(function(v) {
            return sorted_cluster_loc_id.indexOf(v) + 1
        });

        var arr = [];
        while (arr.length < num_colors) {
            var r = Math.floor(rnd.random_dec() * (colorsToUse.length - 2)) + 1;
            //if((arr.indexOf(r) === -1)&&(!LindList.includes(r))) arr.push(r); // don't want to override the black, because that is not going to be colored in with this color anyway. Or in case of no accent, it might really get colored in and then void is gone.
            if ((arr.indexOf(ranked_cluster_loc_id[r]) === -1) && (!LindList.includes(r))) arr.push(ranked_cluster_loc_id[r]); // store the ranked cluster_loc_id. So can then find clusters based on that
        }
        for (var i = 0; i < num_colors; i++) {
            ind = ranked_cluster_loc_id.indexOf(arr[i]);
            colorsToUse[ind] = palette_to_use[i];
        }
    }

    background(black)
    if ((pattern !== 6) & (pattern > 0)) {
        if ([1].includes(pattern)) { // polka, overlapping circles
            strokeWeight(s / 980 * 15)
        }
        if ([2].includes(pattern)) { // polka, overlapping circles
            strokeWeight(s / 9800 * 15)
        }
        if ([3, 4, 10].includes(pattern)) { // vertical chains (curtains), horizontal chains (bracelets), streams
            strokeWeight(s / 980 * 2)
        }
        if ([5, 7, 8, 9, 12, 13].includes(pattern)) { // plaid, squares, twirls, flowers, wacross, hills
            strokeWeight(s / 980 * 1)
        }
        if ([10, 11].includes(pattern)) { // streams, ribbons
            strokeWeight(s / 980 * 2)
        }
        if ([5].includes(pattern)) { // plaid
            NN = 15;
        }
        if ([8, 10, 11, 12, 13].includes(pattern)) { // twirls, streams, ribbons, wacross, hills
            NN = 12;
        }
        // 6 is sparkles, dealt with below
        if ([7].includes(pattern)) { // squares
            NN = 7;
        }
        if ([9].includes(pattern)) { // squares
            NN = 8;
        }
        if ([5, 7, 8, 9, 10, 11, 12, 13].includes(pattern)) {
            ll = s / 980 * NN;
        } // define a variable to be used later
        var i = 0;
        for (var ii = 0; ii < 41; ii++) {
            var j = 0;
            for (var jj = 0; jj < 41; jj++) {
                cid = rnd.random_int(0, num_colors - 1);
                random_color = palette_to_use[cid];
                stroke(random_color)
                if (pattern == 1) { // polka
                    point(i, j);
                }
                if (pattern == 2) { // overlapping circles
                    ellipse(i, j, 50 * s / 980, 50 * s / 980);
                }
                if (pattern == 3) { // vertical chains (curtains)
                    ellipse(i, j, 10 * s / 980, 20 * s / 980);
                }
                if (pattern == 4) { // horizontal chains (bracelets)
                    ellipse(i, j, 20 * s / 980, 10 * s / 980);
                }
                if (pattern == 5) { // plaid
                    line(i - ll, j - ll, i + ll, j + ll);
                    line(i - ll, j + ll, i + ll, j - ll);
                }
                // 6 is sparkles, dealt with below
                if (pattern == 7) { // squares
                    line(i - ll, j - ll, i + ll, j - ll);
                    line(i + ll, j - ll, i + ll, j + ll);
                    line(i + ll, j + ll, i - ll, j + ll);
                    line(i - ll, j + ll, i - ll, j - ll);
                }
                if (pattern == 9) { // flowers

                    icp1 = [];
                    icp2 = [];
                    vs = [];
                    vs[0] = [i + ll, j]
                    icp1[0] = [(i + vs[0][0]) / 2, (j + vs[0][1]) / 2 + (ll) / 2];
                    icp2[0] = [(i + vs[0][0]) / 2, (j + vs[0][1]) / 2 - (ll) / 2];

                    vs[1] = [i - ll, j]
                    icp1[1] = [(i + vs[1][0]) / 2, (j + vs[1][1]) / 2 - (ll) / 2];
                    icp2[1] = [(i + vs[1][0]) / 2, (j + vs[1][1]) / 2 + (ll) / 2];

                    vs[2] = [i + (ll) / 1.4, j + (ll) / 1.4]
                    icp1[2] = [(i + vs[2][0]) / 2 - (ll) / 4, (j + vs[2][1]) / 2 + (ll) / 4];
                    icp2[2] = [(i + vs[2][0]) / 2 + (ll) / 4, (j + vs[2][1]) / 2 - (ll) / 4];

                    vs[3] = [i - (ll) / 1.4, j + (ll) / 1.4]
                    icp1[3] = [(i + vs[3][0]) / 2 - (ll) / 4, (j + vs[3][1]) / 2 - (ll) / 4];
                    icp2[3] = [(i + vs[3][0]) / 2 + (ll) / 4, (j + vs[3][1]) / 2 + (ll) / 4];

                    vs[4] = [i + (ll) / 1.4, j - (ll) / 1.4]
                    icp1[4] = [(i + vs[4][0]) / 2 + (ll) / 4, (j + vs[4][1]) / 2 + (ll) / 4];
                    icp2[4] = [(i + vs[4][0]) / 2 - (ll) / 4, (j + vs[4][1]) / 2 - (ll) / 4];

                    vs[5] = [i - (ll) / 1.4, j - (ll) / 1.4]
                    icp1[5] = [(i + vs[5][0]) / 2 + (ll) / 4, (j + vs[5][1]) / 2 - (ll) / 4];
                    icp2[5] = [(i + vs[5][0]) / 2 - (ll) / 4, (j + vs[5][1]) / 2 + (ll) / 4];

                    vs[6] = [i, j + ll]
                    icp1[6] = [(i + vs[6][0]) / 2 - (ll) / 2, (j + vs[6][1]) / 2];
                    icp2[6] = [(i + vs[6][0]) / 2 + (ll) / 2, (j + vs[6][1]) / 2];

                    vs[7] = [i, j - ll]
                    icp1[7] = [(i + vs[7][0]) / 2 + (ll) / 2, (j + vs[7][1]) / 2];
                    icp2[7] = [(i + vs[7][0]) / 2 - (ll) / 2, (j + vs[7][1]) / 2];

                }

                if (pattern == 9) { // flowers
                    for (var k = 0; k < vs.length; k++) {
                        fill(random_color)
                        beginShape();
                        vertex(i, j)
                        quadraticVertex(icp1[k][0], icp1[k][1], vs[k][0], vs[k][1]);
                        vertex(i, j)
                        quadraticVertex(icp2[k][0], icp2[k][1], vs[k][0], vs[k][1]);
                        endShape();
                        noFill()

                    }
                }

                if ([8, 9, 10, 11, 12, 13].includes(pattern)) { // twirls, streams, ribbons, wacross, hills. Define variables for all, then draw depending on pattern
                    icp = [];
                    vs = [];
                    vs[0] = [i + ll, j]
                    icp[0] = [(i + vs[0][0]) / 2, (j + vs[0][1]) / 2 + ll];

                    vs[1] = [i - ll, j]
                    icp[1] = [(i + vs[1][0]) / 2, (j + vs[1][1]) / 2 - ll];

                    vs[2] = [i + ll, j + ll]
                    icp[2] = [(i + vs[2][0]) / 2 - (ll) / 2, (j + vs[2][1]) / 2 + (ll) / 2];

                    vs[3] = [i - ll, j + ll]
                    icp[3] = [(i + vs[3][0]) / 2 - (ll) / 2, (j + vs[3][1]) / 2 - (ll) / 2];

                    vs[4] = [i + ll, j - ll]
                    icp[4] = [(i + vs[4][0]) / 2 + (ll) / 2, (j + vs[4][1]) / 2 + (ll) / 2];

                    vs[5] = [i - ll, j - ll]
                    icp[5] = [(i + vs[5][0]) / 2 + (ll) / 2, (j + vs[5][1]) / 2 - (ll) / 2];

                    vs[6] = [i, j + ll]
                    icp[6] = [(i + vs[6][0]) / 2 - (ll), (j + vs[6][1]) / 2];

                    vs[7] = [i, j - ll]
                    icp[7] = [(i + vs[7][0]) / 2 + (ll), (j + vs[7][1]) / 2];
                }

                if (pattern == 8) { // twirls
                    for (var k = 0; k < vs.length; k++) {
                        beginShape();
                        vertex(i, j)
                        quadraticVertex(icp[k][0], icp[k][1], vs[k][0], vs[k][1]);
                        endShape();

                    }
                }

                if (pattern == 10) { // streams (waves across)
                    for (var k = 0; k < 2; k++) {
                        beginShape();
                        vertex(i, j)
                        quadraticVertex(icp[k][0], icp[k][1], vs[k][0], vs[k][1]);
                        endShape();
                        // line(i, j, vs[k][0], vs[k][1]);

                    }
                }

                if (pattern == 11) { // ribbons (waves down)

                    for (var k = 6; k < 8; k++) {
                        beginShape();
                        vertex(i, j)
                        quadraticVertex(icp[k][0], icp[k][1], vs[k][0], vs[k][1]);
                        endShape();

                    }
                }

                if (pattern == 12) { // wacross
                    for (var k = 0; k < vs.length; k++) {
                        if ([0, 1, 6, 7].includes(k)) {
                            beginShape();
                            vertex(i, j)
                            quadraticVertex(icp[k][0], icp[k][1], vs[k][0], vs[k][1]);
                            endShape();
                        }

                    }
                }

                if (pattern == 13) { // hills

                    for (var k = 2; k < 6; k++) {
                        beginShape();
                        vertex(i, j)
                        quadraticVertex(icp[k][0], icp[k][1], vs[k][0], vs[k][1]);
                        endShape();
                    }
                }

                j = j + s / 40;
            }
            i = i + s / 40;
        }
    }
    if (pattern == 6) { // sparkles
        strokeWeight(s / 980 * 15)
        KK = 400;
        var i = 0;
        for (var ii = 0; ii < (KK + 1); ii++) {
            var j = 0;
            for (var jj = 0; jj < (KK + 1); jj++) {
                cid = rnd.random_int(0, num_colors - 1);
                random_color = palette_to_use[cid];

                if (rnd.random_dec() > 0.9) {
                    strokeWeight(s / 980 * 3)
                    stroke(random_color)
                    point(i, j);
                }
                j = j + s / KK;
            }
            i = i + s / KK;
        }
    }

    loadPixels()

    for (let i = 0; i < fullImage; i += 4) {
        ind = cclabels1d[Math.floor(i / 4)];
        // if ((ind > 0)&&(((ind!=Lind)&&(ind!==Lind1))||(dl==0))) {
        if ((ind > 0) && ((!LindList.includes(ind)) || (dl == 0))) {
            pixels[i] = colorsToUse[ind][0];
            pixels[i + 1] = colorsToUse[ind][1];
            pixels[i + 2] = colorsToUse[ind][2];
            pixels[i + 3] = 255;
        }

    }

    updatePixels();

    let draw_stroke = [];
    for (var i = 0; i < vxs.length; i++) {
        if (cut_void) {
            draw_stroke[i] = 1
        } else {

            t = 0.5;
            p0x = vxs[i];
            p0y = vys[i];

            p1x = cpxs[i];
            p1y = cpys[i];

            p2x = p2xs[i];
            p2y = p2ys[i];


            x = (((1 - t) * (1 - t) * p0x) + (2 * (1 - t) * t * p1x) + (t * t * p2x));
            y = (((1 - t) * (1 - t) * p0y) + (2 * (1 - t) * t * p1y) + (t * t * p2y));

            CH = 3 * s / D;
            let check_xs = [];
            let check_ys = [];
            if (went_bottom_right[i] == 0) {
                check_xs[0] = x + CH;
                check_ys[0] = y + CH;
                check_xs[1] = x - CH;
                check_ys[1] = y - CH;
            } else {
                check_xs[0] = x + CH;
                check_ys[0] = y - CH;
                check_xs[1] = x - CH;
                check_ys[1] = y + CH;
            }


            let in_void = 0;

            for (var j = 0; j < check_xs.length; j++) {
                //if ((cclabels2d[Math.floor(check_ys[j]*d)][Math.floor(check_xs[j]*d)] == Lind)||((cclabels2d[Math.floor(check_ys[j]*d)][Math.floor(check_xs[j]*d)] == Lind1))) {
                if (LindList.includes(cclabels2d[Math.floor(check_ys[j] * d)][Math.floor(check_xs[j] * d)])) {
                    in_void = in_void + 1;
                }
            }

            if ((dl == 0) || (in_void < 2)) {
                draw_stroke[i] = 1;
            } else {
                draw_stroke[i] = 0;
            }
        }
    }



    if (ornamented == 1) {
        sws = [1.1 * sw + 4 * s / D, 0.3 * sw];
        colors = [black, white];
    } else {
        sws = [1.1 * sw];
        colors = [black];
    }

    for (var j = 0; j < sws.length; j++) {

        for (var i = 0; i < vxs.length; i++) {
            if (draw_stroke[i] == 1) {
                strokeWeight(sws[j])
                stroke(colors[j])
                beginShape();
                vertex(vxs[i], vys[i]);
                quadraticVertex(cpxs[i], cpys[i], p2xs[i], p2ys[i]);
                endShape();
            }
        }
    }


    strokeWeight(s / D)
    stroke(black)
    rect(0, 0, s, s);

    // saveCanvas(filename, 'png')
}

// parse parameters
function setupParametersFromTokenData(token) {
    let hashPairs = []
    //parse hash
    for (let j = 0; j < 32; j++) {
        hashPairs.push(token.hash.slice(2 + (j * 2), 4 + (j * 2)))
    }
    // map to 0-255
    return hashPairs.map(x => {
        return parseInt(x, 16)
    })
}

function generateSeedFromTokenData(token) {
    return parseInt(token.hash.slice(0, 16), 16)
}


function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function mapd(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

function mapParam(n, start, stop) {
    return mapd(n, 0, 255, start, stop)
}



function BlobExtraction(data, w, h) {
    var max = w * h;

    //These are constants
    var BACKGROUND = 255;
    var FOREGROUND = 0;
    var UNSET = 0;
    var MARKED = -1;

    var pos = [1, w + 1, w, w - 1, -1, -w - 1, -w, -w + 1]; // Clockwise

    var label = []; // Same size as data
    var c = 1; // Component index

    // We change the border to be white. We could add a pixel around
    // but we are lazy and want to do this in place.
    // Set the outer rows/cols to min
    data.memset(0, w, BACKGROUND); // Top
    data.memset(w * (h - 1), w, BACKGROUND); // Bottom

    for (var y = 1; y < h - 1; y++) {
        var offset = y * w;
        data[offset] = BACKGROUND; // Left
        data[offset + w - 1] = BACKGROUND; // Right
    }

    // Set labels to zeros
    label.memset(0, max, UNSET);

    var tracer = function(S, p) {

        for (var d = 0; d < 8; d++) {
            var q = (p + d) % 8;

            var T = S + pos[q];

            // Make sure we are inside image
            if (T < 0 || T >= max)
                continue;

            if (data[T] != BACKGROUND)
                return {
                    T: T,
                    q: q
                };

            assert(label[T] <= UNSET);
            label[T] = MARKED;
        }

        // No move
        return {
            T: S,
            q: -1
        };
    };

    /**
     * 
     * @param S Offset of starting point
     * @param C label count
     * @param external Boolean Is this internal or external tracing
     */
    var contourTracing = function(S, C, external) {
        var p = external ? 7 : 3;

        // Find out our default next pos (from S)
        var tmp = tracer(S, p);
        var T2 = tmp.T;
        var q = tmp.q;

        label[S] = C;

        // Single pixel check
        if (T2 == S)
            return;

        var counter = 0;

        var Tnext = T2;
        var T = T2;

        while (T != S || Tnext != T2) {
            assert(counter++ < max, "Looped too many times!");

            label[Tnext] = C;

            T = Tnext;
            p = (q + 5) % 8;

            tmp = tracer(T, p);
            Tnext = tmp.T;
            q = tmp.q;
        }
    };

    var extract = function() {

        var y = 1; // We start at 1 to avoid looking above the image
        do {
            var x = 0;
            do {
                var offset = y * w + x;

                // We skip white pixels or previous labeled pixels
                if (data[offset] == BACKGROUND)
                    continue;

                var traced = false;

                // Step 1 - P not labelled, and above pixel is white
                if (data[offset - w] == BACKGROUND && label[offset] == UNSET) {

                    // P must be external contour
                    contourTracing(offset, c, true);
                    c++;

                    traced = true;
                }

                // Step 2 - Below pixel is white, and unmarked
                if (data[offset + w] == BACKGROUND && label[offset + w] == UNSET) {

                    // Use previous pixel label, unless this is already labelled
                    var n = label[offset - 1];
                    if (label[offset] != UNSET)
                        n = label[offset];

                    assert(n > UNSET, "Step 2: N must be set, (" + x + "," + y + ") " + n + " " + data[offset - 1]);

                    // P must be a internal contour
                    contourTracing(offset, n, false);

                    traced = true;
                }

                // Step 3 - Not dealt with in previous two steps
                if (label[offset] == UNSET) {
                    var n = label[offset - 1];

                    assert(!traced, "Step 3: We have traced, but not set the label");
                    assert(n > UNSET, "Step 3: N must be set, (" + x + "," + y + ") " + n);

                    // Assign P the value of N
                    label[offset] = n;
                }

            } while (x++ < w);
        } while (y++ < (h - 1)); // We end one before the end to to avoid looking below the image

        return label;
    };

    return extract();
}

Array.prototype.memset = function(offset, length, value) {
    for (var i = 0; i < length; i++) {
        this[offset++] = value;
    }
};

function assert(exp, message) {
    if (!exp) {
        throw new AssertException(message);
    }
}

function AssertException(message) {
    this.message = message;
}
AssertException.prototype.toString = function() {
    return 'AssertException: ' + this.message;
};

// -- * --

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}