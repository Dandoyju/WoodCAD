const svg = document.getElementById("canvas");
const coordsEl = document.getElementById("coords");

let snapPoints = [];
let lines = [];

let originX = 0;
let originY = 0;

let tool = null;
let startX = 0;
let startY = 0;
let clickCount = 0;
let preview = null;

let snapIndicator = null;
