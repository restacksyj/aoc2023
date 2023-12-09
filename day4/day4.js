const fs = require('fs');
const data = fs.readFileSync("./input.txt", "binary");


const lines = data.split("\n")
lines.pop()


const func1 = () => {
    let sum = 0
    lines.forEach(line => {
        let card = line.split(":")
        let [winNo, myNo] = card[1].split("|")
        let winHashMap = {}
        let ans = 1

        winNo.split(" ").forEach(no => {
            if (no != "") {
                winHashMap[no] = 1
            }
        })

        const myNoArr = []
        myNo.split(" ").forEach(no => {
            if (winHashMap[no]) {
                ans = ans*2
                myNoArr.push(no)
            }
        })

        if (!myNoArr.length) {
            return
        }
        if (ans % 2 == 0) {
            ans = ans /2 
        }
        sum +=ans
    })
    console.log(sum)
}

// func1()

const func2 = () => {
    let sum = 0
    let cardNoHashMap = {}
    for (let i = 0; i < lines.length; i++) {
        cardNoHashMap[i+1] = 1
    }

    lines.forEach((line,lineIndex) => {
        let card = line.split(":")
        // let cardNo = parseInt(card[0].trim().split(" ")[1], 10)
        // let cardNo = parseInt(line.match(/\d/g)[0],10)
        let cardNo = lineIndex + 1

        let [winNo, myNo] = card[1].split("|")
        let winHashMap = {}

        winNo.split(" ").forEach(no => {
            if (no != "") {
                winHashMap[no] = 1
            }
        })

        const myNoArr = []
        myNo.split(" ").forEach(no => {
            if (winHashMap[no]) {
                myNoArr.push(no)
            }
        })

        if (!myNoArr.length) {
            return
        }

        // myNoArr.forEach((_, i) => {
        //     cardNoHashMap[cardNo + i + 1] += cardNoHashMap[cardNo]
        // })
        // console.log(cardNo, Object.keys(cardNoHashMap).map(x => cardNoHashMap[x]))

        const cardNos = []
        for (let m = cardNo+1; m <= cardNo + myNoArr.length; m++) {
                cardNoHashMap[m] += 1
                cardNos.push(m)
        }

        cardNos.forEach( card => {
            cardNoHashMap[card] = cardNoHashMap[card] + cardNoHashMap[cardNo] - 1
        })
    })

    Object.keys(cardNoHashMap).forEach(x => {
        console.log(cardNoHashMap[x])
        sum+=cardNoHashMap[x]
    })

    console.log(sum)
}

func2()

