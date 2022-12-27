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
        let size = Math.random(sizeBracket, sizeBracket * 1.5);
        stars = new Star(p, size);
        sizeBracket *= (2 / 3);
      }

      p.noStroke();
    }

    p.draw = () => {
      stars.twinkle();
      stars.display(p);

      if(p.frameCount % 10 === 0) {
        
      }
    }

    p.windowResized = () => {
      canvas = p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

class Star {
  constructor(p, size) {
    this.x = Math.random(p.windowWidth);
    this.y = Math.random(p.windowHeight);
    this.diameter = size;
    this.color = p.color(Math.random(255), Math.random(255), 0);
    this.opacity = 1;
    this.twinkleRate = Math.random(-0.01, 0.01);
  }

  twinkle() {
    if(this.opacity > 1) {
      this.opacity = 1;
      this.twinkleRate = -this.twinkleRate;
    }
    else if(this.opacity < 0.9) {
      this.opacity = 0.9;
      this.twinkleRate = -this.twinkleRate;
    }
    else {
      this.opacity += this.twinkleRate;
    }
  }

  display(p) {
    p.noStroke();
    p.fill(this.color);
    p.ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
