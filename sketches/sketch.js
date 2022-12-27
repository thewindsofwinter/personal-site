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
      while(sizeBracket > 1) {
        let createdCount = 0;
        while(createdCount < bracketCount) {
          stars.push(new Star(p, sizeBracket));
          createdCount++;
        }

        sizeBracket /= 2;
        bracketCount *= 4;
      }

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

function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

class Star {
  constructor(p, size) {
    this.diameter = size;
    this.x = p.random(size + 10, p.windowWidth - size - 10);
    this.y = p.random(size + 10, p.windowHeight - size - 10);
    this.rgb = hslToRgb(p.random(1), 1, 0.8);
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
    p.fill(this.rgb[0], this.rgb[1], this.rgb[2], 255);
    p.ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
