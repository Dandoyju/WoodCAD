// Tools : Functions to handle drawing tools

function setTool(t) {
    tool = t;
    reset();
}

function create(type, attrs, isPreview = false) {
    const el = document.createElementNS(svg.namespaceURI, type);
    for (let a in attrs) el.setAttribute(a, attrs[a]);
    el.setAttribute("fill", "none");
    el.setAttribute("stroke-width", 2);
    if (isPreview) el.classList.add("preview");
    return el;
}

function finalizeShape(x, y) {
    const final = preview.cloneNode(true);
    final.classList.remove("preview");
    final.setAttribute("stroke", "#000");
    svg.appendChild(final);
    svg.removeChild(preview);

    const line = {
        x1: +final.getAttribute("x1"),
        y1: +final.getAttribute("y1"),
        x2: +final.getAttribute("x2"),
        y2: +final.getAttribute("y2")
    };

    lines.push(line);
    snapPoints.push(
        { x: line.x1, y: line.y1 },
        { x: line.x2, y: line.y2 }
    );

    detectAndHatch();
}

function reset() {
    clickCount = 0;
    if (preview) svg.removeChild(preview);
    preview = null;
    hideSnapIndicator();
}
