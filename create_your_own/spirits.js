function random_hash() {
  let x = "0123456789abcdef", hash = '0x'
  for (let i = 64; i > 0; --i) {
    hash += x[Math.floor(Math.random()*x.length)]
  }
  return hash
}

tokenData = {
  "hash": random_hash(),
  "tokenId": "123000456"
}
console.log(tokenData.hash)

// Code that processes the hash is from Dmitri Cherniak's script
// let tokenData = {"hash":"0x437a7c88df5970d621d430f5b8b09c618442a7d157a58e48dc25e770821052b1","tokenId":"123000456"}

// // Artblocks injects the tokenData variable into your sketch like so
// let tokenData = {"hash":"0x31f2d12d85e8aeea04e79dc9ed6d3fd2377de7d17fe4233e8c34aab4b48f0f63","tokenId":"18000000"}

// // another example if you want to uncomment it to try it out
// // tokenData = {"hash":"0xf79f00793c585e9272d46d0437f04580a5fe9b8ebd834b6ce101f18e05d7cb16","tokenId":"18000258"}


// Gets you an array of 32 parameters from the hash ranging from 0-255
let rawParams = setupParametersFromTokenData(tokenData)

// your random seed
let seed = generateSeedFromTokenData(tokenData)

// the ID of the token
let tokenId = parseInt(tokenData.tokenId.substring(2))

let palettes = [
        ['#D1FFCF','#FFD4B5','#AA9CFF','#32BFD1'], //1
        ['#867AE9','#FFF5AB','#7DF0FA','#C449C2'], //2
        ['#0CECDD','#FFF338','#FF67E7','#9A5AFF'], //3
        ['#B5EAEA','#EDF6E5','#FFBCBC','#F38BA0'], //4 https://colorhunt.co/palette/b5eaeaedf6e5ffbcbcf38ba0
        ['#CDF0EA','#F9F9F9','#F7DBF0','#BEAEE2'], //5 https://colorhunt.co/palette/cdf0eaf9f9f9f7dbf0beaee2
        ['#FAF1E6','#FFC074','#B6C867','#01937C'],//6 https://colorhunt.co/palette/faf1e6ffc074b6c86701937c
        ['#EBA83A','#BB371A','#FFF8D9','#D5DBB3'],//7 https://colorhunt.co/palette/eba83abb371afff8d9d5dbb3
        ['#867AE9','#FFF5AB','#FFCEAD','#C449C2'],//8 https://colorhunt.co/palette/867ae9fff5abffceadc449c2
        ['#98DDCA','#D5ECC2','#FFD3B4','#FFAAA7'],//9 https://colorhunt.co/palette/98ddcad5ecc2ffd3b4ffaaa7
        ['#9EDE73','#F7EA00','#E48900','#BE0000'],//10 https://colorhunt.co/palette/9ede73f7ea00e48900be0000
        ['#FFCB91','#FFEFA1','#94EBCD','#6DDCCF'],//11 https://colorhunt.co/palette/ffcb91ffefa194ebcd6ddccf
        ['#AA2B1D','#CC561E','#EF8D32','#BECA5C'],//12 https://colorhunt.co/palette/aa2b1dcc561eef8d32beca5c
        ['#FF75A0','#FCE38A','#EAFFD0','#95E1D3'],//13 https://colorhunt.co/palette/ff75a0fce38aeaffd095e1d3
        ['#FFE6E6','#FFABE1','#A685E2','#6155A6'],//14 https://colorhunt.co/palette/ffe6e6ffabe1a685e26155a6
        ['#EF4F4F','#EE9595','#FFCDA3','#74C7B8'],//15 https://colorhunt.co/palette/ef4f4fee9595ffcda374c7b8
        ['#FF577F','#FF884B','#FFC764','#CDFFFC'],//16 https://colorhunt.co/palette/ff577fff884bffc764cdfffc
        ['#00EAD3','#FFF5B7','#FF449F','#005F99'],//17 https://colorhunt.co/palette/00ead3fff5b7ff449f005f99
        ['#F0D9E7','#FF94CC','#A239EA','#5C33F6'],//18 https://colorhunt.co/palette/f0d9e7ff94cca239ea5c33f6
        ['#78DEC7','#D62AD0','#FB7AFC','#FBC7F7'],//19 https://colorhunt.co/palette/78dec7d62ad0fb7afcfbc7f7
        ['#0092cc', '#ff3333', '#dcd427', '#779933'], //20 
        ['#c0392b','#2980b9','#27ae60','#e67e22'],//21
        ['#81ecec','#a29bfe','#fab1a0','#fd79a8'],//22
        ['#55efc4','#74b9ff','#ffeaa7','#ff7675'],//23
        ['#6c5ce7','#00cec9','#e17055','#e84393'],//24
        ['#fdcb6e','#d63031','#00b894','#0984e3'],//25
        ['#00cec9','#6c5ce7','#e17055','#e84393'],//26
        // ['','','',''],//  
    ];
let grid_sizes = [1]; //[1,2,3,4];
let thicknesses = [8];//[3, 5, 20];//, 7];
let dim = Math.min(window.innerWidth, window.innerHeight)

function setup() {
  createCanvas(dim, dim)
  noLoop();
}

function draw() {

    // ['#CAF7E3','#EDFFEC','#F6DFEB','#E4BAD4'],//https://colorhunt.co/palette/caf7e3edffecf6dfebe4bad4
    // ['#CCF6C8','#FAFCC2','#F6D6AD','#F9C0C0'],//https://colorhunt.co/palette/ccf6c8fafcc2f6d6adf9c0c0

    var num_strokes_list = [3];//[5];//[1, 2, 3, 4, 5, 6, 7, 8];//[1, 1, 1, 2, 2, 2, 3, 3];
    // var num_slopes_list = [8];//[1, 2, 3, 4, 5, 6, 7, 8];
    var num_segments_per_stroke = 1;// Math.floor(rnd() * 2) + 1;

    var num_strokes = num_strokes_list[Math.floor(rnd() * num_strokes_list.length)];
    var pid = Math.floor(rnd() * palettes.length);
    var palette = palettes[pid];
    var grid_size = grid_sizes[Math.floor(rnd() * grid_sizes.length)];
    var thickness = thicknesses[Math.floor(rnd() * thicknesses.length)];
    // var num_slopes = num_slopes_list[Math.floor(rnd() * num_slopes_list.length)];

    // if (grid_size == 1) {
    //     thickness = 7
    // };
    // if (num_strokes > 2) {
    //     thickness = 5
    // };
    // if ((grid_size > 2) && (thickness > 3)) {
    //     thickness = 3
    // };
    if (num_strokes > 3) {
        num_segments_per_stroke = 1
    };
    // if (num_strokes == 1) {
    //     num_segments_per_stroke = 2
    // };

    background('#1A1B1D');

    let r = rnd();
    // if (r<=1/5) {orientations = 1};
    // if ((r>1/5)&(r<=2/5)) {orientations = 2};
    // if ((r>2/5)&(r<=3/5)) {orientations = 3};
    // if ((r>3/5)&(r<=4/5)) {orientations = 4};
    // if (r>4/5) {orientations = 5};
    // if ((num_strokes>2)||(num_segments_per_stroke>1)) {
    //     if (r<=1/4) {orientations = 1};
    //     if ((r>1/4)&(r<=2/4)) {orientations = 2};
    //     if ((r>2/4)&(r<=3/4)) {orientations = 4};
    //     if (r>3/4) {orientations = 5};
    // }

    if (r<=1/3) {orientations = 1};
    if ((r>1/3)&(r<=2/3)) {orientations = 2};
    if (r>2/3) {orientations = 3};

    if ((num_strokes==1)&&(num_segments_per_stroke==1)) {orientations=3}


    // orientations = 3;

    console.log('num strokes', num_strokes)
    console.log('num segments per stroke',num_segments_per_stroke)
    console.log('orientations',orientations)
    console.log('palette',pid)

    for (var i=0; i<num_strokes; i++) {

        M = 0.2;
        CC = 0.05;
        MaxTrials = 500;

        var use_color_1 = color(palette[Math.floor(rnd() * palette.length)]);
        var use_color_2 = color(palette[Math.floor(rnd() * palette.length)]);
        // use_color.setAlpha(200);
        // use_color.setAlpha(255);
        // var use_color = palette[Math.floor(rnd() * palette.length)];

        T = 3; // size of dot
        S = 1; // the lower the value, the more unlikely it is that the dot will get drawn

        // Option 1
        // if (rnd()>0.5) {
        //     v1x = dim/2 + M/2*dim + rnd()*M/2;
        // } else {
        //     v1x = dim/2 - M/2*dim - rnd()*M/2;
        // }
        // if (rnd()>0.5) {
        //     v1y = v1x + M/2*dim + rnd()*dim*M/2
        // } else {
        //     v1y = v1x - M/2*dim - rnd()*dim*M/2
        // }

        // v2x = rnd()*dim*(1-2*M)+(M*dim);
        // if (rnd()>0.5) {
        //     v2y = v2x + rnd()*dim*M
        // } else {
        //     v2y = v2x - rnd()*dim*M
        // }

        // trial = 0;
        // while (((distance(v1x, v1y, v2x, v2y) > 2*M*dim)||(distance(v1x, v1y, v2x, v2y) < M*dim))&&(trial<MaxTrials)) {
        //     v2x = rnd()*dim*(1-2*M)+(M*dim);
        //     v2y = rnd()*dim*(1-2*M)+(M*dim);
        //     trial = trial+1;
        // }

        // Option 2
        // v1x = rnd()*dim/3+dim/6;
        // v1y = rnd()*dim/5-dim/10+dim/2;
        // v2x = rnd()*dim/3+dim/6;
        // v2y = rnd()*dim/5-dim/10+dim/2;

        // // Option 3
        // v1x = rnd()*dim/3+dim/6;
        // v1y = dim/2;
        // // v2x = rnd()*dim/3+dim/6;
        // if (rnd()>0.5) {
        //     v2x = v1x + dim/8+rnd()*dim/8;
        // } else {
        //     v2x = v1x - dim/8-rnd()*dim/8;
        // }
        // v2y = dim/2;

        // Option 4
        v1x = rnd()*2*dim/3+dim/5;
        v1y = rnd()*2*dim/3+dim/5;
        v2x = rnd()*2*dim/3+dim/5;
        v2y = rnd()*2*dim/3+dim/5;

        v1xo = v1x;
        v1yo = v1y;
        v2xo = v2x;
        v2yo = v2y;

        

        v3x = 0;
        v3y = 0;
        c2x = 0;
        c2y = 0;
        // if (rnd()>0.5) { // Don't need this because will be symmetric anyway.
            c1xo = 0.5*(v1xo+v2xo)+rnd()*dim/20; //offset(v1xo,v2xo,CC,dim);
        // } else {
        //     c1xo = 0.5*(v1xo+v2xo)-rnd()*dim/20; //offset(v1xo,v2xo,CC,dim);
        // }
        c1yo = offset(v1yo,v2yo,CC,dim);

        noFill();
        strokeWeight(thickness);
        // stroke(use_color)


        if (orientations==1) {
            ms = [0, Math.tan(Math.PI/2), Math.tan(Math.PI/4), -Math.tan(Math.PI/4)];
        }
        if (orientations==2) {
            ms = [Math.tan(Math.PI/8), -Math.tan(Math.PI/8), 1/Math.tan(Math.PI/8), -1/Math.tan(Math.PI/8)];
        }
        if (orientations==3) {
            ms = [0, Math.tan(Math.PI/2), Math.tan(Math.PI/4), -Math.tan(Math.PI/4), Math.tan(Math.PI/8), -Math.tan(Math.PI/8), 1/Math.tan(Math.PI/8), -1/Math.tan(Math.PI/8)];
        }
        // ms = shuffleArray(ms);


        for (mind = 0; mind < ms.length; mind++) {

            // First set

            m = ms[mind];
            A = 0-m;
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

            xs = xs - dim/2;
            ys = ys - dim/2;
            xe = xe - dim/2;
            ye = ye - dim/2;
            xc = xc - dim/2;
            yc = yc - dim/2;

            us = ((B*B - A*A)*xs - 2*A*B*ys - 2*A*C)/(A*A + B*B);
            ue = ((B*B - A*A)*xe - 2*A*B*ye - 2*A*C)/(A*A + B*B);
            vs = ((A*A - B*B)*ys - 2*A*B*xs - 2*B*C)/(A*A + B*B);
            ve = ((A*A - B*B)*ye - 2*A*B*xe - 2*B*C)/(A*A + B*B);
            uc = ((B*B - A*A)*xc - 2*A*B*yc - 2*A*C)/(A*A + B*B);
            vc = ((A*A - B*B)*yc - 2*A*B*xc - 2*B*C)/(A*A + B*B);

            xs = us + dim/2;
            ys = vs + dim/2;
            xe = ue + dim/2;
            ye = ve + dim/2;
            xc = uc + dim/2;
            yc = vc + dim/2;

            v1x = xs;
            v1y = ys;
            v2x = xe;
            v2y = ye;
            c1x = xc;
            c1y = yc;

            stroke(use_color_1)
            draw_curve(v1x,v1y,v2x,v2y,v3x,v3y,c1x,c1y,c2x,c2y,dim,thickness,num_segments_per_stroke)

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

            stroke(use_color_2)
            draw_curve(v1x,v1y,v2x,v2y,v3x,v3y,c1x,c1y,c2x,c2y,dim,thickness,num_segments_per_stroke)
        }
        
    }

}

function draw_curve(v1x,v1y,v2x,v2y,v3x,v3y,c1x,c1y,c2x,c2y,dim,thickness,num_segments_per_stroke){
    beginShape();
    vertex(v1x, v1y);
    strokeWeight(T*thickness);
    if (rnd()<S) {point(v1x,v1y)}
    strokeWeight(thickness);
    quadraticVertex(c1x, c1y, v2x, v2y);
    strokeWeight(T*thickness);
    if (rnd()<S) {point(v2x,v2y)}
    strokeWeight(thickness);
    if (num_segments_per_stroke==2) {
        quadraticVertex(c2x,c2y,v3x,v3y);
        strokeWeight(T*thickness);
        if (rnd()<S) {point(v3x,v3y)}
        strokeWeight(thickness);
    }
    endShape();
}


function offset(v1,v2,CC,dim) {
    r = rnd()*CC+CC;
    if (rnd()>0.5) {
        c = 0.5*(v1+v2)+(r*dim);
    } else {
        c = 0.5*(v1+v2)-(r*dim);
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

/*
  Random setup and helper functions, some of these are taken from
  @mattdesl's canvas-sketch-util Random library and adapted to work
  with this
*/

function rnd () {
  seed ^= seed << 13
  seed ^= seed >> 17
  seed ^= seed << 5
  
  let result = (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000
  return result
}

function distance (x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}

function shuffleArray (arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected Array, got ' + typeof arr);
  }

  var rand;
  var tmp;
  var len = arr.length;
  var ret = arr.slice();
  while (len) {
    rand = Math.floor(rnd() * len--);
    tmp = ret[len];
    ret[len] = ret[rand];
    ret[rand] = tmp;
  }
  return ret;
}

