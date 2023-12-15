const fs = require('fs');
const data = fs.readFileSync("./ogInput.txt", "binary");


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
                let index = i - 1
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

// console.log(func1())


const func2 = () => {
    const modGrid = []
    const NUM = 1
    let sum = 0
    for (let i=0; i<grid.length; ++i) {
        let emptyDot = []
        for (let j = 0; j < colLen; j++) {
            emptyDot.push(".")
        }
        modGrid[i] = emptyDot;
    }

    peformCycle(NUM, modGrid)
    const revNorthGrid = modGrid

    for (let i = 0; i < revNorthGrid.length; i++) {
        const row = revNorthGrid[i];
        const stones = row.filter(x => x == 'O')
        if (stones.length) {
            sum += stones.length * (i+1)
        }
    }

    return sum
}

const peformCycle = (NUM, modGrid) => {
    for (let k = 0; k < NUM; k++) {
        if(k==0){
            cycleNorth(grid, modGrid)
        }
        cycleNorth(modGrid, modGrid)
        cycleWest(modGrid)
        // cycleSouth(modGrid)
        rollSouth(modGrid)
        // modGrid = modGrid.reverse()
        // cycleNorth(modGrid, modGrid)
        // modGrid = modGrid.reverse()
        modGrid = modGrid.map(x => x.reverse())
        cycleWest(modGrid)
        modGrid = modGrid.map(x => x.reverse())
    }

    return modGrid

}

function rollSouth(grid) {
    for (let row = grid.length - 1; row >= 0; row--) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 'O') {
                for (let i = row + 1; i < grid.length && grid[i][col] === '.'; i++) {
                    [grid[i - 1][col], grid[i][col]] = [grid[i][col], grid[i - 1][col]];
                }
            }
        }
    }
}


const cycleSouth = (modGrid) => {
    for (let i = 0; i < modGrid.length; i++) {
        const row = modGrid[i];
        for (let j = 0; j < row.length; j++) {
            const rowEl = row[j]
            if (rowEl == 'O') {
                let index = i + 1
                while (index < modGrid.length && modGrid[i][index] == '.' ) {
                    modGrid[i][index-1] = modGrid[i][index]
                    modGrid[i][index] =  modGrid[i][index-1]
                    i++
            }
        }
    }
}
}


const cycleNorth = (grid, modGrid) => {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const rowEl = row[j]
            modGrid[i][j] = rowEl
            if (rowEl == 'O') {
                let index = i - 1
                while (index >= 0 && modGrid[index][j] == '.' ) {
                    modGrid[index][j] = grid[i][j]
                    modGrid[index+1][j] = "."
                    index--
                }
            }             
        }
        
    }
}

const cycleWest = (modGrid) => {
    for (let i = 0; i < modGrid.length; i++) {
        const row = modGrid[i];
        for (let j = 0; j < row.length; j++) {
            const rowEl = row[j]
            modGrid[i][j] = rowEl
            if (rowEl == 'O') {
                let index = j - 1
                while (index >= 0 && modGrid[i][index] == '.' ) {
                    modGrid[i][index] = modGrid[i][index+1]
                    modGrid[i][index+1] = "."
                    index--
                }
            }             
        }
        
    }
}

console.log(func2())
