const fs = require('fs');
let data = fs.readFileSync("./par.txt", "binary");


data = data.split("\n")
data.pop()

const scratchCards = () => {
    let total = 0
    let winingInstances = new Array(data.length).fill(1)
    data.forEach((row, index) => {
        // Process input data
        const line = row.slice(row.indexOf(': ') + 2).split('|')
        const winningNumbers = line[0].trim().split(' ').filter(val => !isNaN(val) || val !== '')
        const lotteryNumbers = line[1].trim().split(' ').filter(val => !isNaN(val) || val !== '')

        // Find winning numbers
        const winning = lotteryNumbers.filter(num => winningNumbers.includes(num)).filter(val => val !== '')

        if (winning.length > 0) {
            // Part 1
            total += Math.pow(2, winning.length - 1)

            // Part 2
            winning.forEach((_, i) => {
                winingInstances[index + i + 1] += winingInstances[index]
            })
            console.log(index+1, winingInstances)
        }
    })

    console.log(winingInstances)
    console.log('P1: ' + total)
    console.log('P2: ' + winingInstances.reduce((a, b) => a + b))
}

scratchCards()
