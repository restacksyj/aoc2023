const fs = require('fs');
const data = fs.readFileSync("./input.txt", "binary");


const lines = data.split("\n")
lines.pop()


const RED_CUBES = 12
const GREEN_CUBES = 13
const BLUE_CUBES = 14

const cubesMap = {
    "red": RED_CUBES,
    "green": GREEN_CUBES,
    "blue": BLUE_CUBES
}

const func1 = () => {
    let sum = 0
    lines.forEach(line => {
        let [game, seq] = line.split(":")
        let gameId = game.split(" ")[1]

        let gameSets = seq.split(";")

        let invalid = false
        gameSets.forEach(gameSet => {
            let games = gameSet.split(",")
            games.forEach(game => {
                let [_, no, color] = game.split(" ")
                if (+no > cubesMap[color]) {
                    invalid = true
                    return;
                }
            });

            
        });
        if (!invalid) {
            console.log("here", gameId)
            sum += +gameId
        }
    });
        console.log(sum)
}

// func1()


const func2 = () => {
    let sum = 0
    lines.forEach(line => {
        let [game, seq] = line.split(":")
        let gameId = game.split(" ")[1]

        let gameSets = seq.split(";")

        let maxMap = {
            "red" : -Infinity,
            "blue": -Infinity,
            "green": -Infinity,
        }
        gameSets.forEach(gameSet => {
            let games = gameSet.split(",")
            games.forEach(game => {
                let [_, no, color] = game.split(" ")
                maxMap[color] = Math.max(maxMap[color], +no)
            });
            
        });
        let number = 1
        for (const key of Object.keys(maxMap)) {
            number *= maxMap[key]
        }

        sum += number
    });
        console.log(sum)
}

func2()
