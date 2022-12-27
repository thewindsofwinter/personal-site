export default function sketch(p){
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
    }

    p.draw = () => {
      p.background('orangered');
      p.ellipse(150, 100, 100, 100);
    }

    p.windowResized = () => {
      canvas = p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}
