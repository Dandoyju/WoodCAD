drawGrid();
createHatchPattern();

svg.addEventListener("click", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    const sp = findSnapPoint(x, y);
    if (sp) {
        x = sp.x;
        y = sp.y;
    }

    if (clickCount === 0) {
        startX = x;
        startY = y;
        if (tool === "line") {
            preview = create("line", { x1:x, y1:y, x2:x, y2:y }, true);
            svg.appendChild(preview);
            clickCount = 1;
        }
    } else {
        finalizeShape(x, y);
        reset();
    }
});

svg.addEventListener("mousemove", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    const sp = findSnapPoint(x, y);
    if (sp) {
        showSnapIndicator(sp.x, sp.y);
        x = sp.x;
        y = sp.y;
    } else {
        hideSnapIndicator();
    }

    if (preview) {
        preview.setAttribute("x2", x);
        preview.setAttribute("y2", y);
    }

    const dxPx = x - originX;
    const dyPx = originY - y; // inversion axe Y (CAD-style)

    const dxMm = pxToMm(dxPx).toFixed(1);
    const dyMm = pxToMm(dyPx).toFixed(1);

    coordsEl.innerHTML = `X: ${dxMm} mm&nbsp;&nbsp;Y: ${dyMm} mm`;
});
