const PX_PER_MM = 96 / 25.4;
const GRID_MM = 10;
const GRID_PX = GRID_MM * PX_PER_MM;

const SNAP_RADIUS = 5;

function pxToMm(px) {
    return px / PX_PER_MM;
}
