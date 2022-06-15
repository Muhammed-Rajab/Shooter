// * Helper functions
const updateCanvasDimension = canvas => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
const clearCanvas = (canvas, ctx) => {
    ctx.fillStyle = "rgb(0 0 0 / 10%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export { updateCanvasDimension, clearCanvas };
