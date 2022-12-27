import { colorTemperature2rgb } from 'color-temperature'

export default function sketch(p){
    let canvas;
    let stars;

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      stars = new Stars(p, Math.min(p.windowWidth / 5, p.windowHeight / 5), 1);

      p.noStroke();
    }

    p.draw = () => {
      stars.draw(p);
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
  constructor(p, startSize, startCount) {
    let sizeBracket = startSize;
    let bracketCount = startCount;

    this.starList = [];
    while(sizeBracket > 1 && bracketCount < 200) {
      let createdCount = 0;
      while(createdCount < bracketCount) {
        let temp = (12 - Math.pow(p.random(1, 20736), 0.25)) * 2500;
        let star;
        let nonOverlap = false;
        let tries = 0;

        while(!nonOverlap && tries < 10) {
          star = new Star(p, sizeBracket, temp);
          nonOverlap = true;

          for(let i = 0; i < this.starList.length; i++) {
            let existing = this.starList[i];
            let dx2 = (existing.x - star.x) * (existing.x - star.x);
            let dy2 = (existing.y - star.y) * (existing.y - star.y);
            let r = (existing.diameter / 2 + star.diameter / 2);

            if(dx2 + dy2 < r * r) {
              console.log("Caught!");
              nonOverlap = false;
              break;
            }
          }

          tries++;
        }

        if(tries < 10) {
          this.starList.push(star);
        }
        else {
          console.log("timeout");
        }

        createdCount++;
      }

      sizeBracket /= 2;
      bracketCount *= 4;
    }
  }

  draw(p) {
    for(var i = 0; i < this.starList.length; i++) {
      let star = this.starList[i];
      star.twinkle();
      star.display(p);
    }
  }
}

class Star {
  constructor(p, size, temp) {
    this.diameter = size;
    this.x = p.random(size, p.windowWidth - size);
    this.y = p.random(size, p.windowHeight - size);

    let tempRGB = colorTemperature2rgb(temp);
    let tempHSL = rgbToHsl(tempRGB.red, tempRGB.green, tempRGB.blue);
    this.rgb = hslToRgb(tempHSL[0], 1, 0.8);

    this.opacity = 255;
    this.twinkleRate = p.random(-0.1, 0.1);
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
    p.fill(this.rgb[0], this.rgb[1], this.rgb[2], 255);
    p.ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
