const fs = require('fs');
const data = fs.readFileSync("./input.txt", "binary");


const lines = data.split("\n")
lines.pop()

// making the grid here
let colLen = 0
const grid = []
lines.forEach(l => {
    if (colLen == 0) {
        colLen = l.length
    }
    grid.push(l.split(''))
})


const func1 = () => {
    let sum = 0
    const northGrid = []
    for (let i=0; i<grid.length; ++i) {
        let emptyDot = []
        for (let j = 0; j < colLen; j++) {
            emptyDot.push(".")
        }
        northGrid[i] = emptyDot;
    }
    
    // navigating the grid
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const colEl = row[i]
            const rowEl = row[j]
            northGrid[i][j] = rowEl
            if (rowEl == 'O') {
                index = i - 1
                while (index >= 0 && northGrid[index][j] == '.' ) {
                    northGrid[index][j] = grid[i][j]
                    northGrid[index+1][j] = "."
                    index--
                }
            }             
        }
        
    }

    const revNorthGrid = northGrid.reverse()

    for (let i = 0; i < revNorthGrid.length; i++) {
        const row = revNorthGrid[i];
        const stones = row.filter(x => x == 'O')
        if (stones.length) {
            sum += stones.length * (i+1)
        }
    }

    return sum
}

console.log(func1())