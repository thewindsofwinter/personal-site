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

class Star {
  constructor(p, size) {
    this.diameter = size;
    this.x = p.random(size + 10, p.windowWidth - size - 10);
    this.y = p.random(size + 10, p.windowHeight - size - 10);
    this.red = p.random(255);
    this.green = p.random(255);
    this.opacity = 255;
    this.twinkleRate = p.random(-0.1, 0.1);

    console.log(this.x + " " + this.y + " " + this.twinkleRate);
    console.log(this.color);
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
    p.fill(this.red, this.green, 0, this.opacity);
    p.ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
