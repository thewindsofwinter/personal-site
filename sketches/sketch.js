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
      stars.push(new Star(p, sizeBracket));

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

class Star {
  constructor(p, size) {
    this.x = p.random(p.windowWidth);
    this.y = p.random(p.windowHeight);
    this.diameter = size;
    this.color = p.color(p.random(255), p.random(255), 0);
    this.opacity = 1;
    this.twinkleRate = p.random(-0.01, 0.01);

    console.log(this.x + " " + this.y + " " + this.twinkleRate);
    console.log(this.color);
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
