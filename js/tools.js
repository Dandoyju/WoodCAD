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

/* =======================
   PREVIEW CREATION
======================= */

function createPreview(x, y) {
    if (tool === "line") {
        return create("line", { x1: x, y1: y, x2: x, y2: y }, true);
    }

    if (tool === "circle") {
        return create("circle", { cx: x, cy: y, r: 0 }, true);
    }
}

/* =======================
   PREVIEW UPDATE
======================= */

function updatePreview(x, y) {
    if (!preview) return;

    if (tool === "line") {
        preview.setAttribute("x2", x);
        preview.setAttribute("y2", y);
    }

    if (tool === "circle") {
        const r = Math.hypot(x - startX, y - startY);
        preview.setAttribute("r", r);
    }
}

/* =======================
   FINALISATION
======================= */

function finalizeShape(x, y) {
    const final = preview.cloneNode(true);
    final.classList.remove("preview");
    final.setAttribute("stroke", "#000");
    svg.appendChild(final);
    svg.removeChild(preview);

    if (tool === "line") {
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

    if (tool === "circle") {
        const cx = +final.getAttribute("cx");
        const cy = +final.getAttribute("cy");
        const r  = +final.getAttribute("r");

        // snap centre
        snapPoints.push({ x: cx, y: cy });

        // snap points cardinaux
        snapPoints.push(
            { x: cx + r, y: cy },
            { x: cx - r, y: cy },
            { x: cx, y: cy + r },
            { x: cx, y: cy - r }
        );
    }
}

function reset() {
    clickCount = 0;
    if (preview) svg.removeChild(preview);
    preview = null;
    hideSnapIndicator();
}
