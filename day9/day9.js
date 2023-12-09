const fs = require('fs');
const data = fs.readFileSync("./sample.txt", "binary");


const lines = data.split("\n")
lines.pop()


const calDiff = (arr, diffArr) => {
    const isZero = arr.every(x => x == 0)
    if (isZero) {
        return
    } else {
        const temp = []
        for (let i = 1; i < arr.length; i++) {
            const diff = arr[i] - arr[i-1]
            temp.push(diff)
        }
        diffArr.push(temp)
        return calDiff(temp, diffArr)
        
    }
}

const func1 = () => {
    let sum = 0
    lines.forEach(l => {
        const arr = l.split(' ').map(x => parseInt(x,10))
        const diffArr = []
        calDiff(arr, diffArr)
        let historySum = 0
        const revArr = [...diffArr.reverse(), arr]
        for (let i = 1; i <= revArr.length; i++) {
            if (i-1 != 0) {
                historySum += revArr[i-1][revArr[i-1].length-1]
            }             
        }
        sum+=historySum
    })


    return sum
}


const func2 = () => {
    let sum = 0
    lines.forEach(l => {
        const arr = l.split(' ').map(x => parseInt(x,10))
        const diffArr = []
        calDiff(arr, diffArr)
        const revArr = [...diffArr.reverse(), arr]
        let historySum = revArr[0][0]
        for (let i = 1; i < revArr.length; i++) {
            let currDiff = revArr[i][0] - historySum
            historySum = currDiff
        }
        sum+=historySum
    })


    return sum
}

console.log(func2())
