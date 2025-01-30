const fs = require("fs").promises;

// Corrected file path with double backslashes
const filePath = "C:\\New folder\\Published using Google Docs.txt";

async function decodeSecretMessage(filePath) {
    try {
        // Read the file content
        const text = await fs.readFile(filePath, "utf-8");

        // Parse the document content
        const lines = text.split("\n");

        // Initialize a map to store characters and their positions
        const charMap = new Map();

        // Determine the maximum x and y coordinates to define the grid size
        let maxX = 0;
        let maxY = 0;

        for (const line of lines) {
            if (line.trim()) { // Skip empty lines
                // Remove any extra spaces and split by whitespace
                const parts = line.trim().split(/\s+/); // Split by one or more spaces
                if (parts.length === 3) {
                    const x = parseInt(parts[0], 10); // x-coordinate
                    const char = parts[1];  // Character (Unicode)
                    const y = parseInt(parts[2], 10);  // y-coordinate

                    // Store the character in the map with x,y as key
                    charMap.set(`${x},${y}`, char);

                    // Update maxX and maxY
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                } else {
                    console.warn(`Skipping malformed line: ${line}`);
                }
            }
        }

        console.log(`Grid dimensions: ${maxX + 1}x${maxY + 1}`);

        // Initialize the grid with spaces
        const grid = Array.from({ length: maxY + 1 }, () =>
            Array.from({ length: maxX + 1 }, () => " ")
        );

        // Fill the grid with characters from the map
        for (const [key, char] of charMap.entries()) {
            const [x, y] = key.split(",").map(Number);
            grid[y][x] = char;
        }

        // Print the grid row by row, but inverted (bottom to top)
        for (let i = maxY; i >= 0; i--) {
            console.log(grid[i].join(""));
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Call the function with the correct file path
decodeSecretMessage(filePath);
