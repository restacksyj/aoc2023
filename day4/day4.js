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

    console.log(cardNoHashMap)
    Object.keys(cardNoHashMap).forEach(x => {
        console.log(cardNoHashMap[x])
        sum+=cardNoHashMap[x]
    })

    console.log(sum)
}

func2()

// 4 2 2 1
// formula is copies = (noOfMatchingNumbers * currentInstances) / matchingNumbers
// card 1 => 4 * 1 = 4(update next 4)
// card 2 => update og' numbers +  2 * 2 = 4 /2 = 2(update next 2)




    
// Card 1 -> 2,3,4,5 (og) + copy of 2,3,4,5
// Card 2 -> 3,4 (og) + copy of 3,4 + card 1 copy also wins 3,4
// Card 3 -> 

// card 1 -> 2,3,4,5
// card 2,2copy -> 3,4
// card 3,3copy,3from2,3from2copy -> 4,5
// card 4,4copy,4from2, 4from2Copy,+4
// card 5,5copy,+4,+8

