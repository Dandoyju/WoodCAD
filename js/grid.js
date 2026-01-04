function gridLine(x1, y1, x2, y2, color = "#e0e0e0") {
    const l = document.createElementNS(svg.namespaceURI, "line");
    l.setAttribute("x1", x1);
    l.setAttribute("y1", y1);
    l.setAttribute("x2", x2);
    l.setAttribute("y2", y2);
    l.setAttribute("stroke", color);
    return l;
}

function drawGrid() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const g = document.createElementNS(svg.namespaceURI, "g");

    for (let x = GRID_PX; x < w/2; x += GRID_PX) {
        g.appendChild(gridLine(w/2-x,0,w/2-x,h));
        g.appendChild(gridLine(w/2+x,0,w/2+x,h));
    }
    for (let y = GRID_PX; y < h/2; y += GRID_PX) {
        g.appendChild(gridLine(0,h/2-y,w,h/2-y));
        g.appendChild(gridLine(0,h/2+y,w,h/2+y));
    }

    originX = w/2;
    originY = h/2;
    snapPoints.push({ x: originX, y: originY });

    g.appendChild(gridLine(0,originY,w,originY,"#000"));
    g.appendChild(gridLine(originX,0,originX,h,"#000"));

    svg.appendChild(g);
}
