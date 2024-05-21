// Code from 
// https://github.com/k0ch/ArtblocksRandom/blob/main/random.js
// https://gist.github.com/dmitric/0de47d734bd1747158fd3b11f482e884
// Stackoverflow (hex2rgb function)

function random_hash() {
    let x = "0123456789abcdef",
        hash = '0x'
    for (let i = 64; i > 0; --i) {
        hash += x[Math.floor(Math.random() * x.length)]
    }
    return hash
}

tokenData = {
    "hash": random_hash(),
    "tokenId": "123000456"
}

// Code that processes the hash is from Dmitri Cherniak's script

// // Artblocks injects the tokenData variable into your sketch like so
// let tokenData = {"hash":"0x31f2d12d85e8aeea04e79dc9ed6d3fd2377de7d17fe4233e8c34aab4b48f0f63","tokenId":"18000000"}

// // another example if you want to uncomment it to try it out
// // tokenData = {"hash":"0xf79f00793c585e9272d46d0437f04580a5fe9b8ebd834b6ce101f18e05d7cb16","tokenId":"18000258"}
console.log(tokenData.hash)

// Gets you an array of 32 parameters from the hash ranging from 0-255
let rawParams = setupParametersFromTokenData(tokenData)

// your random seed
let seed = generateSeedFromTokenData(tokenData)

// the ID of the token
let tokenId = parseInt(tokenData.tokenId.substring(2))

// From https://github.com/k0ch/ArtblocksRandom/blob/main/random.js


const RANDOM_DEC_PRECISION = 1000;

class RandomAB {

    constructor(seed)
    {
        // Seed must be a nonzero integer
        this.seed = seed;
    }

    random_decimal()
    {
        // Returns a value between [0, 1)
        this.seed ^= this.seed << 13;
        this.seed ^= this.seed >> 17;
        this.seed ^= this.seed << 5;
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % RANDOM_DEC_PRECISION) / RANDOM_DEC_PRECISION;
    }

    random_between(a, b)
    {
        // Returns a value between [a, b)
        return a + (b - a) * this.random_decimal();
    }

    random_int(a, b)
    {
        // Returns an integer between [a, b]
        return Math.floor(this.random_between(a, b+1));
    }

    random_choice(x)
    {
        // Returns an element from list (x must be a list)
        return x[Math.floor(this.random_between(0, x.length * 0.99))];
    }
}

rnd = new RandomAB(seed)

//  -- * --

let palettes = [
    ['#D1FFCF', '#FFD4B5', '#AA9CFF', '#32BFD1'], //0 pastel
    ['#867AE9', '#FFF5AB', '#7DF0FA', '#C449C2'], //1 design
    ['#0CECDD', '#FFF338', '#FF67E7', '#9A5AFF'], //2 neon
    ['#B5EAEA', '#EDF6E5', '#FFBCBC', '#F38BA0'], //3 dreams https://colorhunt.co/palette/b5eaeaedf6e5ffbcbcf38ba0
    ['#CDF0EA', '#F9F9F9', '#F7DBF0', '#BEAEE2'], //4 marshmallow https://colorhunt.co/palette/cdf0eaf9f9f9f7dbf0beaee2
    ['#FAF1E6', '#FFC074', '#B6C867', '#01937C'], //5 meadows https://colorhunt.co/palette/faf1e6ffc074b6c86701937c
    ['#EBA83A', '#BB371A', '#FFF8D9', '#D5DBB3'], //6 ethnic https://colorhunt.co/palette/eba83abb371afff8d9d5dbb3
    ['#867AE9', '#FFF5AB', '#FFCEAD', '#C449C2'], //7 cake https://colorhunt.co/palette/867ae9fff5abffceadc449c2
    ['#98DDCA', '#D5ECC2', '#FFD3B4', '#FFAAA7'], //8 baby https://colorhunt.co/palette/98ddcad5ecc2ffd3b4ffaaa7
    ['#9EDE73', '#F7EA00', '#E48900', '#BE0000'], //9 bright https://colorhunt.co/palette/9ede73f7ea00e48900be0000
    ['#FFCB91', '#FFEFA1', '#94EBCD', '#6DDCCF'], //10 beach https://colorhunt.co/palette/ffcb91ffefa194ebcd6ddccf
    ['#AA2B1D', '#CC561E', '#EF8D32', '#BECA5C'], //11 gradient https://colorhunt.co/palette/aa2b1dcc561eef8d32beca5c
    ['#FF75A0', '#FCE38A', '#EAFFD0', '#95E1D3'], //12 cotton candy https://colorhunt.co/palette/ff75a0fce38aeaffd095e1d3
    ['#FFE6E6', '#FFABE1', '#A685E2', '#6155A6'], //13 journal https://colorhunt.co/palette/ffe6e6ffabe1a685e26155a6
    ['#EF4F4F', '#EE9595', '#FFCDA3', '#74C7B8'], //14 authentic https://colorhunt.co/palette/ef4f4fee9595ffcda374c7b8
    ['#FF577F', '#FF884B', '#FFC764', '#CDFFFC'], //15 cartoons https://colorhunt.co/palette/ff577fff884bffc764cdfffc
    ['#00EAD3', '#FFF5B7', '#FF449F', '#005F99'], //16 statement https://colorhunt.co/palette/00ead3fff5b7ff449f005f99
    ['#F0D9E7', '#FF94CC', '#A239EA', '#5C33F6'], //17 business https://colorhunt.co/palette/f0d9e7ff94cca239ea5c33f6
    ['#78DEC7', '#D62AD0', '#FB7AFC', '#FBC7F7'], //18 salient https://colorhunt.co/palette/78dec7d62ad0fb7afcfbc7f7
    ['#0092cc', '#ff3333', '#dcd427', '#779933'], //19 primary
    ['#c0392b', '#2980b9', '#27ae60', '#e67e22'], //20 home
    ['#81ecec', '#a29bfe', '#fab1a0', '#fd79a8'], //21 icing
    ['#55efc4', '#74b9ff', '#ffeaa7', '#ff7675'], //22 birthday
    ['#6c5ce7', '#00cec9', '#e17055', '#e84393'], //23 grown up
    ['#fdcb6e', '#d63031', '#00b894', '#0984e3'], //24 core
    // ['','','',''],//  
];


// Attributes

features = [];

filename = [];

    density_param = parseInt(mapParam(rawParams[0], 0, 9));
    if (density_param==9) {density_param = 8;}
    densities = [3, 4, 5, 6, 7, 8, 10, 20, 40];
    density_names = ['sparse', 'little', 'few', 'some', 'healthy', 'many', 'lot', 'dense','full'];
    num_strokes = densities[density_param];
    features.push("strokes: " + density_names[density_param])
    filename = filename + ("strokes: " + density_names[density_param])

    var pid = parseInt(mapParam(rawParams[1], 0, palettes.length)) // palettes.length very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
    if (pid==palettes.length) {
        pid = pid-1;
    }
    palette_names = ['pastel','design','neon','dream','marshmallow','meadow','ethnic','cake','baby','bright','beach','gradient','cotton candy','journal','authentic','cartoon','statement','business','salient','primary','home','icing','birthday','grown up','core'];
    features.push("palette: " + palette_names[pid]);
    filename = filename + '-' + ("palette: " + palette_names[pid]);

    var black = rawParams[2] < 127;
    if (black==1) {
        features.push("mode: " + 'dark');
        filename = filename + '-' + ("mode: " + 'dark');
    } else {
        features.push("mode: " + 'light');
        filename = filename + '-' + ("mode: " + 'light');
    }

    var unibg = rawParams[3] < 127;
    if (unibg==1) {
        features.push("backdrop: " + 'b&w');
        filename = filename + '-' + ("backdrop: " + 'b&w');

    } else {
        features.push("backdrop: " + 'color');
        filename = filename + '-' + ("backdrop: " + 'color');
    }

    var textured = rawParams[4] < 127;  
    if (textured==1) {
        features.push("canvas: " + 'textured');
        filename = filename + '-' + ("canvas: " + 'textured');
    } else {
        features.push("canvas: " + 'smooth');
        filename = filename + '-' + ("canvas: " + 'smooth');
    }
    
    if (unibg == 0) {
        var intricate = 1
    } else {
        var intricate = rawParams[5] < 127;;
    }
    if (intricate==1) {
        features.push("style: " + 'intricate');
        filename = filename + '-' + ("style: " + 'intricate');
    } else {
        features.push("style: " + 'minimal');
        filename = filename + '-' + ("style: " + 'minimal');
    }

    if (intricate == 0) { // at least 2 colors if not intricate
        var numColors = parseInt(mapParam(rawParams[6], 2, palettes[pid].length+1))
    } else {
        var numColors = parseInt(mapParam(rawParams[6], 1, palettes[pid].length+1))
    }
    
    if ((textured==0)&&(unibg==0)) {numColors = 1;}
    // palette.length+1 very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
    if (numColors>palettes[pid].length) {
        numColors = palettes[pid].length;
    }
    numColors_names = ['i','ii','iii','iiii'];
    features.push("colorful: " + numColors_names[numColors-1]);
    filename = filename + '-' + ("colorful: " + numColors_names[numColors-1]);

    var thicknesses = [3, 4, 5, 6, 7, 8, 9, 10];
    if ((unibg == 0)&&(textured==1)&&(numColors>1)) {
            thicknesses = [5, 6, 7, 8, 9, 10];
    }
    if ((unibg == 1)&&(black==1)) {
        thicknesses = [2, 3, 4, 5, 6];
    }    
    var thickness_param = parseInt(mapParam(rawParams[7], 0, thicknesses.length)) // thicknesses.length+1 very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
    if (thickness_param == thicknesses.length) {
        thickness_param = thickness_param-1;
    }
    var thickness = thicknesses[thickness_param];
    var thickness_names = ['delicate','fine','thin','narrow','solid','wide','thick','chunky','heavy']
    features.push("brush: " + thickness_names[thickness-2]);
    filename = filename + '-' + ("brush: " + thickness_names[thickness-2]);

    var orientations = parseInt(mapParam(rawParams[8], 1, 5)) // 5 very unlikely to get picked, only if param is 255; mapping it back to one less value if that happens.
    if (orientations==5) {
        orientations = 4;
    }
    var orientation_names = ['square','diamond','sphere','amorphous']
    features.push("layout: " + orientation_names[orientations-1]);
    filename = filename + '-' + ("layout: " + orientation_names[orientations-1]);


    if (orientations == 1) {
        ms = [0, Math.tan(Math.PI / 2), Math.tan(Math.PI / 4), -Math.tan(Math.PI / 4)];
    }
    if (orientations == 2) {
        ms = [Math.tan(Math.PI / 8), -Math.tan(Math.PI / 8), 1 / Math.tan(Math.PI / 8), -1 / Math.tan(Math.PI / 8)];
    }
    if (orientations == 3) {
        ms = [0, Math.tan(Math.PI / 2), Math.tan(Math.PI / 4), -Math.tan(Math.PI / 4), Math.tan(Math.PI / 8), -Math.tan(Math.PI / 8), 1 / Math.tan(Math.PI / 8), -1 / Math.tan(Math.PI / 8)];
    }
    if (orientations == 4) {
        ms = [0, Math.tan(Math.PI / 2), Math.tan(Math.PI / 4), -Math.tan(Math.PI / 4), Math.tan(Math.PI / 8), -Math.tan(Math.PI / 8), 1 / Math.tan(Math.PI / 8), -1 / Math.tan(Math.PI / 8)];
    }
    
    ms = shuffleArray(ms);
    if (orientations == 4) {
        var num_slopes = parseInt(mapParam(rawParams[9], 1, ms.length+1)) // ms.length+1 unlikely, if does happen, map it to ms.length
        if (num_slopes==ms.length+1) {
            num_slopes = ms.length;
        }
    } else {
        var num_slopes = ms.length;
    }
    symmetry_names = ['l','V','T','X','H','Hl','HV','HT'];
    features.push("symmetries: " + symmetry_names[num_slopes-1]);
    filename = filename + '-' + ("symmetries: " + symmetry_names[num_slopes-1]);


    console.log(features)

// ----


let dim = Math.min(window.innerWidth, window.innerHeight)

for (var i = 0; i <palettes.length; i++) {
    for (var j = 0; j <palettes[i].length; j++) {
        dummy = hexToRgb(palettes[i][j])
        palettes[i][j] = [dummy.r, dummy.g, dummy.b]
    }
    palettes[i] = shuffleArray(palettes[i])
}
palette = palettes[pid];


function setup() {
    let c = createCanvas(dim, dim)
    noLoop();
}

function draw() {
    pixelDensity(2400 / dim)

    thickness = thickness * dim / 980;

    // ------

    var alpha = 0.1;
    if (unibg==0) {
        if (black==0) { // white, so make colors darker
            for (var i=0; i<palette.length; i++) {
                for (var j=0; j<3; j++) {
                    palette[i][j] = (1-alpha)*palette[i][j] + alpha*0.
                }
            }
        }
        else { // black, so make colors lighter
            for (var i=0; i<palette.length; i++) {
                for (var j=0; j<3; j++) {
                    palette[i][j] = (1-alpha)*palette[i][j] + alpha*255.
                }
            }
        }
    }

    
    if (black == 1) {
        bg = '#1A1B1D';
        dbg = (10);
    } else {
        bg = '#ecf0f1';
        dbg = (250);
    }
    
    if (unibg == 0) {
        bg = palette[0];
    }
    TH = dim / 90;
    background(bg);
    noFill()
    if (textured == 1) {
        for (var ii = 0; ii <= 60; ii++) {
            for (var jj = 0; jj <= 60; jj++) {
                i = ii * 2 * TH;
                j = jj * 2 * TH;
                iuse = i + (rnd.random_decimal() * 2 * TH - TH);
                juse = j + rnd.random_decimal() * dim / 20 + dim / 20;
                if (rnd.random_decimal() > 0.5) {
                    cp = [(i + iuse) / 2 + dim / 40, (j + juse) / 2];
                } else {
                    cp = [(i + iuse) / 2 - dim / 40, (j + juse) / 2];
                }
                if (unibg) {
                    sc = dbg;
                    fc = bg;
                } else {
                    if (black) {
                        sc = '#1A1B1D'
                    } else {
                        sc = '#ecf0f1'
                    }
                    fc = color(palette[rnd.random_int(0,numColors-1)]);
                }
                stroke(sc)
                strokeWeight(20 * dim / 980);
                beginShape();
                vertex(i, j);
                quadraticVertex(cp[0], cp[1], iuse, juse);
                endShape();
                stroke(fc)
                if (unibg == 0) {
                    strokeWeight(19 * dim / 980)
                } else {
                    strokeWeight(10 * dim / 980)
                }
                beginShape();
                vertex(i, j);
                quadraticVertex(cp[0], cp[1], iuse, juse);
                endShape();
            }
        }
    }


    T = 20; // size of dot

    for (var i = 0; i < num_strokes; i++) {

        M = 0.2;
        CC = 0.05;
        MaxTrials = 500;

        var use_color = color(palette[rnd.random_int(0,numColors-1)]);
        // var use_color_2 = color(rnd.random_choice(palette));

        v1x = rnd.random_decimal() * 0.6 * dim + dim / 5;
        v1y = rnd.random_decimal() * 0.6 * dim + dim / 5;
        v2x = rnd.random_decimal() * 0.6 * dim + dim / 5;
        v2y = rnd.random_decimal() * 0.6 * dim + dim / 5;

        v1xo = v1x;
        v1yo = v1y;
        v2xo = v2x;
        v2yo = v2y;

        c1xo = 0.5 * (v1xo + v2xo) + rnd.random_decimal() * dim / 20; //offset(v1xo,v2xo,CC,dim);
        c1yo = offset(v1yo, v2yo, CC, dim);

        noFill();

        for (mind = 0; mind < num_slopes; mind++) {

            // First set

            m = ms[mind];
            A = 0 - m;
            B = 1;
            C = 0;

            xs = v1xo;
            ys = v1yo;
            xe = v2xo;
            ye = v2yo;
            xc = c1xo;
            yc = c1yo;

            ys = dim - ys;
            ye = dim - ye;
            yc = dim - yc;

            xs = xs - dim / 2;
            ys = ys - dim / 2;
            xe = xe - dim / 2;
            ye = ye - dim / 2;
            xc = xc - dim / 2;
            yc = yc - dim / 2;

            us = ((B * B - A * A) * xs - 2 * A * B * ys - 2 * A * C) / (A * A + B * B);
            ue = ((B * B - A * A) * xe - 2 * A * B * ye - 2 * A * C) / (A * A + B * B);
            vs = ((A * A - B * B) * ys - 2 * A * B * xs - 2 * B * C) / (A * A + B * B);
            ve = ((A * A - B * B) * ye - 2 * A * B * xe - 2 * B * C) / (A * A + B * B);
            uc = ((B * B - A * A) * xc - 2 * A * B * yc - 2 * A * C) / (A * A + B * B);
            vc = ((A * A - B * B) * yc - 2 * A * B * xc - 2 * B * C) / (A * A + B * B);

            xs = us + dim / 2;
            ys = vs + dim / 2;
            xe = ue + dim / 2;
            ye = ve + dim / 2;
            xc = uc + dim / 2;
            yc = vc + dim / 2;

            v1x = xs;
            v1y = ys;
            v2x = xe;
            v2y = ye;
            c1x = xc;
            c1y = yc;

            B = 4;

            draw_all_curves(unibg, black, intricate, use_color, v1x, v1y, v2x, v2y, c1x, c1y, dim, thickness)

            // Second set

            ys = dim - ys;
            ye = dim - ye;
            yc = dim - yc;

            v1x = xs;
            v1y = ys;
            v2x = xe;
            v2y = ye;
            c1x = xc;
            c1y = yc;

            draw_all_curves(unibg, black, intricate, use_color, v1x, v1y, v2x, v2y, c1x, c1y, dim, thickness)
        }

    }
    


}

function draw_all_curves(unibg, black, intricate, use_color, v1x, v1y, v2x, v2y, c1x, c1y, dim, thickness) {

if (intricate == 1) {draw_dot = 1;} else {draw_dot = 0;}


    if (unibg == 0) { // multi-colored textured background intricate has to be 1
        if (black) {
            stroke('#1A1B1D') // black
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B + 1) * thickness, draw_dot)
            stroke('#ecf0f1')  // white
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B) * thickness, draw_dot)
            stroke('#1A1B1D')  // black
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B - 1) * thickness, draw_dot)
        } else {
            stroke('#1A1B1D') // black
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B + 1) * thickness, draw_dot)
            // stroke('#1A1B1D') // black
            // draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B) * thickness, draw_dot)
            stroke('#ecf0f1')  // white
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B - 1) * thickness, draw_dot)
        }
    } else { // plain background (may be textured)
        if (black) { 
            if (intricate == 1) {
                stroke('#ecf0f1') // white
                draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B + 1) * thickness, draw_dot)
                stroke('#1A1B1D') // black
                draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B) * thickness, draw_dot)
            }
        } else { // if white
            if (intricate == 1) {
            stroke('#1A1B1D') // black
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B+3) * thickness, draw_dot)    
            stroke('#ecf0f1') // white
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B+2) * thickness, draw_dot)    
            }
            stroke('#1A1B1D') // black
            draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B+1) * thickness, draw_dot)
        }
        stroke(use_color)
        draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, (B-1) * thickness, draw_dot)
    }
}

function draw_curve(v1x, v1y, v2x, v2y, c1x, c1y, dim, thickness, draw_dot) {
    strokeWeight(thickness);
    beginShape();
    vertex(v1x, v1y);
    quadraticVertex(c1x, c1y, v2x, v2y);
    endShape();
    if ((draw_dot)) {
        strokeWeight(T*dim/980+thickness);
        point(v1x, v1y)
        point(v2x, v2y)
    
    }
}


function offset(v1, v2, CC, dim) {
    r = rnd.random_decimal() * CC + CC;
    if (rnd.random_decimal() > 0.5) {
        c = 0.5 * (v1 + v2) + (r * dim);
    } else {
        c = 0.5 * (v1 + v2) - (r * dim);
    }
    return c

}

// From Dmitri Cherniak's script

/*
  Helper functions
*/

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


// From stackoverflow
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// -- * --

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function shuffleArray(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Expected Array, got ' + typeof arr);
    }

    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();
    while (len) {
        rand = Math.floor(rnd.random_decimal() * len--);
        tmp = ret[len];
        ret[len] = ret[rand];
        ret[rand] = tmp;
    }
    return ret;
}

//  -- * --
// From  https://gist.github.com/dmitric/0de47d734bd1747158fd3b11f482e884

/*
  Helper functions
*/

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


function distance (x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}

function mapd(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}

function mapParam(n, start, stop) {
  return mapd(n, 0, 255, start, stop)
}

// -- * --