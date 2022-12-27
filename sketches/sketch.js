import { colorTemperature2rgb } from 'color-temperature'

export default function sketch(p){
    let canvas;
    let stars;
    let sizeBracket;
    let bracketCount;

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      stars = [];

      sizeBracket = Math.min(p.windowWidth / 5, p.windowHeight / 5);
      bracketCount = 1;

      p.noStroke();
    }

    p.draw = () => {
      for(var i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.twinkle();
        star.display(p);
      }

      if(p.frameCount % 10 === 0) {
        
      }
    }

    p.windowResized = () => {
      canvas = p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

class Stars {
  constructor(sizeBracket, bracketCount) {
    this.starList = [];
    while(sizeBracket > 1 && bracketCount < 200) {
      let createdCount = 0;
      while(createdCount < bracketCount) {
        let temp = (12 - Math.pow(p.random(1, 20736), 0.25)) * 2500;
        stars.push(new Star(p, sizeBracket, temp));
        createdCount++;
      }

      sizeBracket /= 2;
      bracketCount *= 4;
    }

  }
}

class Star {
  constructor(p, size, temp) {
    this.diameter = size;
    this.x = p.random(size, p.windowWidth - size);
    this.y = p.random(size, p.windowHeight - size);
    this.rgb = colorTemperature2rgb(temp);
    this.opacity = 255;
    this.twinkleRate = p.random(-0.1, 0.1);

    console.log(this.x + " " + this.y + " " + this.twinkleRate);
    console.log(this.rgb);
  }

  twinkle() {
    if(this.opacity > 255) {
      this.opacity = 255;
      this.twinkleRate = -this.twinkleRate;
    }
    else if(this.opacity < 200) {
      this.opacity = 200;
      this.twinkleRate = -this.twinkleRate;
    }
    else {
      this.opacity += this.twinkleRate;
    }
  }

  display(p) {
    p.noStroke();
    p.fill(this.rgb.red, this.rgb.green, this.rgb.blue, 255);
    p.ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
