function createHatchPattern() {
    if (svg.querySelector("#hatch")) return; // <<< sécurité

    const defs = document.createElementNS(svg.namespaceURI, "defs");
    const pattern = document.createElementNS(svg.namespaceURI, "pattern");

    pattern.setAttribute("id", "hatch");
    pattern.setAttribute("patternUnits", "userSpaceOnUse");
    pattern.setAttribute("width", 8);
    pattern.setAttribute("height", 8);

    const l = document.createElementNS(svg.namespaceURI, "line");
    l.setAttribute("x1", 0);
    l.setAttribute("y1", 8);
    l.setAttribute("x2", 8);
    l.setAttribute("y2", 0);
    l.setAttribute("stroke", "#999");
    l.setAttribute("stroke-width", 1);

    pattern.appendChild(l);
    defs.appendChild(pattern);
    svg.appendChild(defs);
}

function buildHalfEdges() {
    const edges = [];

    lines.forEach(l => {
        const a = { x: l.x1, y: l.y1 };
        const b = { x: l.x2, y: l.y2 };

        edges.push({
            from: a,
            to: b,
            used: false,
            angle: Math.atan2(b.y - a.y, b.x - a.x)
        });

        edges.push({
            from: b,
            to: a,
            used: false,
            angle: Math.atan2(a.y - b.y, a.x - b.x)
        });
    });

    return edges;
}

function indexEdgesByVertex(edges) {
    const map = new Map();

    function key(p) {
        return `${p.x},${p.y}`;
    }

    edges.forEach(e => {
        const k = key(e.from);
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(e);
    });

    // trier par angle (sens trigo)
    map.forEach(list => list.sort((a, b) => a.angle - b.angle));

    return map;
}

function traceFace(startEdge, vertexMap) {
    const face = [];
    let edge = startEdge;

    while (true) {
        edge.used = true;
        face.push(edge.from);

        const nextEdges = vertexMap.get(`${edge.to.x},${edge.to.y}`);
        if (!nextEdges) return null;

        // retrouver l’arête inverse
        const revIndex = nextEdges.findIndex(
            e => e.to.x === edge.from.x && e.to.y === edge.from.y
        );

        // prendre la suivante (virage à gauche)
        const next = nextEdges[(revIndex - 1 + nextEdges.length) % nextEdges.length];

        if (next === startEdge) break;
        edge = next;
    }

    return face;
}

function detectAndHatch() {
    const edges = buildHalfEdges();
    const vertexMap = indexEdgesByVertex(edges);

    edges.forEach(e => {
        if (e.used) return;

        const face = traceFace(e, vertexMap);
        if (!face || face.length < 3) return;

        hatchPolygon(face.map(p => `${p.x},${p.y}`));
    });
}

function hatchPolygon(keys) {
    const poly = document.createElementNS(svg.namespaceURI, "polygon");

    poly.setAttribute(
        "points",
        keys.map(k => k.split(",").join(" ")).join(" ")
    );

    poly.setAttribute("fill", "url(#hatch)");
    poly.setAttribute("stroke", "#000");
    poly.setAttribute("stroke-width", 1);
    poly.style.pointerEvents = "none"; // <<< important

    svg.appendChild(poly);
}