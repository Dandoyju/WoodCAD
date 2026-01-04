// Snap : Functions to handle snapping behavior

function findSnapPoint(x, y) {
    let closest = null;
    let minDist = SNAP_RADIUS;

    for (const p of snapPoints) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < minDist) {
            minDist = d;
            closest = p;
        }
    }
    return closest;
}

function showSnapIndicator(x, y) {
    if (!snapIndicator) {
        snapIndicator = document.createElementNS(svg.namespaceURI, "circle");
        snapIndicator.setAttribute("r", 4);
        snapIndicator.setAttribute("fill", "#aaa");
        snapIndicator.setAttribute("stroke", "#000");
        snapIndicator.style.pointerEvents = "none";
        svg.appendChild(snapIndicator);
    }
    snapIndicator.setAttribute("cx", x);
    snapIndicator.setAttribute("cy", y);
}

function hideSnapIndicator() {
    if (snapIndicator) {
        svg.removeChild(snapIndicator);
        snapIndicator = null;
    }
}
