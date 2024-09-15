// scripts/puzzle.js

// Function to open the puzzle game modal
function openPuzzle() {
    document.getElementById('puzzleModal').style.display = 'flex';
}

// Function to close the puzzle game modal
function closePuzzle() {
    document.getElementById('puzzleModal').style.display = 'none';
}

// Initialize the puzzle game (simple sliding puzzle)
document.addEventListener('DOMContentLoaded', function() {
    const puzzle = document.getElementById('puzzle');
    const tiles = puzzle.getElementsByTagName('div');
    let emptyTile = { row: 3, col: 3 }; // Starting empty tile position

    // Shuffle the puzzle
    shufflePuzzle();

    // Add click event listeners to tiles
    for (let tile of tiles) {
        tile.addEventListener('click', function() {
            const pos = tile.getAttribute('data-pos').split(',').map(Number);
            const row = pos[0];
            const col = pos[1];

            if (isAdjacent(row, col, emptyTile.row, emptyTile.col)) {
                moveTile(row, col);
                checkWin();
            }
        });
    }
});

// Function to shuffle the puzzle
function shufflePuzzle() {
    for (let i = 0; i < 100; i++) {
        const neighbors = getNeighbors(emptyTile.row, emptyTile.col);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        moveTile(randomNeighbor.row, randomNeighbor.col, false);
    }
}

// Function to get neighboring tiles
function getNeighbors(row, col) {
    const neighbors = [];
    if (row > 0) neighbors.push({ row: row - 1, col: col });
    if (row < 3) neighbors.push({ row: row + 1, col: col });
    if (col > 0) neighbors.push({ row: row, col: col - 1 });
    if (col < 3) neighbors.push({ row: row, col: col + 1 });
    return neighbors;
}

// Function to check if two tiles are adjacent
function isAdjacent(row1, col1, row2, col2) {
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

// Function to move a tile
function moveTile(row, col, updateEmpty = true) {
    const puzzle = document.getElementById('puzzle');
    const tile = puzzle.querySelector(`[data-pos="${row},${col}"]`);
    const emptyTileElement = puzzle.querySelector(`[data-pos="${emptyTile.row},${emptyTile.col}"]`);

    // Swap positions
    tile.setAttribute('data-pos', `${emptyTile.row},${emptyTile.col}`);
    emptyTileElement.setAttribute('data-pos', `${row},${col}`);

    // Swap content
    const temp = tile.innerHTML;
    tile.innerHTML = emptyTileElement.innerHTML;
    emptyTileElement.innerHTML = temp;

    if (updateEmpty) {
        emptyTile = { row: row, col: col };
    }
}

// Function to check if the puzzle is solved
function checkWin() {
    const puzzle = document.getElementById('puzzle');
    const tiles = puzzle.getElementsByTagName('div');
    let count = 1;

    for (let tile of tiles) {
        const pos = tile.getAttribute('data-pos').split(',').map(Number);
        const row = pos[0];
        const col = pos[1];

        if (row === 3 && col === 3) continue; // Skip the empty tile

        const tileNumber = parseInt(tile.textContent);
        if (tileNumber !== count) {
            return false;
        }
        count++;
    }

    // Puzzle solved
    alert('Congratulations! You solved the puzzle.');
    closePuzzle();
    return true;
}
