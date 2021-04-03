let theta;

function setup() {
  createCanvas(710, 400);
}

function draw() {
  background(0);
  frameRate(60);
  stroke(180);
  let a = (mouseX / width) * 90;
  theta = radians(a);
  translate(width/2,height);
  line(0,0,0,-120);
  translate(0,-120);
  branch(120);
  branch(60);

}

function branch(h) {
  h *= 0.69;

  if (h > 2) {
    push();   
    rotate(theta);   
    line(0, 0, 0, -h);  
    translate(0, -h); 
    branch(h);       
    pop();    
    fill(455)
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}
