let canvas = <HTMLCanvasElement>document.querySelector("#myCanvas");
let context = <CanvasRenderingContext2D>canvas.getContext("2d");
var canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;
let mouseDown: boolean = false;

let linePosition: any = [];
canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e: any) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;

  linePosition.push({ x: mouseX, y: mouseY });
}

function getPosition(el: any) {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
    yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition,
  };
}

addEventListener("mousedown", () => {
  mouseDown = true;
});

addEventListener("mouseup", () => {
  mouseDown = false;
});

function update() {
  if (mouseDown) {
    try {
      context.beginPath();
      linePosition.pop();
      let position = linePosition[linePosition.length - 1];
      context.moveTo(position!.x, position!.y);
      context.lineTo(mouseX, mouseY);
      linePosition.push({ x: mouseX, y: mouseY });
      context.stroke();
    } catch (er) {
      console.log(er);
    }
  }

  requestAnimationFrame(update);
}
update();
