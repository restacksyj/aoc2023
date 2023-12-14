const fs = require('fs');
const data = fs.readFileSync("./new.txt", "binary");


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

    console.log(northGrid.join("\n"), "func111")
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


const func1NorthMod = (modGrid) => {
    for (let i = 0; i < modGrid.length; i++) {
        const row = modGrid[i];
        for (let j = 0; j < row.length; j++) {
            const colEl = row[i]
            const rowEl = row[j]
            modGrid[i][j] = rowEl
            if (rowEl == 'O') {
                let index = i - 1
                while (index >= 0 && modGrid[index][j] == '.' ) {
                    modGrid[index][j] = modGrid[i][j]
                    modGrid[index+1][j] = "."
                    index--
                }
            }             
        }
    }

    // return modGrid

}


const func2 = () => {
    const modGrid = []
    const NUM = 2
    let sum = 0
    for (let i=0; i<grid.length; ++i) {
        let emptyDot = []
        for (let j = 0; j < colLen; j++) {
            emptyDot.push(".")
        }
        modGrid[i] = emptyDot;
    }

    peformCycle(NUM, modGrid)
    const revNorthGrid = modGrid.reverse()

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
    for (let k = 0; k < 1; k++) {
        cycleNorth(grid, modGrid)
        cycleWest(modGrid)
        modGrid.reverse()
        console.log(modGrid.join("\n"))
        console.log("south")
        // modGrid.reverse()
        func1NorthMod(modGrid)
        console.log(modGrid.join("\n"))
        // modGrid.reverse()
        // cycleWest(modGrid)
    }

    return modGrid

}

// const cycle = (grid, modGrid, direction) => {
//     const dirIdx = {
//         north: -1,
//         south: +1,
//         east: +1,
//         west: -1,
//     }
//
//     for (let i = 0; i < grid.length; i++) {
//         // const row = grid[i];
//         let row 
//         if (direction == "north") {
//             row = grid[i]
//         } else {
//             row = modGrid[i]
//         }
//         for (let j = 0; j < row.length; j++) {
//             const colEl = row[i]
//             const rowEl = row[j]
//             modGrid[i][j] = rowEl
//             if (direction == "north" || direction == "south") {
//                 if (rowEl == 'O') {
//                     let index = i + dirIdx[direction]
//                     while (index >= 0 && modGrid[index][j] == '.' ) {
//                         modGrid[index][j] = grid[i][j]
//                         modGrid[index+1][j] = "."
//                         index--
//                     }
//                 }
//             }
//             if (direction == "west" || direction == "east") {
//                 if (rowEl == 'O') {
//                     let index = j + dirIdx[direction]
//                     while (index >= 0 && modGrid[i][index] == '.' ) {
//                         modGrid[i][index] = modGrid[i][j]
//                         modGrid[i][index+1] = "."
//                         index--
//                     }
//                 }             
//                 
//             }
//         }
//         
//     }
// }

// const cycleNorthWIthout = (modGrid) => {
//     for (let i = 0; i < modGrid.length; i++) {
//         const row = modGrid[i];
//         for (let j = 0; j < row.length; j++) {
//             const rowEl = row[j]
//             // modGrid[i][j] = rowEl
//             if (rowEl == 'O') {
//                 let index = i - 1
//                 while (index >= 0 && modGrid[index][j] == '.' ) {
//                     modGrid[index][j] = modGrid[i][j]
//                     modGrid[index+1][j] = "."
//                     index--
//                 }
//             }             
//         }
        
//     }
// }

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

// const cycleEast = (modGrid) => {
//     for (let i = 0; i < modGrid.length; i++) {
//         const row = modGrid[i];
//         for (let j = 0; j < row.length; j++) {
//             const rowEl = row[j]
//             modGrid[i][j] = rowEl
//             if (rowEl == 'O') {
//                 let index = j + 1
//                 while (index < grid.length && modGrid[i][index] == '.' ) {
//                     modGrid[i][index] = modGrid[i][index-1]
//                     modGrid[i][index-1] = "."
//                     index++
//                 }
//             }             
//         }
        
//     }
// }

// const cycleSouth = (modGrid) => {
//     for (let i = 0; i < modGrid.length; i++) {
//         const row = modGrid[i];
//         for (let j = 0; j < row.length; j++) {
//             const colEl = row[i]
//             if (colEl == 'O') {
//                 let index = i + 1
//                 while (index < modGrid.length && modGrid[i][index] == '.' ) {
//                     let curr = index - 1
//                     while (modGrid[curr][j] == "O"){
//                         let len = modGrid.length - curr
//                         modGrid[len][j] = "0"
//                         modGrid[curr][j] = "."
//                         curr--
//                     }
//                     // modGrid[index][j] = modGrid[index-1][j]
//                     // modGrid[index-1][j] = temp
//                     index++
//                 }
//             }             
//         }
        
//     }
// }
console.log(func2())
